/**
 * Seeds the database from the existing content files.
 *
 * The site already ships hand-written sample content; this promotes it to the
 * source of truth in Mongo rather than inventing a second, divergent set.
 * Idempotent — re-running upserts by natural key instead of duplicating.
 *
 *   npm run seed
 */

import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { rooms as seedRooms } from "../content/rooms";
import { posts as seedPosts } from "../content/journal";
import { faqGroups, gallery as seedGallery } from "../content/site";

import { User } from "../server/models/User";
import { Room } from "../server/models/Room";
import { RatePlan } from "../server/models/RatePlan";
import { Faq, MediaAsset, Post } from "../server/models/Content";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing — is .env.local loaded?");

async function seedSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("  super admin: skipped (SUPER_ADMIN_EMAIL/PASSWORD not set)");
    return;
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`  super admin: already exists (${email})`);
    return;
  }

  await User.create({
    fullName: process.env.SUPER_ADMIN_NAME || "Administrator",
    email: email.toLowerCase(),
    passwordHash: await bcrypt.hash(password, 12),
    role: "super_admin",
    emailVerifiedAt: new Date(),
  });
  console.log(`  super admin: created (${email})`);
}

async function seedRoomsAndPlans() {
  let created = 0;
  let updated = 0;

  for (const [i, r] of seedRooms.entries()) {

    const doc = {
      slug: r.slug,
      name: r.name,
      tamil: r.tamil,
      elementId: r.elementId,
      floor: r.floor,
      category: r.category,
      summary: r.summary,
      description: r.description,
      features: r.features,
      amenities: r.amenities,
      images: r.images,
      area: r.area,
      beds: r.beds,
      view: r.view,
      // Sample data has no unit count; a boutique property runs one of each.
      totalUnits: 1,
      baseOccupancy: Math.min(2, r.capacity),
      maxOccupancy: r.capacity,
      maxChildren: Math.max(0, r.capacity - 1),
      extraAdultPrice: Math.round(r.rate * 0.2),
      extraChildPrice: Math.round(r.rate * 0.1),
      taxPercent: Number(process.env.TAX_PERCENT ?? 18),
      minNights: r.minNights,
      ratingAverage: r.rating,
      ratingCount: r.reviewCount,
      sortOrder: i,
      isActive: true,
    };

    const res = await Room.updateOne({ slug: r.slug }, { $set: doc }, { upsert: true });
    if (res.upsertedCount) created += 1;
    else updated += 1;

    const room = await Room.findOne({ slug: r.slug }).select("_id").lean();
    if (!room) continue;

    // Two plans per room: the flexible default and a cheaper non-refundable.
    await RatePlan.updateOne(
      { room: room._id, code: "FLEX" },
      {
        $set: {
          room: room._id,
          name: "Flexible — breakfast included",
          code: "FLEX",
          description: "Free cancellation up to seven days before arrival.",
          mealPlan: "breakfast",
          paymentMode: "pay_at_hotel",
          basePrice: r.rate,
          extraAdultPrice: null,
          paidChildPrice: null,
          cancellationPolicy: {
            isRefundable: true,
            deadlineDays: r.category === "House" ? 14 : 7,
            penaltyPercent: 100,
            description:
              "Cancel free up to the deadline; after that the first night is charged.",
          },
          isActive: true,
          sortOrder: 0,
        },
      },
      { upsert: true },
    );

    await RatePlan.updateOne(
      { room: room._id, code: "SAVER" },
      {
        $set: {
          room: room._id,
          name: "Advance saver — non-refundable",
          code: "SAVER",
          description: "15% off. Paid at booking, not refundable.",
          mealPlan: "breakfast",
          paymentMode: "online",
          basePrice: Math.round(r.rate * 0.85),
          cancellationPolicy: {
            isRefundable: false,
            deadlineDays: 0,
            penaltyPercent: 100,
            description: "Non-refundable.",
          },
          isActive: true,
          sortOrder: 1,
        },
      },
      { upsert: true },
    );
  }

  console.log(`  rooms: ${created} created, ${updated} updated`);
  console.log(`  rate plans: ${seedRooms.length * 2} upserted`);
}

async function seedContent() {
  for (const [i, p] of seedPosts.entries()) {
    await Post.updateOne(
      { slug: p.slug },
      {
        $set: {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          hero: p.hero,
          body: p.body,
          author: p.author,
          authorRole: p.authorRole,
          readingMinutes: p.readingMinutes,
          status: "published",
          publishedAt: new Date(p.date),
        },
      },
      { upsert: true },
    );
    if (i === seedPosts.length - 1) console.log(`  posts: ${seedPosts.length} upserted`);
  }

  let faqCount = 0;
  for (const group of faqGroups) {
    for (const [i, item] of group.items.entries()) {
      await Faq.updateOne(
        { group: group.title, question: item.q },
        {
          $set: {
            group: group.title,
            question: item.q,
            answer: item.a,
            sortOrder: i,
            isActive: true,
          },
        },
        { upsert: true },
      );
      faqCount += 1;
    }
  }
  console.log(`  faqs: ${faqCount} upserted`);

  for (const [i, shot] of seedGallery.entries()) {
    await MediaAsset.updateOne(
      { source: shot.id, caption: shot.caption },
      {
        $set: {
          source: shot.id,
          caption: shot.caption,
          category: shot.category,
          tall: Boolean(shot.tall),
          sortOrder: i,
          isActive: true,
        },
      },
      { upsert: true },
    );
  }
  console.log(`  gallery: ${seedGallery.length} upserted`);
}

async function main() {
  await mongoose.connect(uri!, { dbName: process.env.MONGODB_DB || "ainthinai" });
  console.log(`seeding ${mongoose.connection.name}…`);

  await seedSuperAdmin();
  await seedRoomsAndPlans();
  await seedContent();

  // Indexes are declared on the schemas but only built on demand.
  await Promise.all([
    User.syncIndexes(),
    Room.syncIndexes(),
    RatePlan.syncIndexes(),
    Post.syncIndexes(),
    Faq.syncIndexes(),
    MediaAsset.syncIndexes(),
  ]);
  console.log("  indexes: synced");

  await mongoose.disconnect();
  console.log("done.");
}

main().catch(async (error) => {
  console.error("seed failed:", error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
