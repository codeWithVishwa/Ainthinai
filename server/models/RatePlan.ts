import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";
import { MEAL_PLANS, PAYMENT_MODES, type MealPlan, type PaymentMode } from "./index";

export interface RatePlanDoc {
  _id: Types.ObjectId;
  room: Types.ObjectId;
  name: string;
  code: string;
  description: string;
  mealPlan: MealPlan;
  paymentMode: PaymentMode;
  basePrice: number;
  /**
   * Nightly rate keyed by adult count. Resolution walks up from the requested
   * count toward baseOccupancy and takes the first tier present — the
   * "next higher occupancy" rule OTAs use. Counts above baseOccupancy are
   * ignored here; those are charged via extraAdultPrice.
   */
  occupancyPricing: Map<string, number>;
  /** null = inherit Room.extraAdultPrice */
  extraAdultPrice: number | null;
  /** null = inherit Room.childAgePolicy / Room.extraChildPrice */
  paidChildPrice: number | null;
  cancellationPolicy: {
    isRefundable: boolean;
    deadlineDays: number;
    penaltyPercent: number;
    description: string;
  };
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const cancellationSchema = new Schema(
  {
    isRefundable: { type: Boolean, default: true },
    deadlineDays: { type: Number, default: 7, min: 0 },
    penaltyPercent: { type: Number, default: 0, min: 0, max: 100 },
    description: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const ratePlanSchema = new Schema<RatePlanDoc>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, default: "", trim: true, uppercase: true },
    description: { type: String, default: "", trim: true },
    mealPlan: { type: String, enum: MEAL_PLANS, default: "breakfast" },
    paymentMode: { type: String, enum: PAYMENT_MODES, default: "pay_at_hotel" },
    basePrice: { type: Number, required: true, min: 0 },
    occupancyPricing: { type: Map, of: Number, default: () => new Map() },
    extraAdultPrice: { type: Number, default: null, min: 0 },
    paidChildPrice: { type: Number, default: null, min: 0 },
    cancellationPolicy: { type: cancellationSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ratePlanSchema.index({ room: 1, isActive: 1, sortOrder: 1 });

export const RatePlan = defineModel<RatePlanDoc>("RatePlan", ratePlanSchema);
