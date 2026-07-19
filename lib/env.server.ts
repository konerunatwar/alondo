import { headers } from "next/headers";
import { getSiteUrlFromEnv, siteUrlFromHost } from "@/lib/env";

/** Server-only URL helper — prefers the incoming request host over build-time env. */
export async function getServerSiteUrl() {
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const requestUrl = host ? siteUrlFromHost(host, proto) : undefined;

  if (requestUrl) {
    return requestUrl;
  }

  const envUrl = getSiteUrlFromEnv();

  if (envUrl) {
    return envUrl;
  }

  return "http://localhost:3000";
}
