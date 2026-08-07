import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/** Per-date unit count and OTA-style selling restrictions. */
export interface DailyInventoryDoc {
  _id: Types.ObjectId;
  room: Types.ObjectId;
  date: Date;
  totalUnits: number;
  stopSell: boolean;
  minStay: number;
  /** 0 = unlimited */
  maxStay: number;
  closeToArrival: boolean;
  closeToDeparture: boolean;
  notes: string;
}

const dailyInventorySchema = new Schema<DailyInventoryDoc>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: Date, required: true },
    totalUnits: { type: Number, required: true, min: 0 },
    stopSell: { type: Boolean, default: false },
    minStay: { type: Number, default: 1, min: 1 },
    maxStay: { type: Number, default: 0, min: 0 },
    closeToArrival: { type: Boolean, default: false },
    closeToDeparture: { type: Boolean, default: false },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

dailyInventorySchema.index({ room: 1, date: 1 }, { unique: true });

export const DailyInventory = defineModel<DailyInventoryDoc>(
  "DailyInventory",
  dailyInventorySchema,
);
