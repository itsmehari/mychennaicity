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
import {
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_IAS_PATH,
  GOVERNMENT_IAS_TA_PATH,
  governmentHreflang,
} from "@/content/government/paths";
import { IAS_ARTICLE_LINKS } from "@/content/government/reshuffle-links";
import { getSiteUrl } from "@/lib/env";
import { buildGovernmentExplainerJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "IAS leadership shelf — Tamil Nadu";
const description =
  "Links to mychennaicity.in reporting on Tamil Nadu IAS reshuffles — collectors, secretaries and targeted postings. Not a live cadre database.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: governmentHreflang(
    GOVERNMENT_IAS_PATH,
    GOVERNMENT_IAS_TA_PATH,
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${GOVERNMENT_IAS_PATH}`,
  },
};

export default function IasLeadershipPage() {
  const jsonLd = buildGovernmentExplainerJsonLd({
    path: GOVERNMENT_IAS_PATH,
    name: titleSegment,
    description,
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
          { label: "Council of Ministers", href: GOVERNMENT_HUB_PATH },
          { label: "IAS leadership" },
        ]}
        eyebrow="Government desk · Cadre reporting"
        title="IAS reshuffle cluster"
        dek="Ministers set policy; IAS officers run departments. These news desks track posted Government Orders and reshuffles — verify against official G.O. scans."
        related={[{ href: GOVERNMENT_HUB_PATH, label: "Minister roster" }]}
      >
        <BilingualToggle
          enHref={GOVERNMENT_IAS_PATH}
          taHref={GOVERNMENT_IAS_TA_PATH}
          current="en"
        />

        <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA} />

        <ul>
          {IAS_ARTICLE_LINKS.map((a) => (
            <li key={a.slug} className="mb-4">
              <Link
                href={`/chennai-local-news/${a.slug}`}
                className="font-semibold text-[var(--accent)]"
              >
                {a.title}
              </Link>
              <p className="text-sm text-[var(--muted)]">
                {a.date} — {a.summary}
              </p>
            </li>
          ))}
        </ul>

        <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
