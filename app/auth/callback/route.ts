import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteUrl, requireSupabaseEnv } from "@/lib/env";

function getRedirectOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return getSiteUrl();
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error");
  const oauthErrorDescription =
    requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";
  const origin = getRedirectOrigin(request);

  if (oauthError) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set(
      "details",
      oauthErrorDescription ?? oauthError,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set("details", "missing-code");
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const { url, key } = requireSupabaseEnv();
  const redirectUrl = `${origin}${safeNext}`;
  let response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set("details", error.message);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
