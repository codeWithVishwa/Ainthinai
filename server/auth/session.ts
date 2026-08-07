import "server-only";
import { cookies } from "next/headers";
import { isProduction } from "../env";
import { verifyAccessToken, type AccessClaims } from "./tokens";

/**
 * Session cookies.
 *
 * HTTP-only, so no script can read the token — the legacy project returned the
 * JWT in the response body for the SPA to hold in memory, which meant any XSS
 * was a full account takeover. `sameSite: lax` blocks cross-site form posts
 * while still allowing normal top-level navigation back into the site.
 */

export const ACCESS_COOKIE = "ain_session";
export const REFRESH_COOKIE = "ain_refresh";

const baseCookie = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
};

export async function setSessionCookies(access: string, refresh: string) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, access, { ...baseCookie, maxAge: 60 * 15 });
  jar.set(REFRESH_COOKIE, refresh, {
    ...baseCookie,
    maxAge: 60 * 60 * 24 * 30,
    // Only ever sent to the refresh endpoint, so an XSS-adjacent leak of other
    // requests cannot pick it up.
    path: "/api/auth",
  });
}

export async function clearSessionCookies() {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, "", { ...baseCookie, maxAge: 0 });
  jar.set(REFRESH_COOKIE, "", { ...baseCookie, maxAge: 0, path: "/api/auth" });
}

/** Claims from the access cookie, or null. Does not hit the database. */
export async function getSessionClaims(): Promise<AccessClaims | null> {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}
