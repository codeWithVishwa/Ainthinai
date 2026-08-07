import "server-only";
import mongoose from "mongoose";
import { env } from "./env";

/**
 * Mongoose connection, cached on `globalThis`.
 *
 * Next dev reloads modules on every edit. Without the global cache each reload
 * would open a fresh pool and the process would exhaust MongoDB's connection
 * limit within a few minutes of editing. The promise is cached too, so
 * concurrent requests during a cold start await one connect rather than racing
 * to open several.
 */

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as { _mongoose?: Cache };

const cache: Cache = globalForMongoose._mongoose ?? { conn: null, promise: null };
globalForMongoose._mongoose = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    mongoose.set("strictQuery", true);
    // Surface bad queries in development instead of silently ignoring them.
    mongoose.set("sanitizeFilter", true);

    cache.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB,
      // Fail fast rather than hanging a request for 30s when Mongo is down.
      serverSelectionTimeoutMS: 5_000,
      maxPoolSize: 10,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    // Clear the failed promise so the next request retries instead of
    // permanently caching the rejection.
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}

/**
 * Runs `fn` inside a transaction.
 *
 * Requires a replica set — a standalone mongod rejects transactions. See
 * scripts/mongo.sh, which runs the local instance as a single-node set for
 * exactly this reason. The booking flow depends on it to make the
 * capacity check and the insert atomic, which is the bug the legacy
 * project papered over with a delete-after-the-fact compensation.
 */
export async function withTransaction<T>(
  fn: (session: mongoose.ClientSession) => Promise<T>,
): Promise<T> {
  const conn = await connectDB();
  const session = await conn.startSession();
  try {
    let result: T;
    await session.withTransaction(async () => {
      result = await fn(session);
    });
    return result!;
  } finally {
    await session.endSession();
  }
}
