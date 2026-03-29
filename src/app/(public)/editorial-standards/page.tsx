import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/editorial-standards";

const titleSegment = "Editorial standards & corrections";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "How mychennaicity.in handles sourcing, analysis, updates, and corrections for Chennai local coverage.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Sourcing, attribution, and correction practices for Chennai-area news.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Editorial standards" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Trust</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Editorial standards
      </h1>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Sourcing.</strong> On-site
          stories combine a factual summary with Chennai-focused analysis. When
          we rely on external reporting, we link a{" "}
          <strong className="text-[var(--foreground)]">primary source</strong>{" "}
          where possible and ask readers to open the original for full context.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Headlines and summaries.</strong>{" "}
          One primary intent per URL. Meta descriptions and on-page leads should
          align so search and answer engines see a consistent factual claim.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Updates.</strong> Material
          corrections are reflected in the body and the visible updated timestamp;
          <code className="mx-0.5 rounded bg-[var(--surface)] px-1 py-0.5 text-xs ring-1 ring-[var(--border)]">
            dateModified
          </code>{" "}
          in structured data follows the same clock.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Corrections.</strong>{" "}
          Contact us via{" "}
          <a
            href="/contact"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact &amp; tips
          </a>
          ; we log fixes and note substantive changes when they affect the core
          meaning of a piece.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">YMYL topics.</strong>{" "}
          Health, legal, and money explainers carry stronger sourcing and review
          expectations; we avoid presenting opinion as clinical or legal advice.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Job listings.</strong>{" "}
          Roles on{" "}
          <Link
            href={CHENNAI_JOBS_HUB_PATH}
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            jobs in Chennai
          </Link>{" "}
          should link to the employer&apos;s official apply path; we mark
          employers as checked only when we have done a basic verification pass.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
