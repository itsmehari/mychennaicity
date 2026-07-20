export const CHENNAI_ZONES_SLUG =
  "chennai-corporation-zones-current-15-proposed-20-map-explained";

export const CHENNAI_ZONES_H1 =
  "Chennai’s Zone Map Is Changing: Current 15 Zones, Proposed 20 Zones and the Old 23-Zone Map Explained";

export const CHENNAI_ZONES_SEO_TITLE =
  "Chennai Corporation Zones Explained: Current 15 and Proposed 20";

export const CHENNAI_ZONES_META_DESCRIPTION =
  "A detailed guide to Chennai’s current 15 Corporation zones, the 2022 proposal for 23 zones, the approved 20-zone restructuring plan, ward numbers, civic impact and zone-finder tools.";

export const CHENNAI_ZONES_HERO_IMAGE =
  "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg";

export const CHENNAI_ZONES_STATUS_RIBBON =
  "CURRENT SYSTEM: 15 ZONES | FUTURE PLAN: 20 ZONES | 23-ZONE MAP: HISTORICAL 2022 PROPOSAL";

export const CHENNAI_ZONES_VERIFIED_ON = "14 July 2026";

export const zonesFactStrip = [
  "Operational: 15 zones",
  "Wards: 200",
  "Approved future: 20 zones",
  "2022 concept: 23 zones",
] as const;

export type CurrentZone = {
  number: number;
  name: string;
  wards: string;
  region: "North" | "Central" | "South";
  hubSlug: string;
  localities: string[];
};

export const current15Zones: CurrentZone[] = [
  {
    number: 1,
    name: "Thiruvottiyur",
    wards: "1–14",
    region: "North",
    hubSlug: "tiruvottiyur-manali-belt",
    localities: ["Thiruvottiyur", "Tiruvottiyur", "Ennore"],
  },
  {
    number: 2,
    name: "Manali",
    wards: "15–21",
    region: "North",
    hubSlug: "tiruvottiyur-manali-belt",
    localities: ["Manali", "Kathivakkam"],
  },
  {
    number: 3,
    name: "Madhavaram",
    wards: "22–33",
    region: "North",
    hubSlug: "madhavaram-madhavaram",
    localities: ["Madhavaram", "Puzhal"],
  },
  {
    number: 4,
    name: "Tondiarpet",
    wards: "34–48",
    region: "North",
    hubSlug: "royapuram-tondiarpet",
    localities: ["Tondiarpet", "Washermenpet", "Old Washermenpet"],
  },
  {
    number: 5,
    name: "Royapuram",
    wards: "49–63",
    region: "North",
    hubSlug: "royapuram-tondiarpet",
    localities: ["Royapuram", "Basin Bridge"],
  },
  {
    number: 6,
    name: "Thiru-Vi-Ka Nagar",
    wards: "64–78",
    region: "North",
    hubSlug: "royapuram-tondiarpet",
    localities: ["Perambur", "Kolathur", "Thiru-Vi-Ka Nagar", "Ayanavaram"],
  },
  {
    number: 7,
    name: "Ambattur",
    wards: "79–93",
    region: "Central",
    hubSlug: "ambattur-annanagar",
    localities: ["Ambattur", "Mogappair", "Padi"],
  },
  {
    number: 8,
    name: "Anna Nagar",
    wards: "94–108",
    region: "Central",
    hubSlug: "ambattur-annanagar",
    localities: ["Anna Nagar", "Kilpauk", "Shenoy Nagar"],
  },
  {
    number: 9,
    name: "Teynampet",
    wards: "109–126",
    region: "Central",
    hubSlug: "teynampet-nungambakkam",
    localities: ["Teynampet", "Nungambakkam", "Egmore", "Triplicane"],
  },
  {
    number: 10,
    name: "Kodambakkam",
    wards: "127–142",
    region: "Central",
    hubSlug: "kodambakkam-t-nagar",
    localities: ["Kodambakkam", "T. Nagar", "West Mambalam", "Saidapet"],
  },
  {
    number: 11,
    name: "Valasaravakkam",
    wards: "143–155",
    region: "Central",
    hubSlug: "valasaravakkam-porur",
    localities: ["Valasaravakkam", "Porur", "Virugambakkam", "Maduravoyal"],
  },
  {
    number: 12,
    name: "Alandur",
    wards: "156–167",
    region: "South",
    hubSlug: "saidapet-guindy-alandur",
    localities: ["Alandur", "Guindy", "St. Thomas Mount", "Adambakkam"],
  },
  {
    number: 13,
    name: "Adyar",
    wards: "170–182",
    region: "South",
    hubSlug: "adyar-thiruvanmiyur",
    localities: ["Adyar", "Besant Nagar", "Thiruvanmiyur", "Raja Annamalai Puram"],
  },
  {
    number: 14,
    name: "Perungudi",
    wards: "168, 169 and 183–191",
    region: "South",
    hubSlug: "omr-perungudi-sholinganallur",
    localities: ["Perungudi", "Velachery", "Pallikaranai", "Thoraipakkam"],
  },
  {
    number: 15,
    name: "Sholinganallur",
    wards: "192–200",
    region: "South",
    hubSlug: "omr-perungudi-sholinganallur",
    localities: [
      "Sholinganallur",
      "Neelankarai",
      "Injambakkam",
      "Semmancheri",
      "Uthandi",
      "Karapakkam",
    ],
  },
];

