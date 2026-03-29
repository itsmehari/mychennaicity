import type { ChennaiZone } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";

export function buildAreaHubJsonLd(zone: ChennaiZone) {
  const base = getSiteUrl();
  const pageUrl = `${base}/areas/${zone.slug}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${zone.label} — Chennai area hub`,
    description: zone.blurb,
    isPartOf: { "@id": `${base}/#website` },
    about: {
      "@type": "Place",
      name: zone.label,
      description: zone.blurb,
      containedInPlace: CHENNAI_PLACE_GRAPH,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas",
        item: `${base}/#areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: zone.label,
        item: pageUrl,
      },
    ],
  };

  const shortcuts = [
    { href: "/chennai-local-news", name: "Chennai local news" },
    { href: "/chennai-local-events", name: "Chennai local events" },
    { href: "/chennai-jobs", name: "Jobs in Chennai" },
    { href: "/directory", name: "Directory" },
  ];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Shortcuts from ${zone.label} hub`,
    numberOfItems: shortcuts.length,
    itemListElement: shortcuts.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${base}${s.href}`,
    })),
  };

  return { webPage, breadcrumbs, itemList };
}
