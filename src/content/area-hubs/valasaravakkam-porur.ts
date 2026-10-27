import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "valasaravakkam-porur";
const VISUALS = visualPackForHub(SLUG)!;

export const VALASARAVAKKAM_PORUR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Valasaravakkam and Porur area guide: Porur lake, Poonamallee and Bengaluru-highway feeders, western arc roads, monsoon bund notes, news and classifieds on mychennaicity.in.",
  identityLine: "Porur lake, arc roads, and the Poonamallee–highway west",
  heroDek:
    "Valasaravakkam and Porur are west Chennai’s lake-and-sprawl belt — tower blocks, colleges, and arc roads fed by Poonamallee and the Bengaluru highway, not Mount Road VIP closures and not OMR marsh flooding.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Valasaravakkam and Porur wards highlight together — tap the lake belt and western connectors, then open mobility and civic news for this suburb.",
  statChips: [
    { label: "Water", value: "Porur lake & western bunds" },
    { label: "Feeders", value: "Poonamallee · NH48 / Bengaluru highway" },
    { label: "Roads", value: "Arc roads · flyover detours" },
    { label: "Life", value: "Towers, colleges, community studios" },
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
  aboutTitle: "About Valasaravakkam and Porur",
  aboutSubtitle:
    "Western suburban growth around a lake — highway feeders, not a CBD.",
  aboutParagraphs: [
    "**Porur** grew around the lake and the western radials toward Poonamallee and the Bengaluru / Sriperumbudur highway. Residential towers and colleges push peak-hour pressure onto arc roads. Flyover seasons mean frequent detours.",
    "**Valasaravakkam** (GCC Zone XI) is the denser western-suburban neighbour: mixed apartments, schools, and connector roads toward Arcot Road / Kodambakkam on one side and Ambattur on the other.",
    "Civic stress is **lake bunds and western storm-water**, plus bypass and bus-route changes that usually touch this belt first. That is not Adyar estuary flooding and not Pallikaranai marsh on OMR.",
    "Independent editorial context. Confirm ward numbers and official highways / GCC desilting notes. We do not publish live lake-level sensors.",
  ],
  corridorFacts: [
    { label: "Lake", value: "Porur lake and adjoining bunds" },
    { label: "GCC ref", value: "Valasaravakkam Zone XI" },
    { label: "West feeders", value: "Poonamallee and NH48 / Bengaluru highway" },
    { label: "East / south feed", value: "Toward Guindy interchange and Arcot Road" },
    { label: "North feed", value: "Toward Ambattur / Anna Nagar" },
    { label: "Housing", value: "Towers, older plots, college-adjacent rentals" },
    { label: "Daily clock", value: "College + office peaks on arc roads" },
    { label: "Not this hub", value: "T. Nagar retail, Adyar coast, OMR IT spine" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Arc roads & flyovers",
      value:
        "Tower and college peaks stack on the same arc roads. Flyover works mean detours that change month to month — use official traffic channels, not screenshot forwards.",
    },
    {
      label: "Poonamallee / highway feeders",
      value:
        "Western bypass and NH48 movements dump onto Porur junctions. This is freight-and-suburb traffic, not Mount Road VIP closures.",
    },
    {
      label: "Toward Guindy / airport",
      value:
        "South-east hops share the Saidapet–Guindy–Alandur interchange. Delays there are west-Chennai news even when the destination is a terminal.",
    },
    {
      label: "Toward Ambattur / Anna Nagar",
      value:
        "North hops share western arterials and Inner Ring movements. Treat that hub as the neighbouring residential–MSME market.",
    },
    {
      label: "Buses & last mile",
      value:
        "MTC route changes on western bypasses usually touch this belt first. Last-mile from bus stops to tower gates is still share auto or two-wheeler.",
    },
  ],
  civicWatchlist: [
    "**Porur lake bunds and western storm-water** — northeast monsoon notes differ from Adyar estuary and Pallikaranai marsh.",
    "**Arc-road flyover detours** — residential towers feel construction seasons as daily commute changes.",
    "**Western bypass and bus-route notices** — this belt is often first-touch; bookmark mobility news.",
    "**College-evening and community-studio peaks** — parking around Porur is not T. Nagar festival parking.",
    "**Ward vs “Porur” postal name** — confirm the GCC ward number before a civic complaint.",
  ],
  civicTitle: "What to watch in Valasaravakkam and Porur",
  lifestyleNotes: [
    "Weekdays follow college and office clocks on arc roads; weekends add highway leisure and community workshops.",
    "This is not Anna Nagar’s planned grid and not OMR’s IT shuttle pattern — though both are a short hub away.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Western bypass and civic stories when tagged",
    },
    {
      label: "Mobility news",
      href: "/chennai-local-news/topic/mobility",
      hint: "Bus routes and flyover detours",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Tower and college-adjacent rentals",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "West Chennai and highway-edge roles",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Valasaravakkam–Porur wards",
    },
    {
      label: "Flood street-score",
      href: "/civic-tools/flood-street-score",
      hint: "Editorial monsoon context — not a live warning",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "ambattur-annanagar",
    "saidapet-guindy-alandur",
    "kodambakkam-t-nagar",
  ],
  faq: [
    {
      question: "Is Porur the same as Valasaravakkam?",
      answer:
        "No. Porur is the lake-and-highway-feeder suburb. Valasaravakkam is the denser Zone XI neighbour toward Arcot Road. This hub covers both because they share western arc roads and a labour market.",
    },
    {
      question: "How is flooding here different from OMR or Adyar?",
      answer:
        "Stories here involve Porur lake bunds and western channels — not Pallikaranai marsh and not the Adyar river mouth. Use GCC notices for your ward; this page is not a live flood warning.",
    },
    {
      question: "Why do flyovers matter so much?",
      answer:
        "Towers and colleges load the same arc roads. A flyover season changes every peak hop toward Guindy, Ambattur, or the highway. Confirm official traffic notes.",
    },
    {
      question: "Is there Metro on this belt?",
      answer:
        "Do not assume a station from the neighbourhood name. Confirm the current CMRL map. Many trips still use buses plus last-mile autos toward Guindy or Anna Nagar transfers.",
    },
    {
      question: "Where do west Chennai jobs show up?",
      answer:
        "Open roles we list appear on the Chennai jobs hub. Ask for a landmark on the arc road or highway feeder — “Porur” alone is a wide pin.",
    },
    {
      question: "Is this an official GCC page?",
      answer:
        "No. mychennaicity.in is independent. Civic notes are editorial — verify ward numbers, lake works, and bus changes on official channels.",
    },
  ],
};
