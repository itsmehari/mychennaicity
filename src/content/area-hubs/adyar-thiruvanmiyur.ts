import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "adyar-thiruvanmiyur";
const VISUALS = visualPackForHub(SLUG)!;

export const ADYAR_THIRUVANMIYUR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Adyar to Thiruvanmiyur area guide: LB Road, Adyar estuary, campuses, Besant Nagar beach, MRTS, civic flood notes, local news and classifieds on mychennaicity.in.",
  identityLine: "Coastal campuses, avenues, and the Adyar estuary",
  heroDek:
    "From the Adyar river mouth through Besant Nagar and Thiruvanmiyur, this belt is classic south Chennai: tree-lined avenues, research campuses, beach evenings, and monsoon water that does not behave like west-Chennai lakes.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Adyar, Besant Nagar, and Thiruvanmiyur wards highlight together — tap the estuary and LB Road stretch, then jump into news tagged for this coast.",
  statChips: [
    { label: "Spine", value: "LB Road · Lattice Bridge" },
    { label: "Water", value: "Adyar estuary & Buckingham Canal edges" },
    { label: "Rail", value: "MRTS: Indira Nagar · Thiruvanmiyur" },
    { label: "Weekend", value: "Elliot’s Beach / Besant Nagar" },
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
  aboutTitle: "About Adyar to Thiruvanmiyur",
  aboutSubtitle:
    "South Chennai’s campus-and-coast belt — not an IT corridor and not a retail bazaar.",
  aboutParagraphs: [
    "**Adyar** grew around the river of the same name, research campuses (IIT Madras, CLRI, and neighbouring labs), and older residential avenues. **Thiruvanmiyur** and **Besant Nagar** sit closer to the Bay — beach traffic, Theosophical Society / Kalakshetra calendars, and ECR weekend flows.",
    "Daily life here is split between **LB Road** (Lattice Bridge Road) through-traffic, short hops to **Kotturpuram / Kasturba Nagar** MRTS, and last-mile autos toward offices in Guindy or OMR. Families often live in one locality and school or work two exits away.",
    "Civic stress is **coastal and estuary-shaped**: Adyar river mouth, Buckingham Canal edges, and beach erosion stories do not match Ambattur lake bunds or OMR–Pallikaranai marsh flooding. Confirm GCC / PWD / highways notices for your ward — apartment names often straddle boundaries.",
    "This hub is for residents, campus visitors, and anyone following south Chennai civic and event listings. It is independent editorial context, not an official GCC page.",
  ],
  corridorFacts: [
    { label: "Core stretch", value: "Adyar · Besant Nagar · Thiruvanmiyur" },
    { label: "Named arterial", value: "LB Road (Lattice Bridge Road)" },
    { label: "Water bodies", value: "Adyar river / estuary; canal edges toward the coast" },
    { label: "Campuses", value: "IIT Madras and neighbouring research institutions" },
    { label: "Beach node", value: "Elliot’s Beach / Besant Nagar" },
    { label: "East connector", value: "ECR toward coastal weekend traffic" },
    { label: "West / north feed", value: "Toward Guindy, Saidapet, and central Chennai" },
    { label: "Housing pattern", value: "Independent houses, older apartments, coastal high-rises" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "MRTS",
      value:
        "Indira Nagar and Thiruvanmiyur MRTS stations serve this belt; Kasturba Nagar and Kotturpuram are short hops toward Adyar. Confirm suburban-rail bulletins for weekend beach crowds.",
    },
    {
      label: "LB Road",
      value:
        "Lattice Bridge Road is the weekday spine — campus clocks, school vans, and beach-bound evenings stack at the same pinch points. Plan extra time when events land at Besant Nagar.",
    },
    {
      label: "ECR crossover",
      value:
        "East Coast Road traffic from Thiruvanmiyur toward the coast backs onto local roads on weekends and festival evenings — not the same jam pattern as OMR’s Sholinganallur junction.",
    },
    {
      label: "MTC & share autos",
      value:
        "Bus routes run LB Road and beach connectors; last-mile from campus gates and apartment lanes still relies on share autos and short walks.",
    },
    {
      label: "Toward Guindy / OMR",
      value:
        "Office trips often leave this hub toward Guindy interchanges or OMR via Thiruvanmiyur–Perungudi connectors — treat neighbouring hubs as one labour market.",
    },
  ],
  civicWatchlist: [
    "**Adyar estuary and river mouth** — flood and silt stories here are estuary-shaped; do not reuse west-Chennai lake checklists.",
    "**Beach erosion and crowd management** at Elliot’s Beach / Besant Nagar — GCC and police notices matter on festival and weekend peaks.",
    "**Buckingham Canal edges** — drainage and encroachment notes differ from OMR marsh adjacency.",
    "**Campus event parking** — IIT and cultural calendars overflow onto avenue parking; check organiser pages linked from Events.",
    "**Ward vs PIN** — Adyar postal names often span more than one GCC ward; confirm the ward number before a civic complaint.",
  ],
  civicTitle: "What to watch on the Adyar–Thiruvanmiyur coast",
  lifestyleNotes: [
    "Weekdays follow campus and school clocks; weekends pull beach and ECR traffic onto the same junctions.",
    "This is not T. Nagar retail and not OMR IT housing — civic and commute patterns are coastal and avenue-based.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Civic and coastal stories tagged here when available",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Open roles — campus and south Chennai listings",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Rentals, tuition, and neighbourhood wanted posts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Concerts, talks, and beach-adjacent dates",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Adyar–Thiruvanmiyur wards on the home map",
    },
    {
      label: "Flood street-score",
      href: "/civic-tools/flood-street-score",
      hint: "Editorial monsoon context — not a live warning",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "teynampet-nungambakkam",
    "saidapet-guindy-alandur",
    "omr-perungudi-sholinganallur",
  ],
  faq: [
    {
      question: "Which neighbourhoods does this Adyar hub cover?",
      answer:
        "This page centres on Adyar, Besant Nagar, and Thiruvanmiyur, including LB Road, the Adyar estuary, and beach-side wards. Nearby Kotturpuram and Kasturba Nagar often share the same commute. It is not an OMR or T. Nagar guide.",
    },
    {
      question: "How is flooding here different from west Chennai?",
      answer:
        "Water here is tied to the Adyar river mouth, canal edges, and coastal weather — not the same as Ambattur / Porur lake bunds or Pallikaranai marsh on OMR. Use GCC and PWD notices for your ward; this page is editorial context only.",
    },
    {
      question: "Is there Metro rail on this belt?",
      answer:
        "Daily rail here is mainly MRTS (Indira Nagar, Thiruvanmiyur, and nearby Kasturba Nagar / Kotturpuram). Do not assume a Chennai Metro station from the neighbourhood name — confirm CMRL maps before you plan a transfer.",
    },
    {
      question: "Where do weekend crowds come from?",
      answer:
        "Elliot’s Beach / Besant Nagar, campus public events, and ECR leisure traffic share LB Road. Peak hours are evening and weekend, not only IT shift changes.",
    },
    {
      question: "How do I file a civic complaint for an Adyar address?",
      answer:
        "Confirm your GCC ward on official channels first — postal “Adyar” is not a ward number. Then use our zone & ward finder and responsibility router as a starting point, not as an official filing desk.",
    },
    {
      question: "Does mychennaicity.in cover events in this belt?",
      answer:
        "Yes. Concerts, talks, and civic programmes that land in Adyar or Thiruvanmiyur appear on the Chennai local events hub and are tagged here when relevant.",
    },
  ],
};
