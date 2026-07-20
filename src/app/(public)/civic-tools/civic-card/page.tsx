import type { Metadata } from "next";
import { Suspense } from "react";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { CivicCardForm } from "@/components/civic-tools/civic-card/civic-card-form";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "My Chennai Civic Card",
  description:
    "Printable civic card with zone, ward, councillor, zonal office, and emergency contacts. Saved in browser local storage.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.civicCard}` },
};

export default function CivicCardPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="My Chennai Civic Card"
      description="Generate a printable card for your household. Data stays in this browser unless you opt into cloud saving (not available yet)."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Civic card" },
      ]}
    >
      <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading…</p>}>
        <CivicCardForm />
      </Suspense>
    </CivicToolPageShell>
  );
}
