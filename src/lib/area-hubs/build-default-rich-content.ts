import type { ChennaiZone } from "@/lib/chennai-zones";
import { chennaiZones } from "@/lib/chennai-zones";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import {
  homeMapUrlForHub,
  relatedHubsFor,
} from "@/lib/area-hubs/geography";
import type {
  AreaHubBestOfCard,
  RichAreaHubContent,
} from "@/lib/area-hubs/types";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const IDENTITY: Record<string, string> = {
  "tiruvottiyur-manali-belt": "North coastal harbour & industrial belt",
  "madhavaram-madhavaram": "North Chennai wholesale & mofussil gateway",
  "royapuram-tondiarpet": "Harbour-side heritage & market wards",
  "ambattur-annanagar": "West Chennai residential grid & MSME spine",
  "teynampet-nungambakkam": "Central Chennai civic & cultural core",
  "kodambakkam-t-nagar": "Retail heart & film-adjacent evening economy",
  "saidapet-guindy-alandur": "Transit interchanges & airport-edge corridor",
  "adyar-thiruvanmiyur": "Coastal campuses, avenues & estuary ecology",
  "omr-perungudi-sholinganallur": "IT corridor & apartment towns on Rajiv Gandhi Salai",
  "valasaravakkam-porur": "Western lakes & Porur–Poonamallee connectors",
};

function bestOfFromHighlights(zone: ChennaiZone): AreaHubBestOfCard[] {
  return zone.highlights.slice(0, 4).map((text, i) => {
    const title =
      i === 0
        ? "Civic pulse"
        : i === 1
          ? "Daily life"
          : i === 2
            ? "What to watch"
            : "Local context";
    return {
      id: `${zone.slug}-best-${i}`,
      title,
      blurb: text,
    };
  });
}

function defaultFaq(zone: ChennaiZone): RichAreaHubContent["faq"] {
  return [
    {
      question: `What is the ${zone.label} area hub on mychennaicity.in?`,
      answer: `${zone.label} is a Greater Chennai macro hub on mychennaicity.in — ${zone.blurb} Open this page for neighbourhood context, local news, classifieds, and a link to the interactive city map.`,
    },
    {
      question: `How do I find ${zone.label} on the Chennai map?`,
      answer: `Use Explore on the Chennai map from this hub, or open the home page map with the hub already focused. Wards and localities in this belt highlight together so you can jump from the map into news and listings.`,
    },
    {
      question: `Does this page list live news and jobs for ${zone.label}?`,
      answer: `When stories or ads are tagged to this hub in our database, they appear in the Local news and Classifieds sections. City-wide Chennai news and jobs hubs remain available for everything else.`,
    },
    {
      question: "Is this an official GCC page?",
      answer:
        "No. mychennaicity.in is an independent Chennai local site. Civic notes here are editorial context — always verify ward numbers, helplines, and notices on official GCC / government channels.",
    },
  ];
}

