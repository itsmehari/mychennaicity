import type { Metadata } from "next";
import { Suspense } from "react";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ZoneWardFinder } from "@/components/civic-tools/zone-ward-finder/zone-ward-finder";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Zone & Ward Finder",
  description:
    "What is my current GCC zone and ward? Search by locality, ward number, PIN, map pin, or GPS.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zoneWardFinder}` },
};

export default function ZoneWardFinderPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Chennai Zone & Ward Finder"
      description="Answers: what is my current Corporation zone and ward? Current 15-zone results always appear first; proposed 20-zone data is shown separately when verified."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zone & Ward Finder" },
      ]}
    >
      <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading…</p>}>
        <ZoneWardFinder />
      </Suspense>
    </CivicToolPageShell>
  );
}
