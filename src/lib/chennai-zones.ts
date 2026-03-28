/**
 * Greater Chennai — macro regions for v1 navigation (GCC-aligned naming where possible).
 * Slugs are stable; gccZoneNumber is optional until official mapping is locked.
 * geoVersion: bump when boundaries or grouping changes.
 */
/** Macro hub grouping version (ward SVG uses public/data/chennai-map/manifest.json). */
export const CHENNAI_GEO_VERSION = "gcc-macro-v2-ward-explorer";

export type ChennaiZone = {
  slug: string;
  label: string;
  blurb: string;
  gccZoneNumber?: number;
  /** Bento-map grid placement (1-based), mobile uses single column order */
  gridClass: string;
  /** Editorial bullets for area hub interior pages */
  highlights: string[];
};

export const chennaiZones: ChennaiZone[] = [
  {
    slug: "tiruvottiyur-manali-belt",
    label: "Tiruvottiyur & Manali",
    blurb: "North coastal wards, fishing harbour links, and industrial belt stories.",
    gridClass: "md:col-span-2",
    highlights: [
      "Harbour fish auctions, coastal ward meetings, and resettlement follow-ups often land in the same week — we group them so north Chennai readers see one timeline.",
      "Industrial pockets near Manali and Ennore surface air-quality, chemical safety, and freight detour alerts; verify notices before you plan a long commute.",
      "Northern MTC corridors and port-bound lorries shape peak-hour pinch points — bookmark this hub during monsoon and festival seasons.",
    ],
  },
  {
    slug: "madhavaram-madhavaram",
    label: "Madhavaram cluster",
    blurb: "Wholesale hubs, Mofussil bus links, and fast-growing northern corridors.",
    gccZoneNumber: 1,
    gridClass: "",
    highlights: [
      "Wholesale and mofussil bus flows make Madhavaram a daily mobility checkpoint for traders and students crossing the city.",
      "New apartment belts mean schools, clinics, and storm-water stress each monsoon — watch GCC zone bulletins for your ward.",
      "Parts of this cluster align with GCC Zone 1 references in civic data — double-check ward numbers before filing complaints.",
    ],
  },
  {
    slug: "royapuram-tondiarpet",
    label: "Royapuram & Tondiarpet",
    blurb: "Harbour-side neighbourhoods, markets, and heritage pockets.",
    gridClass: "",
    highlights: [
      "Harbour-adjacent markets and heritage lanes reward early-morning visits — parking and hawker cycles shift fast on weekends.",
      "Tondiarpet and Royapuram see dense mixed-use blocks; small fires, waterlogging, and road cuts are hyperlocal — neighbourhood WhatsApp often leads official posts.",
      "Connect here for north–central Chennai civic threads that do not fit the OMR or Adyar desks.",
    ],
  },
  {
    slug: "ambattur-annanagar",
    label: "Ambattur · Anna Nagar",
    blurb: "Western residential density, MSME corridors, and metro feeders.",
    gridClass: "md:row-span-2",
    highlights: [
      "Anna Nagar’s grid and Ambattur’s industrial estates sit side by side — job seekers and families share the same metro feeders.",
      "MSME corridors mean hiring spikes in tooling, logistics, and light manufacturing; pair this hub with our Jobs page for employer links.",
      "Western storm-water channels and lake bunds matter every northeast monsoon — we track GCC desilting alerts when they publish.",
    ],
  },
  {
    slug: "teynampet-nungambakkam",
    label: "Teynampet & Nungambakkam",
    blurb: "CBD adjacency, hospitals, consulates, and cultural venues.",
    gridClass: "md:col-span-2",
    highlights: [
      "Hospitals, hotels, and consulates cluster here — road closures for VIP movements and marathons hit this belt first.",
      "Evening culture at museums, halls, and galleries pairs with serious traffic on Mount–Cathedral routes; check events listings before you drive.",
      "Central Chennai election and policy stories often cite these wards — use the Politics and Chennai desks for deeper context.",
    ],
  },
  {
    slug: "kodambakkam-t-nagar",
    label: "Kodambakkam · T. Nagar",
    blurb: "Retail cores, film industry adjacency, and buzzing evening economy.",
    gridClass: "",
    highlights: [
      "T. Nagar’s retail peaks during festivals strain parking and pedestrian crossings — plan metro or last-mile walks when possible.",
      "Kodambakkam’s film-adjacent services mean irregular night shifts; job seekers should watch verified employer pages, not third-party reposts.",
      "Consumer desk stories on gold, apparel, and electronics often trace back to this corridor’s pricing signals.",
    ],
  },
  {
    slug: "saidapet-guindy-alandur",
    label: "Saidapet · Guindy · Alandur",
    blurb: "Transit interchanges, IT adjacency, and airport access corridors.",
    gridClass: "",
    highlights: [
      "Guindy and Alandur interchange metro, MTC, and airport-bound traffic — disruptions here ripple across the south and west.",
      "Saidapet’s mixed residential–commercial blocks are a bellwether for water supply and metro construction updates.",
      "IT parks toward the airport edge tie this hub to OMR hiring cycles; cross-read our Jobs spotlight for tech roles.",
    ],
  },
  {
    slug: "adyar-thiruvanmiyur",
    label: "Adyar to Thiruvanmiyur",
    blurb: "Coastal breeze, campuses, estuary ecology, and classic Chennai avenues.",
    gridClass: "md:col-span-2",
    highlights: [
      "Estuary ecology, beach events, and campus calendars overlap — weekend road pressure along ECR and LB Road is predictable but sharp.",
      "Adyar–Thiruvanmiyur is a default venue belt for concerts and talks; confirm tickets on organiser sites linked from our Events page.",
      "Flood and erosion stories here are distinct from west Chennai lake belts — we tag them for coastal readers separately.",
    ],
  },
  {
    slug: "omr-perungudi-sholinganallur",
    label: "OMR — Perungudi to Sholinganallur",
    blurb: "IT corridor pulse, startups, and apartment-town energy.",
    gridClass: "md:col-span-2",
    highlights: [
      "Perungudi to Sholinganallur is Chennai’s densest IT and startup strip — commute shuttles and metro phase updates matter daily.",
      "Apartment towns drive demand for clinics, schools, and co-working; directory listings will anchor here first when the API ships.",
      "OMR flooding hotspots during cyclonic spells differ from core city storm drains — watch GCC and highways bulletins together.",
    ],
  },
  {
    slug: "valasaravakkam-porur",
    label: "Valasaravakkam · Porur",
    blurb: "Lake views, suburban spread, and Porur–Poonamallee connectors.",
    gridClass: "",
    highlights: [
      "Porur lake and western suburban sprawl mean mixed traffic from Poonamallee and Bengaluru highway feeders.",
      "Residential towers and colleges push peak-hour pressure on arc roads — detours during flyover work are common.",
      "Mobility desk items on western bypasses and bus route rationalisation usually touch this belt first.",
    ],
  },
];

export function getChennaiZoneBySlug(slug: string): ChennaiZone | undefined {
  return chennaiZones.find((z) => z.slug === slug);
}
