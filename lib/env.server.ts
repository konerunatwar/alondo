import { headers } from "next/headers";
import { getSiteUrlFromEnv, siteUrlFromHost } from "@/lib/env";

/** Server-only URL helper — production auth links use the Railway/env URL, not a custom domain. */
export async function getServerSiteUrl() {
  const envUrl = getSiteUrlFromEnv();

  if (
    envUrl &&
    !envUrl.includes("localhost") &&
    !envUrl.includes("127.0.0.1")
  ) {
    return envUrl;
  }

  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const requestUrl = host ? siteUrlFromHost(host, proto) : undefined;

  if (requestUrl) {
    return requestUrl;
  }

  return envUrl ?? "http://localhost:3000";
}
