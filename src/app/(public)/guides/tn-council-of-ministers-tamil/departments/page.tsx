import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { DepartmentLookup } from "@/components/government/department-lookup";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GOVERNMENT_DISCLAIMER_EXTRA_TA,
  GOVERNMENT_FINE_PRINT_EXTRA_TA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_DEPARTMENTS_PATH,
  GOVERNMENT_DEPARTMENTS_TA_PATH,
  GOVERNMENT_HUB_TA_PATH,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "Department lookup — தமிழ்",
  alternates: {
    canonical: `${getSiteUrl()}${GOVERNMENT_DEPARTMENTS_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${GOVERNMENT_DEPARTMENTS_PATH}`,
      "ta-IN": `${getSiteUrl()}${GOVERNMENT_DEPARTMENTS_TA_PATH}`,
      "x-default": `${getSiteUrl()}${GOVERNMENT_DEPARTMENTS_PATH}`,
    },
  },
};

export default function DepartmentsTamilPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "அமைச்சரவை", href: GOVERNMENT_HUB_TA_PATH },
        { label: "Departments" },
      ]}
      eyebrow="அரசு desk"
      title="Department lookup"
      dek="துறை keyword தேட — May 2026 allocation."
      related={[{ href: GOVERNMENT_HUB_TA_PATH, label: "Roster" }]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_DEPARTMENTS_PATH}
        taHref={GOVERNMENT_DEPARTMENTS_TA_PATH}
        current="ta"
      />
      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />
      <DepartmentLookup locale="ta" />
      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
    </ReachGuideShell>
  );
}
