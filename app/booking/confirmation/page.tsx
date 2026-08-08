import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cta, GhostCta, Marker, Section, Spec, RULE } from "@/components/ui/primitives";
import Reveal from "@/components/Reveal";
import { findElement, img, money } from "@/content/elements";
import { findRoom, rooms } from "@/content/rooms";
import { contact, sampleBooking } from "@/content/site";

export const metadata: Metadata = {
  title: "Booking requested",
  description: "Your request is with the reservations desk.",
};

const pretty = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

const nights = (a: string, b: string) =>
  a && b ? Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)) : 0;

export default async function ConfirmationPage({
  searchParams,
}: PageProps<"/booking/confirmation">) {
  const sp = await searchParams;
  const str = (k: string, fallback: string) =>
    typeof sp[k] === "string" && sp[k] ? (sp[k] as string) : fallback;

  // Falls back to the sample booking so the screen is presentable when opened
  // directly, without a request having been made.
  const reference = str("ref", sampleBooking.reference);
  const room = findRoom(str("room", sampleBooking.roomSlug)) ?? rooms[0];
  const arrive = str("arrive", sampleBooking.arrive);
  const depart = str("depart", sampleBooking.depart);
  const guests = str("guests", String(sampleBooking.guests));
  const guestName = str("name", sampleBooking.guestName);

  const el = findElement(room.elementId);
  const n = nights(arrive, depart) || sampleBooking.nights;
  const sub = room.rate * n;
  const tax = Math.round(sub * sampleBooking.taxRate);
  const total = sub + tax;

  return (
    <>
      <Section className="pt-36 lg:pt-44">
        <Reveal>
          <p className="u-label opacity-45">Request received</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4.2rem)] font-light leading-[1.04]">
            Thank you, {guestName.split(" ")[0]}. We have your dates.
          </h1>
          <p className="mt-8 max-w-2xl text-[0.98rem] leading-[1.85] text-muted">
            Nothing has been charged. Reservations will confirm by email within one
            working day — usually the same morning. Your reference is below; quote
            it if you call.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-14 lg:pt-16">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Room plate */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px]">
              <Image
                src={img(room.images[0], 1200)}
                alt={room.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <span
                className="u-label absolute left-3 top-3 rounded-md px-2 py-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.9)", fontSize: "0.55rem" }}
              >
                {el.floorLabel} · {el.english}
              </span>
            </div>

            {/* Itinerary */}
            <div className="rounded-[18px] border p-7" style={{ borderColor: RULE }}>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-2xl leading-none">{room.name}</h2>
                <span className="u-label u-readout" style={{ color: "var(--accent)" }}>
                  {reference}
                </span>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
                <Spec k="Arrive" v={pretty(arrive)} sub="from 14:00" />
                <Spec k="Depart" v={pretty(depart)} sub="by 11:00" />
                <Spec k="Nights" v={String(n)} />
                <Spec k="Guests" v={guests} />
              </dl>

              <dl
                className="mt-8 flex flex-col gap-3 border-t pt-6 text-sm"
                style={{ borderColor: RULE }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">{money(room.rate)} × {n} nights</dt>
                  <dd className="u-readout">{money(sub)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">Taxes and fees (18%)</dt>
                  <dd className="u-readout">{money(tax)}</dd>
                </div>
              </dl>

              <div
                className="mt-6 flex items-baseline justify-between border-t pt-6"
                style={{ borderColor: RULE }}
              >
                <span className="u-label opacity-60">Payable on departure</span>
                <span className="font-display text-2xl" style={{ color: "var(--accent)" }}>
                  {money(total)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-20 lg:pt-28">
        <Marker>What happens next</Marker>
        <ol className="grid gap-8 sm:grid-cols-3">
          {[
            { n: "01", t: "We check the room", d: "Someone looks at the actual book, not a system. Usually within a couple of hours." },
            { n: "02", t: "You get an email", d: "Confirming the room and asking about arrival time and anything you do not eat." },
            { n: "03", t: "That is it", d: "Nothing is charged until you leave. Cancel free up to seven days before." },
          ].map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08}>
              <div className="border-t pt-5" style={{ borderColor: RULE }}>
                <span className="u-readout font-display text-2xl" style={{ color: "var(--accent)" }}>
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="py-24 lg:py-36">
        <Reveal>
          <div className="flex flex-col items-start gap-8 border-t pt-14" style={{ borderColor: RULE }}>
            <p className="max-w-2xl font-display text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.12]">
              Anything to add before you arrive? Call the desk on {contact.reservations}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Cta href="/rooms">Look at the other floors</Cta>
              <GhostCta href="/faq">Read the questions</GhostCta>
            </div>
            <Link href="/" className="u-label opacity-45 transition-opacity hover:opacity-80">
              Back to the beginning
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
