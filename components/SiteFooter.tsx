import Link from "next/link";
import { elements, footerGroups, resort } from "@/content/elements";
import { contact } from "@/content/site";
import { RULE } from "./ui/primitives";

export default function SiteFooter() {
  return (
    <footer className="border-t px-6 pb-12 pt-24 lg:px-12" style={{ borderColor: RULE }}>
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <p
              lang="ta"
              className="font-tamil text-[clamp(2rem,4.5vw,3.4rem)] leading-none"
              style={{ color: "var(--accent)" }}
            >
              {resort.tamil}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {resort.premise}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {[...elements]
                .sort((a, b) => a.floor - b.floor)
                .map((el) => (
                  <li key={el.id} className="flex items-baseline gap-2">
                    <span className="u-label u-readout opacity-30">{el.badge}</span>
                    <span className="u-label opacity-60">{el.english}</span>
                  </li>
                ))}
            </ul>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="u-label opacity-40">{group.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm opacity-80 transition-opacity hover:opacity-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: RULE }}>
          <address className="flex flex-col gap-1 text-sm not-italic text-muted">
            {contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <div className="flex flex-col gap-2 text-sm">
            <a href={`tel:${contact.reservations.replace(/\s/g, "")}`} className="hover:opacity-60">
              {contact.reservations}
            </a>
            <a href={`mailto:${contact.email}`} className="hover:opacity-60">
              {contact.email}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <span>Check-in from 14:00</span>
            <span>Check-out by 11:00</span>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/booking"
              className="u-label inline-block w-fit rounded-full px-6 py-2.5"
              style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
            >
              Book a stay
            </Link>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: RULE }}
        >
          <p className="u-label opacity-30">
            © {new Date().getFullYear()} {resort.name}
          </p>
          <p className="u-label opacity-30">{resort.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
