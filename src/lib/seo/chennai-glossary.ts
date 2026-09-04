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
  {
    term: "CMDA (Chennai Metropolitan Development Authority)",
    slug: "cmda",
    definition:
      "The planning authority for the Chennai Metropolitan Area — master plans, land-use, and many building-permission questions. It is not Greater Chennai Corporation; ward complaints still go to GCC.",
  },
  {
    term: "TANGEDCO / TNPDCL (electricity)",
    slug: "tangedco",
    definition:
      "The names residents still use for Tamil Nadu’s electricity distribution utilities. Bills and outage desks may show TANGEDCO, TNPCL, or TNPDCL depending on the year of the notice — verify the helpline printed on your current bill.",
  },
  {
    term: "CMWSSB / Metro Water",
    slug: "cmwssb",
    definition:
      "Chennai Metropolitan Water Supply and Sewerage Board — piped water and sewerage for much of the city. Supply-day patterns are not the same as GCC storm-water drains; check Metro Water notices for your depot, not only the Corporation app.",
  },
  {
    term: "Minnagam (power outage desk)",
    slug: "minnagam",
    definition:
      "The widely used Tamil Nadu electricity outage / complaint helpline (94987 94987 as printed on many TANGEDCO consumer notices). Confirm the number on your latest official bill or utility page before you call — this glossary is not the utility.",
  },
  {
    term: "GCC ward (vs zone vs PIN)",
    slug: "gcc-ward",
    definition:
      "The civic unit GCC uses for many complaints and elections. A PIN code is postal; a zone is an administrative grouping of wards. Apartment addresses often span ward boundaries — look up the ward number before you file.",
  },
  {
    term: "MTC (Metropolitan Transport Corporation)",
    slug: "mtc",
    definition:
      "Chennai’s city bus operator. Route numbers, last-mile stops, and festival diversions change by official MTC / traffic notice — screenshot forwards are not a timetable.",
  },
  {
    term: "ECR (East Coast Road)",
    slug: "ecr",
    definition:
      "The coastal highway from Chennai toward Mamallapuram and beyond. Weekend beach and tourism traffic on ECR is a different jam pattern from OMR’s IT-corridor peaks.",
  },
  {
    term: "TIDEL Park",
    slug: "tidel",
    definition:
      "The well-known IT campus at Taramani / Guindy-edge Chennai — a landmark for tech commuting, not a GCC ward name. Neighbouring OMR parks are a different corridor; do not treat “TIDEL” as a substitute for your office address on forms.",
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
