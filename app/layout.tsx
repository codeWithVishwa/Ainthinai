import type { Metadata } from "next";
import { anekTamil, boska, switzer } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ElementProvider } from "@/components/elements/ElementContext";
import { resort } from "@/content/elements";

export const metadata: Metadata = {
  title: {
    default: `${resort.name} — ${resort.tagline}`,
    template: `%s — ${resort.name}`,
  },
  description: resort.premise,
  openGraph: {
    title: `${resort.name} · ${resort.tamil}`,
    description: resort.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${boska.variable} ${switzer.variable} ${anekTamil.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning is here for browser extensions that inject
          attributes onto <body> before React hydrates — ColorZilla adds
          `cz-shortcut-listen`, password managers and Grammarly do the same.
          React cannot know about them at render time and reports a mismatch.
          It suppresses one level only, so genuine mismatches inside the tree
          are still reported. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-ground"
        >
          Skip to content
        </a>
        {/* The provider lives here rather than on the home page so the chosen
            element survives navigation: pick Water on Home, and Rooms, Gallery
            and the rest stay in Water's world. It also means the header and
            footer re-tint with everything else. */}
        <ElementProvider initialId="earth">
          <SmoothScroll />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ElementProvider>
      </body>
    </html>
  );
}
