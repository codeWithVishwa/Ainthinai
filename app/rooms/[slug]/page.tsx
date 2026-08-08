import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import AvailabilityCalendar from "@/components/booking/AvailabilityCalendar";
import { ReviewCard, RoomCard } from "@/components/cards";
import { Cta, GhostCta, Marker, Section, Spec, Stars, Tag, RULE } from "@/components/ui/primitives";
import { findElement, img, money } from "@/content/elements";
import { findRoom, reviewsForRoom, rooms } from "@/content/rooms";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/rooms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) return { title: "Room not found" };
  return { title: `${room.name} — floor ${room.floor}`, description: room.summary };
}

export default async function RoomPage({ params }: PageProps<"/rooms/[slug]">) {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) notFound();

  const el = findElement(room.elementId);
  const reviews = reviewsForRoom(room.slug);
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <>
      {/* Gallery header — one large plate and two stacked */}
      <section className="px-6 pt-28 lg:px-12 lg:pt-32">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] lg:aspect-[3/2]">
              <Image
                src={img(room.images[0], 1800)}
                alt={room.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {room.images.slice(1, 3).map((id) => (
                <div key={id} className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                  <Image
                    src={img(id, 900)}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Title and specification */}
      <Section className="pt-14 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Tag>{room.category}</Tag>
                <Tag>{el.floorLabel} · {el.english}</Tag>
                {room.rackRate && <Tag>Offer</Tag>}
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02]">
                {room.name}
                <span lang="ta" className="ml-4 font-tamil text-[0.5em] opacity-50">
                  {room.tamil}
                </span>
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Stars value={room.rating} size={14} />
                <span className="u-label opacity-45">
                  {room.reviewCount} reviews
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {room.description.map((p, i) => (
                <p
                  key={i}
                  className={`max-w-2xl text-[0.95rem] leading-[1.9] text-muted ${i === 0 ? "mt-9" : "mt-5"}`}
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="u-label mt-14 opacity-45">In this room</h2>
              <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {room.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-baseline gap-3 border-t pt-4 text-sm"
                    style={{ borderColor: RULE }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--accent)" }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Booking panel */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[18px] border p-6" style={{ borderColor: RULE }}>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-3xl" style={{ color: "var(--accent)" }}>
                    {money(room.rate)}
                  </p>
                  <p className="u-label mt-1 opacity-45">per night, breakfast in</p>
                </div>
                {room.rackRate && (
                  <p className="u-readout text-sm line-through opacity-40">
                    {money(room.rackRate)}
                  </p>
                )}
              </div>

              <dl
                className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6"
                style={{ borderColor: RULE }}
              >
                <Spec k="Size" v={`${room.area}m²`} />
                <Spec k="Sleeps" v={`${room.capacity}`} />
                <Spec k="Beds" v={room.beds} />
                <Spec k="View" v={room.view} />
                <Spec k="Minimum" v={`${room.minNights} nights`} />
                <Spec k="Floor" v={`${el.floorLabel} · ${el.english}`} />
              </dl>

              <div className="mt-7 flex flex-col gap-3">
                <Cta href={`/booking?room=${room.slug}`} className="justify-center">
                  Check availability
                </Cta>
                <GhostCta href="/contact" className="justify-center">
                  Ask a question
                </GhostCta>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Amenities */}
      <Section className="pt-24 lg:pt-32">
        <Marker>Amenities</Marker>
        <Reveal>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {room.amenities.map((a) => (
              <li
                key={a}
                className="border-t pt-4 text-sm text-muted"
                style={{ borderColor: RULE }}
              >
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Availability */}
      <Section className="pt-24 lg:pt-32">
        <Marker>Availability</Marker>
        <Reveal>
          <AvailabilityCalendar blocked={room.blocked} />
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
            Live for the next twelve months. {room.name} has a {room.minNights}-night
            minimum, and rates drop in April and May when it is hot and quiet.
          </p>
        </Reveal>
      </Section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <Section className="pt-24 lg:pt-32">
          <Marker>What guests said</Marker>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 0.08}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* Other rooms */}
      <Section className="py-24 lg:py-36">
        <Marker>Other rooms</Marker>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {others.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.08}>
              <RoomCard room={r} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
