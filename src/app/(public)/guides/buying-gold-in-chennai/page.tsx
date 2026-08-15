import type { Metadata } from "next";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { BUYING_GOLD_FAQ } from "@/content/gold-rate/buying-gold-chennai";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_BUYING_GOLD_GUIDE_PATH,
  CHENNAI_GOLD_RATE_HISTORY_PATH,
  CHENNAI_GOLD_RATE_HUB_PATH,
} from "@/lib/routes/chennai-gold-rate";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Buying gold in Chennai";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai jewellery buyer’s guide — hallmark, making charges, T Nagar vs neighbourhood counters, and why the daily gram rate is only the start of the bill.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_BUYING_GOLD_GUIDE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Not a GoodReturns clone — Chennai invoice literacy.",
    url: `${getSiteUrl()}${CHENNAI_BUYING_GOLD_GUIDE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function BuyingGoldInChennaiPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Buying gold" },
      ]}
      eyebrow="Money desk · jewellery"
      title="Buying gold in Chennai"
      dek="The gram rate on our daily desk is a starting point. Most Chennai bills are jewellery — making, wastage, stones, GST."
      related={[
        { href: CHENNAI_GOLD_RATE_HUB_PATH, label: "Today’s gold rate" },
        { href: CHENNAI_GOLD_RATE_HISTORY_PATH, label: "Rate history" },
        { href: "/areas/kodambakkam-t-nagar", label: "T Nagar area hub" },
        { href: "/guides/chennai-wedding-venue-costs", label: "Wedding venue costs" },
      ]}
    >
      <GuideDisclaimer
        kind="money"
        extra="Not investment, tax, or jewellery-appraisal advice. Confirm every figure at the counter."
      />

      <h2>Read the invoice, not the TV ticker</h2>
      <p>
        Chennai shoppers mostly buy <strong>worked jewellery</strong>, not 999
        bars. A 10 g 22K chain can cost more than 10 × today’s 22K gram because
        of making, solder, and GST. Festival weeks (Akshaya Tritiya, Diwali,
        Tamil wedding season) raise footfall in T Nagar and George Town — they
        do not automatically lower making.
      </p>

      <h2>What to ask before you pay a deposit</h2>
      <ul>
        <li>BIS hallmark + HUID on newer pieces</li>
        <li>Net gold weight vs stone / extra metal</li>
        <li>Making % or ₹/g, and whether wastage is extra</li>
        <li>Buy-back: purity they will take back, and deductions</li>
        <li>GST line on the printed bill — not a WhatsApp screenshot</li>
      </ul>

      <h2>Where people actually shop</h2>
      <p>
        T Nagar and George Town remain the dense corridors. Neighbourhood
        jewellers in Adyar, Anna Nagar, Velachery, and the west often compete on
        plain items. Compare two invoices the same day rather than chasing a
        0.3% spot move.
      </p>

      <h2>FAQ</h2>
      {BUYING_GOLD_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
