import Image from "next/image";
import { img } from "@/content/elements";

/**
 * Header for the inner screens.
 *
 * Shorter than the home hero and without the selector, but built from the same
 * parts so the pages read as one site: full-bleed photograph, the same two-layer
 * scrim mixed from --ground, and the same type scale one step down.
 *
 * It inherits whichever element is active, so navigating from Home in Water
 * arrives here still in Water.
 */
export default function PageHero({
  eyebrow,
  title,
  standfirst,
  photo,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  photo: string;
}) {
  return (
    <section className="relative flex min-h-[62svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={img(photo, 2000, 74)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Same scrim as the home hero: horizontal for the type, vertical for the
          header above and the page below. */}
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
              color-mix(in srgb, var(--ground) 74%, transparent) 0%,
              color-mix(in srgb, var(--ground) 30%, transparent) 30%,
              color-mix(in srgb, var(--ground) 62%, transparent) 78%,
              color-mix(in srgb, var(--ground) 96%, transparent) 100%)`,
        }}
      />

      <div className="relative px-6 pb-14 pt-32 lg:px-12 lg:pb-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="u-label mb-5 opacity-60">{eyebrow}</p>
          <h1 className="max-w-4xl font-display text-[clamp(2rem,min(5vw,9vh),4.5rem)] font-light leading-[1.04]">
            {title}
          </h1>
          {standfirst && (
            <p className="mt-7 max-w-2xl text-[0.95rem] leading-[1.85] text-muted">
              {standfirst}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
