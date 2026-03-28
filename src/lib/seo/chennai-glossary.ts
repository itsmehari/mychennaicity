/** Editorial glossary entries; only set sameAs when URLs are verified. */

export type GlossaryEntry = {
  term: string;
  slug: string;
  definition: string;
  /** Wikipedia / Wikidata etc. — omit if not verified. */
  sameAs?: string[];
};

export const CHENNAI_GLOSSARY: GlossaryEntry[] = [
  {
    term: "GCC (Greater Chennai Corporation)",
    slug: "gcc",
    definition:
      "The Greater Chennai Corporation is the civic body governing the core Chennai city limits. Residents use it for property tax, waste services, road cuts, and storm-water complaints — always cross-check ward numbers with official GCC notifications.",
    sameAs: [
      "https://en.wikipedia.org/wiki/Greater_Chennai_Corporation",
      "https://www.wikidata.org/wiki/Q3520047",
    ],
  },
  {
    term: "Greater Chennai",
    slug: "greater-chennai",
    definition:
      "Editorial shorthand for the continuous urban region we cover — typically Chennai Corporation limits plus key suburbs and corridors (OMR, GST Road, parts of Kanchipuram/Tiruvallur adjacency) depending on the story. It is not a single legal boundary.",
  },
  {
    term: "OMR (Old Mahabalipuram Road)",
    slug: "omr",
    definition:
      "The IT and residential corridor from Madhya Kailash toward Mahabalipuram. Traffic, metro construction, and lake catchments here often differ from core-city GCC narratives.",
    sameAs: ["https://en.wikipedia.org/wiki/State_Highway_49A_(Tamil_Nadu)"],
  },
  {
    term: "CMRL (Chennai Metro Rail Limited)",
    slug: "cmrl",
    definition:
      "Operates Chennai Metro. Service changes, station access, and construction diversions are announced by CMRL and city traffic police — verify before commuting.",
    sameAs: [
      "https://en.wikipedia.org/wiki/Chennai_Metro",
      "https://www.wikidata.org/wiki/Q1070105",
    ],
  },
  {
    term: "GCC zone (planning reference)",
    slug: "gcc-zone",
    definition:
      "GCC sometimes groups wards into numbered zones for administration. Zone numbers in press releases may not match older resident mental maps — confirm against GCC ward lookup tools when filing complaints.",
  },
];

export function buildGlossaryDefinedTermSetJsonLd(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Chennai & GCC glossary",
    url: `${base}/glossary`,
    hasDefinedTerm: CHENNAI_GLOSSARY.map((e) => {
      const term: Record<string, unknown> = {
        "@type": "DefinedTerm",
        name: e.term,
        description: e.definition,
        inDefinedTermSet: { "@id": `${base}/glossary#glossary` },
      };
      if (e.sameAs?.length) term.sameAs = e.sameAs;
      return term;
    }),
  };
}
