import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/** Maintenance or closure window. Blocks the room outright. */
export interface RoomBlockDoc {
  _id: Types.ObjectId;
  room: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  reason: "maintenance" | "cleaning" | "held" | "other";
  notes: string;
  createdBy: Types.ObjectId | null;
}

const roomBlockSchema = new Schema<RoomBlockDoc>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: {
      type: String,
      enum: ["maintenance", "cleaning", "held", "other"],
      default: "maintenance",
    },
    notes: { type: String, default: "", trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

roomBlockSchema.index({ room: 1, startDate: 1, endDate: 1 });

export const RoomBlock = defineModel<RoomBlockDoc>("RoomBlock", roomBlockSchema);
