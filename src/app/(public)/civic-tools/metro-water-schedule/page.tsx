import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { MetroWaterDesk } from "@/components/compulsive/metro-water-desk";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { METRO_WATER_FAQ } from "@/content/compulsive/metro-water";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Chennai Metro Water supply-day desk",
  description:
    "How Greater Chennai water supply usually works by corridor — CMWSSB notices, building vs city cuts, tanker caution. Not live valve timings.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.metroWater}` },
};

export default function MetroWaterPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Metro Water supply-day desk"
      description="Editorial patterns by north / central / south / OMR / west. Confirm today’s shutdown on the CMWSSB site."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Metro Water" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="Not an official CMWSSB schedule. Area notices on the Corporation / Metro Water sites win."
        />
        <MetroWaterDesk />
        <section className="prose prose-sm max-w-3xl text-[var(--muted)] prose-headings:text-[var(--foreground)]">
          <h2>FAQ</h2>
          {METRO_WATER_FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            Related:{" "}
            <a href={CIVIC_TOOL_PATHS.responsibilityRouter}>Responsibility router</a>,{" "}
            <a href={compulsivePath("address-fixer")}>Address form fixer</a>.
          </p>
          <GuideFinePrint />
        </section>
      </div>
    </CivicToolPageShell>
  );
}
