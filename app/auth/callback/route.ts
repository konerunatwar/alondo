import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSiteUrl, requireSupabaseEnv } from "@/lib/env";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error");
  const oauthErrorDescription =
    requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";
  const siteUrl = getSiteUrl();

  if (oauthError) {
    const loginUrl = new URL("/login", siteUrl);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set(
      "details",
      oauthErrorDescription ?? oauthError,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    const loginUrl = new URL("/login", siteUrl);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set("details", "missing-code");
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const { url, key } = requireSupabaseEnv();

  const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
          void headers;
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL("/login", siteUrl);
    loginUrl.searchParams.set("error", "auth-callback");
    loginUrl.searchParams.set("details", error.message);
    return NextResponse.redirect(loginUrl);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${siteUrl}${safeNext}`);
  }

  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${safeNext}`);
  }

  return NextResponse.redirect(`${siteUrl}${safeNext}`);
}
