/**
 * Editorial locality catalog + partial ward→locality overrides.
 * Extend `WARD_LOCALITY_OVERRIDE` as you verify ward lists against GCC.
 */

import type { LocalityRecord } from "./types";

/** Ward number → locality id (sparse; unlisted wards fall back to zone-level labels in UI). */
export const WARD_LOCALITY_OVERRIDE: Record<number, string> = {
  119: "t-nagar",
  132: "kodambakkam",
  174: "adyar",
  189: "perungudi",
  200: "sholinganallur",
  37: "tondiarpet",
  60: "royapuram",
  7: "tiruvottiyur",
  26: "madhavaram",
  86: "ambattur",
  101: "anna-nagar",
  147: "porur",
  157: "guindy",
  16: "manali",
  17: "manali",
  18: "manali",
  /** Approximate editorial labels inside Adyar zone — refine with official ward gazetteers. */
  179: "thiruvanmiyur",
  182: "besant-nagar",
  125: "nungambakkam",
  191: "navalur",
  198: "siruseri",
};

export const LOCALITY_SEED: Record<string, LocalityRecord> = {
  "thiruvanmiyur": {
    id: "thiruvanmiyur",
    name: "Thiruvanmiyur",
    region: "South Chennai",
    zone: "Adyar (GCC XIII)",
    type: ["Residential", "Coastal"],
    tags: ["Beach adjacency", "LB Road"],
    description:
      "Southern coastal neighbourhood with strong residential fabric and predictable weekend pressure along ECR connectors.",
    corridors: ["ECR corridor"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "adyar-thiruvanmiyur",
  },
  "besant-nagar": {
    id: "besant-nagar",
    name: "Besant Nagar",
    region: "South Chennai",
    zone: "Adyar (GCC XIII)",
    type: ["Residential", "Leisure"],
    tags: ["ECR", "Beach"],
    description:
      "Leafy coastal residential quarter; event and beach traffic spikes are seasonal but sharp.",
    corridors: ["ECR corridor"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "adyar-thiruvanmiyur",
  },
  nungambakkam: {
    id: "nungambakkam",
    name: "Nungambakkam",
    region: "Central Chennai",
    zone: "Teynampet (GCC IX)",
    type: ["Residential", "Commercial"],
    tags: ["CBD adjacency", "Consulates"],
    description:
      "Hospital, hotel, and consulate density with CBD spillover; VIP movement closures hit this belt first.",
    corridors: ["GST Link"],
    overlays: {
      itCorridor: false,
      metro: true,
      industrial: false,
      floodRisk: false,
      growthZone: false,
    },
    primaryHubSlug: "teynampet-nungambakkam",
  },
  navalur: {
    id: "navalur",
    name: "Navalur",
    region: "South Chennai",
    zone: "Sholinganallur (GCC XV)",
    type: ["Residential", "IT"],
    tags: ["OMR", "Apartment towns"],
    description:
      "Southern OMR apartment and services belt; commute and metro-phase updates matter daily.",
    corridors: ["OMR corridor"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  siruseri: {
    id: "siruseri",
    name: "Siruseri",
    region: "South Chennai",
    zone: "Sholinganallur (GCC XV)",
    type: ["IT", "Institutional"],
    tags: ["SIPCOT", "Tech parks"],
    description:
      "SIPCOT and IT park concentration toward the southern end of the IT corridor.",
    corridors: ["OMR corridor"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  adyar: {
    id: "adyar",
    name: "Adyar",
    region: "South Chennai",
    zone: "Adyar (GCC XIII)",
    type: ["Residential", "Institutional", "Coastal"],
    tags: ["Estuary", "Campuses", "Premium avenues"],
    description:
      "Coastal, residential, institutional, and premium urban neighbourhood along the Adyar river and estuary.",
    corridors: ["ECR Access", "OMR Link"],
    overlays: {
      itCorridor: false,
      metro: true,
      industrial: false,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "adyar-thiruvanmiyur",
  },
  velachery: {
    id: "velachery",
    name: "Velachery",
    region: "South Chennai",
    zone: "South interior",
    type: ["Residential", "Commercial", "Transit"],
    tags: ["Retail hub", "IT access", "Transit node"],
    description:
      "High-density mixed-use locality connecting southern neighbourhoods with retail cores and IT corridors.",
    corridors: ["GST Link", "OMR Access"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  sholinganallur: {
    id: "sholinganallur",
    name: "Sholinganallur",
    region: "South Chennai",
    zone: "Sholinganallur (GCC XV)",
    type: ["Residential", "IT"],
    tags: ["OMR belt", "Startups", "Apartment towns"],
    description:
      "Major IT and residential growth cluster on the OMR belt with dense tech parks and apartment corridors.",
    corridors: ["OMR corridor"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  royapuram: {
    id: "royapuram",
    name: "Royapuram",
    region: "North Chennai",
    zone: "Royapuram (GCC V)",
    type: ["Mixed-use", "Heritage"],
    tags: ["Harbour adjacency", "Markets"],
    description:
      "Historic northern urban district with maritime and transport relevance and dense mixed-use blocks.",
    corridors: ["North industrial belt"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: true,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "royapuram-tondiarpet",
  },
  tambaram: {
    id: "tambaram",
    name: "Tambaram belt",
    region: "Greater Chennai",
    zone: "Southern gateway",
    type: ["Residential", "Transit"],
    tags: ["Suburban rail", "Mofussil access"],
    description:
      "Southern transit and residential gateway with suburban expansion importance toward Chengalpattu.",
    corridors: ["GST", "NH45"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "tambaram-pallavaram-medavakkam",
  },
  perungudi: {
    id: "perungudi",
    name: "Perungudi",
    region: "South Chennai",
    zone: "Perungudi (GCC XIV)",
    type: ["IT", "Residential"],
    tags: ["OMR", "Tech parks"],
    description:
      "Dense IT and services belt; monsoon flooding hotspots differ from core-city storm drains — verify GCC bulletins.",
    corridors: ["OMR corridor"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  "t-nagar": {
    id: "t-nagar",
    name: "T. Nagar",
    region: "Central Chennai",
    zone: "Teynampet (GCC IX)",
    type: ["Retail", "Residential"],
    tags: ["Festival peak", "Metro access"],
    description:
      "Retail core with intense festival-season footfall; pair with metro and last-mile planning.",
    corridors: ["GST Link"],
    overlays: {
      itCorridor: false,
      metro: true,
      industrial: false,
      floodRisk: false,
      growthZone: false,
    },
    primaryHubSlug: "kodambakkam-t-nagar",
  },
  kodambakkam: {
    id: "kodambakkam",
    name: "Kodambakkam",
    region: "Central Chennai",
    zone: "Kodambakkam (GCC X)",
    type: ["Mixed-use", "Cultural"],
    tags: ["Film adjacency", "Evening economy"],
    description:
      "Film-industry adjacency and buzzing evening economy; mixed residential and commercial fabric.",
    corridors: ["GST Link"],
    overlays: {
      itCorridor: false,
      metro: true,
      industrial: false,
      floodRisk: false,
      growthZone: false,
    },
    primaryHubSlug: "kodambakkam-t-nagar",
  },
  "anna-nagar": {
    id: "anna-nagar",
    name: "Anna Nagar",
    region: "Central Chennai",
    zone: "Anna Nagar (GCC VIII)",
    type: ["Residential", "Commercial"],
    tags: ["Grid layout", "Metro feeders"],
    description:
      "Western-central residential grid with strong metro feeders and clinic/school demand.",
    corridors: ["NH48 connector"],
    overlays: {
      itCorridor: false,
      metro: true,
      industrial: false,
      floodRisk: false,
      growthZone: true,
    },
    primaryHubSlug: "ambattur-annanagar",
  },
  ambattur: {
    id: "ambattur",
    name: "Ambattur",
    region: "Central Chennai",
    zone: "Ambattur (GCC VII)",
    type: ["Industrial", "Residential"],
    tags: ["MSME", "Estates"],
    description:
      "Industrial estates beside dense residential blocks; hiring and logistics stories cluster here.",
    corridors: ["Western industrial belt"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: true,
      floodRisk: false,
      growthZone: true,
    },
    primaryHubSlug: "ambattur-annanagar",
  },
  guindy: {
    id: "guindy",
    name: "Guindy",
    region: "South Chennai",
    zone: "Alandur (GCC XII)",
    type: ["Transit", "Commercial"],
    tags: ["Metro", "Airport access"],
    description:
      "Major interchange for metro, MTC, and airport-bound traffic; disruptions ripple city-wide.",
    corridors: ["GST", "Airport corridor"],
    overlays: {
      itCorridor: true,
      metro: true,
      industrial: false,
      floodRisk: false,
      growthZone: true,
    },
    primaryHubSlug: "saidapet-guindy-alandur",
  },
  porur: {
    id: "porur",
    name: "Porur",
    region: "Central Chennai",
    zone: "Valasaravakkam (GCC XI)",
    type: ["Residential", "Lake-adjacent"],
    tags: ["Lake bund", "Suburban spread"],
    description:
      "Western suburban growth near Porur lake; storm-water and bund stories matter each monsoon.",
    corridors: ["NH48 / Sriperumbudur growth"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "valasaravakkam-porur",
  },
  tondiarpet: {
    id: "tondiarpet",
    name: "Tondiarpet",
    region: "North Chennai",
    zone: "Tondiarpet (GCC IV)",
    type: ["Mixed-use"],
    tags: ["Dense blocks", "Hyperlocal civic"],
    description:
      "Dense mixed-use northern wards; waterlogging and road cuts are highly hyperlocal.",
    corridors: ["North coastal"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: true,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "royapuram-tondiarpet",
  },
  madhavaram: {
    id: "madhavaram",
    name: "Madhavaram",
    region: "North Chennai",
    zone: "Madhavaram (GCC III)",
    type: ["Wholesale", "Residential"],
    tags: ["Bus hubs", "Growth"],
    description:
      "Wholesale and mofussil bus links; fast-growing northern apartment belts.",
    corridors: ["Northern radial"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "madhavaram-madhavaram",
  },
  tiruvottiyur: {
    id: "tiruvottiyur",
    name: "Tiruvottiyur",
    region: "North Chennai",
    zone: "Thiruvottiyur (GCC I)",
    type: ["Coastal", "Residential"],
    tags: ["Fishing harbour", "North stories"],
    description:
      "North coastal wards with fishing harbour links and industrial belt adjacency.",
    corridors: ["Ennore belt"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: true,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "tiruvottiyur-manali-belt",
  },
  manali: {
    id: "manali",
    name: "Manali",
    region: "North Chennai",
    zone: "Manali (GCC II)",
    type: ["Industrial", "Residential"],
    tags: ["Industrial", "Air quality"],
    description:
      "Industrial pockets near Ennore; freight, safety, and air-quality stories cluster here.",
    corridors: ["North industrial belt"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: true,
      floodRisk: true,
      growthZone: false,
    },
    primaryHubSlug: "tiruvottiyur-manali-belt",
  },
  "omr-belt": {
    id: "omr-belt",
    name: "OMR belt",
    region: "South Chennai",
    zone: "OMR corridor",
    type: ["IT", "Residential"],
    tags: ["IT corridor", "Startups"],
    description:
      "Logical corridor view: Perungudi through Sholinganallur IT and apartment spine.",
    corridors: ["OMR corridor"],
    overlays: {
      itCorridor: true,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "omr-perungudi-sholinganallur",
  },
  "ecr-belt": {
    id: "ecr-belt",
    name: "ECR belt",
    region: "South Chennai",
    zone: "Coastal south",
    type: ["Residential", "Leisure"],
    tags: ["Coastal", "Estuary"],
    description:
      "East Coast Road–oriented coastal residential and leisure corridor (logical grouping).",
    corridors: ["ECR corridor"],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: true,
      growthZone: true,
    },
    primaryHubSlug: "adyar-thiruvanmiyur",
  },
};

/** Default synthetic locality when ward has no override — still data-driven from ward props. */
export function defaultLocalityIdForWard(wardNo: number, zoneLabel: string): string {
  return `ward-${wardNo}-${slugify(zoneLabel)}`;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "chennai";
}

export function buildSyntheticLocality(
  wardNo: number,
  zoneLabel: string,
  zoneRoman: string,
  regionLabel: string,
  hubSlug: string,
): LocalityRecord {
  const id = defaultLocalityIdForWard(wardNo, zoneLabel);
  return {
    id,
    name: `Ward ${wardNo} — ${titleCase(zoneLabel)}`,
    region: regionLabel,
    zone: `${titleCase(zoneLabel)} (GCC ${zoneRoman})`,
    type: ["Administrative ward"],
    tags: ["GCC ward boundary"],
    description:
      "This polygon follows the open GCC ward boundary dataset. Editorial locality naming and CMS links can replace this card as ward-to-place mapping improves.",
    corridors: [],
    overlays: {
      itCorridor: false,
      metro: false,
      industrial: false,
      floodRisk: false,
      growthZone: false,
    },
    primaryHubSlug: hubSlug,
  };
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
