import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { RoomCard } from "@/components/cards";
import { Cta, Marker, Section, Spec } from "@/components/ui/primitives";
import { elements, money } from "@/content/elements";
import { rateRange, rooms } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Ten rooms across five floors. Each floor is built from a different material and holds a different temperature.",
};

export default function RoomsPage() {
  const { min, max } = rateRange();

  return (
    <>
      <PageHero
        eyebrow="Rooms"
        title="Ten rooms, five floors, no two alike"
        standfirst="Rooms are not graded here — they are placed. Which floor you take decides the material around you, the light you get, and how warm the room runs. Pick the one you want to wake up in."
        photo="photo-1631049307264-da0ec9d70304"
      />

      <Section className="pt-24 lg:pt-32">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            <Spec k="Rooms" v="Ten" />
            <Spec k="Floors" v="Five, one per element" />
            <Spec k="From" v={money(min)} sub="per night, breakfast included" />
            <Spec k="To" v={money(max)} sub="Vaan, the roof house" />
          </dl>
        </Reveal>
      </Section>

      {/* Grouped by floor rather than by price — the floor is the product. */}
      {[...elements]
        .sort((a, b) => a.floor - b.floor)
        .map((el) => {
          const floorRooms = rooms.filter((r) => r.elementId === el.id);
          if (floorRooms.length === 0) return null;
          return (
            <Section key={el.id} className="pt-24 lg:pt-32">
              <Marker>
                Floor {el.floor} · {el.english} · {el.temperature}
              </Marker>

              <Reveal>
                <div className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                  <span lang="ta" className="font-tamil text-4xl leading-none">
                    {el.tamil}
                  </span>
                  <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-none">
                    {el.english}
                  </h2>
                  <p className="text-sm text-muted">{el.material}</p>
                </div>
              </Reveal>

              <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                {floorRooms.map((room, i) => (
                  <Reveal as="li" key={room.slug} delay={i * 0.08}>
                    <RoomCard room={room} priority={el.floor === 1 && i === 0} />
                  </Reveal>
                ))}
              </ul>
            </Section>
          );
        })}

      <Section className="py-28 lg:py-40">
        <Reveal>
          <div className="flex flex-col items-start gap-8 border-t pt-14"
               style={{ borderColor: "color-mix(in srgb, currentColor 14%, transparent)" }}>
            <p className="max-w-2xl font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-[1.12]">
              Not sure which floor is yours? Tell us how you sleep and we will
              put you on the right one.
            </p>
            <div className="flex flex-wrap gap-3">
              <Cta href="/booking">Check dates</Cta>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