/** Expand ward labels like "1–14" or "168, 169 and 183–191" into numbers. */
export function wardNumbersForZone(wards: string): number[] {
  const nums = new Set<number>();
  const rangeRe = /(\d+)\s*[–-]\s*(\d+)/g;
  let m: RegExpExecArray | null;
  let remainder = wards;
  while ((m = rangeRe.exec(wards)) !== null) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    for (let i = Math.min(a, b); i <= Math.max(a, b); i++) nums.add(i);
    remainder = remainder.replace(m[0], " ");
  }
  for (const s of remainder.match(/\d+/g) ?? []) {
    nums.add(Number(s));
  }
  return [...nums].sort((a, b) => a - b);
}

export function findZoneByWard(ward: number): CurrentZone | undefined {
  return current15Zones.find((z) => wardNumbersForZone(z.wards).includes(ward));
}

export const mapComparisonTabs = [
  {
    id: "15",
    label: "Current — 15 Zones",
    status: "Current and operational",
    statusTone: "live" as const,
    summary:
      "The arrangement still displayed by Greater Chennai Corporation: 15 zones, 200 wards, three regions (North, Central, South), and one ward committee per zone.",
    bullets: [
      "GCC ward-map selector lists Zones 1–15 (Thiruvottiyur to Sholinganallur)",
      "Chennai district administration publishes the same ward allocation",
      "Use this map for zonal offices, councillors and civic complaints today",
    ],
  },
  {
    id: "20",
    label: "Approved Future Plan — 20 Zones",
    status: "Approved/planned, not operational",
    statusTone: "planned" as const,
    summary:
      "Announced in February 2025 to improve resource allocation, staffing balance and service delivery. Mapped, but public systems have not switched over as of July 2026.",
    bullets: [
      "Projected city population underpinning the map: about 79.5 lakh",
      "About 13.8 lakh properties considered in the reported dataset",
      "Implementation publicly linked to the end of the present council tenure / around 2027",
    ],
  },
  {
    id: "23",
    label: "Historical 2022 Proposal — 23 Zones",
    status: "Superseded historical proposal",
    statusTone: "historical" as const,
    summary:
      "A September 2022 media concept that would have aligned Corporation zones more closely with Assembly constituencies. It never became Chennai’s operational system.",
    bullets: [
      "Eight zones in North, eight in Central, seven in South (as reported)",
      "Sholinganallur Assembly seat reportedly split across two Corporation zones",
      "Different from the later 20-zone government plan — do not use for current addresses",
    ],
  },
] as const;

export const zonesTimeline = [
  {
    id: "1688",
    period: "1688",
    title: "Corporation of Madras established",
    detail:
      "Recognised as India’s oldest municipal institution; modern zone structure came centuries later.",
    tag: "Boundary expansion" as const,
  },
  {
    id: "1978",
    period: "1978",
    title: "City boundary of ~174 sq. km fixed",
    detail: "Pre-expansion Chennai Corporation footprint before suburb amalgamation.",
    tag: "Boundary expansion" as const,
  },
  {
    id: "2009-2010",
    period: "2009–2010",
    title: "Major boundary expansion ordered",
    detail:
      "Nine municipalities, eight town panchayats and 25 village panchayats begin amalgamation into GCC (~426 sq. km).",
    tag: "Boundary expansion" as const,
  },
  {
    id: "2011",
    period: "2011",
    title: "200 wards and 15 zones created",
    detail:
      "Expanded Corporation reorganised into today’s operational 15-zone / 200-ward framework.",
    tag: "Administrative reorganisation" as const,
  },
  {
    id: "2022",
    period: "2022",
    title: "23-zone concept reported",
    detail:
      "Ministerial announcement and detailed media map proposed reorganising Chennai into 23 zones aligned with Assembly seats.",
    tag: "Proposal or policy decision" as const,
  },
  {
    id: "2025",
    period: "Feb–Mar 2025",
    title: "20-zone structure announced and mapped",
    detail:
      "State announces increase from 15 to 20 zones for more equitable administration and staffing.",
    tag: "Proposal or policy decision" as const,
  },
  {
    id: "2025-04",
    period: "April 2025",
    title: "Mayor links implementation to 2027",
    detail:
      "Mayor R. Priya said the change would follow the present council tenure, in connection with 2027.",
    tag: "Proposal or policy decision" as const,
  },
  {
    id: "2026-05",
    period: "May 2026",
    title: "Commissioner: government policy decision",
    detail:
      "GCC Commissioner described increasing zones as a policy decision of the government.",
    tag: "Proposal or policy decision" as const,
  },
  {
    id: "2026-07",
    period: "July 2026",
    title: "Public systems still on 15 zones",
    detail:
      "Official GCC ward map, councillor directories and zonal services continue under 15 zones and 200 wards.",
    tag: "Administrative reorganisation" as const,
  },
] as const;

