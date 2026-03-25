import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Chennai schools, hospitals, food, parks, and more — directory hub coming soon.",
};

export default function DirectoryPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14">
      <p className="type-eyebrow text-[var(--accent)]">Directory</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)]">
        Explore places & businesses
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        Unified directory verticals will replace corridor-only PHP tables. Use
        the home page mosaic until browse + detail routes ship.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
