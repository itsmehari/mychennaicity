import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GOVERNMENT_DISCLAIMER_EXTRA,
  GOVERNMENT_FINE_PRINT_EXTRA,
} from "@/content/government/disclaimers";
import { MINISTER_COUNT } from "@/content/government/ministers-may-2026";
import {
  CABINET_NEWS_MAY16_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_TA_PATH,
  PR38_PDF_PATH,
  PR40_PDF_PATH,
  governmentHreflang,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Official Lok Bhavan sources — TN Council of Ministers";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Self-hosted Lok Bhavan press releases for Tamil Nadu cabinet portfolios — PR 38 (16 May) and PR 40 (21 May 2026).",
  alternates: governmentHreflang(
    GOVERNMENT_OFFICIAL_SOURCES_PATH,
    GOVERNMENT_OFFICIAL_SOURCES_TA_PATH,
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(titleSegment),
    url: `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_PATH}`,
  },
};

export default function OfficialSourcesPage() {
  const base = getSiteUrl();

  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Council of Ministers", href: GOVERNMENT_HUB_PATH },
        { label: "Official sources" },
      ]}
      eyebrow="Government desk · Primary sources"
      title="Lok Bhavan press releases"
      dek="Download the PDFs this desk transcribed. Verify minister names and portfolios here before official correspondence."
      related={[
        { href: GOVERNMENT_HUB_PATH, label: "Minister roster" },
        { href: CABINET_NEWS_MAY16_PATH, label: "News — first allocation (16 May)" },
      ]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_OFFICIAL_SOURCES_PATH}
        taHref={GOVERNMENT_OFFICIAL_SOURCES_TA_PATH}
        current="en"
      />

      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA} />

      <h2>Canonical — 35 ministers (21 May 2026)</h2>
      <p>
        <strong>Press Release No. 40 dated 21.05.2026</strong> — expanded cabinet
        with {MINISTER_COUNT} ministers.
      </p>
      <p>
        <a href={PR40_PDF_PATH} download>
          Download PR 40 PDF
        </a>{" "}
        ·{" "}
        <a href={`${base}${PR40_PDF_PATH}`} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </p>

      <h2>Historical — first allocation (16 May 2026)</h2>
      <p>
        <strong>Press Release No. 38 dated 16.05.2026</strong> — initial portfolio
        list for ministers sworn in on 10 May (~12 ministers named).
      </p>
      <p>
        <a href={PR38_PDF_PATH} download>
          Download PR 38 PDF
        </a>
      </p>

      <p>
        <Link href={GOVERNMENT_HUB_PATH}>← Back to full roster</Link>
      </p>

      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
