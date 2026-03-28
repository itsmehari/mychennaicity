/** Shared Place / region graph for geo JSON-LD (Chennai, Tamil Nadu, India). */
export const CHENNAI_PLACE_GRAPH = {
  "@type": "Place" as const,
  name: "Chennai",
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  containedInPlace: {
    "@type": "Place" as const,
    name: "Tamil Nadu",
    containedInPlace: {
      "@type": "Country" as const,
      name: "India",
    },
  },
};
