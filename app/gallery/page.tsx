import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The building, the rooms, the table and the land around them.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The building, and the land it sits in"
        standfirst="Photographed across a full year, because a building that changes with the weather cannot be shown in one season."
        photo="photo-1444927714506-8492d94b4e3d"
      />
      <Section className="py-24 lg:py-32">
        <GalleryGrid />
      </Section>
    </>
  );
}
