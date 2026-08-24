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
  GOVERNMENT_IAS_PATH,
  GOVERNMENT_IAS_TA_PATH,
} from "@/content/government/paths";
import { IAS_ARTICLE_LINKS } from "@/content/government/reshuffle-links";
import { getSiteUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "IAS shelf — தமிழ்",
  alternates: {
    canonical: `${getSiteUrl()}${GOVERNMENT_IAS_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${GOVERNMENT_IAS_PATH}`,
      "ta-IN": `${getSiteUrl()}${GOVERNMENT_IAS_TA_PATH}`,
      "x-default": `${getSiteUrl()}${GOVERNMENT_IAS_PATH}`,
    },
  },
};

export default function IasLeadershipTamilPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "அமைச்சரவை", href: GOVERNMENT_HUB_TA_PATH },
        { label: "IAS" },
      ]}
      eyebrow="அரசு desk"
      title="IAS reshuffle cluster"
      dek="Ministers policy; IAS execution — news links."
      related={[{ href: GOVERNMENT_HUB_TA_PATH, label: "Roster" }]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_IAS_PATH}
        taHref={GOVERNMENT_IAS_TA_PATH}
        current="ta"
      />
      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />
      <ul lang="ta">
        {IAS_ARTICLE_LINKS.map((a) => (
          <li key={a.slug} className="mb-3">
            <Link href={`/chennai-local-news/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
    </ReachGuideShell>
  );
}
