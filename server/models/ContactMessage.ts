import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/** Contact form submissions. The legacy project discarded these entirely. */
export interface ContactMessageDoc {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  handledBy: Types.ObjectId | null;
  /** Kept for abuse triage only. */
  ipHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<ContactMessageDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
      index: true,
    },
    handledBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    ipHash: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ContactMessage = defineModel<ContactMessageDoc>(
  "ContactMessage",
  contactMessageSchema,
);
