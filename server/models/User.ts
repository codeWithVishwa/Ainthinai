import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";
import { ROLES, type Role } from "./index";

export interface UserDoc {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null;
  /** Failed sign-in counter driving the temporary lockout. */
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "guest", index: true },
    isActive: { type: Boolean, default: true, index: true },
    emailVerifiedAt: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    failedLoginAttempts: { type: Number, default: 0, min: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true },
);

// passwordHash is select:false, but strip it defensively on serialisation too.
userSchema.set("toJSON", {
  transform(_doc, ret) {
    // Mongoose types `ret` as the full document, where passwordHash is
    // required; widening is the only way to drop it.
    const plain = ret as unknown as Record<string, unknown>;
    delete plain.passwordHash;
    return plain;
  },
});

export const User = defineModel<UserDoc>("User", userSchema);
