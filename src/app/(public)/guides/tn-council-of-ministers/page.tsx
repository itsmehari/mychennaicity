import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { MinisterRosterTable } from "@/components/government/minister-roster-table";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import { GOVERNMENT_HUB_AEO } from "@/content/government/aeo";
import {
  GOVERNMENT_DISCLAIMER_EXTRA,
  GOVERNMENT_FINE_PRINT_EXTRA,
} from "@/content/government/disclaimers";
import { GOVERNMENT_HUB_FAQ } from "@/content/government/faq";
import { MINISTER_COUNT } from "@/content/government/ministers-may-2026";
import {
  GOVERNMENT_CHENNAI_PATH,
  GOVERNMENT_DEPARTMENTS_PATH,
  GOVERNMENT_EDITION,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_IAS_PATH,
  GOVERNMENT_ISSUED,
  GOVERNMENT_OFFICIAL_SOURCES_PATH,
  GOVERNMENT_VERSION,
  governmentHreflang,
} from "@/content/government/paths";
import { GOVERNMENT_HUB_RELATED } from "@/content/government/reshuffle-links";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildGovernmentHubJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Tamil Nadu Council of Ministers — 35 ministers (May 2026)";
const description = `Who holds which portfolio in Tamil Nadu's ${MINISTER_COUNT}-minister cabinet led by CM C. Joseph Vijay — Finance, Health, PWD, AI ministry and Chennai-linked departments. Lok Bhavan PR 40.`;

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: governmentHreflang(
    GOVERNMENT_HUB_PATH,
    GOVERNMENT_HUB_TA_PATH,
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${GOVERNMENT_HUB_PATH}`,
    images: [
      {
        url: "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description,
    images: ["/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg"],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function TnCouncilOfMinistersHubPage() {
  const jsonLd = buildGovernmentHubJsonLd("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReachGuideShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Guides" },
          { label: "Council of Ministers" },
        ]}
        eyebrow={`Government desk · ${GOVERNMENT_EDITION} · ${GOVERNMENT_VERSION}`}
        title="Tamil Nadu Council of Ministers — portfolios"
        dek={`${MINISTER_COUNT} ministers as of ${GOVERNMENT_ISSUED}. Chief Minister C. Joseph Vijay leads the cabinet. Search by name or department — Finance, Health, PWD, Transport, and Chennai-linked urban portfolios.`}
        related={GOVERNMENT_HUB_RELATED}
      >
        <BilingualToggle
          enHref={GOVERNMENT_HUB_PATH}
          taHref={GOVERNMENT_HUB_TA_PATH}
          current="en"
        />

        <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA} />

        <AeoAnswerBlock content={GOVERNMENT_HUB_AEO} />

        <MinisterRosterTable locale="en" />

        <h2>Cluster pages</h2>
        <ul>
          <li>
            <Link href={GOVERNMENT_CHENNAI_PATH}>Chennai — who handles what</Link>
          </li>
          <li>
            <Link href={GOVERNMENT_DEPARTMENTS_PATH}>Department lookup</Link>
          </li>
          <li>
            <Link href={GOVERNMENT_IAS_PATH}>IAS leadership shelf</Link>
          </li>
          <li>
            <Link href={GOVERNMENT_OFFICIAL_SOURCES_PATH}>Official Lok Bhavan PDFs</Link>
          </li>
        </ul>

        <h2>FAQ</h2>
        <dl>
          {GOVERNMENT_HUB_FAQ.map((f) => (
            <div key={f.q} className="mb-4">
              <dt className="font-semibold text-[var(--foreground)]">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
