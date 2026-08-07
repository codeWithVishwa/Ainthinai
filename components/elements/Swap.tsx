"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { IN_MS, OUT_MS, useElement } from "./ElementContext";

/**
 * Content that belongs to the active element.
 *
 * Leaves quickly and together, returns slowly and staggered — the asymmetry is
 * what stops a swap reading as a crossfade. `index` orders the return, so a
 * headline can land before the paragraph beneath it.
 */
export default function Swap({
  children,
  index = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  index?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const { phase } = useElement();
  const leaving = phase === "out";

  return (
    <Tag
      className={className}
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translate3d(0,-12px,0)" : "translate3d(0,0,0)",
        filter: leaving ? "blur(3px)" : "blur(0px)",
        transition: leaving
          ? `opacity ${OUT_MS}ms cubic-bezier(0.4,0,1,1) ${index * 22}ms,
             transform ${OUT_MS}ms cubic-bezier(0.4,0,1,1) ${index * 22}ms,
             filter ${OUT_MS}ms linear`
          : `opacity ${IN_MS}ms cubic-bezier(0.16,1,0.3,1) ${index * 75}ms,
             transform ${IN_MS}ms cubic-bezier(0.16,1,0.3,1) ${index * 75}ms,
             filter ${IN_MS}ms linear ${index * 75}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
