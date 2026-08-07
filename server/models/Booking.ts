import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";
import {
  BOOKING_STATUSES,
  PAYMENT_MODES,
  PAYMENT_STATUSES,
  type BookingStatus,
  type MealPlan,
  type PaymentMode,
  type PaymentStatus,
} from "./index";

export interface BookingDoc {
  _id: Types.ObjectId;
  reference: string;
  user: Types.ObjectId | null;
  room: Types.ObjectId;
  ratePlan: Types.ObjectId | null;

  checkIn: Date;
  checkOut: Date;
  nights: number;
  units: number;

  adults: number;
  childrenPaid: number;
  childrenFree: number;
  guests: number;

  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  notes: string;

  currency: string;
  subtotal: number;
  taxAmount: number;
  taxPercent: number;
  discountAmount: number;
  total: number;
  /** Sum of captured payments. Kept in step with the Payment ledger. */
  amountPaid: number;

  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMode: PaymentMode;
  /** Soft-hold expiry for online payment. Null once settled. */
  paymentDueAt: Date | null;

  mealPlan: MealPlan;
  /** Frozen breakdown — the rate plan may change after booking. */
  pricingSnapshot: {
    ratePlanName: string;
    baseOccupancy: number;
    roomRatePerUnit: number;
    extraAdults: number;
    extraAdultRate: number;
    extraAdultTotalPerNight: number;
    paidChildren: number;
    paidChildTotalPerNight: number;
    nightly: { date: string; price: number; priceType: string }[];
  };

  cancelledAt: Date | null;
  cancellationReason: string;
  checkedInAt: Date | null;
  checkedOutAt: Date | null;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDoc>(
  {
    reference: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    ratePlan: { type: Schema.Types.ObjectId, ref: "RatePlan", default: null },

    checkIn: { type: Date, required: true, index: true },
    checkOut: { type: Date, required: true, index: true },
    nights: { type: Number, required: true, min: 1 },
    units: { type: Number, required: true, min: 1 },

    adults: { type: Number, required: true, min: 1 },
    childrenPaid: { type: Number, default: 0, min: 0 },
    childrenFree: { type: Number, default: 0, min: 0 },
    guests: { type: Number, required: true, min: 1 },

    guestName: { type: String, required: true, trim: true },
    guestEmail: { type: String, required: true, trim: true, lowercase: true },
    guestPhone: { type: String, required: true, trim: true },
    guestAddress: { type: String, default: "", trim: true },
    notes: { type: String, default: "", trim: true, maxlength: 2000 },

    currency: { type: String, default: "INR", uppercase: true },
    subtotal: { type: Number, required: true, min: 0 },
    taxAmount: { type: Number, default: 0, min: 0 },
    taxPercent: { type: Number, default: 0, min: 0, max: 100 },
    discountAmount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, default: 0, min: 0 },

    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: "unpaid",
      index: true,
    },
    paymentMode: { type: String, enum: PAYMENT_MODES, default: "pay_at_hotel" },
    paymentDueAt: { type: Date, default: null, index: true },

    mealPlan: { type: String, default: "breakfast" },
    pricingSnapshot: {
      ratePlanName: { type: String, default: "" },
      baseOccupancy: { type: Number, default: 2 },
      roomRatePerUnit: { type: Number, default: 0 },
      extraAdults: { type: Number, default: 0 },
      extraAdultRate: { type: Number, default: 0 },
      extraAdultTotalPerNight: { type: Number, default: 0 },
      paidChildren: { type: Number, default: 0 },
      paidChildTotalPerNight: { type: Number, default: 0 },
      nightly: {
        type: [{ date: String, price: Number, priceType: String }],
        default: [],
      },
    },

    cancelledAt: { type: Date, default: null },
    cancellationReason: { type: String, default: "", trim: true },
    checkedInAt: { type: Date, default: null },
    checkedOutAt: { type: Date, default: null },
    source: { type: String, default: "direct" },
  },
  { timestamps: true },
);

// Drives the availability aggregation — the single hottest query in the system.
bookingSchema.index({ room: 1, status: 1, checkIn: 1, checkOut: 1 });
// Arrivals/departures boards.
bookingSchema.index({ checkIn: 1, status: 1 });
bookingSchema.index({ checkOut: 1, status: 1 });

export const Booking = defineModel<BookingDoc>("Booking", bookingSchema);
