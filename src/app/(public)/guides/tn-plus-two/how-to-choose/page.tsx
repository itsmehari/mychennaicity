import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import {
  HSE_CHOOSE_AVOID,
  HSE_CHOOSE_DEK,
  HSE_CHOOSE_SEO_DESCRIPTION,
  HSE_CHOOSE_SEO_TITLE,
  HSE_CHOOSE_STEPS,
  HSE_CHOOSE_TITLE,
  HSE_CHOOSE_WHEN,
} from "@/content/education/hse-choose";
import { HSE_CHOOSE_FAQ } from "@/content/education/hse-faq";
import {
  DGE_HOME_URL,
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  NEET_NTA_URL,
  TNEA_HOME_URL,
  educationGroupPath,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_CHOOSE_SEO_TITLE,
  description: HSE_CHOOSE_SEO_DESCRIPTION,
  alternates: { canonical: `${getSiteUrl()}${EDUCATION_CHOOSE_PATH}` },
  openGraph: {
    title: fullSiteTitle(HSE_CHOOSE_SEO_TITLE),
    description: HSE_CHOOSE_SEO_DESCRIPTION,
    url: `${getSiteUrl()}${EDUCATION_CHOOSE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function TnPlusTwoHowToChoosePage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: EDUCATION_CHOOSE_PATH,
    name: HSE_CHOOSE_SEO_TITLE,
    description: HSE_CHOOSE_SEO_DESCRIPTION,
    faq: HSE_CHOOSE_FAQ,
    faqFragment: "choose-faq",
    howTo: true,
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
          { label: "How to choose" },
        ]}
        eyebrow="Education desk · Decision"
        title={HSE_CHOOSE_TITLE}
        dek={HSE_CHOOSE_DEK}
        related={[
          { href: EDUCATION_HUB_PATH, label: "Five preferred groups" },
          { href: EDUCATION_COMPARE_PATH, label: "Comparison matrix" },
        ]}
      >
        <GuideDisclaimer kind="education" />
        <PageAdSlot shape="rectangle" placement="tn_plus_two" />

        <h2>Five checks</h2>
        <ol>
          {HSE_CHOOSE_STEPS.map((s) => (
            <li key={s.name}>
              <strong>{s.name}.</strong> {s.text}
            </li>
          ))}
        </ol>

        <h2>Choose this code if…</h2>
        <ul>
          {HSE_CHOOSE_WHEN.map((row) => (
            <li key={row.code}>
              <strong>{row.code}:</strong> {row.when}{" "}
              {row.code.includes("/") ? (
                <>
                  <Link href={educationGroupPath("2804")}>2804</Link>
                  {" · "}
                  <Link href={educationGroupPath("2802")}>2802</Link>
                </>
              ) : (
                <Link href={educationGroupPath(row.code)}>{row.code} page</Link>
              )}
            </li>
          ))}
        </ul>

        <h2>Do not choose a group only because…</h2>
        <ul>
          {HSE_CHOOSE_AVOID.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p>
          Eligibility portals to verify (not this website):{" "}
          <a href={TNEA_HOME_URL} rel="noopener noreferrer" target="_blank">
            TNEA
          </a>
          ,{" "}
          <a href={NEET_NTA_URL} rel="noopener noreferrer" target="_blank">
            NTA NEET
          </a>
          ,{" "}
          <a href={DGE_HOME_URL} rel="noopener noreferrer" target="_blank">
            DGE Tamil Nadu
          </a>
          . Then{" "}
          <Link href={EDUCATION_COMPARE_PATH}>compare the five groups</Link>.
        </p>

        <h2 id="choose-faq">FAQ</h2>
        {HSE_CHOOSE_FAQ.map((item) => (
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
