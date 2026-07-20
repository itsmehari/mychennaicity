import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ResponsibilityRouter } from "@/components/civic-tools/responsibility-router/responsibility-router";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Civic Responsibility Router",
  description:
    "Find the right authority for garbage, potholes, sewage, water supply, and other Chennai civic issues.",
  alternates: {
    canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.responsibilityRouter}`,
  },
};

export default function ResponsibilityRouterPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Chennai Civic Responsibility Router"
      description="Before filing a GCC complaint, check whether Metro Water, police, Tangedco, or another agency owns the issue."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Responsibility router" },
      ]}
    >
      <ResponsibilityRouter />
    </CivicToolPageShell>
  );
}
