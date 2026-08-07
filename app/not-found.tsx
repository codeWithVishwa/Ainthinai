import Link from "next/link";
import { Cta, GhostCta, Section, RULE } from "@/components/ui/primitives";
import { elements } from "@/content/elements";

export default function NotFound() {
  return (
    <Section className="flex min-h-[80svh] flex-col justify-center py-32">
      <p className="u-label opacity-45">404</p>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.02]">
        There is no sixth floor
      </h1>
      <p className="mt-8 max-w-xl text-[0.98rem] leading-[1.85] text-muted">
        The page you asked for does not exist — or it has moved while the
        building was still settling. The five that do exist are below.
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {[...elements]
          .sort((a, b) => a.floor - b.floor)
          .map((el) => (
            <li key={el.id}>
              <Link
                href="/rooms"
                className="group block border-t pt-4 transition-opacity hover:opacity-70"
                style={{ borderColor: RULE }}
              >
                <span className="u-label u-readout opacity-40">{el.badge}</span>
                <span lang="ta" className="mt-2 block font-tamil text-2xl leading-none">
                  {el.tamil}
                </span>
                <span className="mt-2 block font-display text-lg">{el.english}</span>
              </Link>
            </li>
          ))}
      </ul>

      <div className="mt-14 flex flex-wrap gap-3">
        <Cta href="/">Back to the beginning</Cta>
        <GhostCta href="/contact">Ask someone</GhostCta>
      </div>
    </Section>
  );
}
