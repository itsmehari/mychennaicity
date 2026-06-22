import type { ClassifiedListingRow } from "@/domains/classifieds";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_CLASSIFIEDS_HUB_PATH,
  chennaiClassifiedDetailPath,
} from "@/lib/routes/chennai-classifieds";

function clipText(s: string, max = 300): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function buildClassifiedAdJsonLd(listing: ClassifiedListingRow) {
  const base = getSiteUrl();
  const url = `${base}${chennaiClassifiedDetailPath(listing.slug)}`;
  const description = clipText(listing.body) || listing.title;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: listing.title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${base}/#website` },
    datePublished: listing.publishedAt?.toISOString(),
    dateModified: listing.updatedAt.toISOString(),
  };
}

export function buildClassifiedBreadcrumbJsonLd(slug: string, title: string) {
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
        name: "Chennai classifieds",
        item: `${base}${CHENNAI_CLASSIFIEDS_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${base}${chennaiClassifiedDetailPath(slug)}`,
      },
    ],
  };
}

export function buildClassifiedsHubJsonLd(listings: ClassifiedListingRow[]) {
  const base = getSiteUrl();
  const hubUrl = `${base}${CHENNAI_CLASSIFIEDS_HUB_PATH}`;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chennai classified ads",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}${chennaiClassifiedDetailPath(l.slug)}`,
      name: l.title,
    })),
  };

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Chennai classified ads",
    url: hubUrl,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${base}/#website` },
    mainEntity: itemList,
  };

  return { collectionPage, itemList };
}
