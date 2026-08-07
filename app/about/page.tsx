import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { about, elements, resort } from "@/content/elements";

export const metadata: Metadata = {
  title: about.title,
  description: about.standfirst,
};

const PAD = "px-6 lg:px-12";
const INNER = "mx-auto w-full max-w-[1500px]";
const RULE = "color-mix(in srgb, currentColor 14%, transparent)";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        standfirst={about.standfirst}
        photo={about.hero}
      />

      {/* Chapters. Numbered because this genuinely is a sequence — the idea,
          then how it was made, then who made it. */}
      <section className={`${PAD} py-28 lg:py-40`}>
        <div className={INNER}>
          {about.chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05}>
              <article
                className="grid gap-8 border-t py-14 lg:grid-cols-[6rem_1fr_1fr] lg:gap-16 lg:py-20"
                style={{ borderColor: RULE }}
              >
                <p
                  className="u-label u-readout font-display text-3xl leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  {c.n}
                </p>
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.6rem)] font-light leading-[1.12]">
                  {c.title}
                </h2>
                <div>
                  {c.body.map((p, j) => (
                    <p
                      key={j}
                      className={`text-[0.95rem] leading-[1.9] text-muted ${j > 0 ? "mt-5" : ""}`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The building, in numbers */}
      <section className={`${PAD} pb-28 lg:pb-40`}>
        <div className={INNER}>
          <Reveal>
            <h2 className="u-label mb-10 opacity-40">The building</h2>
            <dl
              className="grid grid-cols-2 gap-x-10 gap-y-10 border-t pt-12 sm:grid-cols-3 lg:grid-cols-6"
              style={{ borderColor: RULE }}
            >
              {about.facts.map((f) => (
                <div key={f.k}>
                  <dt className="u-label opacity-40">{f.k}</dt>
                  <dd className="mt-2 font-display text-xl leading-tight">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* The five, as a way into the rest of the site */}
      <section className={`${PAD} pb-28 lg:pb-40`}>
        <div className={INNER}>
          <Reveal>
            <h2 className="mb-14 max-w-3xl font-display text-[clamp(1.7rem,3.6vw,3rem)] font-light leading-[1.1]">
              Five floors, and not one of them holds the same temperature as
              another.
            </h2>
          </Reveal>

          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {elements.map((el, i) => (
              <Reveal as="li" key={el.id} delay={i * 0.06}>
                <div
                  className="flex h-full flex-col border-t pt-6"
                  style={{ borderColor: RULE }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span lang="ta" className="font-tamil text-2xl leading-none">
                      {el.tamil}
                    </span>
                    <span className="u-label u-readout opacity-40">{el.badge}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl">{el.english}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {el.material}
                  </p>
                  <p className="u-label mt-4 opacity-50">{el.temperature}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Credits */}
      <section className={`${PAD} pb-32 lg:pb-48`}>
        <div className={INNER}>
          <Reveal>
            <h2 className="u-label mb-10 opacity-40">Made by</h2>
            <ul>
              {about.people.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-col gap-1 border-t py-6 sm:flex-row sm:items-baseline sm:gap-10"
                  style={{ borderColor: RULE }}
                >
                  <span className="u-label sm:w-56 sm:shrink-0 opacity-60">
                    {p.name}
                  </span>
                  <span className="font-display text-xl">{p.by}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="mt-20 flex flex-col items-start gap-8 border-t pt-14"
              style={{ borderColor: RULE }}
            >
              <p className="max-w-2xl font-display text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.12]">
                Come and see which floor you end up staying on.
              </p>
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-4 rounded-full px-8 py-3.5 transition-transform duration-500 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
              >
                <span className="u-label">See the rooms</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <p className="u-label opacity-40">
                {resort.location} · {resort.phone}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
