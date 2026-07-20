import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ZoneDashboard } from "@/components/civic-tools/zone-dashboard/zone-dashboard";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Zone Data Dashboard",
  description:
    "Zone-wise civic metrics for Greater Chennai with source, methodology, and missing-data indicators.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zoneDashboard}` },
};

export default function ZoneDashboardPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Chennai Zone Data Dashboard"
      description="Estimated, reported, and official values are never shown as equivalent. Each metric carries verification status."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zone dashboard" },
      ]}
    >
      <ZoneDashboard />
    </CivicToolPageShell>
  );
}
