import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "teynampet-nungambakkam";
const VISUALS = visualPackForHub(SLUG)!;

export const TEYNAMPET_NUNGAMBAKKAM_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Teynampet and Nungambakkam area guide: hospitals, consulates, cultural venues, Mount–Cathedral traffic, VIP closures, central Chennai news and classifieds on mychennaicity.in.",
  identityLine: "Hospitals, consulates, and the Mount–Cathedral civic core",
  heroDek:
    "Teynampet and Nungambakkam sit against Chennai’s civic core — hospitals, hotels, consulates, and halls — so VIP movements and marathon closures hit these wards first, unlike OMR shift traffic or T. Nagar festival shopping.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Teynampet and Nungambakkam wards highlight together — tap Mount Road / Cathedral approaches, then open politics, events, and civic news for the centre.",
  statChips: [
    { label: "Adjacency", value: "CBD · courts · Secretariat approaches" },
    { label: "Care", value: "Hospital and hotel cluster" },
    { label: "Culture", value: "Halls, museums, galleries" },
    { label: "Closures", value: "VIP movements · marathons" },
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
  aboutTitle: "About Teynampet and Nungambakkam",
  aboutSubtitle:
    "Central Chennai’s civic-and-culture belt — not a retail bazaar and not an IT corridor.",
  aboutParagraphs: [
    "**Nungambakkam** is hospital-, hotel-, and consulate-dense, with CBD spillover. Road closures for VIP movements, processions, and city runs hit this belt first. Residents plan evenings around those calendars as much as office clocks.",
    "**Teynampet** (GCC Zone IX) sits on Mount Road / Anna Salai approaches toward Nandanam and the cultural venues. Metro stations on the Green Line make it a default central-Chennai transfer — last-mile is still auto or a short walk through hotel and hospital gates.",
    "Evening culture at halls, museums, and galleries shares **Mount–Cathedral** traffic with school and clinic peaks. Central election and policy stories often cite these wards; open Politics and Chennai news for that thread.",
    "Independent editorial context. Confirm ward numbers and official traffic police / hospital notices. We do not publish live VIP movement feeds.",
  ],
  corridorFacts: [
    { label: "Named arterials", value: "Anna Salai (Mount Road) · Cathedral Road" },
    { label: "GCC ref", value: "Teynampet Zone IX" },
    { label: "Institutions", value: "Hospitals, hotels, consulates" },
    { label: "Culture", value: "Halls, museums, galleries" },
    { label: "Metro", value: "Green Line toward Teynampet / Nandanam — confirm CMRL" },
    { label: "Closure pattern", value: "VIP, marathon, and procession first-hit" },
    { label: "Housing", value: "Older apartments, independent houses, hotel-adjacent stock" },
    { label: "Not this hub", value: "T. Nagar retail core, OMR IT, Adyar coast" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Mount–Cathedral",
      value:
        "Anna Salai and Cathedral Road are the weekday spine. Clinic appointments, hotel check-outs, and evening shows stack at the same pinch points. A single VIP movement can erase a 20-minute hop.",
    },
    {
      label: "Green Line metro",
      value:
        "Teynampet / Nandanam approaches are the usual rail story. Confirm the live CMRL map — station names and neighbourhood names are not one-to-one with hospital gates.",
    },
    {
      label: "Toward T. Nagar / Kodambakkam",
      value:
        "Retail and film-adjacent trips continue into the neighbouring hub. Festival eves on that side back onto these junctions.",
    },
    {
      label: "Toward Adyar",
      value:
        "South hops via Cathedral / Greenways connectors. Do not treat this hub as the Adyar campus-and-beach guide.",
    },
    {
      label: "MTC & last mile",
      value:
        "Buses run the arterials; last-mile from metro exits to hospital or consulate gates is still auto or walk. Parking fails first on culture evenings.",
    },
  ],
  civicWatchlist: [
    "**VIP movements and marathon closures** — these wards are first-hit; check traffic police notes before a timed appointment.",
    "**Hospital-gate congestion** — ambulance access and visitor parking are not T. Nagar pedestrian stories.",
    "**Culture-evening parking** around halls and galleries — pair with the Events calendar.",
    "**Central election and policy citations** — stories often name these wards; open Politics for the thread.",
    "**Ward vs “Nungambakkam” postal name** — confirm the GCC ward number before a civic complaint.",
  ],
  civicTitle: "What to watch in Teynampet and Nungambakkam",
  lifestyleNotes: [
    "Weekdays follow clinic and office clocks; evenings follow halls and hotels. Weekends add city-run and procession surprises.",
    "This is not Pondy Bazaar retail and not OMR housing.",
  ],
  practicalGuides: [
    {
      label: "Politics & policy news",
      href: "/chennai-local-news/topic/politics",
      hint: "Central Chennai stories often cite these wards",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Halls, talks, and cultural dates",
    },
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Civic and city-centre reports",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Hospitality, healthcare, and office roles",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Teynampet–Nungambakkam wards",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Central-neighbourhood wanted posts",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "royapuram-tondiarpet",
    "kodambakkam-t-nagar",
    "adyar-thiruvanmiyur",
  ],
  faq: [
    {
      question: "Which neighbourhoods does this Teynampet hub cover?",
      answer:
        "Teynampet and Nungambakkam — hospitals, consulates, Mount–Cathedral approaches, and nearby cultural venues. It is not the T. Nagar bazaar guide and not Adyar’s campus-and-beach belt.",
    },
    {
      question: "Why do roads close so often here?",
      answer:
        "VIP movements, processions, and city marathons use these arterials first. Hospital and hotel gates sit on the same roads. Check traffic police notices; this page does not publish a live closure feed.",
    },
    {
      question: "Which Metro stations serve this belt?",
      answer:
        "Green Line stops toward Teynampet and Nandanam are the usual rail approaches. Confirm CMRL maps — a hospital or hall name is not a station name.",
    },
    {
      question: "Where do culture events show up?",
      answer:
        "Concerts, talks, and civic programmes appear on the Chennai local events hub and are tagged here when they land in these wards.",
    },
    {
      question: "Is this an official government page?",
      answer:
        "No. mychennaicity.in is independent. Policy and politics links are editorial — verify notices on official Secretariat / GCC / police channels.",
    },
    {
      question: "How do I file a civic complaint here?",
      answer:
        "Confirm your GCC ward number first — “Nungambakkam” is not a ward. Use official channels; our civic tools are a starting point only.",
    },
  ],
};
