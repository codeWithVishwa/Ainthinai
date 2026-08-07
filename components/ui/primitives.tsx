import type { ReactNode } from "react";

/**
 * Shared layout and display primitives.
 *
 * Every screen composes from these so gutters, rule colours and type rhythm
 * stay identical across the site. Pages should not hand-roll padding.
 */

export const PAD = "px-6 lg:px-12";
export const INNER = "mx-auto w-full max-w-[1500px]";
/** Hairline that follows the active element's ink. */
export const RULE = "color-mix(in srgb, currentColor 14%, transparent)";
export const RULE_SOFT = "color-mix(in srgb, currentColor 10%, transparent)";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${PAD} ${className}`}>
      <div className={INNER}>{children}</div>
    </section>
  );
}

/** Small caps section marker with a rule running to the right. */
export function Marker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-12 flex items-baseline gap-5">
      <span className="u-label opacity-45">{children}</span>
      <span aria-hidden="true" className="h-px flex-1" style={{ background: RULE }} />
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px ${className}`} style={{ background: RULE }} />;
}

/** Filled pill — the site's primary action. */
export function Cta({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full px-8 py-3.5 transition-transform duration-500 hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
    >
      <span className="u-label">{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/** Outline pill — secondary action. */
export function GhostCta({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 rounded-full border px-7 py-3 transition-opacity duration-500 hover:opacity-70 ${className}`}
      style={{ borderColor: "color-mix(in srgb, currentColor 30%, transparent)" }}
    >
      <span className="u-label">{children}</span>
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="u-label rounded-full px-3 py-1"
      style={{
        border: "1px solid color-mix(in srgb, currentColor 22%, transparent)",
        fontSize: "0.58rem",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Rating, drawn rather than typed.
 *
 * Five glyphs at a fixed width with the filled portion clipped to the score, so
 * 4.3 reads as 4.3 instead of rounding to four — and the whole thing is
 * announced once to assistive tech instead of five times.
 */
export function Stars({ value, size = 12 }: { value: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={`${value.toFixed(1)} out of 5`}
    >
      <span className="relative inline-block" style={{ lineHeight: 1 }}>
        <span aria-hidden="true" style={{ fontSize: size, opacity: 0.25, letterSpacing: 2 }}>
          ★★★★★
        </span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap"
          style={{ width: `${pct}%`, fontSize: size, color: "var(--accent)", letterSpacing: 2 }}
        >
          ★★★★★
        </span>
      </span>
      <span className="u-label u-readout opacity-70" style={{ fontSize: "0.6rem" }}>
        {value.toFixed(1)}
      </span>
    </span>
  );
}

/** Key/value pair used across specs, facts and room details. */
export function Spec({
  k,
  v,
  sub,
}: {
  k: string;
  v: ReactNode;
  sub?: string;
}) {
  return (
    <div>
      <dt className="u-label opacity-40">{k}</dt>
      <dd className="mt-2 text-sm leading-snug">
        {v}
        {sub && <span className="mt-1 block text-xs italic opacity-45">{sub}</span>}
      </dd>
    </div>
  );
}
