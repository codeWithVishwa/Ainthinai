import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PostCard } from "@/components/cards";
import { Marker, Section } from "@/components/ui/primitives";
import { posts } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on the building, the kitchen, the land, and what we got wrong.",
};

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from a building that is still settling"
        standfirst="Written by the people who made it and the people who run it. Including, occasionally, the mistakes."
        photo="photo-1473580044384-7ba9967e16a0"
      />

      <Section className="pt-24 lg:pt-32">
        <Marker>Latest</Marker>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <PostCard post={lead} priority />
          </div>
        </Reveal>
      </Section>

      <Section className="py-24 lg:py-32">
        <Marker>More</Marker>
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
