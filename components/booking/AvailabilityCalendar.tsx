"use client";

import { useMemo, useState } from "react";
import { RULE } from "../ui/primitives";

/**
 * Two-month availability grid.
 *
 * Blocked dates are passed in as ISO strings — the same shape a PMS would
 * return — so wiring this to a real service later means changing the source of
 * `blocked`, not this component.
 */

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

const iso = (d: Date) => {
  const c = new Date(d);
  c.setHours(12, 0, 0, 0);
  return c.toISOString().slice(0, 10);
};

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  // Monday-first offset.
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function AvailabilityCalendar({
  blocked,
  months = 2,
}: {
  blocked: string[];
  months?: number;
}) {
  const [offset, setOffset] = useState(0);
  const taken = useMemo(() => new Set(blocked), [blocked]);
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const panels = Array.from({ length: months }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() + offset + i, 1);
    return { year: d.getFullYear(), month: d.getMonth(), cells: monthMatrix(d.getFullYear(), d.getMonth()) };
  });

  const nav =
    "flex h-8 w-8 items-center justify-center rounded-full border transition-opacity duration-300 disabled:opacity-25 hover:opacity-70";

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Legend swatch="available">Available</Legend>
          <Legend swatch="taken">Taken</Legend>
          <Legend swatch="past">Past</Legend>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={nav}
            style={{ borderColor: RULE }}
            onClick={() => setOffset((o) => o - 1)}
            disabled={offset <= 0}
            aria-label="Previous month"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={nav}
            style={{ borderColor: RULE }}
            onClick={() => setOffset((o) => o + 1)}
            disabled={offset >= 10}
            aria-label="Next month"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        {panels.map((p) => (
          <div key={`${p.year}-${p.month}`}>
            <p className="u-label mb-4 opacity-60">
              {new Date(p.year, p.month, 1).toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="grid grid-cols-7 gap-1">
              {DOW.map((d, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="u-label pb-2 text-center opacity-30"
                  style={{ fontSize: "0.5rem" }}
                >
                  {d}
                </span>
              ))}
              {p.cells.map((cell, i) => {
                if (!cell) return <span key={i} />;
                const key = iso(cell);
                const isPast = cell < today;
                const isTaken = taken.has(key);
                const state = isPast ? "past" : isTaken ? "taken" : "available";
                return (
                  <span
                    key={i}
                    title={`${key} — ${state}`}
                    className="u-readout flex aspect-square items-center justify-center rounded-md text-[0.7rem]"
                    style={{
                      backgroundColor:
                        state === "taken"
                          ? "color-mix(in srgb, currentColor 16%, transparent)"
                          : state === "available"
                            ? "color-mix(in srgb, var(--accent) 14%, transparent)"
                            : "transparent",
                      color:
                        state === "available"
                          ? "var(--accent)"
                          : undefined,
                      opacity: state === "past" ? 0.22 : state === "taken" ? 0.4 : 1,
                      textDecoration: state === "taken" ? "line-through" : undefined,
                    }}
                  >
                    {cell.getDate()}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({
  swatch,
  children,
}: {
  swatch: "available" | "taken" | "past";
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-3 w-3 rounded-sm"
        style={{
          backgroundColor:
            swatch === "available"
              ? "color-mix(in srgb, var(--accent) 45%, transparent)"
              : swatch === "taken"
                ? "color-mix(in srgb, currentColor 22%, transparent)"
                : "transparent",
          border: swatch === "past" ? "1px solid color-mix(in srgb, currentColor 20%, transparent)" : "none",
        }}
      />
      <span className="u-label opacity-50" style={{ fontSize: "0.55rem" }}>
        {children}
      </span>
    </span>
  );
}
