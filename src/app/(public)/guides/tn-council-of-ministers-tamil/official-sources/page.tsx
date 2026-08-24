import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GOVERNMENT_DISCLAIMER_EXTRA_TA,
  GOVERNMENT_FINE_PRINT_EXTRA_TA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_TA_PATH,
  PR38_PDF_PATH,
  PR40_PDF_PATH,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: "Lok Bhavan PDF — அமைச்சரவை",
  description: "PR 38 & PR 40 — self-hosted PDFs.",
  alternates: {
    canonical: `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_PATH}`,
      "ta-IN": `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_TA_PATH}`,
      "x-default": `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("Lok Bhavan PDF"),
    url: `${getSiteUrl()}${GOVERNMENT_OFFICIAL_SOURCES_TA_PATH}`,
    locale: "ta_IN",
  },
};

export default function OfficialSourcesTamilPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "அமைச்சரவை", href: GOVERNMENT_HUB_TA_PATH },
        { label: "Official sources" },
      ]}
      eyebrow="அரசு desk"
      title="Lok Bhavan press releases"
      dek="PR 40 (21 May) — 35 அமைச்சர்கள். PDF பதிவிறக்கம்."
      related={[{ href: GOVERNMENT_HUB_TA_PATH, label: "Full roster" }]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_OFFICIAL_SOURCES_PATH}
        taHref={GOVERNMENT_OFFICIAL_SOURCES_TA_PATH}
        current="ta"
      />

      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />

      <div lang="ta">
        <h2>PR 40 — 21 May 2026</h2>
        <p>
          <a href={PR40_PDF_PATH}>PDF பதிவிறக்கம்</a>
        </p>
        <h2>PR 38 — 16 May 2026</h2>
        <p>
          <a href={PR38_PDF_PATH}>PDF பதிவிறக்கம்</a>
        </p>
        <p>
          <Link href={GOVERNMENT_HUB_TA_PATH}>← roster</Link>
        </p>
      </div>

      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
    </ReachGuideShell>
  );
}
