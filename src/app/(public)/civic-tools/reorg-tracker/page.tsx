import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ReorgTracker } from "@/components/civic-tools/reorg-tracker/reorg-tracker";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Zone Reorganisation Tracker",
  description:
    "Government orders, gazette notices, council resolutions, and transition status for GCC zone reform.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.reorgTracker}` },
};

export default function ReorgTrackerPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Zone Reorganisation Update Tracker"
      description="From announcement through gazette notification to operational status — with cited sources."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Reorg tracker" },
      ]}
    >
      <ReorgTracker />
    </CivicToolPageShell>
  );
}
