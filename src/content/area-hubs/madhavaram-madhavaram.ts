import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "madhavaram-madhavaram";
const VISUALS = visualPackForHub(SLUG)!;

export const MADHAVARAM_MADHAVARAM_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Madhavaram area guide: wholesale yards, mofussil bus links, northern apartment growth, GCC Zone 1 civic notes, commute pinch points, news and classifieds on mychennaicity.in.",
  identityLine: "Wholesale yards, mofussil buses, and a fast-growing north gateway",
  heroDek:
    "Madhavaram is where trader trucks, mofussil buses, and new apartment belts share the same northern radials — a daily mobility checkpoint, not a harbour ward and not Anna Nagar’s planned grid.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Madhavaram cluster wards highlight together — tap the wholesale and bus-gateway stretch, then jump into news tagged for this north corridor.",
  statChips: [
    { label: "Pulse", value: "Wholesale & trader yards" },
    { label: "Buses", value: "Mofussil + city feeders" },
    { label: "GCC ref", value: "Zone 1 / Madhavaram (III)" },
    { label: "Growth", value: "New apartment belts" },
  ],
  sectionNav: [
    { id: "best-of", label: "Best of" },
    { id: "about", label: "About the belt" },
    { id: "localities", label: "Neighbourhoods" },
    { id: "on-the-map", label: "On the map" },
    { id: "local-news", label: "Local news" },
    { id: "classifieds", label: "Classifieds" },
    { id: "commute", label: "Commute" },
    { id: "civic", label: "Civic watchlist" },
    { id: "guides", label: "Useful links" },
    { id: "faq", label: "FAQ" },
  ],
  bestOf: VISUALS.bestOf,
  aboutTitle: "About the Madhavaram cluster",
  aboutSubtitle:
    "North Chennai’s wholesale-and-bus gateway beside a growing apartment belt.",
  aboutParagraphs: [
    "**Madhavaram** grew as a wholesale and mofussil checkpoint: trader flows, bus links toward the city and the districts, and arterial roads that also feed Ambattur and the harbour belt. Students and shop staff treat the bus nodes as a daily transfer, not a weekend destination.",
    "Newer **apartment belts** bring schools, clinics, and storm-water stress each northeast monsoon. The civic story is growth-plus-drainage, not beach erosion or T. Nagar festival parking.",
    "Parts of this cluster align with **GCC Zone 1 / Madhavaram (Zone III)** references in civic data. Postal “Madhavaram” still spans more than one ward — confirm the number before you file a complaint.",
    "This hub is independent editorial context. We do not invent councillor names or live bus ETAs. Verify GCC, MTC, and traffic notices on official channels.",
  ],
  corridorFacts: [
    { label: "Core", value: "Madhavaram wholesale and residential cluster" },
    { label: "GCC ref", value: "Madhavaram Zone III · often cited with Zone 1 notes" },
    { label: "Mobility role", value: "Mofussil and city bus checkpoint" },
    { label: "West feed", value: "Toward Ambattur industrial / Anna Nagar metro" },
    { label: "East / north feed", value: "Toward Tiruvottiyur–Manali harbour-industry" },
    { label: "Growth", value: "Apartment belts, schools, clinics" },
    { label: "Monsoon", value: "Northern channels and new-layout storm-water" },
    { label: "Not this hub", value: "Harbour heritage lanes, OMR IT, T. Nagar retail" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Mofussil & city buses",
      value:
        "Madhavaram is a transfer checkpoint. Delays at the bus nodes ripple into trader hours and school clocks. Confirm MTC and mofussil notices — this site does not publish live departure boards.",
    },
    {
      label: "Northern radials",
      value:
        "Arterials toward the Inner Ring, Ambattur, and the harbour belt carry mixed freight and commuter traffic. Flyover or desilting works mean frequent detours.",
    },
    {
      label: "Toward Ambattur / Anna Nagar",
      value:
        "Office and metro trips often leave this hub toward the Green Line and CMBT. Treat the Ambattur–Anna Nagar hub as the neighbouring labour market.",
    },
    {
      label: "Toward Tiruvottiyur / Manali",
      value:
        "Industrial and harbour hops share the same northern roads. Freight peaks do not match Anna Nagar school vans.",
    },
    {
      label: "Last mile",
      value:
        "Share autos and two-wheelers cover new layouts. Lane widths and parking around wholesale yards change through the day — plan the first visit with the ward map.",
    },
  ],
  civicWatchlist: [
    "**Storm-water in new apartment belts** — monsoon notes here are layout-and-channel stories, not Adyar estuary flooding.",
    "**Wholesale freight and yard access** — lorry cycles are local; they are not CBD VIP-closure stories.",
    "**Ward vs Zone 1 language** — civic data may cite Zone 1 / Madhavaram; still confirm the exact ward number.",
    "**School and clinic demand** in growing layouts — civic complaints often start as access, not only flooding.",
    "**Bus-node crowding** during festival and exam seasons — bridges into neighbouring hubs quickly.",
  ],
  civicTitle: "What to watch in the Madhavaram cluster",
  lifestyleNotes: [
    "Trader mornings and school peaks share the same radials; apartment evenings feel suburban, not harbour-dense.",
    "Do not reuse OMR shuttle or T. Nagar festival checklists here.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "North civic and mobility stories when tagged",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Wholesale, logistics, and north listings",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Rentals in growing layouts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Community dates in the north cluster",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Madhavaram wards",
    },
    {
      label: "Zone & ward finder",
      href: "/civic-tools/zone-ward-finder",
      hint: "Starting point — confirm on official GCC channels",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: ["tiruvottiyur-manali-belt", "ambattur-annanagar"],
  faq: [
    {
      question: "What does the Madhavaram hub cover?",
      answer:
        "Wholesale yards, mofussil and city bus links, and the growing apartment belts around Madhavaram. It is not the Tiruvottiyur harbour coast and not Anna Nagar’s planned grid — those have their own hubs.",
    },
    {
      question: "Is this the same as GCC Zone 1?",
      answer:
        "Civic datasets sometimes align parts of this cluster with Zone 1 / Madhavaram (Zone III) language. That is a reference, not a substitute for your ward number. Confirm on official GCC channels before filing a complaint.",
    },
    {
      question: "Why do buses matter so much here?",
      answer:
        "Madhavaram is a transfer checkpoint for traders, students, and workers crossing north Chennai. Delays at the bus nodes are city news for this belt even when the destination name is Ambattur or Broadway.",
    },
    {
      question: "How does monsoon flooding show up?",
      answer:
        "New layouts and northern channels waterlog differently from west-Chennai lake bunds or the Adyar river mouth. Use GCC notices for your street; this page is not a live flood warning.",
    },
    {
      question: "Where should I look for local jobs?",
      answer:
        "Open roles we publish appear on the Chennai jobs hub. Ask for a yard, estate, or apartment-site address — “Madhavaram” alone is too wide.",
    },
    {
      question: "Is this an official Corporation page?",
      answer:
        "No. mychennaicity.in is independent. Civic notes here are editorial — verify ward numbers, helplines, and bus changes on official channels.",
    },
  ],
};
