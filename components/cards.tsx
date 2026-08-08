import Image from "next/image";
import Link from "next/link";
import { findElement, img, money } from "@/content/elements";
import type { Room, Review } from "@/content/rooms";
import type { Post } from "@/content/journal";
import { formatDate } from "@/content/journal";
import { RULE, Stars, Tag } from "./ui/primitives";

/**
 * Card set shared across Rooms, Journal and Testimonials.
 *
 * All three follow the same anatomy — picture, then a baseline-aligned title
 * row, then muted supporting text — so a grid of any of them reads as the same
 * family.
 */

export function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  const el = findElement(room.elementId);
  return (
    <Link href={`/rooms/${room.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
        <Image
          src={img(room.images[0], 900)}
          alt={room.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-world)] group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
          }}
        />
        <span
          className="u-label u-readout absolute left-3 top-3 rounded-md px-2 py-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.9)", fontSize: "0.55rem" }}
        >
          {el.floorLabel} · {el.english}
        </span>
        {room.rackRate && (
          <span
            className="u-label absolute right-3 top-3 rounded-md px-2 py-1"
            style={{ backgroundColor: "var(--accent)", color: "var(--ground)", fontSize: "0.55rem" }}
          >
            Offer
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <span className="font-display text-2xl" style={{ color: "rgba(255,255,255,0.96)" }}>
            {room.name}
            <span lang="ta" className="ml-2 font-tamil text-base opacity-70">
              {room.tamil}
            </span>
          </span>
          <Stars value={room.rating} />
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="u-label opacity-50">
          {room.category} · {room.area}m² · {room.capacity} guests
        </p>
        <p className="u-label" style={{ color: "var(--accent)" }}>
          {money(room.rate)}
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{room.summary}</p>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure
      className="flex h-full flex-col rounded-[14px] border p-6"
      style={{ borderColor: RULE }}
    >
      <Stars value={review.rating} size={13} />
      <blockquote className="mt-5 flex-1">
        <p className="font-display text-lg leading-snug">{review.title}</p>
        <p className="mt-3 text-sm leading-[1.8] text-muted">{review.body}</p>
      </blockquote>
      <figcaption className="mt-6 border-t pt-4" style={{ borderColor: RULE }}>
        <p className="text-sm">{review.author}</p>
        <p className="u-label mt-1 opacity-45">
          {review.from} · {review.stayed}
        </p>
      </figcaption>
    </figure>
  );
}

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px]">
        <Image
          src={img(post.hero, 900)}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-world)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Tag>{post.category}</Tag>
        <span className="u-label opacity-40">{post.readingMinutes} min</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-[1.15] transition-opacity group-hover:opacity-70">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <p className="u-label mt-4 opacity-40">
        {formatDate(post.date)} · {post.author}
      </p>
    </Link>
  );
}
