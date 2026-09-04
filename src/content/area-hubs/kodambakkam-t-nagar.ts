import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "kodambakkam-t-nagar";
const VISUALS = visualPackForHub(SLUG)!;

export const KODAMBAKKAM_T_NAGAR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "T. Nagar and Kodambakkam area guide: Pondy Bazaar, Ranganathan Street, festival retail peaks, Kodambakkam film-adjacent work, gold-street context, news and classifieds.",
  identityLine: "Retail heart and film-adjacent evening economy",
  heroDek:
    "T. Nagar’s bazaars and Kodambakkam’s night-shift services sit in the same south–west Chennai labour market — festival parking, jewellery streets, and film-adjacent irregular hours, not an IT corridor or a beach belt.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "T. Nagar, Pondy Bazaar, and Kodambakkam wards highlight together — tap Ranganathan Street and Arcot Road, then open news and classifieds for this retail belt.",
  statChips: [
    { label: "Retail core", value: "Pondy Bazaar · Ranganathan Street" },
    { label: "West spine", value: "Kodambakkam High Road / Arcot Road" },
    { label: "Peaks", value: "Festival shopping & wedding season" },
    { label: "Work hours", value: "Day retail + night film-adjacent shifts" },
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
  aboutTitle: "About Kodambakkam and T. Nagar",
  aboutSubtitle:
    "Chennai’s densest shopping streets next to a film-services evening economy.",
  aboutParagraphs: [
    "**T. Nagar (Thyagaraya Nagar)** is still the city’s default apparel and jewellery destination: **Pondy Bazaar**, **Ranganathan Street**, and surrounding gold and silk streets fill on festival eves and wedding season. Pedestrian crossings and parking fail first — metro or a last-mile walk usually beats circling for a slot.",
    "**Kodambakkam** sits west along **Kodambakkam High Road / Arcot Road**. The neighbourhood is historically film-adjacent: studios, post-production, and night-shift services mean irregular hours that do not match T. Nagar shop clocks. Job seekers should verify employers on official pages, not third-party WhatsApp reposts.",
    "The two names share one labour and retail market. Residents often live in Kodambakkam or Vadapalani and shop T. Nagar; film crews and retail staff commute the other way. Civic complaints (encroachment, parking, waste) spike on the same festival calendar as sales.",
    "This hub is independent editorial context. Confirm ward numbers and licences on official GCC / police channels before acting.",
  ],
  corridorFacts: [
    { label: "Retail core", value: "T. Nagar — Pondy Bazaar, Ranganathan Street" },
    { label: "West neighbour", value: "Kodambakkam / Vadapalani along Arcot Road" },
    { label: "Consumer beat", value: "Apparel, gold, electronics — city-wide price stories often start here" },
    { label: "Evening economy", value: "Film-adjacent services + late retail" },
    { label: "Peak calendar", value: "Diwali, Pongal, wedding season, weekend evenings" },
    { label: "Transit habit", value: "Metro to nearby stations + walk / share auto last mile" },
    { label: "Housing", value: "Dense mixed-use blocks, older apartments, commercial ground floors" },
    { label: "Not this hub", value: "OMR IT parks, Adyar estuary, Anna Nagar grid" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Last mile to T. Nagar",
      value:
        "Chennai Metro stations on the Green Line (Nandanam, Teynampet, and westward toward Vadapalani) are the usual rail approach — T. Nagar’s bazaar core is still a walk or share-auto from the platform. Confirm CMRL maps; do not assume a station named after every market street.",
    },
    {
      label: "Pondy Bazaar / Ranganathan Street",
      value:
        "Festival peaks close lanes and exhaust parking. Come by metro or bus and walk the last stretches; circling in a car is how most visitors lose an hour.",
    },
    {
      label: "Kodambakkam High Road",
      value:
        "Arcot Road / Kodambakkam High Road carries west-side through-traffic toward Vadapalani and Ashok Nagar. Night-shift film and studio traffic does not match morning retail peaks.",
    },
    {
      label: "MTC",
      value:
        "Bus density is high on bazaar approaches; boarding is slower on festival eves. Use official MTC / traffic notices for diversions, not WhatsApp screenshots.",
    },
    {
      label: "Toward Guindy / central",
      value:
        "Saidapet and Guindy interchanges sit south; central Chennai is a short metro hop. Treat neighbouring hubs as one commute, not three separate cities.",
    },
  ],
  civicWatchlist: [
    "**Festival parking and pedestrian crossings** on Pondy Bazaar and Ranganathan Street — police and GCC diversions change every season; verify the day’s notice.",
    "**Encroachment and waste** on commercial streets after sale days — hyperlocal, not an OMR apartment-town story.",
    "**Jewellery and consumer-price chatter** — use our gold-rate hub for planning numbers; invoice rates live at the counter.",
    "**Night-shift hiring** in Kodambakkam — verify the employer and workplace address; this belt attracts copy-paste job forwards.",
    "**Ward vs market name** — “T. Nagar” is not a single GCC ward; confirm the number before a complaint.",
  ],
  civicTitle: "What to watch in T. Nagar and Kodambakkam",
  lifestyleNotes: [
    "Shop clocks and film-service clocks overlap on the same roads — expect evening congestion even when offices elsewhere have gone home.",
    "This is not Adyar’s campus-and-beach pattern and not Ambattur’s MSME estate pattern.",
  ],
  practicalGuides: [
    {
      label: "Chennai gold rate",
      href: "/chennai-gold-rate",
      hint: "Indicative 22K / 24K — confirm making charges at the counter",
    },
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Consumer, civic, and market stories",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Retail, services, and verified openings",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Neighbourhood wanted posts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Markets, exhibitions, and community dates",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight T. Nagar–Kodambakkam wards",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "teynampet-nungambakkam",
    "saidapet-guindy-alandur",
    "ambattur-annanagar",
  ],
  faq: [
    {
      question: "Is T. Nagar the same as Kodambakkam?",
      answer:
        "No. T. Nagar is the dense retail core (Pondy Bazaar, Ranganathan Street, jewellery streets). Kodambakkam sits west on Arcot Road / Kodambakkam High Road with a film-adjacent evening economy. This hub covers both because residents and workers treat them as one south–west market.",
    },
    {
      question: "When is T. Nagar most crowded?",
      answer:
        "Festival eves (especially Diwali shopping), wedding-season weekends, and Saturday evenings. Parking and crossings fail first. Metro plus a walk is usually faster than searching for a slot.",
    },
    {
      question: "How should I approach gold shopping here?",
      answer:
        "Use our Chennai gold-rate hub for a planning snapshot of 22K / 24K per gram. Making charges, wastage, and buy-back live at the jeweller’s invoice — this site is not IBJA and not a buy/sell signal.",
    },
    {
      question: "Are Kodambakkam film jobs listed here?",
      answer:
        "Open roles that we publish appear on the Chennai jobs hub. Treat unknown WhatsApp “studio hiring” forwards as unverified. Ask for a workplace address and a named employer.",
    },
    {
      question: "Which Metro station should I use for Pondy Bazaar?",
      answer:
        "Green Line stations toward Nandanam / Teynampet / Vadapalani are the usual rail approaches; the bazaar itself is last-mile. Confirm the current CMRL map — station names and bazaar names are not one-to-one.",
    },
    {
      question: "Is this an official Corporation page?",
      answer:
        "No. mychennaicity.in is independent. Civic notes here are editorial — verify ward numbers, licences, and diversions on official GCC and police channels.",
    },
  ],
};
