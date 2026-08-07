"use client";

import { useId, useState } from "react";
import { RULE } from "./ui/primitives";

/**
 * Disclosure list.
 *
 * Height animates with a 0fr → 1fr grid row rather than max-height, so the
 * panel opens to its exact content height instead of a guessed maximum — no
 * clipped answers, no dead space after short ones.
 */
export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <ul>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-t" style={{ borderColor: RULE }}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                className="flex w-full items-start justify-between gap-8 py-6 text-left"
              >
                <span className="font-display text-lg leading-snug sm:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl leading-none transition-transform duration-500 ease-[var(--ease-world)]"
                  style={{
                    color: isOpen ? "var(--accent)" : undefined,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    opacity: isOpen ? 1 : 0.45,
                  }}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={`${uid}-${i}`}
              role="region"
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-world)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-10 text-[0.95rem] leading-[1.85] text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
