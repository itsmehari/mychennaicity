import type { DirectoryEntryView } from "@/domains/directory";
import { chennaiZones } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { normalizeAreaHubSlug } from "@/lib/news-area-hint";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { orgSameAsUrls } from "@/lib/seo/site-defaults";
import { directoryDetailPath } from "@/lib/routes/directory";
import { directoryTypeLabel } from "@/lib/directory/type-labels";

function stripMarkdownLite(s: string): string {
  return s
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);
}

export function buildDirectoryEntryJsonLd(entry: DirectoryEntryView) {
  const base = getSiteUrl();
  const url = `${base}${directoryDetailPath(entry.type, entry.slug)}`;
  const desc =
    entry.meta.summary?.trim() ||
    entry.meta.dek?.trim() ||
    stripMarkdownLite(entry.meta.reportBody ?? entry.body ?? "");
  const image = entry.meta.heroImageUrl?.trim()
    ? entry.meta.heroImageUrl.startsWith("/")
      ? `${base}${entry.meta.heroImageUrl}`
      : entry.meta.heroImageUrl
    : `${base}/opengraph-image`;
  const sameAs = orgSameAsUrls();

  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    name: "mychennaicity.in",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
  if (sameAs.length) publisher.sameAs = sameAs;

  const hub = normalizeAreaHubSlug(entry.meta.areaHubSlug);
  const zone = hub ? chennaiZones.find((z) => z.slug === hub) : undefined;
  const locality =
    entry.localityLabel?.trim() ||
    zone?.label ||
    "Chennai";

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": entry.type === "restaurant" ? "FoodEstablishment" : "LocalBusiness",
    name: entry.name,
    description: desc,
    url,
    image,
    telephone: entry.phone?.trim() || undefined,
    address: entry.address?.trim()
      ? {
          "@type": "PostalAddress",
          streetAddress: entry.address,
          addressLocality: locality,
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: locality,
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
    containedInPlace: CHENNAI_PLACE_GRAPH,
    additionalType: directoryTypeLabel(entry.type),
  };

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.name,
    description: desc,
    url,
    image,
    inLanguage: "en-IN",
    dateModified: entry.updatedAt.toISOString(),
    isPartOf: { "@type": "WebSite", name: "mychennaicity.in", url: base },
    publisher,
    about: business,
    mainEntity: business,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function buildDirectoryBreadcrumbJsonLd(
  entry: DirectoryEntryView,
) {
  const base = getSiteUrl();
  return {
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
        name: "Directory",
        item: `${base}/directory`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.name,
        item: `${base}${directoryDetailPath(entry.type, entry.slug)}`,
      },
    ],
  };
}
