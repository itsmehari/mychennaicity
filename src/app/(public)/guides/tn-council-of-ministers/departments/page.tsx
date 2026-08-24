import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { DepartmentLookup } from "@/components/government/department-lookup";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GOVERNMENT_DISCLAIMER_EXTRA,
  GOVERNMENT_FINE_PRINT_EXTRA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_DEPARTMENTS_PATH,
  GOVERNMENT_DEPARTMENTS_TA_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  governmentHreflang,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";
import { buildGovernmentExplainerJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Department lookup — TN Council of Ministers";
const description =
  "Search a Tamil Nadu department or subject keyword to find which minister holds the portfolio (May 2026).";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: governmentHreflang(
    GOVERNMENT_DEPARTMENTS_PATH,
    GOVERNMENT_DEPARTMENTS_TA_PATH,
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${GOVERNMENT_DEPARTMENTS_PATH}`,
  },
};

export default function DepartmentsPage() {
  const jsonLd = buildGovernmentExplainerJsonLd({
    path: GOVERNMENT_DEPARTMENTS_PATH,
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
          { label: "Departments" },
        ]}
        eyebrow="Government desk · Reverse lookup"
        title="Which minister handles this department?"
        dek="Search electricity, health, school education, CMDA, fisheries and other portfolio keywords from the May 2026 allocation."
        related={[{ href: GOVERNMENT_HUB_PATH, label: "Full roster" }]}
      >
        <BilingualToggle
          enHref={GOVERNMENT_DEPARTMENTS_PATH}
          taHref={GOVERNMENT_DEPARTMENTS_TA_PATH}
          current="en"
        />

        <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA} />
        <DepartmentLookup locale="en" />
        <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA} />
      </ReachGuideShell>
    </>
  );
}
