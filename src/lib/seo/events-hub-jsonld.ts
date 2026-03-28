import type { PublicEventRow } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";

export function buildEventsHubJsonLd(events: PublicEventRow[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}/chennai-local-events`;
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Chennai local events",
    isPartOf: { "@id": `${base}/#website` },
    inLanguage: "en-IN",
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: events.length,
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.title,
      url: `${base}/chennai-local-events/${e.slug}`,
    })),
  };
  return { collectionPage, itemList };
}