export const civicIssueRoutes = [
  {
    id: "pothole",
    label: "Pothole / road repair",
    route: [
      "Resident",
      "Ward / locality",
      "1913 or councillor",
      "Zonal engineering",
      "Ward committee / zonal office",
      "GCC Council (if escalated)",
    ],
  },
  {
    id: "garbage",
    label: "Garbage / sanitation",
    route: [
      "Resident",
      "Ward route / locality",
      "1913 complaint",
      "Zonal sanitary / conservancy",
      "Zonal office",
      "SWM contracts / head office",
    ],
  },
  {
    id: "streetlight",
    label: "Streetlight",
    route: [
      "Resident",
      "Ward",
      "1913 / councillor",
      "Zonal electrical / engineering",
      "Zonal office",
      "Asset inventory update",
    ],
  },
  {
    id: "drain",
    label: "Stormwater drain / flooding",
    route: [
      "Resident",
      "Local catchments",
      "1913 / disaster desk",
      "Zonal SWD engineering",
      "Zonal office + DEOC if needed",
      "Macro-drain coordination",
    ],
  },
  {
    id: "tax",
    label: "Property tax query",
    route: [
      "Owner / agent",
      "Assessment no. / ward",
      "Zonal revenue office",
      "Online tax portal",
      "Correction / appeal process",
      "GCC revenue wing",
    ],
  },
  {
    id: "mosquito",
    label: "Mosquito / public health",
    route: [
      "Resident",
      "Locality / ward",
      "1913 / public-health desk",
      "Zonal health team",
      "Ward / Area Sabha escalation",
      "City vector-control programme",
    ],
  },
] as const;

export const proposed20Extremes = {
  disclaimer:
    "Reported figures from the proposed 20-zone map—not current operational zone statistics.",
  population: {
    high: { zone: "Proposed Zone 5", value: 643297, note: "Parts of Kolathur, Perambur, Thiru-Vi-Ka Nagar" },
    low: { zone: "Proposed Zone 19", value: 157194, note: "Parts of Alandur and Sholinganallur" },
  },
  areaKm2: {
    high: { zone: "Proposed Zone 1", value: 54.4 },
    low: { zone: "Proposed Zone 10", value: 8.1 },
  },
  wards: {
    high: { zone: "Proposed Zone 1", value: 19 },
    low: { zone: "Proposed Zone 19", value: 6 },
  },
  properties: {
    high: { zone: "Proposed Zone 17", value: 96133, note: "Parts of Mylapore, Saidapet, Velachery" },
    mid: { zone: "Proposed Zone 12", value: 87634, note: "Parts of T. Nagar and Virugambakkam" },
  },
  totals: {
    projectedPopulation: 7953147,
    properties: 1382848,
    avgPopulation: 397657,
    avgProperties: 69142,
  },
} as const;

export const workloadRadarAxes = [
  "Population density",
  "Geographic area",
  "Property count",
  "Road / street load",
  "Waste burden",
  "Flood exposure",
  "Commercial activity",
  "Growth pressure",
] as const;

/** Two illustrative profiles — not official GCC scores. */
export const workloadRadarProfiles = {
  compactDense: [0.92, 0.28, 0.88, 0.7, 0.75, 0.45, 0.9, 0.55],
  largePeriphery: [0.4, 0.95, 0.5, 0.85, 0.65, 0.8, 0.35, 0.9],
} as const;

