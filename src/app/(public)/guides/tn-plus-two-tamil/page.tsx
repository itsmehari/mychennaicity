import type { Metadata } from "next";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import { HSE_GROUPS } from "@/content/education/hse-groups";
import { streamLabel } from "@/content/education/hse-compare";
import {
  HSE_HUB_AEO_TA,
  HSE_HUB_FAQ_TA,
  HSE_HUB_TA,
} from "@/content/education/hse-tamil";
import {
  EDUCATION_HUB_PATH,
  EDUCATION_HUB_TA_PATH,
  educationClusterPath,
  educationGroupPath,
  educationHreflang,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: HSE_HUB_TA.seoTitle,
  description: HSE_HUB_TA.seoDescription,
  alternates: educationHreflang(EDUCATION_HUB_PATH, EDUCATION_HUB_TA_PATH, getSiteUrl()),
  openGraph: {
    title: fullSiteTitle(HSE_HUB_TA.seoTitle),
    description: HSE_HUB_TA.seoDescription,
    url: `${getSiteUrl()}${EDUCATION_HUB_TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function TnPlusTwoTamilHubPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "வழிகாட்டிகள்" },
        { label: "மேல்நிலைக் குழுக்கள்" },
      ]}
      eyebrow="கல்வி மேடை"
      title={HSE_HUB_TA.title}
      dek={HSE_HUB_TA.dek}
      related={[
        { href: educationClusterPath("science", "ta"), label: "அறிவியல்" },
        { href: educationClusterPath("commerce", "ta"), label: "வணிகம்" },
        { href: educationClusterPath("textbooks", "ta"), label: "பாடநூல்கள்" },
        { href: educationClusterPath("after-12th", "ta"), label: "12-க்குப் பிறகு" },
      ]}
    >
      <BilingualToggle enHref={EDUCATION_HUB_PATH} taHref={EDUCATION_HUB_TA_PATH} current="ta" />
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{HSE_HUB_TA.issued}</p>
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      <div className="not-prose my-8">
        <AeoAnswerBlock content={HSE_HUB_AEO_TA} />
      </div>
      <h2>ஐந்து விருப்பக் குழுக்கள்</h2>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
        {HSE_GROUPS.map((g) => (
          <Link
            key={g.code}
            href={educationGroupPath(g.code, "ta")}
            className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 no-underline hover:border-[var(--accent)]"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
              {streamLabel(g.stream)} · {g.code}
            </p>
            <p className="mt-1 text-base font-bold text-[var(--foreground)]">{g.nameTa}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{g.cores.map((c) => c.ta).join(" · ")}</p>
          </Link>
        ))}
      </div>
      <h2 id="tn-plus-two-faq-ta">அடிக்கடி கேள்விகள்</h2>
      {HSE_HUB_FAQ_TA.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
