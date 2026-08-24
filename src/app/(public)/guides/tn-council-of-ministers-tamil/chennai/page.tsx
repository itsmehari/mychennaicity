import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ChennaiMinistersShelf } from "@/components/government/chennai-ministers-shelf";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GOVERNMENT_DISCLAIMER_EXTRA_TA,
  GOVERNMENT_FINE_PRINT_EXTRA_TA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_CHENNAI_PATH,
  GOVERNMENT_CHENNAI_TA_PATH,
  GOVERNMENT_HUB_TA_PATH,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "சென்னை — யார் பொறுப்பு?",
  alternates: {
    canonical: `${getSiteUrl()}${GOVERNMENT_CHENNAI_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${GOVERNMENT_CHENNAI_PATH}`,
      "ta-IN": `${getSiteUrl()}${GOVERNMENT_CHENNAI_TA_PATH}`,
      "x-default": `${getSiteUrl()}${GOVERNMENT_CHENNAI_PATH}`,
    },
  },
};

export default function ChennaiGovernmentTamilPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "முகப்பு", href: "/" },
        { label: "அமைச்சரவை", href: GOVERNMENT_HUB_TA_PATH },
        { label: "சென்னை" },
      ]}
      eyebrow="அரசு desk · Chennai"
      title="சென்னை — யார் பொறுப்பு?"
      dek="குடிநீர், சாலை, மின்சாரம், பேருந்து, பள்ளி, pollution."
      related={[
        { href: "/civic-tools", label: "Civic tools" },
        { href: GOVERNMENT_HUB_TA_PATH, label: "Roster" },
      ]}
    >
      <BilingualToggle
        enHref={GOVERNMENT_CHENNAI_PATH}
        taHref={GOVERNMENT_CHENNAI_TA_PATH}
        current="ta"
      />
      <GuideDisclaimer kind="civic" extra={GOVERNMENT_DISCLAIMER_EXTRA_TA} />
      <ChennaiMinistersShelf locale="ta" />
      <GuideFinePrint extra={GOVERNMENT_FINE_PRINT_EXTRA_TA} />
    </ReachGuideShell>
  );
}
