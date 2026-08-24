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
import { GOVERNMENT_HUB_AEO_TA } from "@/content/government/aeo";
import {
  GOVERNMENT_DISCLAIMER_EXTRA_TA,
  GOVERNMENT_FINE_PRINT_EXTRA_TA,
} from "@/content/government/disclaimers";
import { GOVERNMENT_HUB_FAQ_TA } from "@/content/government/faq";
import { MINISTER_COUNT } from "@/content/government/ministers-may-2026";
import {
  GOVERNMENT_EDITION,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_ISSUED,
  GOVERNMENT_VERSION,
  governmentHreflang,
} from "@/content/government/paths";
import { GOVERNMENT_HUB_RELATED_TA } from "@/content/government/reshuffle-links";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildGovernmentHubJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "தமிழ்நாடு அமைச்சரவை — 35 அமைச்சர்கள் (May 2026)";

export const metadata: Metadata = {
  title: titleSegment,
  description: `முதலமைச்சர் C. Joseph Vijay தலைமையில் ${MINISTER_COUNT} அமைச்சர்கள் — Lok Bhavan PR 40.`,
  alternates: {
    ...governmentHreflang(
      GOVERNMENT_HUB_PATH,
      GOVERNMENT_HUB_TA_PATH,
      getSiteUrl(),
    ),
    canonical: `${getSiteUrl()}${GOVERNMENT_HUB_TA_PATH}`,
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: `${MINISTER_COUNT} அமைச்சர்கள் — May 2026.`,
    url: `${getSiteUrl()}${GOVERNMENT_HUB_TA_PATH}`,
    locale: "ta_IN",
    images: [
      {
        url: "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function TnCouncilOfMinistersTamilHubPage() {
  const jsonLd = buildGovernmentHubJsonLd("ta");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "Guides" },
          { label: "அமைச்சரவை" },
        ]}
        eyebrow={`அரசு desk · ${GOVERNMENT_EDITION} · ${GOVERNMENT_VERSION}`}
        title="தமிழ்நாடு அமைச்சரவை — portfolios"
        dek={`${GOVERNMENT_ISSUED} வரை ${MINISTER_COUNT} அமைச்சர்கள். முதலமைச்சர் C. Joseph Vijay.`}
        related={GOVERNMENT_HUB_RELATED_TA}
      >
        <BilingualToggle
          enHref={GOVERNMENT_HUB_PATH}
          taHref={GOVERNMENT_HUB_TA_PATH}
          current="ta"
        />

        <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />

        <div lang="ta">
          <AeoAnswerBlock content={GOVERNMENT_HUB_AEO_TA} />
        </div>

        <MinisterRosterTable locale="ta" />

        <h2 lang="ta">Cluster</h2>
        <ul lang="ta">
          <li>
            <Link href={`${GOVERNMENT_HUB_TA_PATH}/chennai`}>சென்னை — யார் பொறுப்பு</Link>
          </li>
          <li>
            <Link href={`${GOVERNMENT_HUB_TA_PATH}/departments`}>Department lookup</Link>
          </li>
          <li>
            <Link href={`${GOVERNMENT_HUB_TA_PATH}/ias-leadership`}>IAS shelf</Link>
          </li>
          <li>
            <Link href={`${GOVERNMENT_HUB_TA_PATH}/official-sources`}>Lok Bhavan PDF</Link>
          </li>
        </ul>

        <h2 lang="ta">FAQ</h2>
        <dl lang="ta">
          {GOVERNMENT_HUB_FAQ_TA.map((f) => (
            <div key={f.q} className="mb-4">
              <dt className="font-semibold text-[var(--foreground)]">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
      </ReachGuideShell>
    </>
  );
}
