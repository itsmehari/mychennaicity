import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { HSE_STRUCTURE_FAQ } from "@/content/education/hse-faq";
import {
  HSE_STRUCTURE_BODY,
  HSE_STRUCTURE_DEK,
  HSE_STRUCTURE_PARTS,
  HSE_STRUCTURE_SEO_DESCRIPTION,
  HSE_STRUCTURE_SEO_TITLE,
  HSE_STRUCTURE_TITLE,
} from "@/content/education/hse-structure";
import {
  DGE_HOME_URL,
  EDUCATION_CHOOSE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_STRUCTURE_PATH,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationExplainerJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_STRUCTURE_SEO_TITLE,
  description: HSE_STRUCTURE_SEO_DESCRIPTION,
  alternates: { canonical: `${getSiteUrl()}${EDUCATION_STRUCTURE_PATH}` },
  openGraph: {
    title: fullSiteTitle(HSE_STRUCTURE_SEO_TITLE),
    description: HSE_STRUCTURE_SEO_DESCRIPTION,
    url: `${getSiteUrl()}${EDUCATION_STRUCTURE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function TnPlusTwoStructurePage() {
  const jsonLd = buildEducationExplainerJsonLd({
    path: EDUCATION_STRUCTURE_PATH,
    name: HSE_STRUCTURE_SEO_TITLE,
    description: HSE_STRUCTURE_SEO_DESCRIPTION,
    faq: HSE_STRUCTURE_FAQ,
    faqFragment: "structure-faq",
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
          { label: "HSE structure" },
        ]}
        eyebrow="Education desk · Board structure"
        title={HSE_STRUCTURE_TITLE}
        dek={HSE_STRUCTURE_DEK}
        related={[
          { href: EDUCATION_HUB_PATH, label: "Five preferred groups" },
          { href: EDUCATION_CHOOSE_PATH, label: "How to choose" },
        ]}
      >
        <GuideDisclaimer kind="education" />
        <PageAdSlot shape="rectangle" placement="tn_plus_two" />

        <p>
          The group you select after Class 10 does not replace language or English. It only
          names the four Part III cores.
        </p>

        <h2>The six papers</h2>
        <ol>
          {HSE_STRUCTURE_PARTS.map((p) => (
            <li key={`${p.part}-${p.name}`}>
              <strong>
                {p.part} — {p.name}.
              </strong>{" "}
              {p.detail}
            </li>
          ))}
        </ol>

        {HSE_STRUCTURE_BODY.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}

        <p>
          See the{" "}
          <Link href={EDUCATION_HUB_PATH}>five preferred groups</Link> or{" "}
          <Link href={EDUCATION_CHOOSE_PATH}>how to choose</Link>. Board circulars:{" "}
          <a href={DGE_HOME_URL} rel="noopener noreferrer" target="_blank">
            dge.tn.gov.in
          </a>
          .
        </p>

        <h2 id="structure-faq">FAQ</h2>
        {HSE_STRUCTURE_FAQ.map((item) => (
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
