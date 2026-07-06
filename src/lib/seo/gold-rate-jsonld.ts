import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GOLD_RATE_HUB_PATH } from "@/lib/routes/chennai-gold-rate";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

export function buildGoldRateBreadcrumbJsonLd() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chennai gold rate",
        item: `${base}${CHENNAI_GOLD_RATE_HUB_PATH}`,
      },
    ],
  };
}

export function buildGoldRateWebPageJsonLd(
  snapshot: GoldRateSnapshotView,
  description: string,
) {
  const base = getSiteUrl();
  const url = `${base}${CHENNAI_GOLD_RATE_HUB_PATH}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: "Chennai gold rate today",
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${base}/#website` },
    dateModified: snapshot.fetchedAt.toISOString(),
    about: {
      "@type": "Place",
      name: "Chennai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
  };
}

export function buildGoldRateDatasetJsonLd(snapshot: GoldRateSnapshotView) {
  const base = getSiteUrl();
  const url = `${base}${CHENNAI_GOLD_RATE_HUB_PATH}`;

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Chennai gold and silver rates — ${snapshot.rateDate}`,
    description:
      "Daily indicative gold (24K, 22K, 18K) and silver rates per gram for Chennai, Tamil Nadu.",
    url,
    inLanguage: "en-IN",
    temporalCoverage: snapshot.rateDate,
    dateModified: snapshot.fetchedAt.toISOString(),
    creator: {
      "@type": "Organization",
      name: "mychennaicity.in",
      url: base,
    },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: url,
    },
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "24K gold per gram (INR)",
        value: snapshot.rate24kPerGram,
        unitCode: "INR",
      },
      {
        "@type": "PropertyValue",
        name: "22K gold per gram (INR)",
        value: snapshot.rate22kPerGram,
        unitCode: "INR",
      },
      {
        "@type": "PropertyValue",
        name: "18K gold per gram (INR)",
        value: snapshot.rate18kPerGram,
        unitCode: "INR",
      },
      ...(snapshot.silverPerGram != null
        ? [
            {
              "@type": "PropertyValue",
              name: "Silver per gram (INR)",
              value: snapshot.silverPerGram,
              unitCode: "INR",
            },
          ]
        : []),
    ],
  };
}

export function buildGoldRateHubJsonLd(
  snapshot: GoldRateSnapshotView,
  faq: FaqItem[],
  description: string,
) {
  const pageUrl = `${getSiteUrl()}${CHENNAI_GOLD_RATE_HUB_PATH}`;
  return {
    breadcrumb: buildGoldRateBreadcrumbJsonLd(),
    webPage: buildGoldRateWebPageJsonLd(snapshot, description),
    dataset: buildGoldRateDatasetJsonLd(snapshot),
    faq: buildFaqPageJsonLdFromItems(faq, {
      pageUrl,
      fragment: "faq",
    }),
  };
}
