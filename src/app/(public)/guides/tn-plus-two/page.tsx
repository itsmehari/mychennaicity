import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { EducationCompareMatrix } from "@/components/education/education-compare-matrix";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { HSE_HUB_AEO } from "@/content/education/hse-aeo";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { HSE_HUB_FAQ } from "@/content/education/hse-faq";
import { HSE_GROUPS } from "@/content/education/hse-groups";
import { streamLabel } from "@/content/education/hse-compare";
import {
  DGE_HOME_URL,
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_EDITION,
  EDUCATION_HUB_PATH,
  EDUCATION_ISSUED,
  EDUCATION_STRUCTURE_PATH,
  EDUCATION_VERSION,
  educationGroupPath,
} from "@/content/education/paths";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildEducationHubJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "TN Plus Two group selection guide";
const description =
  "Tamil Nadu Higher Secondary groups after Class 10: current DGE codes 2502, 2503, 2702, 2708 and humanities 2804 / 2802 — subjects, six papers, and how to choose.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: { canonical: `${getSiteUrl()}${EDUCATION_HUB_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${EDUCATION_HUB_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description,
    images: ["/twitter-image"],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function TnPlusTwoHubPage() {
  const jsonLd = buildEducationHubJsonLd();

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
          { label: "TN Plus Two groups" },
        ]}
        eyebrow={`Education desk · ${EDUCATION_EDITION} · ${EDUCATION_VERSION}`}
        title="Higher Secondary group selection"
        dek="After Class 10, the Tamil Nadu State Board group you pick sets four Part III subjects for Classes XI and XII. This desk covers five preferred current DGE combinations for students and parents in Chennai and across Tamil Nadu."
        related={[
          { href: EDUCATION_STRUCTURE_PATH, label: "HSE structure — six papers" },
          { href: EDUCATION_CHOOSE_PATH, label: "How to choose a group" },
          { href: EDUCATION_COMPARE_PATH, label: "Compare all five" },
          { href: "/guides/chennai-tech-careers", label: "Chennai tech careers" },
          { href: CHENNAI_JOBS_HUB_PATH, label: "Jobs in Chennai" },
        ]}
      >
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
          Issued {EDUCATION_ISSUED} · Student &amp; parent guidance · Not a DGE circular
        </p>
        <GuideDisclaimer kind="education" />
        <PageAdSlot shape="rectangle" placement="tn_plus_two" />

        <div className="not-prose my-8">
          <AeoAnswerBlock content={HSE_HUB_AEO} />
        </div>

        <h2>Five preferred groups</h2>
        <p>
          A general academic student writes six papers: Part I language, Part II English, and
          four Part III cores. The group code names those four cores.
        </p>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {HSE_GROUPS.map((g) => (
            <Link
              key={g.code}
              href={educationGroupPath(g.code)}
              className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 no-underline hover:border-[var(--accent)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
                {streamLabel(g.stream)} · {g.code}
              </p>
              <p className="mt-1 text-base font-bold text-[var(--foreground)]">{g.nameEn}</p>
              <p className="mt-1 text-sm text-[var(--muted)]" lang="ta">
                {g.nameTa}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {g.cores.map((c) => c.en).join(" · ")}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{g.bestSuited}</p>
            </Link>
          ))}
        </div>

        <p>
          Next:{" "}
          <Link href={EDUCATION_STRUCTURE_PATH}>how the six papers work</Link>,{" "}
          <Link href={EDUCATION_CHOOSE_PATH}>how to choose</Link>, or the{" "}
          <Link href={EDUCATION_COMPARE_PATH}>comparison matrix</Link>.
        </p>

        <h2>At a glance</h2>
        <EducationCompareMatrix />

        <h2 id="tn-plus-two-faq">FAQ</h2>
        {HSE_HUB_FAQ.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}

        <p>
          Official board notices:{" "}
          <a href={DGE_HOME_URL} rel="noopener noreferrer" target="_blank">
            Tamil Nadu Directorate of Government Examinations
          </a>
          . Always match the school’s printed group code to the four subjects on this page.
        </p>

        <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
