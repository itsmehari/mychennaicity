import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";

const path = "/about";

export const metadata: Metadata = {
  title: "About mychennaicity.in",
  description:
    "Greater Chennai local platform — who we are, what we cover, and how neighbourhood hubs fit together.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: "About | mychennaicity.in",
    description:
      "City-scale local news, jobs, events, and listings for Greater Chennai.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | mychennaicity.in",
    images: ["/twitter-image"],
  },
};

export default function AboutPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <p className="type-eyebrow text-[var(--accent)]">About</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Chennai-wide, neighbourhood-first
      </h1>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          <strong className="text-[var(--foreground)]">mychennaicity.in</strong>{" "}
          is an English-first local platform for Greater Chennai — from the
          harbour belt and north industrial corridors to OMR, GST Road, and the
          western lake suburbs. We connect a city-wide news desk with macro area
          hubs, a jobs board, events calendar, and a growing directory.
        </p>
        <p>
          We are not a government site. Map tiles and zone labels are simplified
          for browsing; always verify ward numbers and legal boundaries against
          GCC and revenue records when it matters for complaints or filings.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
