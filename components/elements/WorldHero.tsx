"use client";

import Image from "next/image";
import Link from "next/link";
import { elements, img } from "@/content/elements";
import { PALETTE_MS, useElement } from "./ElementContext";
import Swap from "./Swap";
import ElementCarousel from "./ElementCarousel";
import ReserveCard from "./ReserveCard";

/**
 * All five worlds are mounted at once and cross-faded.
 *
 * Swapping the `src` of a single <Image> would mean a network round trip on
 * every selection, and the visitor would watch a blank frame. Holding five
 * layers costs one extra decode up front and buys an instant change — which is
 * the whole point of the interaction.
 */
export default function WorldHero() {
  const { active, pending } = useElement();
  const shown = pending ?? active;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Stacked worlds */}
      <div className="absolute inset-0">
        {elements.map((el, i) => {
          const on = el.id === shown.id;
          return (
            <div
              key={el.id}
              aria-hidden={!on}
              className="absolute inset-0"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "scale(1)" : "scale(1.06)",
                transition: `opacity ${PALETTE_MS}ms var(--ease-world), transform 2200ms var(--ease-world)`,
                willChange: "opacity, transform",
              }}
            >
              <Image
                src={img(el.hero, 2200, 76)}
                alt={`${el.english} — ${el.material}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Grounds the type.
          Two layers, not one. The vertical pass keeps the header and the
          carousel legible top and bottom; the horizontal pass darkens the left
          third where the headline actually sits and fades out well before the
          right, so the photograph stays open where nothing is written on it.
          A single vertical gradient left the type stranded on bright picture
          once the headline moved to the middle of the frame.
          Both are mixed from --ground, so on Air — the pale world — the scrim
          lightens instead of darkening, and dark ink stays readable. */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right,
              color-mix(in srgb, var(--ground) 82%, transparent) 0%,
              color-mix(in srgb, var(--ground) 58%, transparent) 30%,
              color-mix(in srgb, var(--ground) 18%, transparent) 62%,
              transparent 85%),
            linear-gradient(to bottom,
              color-mix(in srgb, var(--ground) 70%, transparent) 0%,
              color-mix(in srgb, var(--ground) 26%, transparent) 20%,
              color-mix(in srgb, var(--ground) 34%, transparent) 58%,
              color-mix(in srgb, var(--ground) 92%, transparent) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative flex flex-1 flex-col px-6 pb-4 pt-20 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
          {/* Two rows at lg: the first takes the leftover height and centres the
              headline and the booking card inside it, the second hugs the
              bottom for the carousel. On a tall screen the type floats mid-
              frame; on a short one it simply fills. */}
          <div className="flex flex-1 flex-col gap-8 lg:grid lg:grid-cols-[1.35fr_1fr] lg:grid-rows-[1fr_auto] lg:items-center lg:gap-x-10 lg:gap-y-8">
            {/* All three reset to order-0 at lg so grid auto-placement follows
                DOM order (text, card, carousel). */}
            <div className="order-1 lg:order-none">
              <Swap index={0}>
                <p className="u-label mb-5 opacity-60">
                  {shown.floorLabel} · {shown.temperature} · {shown.quality}
                </p>
              </Swap>

              <Swap index={1}>
                <p
                  lang="ta"
                  className="mb-2 font-tamil text-[clamp(1.9rem,min(4.6vw,8vh),4.2rem)] leading-[1.05]"
                  style={{ color: "var(--accent)" }}
                >
                  {shown.tamil}
                </p>
              </Swap>

              <Swap index={2} as="h1">
                <span className="block font-display text-[clamp(1.7rem,min(4.2vw,7vh),4rem)] font-light leading-[1.03]">
                  {shown.headline}
                </span>
              </Swap>

              <Swap index={3}>
                <p className="mt-6 max-w-xl text-[0.92rem] leading-[1.75] text-muted">
                  {shown.standfirst}
                </p>
              </Swap>

              <Swap index={4}>
                <Link
                  href="/rooms"
                  className="group mt-7 inline-flex items-center gap-4 rounded-full px-8 py-3.5 transition-transform duration-500 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--ground)",
                    // Colour comes from the animated variables; only the lift
                    // needs a transition of its own.
                    transition: "transform 500ms var(--ease-world)",
                  }}
                >
                  <span className="u-label">{shown.cta}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Swap>
            </div>

            {/* Reservation entry. Shares its state with the carousel, so the
                two never disagree about which world you are in. */}
            <Swap index={5} className="order-3 lg:order-none lg:justify-self-end">
              <ReserveCard />
            </Swap>

            {/* The selector, pinned to the bottom of the frame. On narrow
                screens it sits above the reservation card so it is not buried
                under a form. */}
            <div className="order-2 w-full lg:order-none lg:col-span-2 lg:self-end">
              <ElementCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
