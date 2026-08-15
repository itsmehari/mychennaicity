import type { Metadata } from "next";
import Link from "next/link";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { GoldRateAnswerBox, buildGoldRateMetaDescription } from "@/components/gold-rate/gold-rate-answer-box";
import { GoldRateStaleNotice } from "@/components/gold-rate/gold-rate-stale-notice";
import { GoldRateCalculators } from "@/components/gold-rate/gold-rate-calculators";
import { GoldRateCards } from "@/components/gold-rate/gold-rate-cards";
import { GoldRateEditorialSections } from "@/components/gold-rate/gold-rate-editorial";
import { GoldRateTamilSnippet } from "@/components/gold-rate/gold-rate-tamil-snippet";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { CHENNAI_GOLD_RATE_FAQ } from "@/content/gold-rate/chennai-gold-rate-faq";
import { getSiteUrl } from "@/lib/env";
import { loadChennaiGoldRateHubData } from "@/lib/gold-rate/load-hub-data";
import { CHENNAI_GOLD_RATE_HUB_PATH } from "@/lib/routes/chennai-gold-rate";
import { buildGoldRateHubJsonLd } from "@/lib/seo/gold-rate-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai gold rate today";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { snapshot } = await loadChennaiGoldRateHubData();
  const description = buildGoldRateMetaDescription(snapshot);
  const url = `${getSiteUrl()}${CHENNAI_GOLD_RATE_HUB_PATH}`;

  return {
    title: titleSegment,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(titleSegment),
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function ChennaiGoldRatePage() {
  const { snapshot, previous } = await loadChennaiGoldRateHubData();
  const description = buildGoldRateMetaDescription(snapshot);
  const jsonLd = buildGoldRateHubJsonLd(snapshot, CHENNAI_GOLD_RATE_FAQ, description);

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai gold rate" },
        ]}
      />

      <GoldRateHubHero snapshot={snapshot} />

      <div className="mt-6">
        <GoldRateAnswerBox snapshot={snapshot} />
        <GoldRateStaleNotice snapshot={snapshot} />
        <GoldRateTamilSnippet />
      </div>

      <HubCommunityStrip businessVariant="default" className="mt-6" />

      <div className="mt-10 space-y-12">
        <GoldRateCards snapshot={snapshot} previous={previous} />
        <p className="text-sm text-[var(--muted)]">
          <Link href="/chennai-gold-rate/history" className="font-semibold text-[var(--accent)] hover:underline">
            Rate history chart
          </Link>
          {" · "}
          <Link href="/guides/buying-gold-in-chennai" className="font-semibold text-[var(--accent)] hover:underline">
            Buying gold in Chennai
          </Link>
        </p>
        <GoldRateCalculators snapshot={snapshot} />
        <GoldRateEditorialSections />
      </div>

      <AdvertisePanel variant="directory" layout="section" className="mt-10" />

      <InteriorCrossNav />

      {jsonLd.breadcrumb ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.dataset) }}
      />
      {jsonLd.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
        />
      ) : null}
    </div>
  );
}
