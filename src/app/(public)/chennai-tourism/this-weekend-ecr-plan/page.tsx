import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { EcrWeekendItinerary } from "@/components/tourism/ecr-weekend-itinerary";
import {
  CHENNAI_TOURISM_HUB_PATH,
  ECR_WEEKEND_PLAN_PATH,
  TTDC_ECR_POSTER_PATH,
} from "@/content/tourism";
import { ECR_WEEKEND_RELATED } from "@/content/tourism/ecr-weekend-plan";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { buildEcrWeekendPlanJsonLdGraph } from "@/lib/seo/tourism-jsonld";

const titleSegment = "This weekend ECR plan";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Tamil Nadu Tourism’s this-weekend ECR loop from Chennai: Marundeeswarar Temple, DakshinaChitra, Muttukkadu boating, TTDC ₹99 biryani, Mamallapuram kite festival, UNESCO Shore Temple, and the Shore Temple Classic surf event — 14–16 August 2026.",
  alternates: { canonical: `${getSiteUrl()}${ECR_WEEKEND_PLAN_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Stop-by-stop East Coast Road weekend from Chennai — spiritual, culture, food, adventure — unpacked from the TTDC poster.",
    url: `${getSiteUrl()}${ECR_WEEKEND_PLAN_PATH}`,
    images: [{ url: TTDC_ECR_POSTER_PATH, width: 512, height: 640 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai → ECR → Mamallapuram loop this weekend, with kite festival and WSL surf dates.",
    images: [TTDC_ECR_POSTER_PATH],
  },
};

export default function ThisWeekendEcrPlanPage() {
  const graph = buildEcrWeekendPlanJsonLdGraph();

  return (
    <>
      {graph.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
      <ReachGuideShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Chennai tourism", href: CHENNAI_TOURISM_HUB_PATH },
          { label: "This weekend ECR plan" },
        ]}
        eyebrow="Tourism · TTDC / Tamil Nadu Tourism"
        title="This weekend ECR plan"
        dek="The official Tamil Nadu Tourism loop from Chennai down East Coast Road — temple, living museum, backwaters, ₹99 biryani, kite festival, UNESCO Shore Temple, and a WSL surf championship — with practical timing for 14–16 August 2026."
        related={ECR_WEEKEND_RELATED}
      >
        <GuideDisclaimer
          kind="culture"
          extra="The poster is a suggested loop, not a booked TTDC coach tour. Kite-festival hours, ASI monument closing times, boat counters, and the ₹99 biryani kitchen can change the same day — verify with TTDC, TNIKF, ASI, and WSL before you travel."
        />
        <EcrWeekendItinerary />
        <GuideFinePrint />
      </ReachGuideShell>
    </>
  );
}
