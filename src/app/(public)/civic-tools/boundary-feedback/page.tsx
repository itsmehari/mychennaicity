import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { BoundaryFeedbackMap } from "@/components/civic-tools/boundary-feedback/boundary-feedback-map";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Boundary Feedback Map",
  description:
    "Report incorrect ward or zone boundaries. Community reports do not change official GCC data.",
  alternates: {
    canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.boundaryFeedback}`,
  },
};

export default function BoundaryFeedbackPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Citizen Boundary Feedback Map"
      description="Mark incorrect locality placement, split roads, inaccessible zonal offices, and other boundary concerns. Submissions remain community reports."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Boundary feedback" },
      ]}
    >
      <BoundaryFeedbackMap />
    </CivicToolPageShell>
  );
}
