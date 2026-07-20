import type { Metadata } from "next";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { WardMigrationLookup } from "@/components/civic-tools/ward-migration/ward-migration-lookup";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Ward Migration Lookup",
  description:
    "Enter a current ward number to see verified zone migration under GCC reorganisation proposals.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.wardMigration}` },
};

export default function WardMigrationPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Ward migration lookup"
      description="Present zone, proposed 20-zone assignment, and historical 23-zone data — only from verified government sources."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Ward migration" },
      ]}
    >
      <WardMigrationLookup />
    </CivicToolPageShell>
  );
}
