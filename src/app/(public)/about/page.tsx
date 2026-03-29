import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/about";

const titleSegment = "About us";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Who we are, what we cover in Chennai and nearby, and how our area pages fit together.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai-area local news, jobs, events, and listings in one place.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
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
          is an English-first local site for Chennai and nearby — from the
          harbour belt and north industrial corridors to OMR, GST Road, and the
          western lake suburbs. We tie together city-wide news, area pages, jobs,
          events, and a growing directory.
        </p>
        <p>
          We are not a government site. Map tiles and zone labels are simplified
          for browsing; always verify ward numbers and legal boundaries against
          GCC and revenue records when it matters for complaints or filings.
        </p>
        <p>
          <Link
            href="/chennai-local-news"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Chennai local news
          </Link>
          ,{" "}
          <Link
            href={CHENNAI_JOBS_HUB_PATH}
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            jobs in Chennai
          </Link>
          ,{" "}
          <Link
            href="/guides/chennai-tech-careers"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            job-ad tips
          </Link>
          , and{" "}
          <Link
            href="/chennai-local-events"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            events
          </Link>{" "}
          are all linked from the home page and site footer too.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
