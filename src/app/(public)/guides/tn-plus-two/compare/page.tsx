import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { EducationCompareMatrix } from "@/components/education/education-compare-matrix";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { compareNoteForHumanities } from "@/content/education/hse-compare";
import { HSE_COMPARE_FAQ } from "@/content/education/hse-faq";
import { HSE_GROUPS } from "@/content/education/hse-groups";
import {
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  educationGroupPath,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Compare TN Plus Two groups 2502 to humanities";
const description =
  "Side-by-side comparison of Tamil Nadu Higher Secondary groups 2502, 2503, 2702, 2708 and 2804 — maths, biology, computing, medicine, engineering, CA and civil services.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: { canonical: `${getSiteUrl()}${EDUCATION_COMPARE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${EDUCATION_COMPARE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function TnPlusTwoComparePage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: EDUCATION_COMPARE_PATH,
    name: titleSegment,
    description,
    faq: HSE_COMPARE_FAQ,
    faqFragment: "compare-faq",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReachGuideShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "TN Plus Two", href: EDUCATION_HUB_PATH },
          { label: "Compare" },
        ]}
        eyebrow="Education desk · Comparison"
        title="Compare the five preferred groups"
        dek="One matrix for mathematics intensity, biology, computing, engineering, medicine, CA and civil-services foundation. Labels are directional — not admission guarantees."
        related={[
          { href: EDUCATION_HUB_PATH, label: "Group guide hub" },
          { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
          ...HSE_GROUPS.slice(0, 3).map((g) => ({
            href: educationGroupPath(g.code),
            label: `${g.code} ${g.nameEn}`,
          })),
        ]}
      >
        <GuideDisclaimer kind="education" />
        <PageAdSlot shape="rectangle" placement="tn_plus_two" />
        <p>{compareNoteForHumanities()}</p>
        <EducationCompareMatrix />
        <h2>Open a group page</h2>
        <ul>
          {HSE_GROUPS.map((g) => (
            <li key={g.code}>
              <Link href={educationGroupPath(g.code)}>
                {g.code} — {g.nameEn}
              </Link>
            </li>
          ))}
        </ul>
        <h2 id="compare-faq">FAQ</h2>
        {HSE_COMPARE_FAQ.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
