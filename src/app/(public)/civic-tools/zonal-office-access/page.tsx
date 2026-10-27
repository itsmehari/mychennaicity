import type { Metadata } from "next";
import { Suspense } from "react";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { ZonalOfficeAccess } from "@/components/civic-tools/zonal-office-access/zonal-office-access";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "GCC zonal office addresses",
  description:
    "Official Greater Chennai Corporation Zone I–XV office addresses, emails, and landlines from the GCC Who is Who directory, with approximate distance.",
  alternates: {
    canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.zonalOfficeAccess}`,
  },
};

export default function ZonalOfficeAccessPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Zonal office accessibility"
      description="Find the current 15-zone GCC counter: address, email, landline, maps, and an approximate straight-line distance. Confirm the door number on the Corporation who-is-who before you visit."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Zonal office access" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="Directory fields are transcribed from GCC Who is Who. Map pins are approximate. Call 1913 for urgent civic complaints."
        />
        <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading…</p>}>
          <ZonalOfficeAccess />
        </Suspense>
        <GuideFinePrint />
      </div>
    </CivicToolPageShell>
  );
}
