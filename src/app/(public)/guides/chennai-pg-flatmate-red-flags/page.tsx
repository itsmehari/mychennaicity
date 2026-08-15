import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { PgRedFlagsTool } from "@/components/compulsive/pg-red-flags-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  PG_RED_FLAGS_FAQ,
  PG_RED_FLAGS_PATH,
} from "@/content/compulsive/pg-red-flags";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai PG / flatmate red flags";
const TA_PATH = "/guides/chennai-pg-flatmate-red-flags-tamil";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai PG and flatmate red, amber, and green signals — deposits, agreements, utilities, and safety checks. Not legal advice.",
  alternates: {
    canonical: `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Interactive checklist for safer PG / flatmate hunts in Chennai.",
    url: `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiPgFlatmateRedFlagsPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "PG / flatmate red flags" },
      ]}
      eyebrow="Housing desk · Safety"
      title="Chennai PG / flatmate red flags"
      dek="Tick what you saw on the visit — red means pause, amber means clarify in writing, green means healthier signals. Still read the agreement."
      related={[
        { href: compulsivePath("moved-checklist"), label: "Moved to Chennai checklist" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: CHENNAI_SALARY_GUIDE_PATH, label: "Salary guide 2026" },
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
        { href: "/directory", label: "City directory" },
      ]}
    >
      <BilingualToggle enHref={PG_RED_FLAGS_PATH} taHref={TA_PATH} current="en" />
      <GuideDisclaimer
        kind="money"
        extra="Not legal advice. Deposit disputes, tenancy rights, and contracts need a qualified professional and official channels — this page is practical resident guidance only."
      />
      <PgRedFlagsTool />
      <h2>FAQ</h2>
      {PG_RED_FLAGS_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
