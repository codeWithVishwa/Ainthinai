"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, resort } from "@/content/elements";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSettled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        settled ? "py-3 backdrop-blur-md" : "py-6"
      }`}
      style={{
        backgroundColor: settled
          ? "color-mix(in srgb, var(--ground) 84%, transparent)"
          : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 lg:px-12">
        <Link href="/" className="flex items-baseline gap-3 transition-opacity hover:opacity-70">
          <span className="font-display text-lg tracking-[0.3em]">
            {resort.name.toUpperCase()}
          </span>
          <span lang="ta" className="hidden font-tamil text-base opacity-50 sm:inline">
            {resort.tamil}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="u-label transition-opacity hover:opacity-100"
              style={{ opacity: isCurrent(item.href) ? 1 : 0.65 }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            className="hidden rounded-full px-6 py-2.5 transition-transform duration-500 hover:-translate-y-0.5 sm:block"
            style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
          >
            <span className="u-label">Book</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="u-label lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="mt-3 max-h-[75svh] overflow-y-auto border-t px-6 py-8 lg:hidden"
        style={{
          backgroundColor: "var(--ground)",
          borderColor: "color-mix(in srgb, currentColor 12%, transparent)",
        }}
      >
        <ul className="flex flex-col gap-5">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="font-display text-3xl"
              style={{ color: "var(--accent)" }}
            >
              Book a stay
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
