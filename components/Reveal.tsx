"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { motionOff } from "./motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds to hold before the reveal starts. Use to stagger siblings. */
  delay?: number;
  /** Distance travelled, in pixels. Keep small — this should read as settling. */
  distance?: number;
};

/**
 * A single scroll-triggered reveal.
 *
 * Deliberately understated: content rises a short distance and fades. The
 * drama on this site belongs to the descent and the photography, not to
 * individual blocks announcing themselves.
 *
 * Uses IntersectionObserver rather than ScrollTrigger — there is no scrubbing
 * here, just a one-shot threshold, and IO is both cheaper and unaffected by
 * whether Lenis is running.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  distance = 24,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (motionOff()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "translate3d(0,0,0)";
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: `translate3d(0, ${distance}px, 0)`,
        transition:
          "opacity 1.1s var(--ease-descent), transform 1.1s var(--ease-descent)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