/** Solid rich landing content for any canonical hub (OMR may override). */
export function buildDefaultRichAreaHubContent(
  zone: ChennaiZone,
): RichAreaHubContent {
  const localityCards = localityCardsForHub(zone.slug);
  const related = relatedHubsFor(zone.slug);
  const visuals = visualPackForHub(zone.slug);

  return {
    slug: zone.slug,
    metaDescription: `${zone.label} Chennai area guide: neighbourhood facts, civic watchlist, commute notes, local news and classifieds — linked to the interactive Chennai ward map on mychennaicity.in.`,
    identityLine: IDENTITY[zone.slug] ?? zone.blurb,
    heroDek: zone.blurb,
    heroImage:
      visuals?.heroImage ?? "/images/explore-chennai-madras-high-court.jpg",
    heroImageAlt:
      visuals?.heroImageAlt ??
      `${zone.label} — Chennai area guide on mychennaicity.in`,
    mapBlurb:
      "Wards in this hub highlight on the city map. Open the full explorer to pick a ward and jump back into local news.",
    statChips: [
      { label: "Macro hub", value: zone.label },
      {
        label: "Localities",
        value:
          localityCards.length > 0
            ? `${localityCards.length} mapped`
            : "City map linked",
      },
      ...(zone.gccZoneNumber
        ? [{ label: "GCC ref", value: `Zone ${zone.gccZoneNumber}` }]
        : [{ label: "Coverage", value: "Greater Chennai" }]),
      { label: "Map", value: "Interactive wards" },
    ],
    sectionNav: [
      { id: "best-of", label: "Best of" },
      { id: "about", label: "About" },
      { id: "localities", label: "Neighbourhoods" },
      { id: "on-the-map", label: "On the map" },
      { id: "local-news", label: "Local news" },
      { id: "classifieds", label: "Classifieds" },
      { id: "commute", label: "Getting around" },
      { id: "civic", label: "Civic watch" },
      { id: "faq", label: "FAQ" },
    ],
    bestOf: visuals?.bestOf ?? bestOfFromHighlights(zone),
    aboutTitle: `About ${zone.label}`,
    aboutSubtitle: "Why this hub exists for Chennai readers.",
    aboutParagraphs: [
      `**${zone.label}** groups nearby wards and localities so residents can follow civic, mobility, and neighbourhood stories without hunting across the whole city.`,
      zone.highlights[0] ?? zone.blurb,
      zone.highlights[1] ??
        "Use the map section below to see how this belt sits inside Greater Chennai, then open live news and classifieds tagged here when available.",
    ],
    corridorFacts: [
      { label: "Hub", value: zone.label },
      { label: "Focus", value: zone.blurb },
      {
        label: "Mapped localities",
        value:
          localityCards.length > 0
            ? localityCards.map((l) => l.name).slice(0, 8).join(", ")
            : "See interactive map",
      },
      {
        label: "Related hubs",
        value:
          related.length > 0
            ? related.map((z) => z.label).join(" · ")
            : "Browse all areas",
      },
    ],
    localityCards,
    commuteRows: [
      {
        label: "City network",
        value:
          "MTC, metro, and arterial roads shape peak-hour travel — confirm diversions on official CMRL / traffic channels before you leave.",
      },
      {
        label: "Last mile",
        value:
          "Share autos, walkable stretches, and parking pressure vary block by block; use the ward map when planning a first visit.",
      },
      {
        label: "Cross-hub trips",
        value: `Readers often combine ${zone.label} with neighbouring hubs for work and weekend trips — see Related hubs below.`,
      },
    ],
    civicWatchlist: zone.highlights.map((h) => h),
    civicTitle: `What to watch in ${zone.label}`,
    lifestyleNotes: [
      "This page is for residents, newcomers, and anyone following Greater Chennai civic life — not a substitute for official notices.",
      "Bookmark the hub and the city map together: the map shows where you are; this page collects what matters nearby.",
    ],
    practicalGuides: [
      {
        label: "Chennai local news",
        href: "/chennai-local-news",
        hint: "City-wide civic and neighbourhood reports",
      },
      {
        label: "Jobs in Chennai",
        href: "/chennai-jobs",
        hint: "Open roles across the city",
      },
      {
        label: "Local events",
        href: "/chennai-local-events",
        hint: "Concerts, markets, and gatherings",
      },
      {
        label: "Open on city map",
        href: homeMapUrlForHub(zone.slug),
        hint: "Highlight this hub on the interactive ward map",
      },
    ],
    partnerLinks: [],
    relatedHubSlugs: related.map((z) => z.slug),
    faq: defaultFaq(zone),
  };
}

export function buildAllDefaultRichHubs(): Record<string, RichAreaHubContent> {
  const out: Record<string, RichAreaHubContent> = {};
  for (const zone of chennaiZones) {
    out[zone.slug] = buildDefaultRichAreaHubContent(zone);
  }
  return out;
}
