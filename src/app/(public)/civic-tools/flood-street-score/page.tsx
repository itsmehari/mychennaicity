import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { FloodStreetScore } from "@/components/compulsive/flood-street-score";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { FLOOD_FAQ } from "@/content/compulsive/flood-street-score";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Chennai flood street-score",
  description:
    "Editorial monsoon scores from GCC’s 294 stagnation points (Sholinganallur 76 named). Not a live flood warning — use IMD and GCC alerts for tonight.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.floodStreet}` },
};

export default function FloodStreetScorePage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Flood street-score"
      description="A 1–10 editorial score by corridor, grounded in the August 2026 GCC monsoon map — not sensors, not tonight’s forecast."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Flood street-score" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="Do not treat this score as an evacuation order. Follow IMD / GCC alerts during a spell."
        />
        <FloodStreetScore />
        <section className="prose prose-sm max-w-3xl text-[var(--muted)] prose-headings:text-[var(--foreground)]">
          <h2>FAQ</h2>
          {FLOOD_FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            Related:{" "}
            <a href={CIVIC_TOOL_PATHS.zoneWardFinder}>Zone & Ward Finder</a>,{" "}
            <a href={compulsivePath("chennai-today")}>Chennai today</a>.
          </p>
          <GuideFinePrint />
        </section>
      </div>
    </CivicToolPageShell>
  );
}
