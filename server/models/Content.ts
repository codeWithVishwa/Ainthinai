import { Schema, type Types } from "mongoose";
import { defineModel } from "./model";

/* ---- Journal post ------------------------------------------------------ */

export interface PostDoc {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  hero: string;
  /** Structured blocks, not an HTML blob — the template controls typography. */
  body: PostBlock[];
  author: string;
  authorRole: string;
  readingMinutes: number;
  status: "draft" | "published";
  publishedAt: Date | null;
  createdBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

/** One block of article body. Typed rather than Mixed so the shape is enforced. */
export interface PostBlock {
  type: "p" | "h2" | "quote" | "image";
  text?: string;
  cite?: string;
  /** Image source, when type is "image". */
  id?: string;
  caption?: string;
}

const postBlockSchema = new Schema<PostBlock>(
  {
    type: { type: String, enum: ["p", "h2", "quote", "image"], required: true },
    text: { type: String },
    cite: { type: String },
    id: { type: String },
    caption: { type: String },
  },
  { _id: false },
);

const postSchema = new Schema<PostDoc>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "", trim: true },
    category: { type: String, default: "Building", trim: true, index: true },
    hero: { type: String, default: "" },
    body: { type: [postBlockSchema], default: [] },
    author: { type: String, default: "" },
    authorRole: { type: String, default: "" },
    readingMinutes: { type: Number, default: 5, min: 1 },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

postSchema.index({ status: 1, publishedAt: -1 });

export const Post = defineModel<PostDoc>("Post", postSchema);

/* ---- FAQ --------------------------------------------------------------- */

export interface FaqDoc {
  _id: Types.ObjectId;
  group: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

const faqSchema = new Schema<FaqDoc>(
  {
    group: { type: String, required: true, trim: true, index: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export const Faq = defineModel<FaqDoc>("Faq", faqSchema);

/* ---- Gallery / media --------------------------------------------------- */

export interface MediaAssetDoc {
  _id: Types.ObjectId;
  /** Unsplash id today; an uploaded path once storage is wired up. */
  source: string;
  caption: string;
  category: string;
  tall: boolean;
  sortOrder: number;
  isActive: boolean;
  uploadedBy: Types.ObjectId | null;
}

const mediaAssetSchema = new Schema<MediaAssetDoc>(
  {
    source: { type: String, required: true, trim: true },
    caption: { type: String, default: "", trim: true },
    category: { type: String, default: "The building", trim: true, index: true },
    tall: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

export const MediaAsset = defineModel<MediaAssetDoc>("MediaAsset", mediaAssetSchema);
