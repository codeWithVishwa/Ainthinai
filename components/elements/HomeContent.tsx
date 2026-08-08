"use client";

import Image from "next/image";
import { elements, img, money, resort } from "@/content/elements";
import { useElement } from "./ElementContext";
import Swap from "./Swap";
import WorldHero from "./WorldHero";
import Reveal from "../Reveal";

const PAD = "px-6 lg:px-12";
const INNER = "mx-auto w-full max-w-[1500px]";

export default function HomeContent() {
  const { active, pending, select } = useElement();
  const shown = pending ?? active;

  return (
    <>
      <WorldHero />

      {/* The premise ---------------------------------------------------- */}
      <section className={`${PAD} py-32 lg:py-48`}>
        <div className={INNER}>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3.4rem)] font-light leading-[1.14]">
                Five levels, five landscapes. The ground is earth, the first
                floor is rivers, and the roof belongs to the sea.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="lg:pt-3">
              <p className="text-[0.95rem] leading-[1.9] text-muted">
                Not five versions of the same room in different colours — five
                buildings inside one building. The clay floor holds the cool, the
                river floor moves the light, and the second floor has no doors
                at all.
              </p>
              <p className="mt-6 text-[0.95rem] leading-[1.9] text-muted">
                You are standing on one of them now. Pick another and the whole
                place changes around you.
              </p>
            </Reveal>
          </div>

          {/* The floor's specification, as the spec it is. */}
          <Swap index={0} className="mt-20">
            <dl
              className="grid grid-cols-2 gap-x-10 gap-y-8 border-t pt-10 sm:grid-cols-3 lg:grid-cols-5"
              style={{ borderColor: "color-mix(in srgb, currentColor 14%, transparent)" }}
            >
              <Spec k="Landscape" v={shown.english} tamil={shown.tamil} />
              <Spec k="Material" v={shown.material} />
              <Spec k="Light" v={shown.light} />
              <Spec k="Temperature" v={shown.temperature} />
              <Spec k="Quality" v={shown.quality} />
            </dl>
          </Swap>
        </div>
      </section>

      {/* Rooms of the active element ------------------------------------ */}
      <section className={`${PAD} py-16 lg:py-24`}>
        <div className={INNER}>
          <Swap index={0}>
            <div className="mb-16 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="u-label opacity-40">{shown.floorLabel}</span>
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.8rem)] font-light leading-none">
                Rooms on the {shown.english.toLowerCase()} floor
              </h2>
              <span lang="ta" className="font-tamil text-2xl opacity-45">
                {shown.tamil}
              </span>
            </div>
          </Swap>

          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {shown.rooms.map((room, i) => (
              <Swap as="li" key={`${shown.id}-${room.name}`} index={i + 1}>
                <div className="group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={img(shown.gallery[i % shown.gallery.length], 1100)}
                      alt={`${room.name}, ${shown.english}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-world)] group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl">
                      {room.name}
                      <span lang="ta" className="ml-3 font-tamil text-lg opacity-50">
                        {room.tamil}
                      </span>
                    </h3>
                    <span className="u-label u-readout opacity-45">{room.area}m²</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{room.note}</p>
                  <p className="u-label mt-4" style={{ color: "var(--accent)" }}>
                    From {money(room.rate)} a night
                  </p>
                </div>
              </Swap>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiences of the active element ------------------------------ */}
      <section className={`${PAD} py-24 lg:py-36`}>
        <div className={INNER}>
          <Swap index={0}>
            <h2 className="mb-14 font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-light">
              What {shown.english} asks of you
            </h2>
          </Swap>

          <ul>
            {shown.experiences.map((e, i) => (
              <Swap
                as="li"
                key={`${shown.id}-${e.name}`}
                index={i + 1}
                className="flex flex-col gap-2 border-t py-7 sm:flex-row sm:items-baseline sm:gap-10"
                style={{ borderColor: "color-mix(in srgb, currentColor 12%, transparent)" }}
              >
                <span
                  className="u-readout font-display text-2xl"
                  style={{ color: "var(--accent)" }}
                >
                  {e.time}
                </span>
                <span className="font-display text-xl sm:w-64 sm:shrink-0">{e.name}</span>
                <span className="text-sm leading-relaxed text-muted">{e.note}</span>
              </Swap>
            ))}
          </ul>
        </div>
      </section>

      {/* All five — the invitation to explore --------------------------- */}
      <section className={`${PAD} py-28 lg:py-40`}>
        <div className={INNER}>
          <Reveal>
            <p className="u-label mb-4 opacity-40">{resort.tagline}</p>
            <h2 className="mb-16 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-light leading-[1.08]">
              This isn&rsquo;t a hotel with five themes. It is five landscapes
              that happen to share a lift.
            </h2>
          </Reveal>

          <ul>
            {elements.map((el, i) => {
              const on = el.id === shown.id;
              return (
                <Reveal as="li" key={el.id} delay={i * 0.07}>
                  <button
                    type="button"
                    onClick={() => {
                      select(el.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-t py-8 text-left transition-opacity duration-500 sm:grid-cols-[5rem_11rem_1fr_auto] sm:gap-x-10"
                    style={{
                      borderColor: "color-mix(in srgb, currentColor 12%, transparent)",
                      opacity: on ? 1 : 0.55,
                    }}
                  >
                    <span
                      className="u-label u-readout"
                      style={{ color: on ? "var(--accent)" : undefined }}
                    >
                      {el.badge}
                    </span>
                    <span
                      lang="ta"
                      className="font-tamil text-[clamp(1.5rem,3vw,2.4rem)] leading-none transition-transform duration-700 group-hover:translate-x-1"
                    >
                      {el.tamil}
                    </span>
                    <span className="col-span-2 sm:col-span-1">
                      <span className="font-display text-xl">{el.english}</span>
                      <span className="ml-3 text-sm text-muted">{el.material}</span>
                      <span className="mt-1 block text-xs text-muted opacity-70">
                        {el.quality} · {el.temperature}
                      </span>
                    </span>
                    <span className="u-label hidden opacity-45 sm:block">
                      {on ? "You are here" : "Enter"}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

function Spec({
  k,
  v,
  tamil,
}: {
  k: string;
  v: string;
  tamil?: string;
}) {
  return (
    <div>
      <dt className="u-label opacity-40">{k}</dt>
      <dd className="mt-2 text-sm leading-snug">
        {v}
        {tamil && (
          <span lang="ta" className="ml-2 font-tamil opacity-60">
            {tamil}
          </span>
        )}
      </dd>
    </div>
  );
}
