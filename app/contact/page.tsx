import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Marker, Section, RULE } from "@/components/ui/primitives";
import BookingForm from "@/components/booking/BookingForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reservations, directions and how to reach the desk.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Someone answers the phone here"
        standfirst="Reservations are handled by three people who have all worked here since it opened. There is no call centre and no chatbot."
        photo="photo-1507525428034-b723cf961d3e"
      />

      <Section className="pt-24 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-16">
          <Reveal>
            <h2 className="u-label mb-6 opacity-45">Reach us</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href={`tel:${contact.reservations.replace(/\s/g, "")}`} className="hover:opacity-60">
                  {contact.reservations}
                </a>
                <span className="u-label ml-3 opacity-40">Reservations</span>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:opacity-60">
                  {contact.phone}
                </a>
                <span className="u-label ml-3 opacity-40">Reception</span>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:opacity-60">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.press}`} className="hover:opacity-60">
                  {contact.press}
                </a>
                <span className="u-label ml-3 opacity-40">Press</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="u-label mb-6 opacity-45">Where</h2>
            <address className="flex flex-col gap-1 text-sm not-italic text-muted">
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span className="u-readout mt-3 opacity-50">{contact.coords}</span>
            </address>
          </Reveal>

          <Reveal delay={0.16}>
            <h2 className="u-label mb-6 opacity-45">Hours</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {contact.hours.map((h) => (
                <div key={h.k} className="flex items-baseline justify-between gap-6 border-b pb-3"
                     style={{ borderColor: RULE }}>
                  <dt className="text-muted">{h.k}</dt>
                  <dd>{h.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-20 lg:pt-28">
        <Marker>Getting here</Marker>
        <Reveal>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {contact.directions.map((d) => (
              <div key={d.k} className="border-t pt-5" style={{ borderColor: RULE }}>
                <dt className="u-label opacity-45">{d.k}</dt>
                <dd className="mt-2 font-display text-lg leading-tight">{d.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section className="py-24 lg:py-36">
        <Marker>Enquire</Marker>
        <Reveal>
          <BookingForm />
        </Reveal>
      </Section>
    </>
  );
}
