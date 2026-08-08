import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import {
  orgPostalAddressJsonLd,
  orgSameAsUrls,
} from "@/lib/seo/site-defaults";

export function HomeJsonLd() {
  const base = getSiteUrl();
  const sameAs = orgSameAsUrls();
  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${base}/#org`,
    name: "mychennaicity.in",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
  if (sameAs.length) org.sameAs = sameAs;
  const address = orgPostalAddressJsonLd();
  if (address) org.address = address;

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "mychennaicity.in",
        description:
          "Chennai local news, jobs, events, directory, and neighbourhood pages for Greater Chennai.",
        publisher: { "@id": `${base}/#org` },
        inLanguage: "en-IN",
        about: CHENNAI_PLACE_GRAPH,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        ...org,
        areaServed: CHENNAI_PLACE_GRAPH,
        description:
          "Independent Chennai local publication covering Greater Chennai news, jobs, events, and neighbourhood guides.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
