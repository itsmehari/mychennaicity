import type { Metadata } from "next";
import { Suspense } from "react";
import { AddressFormFixerTool } from "@/components/compulsive/address-form-fixer-tool";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import {
  ADDRESS_FORM_FAQ,
  ADDRESS_FORM_FIXER_PATH,
} from "@/content/compulsive/address-form-fixer";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Ward vs PIN / address form fixer",
  description:
    "Why Chennai forms fail: PIN ≠ ward ≠ zone. Decision steps plus links to Zone & Ward Finder and Ward Migration Lookup.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.addressFormFixer}` },
};

export default function AddressFormFixerPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Ward vs PIN address form fixer"
      description="PIN, ward, and zone are three different systems. Walk the decision tree before you fight a dropdown — then confirm with live civic lookups."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Address form fixer" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="Form fields on banks, schools, and apps are not official GCC maps."
        />
        <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading…</p>}>
          <AddressFormFixerTool />
        </Suspense>
        <section className="prose prose-sm max-w-3xl text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
          <h2>FAQ</h2>
          {ADDRESS_FORM_FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            Related:{" "}
            <a href={CIVIC_TOOL_PATHS.zoneWardFinder}>Zone & Ward Finder</a>,{" "}
            <a href={CIVIC_TOOL_PATHS.wardMigration}>Ward migration</a>,{" "}
            <a href={compulsivePath("streetlight")}>Streetlight desk</a>,{" "}
            <a href={ADDRESS_FORM_FIXER_PATH}>this tool</a>.
          </p>
          <GuideFinePrint />
        </section>
      </div>
    </CivicToolPageShell>
  );
}
