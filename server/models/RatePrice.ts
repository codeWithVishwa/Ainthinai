import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/** Per-date rate override for a plan. Empty occupancyPricing = flat `price`. */
export interface RatePriceDoc {
  _id: Types.ObjectId;
  ratePlan: Types.ObjectId;
  room: Types.ObjectId;
  date: Date;
  price: number;
  occupancyPricing: Map<string, number>;
  priceType: "standard" | "weekend" | "seasonal" | "festival";
  notes: string;
}

const ratePriceSchema = new Schema<RatePriceDoc>(
  {
    ratePlan: { type: Schema.Types.ObjectId, ref: "RatePlan", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    occupancyPricing: { type: Map, of: Number, default: () => new Map() },
    priceType: {
      type: String,
      enum: ["standard", "weekend", "seasonal", "festival"],
      default: "standard",
    },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

ratePriceSchema.index({ ratePlan: 1, date: 1 }, { unique: true });
ratePriceSchema.index({ room: 1, date: 1 });

export const RatePrice = defineModel<RatePriceDoc>("RatePrice", ratePriceSchema);
