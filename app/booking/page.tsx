import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/booking/BookingForm";
import { Marker, Section, Spec } from "@/components/ui/primitives";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a stay",
  description: "Check dates and request a room. No card taken at this stage.",
};

export default async function BookingPage({
  searchParams,
}: PageProps<"/booking">) {
  const sp = await searchParams;
  const room = typeof sp.room === "string" ? sp.room : undefined;

  return (
    <>
      <PageHero
        eyebrow="Book"
        title="Check dates and hold a room"
        standfirst="No card is taken at this stage. We confirm by email within one working day, and you can cancel free up to seven days before you arrive."
        photo="photo-1596394516093-501ba68a0ba6"
      />

      <Section className="pt-24 lg:pt-32">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            <Spec k="Included" v="Breakfast, yoga, walks, bath house" />
            <Spec k="Cancellation" v="Free to 7 days out" sub="14 days for the houses" />
            <Spec k="Minimum" v="2 nights" sub="3 for Kayal and Vaan" />
            <Spec k="Reservations" v={contact.reservations} sub={contact.hours[1].v} />
          </dl>
        </Reveal>
      </Section>

      <Section className="py-20 lg:py-28">
        <Marker>Your stay</Marker>
        <Reveal>
          <BookingForm initialRoom={room} />
        </Reveal>
      </Section>
    </>
  );
}
