import "server-only";
import bcrypt from "bcryptjs";

/** Cost 12, matching the legacy project. ~250ms on commodity hardware. */
const ROUNDS = 12;

export const hashPassword = (plain: string) => bcrypt.hash(plain, ROUNDS);

export const verifyPassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
