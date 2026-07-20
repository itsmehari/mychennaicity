import type { AreaHubBestOfCard } from "@/lib/area-hubs/types";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";

export type HubVisualPack = {
  heroImage: string;
  heroImageAlt: string;
  bestOf: AreaHubBestOfCard[];
};

/**
 * Site-owned photography packs for area landings.
 * Prefer editorial/article images already on mychennaicity.in — no stock CDN.
 */
export const HUB_VISUAL_PACKS: Record<string, HubVisualPack> = {
  "tiruvottiyur-manali-belt": {
    heroImage:
      "/images/articles/manali-bus-terminal-redevelopment-north-chennai-2026.jpg",
    heroImageAlt: "North Chennai transit and coastal belt — Manali corridor",
    bestOf: [
      {
        id: "tn-harbour",
        title: "Harbour & coast",
        blurb:
          "Fishing harbour links, coastal wards, and Ennore–Manali industrial adjacency shape daily life here.",
        imageSrc:
          "/images/articles/manali-bus-terminal-redevelopment-north-chennai-2026.jpg",
        imageAlt: "North Chennai transport and coastal access",
        href: homeMapUrlForHub("tiruvottiyur-manali-belt"),
      },
      {
        id: "tn-industry",
        title: "Industrial pulse",
        blurb:
          "Air quality, freight, and chemical-safety alerts matter as much as residential stories in this belt.",
        imageSrc:
          "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg",
        imageAlt: "Civic works context for north Chennai",
      },
      {
        id: "tn-transit",
        title: "Bus & port traffic",
        blurb:
          "Terminal upgrades and port-bound lorries set peak-hour pinch points — verify diversions before you travel.",
        imageSrc:
          "/images/articles/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026.jpg",
        imageAlt: "MTC buses serving Chennai corridors",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "tn-monsoon",
        title: "Monsoon watch",
        blurb:
          "Northern storm-water channels and coastal flood notes differ from south Chennai lake belts.",
        imageSrc:
          "/images/articles/chennai-gcc-blue-green-restoration-three-lakes-35-crore.jpg",
        imageAlt: "Chennai water and drainage civic context",
      },
    ],
  },

  "madhavaram-madhavaram": {
    heroImage:
      "/images/articles/broadway-bus-stand-822-crore-multimodal-hub-chennai.jpg",
    heroImageAlt: "Chennai bus and multimodal transit — northern gateway context",
    bestOf: [
      {
        id: "md-wholesale",
        title: "Wholesale & mofussil",
        blurb:
          "Trader and student flows meet mofussil bus routes — a daily mobility checkpoint for north Chennai.",
        imageSrc:
          "/images/articles/broadway-bus-stand-822-crore-multimodal-hub-chennai.jpg",
        imageAlt: "Chennai bus stand and multimodal hub",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "md-growth",
        title: "Fast-growing north",
        blurb:
          "Apartment belts bring schools, clinics, and storm-water stress each northeast monsoon.",
        imageSrc:
          "/images/articles/chennai-cmda-high-rise-building-approval-powers-2026.jpg",
        imageAlt: "Chennai high-rise and planning context",
      },
      {
        id: "md-gcc",
        title: "GCC zone notes",
        blurb:
          "Parts of this cluster align with Zone 1 references — double-check ward numbers before filing complaints.",
        imageSrc:
          "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg",
        imageAlt: "Greater Chennai Corporation civic works",
        href: homeMapUrlForHub("madhavaram-madhavaram"),
      },
      {
        id: "md-commute",
        title: "Connector roads",
        blurb:
          "Northern arterials feed Ambattur and the harbour belt — detours ripple across hubs quickly.",
        imageSrc:
          "/images/articles/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026.jpg",
        imageAlt: "Chennai bus network",
      },
    ],
  },

  "royapuram-tondiarpet": {
    heroImage:
      "/images/articles/broadway-bus-stand-822-crore-multimodal-hub-chennai.jpg",
    heroImageAlt: "Harbour-side Chennai — Royapuram and Tondiarpet context",
    bestOf: [
      {
        id: "rt-heritage",
        title: "Harbour heritage",
        blurb:
          "Markets, heritage lanes, and dense mixed-use blocks reward early mornings and careful parking plans.",
        imageSrc: "/images/explore-chennai-madras-high-court.jpg",
        imageAlt: "Chennai civic and heritage streets",
        href: homeMapUrlForHub("royapuram-tondiarpet"),
      },
      {
        id: "rt-markets",
        title: "Markets & last mile",
        blurb:
          "Hawker cycles and lane widths shift fast on weekends — neighbourhood WhatsApp often leads official posts.",
        imageSrc:
          "/images/events/grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026.png",
        imageAlt: "Chennai market and food culture",
      },
      {
        id: "rt-civic",
        title: "Hyperlocal alerts",
        blurb:
          "Small fires, waterlogging, and road cuts are block-level stories — this hub collects the north–central thread.",
        imageSrc:
          "/images/articles/chennai-ngt-gcc-wet-dry-waste-separate-collection-days.jpg",
        imageAlt: "Chennai civic waste and ward services",
        href: "/chennai-local-news/topic/chennai",
      },
      {
        id: "rt-transit",
        title: "Port & rail edges",
        blurb:
          "Harbour and suburban-rail adjacency means freight and passenger peaks share the same pinch points.",
        imageSrc:
          "/images/articles/chennai-metro-may-2026-ridership-90-lakh-passengers.jpg",
        imageAlt: "Chennai metro and transit ridership",
      },
    ],
  },

  "ambattur-annanagar": {
    heroImage: "/images/articles/cmrl-shenoy-nagar-yoga-day-2026.webp",
    heroImageAlt: "West Chennai metro neighbourhoods — Anna Nagar belt",
    bestOf: [
      {
        id: "aa-grid",
        title: "Anna Nagar grid",
        blurb:
          "Planned avenues and metro feeders make this a default west Chennai residential reference point.",
        imageSrc: "/images/articles/cmrl-shenoy-nagar-yoga-day-2026.webp",
        imageAlt: "Shenoy Nagar / west Chennai metro context",
        href: homeMapUrlForHub("ambattur-annanagar"),
      },
      {
        id: "aa-msme",
        title: "Ambattur MSME",
        blurb:
          "Industrial estates and tooling corridors sit beside family neighbourhoods — hiring spikes show up in Jobs.",
        imageSrc:
          "/images/articles/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact.jpg",
        imageAlt: "Chennai infrastructure and industry context",
        href: "/chennai-jobs",
      },
      {
        id: "aa-metro",
        title: "Metro feeders",
        blurb:
          "Western metro and bus feeders shape school and office peaks — Phase upgrades change last-mile habits.",
        imageSrc:
          "/images/articles/chennai-metro-phase-1-stations-refurbishment-upgrade-2026.jpg",
        imageAlt: "Chennai metro station upgrades",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "aa-lakes",
        title: "Lakes & monsoon",
        blurb:
          "Western storm-water channels and lake bunds matter every northeast monsoon — watch GCC desilting notes.",
        imageSrc:
          "/images/articles/chennai-gcc-blue-green-restoration-three-lakes-35-crore.jpg",
        imageAlt: "Chennai lake restoration",
      },
    ],
  },

  "teynampet-nungambakkam": {
    heroImage: "/images/explore-chennai-madras-high-court.jpg",
    heroImageAlt: "Central Chennai — courts, hospitals, and civic core",
    bestOf: [
      {
        id: "tn-civic",
        title: "Civic core",
        blurb:
          "Hospitals, consulates, and courts cluster here — VIP movements and marathons hit these wards first.",
        imageSrc: "/images/explore-chennai-madras-high-court.jpg",
        imageAlt: "Madras High Court and central Chennai",
        href: homeMapUrlForHub("teynampet-nungambakkam"),
      },
      {
        id: "tn-culture",
        title: "Culture evenings",
        blurb:
          "Museums, halls, and galleries pair with Mount–Cathedral traffic — check events before you drive.",
        imageSrc:
          "/images/events/kathakali-restore-kottivakkam-june-2026.png",
        imageAlt: "Chennai cultural events",
        href: "/chennai-local-events",
      },
      {
        id: "tn-policy",
        title: "Policy & politics",
        blurb:
          "Central Chennai election and government stories often cite these wards — open Politics for more.",
        imageSrc:
          "/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg",
        imageAlt: "Tamil Nadu government and policy context",
        href: "/chennai-local-news/topic/politics",
      },
      {
        id: "tn-libraries",
        title: "Public spaces",
        blurb:
          "Reading rooms, parks, and civic programmes keep central wards lively beyond office hours.",
        imageSrc:
          "/images/articles/chennai-mudhalvar-padaippagams-modern-libraries-launched.jpg",
        imageAlt: "Chennai public libraries",
      },
    ],
  },

  "kodambakkam-t-nagar": {
    heroImage: "/images/explore-chennai-kapaleeshwar-temple.jpg",
    heroImageAlt: "T. Nagar and Kodambakkam — retail and cultural Chennai",
    bestOf: [
      {
        id: "kt-retail",
        title: "T. Nagar retail",
        blurb:
          "Festival peaks strain parking and crossings — metro or last-mile walks beat circling for a slot.",
        imageSrc: "/images/explore-chennai-kapaleeshwar-temple.jpg",
        imageAlt: "Kapaleeshwarar Temple and T. Nagar area",
        href: homeMapUrlForHub("kodambakkam-t-nagar"),
      },
      {
        id: "kt-markets",
        title: "Food & markets",
        blurb:
          "Vegetable, gold, and apparel stories often trace back to this corridor’s evening economy.",
        imageSrc:
          "/images/events/grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026.png",
        imageAlt: "T. Nagar market and food festival",
        href: "/chennai-local-events",
      },
      {
        id: "kt-film",
        title: "Film-adjacent work",
        blurb:
          "Kodambakkam’s services mean irregular night shifts — verify employers on Jobs, not third-party reposts.",
        imageSrc:
          "/images/business-profile/abk-liaison-llp/abk-arcot-tnagar-redevelopment.png",
        imageAlt: "T. Nagar street and redevelopment context",
        href: "/chennai-jobs",
      },
      {
        id: "kt-gold",
        title: "Gold & prices",
        blurb:
          "Jewellery street chatter connects to our Chennai gold rate desk when you are shopping.",
        imageSrc:
          "/images/articles/tamil-nadu-private-school-fee-transparency-chennai.png",
        imageAlt: "Chennai consumer and price context",
        href: "/chennai-gold-rate",
      },
    ],
  },

  "saidapet-guindy-alandur": {
    heroImage:
      "/images/articles/guindy-multimodal-transit-hub-consultancy-cmrl-2026.jpg",
    heroImageAlt: "Guindy multimodal transit — south–west Chennai connectors",
    bestOf: [
      {
        id: "sg-transit",
        title: "Guindy interchange",
        blurb:
          "Metro, MTC, and airport-bound traffic meet here — disruptions ripple across south and west Chennai.",
        imageSrc:
          "/images/articles/guindy-multimodal-transit-hub-consultancy-cmrl-2026.jpg",
        imageAlt: "Guindy multimodal transit hub plans",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "sg-airport",
        title: "Airport edge",
        blurb:
          "Satellite terminal road links and flyover works change arrival plans — confirm highways notices.",
        imageSrc:
          "/images/articles/chennai-airport-satellite-terminal-public-road-link-2026.jpg",
        imageAlt: "Chennai airport road link",
        href: homeMapUrlForHub("saidapet-guindy-alandur"),
      },
      {
        id: "sg-it",
        title: "IT adjacency",
        blurb:
          "Parks toward the airport edge tie this hub to OMR hiring cycles — cross-read Jobs for tech roles.",
        imageSrc:
          "/images/articles/chennai-metro-corridor-5-u-girders-completed-2026.jpg",
        imageAlt: "Chennai metro corridor construction",
        href: "/chennai-jobs",
      },
      {
        id: "sg-south",
        title: "Southern gateway",
        blurb:
          "Saidapet’s mixed blocks and Alandur feeders are a bellwether for water supply and metro construction updates.",
        imageSrc:
          "/images/articles/chengalpattu-cmda-bus-terminus-opening-july-2026.jpg",
        imageAlt: "Southern Chennai bus and transit gateway",
      },
    ],
  },

  "adyar-thiruvanmiyur": {
    heroImage:
      "/images/articles/marina-beach-sunrise-yoga-space-chennai.webp",
    heroImageAlt: "Chennai coast — Adyar to Thiruvanmiyur belt",
    bestOf: [
      {
        id: "at-coast",
        title: "Coast & estuary",
        blurb:
          "Beach events, estuary ecology, and ECR connectors define weekend pressure along LB Road.",
        imageSrc:
          "/images/articles/marina-beach-sunrise-yoga-space-chennai.webp",
        imageAlt: "Chennai beach sunrise",
        href: homeMapUrlForHub("adyar-thiruvanmiyur"),
      },
      {
        id: "at-campuses",
        title: "Campuses & avenues",
        blurb:
          "Classic Chennai avenues and campus calendars overlap — plan parking early for weekend talks.",
        imageSrc:
          "/images/articles/international-yoga-day-2026-chennai-beach-yoga.webp",
        imageAlt: "Chennai beach public gathering",
      },
      {
        id: "at-events",
        title: "Venue belt",
        blurb:
          "Concerts and civic programmes often land here — confirm tickets on organiser pages from Events.",
        imageSrc:
          "/images/events/kathakali-restore-kottivakkam-june-2026.png",
        imageAlt: "South Chennai cultural venue",
        href: "/chennai-local-events",
      },
      {
        id: "at-flood",
        title: "Coastal flood notes",
        blurb:
          "Erosion and flood stories here differ from west Chennai lake belts — we tag them for coastal readers.",
        imageSrc:
          "/images/articles/perur-400-mld-desalination-plant-chennai-water-security.jpg",
        imageAlt: "Chennai water security",
        href: "/chennai-local-news/topic/chennai",
      },
    ],
  },

  "omr-perungudi-sholinganallur": {
    heroImage: "/images/articles/ozone-greens-perumbakkam-hero.jpg",
    heroImageAlt: "OMR apartment and IT corridor — south Chennai",
    bestOf: [
      {
        id: "omr-it",
        title: "IT & startups",
        blurb:
          "Tech parks from Perungudi through Sholinganallur drive weekday peaks and office shuttles.",
        imageSrc:
          "/images/articles/bvm-global-perungudi-chess-tournament-2026-hero.png",
        imageAlt: "Perungudi OMR community and campus life",
        href: "/chennai-jobs",
      },
      {
        id: "omr-housing",
        title: "Apartment towns",
        blurb:
          "Gated communities and PG clusters stack along Rajiv Gandhi Salai — EB and water are everyday topics.",
        imageSrc: "/images/articles/ozone-greens-perumbakkam-hero.jpg",
        imageAlt: "South Chennai apartment corridor",
        href: homeMapUrlForHub("omr-perungudi-sholinganallur"),
      },
      {
        id: "omr-metro",
        title: "Metro Phase 2",
        blurb:
          "Elevated Corridor 3 works reshape Perungudi, SRP Tools, and Sholinganallur junctions for seasons.",
        imageSrc:
          "/images/articles/chennai-metro-corridor-5-u-girders-completed-2026.jpg",
        imageAlt: "Chennai metro construction on corridors",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "omr-marsh",
        title: "Marsh & monsoon",
        blurb:
          "Pallikaranai adjacency means flood patterns differ from core-city drains — watch GCC and highways together.",
        imageSrc:
          "/images/articles/chennai-gcc-blue-green-restoration-three-lakes-35-crore.jpg",
        imageAlt: "Chennai marsh and lake ecology",
      },
    ],
  },

  "valasaravakkam-porur": {
    heroImage:
      "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    heroImageAlt: "Porur and west Chennai neighbourhood life",
    bestOf: [
      {
        id: "vp-lake",
        title: "Porur lake belt",
        blurb:
          "Lake views and western suburban sprawl meet Poonamallee and Bengaluru-highway feeders.",
        imageSrc:
          "/images/articles/chennai-gcc-blue-green-restoration-three-lakes-35-crore.jpg",
        imageAlt: "Chennai lakes and blue-green restoration",
        href: homeMapUrlForHub("valasaravakkam-porur"),
      },
      {
        id: "vp-community",
        title: "Neighbourhood events",
        blurb:
          "Studios, colleges, and community workshops keep Porur evenings busy beyond commute hours.",
        imageSrc:
          "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
        imageAlt: "Porur community workshop",
        href: "/chennai-local-events",
      },
      {
        id: "vp-roads",
        title: "Arc roads",
        blurb:
          "Residential towers push peak pressure on arc roads — flyover works mean frequent detours.",
        imageSrc:
          "/images/articles/chennai-airport-satellite-terminal-public-road-link-2026.jpg",
        imageAlt: "West Chennai road connectors",
        href: "/chennai-local-news/topic/mobility",
      },
      {
        id: "vp-bypass",
        title: "Western bypasses",
        blurb:
          "Bus-route changes and bypass news usually touch this belt first — bookmark civic and mobility topics.",
        imageSrc:
          "/images/articles/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026.jpg",
        imageAlt: "Chennai bus route network",
      },
    ],
  },
};

export function visualPackForHub(slug: string): HubVisualPack | undefined {
  return HUB_VISUAL_PACKS[slug];
}
