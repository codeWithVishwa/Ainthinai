import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { env } from "../env";
import type { Role } from "../models";

/**
 * JWTs via `jose` rather than `jsonwebtoken`.
 *
 * jose runs in the edge runtime, so middleware can verify a session without
 * pulling in Node crypto — `jsonwebtoken` cannot, and would force every
 * protected route onto the Node runtime.
 */

const accessSecret = new TextEncoder().encode(env.AUTH_SECRET);
const refreshSecret = new TextEncoder().encode(env.AUTH_REFRESH_SECRET);

export interface AccessClaims {
  sub: string;
  role: Role;
  email: string;
}

export async function signAccessToken(claims: AccessClaims): Promise<string> {
  return new SignJWT({ role: claims.role, email: claims.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime(env.AUTH_ACCESS_TTL)
    .sign(accessSecret);
}

export async function verifyAccessToken(token: string): Promise<AccessClaims | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    if (!payload.sub) return null;
    return {
      sub: payload.sub,
      role: payload.role as Role,
      email: (payload.email as string) ?? "",
    };
  } catch {
    return null;
  }
}

export async function signRefreshToken(userId: string, family: string): Promise<string> {
  return new SignJWT({ family })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(env.AUTH_REFRESH_TTL)
    .sign(refreshSecret);
}

export async function verifyRefreshToken(
  token: string,
): Promise<{ sub: string; family: string } | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    if (!payload.sub || !payload.family) return null;
    return { sub: payload.sub, family: payload.family as string };
  } catch {
    return null;
  }
}
