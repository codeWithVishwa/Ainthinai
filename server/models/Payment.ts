import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/**
 * Append-only payment ledger.
 *
 * The legacy project had no payment collection — it stored a single gateway id
 * on the booking, which made partial payments, multiple attempts and refund
 * history impossible to represent. Every movement of money is a row here, and
 * Booking.amountPaid is the derived total.
 */
export interface PaymentDoc {
  _id: Types.ObjectId;
  booking: Types.ObjectId;
  kind: "charge" | "refund";
  status: "created" | "succeeded" | "failed";
  amount: number;
  currency: string;
  provider: "cash" | "card_on_arrival" | "bank_transfer" | "gateway";
  providerRef: string;
  /** Free-form gateway payload for reconciliation. Never rendered to guests. */
  meta: Record<string, unknown>;
  recordedBy: Types.ObjectId | null;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDoc>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    kind: { type: String, enum: ["charge", "refund"], required: true },
    status: {
      type: String,
      enum: ["created", "succeeded", "failed"],
      default: "created",
      index: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true },
    provider: {
      type: String,
      enum: ["cash", "card_on_arrival", "bank_transfer", "gateway"],
      default: "cash",
    },
    providerRef: { type: String, default: "", trim: true, index: true },
    meta: { type: Schema.Types.Mixed, default: {} },
    recordedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    note: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export const Payment = defineModel<PaymentDoc>("Payment", paymentSchema);
