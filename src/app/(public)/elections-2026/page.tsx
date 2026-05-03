import type { Metadata } from "next";
import { Elections2026PageInfo } from "@/components/election-map-explorer/elections-2026-page-info";
import { InteractiveElectionMapExplorer } from "@/components/election-map-explorer/interactive-election-map-explorer";
import { ELECTION_FAQ } from "@/content/elections-2026/election-meta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/elections-2026";

const titleSegment = "Tamil Nadu Election 2026 — Chennai constituency map";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Explore 22 Chennai metro+ assembly constituencies on an interactive map: editorial hooks, reservation facts, candidate rows with sources, and past results. Tamil Nadu Assembly election 2026—verify against official nominations.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Explore 22 Chennai metro+ assembly seats with hooks, facts, sourced candidate snapshots, and past results for Tamil Nadu 2026.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function Elections2026Page() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: titleSegment,
    description:
      "Explore 22 Chennai metro+ assembly constituencies: map, hooks, facts, sourced candidates, past results—Tamil Nadu 2026.",
    url: `${siteUrl}${path}`,
    isPartOf: { "@type": "WebSite", url: siteUrl },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ELECTION_FAQ.filter((f) => !f.editorialOnly && f.sourceUrl).map(
      (f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      }),
    ),
  };

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Elections 2026" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Elections 2026</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Chennai metro+ constituency map
      </h1>
      <p className="type-lede mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        Assembly boundaries follow a 2021 community dataset, not live ECI GIS.
        Candidate lines are editorial snapshots—verify against official
        nominations and affidavits.
      </p>

      <div className="mt-10">
        <InteractiveElectionMapExplorer />
      </div>

      <Elections2026PageInfo />

      <InteriorCrossNav />
    </div>
  );
}
