"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { elements } from "@/content/elements";
import { useElement } from "./ElementContext";

const iso = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Reservation entry for the hero.
 *
 * The first field is not a room type — it is a floor, because here the floor
 * *is* the product. Choosing one also changes the active element, so the card
 * and the carousel are two views of the same state rather than two separate
 * controls that happen to share a screen.
 *
 * The panel takes its colour from the active element's palette variables, so it
 * re-tints on every change without declaring a transition of its own.
 */
export default function ReserveCard() {
  const { active, pending, select } = useElement();
  const shown = pending ?? active;
  const uid = useId();

  const arriveRef = useRef<HTMLInputElement>(null);
  const departRef = useRef<HTMLInputElement>(null);

  /**
   * The date fields are uncontrolled and seeded through refs.
   *
   * This page is statically prerendered, so a date computed during render would
   * be the *build* date on the server and today's date on the client — a
   * guaranteed hydration mismatch. Writing to the DOM after mount is also what
   * an effect is actually for, and avoids a setState-in-effect cascade.
   */
  useEffect(() => {
    const start = new Date();
    start.setDate(start.getDate() + 14);
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    if (arriveRef.current) arriveRef.current.value = iso(start);
    if (departRef.current) {
      departRef.current.value = iso(end);
      departRef.current.min = iso(start);
    }
  }, []);

  const field =
    "w-full bg-transparent text-sm outline-none placeholder:opacity-40 [color-scheme:inherit]";
  const box = "rounded-[10px] border px-3 py-2";
  const boxStyle = {
    borderColor: "color-mix(in srgb, currentColor 18%, transparent)",
  };

  return (
    <form
      // Placeholder flow: no availability service is wired up yet.
      onSubmit={(e) => e.preventDefault()}
      aria-labelledby={`${uid}-title`}
      className="w-full max-w-sm rounded-[18px] p-5 backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--ground) 84%, transparent)",
        border: "1px solid color-mix(in srgb, currentColor 16%, transparent)",
      }}
    >
      <h2 id={`${uid}-title`} className="font-display text-xl leading-none">
        Plan your stay
      </h2>
      <p className="mt-1.5 text-xs leading-snug text-muted">
        Pick a floor. Each one is a different element.
      </p>

      {/* Floor — the same state the carousel drives */}
      <fieldset className="mt-4">
        <legend className="u-label opacity-40">Floor</legend>
        <div className="mt-2 flex gap-1.5">
          {elements.map((el) => {
            const on = el.id === shown.id;
            return (
              <button
                key={el.id}
                type="button"
                onClick={() => select(el.id)}
                aria-pressed={on}
                aria-label={`Floor ${el.floor} — ${el.english}`}
                title={`${el.english} · ${el.quality}`}
                className="flex-1 rounded-lg border py-1.5 transition-colors duration-500"
                style={{
                  borderColor: on
                    ? "var(--accent)"
                    : "color-mix(in srgb, currentColor 18%, transparent)",
                  backgroundColor: on
                    ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                    : "transparent",
                }}
              >
                {/* Floor numerals rather than truncated Tamil: slicing a Tamil
                    word by code unit strips vowel signs (காற்று → கா). */}
                <span
                  className="u-readout block text-sm leading-none"
                  style={{ color: on ? "var(--accent)" : undefined, opacity: on ? 1 : 0.55 }}
                >
                  {String(el.floor).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
        <p className="u-label mt-2 opacity-50">
          {shown.badge} · {shown.english} · {shown.quality}
        </p>
      </fieldset>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className={box} style={boxStyle}>
          <span className="u-label block opacity-40">Arrive</span>
          <input
            ref={arriveRef}
            type="date"
            // Departure can never precede arrival.
            onChange={(e) => {
              if (departRef.current) departRef.current.min = e.target.value;
            }}
            className={`${field} mt-1`}
          />
        </label>
        <label className={box} style={boxStyle}>
          <span className="u-label block opacity-40">Depart</span>
          <input ref={departRef} type="date" className={`${field} mt-1`} />
        </label>
      </div>

      {/* Guests */}
      <label className={`${box} mt-2 block`} style={boxStyle}>
        <span className="u-label block opacity-40">Guests</span>
        <select defaultValue="2" className={`${field} mt-1`} style={{ color: "var(--ink)" }}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n} style={{ color: "#111" }}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>

      <Link
        href="/contact"
        className="group mt-3 flex w-full items-center justify-center gap-3 rounded-full py-3.5 transition-transform duration-500 hover:-translate-y-0.5"
        style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
      >
        <span className="u-label">Check availability</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </form>
  );
}
