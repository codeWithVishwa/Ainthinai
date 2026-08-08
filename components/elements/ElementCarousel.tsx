"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { elements, img } from "@/content/elements";
import { useElement } from "./ElementContext";

const CARD_W = 186; // px — five of these fit a wide desktop without scrolling

/**
 * The element selector: a horizontal row of image cards with arrow controls.
 *
 * Selecting a card transforms the entire page, so these are real buttons with
 * pressed state rather than decorative tiles. The row scrolls when the viewport
 * cannot hold five cards, and the arrows disable themselves at each end instead
 * of sitting there doing nothing.
 */
export default function ElementCarousel() {
  const { active, pending, select } = useElement();
  const shown = pending ?? active;

  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * (CARD_W + 12) * 2, behavior: "smooth" });
  };

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border transition-opacity duration-300 disabled:opacity-25";
  const arrowStyle = {
    borderColor: "color-mix(in srgb, currentColor 28%, transparent)",
  };

  return (
    <div className="w-full">
      {/* Header row — label left, controls right, as in the reference */}
      <div className="mb-2 flex items-end justify-between gap-6">
        <h2 className="u-label opacity-50">The five landscapes</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Show previous elements"
            className={arrow}
            style={arrowStyle}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Show next elements"
            className={arrow}
            style={arrowStyle}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto px-0.5 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {elements.map((el) => {
          const on = el.id === shown.id;
          return (
            <button
              key={el.id}
              type="button"
              onClick={() => select(el.id)}
              aria-pressed={on}
              aria-label={`${el.english} — floor ${el.floor}, ${el.material}`}
              data-active={on || undefined}
              className="group relative shrink-0 overflow-hidden rounded-[14px] text-left transition-[translate,scale] duration-500 ease-[var(--ease-world)] data-[active]:-translate-y-1 hover:-translate-y-1 hover:scale-[1.045] focus-visible:-translate-y-1 focus-visible:scale-[1.045]"
              style={{
                width: CARD_W,
                scrollSnapAlign: "start",
                outline: on ? "1px solid var(--accent)" : "none",
                outlineOffset: -1,
              }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={img(el.hero, 480, 60)}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                  style={{ filter: on ? "none" : "saturate(0.55) brightness(0.72)" }}
                />
                {/* Grounds the label without hiding the picture */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                  }}
                />

                {/* Where the reference put a star rating */}
                <span
                  className="u-label u-readout absolute right-2 top-2 rounded-md px-1.5 py-0.5"
                  style={{
                    backgroundColor: on ? "var(--accent)" : "rgba(0,0,0,0.45)",
                    color: on ? "var(--ground)" : "rgba(255,255,255,0.85)",
                    fontSize: "0.55rem",
                  }}
                >
                  {el.badge}
                </span>

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-2.5">
                  <span
                    lang="ta"
                    className="font-tamil text-lg leading-none"
                    style={{ color: on ? "var(--accent)" : "rgba(255,255,255,0.92)" }}
                  >
                    {el.tamil}
                  </span>
                  <span
                    className="u-label"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.55rem",
                    }}
                  >
                    {el.english}
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
