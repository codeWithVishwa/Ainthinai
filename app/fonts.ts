import localFont from "next/font/local";

/**
 * Self-hosted from Fontshare (ITF Free Font License — free for commercial and
 * client work, self-hosting permitted). Serving locally rather than via their
 * CDN keeps the render path off a third party and lets Next fingerprint and
 * preload the files.
 */

// Display: high-contrast serif. Used large and sparingly.
export const boska = localFont({
  src: [
    { path: "./fonts/Boska-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Boska-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Boska-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Boska-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-boska",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino", "Georgia", "serif"],
});

/**
 * Tamil script. Anek Tamil (Indian Type Foundry, OFL — free for commercial use),
 * variable across 200–700. Only the Tamil subset (U+0B82–0BFA) is bundled;
 * Latin is already served by Boska and Switzer, so shipping Anek's Latin too
 * would be ~100 KB of duplicate glyphs.
 */
export const anekTamil = localFont({
  src: [{ path: "./fonts/AnekTamil-var.woff2", weight: "200 700", style: "normal" }],
  variable: "--font-tamil",
  display: "swap",
  fallback: ["Noto Sans Tamil", "Latha", "sans-serif"],
});

// Body and UI: neutral grotesk with a wide weight range.
export const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
