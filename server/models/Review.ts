import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/**
 * Guest review, tied to a stay.
 *
 * The legacy project had no guest reviews at all — only hand-curated
 * testimonials and a read-only Google feed. Requiring a completed booking is
 * what makes these trustworthy, and the unique index enforces one per stay.
 */
export interface ReviewDoc {
  _id: Types.ObjectId;
  booking: Types.ObjectId;
  room: Types.ObjectId;
  user: Types.ObjectId;
  authorName: string;
  authorCity: string;
  rating: number;
  title: string;
  body: string;
  status: "pending" | "published" | "rejected";
  staffReply: string;
  repliedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDoc>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    authorName: { type: String, required: true, trim: true },
    authorCity: { type: String, default: "", trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 4000 },
    status: {
      type: String,
      enum: ["pending", "published", "rejected"],
      default: "pending",
      index: true,
    },
    staffReply: { type: String, default: "", trim: true },
    repliedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// One review per stay.
reviewSchema.index({ booking: 1 }, { unique: true });
reviewSchema.index({ room: 1, status: 1, createdAt: -1 });

export const Review = defineModel<ReviewDoc>("Review", reviewSchema);
