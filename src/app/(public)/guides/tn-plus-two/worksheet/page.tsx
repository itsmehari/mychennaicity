import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { EducationWorksheet } from "@/components/education/education-worksheet";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import {
  HSE_WORKSHEET_DEK,
  HSE_WORKSHEET_FAQ,
  HSE_WORKSHEET_PATH,
  HSE_WORKSHEET_SEO_DESCRIPTION,
  HSE_WORKSHEET_SEO_TITLE,
  HSE_WORKSHEET_STEPS,
  HSE_WORKSHEET_TITLE,
} from "@/content/education/hse-worksheet";
import {
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_WORKSHEET_SEO_TITLE,
  description: HSE_WORKSHEET_SEO_DESCRIPTION,
  alternates: { canonical: `${getSiteUrl()}${HSE_WORKSHEET_PATH}` },
  openGraph: {
    title: fullSiteTitle(HSE_WORKSHEET_SEO_TITLE),
    description: HSE_WORKSHEET_SEO_DESCRIPTION,
    url: `${getSiteUrl()}${HSE_WORKSHEET_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function WorksheetPage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: HSE_WORKSHEET_PATH,
    name: HSE_WORKSHEET_SEO_TITLE,
    description: HSE_WORKSHEET_SEO_DESCRIPTION,
    faq: HSE_WORKSHEET_FAQ,
    faqFragment: "worksheet-faq",
    howTo: true,
    howToName: "How to rank Tamil Nadu Higher Secondary groups with a parent",
    howToSteps: HSE_WORKSHEET_STEPS,
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
          { label: "Worksheet" },
        ]}
        eyebrow="Education desk · Decision"
        title={HSE_WORKSHEET_TITLE}
        dek={HSE_WORKSHEET_DEK}
        related={[
          { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
          { href: EDUCATION_COMPARE_PATH, label: "Compare matrix" },
        ]}
      >
        <GuideDisclaimer kind="education" />
        <PageAdSlot shape="rectangle" placement="tn_plus_two" />
        <h2>Five steps</h2>
        <ol>
          {HSE_WORKSHEET_STEPS.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>
        <EducationWorksheet />
        <p>
          After you rank, open the matching{" "}
          <Link href={EDUCATION_HUB_PATH}>group page</Link> and confirm the school
          still offers that code.
        </p>
        <h2 id="worksheet-faq">FAQ</h2>
        {HSE_WORKSHEET_FAQ.map((item) => (
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
