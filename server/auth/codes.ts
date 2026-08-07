import "server-only";
import crypto from "crypto";
import { env } from "../env";

/**
 * Email verification codes for signup and password reset.
 *
 * Codes are never stored in the clear — only a keyed hash — and comparison is
 * timing-safe. Both properties carried over from the legacy implementation,
 * which got this right.
 */

export const CODE_TTL_MINUTES = 10;
export const MAX_CODE_ATTEMPTS = 5;

export function generateCode(): string {
  // randomInt is uniform; `Math.random()` is not, and this gates account access.
  return String(crypto.randomInt(100_000, 1_000_000));
}

export function hashCode(code: string, contextToken: string): string {
  return crypto
    .createHash("sha256")
    .update(`${contextToken}:${code.trim()}:${env.AUTH_SECRET}`)
    .digest("hex");
}

export function verifyCode(
  code: string,
  contextToken: string,
  expectedHash: string,
): boolean {
  if (!code || !contextToken || !expectedHash) return false;
  const actual = Buffer.from(hashCode(code, contextToken));
  const expected = Buffer.from(expectedHash);
  if (actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

export const randomToken = () => crypto.randomUUID();

/** Refresh tokens are stored hashed, so a database leak cannot mint sessions. */
export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(`${token}:${env.AUTH_SECRET}`).digest("hex");
