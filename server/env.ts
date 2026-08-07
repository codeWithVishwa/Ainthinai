import "server-only";
import { z } from "zod";

/**
 * Environment, validated once at module load.
 *
 * Parsing here means a missing secret fails at boot with a readable message
 * rather than surfacing as `undefined` deep inside a request — the legacy
 * project threw "JWT_SECRET is missing" lazily, on the first sign-in attempt.
 */
const schema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  MONGODB_DB: z.string().default("ainthinai"),

  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_REFRESH_SECRET: z
    .string()
    .min(32, "AUTH_REFRESH_SECRET must be at least 32 characters"),
  AUTH_ACCESS_TTL: z.string().default("15m"),
  AUTH_REFRESH_TTL: z.string().default("30d"),

  SUPER_ADMIN_EMAIL: z.string().email().optional(),
  SUPER_ADMIN_PASSWORD: z.string().min(8).optional(),
  SUPER_ADMIN_NAME: z.string().default("Administrator"),

  CURRENCY: z.string().default("INR"),
  TAX_PERCENT: z.coerce.number().min(0).max(100).default(18),
  SITE_URL: z.string().default("http://localhost:3000"),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
