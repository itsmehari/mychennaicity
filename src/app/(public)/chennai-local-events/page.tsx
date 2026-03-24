import type { Metadata } from "next";
import Link from "next/link";

const canonicalPath = "/chennai-local-events";

export const metadata: Metadata = {
  title: "Chennai local events — festivals, culture & civic calendar",
  description:
    "Chennai local events: temple festivals, neighbourhood meetups, culture, and civic dates across Greater Chennai. Browse what’s on and submit listings.",
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: "Chennai local events | mychennaicity.in",
    description:
      "Festivals, meetups, and civic calendars for Greater Chennai — from core city to OMR and suburbs.",
    url: canonicalPath,
  },
};

export default function ChennaiLocalEventsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14">
      <p className="text-sm font-medium text-[var(--accent-warm)]">
        Chennai local events
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        What&apos;s on in Chennai
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Public listings for temple utsavams, cultural programmes, meetups, and civic
        dates will connect to our events data. This page is the home for{" "}
        <span className="whitespace-nowrap">Greater Chennai</span> local events on
        mychennaicity.in.
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
