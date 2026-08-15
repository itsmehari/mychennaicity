import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { PowerFeederDesk } from "@/components/compulsive/power-feeder-desk";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { POWER_FEEDER_FAQ, POWER_FEEDER_PATH } from "@/content/compulsive/power-feeder";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const metadata: Metadata = {
  title: "Chennai power / feeder outage desk",
  description:
    "How to tell a Tangedco feeder cut from a GCC streetlight or a house MCB — editorial Chennai corridors plus Minnagam 94987 94987. Not a live outage map.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOL_PATHS.powerFeeder}` },
};

export default function PowerFeederPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="Power / feeder outage desk"
      description="Whole street dark, one pole dark, or only your flat? Editorial corridors and the right helpline — not live Tangedco SCADA."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools", href: CIVIC_TOOL_PATHS.hub },
        { label: "Power / feeder" },
      ]}
    >
      <div className="space-y-8">
        <GuideDisclaimer
          kind="civic"
          extra="This desk does not replace Minnagam, the TNPDCL bill portal, or GCC 1913."
        />
        <PowerFeederDesk />
        <section className="prose prose-sm max-w-3xl text-[var(--muted)] prose-headings:text-[var(--foreground)]">
          <h2>FAQ</h2>
          {POWER_FEEDER_FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            Related:{" "}
            <a href={CIVIC_TOOL_PATHS.streetlightDeadSpots}>Streetlight desk</a>,{" "}
            <a href={compulsivePath("ac-bill")}>AC bill predictor</a>,{" "}
            <a href={POWER_FEEDER_PATH}>this desk</a>.
          </p>
          <GuideFinePrint />
        </section>
      </div>
    </CivicToolPageShell>
  );
}
