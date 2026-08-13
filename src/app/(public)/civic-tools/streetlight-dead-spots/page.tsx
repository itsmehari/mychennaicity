import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { StreetlightDesk } from "@/components/compulsive/streetlight-desk";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import {
  STREETLIGHT_FAQ,
  STREETLIGHT_PATH,
} from "@/content/compulsive/streetlight-dead-spots";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Streetlight dead-spots desk",
  description:
    "Editorial Chennai streetlight corridors by zone, plus how to report via GCC — not a live complaint wall.",
  alternates: {
    canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.streetlightDeadSpots}`,
  },
};

export default function StreetlightDeadSpotsPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Streetlight dead-spots desk"
      description="Curated night-visibility corridors by zone and a clear GCC report path. Editorial patterns only — not live outage status."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Streetlight dead-spots" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="This desk does not replace 1913 or GCC online civic services."
        />
        <StreetlightDesk />
        <section className="prose prose-sm max-w-3xl text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
          <h2>FAQ</h2>
          {STREETLIGHT_FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            Related:{" "}
            <a href={CIVIC_TOOL_PATHS.responsibilityRouter}>Responsibility router</a>,{" "}
            <a href={CIVIC_TOOL_PATHS.zoneWardFinder}>Zone & Ward Finder</a>,{" "}
            <a href={compulsivePath("address-fixer")}>Address form fixer</a>,{" "}
            <a href={STREETLIGHT_PATH}>this desk</a>.
          </p>
          <GuideFinePrint />
        </section>
      </div>
    </CivicToolPageShell>
  );
}
