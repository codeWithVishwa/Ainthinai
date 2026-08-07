import "server-only";
import { NextResponse } from "next/server";
import { ZodError, type ZodType } from "zod";
import { connectDB } from "./db";

/**
 * Route-handler plumbing: one response envelope, one error path.
 *
 * The legacy project repeated `res.json({ success, message, data })` in every
 * controller and each one drifted. Handlers here return data; the wrapper owns
 * the envelope, the status codes and the database connection.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const badRequest = (m: string, d?: unknown) => new ApiError(400, m, d);
export const unauthorized = (m = "Sign in to continue") => new ApiError(401, m);
export const forbidden = (m = "You do not have permission for this action") =>
  new ApiError(403, m);
export const notFound = (m = "Not found") => new ApiError(404, m);
export const conflict = (m: string, d?: unknown) => new ApiError(409, m, d);
export const unprocessable = (m: string, d?: unknown) => new ApiError(422, m, d);
export const tooMany = (m = "Too many attempts. Try again shortly.") =>
  new ApiError(429, m);

export function ok<T>(data: T, init?: { status?: number; message?: string }) {
  return NextResponse.json(
    { success: true, ...(init?.message ? { message: init.message } : {}), data },
    { status: init?.status ?? 200 },
  );
}

/**
 * Wraps a handler: connects to Mongo, normalises every thrown error.
 *
 * Unexpected errors are logged in full but reported generically — leaking a
 * Mongo error message to a client tells an attacker about your schema.
 */
export function handler<Args extends unknown[]>(
  fn: (req: Request, ...args: Args) => Promise<Response>,
) {
  return async (req: Request, ...args: Args): Promise<Response> => {
    try {
      await connectDB();
      return await fn(req, ...args);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            ...(error.details ? { details: error.details } : {}),
          },
          { status: error.status },
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            details: error.issues.map((i) => ({
              field: i.path.join("."),
              message: i.message,
            })),
          },
          { status: 422 },
        );
      }

      // Duplicate key — surfaces as a 409 rather than a 500.
      if (
        typeof error === "object" &&
        error !== null &&
        (error as { code?: number }).code === 11000
      ) {
        return NextResponse.json(
          { success: false, message: "That record already exists" },
          { status: 409 },
        );
      }

      console.error("[api]", error);
      return NextResponse.json(
        { success: false, message: "Something went wrong on our side" },
        { status: 500 },
      );
    }
  };
}

/** Parses and validates a JSON body, throwing a 422 on malformed input. */
export async function parseBody<T>(req: Request, schema: ZodType<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw unprocessable("Request body must be valid JSON");
  }
  return schema.parse(raw);
}

/** Parses search params against a schema. */
export function parseQuery<T>(req: Request, schema: ZodType<T>): T {
  const url = new URL(req.url);
  return schema.parse(Object.fromEntries(url.searchParams.entries()));
}
