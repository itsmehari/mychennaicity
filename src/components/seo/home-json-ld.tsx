import { getSiteUrl } from "@/lib/env";
import { orgSameAsUrls } from "@/lib/seo/site-defaults";

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

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "mychennaicity.in",
        description:
          "Greater Chennai local news, directory, jobs, events, and neighbourhood hubs.",
        publisher: { "@id": `${base}/#org` },
        inLanguage: "en-IN",
      },
      org,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
