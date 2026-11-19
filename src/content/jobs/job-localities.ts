export type JobLocality = {
  slug: string;
  label: string;
  /** Area guide that should list these openings. Null when no guide owns the belt. */
  areaHubSlug: string | null;
  /** Lowercase substrings matched against the notice text. */
  tokens: string[];
  /** SQL ILIKE patterns. */
  patterns: string[];
  intro: string;
};

export const JOB_LOCALITIES: JobLocality[] = [
  {
    slug: "omr",
    label: "OMR",
    areaHubSlug: "omr-perungudi-sholinganallur",
    tokens: [
      "omr",
      "perungudi",
      "sholinganallur",
      "thoraipakkam",
      "navalur",
      "siruseri",
      "pallikaranai",
    ],
    patterns: [
      "%OMR%",
      "%Perungudi%",
      "%Sholinganallur%",
      "%Thoraipakkam%",
      "%Navalur%",
      "%Siruseri%",
      "%Pallikaranai%",
    ],
    intro:
      "OMR here means the Old Mahabalipuram Road belt from Perungudi and Thoraipakkam through Sholinganallur, Pallikaranai, Navalur, and Siruseri. This page lists Chennai notices that name one of those places. It is a slice of the city board, not a separate employer.",
  },
  {
    slug: "guindy",
    label: "Guindy",
    areaHubSlug: "saidapet-guindy-alandur",
    tokens: ["guindy", "alandur", "saidapet"],
    patterns: ["%Guindy%", "%Alandur%", "%Saidapet%"],
    intro:
      "Guindy, Saidapet, and Alandur sit on the southern industrial and office belt, around the estate, the Kathipara side, and the suburban rail stations. Openings appear here only when the notice itself names one of those places.",
  },
  {
    slug: "t-nagar",
    label: "T. Nagar",
    areaHubSlug: "kodambakkam-t-nagar",
    tokens: ["t. nagar", "t nagar", "tnagar", "thyagaraya"],
    patterns: ["%T. Nagar%", "%T Nagar%", "%Thyagaraya%"],
    intro:
      "T. Nagar is the Thyagaraya Nagar shopping and office grid in central Chennai. This list is limited to notices that name T. Nagar or Thyagaraya Nagar. Other Kodambakkam roles stay on the city board unless the notice says T. Nagar.",
  },
  {
    slug: "ambattur",
    label: "Ambattur",
    areaHubSlug: "ambattur-annanagar",
    tokens: ["ambattur"],
    patterns: ["%Ambattur%"],
    intro:
      "Ambattur is the north-west industrial estate and the neighbourhoods around it. A role is listed here when the employer’s notice names Ambattur. Anna Nagar openings have their own page.",
  },
  {
    slug: "velachery",
    label: "Velachery",
    areaHubSlug: null,
    tokens: ["velachery"],
    patterns: ["%Velachery%"],
    intro:
      "Velachery is the south Chennai residential and retail belt around the lake, Vijayanagar, and the 100 Feet Road. This page shows notices that name Velachery. Roles that only say Chennai stay on the city board.",
  },
  {
    slug: "anna-nagar",
    label: "Anna Nagar",
    areaHubSlug: "ambattur-annanagar",
    tokens: ["anna nagar"],
    patterns: ["%Anna Nagar%"],
    intro:
      "Anna Nagar is the planned grid west of Kilpauk, including the tower and the 2nd Avenue shops. Notices land here only when they name Anna Nagar. Ambattur estate roles are listed separately.",
  },
  {
    slug: "tambaram",
    label: "Tambaram",
    areaHubSlug: null,
    tokens: ["tambaram", "chromepet"],
    patterns: ["%Tambaram%", "%Chromepet%", "%Chrompet%"],
    intro:
      "Tambaram and Chromepet are the southern rail suburbs on the GST Road side. This page lists notices that name Tambaram or Chromepet. It does not cover every south Chennai suburb.",
  },
  {
    slug: "adyar",
    label: "Adyar",
    areaHubSlug: "adyar-thiruvanmiyur",
    tokens: ["adyar", "thiruvanmiyur"],
    patterns: ["%Adyar%", "%Thiruvanmiyur%"],
    intro:
      "Adyar and Thiruvanmiyur run along the south-east coast, from the estuary and Gandhi Nagar toward the beach. A notice is included when it names Adyar or Thiruvanmiyur.",
  },
  {
    slug: "porur",
    label: "Porur",
    areaHubSlug: "valasaravakkam-porur",
    tokens: ["porur", "maduravoyal", "valasaravakkam"],
    patterns: ["%Porur%", "%Maduravoyal%", "%Valasaravakkam%"],
    intro:
      "Porur, Maduravoyal, and Valasaravakkam sit on the west Chennai junction of Mount-Poonamallee Road and the bypass. Notices appear here when they name one of those three places.",
  },
];

export function jobLocalityBySlug(slug: string): JobLocality | undefined {
  return JOB_LOCALITIES.find((item) => item.slug === slug);
}

export function localitiesForAreaHub(areaHubSlug: string): JobLocality[] {
  return JOB_LOCALITIES.filter((item) => item.areaHubSlug === areaHubSlug);
}

export function patternsForAreaHub(areaHubSlug: string): string[] {
  return localitiesForAreaHub(areaHubSlug).flatMap((item) => item.patterns);
}

export function textMatchesLocality(locality: JobLocality, text: string): boolean {
  const hay = text.toLowerCase();
  return locality.tokens.some((token) => hay.includes(token));
}

export function localityForText(text: string): JobLocality | undefined {
  return JOB_LOCALITIES.find((item) => textMatchesLocality(item, text));
}
