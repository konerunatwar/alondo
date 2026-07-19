function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function siteUrlFromHost(host: string, proto = "https") {
  if (!host || host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return undefined;
  }

  return normalizeSiteUrl(`${proto}://${host}`);
}

export function getSiteUrlFromEnv() {
  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN?.replace(/\/$/, "");

  if (railwayDomain) {
    return railwayDomain.startsWith("http")
      ? normalizeSiteUrl(railwayDomain)
      : `https://${railwayDomain}`;
  }

  const configured =
    process.env.SITE_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (configured && !configured.includes("your-app")) {
    return configured;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return configured;
}

/** Client-safe URL helper (OAuth button, etc.). */
export function getSiteUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getSiteUrlFromEnv() ?? "http://localhost:3000";
}

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url || url.includes("your-project-ref")) {
    return undefined;
  }

  return url;
}

/** Supports Supabase publishable key (new) and anon key (legacy). */
export function getSupabasePublishableKey() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key || key === "your-anon-key") {
    return undefined;
  }

  return key;
}

export function requireSupabaseEnv() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local",
    );
  }

  return { url, key };
}

export function getRedirectOriginFromRequest(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return (
      siteUrlFromHost(forwardedHost, forwardedProto) ??
      getSiteUrlFromEnv() ??
      "http://localhost:3000"
    );
  }

  const { origin } = new URL(request.url);
  const parsedOrigin = new URL(origin);

  return (
    siteUrlFromHost(parsedOrigin.host, parsedOrigin.protocol.replace(":", "")) ??
    getSiteUrlFromEnv() ??
    origin
  );
}
