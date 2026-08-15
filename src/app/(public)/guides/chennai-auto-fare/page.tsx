import type { Metadata } from "next";
import { AutoFareCards } from "@/components/compulsive/auto-fare-cards";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AUTO_FARE_FAQ, AUTO_FARE_PATH } from "@/content/compulsive/auto-fare";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai auto fare reality cards";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Compare Chennai auto quotes: official 2013 meter vs July 2026 passenger and union proposals. No new GO as of 15 Aug 2026.",
  alternates: { canonical: `${getSiteUrl()}${AUTO_FARE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "WhatsApp-ready auto fare cards — official vs proposed, not a new tariff.",
    url: `${getSiteUrl()}${AUTO_FARE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AutoFarePage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Auto fare cards" },
      ]}
      eyebrow="Cost desk · autos"
      title="Chennai auto fare reality cards"
      dek="The legal meter is still 2013. Street quotes are not. Compare official vs what unions and passenger groups asked for in July 2026."
      related={[
        { href: compulsivePath("petrol-vs-ev"), label: "Petrol vs EV calculator" },
        { href: compulsivePath("chennai-today"), label: "Chennai today" },
        { href: "/chennai-local-events", label: "Local events" },
      ]}
    >
      <GuideDisclaimer
        kind="money"
        extra="Not a Transport Department order. Confirm any new gazette on the official TN transport site."
      />
      <AutoFareCards />
      <h2>FAQ</h2>
      {AUTO_FARE_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
