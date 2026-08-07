import HomeContent from "@/components/elements/HomeContent";

// The element provider lives in the root layout so the chosen world persists
// across every screen, not just this one.
export default function HomePage() {
  return <HomeContent />;
}
