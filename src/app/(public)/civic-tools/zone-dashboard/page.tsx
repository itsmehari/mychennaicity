import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ZoneDashboard } from "@/components/civic-tools/zone-dashboard/zone-dashboard";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Chennai zone data dashboard",
  description:
    "Verified Greater Chennai ward counts by the operational 15 zones, with source and methodology. Population, budget, and complaint volumes stay blank until GCC publishes them zone-wise.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zoneDashboard}` },
};

export default function ZoneDashboardPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Chennai zone data dashboard"
      description="Estimated, reported, and official values are never shown as equivalent. Each published metric carries verification status; the rest are listed as not published."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zone dashboard" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="Ward counts come from Datameet polygons. Flood scores are editorial. Do not treat missing cells as zero."
        />
        <ZoneDashboard />
        <GuideFinePrint />
      </div>
    </CivicToolPageShell>
  );
}
