import type { Metadata } from "next";
import { Suspense } from "react";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { InteractiveZoneMap } from "@/components/civic-tools/zone-map/interactive-zone-map";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "15 vs 20 vs 23 Zone Map",
  description:
    "Interactive comparison of operational 15-zone GCC map with proposed 20-zone and historical 23-zone layers.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zoneMap}` },
};

export default function ZoneMapPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="15 vs 20 vs 23 interactive zone map"
      description="Layer switcher, opacity, side-by-side comparison, ward and locality search. Proposed layers stay disabled until official geometry is verified."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zone map" },
      ]}
    >
      <Suspense
        fallback={<p className="text-sm text-[var(--muted)]">Loading map…</p>}
      >
        <InteractiveZoneMap />
      </Suspense>
    </CivicToolPageShell>
  );
}
