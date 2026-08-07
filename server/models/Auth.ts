import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/**
 * Pre-account signup state.
 *
 * Mirrors the legacy three-step flow, which was one of its better ideas: the
 * User row is only created after the emailed code is verified, so an abandoned
 * signup never leaves an unusable account behind.
 */
export interface PendingRegistrationDoc {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  token: string;
  codeHash: string;
  codeExpiresAt: Date;
  confirmedAt: Date | null;
  attempts: number;
  expiresAt: Date;
}

const pendingRegistrationSchema = new Schema<PendingRegistrationDoc>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    token: { type: String, required: true, unique: true },
    codeHash: { type: String, required: true },
    codeExpiresAt: { type: Date, required: true },
    confirmedAt: { type: Date, default: null },
    attempts: { type: Number, default: 0, min: 0 },
    // TTL: Mongo reaps abandoned signups without a cron.
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export const PendingRegistration = defineModel<PendingRegistrationDoc>(
  "PendingRegistration",
  pendingRegistrationSchema,
);

/* ---- Password reset ---------------------------------------------------- */

export interface PasswordResetDoc {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  email: string;
  token: string;
  codeHash: string;
  codeExpiresAt: Date;
  confirmedAt: Date | null;
  attempts: number;
  expiresAt: Date;
}

const passwordResetSchema = new Schema<PasswordResetDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    token: { type: String, required: true, unique: true },
    codeHash: { type: String, required: true },
    codeExpiresAt: { type: Date, required: true },
    confirmedAt: { type: Date, default: null },
    attempts: { type: Number, default: 0, min: 0 },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export const PasswordReset = defineModel<PasswordResetDoc>(
  "PasswordReset",
  passwordResetSchema,
);

/* ---- Refresh tokens ---------------------------------------------------- */

/**
 * One row per issued refresh token, so sessions can actually be revoked —
 * the legacy project had no way to invalidate a JWT before it expired.
 * Rotation replaces the row and marks the old one used; a replayed token is
 * treated as theft and kills the whole family.
 */
export interface RefreshTokenDoc {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  tokenHash: string;
  family: string;
  usedAt: Date | null;
  revokedAt: Date | null;
  userAgent: string;
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    family: { type: String, required: true, index: true },
    usedAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
    userAgent: { type: String, default: "" },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export const RefreshToken = defineModel<RefreshTokenDoc>(
  "RefreshToken",
  refreshTokenSchema,
);

/* ---- Audit log --------------------------------------------------------- */

/** Every staff mutation. The legacy admin had no trail at all. */
export interface AuditLogDoc {
  _id: Types.ObjectId;
  actor: Types.ObjectId | null;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  createdAt: Date;
}

const auditLogSchema = new Schema<AuditLogDoc>(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    actorEmail: { type: String, default: "" },
    action: { type: String, required: true, index: true },
    entity: { type: String, required: true, index: true },
    entityId: { type: String, default: "" },
    before: { type: Schema.Types.Mixed, default: null },
    after: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

auditLogSchema.index({ createdAt: -1 });

export const AuditLog = defineModel<AuditLogDoc>("AuditLog", auditLogSchema);
