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
  IAS_ARTICLE_LINKS_TA,
  IAS_SHELF_HOWTO_TA,
  IAS_SHELF_LEDE_TA,
} from "@/content/government/ias-shelf";
import {
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_IAS_PATH,
  GOVERNMENT_IAS_TA_PATH,
} from "@/content/government/paths";
import { IAS_ARTICLE_LINKS } from "@/content/government/reshuffle-links";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "IAS shelf — தமிழ்";
const description =
  "தமிழ்நாடு IAS மாற்றங்கள் குறித்த mychennaicity.in அறிக்கைத் தொகுப்பு — நேரடி கேடர் தரவுத்தளம் அல்ல.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: {
    canonical: `${getSiteUrl()}${GOVERNMENT_IAS_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${GOVERNMENT_IAS_PATH}`,
      "ta-IN": `${getSiteUrl()}${GOVERNMENT_IAS_TA_PATH}`,
      "x-default": `${getSiteUrl()}${GOVERNMENT_IAS_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${GOVERNMENT_IAS_TA_PATH}`,
    locale: "ta_IN",
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
      eyebrow="அரசு மேசை · கேடர் அறிக்கை"
      title="IAS மாற்றத் தொகுப்பு"
      dek="அமைச்சர்கள் கொள்கை; IAS நடைமுறை — அரசாணை ஸ்கேனுடன் சரிபார்க்கவும். நேரடி கேடர் பட்டியல் அல்ல."
      related={[{ href: GOVERNMENT_HUB_TA_PATH, label: "அமைச்சர் பட்டியல்" }]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_IAS_PATH}
        taHref={GOVERNMENT_IAS_TA_PATH}
        current="ta"
      />
      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />

      <h2>இந்தப் பக்கம் என்ன</h2>
      {IAS_SHELF_LEDE_TA.split("\n\n").map((para) => (
        <p key={para.slice(0, 40)}>{para}</p>
      ))}

      <h2>அரசாணையை எப்படி தேடுவது</h2>
      {IAS_SHELF_HOWTO_TA.split("\n\n").map((para) => (
        <p key={para.slice(0, 40)}>{para}</p>
      ))}

      <h2>தொடர்புடைய அறிக்கைகள்</h2>
      <ul lang="ta">
        {IAS_ARTICLE_LINKS.map((a) => {
          const ta = IAS_ARTICLE_LINKS_TA.find((t) => t.slug === a.slug);
          return (
            <li key={a.slug} className="mb-4">
              <Link
                href={`/chennai-local-news/${a.slug}`}
                className="font-semibold text-[var(--accent)]"
              >
                {ta?.titleTa ?? a.title}
              </Link>
              <p className="text-sm text-[var(--muted)]">
                {a.date} — {ta?.summaryTa ?? a.summary}{" "}
                <span lang="en">(English report)</span>
              </p>
            </li>
          );
        })}
      </ul>
      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
    </ReachGuideShell>
  );
}
