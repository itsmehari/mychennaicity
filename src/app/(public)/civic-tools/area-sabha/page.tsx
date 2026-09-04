import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { AreaSabhaTracker } from "@/components/civic-tools/area-sabha/area-sabha-tracker";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Area Sabha Tracker",
  description:
    "Ward committee and Area Sabha meetings, agendas, minutes, and project status for Greater Chennai.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.areaSabha}` },
  robots: { index: false, follow: true },
};

export default function AreaSabhaPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Area Sabha & Ward Committee Tracker"
      description="Meeting dates, agendas, resolutions, and implementation status — expanded as verified minutes are ingested."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Area Sabha" },
      ]}
    >
      <AreaSabhaTracker />
    </CivicToolPageShell>
  );
}
