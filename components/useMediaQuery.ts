"use client";

import { useSyncExternalStore } from "react";

/**
 * Read a media query without risking a hydration mismatch.
 *
 * `useSyncExternalStore` takes a separate server snapshot, so the markup
 * rendered on the server is deterministic and the client corrects itself during
 * hydration. Doing this with useState + useEffect would either mismatch or
 * trip the setState-in-effect rule.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false, // server: assume the wide layout
  );
}
