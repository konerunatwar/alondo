/** Exact paths anyone can visit without signing in. */
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
] as const;

/** Path prefixes that stay public (OAuth callbacks, etc.). */
export const PUBLIC_PREFIXES = ["/auth"] as const;

/** Next.js metadata routes (favicon, apple touch icon). */
export const METADATA_ROUTES = ["/icon", "/icon.svg", "/apple-icon"] as const;

/** Where signed-in users go after login or when visiting auth pages. */
export const DEFAULT_AUTHENTICATED_REDIRECT = "/dashboard";

/** Auth pages — signed-in users get redirected away from these. */
export const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"] as const;

/** Auth UI pages — hide redundant header sign-in/sign-up actions. */
export const AUTH_UI_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
] as const;

export function isPublicPath(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number])) {
    return true;
  }

  if (METADATA_ROUTES.includes(pathname as (typeof METADATA_ROUTES)[number])) {
    return true;
  }

  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string) {
  return AUTH_ROUTES.includes(pathname as (typeof AUTH_ROUTES)[number]);
}

export function isAuthUiPath(pathname: string) {
  return AUTH_UI_PATHS.includes(pathname as (typeof AUTH_UI_PATHS)[number]);
}

export function requiresAuth(pathname: string) {
  return !isPublicPath(pathname);
}
