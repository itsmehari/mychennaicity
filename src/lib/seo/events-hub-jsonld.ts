import type { PublicEventRow } from "@/domains/events";
import { EVENTS_HUB_FAQ } from "@/content/events/events-hub-faq";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import {
  buildEventSchemaNode,
  buildEventsHubBreadcrumbNode,
} from "@/lib/seo/event-jsonld";

export function buildEventsHubJsonLdGraph(events: PublicEventRow[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}/chennai-local-events`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Chennai local events — concerts, comedy & markets",
      description:
        "Upcoming Chennai events: live music, stand-up comedy, exhibitions, and meetups across Mylapore, OMR, Porur, Egmore, and Greater Chennai.",
      isPartOf: { "@id": `${base}/#website` },
      inLanguage: "en-IN",
      about: CHENNAI_PLACE_GRAPH,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#eventlist` },
    },
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      url: pageUrl,
      name: "Chennai events calendar",
      isPartOf: { "@id": `${pageUrl}#webpage` },
      inLanguage: "en-IN",
    },
    buildEventsHubBreadcrumbNode(),
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#eventlist`,
      name: "Upcoming Chennai events",
      numberOfItems: events.length,
      itemListElement: events.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${base}/chennai-local-events/${e.slug}`,
        item: buildEventSchemaNode(e),
      })),
    },
  ];

  const faq = buildFaqPageJsonLdFromItems(EVENTS_HUB_FAQ);
  if (faq) {
    const { "@context": _c, ...faqNode } = faq as Record<string, unknown>;
    graph.push({ ...faqNode, "@id": `${pageUrl}#faq` });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
