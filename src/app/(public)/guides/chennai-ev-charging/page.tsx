import type { Metadata } from "next";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  CHENNAI_EV_GUIDE_PATH,
  EV_CHENNAI_TIPS,
  EV_HOME_WIRING_CHECKLIST,
  EV_NETWORK_NOTES,
  EV_PUBLIC_FINDER_URL,
} from "@/content/guides/chennai-ev-charging";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai EV charging guide";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai EV charging guide — official Tamil Nadu charger finder, public networks, home wallbox wiring checklist, and practical city tips.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_EV_GUIDE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Find public EV chargers in Chennai and plan a safe home charging setup.",
    url: `${getSiteUrl()}${CHENNAI_EV_GUIDE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiEvChargingGuidePage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "EV charging" },
      ]}
      eyebrow="Mobility · Chennai"
      title="Chennai EV charging guide"
      dek="Where to find public chargers, which apps to trust for live status, and a home wallbox checklist for apartments — written for Chennai drivers, not brochure copy."
      related={[
        { href: "/chennai-local-news/topic/mobility", label: "Mobility & Metro news" },
        { href: "/chennai-gold-rate", label: "Daily gold rate (city costs desk)" },
        { href: "/directory", label: "City directory" },
      ]}
    >
      <p>
        <strong>Disclaimer:</strong> Charger maps and ₹/kWh tariffs change often. Use the
        official Tamil Nadu finder and operator apps for live availability. Home wiring must be
        done by a <strong>licensed electrician</strong> — this is not electrical advice.
      </p>

      <h2>Find a public charger</h2>
      <p>
        Start with the state map:{" "}
        <a href={EV_PUBLIC_FINDER_URL} target="_blank" rel="noopener noreferrer">
          tnev.tn.gov.in — Find a charger
        </a>
        . Filter by AC/DC and vehicle type, then confirm the pin in the network’s own app before
        you drive across town.
      </p>

      <h2>Networks you’ll see in Chennai</h2>
      <ul>
        {EV_NETWORK_NOTES.map((n) => (
          <li key={n.name}>
            <strong>{n.name}:</strong> {n.detail}{" "}
            <a href={n.href} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </li>
        ))}
      </ul>

      <h2>City tips</h2>
      <ul>
        {EV_CHENNAI_TIPS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h2>Home / apartment wallbox checklist</h2>
      <ol>
        {EV_HOME_WIRING_CHECKLIST.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <h2>Fine print</h2>
      <p>
        Tamil Nadu is expanding EV manufacturing and public charging under state EV programmes.
        Policy documents and charger guidelines evolve — re-check{" "}
        <a href="https://tnev.tn.gov.in/" target="_blank" rel="noopener noreferrer">
          tnev.tn.gov.in
        </a>{" "}
        before large purchases.
      </p>
    </ReachGuideShell>
  );
}
