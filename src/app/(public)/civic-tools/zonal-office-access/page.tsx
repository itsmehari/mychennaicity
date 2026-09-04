import type { Metadata } from "next";
import { Suspense } from "react";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ZonalOfficeAccess } from "@/components/civic-tools/zonal-office-access/zonal-office-access";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Zonal Office Accessibility",
  description:
    "Distance, travel time estimates, and access notes for GCC zonal offices across Chennai.",
  alternates: {
    canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zonalOfficeAccess}`,
  },
  robots: { index: false, follow: true },
};

export default function ZonalOfficeAccessPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Zonal Office Accessibility Calculator"
      description="Addresses reorganisation concerns about distance to zonal offices — with provenance on every field."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zonal office access" },
      ]}
    >
      <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading…</p>}>
        <ZonalOfficeAccess />
      </Suspense>
    </CivicToolPageShell>
  );
}
