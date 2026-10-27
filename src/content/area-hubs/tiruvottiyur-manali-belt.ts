import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "tiruvottiyur-manali-belt";
const VISUALS = visualPackForHub(SLUG)!;

export const TIRUVOTTIYUR_MANALI_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Tiruvottiyur and Manali area guide: north coastal wards, fishing harbour links, Ennore–Manali industry, freight pinch points, civic flood notes, news and classifieds on mychennaicity.in.",
  identityLine: "North coast, harbour clocks, and the Ennore–Manali industrial edge",
  heroDek:
    "Tiruvottiyur’s coastal wards sit next to Manali and Ennore industry — fishing harbour mornings, port-bound lorries, and air-quality stories that do not match Adyar beaches or Anna Nagar’s planned grid.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Tiruvottiyur, Manali, and the Ennore-adjacent wards highlight together — tap the harbour coast and industrial belt, then open civic news tagged north.",
  statChips: [
    { label: "Coast", value: "Tiruvottiyur · fishing harbour links" },
    { label: "Industry", value: "Manali · Ennore adjacency" },
    { label: "Traffic", value: "Port-bound lorries & northern MTC" },
    { label: "Watch", value: "Air quality · freight · monsoon channels" },
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
  aboutTitle: "About Tiruvottiyur and Manali",
  aboutSubtitle:
    "North Chennai’s harbour-and-industry belt — not a south-city IT corridor.",
  aboutParagraphs: [
    "**Tiruvottiyur** is a north coastal neighbourhood with fishing harbour links, older residential streets, and suburban-rail adjacency. Daily clocks here follow auctions, harbour traffic, and MTC corridors toward Royapuram and the city — not OMR shuttle shifts.",
    "**Manali** and the **Ennore** edge are industrial: petrochemical and port-adjacent units, freight, and resettlement stories sit beside worker housing. Air-quality, chemical-safety, and lorry-detour notices matter as much as street-level civic complaints.",
    "Treat the two names as one north labour market. Residents often live in Tiruvottiyur and work toward Manali or the harbour; industrial staff reverse-commute. Civic stress is **coastal channels plus industrial freight**, not T. Nagar festival parking or Pallikaranai marsh flooding.",
    "This page is independent editorial context. Confirm GCC ward numbers and official industrial / pollution-control notices before acting — we do not publish live AQI feeds or councillor names.",
  ],
  corridorFacts: [
    { label: "Coastal core", value: "Tiruvottiyur wards and harbour-adjacent streets" },
    { label: "Industrial core", value: "Manali and Ennore-adjacent units" },
    { label: "GCC refs", value: "Thiruvottiyur (Zone I) · Manali (Zone II)" },
    { label: "Named traffic", value: "Port-bound lorries and northern MTC spines" },
    { label: "Rail edge", value: "North suburban / harbour-adjacent stations — confirm Southern Railway maps" },
    { label: "Water", value: "Northern storm-water channels and coastal flood notes" },
    { label: "Housing", value: "Older coastal streets, worker housing, resettlement pockets" },
    { label: "Not this hub", value: "OMR IT parks, Adyar campus-and-beach, T. Nagar retail" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Northern MTC",
      value:
        "Bus corridors toward Royapuram, Broadway, and the city centre carry mixed passenger and last-mile industrial traffic. Terminal upgrades and diversions change pinch points — verify official MTC / traffic notes before a long commute.",
    },
    {
      label: "Port & freight",
      value:
        "Lorries bound for harbour and industrial gates stack on the same roads as school and shift traffic. Peak hours here are freight-shaped, not only office clocks.",
    },
    {
      label: "Suburban rail edge",
      value:
        "North-line suburban stations serve parts of this belt. Do not assume a Chennai Metro station from the neighbourhood name — confirm Southern Railway and CMRL maps for your trip.",
    },
    {
      label: "Toward Madhavaram / Royapuram",
      value:
        "West and south hops often land in the Madhavaram wholesale cluster or Royapuram–Tondiarpet harbour wards. Treat neighbouring hubs as one north Chennai labour market.",
    },
    {
      label: "Monsoon last mile",
      value:
        "Share autos and two-wheelers still cover lane last-mile. Coastal waterlogging can cut those hops faster than inland lake flooding — plan extra time when GCC issues north drainage notes.",
    },
  ],
  civicWatchlist: [
    "**Air quality and industrial safety notices** near Manali / Ennore — verify TNPCB / official alerts; this page is not a live sensor dashboard.",
    "**Port-bound freight detours** — lorry queues and road cuts are local; they are not T. Nagar pedestrian stories.",
    "**Fishing harbour and coastal ward calendars** — auctions, resettlement follow-ups, and festival crowds can land in the same week.",
    "**Northern storm-water channels** — flood notes here differ from Adyar estuary and west-Chennai lake bunds.",
    "**Ward vs neighbourhood name** — “Tiruvottiyur” and “Manali” span more than one GCC ward; confirm the number before a complaint.",
  ],
  civicTitle: "What to watch on the Tiruvottiyur–Manali belt",
  lifestyleNotes: [
    "Weekdays mix harbour mornings with industrial shift changes; weekends still carry freight on some spines.",
    "Do not reuse Adyar beach or OMR apartment-town checklists here.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "North civic, mobility, and industry stories when tagged",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Industrial, logistics, and north Chennai listings",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Rentals and neighbourhood wanted posts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Community dates that land north",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Tiruvottiyur–Manali wards",
    },
    {
      label: "Flood street-score",
      href: "/civic-tools/flood-street-score",
      hint: "Editorial monsoon context — not a live warning",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: ["madhavaram-madhavaram", "royapuram-tondiarpet"],
  faq: [
    {
      question: "Which neighbourhoods does this Tiruvottiyur hub cover?",
      answer:
        "This page centres on Tiruvottiyur’s coastal wards and Manali’s industrial / Ennore-adjacent pockets. It is not an OMR, Adyar, or Anna Nagar guide.",
    },
    {
      question: "How is flooding here different from south or west Chennai?",
      answer:
        "Water here is tied to northern storm-water channels and the coast — not the Adyar estuary, Pallikaranai marsh, or Porur lake bunds. Use GCC and PWD notices for your ward; this page is editorial only.",
    },
    {
      question: "Is there Metro rail on this belt?",
      answer:
        "Daily rail here is mainly north suburban / harbour-adjacent stations. Do not assume a Chennai Metro stop from the neighbourhood name — confirm CMRL and Southern Railway maps.",
    },
    {
      question: "Where do industrial and logistics jobs show up?",
      answer:
        "Open roles we list appear on the Chennai jobs hub. Manali / Ennore hiring is address-specific — ask for the unit or gate, not only “Manali.”",
    },
    {
      question: "How do I file a civic complaint for a Tiruvottiyur address?",
      answer:
        "Confirm your GCC ward on official channels first — the postal name is not a ward number. Then use our zone & ward finder and responsibility router as a starting point, not as an official filing desk.",
    },
    {
      question: "Does mychennaicity.in cover events in this belt?",
      answer:
        "Yes. Community programmes and civic dates that land in Tiruvottiyur or Manali appear on the Chennai local events hub and are tagged here when relevant.",
    },
  ],
};
