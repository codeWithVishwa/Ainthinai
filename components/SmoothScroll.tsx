"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionOff } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inertial scrolling. This is most of what separates a site that feels
 * expensive from one that doesn't — but it is also the first thing that should
 * go for anyone who has asked the OS for less motion.
 *
 * Lenis takes over scrolling from the browser, so ScrollTrigger has to be told
 * when Lenis moves. Without this sync the two disagree about scroll position
 * and every pinned or scrubbed animation drifts.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (motionOff()) {
      // ScrollTrigger still drives reveals; it just reads native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const loop = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(loop);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(loop);
      lenis.destroy();
    };
  }, []);

  return null;
}
