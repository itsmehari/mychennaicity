import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { AreaSabhaTracker } from "@/components/civic-tools/area-sabha/area-sabha-tracker";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Area Sabha & Ward Committee desk",
  description:
    "How Greater Chennai Ward Committees and Area Sabhas work, where to find official notices, and what to do before a meeting. Minutes listed only when verified.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.areaSabha}` },
};

export default function AreaSabhaPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Area Sabha & Ward Committee desk"
      description="How the two layers work, official GCC channels, and a meetings list that stays empty until a notice is verified."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Area Sabha" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="This desk does not replace 1913, GCC online civic services, or a notice issued by your zonal office."
        />
        <AreaSabhaTracker />
        <GuideFinePrint />
      </div>
    </CivicToolPageShell>
  );
}
