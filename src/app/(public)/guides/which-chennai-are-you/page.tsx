import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { WhichChennaiQuiz } from "@/components/compulsive/which-chennai-quiz";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  WHICH_CHENNAI_FAQ,
  WHICH_CHENNAI_PATH,
} from "@/content/compulsive/which-chennai";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Which Chennai are you?";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Playful Chennai personality quiz — Mylapore, OMR, North pulse, or West planner. Shareable archetypes for residents and newcomers.",
  alternates: { canonical: `${getSiteUrl()}${WHICH_CHENNAI_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "A light city-desk quiz for your Chennai energy — not a ranking.",
    url: `${getSiteUrl()}${WHICH_CHENNAI_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function WhichChennaiAreYouPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Which Chennai are you?" },
      ]}
      eyebrow="Culture desk · Quiz"
      title="Which Chennai are you?"
      dek="Nine quick questions, four neighbourhood energies — playful archetypes for how you actually live the city, not a pin-code loyalty test."
      related={[
        { href: compulsivePath("rivalries"), label: "Area rivalry cards" },
        { href: compulsivePath("slang"), label: "Chennai slang decoder" },
        { href: compulsivePath("moved-checklist"), label: "Moved to Chennai checklist" },
        { href: CHENNAI_SALARY_GUIDE_PATH, label: "Salary guide 2026" },
        { href: CHENNAI_JOBS_HUB_PATH, label: "Chennai jobs" },
        { href: "/chennai-whatsapp-group-admins", label: "WhatsApp admin tips" },
      ]}
    >
      <GuideDisclaimer kind="culture" />
      <WhichChennaiQuiz />
      <h2>FAQ</h2>
      {WHICH_CHENNAI_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
