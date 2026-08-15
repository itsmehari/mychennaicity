import type { Metadata } from "next";
import { DengueWeekDesk } from "@/components/compulsive/dengue-week-desk";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { DENGUE_FAQ, DENGUE_WEEK_PATH } from "@/content/compulsive/dengue-week";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai dengue / mosquito week desk";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai dengue week checklist using GCC 2026 city totals (1,198 cases Jan–15 Jul, lower than 2025). Corridor watch — not a fake zone league table.",
  alternates: { canonical: `${getSiteUrl()}${DENGUE_WEEK_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Household checklist + GCC-sourced city context. Not a live case map.",
    url: `${getSiteUrl()}${DENGUE_WEEK_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function DengueWeekPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Dengue week" },
      ]}
      eyebrow="Health desk · monsoon"
      title="Dengue / mosquito week"
      dek="City totals were lower than 2025 through mid-July — GCC still treats June–November as the season. Checklist first; no invented zone rankings."
      related={[
        { href: CIVIC_TOOL_PATHS.floodStreet, label: "Flood street-score" },
        { href: compulsivePath("chennai-today"), label: "Chennai today" },
        { href: "/chennai-local-news", label: "Local news" },
      ]}
    >
      <GuideDisclaimer
        kind="civic"
        extra="Not medical advice. Fever after rains: test at a recognised lab / hospital."
      />
      <DengueWeekDesk />
      <h2>FAQ</h2>
      {DENGUE_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
