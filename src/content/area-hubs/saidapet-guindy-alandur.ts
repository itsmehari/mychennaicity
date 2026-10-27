import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "saidapet-guindy-alandur";
const VISUALS = visualPackForHub(SLUG)!;

export const SAIDAPET_GUINDY_ALANDUR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Saidapet, Guindy and Alandur area guide: metro interchanges, GST and airport-edge traffic, IT adjacency, civic water-supply notes, news and classifieds on mychennaicity.in.",
  identityLine: "Guindy interchange, GST, and the airport-edge transfer belt",
  heroDek:
    "Saidapet, Guindy, and Alandur are where metro, MTC, GST traffic, and airport-bound hops meet — a south–west transfer belt, not a beach campus and not an OMR apartment town (though IT parks sit next door).",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Saidapet, Guindy, and Alandur wards highlight together — tap the interchange and airport-edge connectors, then open mobility news for this gateway.",
  statChips: [
    { label: "Interchange", value: "Guindy metro · MTC · GST" },
    { label: "Airport edge", value: "Alandur / GST toward the terminals" },
    { label: "IT adjacency", value: "Parks toward the airport / OMR feed" },
    { label: "Bellwether", value: "Water supply · metro works" },
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
  aboutTitle: "About Saidapet, Guindy, and Alandur",
  aboutSubtitle:
    "South–west Chennai’s transfer gateway — disruptions here ripple city-wide.",
  aboutParagraphs: [
    "**Guindy** is a multimodal pinch point: metro, MTC, GST (Grand Southern Trunk Road), and airport-bound traffic. Consultancy and construction stories about a larger interchange matter because delays here travel to Adyar, OMR, and the west in the same hour.",
    "**Alandur** sits on the airport-edge and metro-transfer side of that story. Satellite-terminal road links and flyover works change arrival plans — confirm highways and CMRL notices, not screenshot forwards.",
    "**Saidapet** is mixed residential–commercial on the river-adjacent / GST approach. Water-supply and metro-construction updates often show up here first as a south-city bellwether. Map data also folds some southern-gateway / Tambaram-adjacent locality seeds into this hub for navigation — treat those as connectors, not as “Saidapet is Tambaram.”",
    "Independent editorial context. We do not invent live train ETAs or councillor names. Verify CMRL, highways, and GCC channels.",
  ],
  corridorFacts: [
    { label: "Interchange", value: "Guindy metro / bus / GST pinch point" },
    { label: "Airport edge", value: "Alandur and GST toward the terminals" },
    { label: "GCC ref", value: "Alandur Zone XII" },
    { label: "Named arterial", value: "GST (NH45 / Grand Southern Trunk Road)" },
    { label: "IT adjacency", value: "Parks toward the airport edge and OMR feed" },
    { label: "Residential mix", value: "Saidapet blocks + interchange-adjacent apartments" },
    { label: "Southern connectors", value: "Toward Tambaram / Chengalpattu radials" },
    { label: "Not this hub", value: "Adyar beach campuses, T. Nagar bazaars, Porur lake belt" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Guindy interchange",
      value:
        "Metro, MTC, and GST traffic meet here. A single breakdown or construction window ripples across south and west Chennai. Confirm CMRL and traffic police notes before a timed airport or office hop.",
    },
    {
      label: "Airport-edge roads",
      value:
        "Alandur and GST approaches change when flyover or satellite-terminal links are under work. This is not the same jam pattern as OMR’s Sholinganallur junction.",
    },
    {
      label: "Toward OMR / Adyar",
      value:
        "IT and campus trips leave this hub east and south-east. Treat the OMR and Adyar hubs as neighbouring labour markets, not as this page’s core identity.",
    },
    {
      label: "Toward T. Nagar / Porur",
      value:
        "West and north-west hops share Inner Ring and GST-link traffic. Festival eves on the T. Nagar side and lake-belt peaks on the Porur side both back onto Guindy.",
    },
    {
      label: "Last mile",
      value:
        "Share autos still cover Saidapet lanes and industrial-estate edges. Metro exits are not door-to-door — budget a transfer.",
    },
  ],
  civicWatchlist: [
    "**Interchange disruptions** — metro construction, bus-bay moves, and GST works are city-wide news when they land here.",
    "**Airport-edge road links** — confirm highways notices for satellite-terminal and flyover changes.",
    "**Water supply in Saidapet mixed blocks** — a south-city bellwether; not the same as west-Chennai lake bunds.",
    "**IT-park hiring cycles** toward the airport edge — pair with the Jobs hub; verify the campus address.",
    "**Ward vs interchange name** — “Guindy” and “Alandur” are not ward numbers; confirm GCC before filing.",
  ],
  civicTitle: "What to watch in Saidapet, Guindy, and Alandur",
  lifestyleNotes: [
    "Weekdays are transfer-shaped: airport, IT, and GST clocks. Evenings are mixed residential, not beach or bazaar.",
    "Do not reuse Adyar campus or T. Nagar festival checklists here.",
  ],
  practicalGuides: [
    {
      label: "Mobility news",
      href: "/chennai-local-news/topic/mobility",
      hint: "Metro, GST, and airport-edge stories",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "IT-adjacent and south–west listings",
    },
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Civic and interchange reports",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Rentals near the transfer belt",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Saidapet–Guindy–Alandur wards",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Dates that use these venues or halls",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "kodambakkam-t-nagar",
    "adyar-thiruvanmiyur",
    "omr-perungudi-sholinganallur",
    "valasaravakkam-porur",
  ],
  faq: [
    {
      question: "What does this Saidapet–Guindy hub cover?",
      answer:
        "Saidapet’s mixed blocks, the Guindy interchange, and Alandur’s airport-edge / metro-transfer side. Southern-gateway localities may appear on the map as connectors. It is not the Adyar beach guide and not the OMR apartment-town guide.",
    },
    {
      question: "Why do delays here affect the whole south?",
      answer:
        "Guindy stacks metro, MTC, GST, and airport-bound traffic. A jam or construction window travels toward Adyar, OMR, and the west in the same peak hour.",
    },
    {
      question: "Is the airport in this hub?",
      answer:
        "The terminals sit on the edge of this story. Alandur and GST approaches are the usual last stretch. Confirm official airport and highways maps — this page is not a flight or parking desk.",
    },
    {
      question: "Where do IT jobs near Guindy show up?",
      answer:
        "Open roles we list appear on the Chennai jobs hub. Ask for the park or campus name — “Guindy” alone can mean the interchange, an estate, or a neighbouring OMR hop.",
    },
    {
      question: "How is water supply talked about here?",
      answer:
        "Saidapet mixed blocks are often a bellwether for south-city supply and metro-construction disruption. That is different from Porur lake-bund flooding. Use Metro Water / GCC notices for your street.",
    },
    {
      question: "Is this an official CMRL or GCC page?",
      answer:
        "No. mychennaicity.in is independent. Interchange notes are editorial — verify diversions on official CMRL, highways, and GCC channels.",
    },
  ],
};
