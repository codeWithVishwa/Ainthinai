import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";
import { ELEMENT_IDS, ROOM_CATEGORIES, type ElementId, type RoomCategory } from "./index";

/**
 * A room *type*, not an individual room — `totalUnits` is how many of it exist.
 * Carried over from the legacy model, which is the right shape for a ten-room
 * property with no per-unit assignment at check-in.
 */
export interface RoomDoc {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  tamil: string;
  elementId: ElementId;
  floor: number;
  category: RoomCategory;
  summary: string;
  description: string[];
  features: string[];
  amenities: string[];
  images: string[];
  area: number;
  beds: string;
  view: string;
  totalUnits: number;
  /** Adults covered by the base rate. Extras charge above this. */
  baseOccupancy: number;
  maxOccupancy: number;
  maxAdults: number | null;
  maxChildren: number;
  extraAdultPrice: number;
  extraChildPrice: number;
  childAgePolicy: {
    label: string;
    minAge: number;
    maxAge: number;
    chargeType: "free" | "paid";
    chargeAmount: number;
  }[];
  taxPercent: number;
  minNights: number;
  /** Denormalised from reviews for cheap listing sorts. */
  ratingAverage: number;
  ratingCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const childBandSchema = new Schema(
  {
    label: { type: String, default: "" },
    minAge: { type: Number, required: true, min: 0, max: 17 },
    maxAge: { type: Number, required: true, min: 0, max: 17 },
    chargeType: { type: String, enum: ["free", "paid"], default: "free" },
    chargeAmount: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const roomSchema = new Schema<RoomDoc>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tamil: { type: String, default: "", trim: true },
    elementId: { type: String, enum: ELEMENT_IDS, required: true, index: true },
    floor: { type: Number, required: true, min: 1, index: true },
    category: { type: String, enum: ROOM_CATEGORIES, default: "Room", index: true },
    summary: { type: String, default: "", trim: true },
    description: { type: [String], default: [] },
    features: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    area: { type: Number, required: true, min: 1 },
    beds: { type: String, default: "" },
    view: { type: String, default: "" },
    totalUnits: { type: Number, required: true, min: 1 },
    baseOccupancy: { type: Number, required: true, default: 2, min: 1 },
    maxOccupancy: { type: Number, required: true, min: 1 },
    maxAdults: { type: Number, default: null, min: 0 },
    maxChildren: { type: Number, default: 0, min: 0 },
    extraAdultPrice: { type: Number, default: 0, min: 0 },
    extraChildPrice: { type: Number, default: 0, min: 0 },
    childAgePolicy: { type: [childBandSchema], default: [] },
    taxPercent: { type: Number, default: 0, min: 0, max: 100 },
    minNights: { type: Number, default: 1, min: 1 },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

roomSchema.index({ isActive: 1, floor: 1 });

export const Room = defineModel<RoomDoc>("Room", roomSchema);
