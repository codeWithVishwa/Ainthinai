import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev-only. Next blocks cross-origin requests to dev assets by default, which
   * breaks opening the dev server on the machine's LAN address — the usual way
   * to test on a phone. Listing the origins here allows just those.
   *
   * This has no effect on `next build` / `next start`, so it is not a
   * production exposure.
   */
  allowedDevOrigins: ["192.168.1.8", "192.168.1.*", "*.local"],

  images: {
    // Placeholder photography only. Replace with the client's own asset host
    // (or local files under /public) once their shoot is delivered.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