export const jurisdictionCards = [
  {
    id: "gcc",
    title: "GCC zone and ward",
    source: "Greater Chennai Corporation ward map / Know Your Zone",
    note: "Authoritative for civic complaints and zonal services today (15 zones).",
  },
  {
    id: "councillor",
    title: "Councillor",
    source: "GCC councillor directory by zone and ward",
    note: "Elected for the ward, not automatically identical to Assembly MLA.",
  },
  {
    id: "assembly",
    title: "Assembly constituency",
    source: "Election Commission / state delimitation",
    note: "Separate from Corporation zone boundaries.",
  },
  {
    id: "ls",
    title: "Parliamentary constituency",
    source: "Election Commission",
    note: "Does not change merely because a Corporation zone is redrawn.",
  },
  {
    id: "police",
    title: "Police station",
    source: "Greater Chennai Police / local station maps",
    note: "Criminal jurisdiction is independent of GCC zones.",
  },
  {
    id: "metro-water",
    title: "Metro Water area",
    source: "CMWSSB depot / distribution maps",
    note: "Water operations often cut across Corporation zone lines.",
  },
  {
    id: "tangedco",
    title: "Tangedco section",
    source: "Tangedco distribution section maps",
    note: "Electricity sections are not Corporation wards.",
  },
  {
    id: "taluk",
    title: "Revenue taluk",
    source: "Revenue department / Chennai district",
    note: "Land records follow revenue hierarchy, not GCC zones.",
  },
  {
    id: "pin",
    title: "PIN code",
    source: "India Post",
    note: "Postal delivery areas do not auto-update with zone maps.",
  },
  {
    id: "planning",
    title: "Planning authority",
    source: "CMDA / GCC depending on function",
    note: "Planning classification is distinct from civic zone administration.",
  },
] as const;

export const zonesFaq = [
  {
    question: "Does Chennai currently have 23 Corporation zones?",
    answer:
      "No. The 23-zone map belongs to a proposal reported in 2022. It is not the present operational map.",
  },
  {
    question: "Does Chennai currently have 20 operational zones?",
    answer:
      "Official GCC public systems continue to identify 15 zones. The 20-zone arrangement is an approved restructuring plan, but available evidence does not show that it has replaced the current system as of 14 July 2026.",
  },
  {
    question: "How many Corporation wards does Chennai have?",
    answer: "The current Greater Chennai Corporation has 200 wards or divisions.",
  },
  {
    question: "Is a ward the same as a zone?",
    answer:
      "No. A ward is the smaller electoral and civic division represented by a councillor. A zone contains several wards and operates as a wards-committee area.",
  },
  {
    question: "Is a Corporation zone the same as an Assembly constituency?",
    answer:
      "No. Assembly constituencies are used to elect members of the Tamil Nadu Legislative Assembly. Corporation zones are municipal administrative areas.",
  },
  {
    question: "Will my councillor change?",
    answer:
      "A zone-only reorganisation does not necessarily change the councillor elected for a ward. A ward-delimitation or election-related change could affect the relevant boundaries or representation.",
  },
  {
    question: "Will my property tax automatically rise if my zone changes?",
    answer:
      "Not necessarily. Tax calculation depends on the applicable rules, property characteristics, usage, location and street classification. A change in zone number alone is not sufficient evidence of a tax increase.",
  },
  {
    question: "Will my PIN code change?",
    answer:
      "Not automatically. PIN-code boundaries are maintained by the postal system, not the Greater Chennai Corporation.",
  },
  {
    question: "Where should I complain now?",
    answer:
      "Use the current zone and ward shown in GCC’s official service. Chennai’s civic complaint number displayed by GCC is 1913.",
  },
  {
    question: "When will the 20-zone system start?",
    answer:
      "The Mayor stated in April 2025 that implementation would follow the present council’s tenure and be connected to 2027. In May 2026, the Commissioner said it remained a policy decision of the government. Residents should wait for a formal operational notification and updated GCC systems.",
  },
] as const;

export const zonesToc = [
  { id: "status", label: "Current status" },
  { id: "why-zones", label: "Why zones matter" },
  { id: "three-maps", label: "Three maps compared" },
  { id: "find-zone", label: "Find your current zone" },
  { id: "timeline", label: "How Chennai got to 15 zones" },
  { id: "uneven", label: "Why zones are uneven" },
  { id: "proposed-20", label: "Proposed 20-zone data" },
  { id: "what-23", label: "What happened to 23 zones" },
  { id: "operational", label: "Is 20 zones live?" },
  { id: "what-changes", label: "What may change" },
  { id: "jurisdictions", label: "Other Chennai boundaries" },
  { id: "checklist", label: "Resident checklist" },
  { id: "faq", label: "FAQ" },
  { id: "conclusion", label: "Conclusion" },
] as const;

export const gccOfficialLinks = {
  wardMap: "https://chennaicorporation.gov.in/",
  complaint: "1913",
} as const;
