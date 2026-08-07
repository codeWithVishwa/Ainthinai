"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { findElement, type Element } from "@/content/elements";
import { motionOff } from "../motion";

/** Milliseconds. Content clears before the new world arrives. */
export const OUT_MS = 460;
export const IN_MS = 900;
/** The palette crossfade spans the whole swap so colour never snaps. */
export const PALETTE_MS = 1250;

type Phase = "idle" | "out" | "in";

type Ctx = {
  active: Element;
  pending: Element | null;
  phase: Phase;
  select: (id: string) => void;
};

/** Perceived lightness of a hex colour, using Rec. 709 luma weights. */
function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5;
}

const ElementCtx = createContext<Ctx | null>(null);

export function useElement() {
  const ctx = useContext(ElementCtx);
  if (!ctx) throw new Error("useElement must be used inside <ElementProvider>");
  return ctx;
}

/**
 * Holds the active element and orchestrates the swap between worlds.
 *
 * The palette lives on <html> as registered custom properties, so every surface
 * in the tree — including fixed chrome outside this subtree — re-tints together
 * without any component knowing a transition is under way.
 */
export function ElementProvider({
  children,
  initialId = "earth",
}: {
  children: ReactNode;
  initialId?: string;
}) {
  const [active, setActive] = useState<Element>(() => findElement(initialId));
  const [pending, setPending] = useState<Element | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  const select = useCallback(
    (id: string) => {
      const next = findElement(id);
      if (next.id === active.id) return;

      clearTimers();

      if (motionOff()) {
        setActive(next);
        setPending(null);
        setPhase("idle");
        return;
      }

      setPending(next);
      setPhase("out");

      timers.current.push(
        window.setTimeout(() => {
          setActive(next);
          setPending(null);
          setPhase("in");
        }, OUT_MS),
      );
      timers.current.push(window.setTimeout(() => setPhase("idle"), OUT_MS + IN_MS));
    },
    [active.id],
  );

  useEffect(() => clearTimers, []);

  // Paint the palette. `pending` wins the moment a swap starts so colour leads
  // the content in, which is what makes the change feel like weather.
  useEffect(() => {
    const target = pending ?? active;
    const root = document.documentElement;
    const { ground, ink, muted, accent } = target.palette;
    root.style.setProperty("--ground", ground);
    root.style.setProperty("--ink", ink);
    root.style.setProperty("--muted", muted);
    root.style.setProperty("--accent", accent);
    root.dataset.element = target.id;

    /* Air is a pale world while the other four are dark. `color-scheme` drives
       the native controls the page does not paint itself — the date pickers and
       the scrollbar — so it has to follow the ground, or Air gets a dark date
       picker on a lime-washed page. */
    root.style.colorScheme = isLight(ground) ? "light" : "dark";
  }, [active, pending]);

  const value = useMemo<Ctx>(
    () => ({ active, pending, phase, select }),
    [active, pending, phase, select],
  );

  return <ElementCtx.Provider value={value}>{children}</ElementCtx.Provider>;
}
