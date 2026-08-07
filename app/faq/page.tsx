import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Cta, GhostCta, Marker, Section } from "@/components/ui/primitives";
import { contact, faqGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Questions",
  description: "Rates, the building, getting here, and what happens during your stay.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="The things people ask before booking"
        standfirst="Answered plainly. If something here is not covered, the reservations desk answers the phone between eight and eight."
        photo="photo-1600607687939-ce8a6c25118c"
      />

      {faqGroups.map((group, i) => (
        <Section key={group.title} className={i === 0 ? "pt-24 lg:pt-32" : "pt-20 lg:pt-28"}>
          <Marker>{group.title}</Marker>
          <Reveal>
            <Accordion items={group.items} />
          </Reveal>
        </Section>
      ))}

      <Section className="py-28 lg:py-40">
        <Reveal>
          <div
            className="flex flex-col items-start gap-8 border-t pt-14"
            style={{ borderColor: "color-mix(in srgb, currentColor 14%, transparent)" }}
          >
            <p className="max-w-2xl font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-[1.12]">
              Still unsure about something?
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Reservations answer {contact.hours[1].v.toLowerCase()} on {contact.reservations}.
              Email is usually faster.
            </p>
            <div className="flex flex-wrap gap-3">
              <Cta href="/contact">Write to us</Cta>
              <GhostCta href="/booking">Check dates</GhostCta>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
