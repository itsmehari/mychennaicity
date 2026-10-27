import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "royapuram-tondiarpet";
const VISUALS = visualPackForHub(SLUG)!;

export const ROYAPURAM_TONDIARPET_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Royapuram and Tondiarpet area guide: harbour-side markets, heritage lanes, dense mixed-use blocks, hyperlocal civic notes, news and classifieds on mychennaicity.in.",
  identityLine: "Harbour markets, heritage lanes, and dense north–central blocks",
  heroDek:
    "Royapuram and Tondiarpet are harbour-side Chennai: early-morning markets, heritage streets, and mixed-use blocks where a waterlogged lane or a road cut is a block-level story — not an OMR or Adyar headline.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Royapuram, Tondiarpet, and neighbouring north–central wards highlight together — tap the harbour edge and market lanes, then open civic news for this belt.",
  statChips: [
    { label: "Character", value: "Harbour-side · heritage lanes" },
    { label: "Markets", value: "Early-morning hawker cycles" },
    { label: "Fabric", value: "Dense mixed-use blocks" },
    { label: "Civic", value: "Hyperlocal waterlogging & road cuts" },
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
  aboutTitle: "About Royapuram and Tondiarpet",
  aboutSubtitle:
    "North–central harbour wards — markets and heritage, not an IT corridor.",
  aboutParagraphs: [
    "**Royapuram** sits on the harbour edge with markets, older streets, and maritime adjacency. Early mornings reward visitors; parking and hawker cycles shift fast by weekend noon.",
    "**Tondiarpet** is denser mixed-use: homes above shops, narrow lanes, and civic issues that stay hyperlocal — a small fire, a waterlogged dip, a sudden road cut. Neighbourhood WhatsApp often leads official posts by hours.",
    "This hub also gathers nearby north–central threads (including Thiru Vi Ka Nagar adjacency in map data) that are not mainly OMR or Adyar stories. Residents often work toward Broadway, the harbour, or central Chennai rather than south IT parks.",
    "Independent editorial context only. Confirm GCC ward numbers on official channels. We do not list live councillor names or unofficial helplines.",
  ],
  corridorFacts: [
    { label: "Harbour edge", value: "Royapuram markets and maritime adjacency" },
    { label: "Dense core", value: "Tondiarpet mixed-use blocks" },
    { label: "GCC refs", value: "Tondiarpet (IV) · Royapuram (V) · Thiru Vi Ka Nagar (VI) adjacency" },
    { label: "Daily clock", value: "Early markets; weekend hawker shifts" },
    { label: "Transit", value: "Suburban rail / harbour edges + city buses" },
    { label: "Civic grain", value: "Block-level, not corridor-wide" },
    { label: "Housing", value: "Older houses, walk-ups, shop-houses" },
    { label: "Not this hub", value: "OMR apartment towns, Adyar campus coast, T. Nagar bazaars" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Harbour & suburban rail",
      value:
        "Passenger and freight peaks share pinch points near the harbour edge. Confirm Southern Railway bulletins; do not assume Metro from a neighbourhood name.",
    },
    {
      label: "Toward Broadway / central Chennai",
      value:
        "City buses and two-wheelers carry most hops into the civic core. Weekend market parking fails first — walk the last stretch when you can.",
    },
    {
      label: "North toward Tiruvottiyur",
      value:
        "Coastal-north trips continue into the Tiruvottiyur–Manali hub. Treat those pages as one harbour-to-industry labour market.",
    },
    {
      label: "Lane last mile",
      value:
        "Share autos and walking still win inside Tondiarpet blocks. Lane widths and one-ways change with hawker cycles — the ward map helps a first visit.",
    },
    {
      label: "VIP / event closures",
      value:
        "Central-city closures sometimes back onto these approaches. Check traffic police notes when a marathon or harbour event is on the calendar.",
    },
  ],
  civicWatchlist: [
    "**Hyperlocal waterlogging and road cuts** — block-level; do not wait for a city-wide flood headline.",
    "**Market and hawker cycles** — weekend parking and pedestrian pinch points shift by late morning.",
    "**Small-fire and dense-block access** — lane width matters for emergency vehicles; civic notes stay street-specific.",
    "**Harbour-adjacent freight vs pedestrian peaks** — the same pinch points serve both.",
    "**Ward vs heritage place-name** — Royapuram / Tondiarpet names span multiple wards; confirm the number before filing.",
  ],
  civicTitle: "What to watch in Royapuram and Tondiarpet",
  lifestyleNotes: [
    "Early mornings are the neighbourhood’s best face; evenings are mixed-use and noisy in a north–central way, not a T. Nagar retail way.",
    "Neighbourhood WhatsApp is often faster than official posts — still verify before you act.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "North–central civic threads when tagged",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Shop-house and neighbourhood wanted posts",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Markets, logistics, and harbour-adjacent roles",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Heritage and community dates",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Royapuram–Tondiarpet wards",
    },
    {
      label: "Responsibility router",
      href: "/civic-tools/responsibility-router",
      hint: "Starting point — not an official filing desk",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: ["tiruvottiyur-manali-belt", "teynampet-nungambakkam"],
  faq: [
    {
      question: "Is Royapuram the same as Tondiarpet?",
      answer:
        "No. Royapuram sits closer to the harbour and market-heritage streets. Tondiarpet is denser mixed-use a little further in. This hub covers both because civic and commute stories stay north–central and harbour-adjacent.",
    },
    {
      question: "When should I visit the markets?",
      answer:
        "Early morning. Hawker cycles and parking tighten by late morning on weekends. This is not T. Nagar festival-eve shopping.",
    },
    {
      question: "Why do civic issues feel so local here?",
      answer:
        "Dense blocks mean a waterlogged dip or a road cut can stop one street without becoming a city headline. Use GCC ward channels for your block; neighbourhood forwards are a hint, not a filing.",
    },
    {
      question: "Which rail should I use?",
      answer:
        "Harbour-adjacent suburban rail is the usual rail story. Confirm Southern Railway maps. Do not assume a Metro station from the neighbourhood name.",
    },
    {
      question: "How do I complain about a Royapuram address?",
      answer:
        "Confirm the GCC ward number first — the heritage name is not a ward. Then use official GCC channels. Our zone finder is a starting point only.",
    },
    {
      question: "Does this page list live councillor contacts?",
      answer:
        "No. We do not invent or scrape councillor names. Use official GCC councillor / ward pages for contacts.",
    },
  ],
};
