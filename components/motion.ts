/**
 * One place to decide whether motion runs.
 *
 * Two ways it gets switched off:
 *  - the visitor asked the OS for reduced motion (the real reason), or
 *  - NEXT_PUBLIC_STILL=1, which freezes every scroll-linked effect. That exists
 *    for capturing stills and for debugging layout without animation in the way.
 */
export const STILL = process.env.NEXT_PUBLIC_STILL === "1";

export function motionOff(): boolean {
  if (STILL) return true;
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
