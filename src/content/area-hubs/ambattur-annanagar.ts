import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { homeMapUrlForHub } from "@/lib/area-hubs/geography";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "ambattur-annanagar";
const VISUALS = visualPackForHub(SLUG)!;

export const AMBATTUR_ANNANAGAR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "Anna Nagar and Ambattur area guide: planned avenues, Green Line metro feeders, Ambattur Industrial Estate MSME hiring, western lakes and monsoon notes, news and jobs.",
  identityLine: "West Chennai residential grid and MSME spine",
  heroDek:
    "Anna Nagar’s planned avenues and Ambattur’s industrial estates share the same west Chennai metro and bus feeders — family neighbourhoods next to tooling and light manufacturing, not a beach belt or T. Nagar bazaar.",
  heroImage: VISUALS.heroImage,
  heroImageAlt: VISUALS.heroImageAlt,
  mapBlurb:
    "Anna Nagar grid and Ambattur industrial wards highlight together — tap Thirumangalam and the estate roads, then open jobs and civic news for this west belt.",
  statChips: [
    { label: "Residential", value: "Anna Nagar planned grid" },
    { label: "Industry", value: "Ambattur Industrial Estate / MSME" },
    { label: "Metro", value: "Green Line: Thirumangalam · Anna Nagar · Shenoy Nagar" },
    { label: "Monsoon", value: "Western lakes & storm-water channels" },
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
  aboutTitle: "About Ambattur and Anna Nagar",
  aboutSubtitle:
    "A planned residential township beside one of Chennai’s largest MSME estates.",
  aboutParagraphs: [
    "**Anna Nagar** is west Chennai’s best-known planned neighbourhood: numbered avenues, parks, and a grid that still orients family life. Metro stations on the Green Line (**Thirumangalam, Anna Nagar Tower, Anna Nagar East, Shenoy Nagar**) make it a default residential reference for people who work toward Koyambedu, CMBT, or the city centre.",
    "**Ambattur** sits further west with **Ambattur Industrial Estate** and surrounding MSME / tooling corridors. Hiring spikes in light manufacturing, logistics, and workshop trades show up on our Jobs hub. Factory clocks and Anna Nagar school clocks share the same feeders — peak hours are not identical.",
    "The two names are one west Chennai labour market. Residents often live in Anna Nagar or Mogappair and work the estate; estate staff reverse-commute. Civic stress is **western storm-water and lake bunds**, not Adyar estuary flooding or T. Nagar festival parking.",
    "This page is independent editorial context. Confirm GCC ward numbers and industrial-estate gate rules on official channels.",
  ],
  corridorFacts: [
    { label: "Residential core", value: "Anna Nagar avenues and tower blocks" },
    { label: "Industrial core", value: "Ambattur Industrial Estate and adjoining MSME units" },
    { label: "Metro feeders", value: "Green Line through Thirumangalam–Anna Nagar–Shenoy Nagar" },
    { label: "Bus node", value: "Toward Koyambedu / CMBT for mofussil and city buses" },
    { label: "Monsoon", value: "Western lakes, channels, and bund maintenance" },
    { label: "Hiring mix", value: "Office / retail in the grid; tooling and logistics in the estate" },
    { label: "Housing", value: "Planned plots, apartments, and estate-adjacent worker housing" },
    { label: "Not this hub", value: "OMR IT parks, T. Nagar bazaars, Adyar coast" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "Green Line metro",
      value:
        "Thirumangalam, Anna Nagar Tower, Anna Nagar East, and Shenoy Nagar stations feed this belt. Confirm CMRL service notices before peak office hours — this is not OMR Phase-2 construction, but station crowding at CMBT transfers still matters.",
    },
    {
      label: "Koyambedu / CMBT",
      value:
        "West Chennai’s bus super-node sits next door. Mofussil and city buses stack here; delays ripple into Anna Nagar avenues and Ambattur estate roads.",
    },
    {
      label: "Estate last mile",
      value:
        "Ambattur Industrial Estate still depends on share autos, two-wheelers, and factory shuttles from the metro or GST-adjacent arterials. Gate timings are employer-specific — this site does not publish them.",
    },
    {
      label: "Inner Ring / western arterials",
      value:
        "Western arterial and Inner Ring movements connect Ambattur toward Porur and Madhavaram. Flyover works mean frequent detours — use official traffic channels, not screenshot forwards.",
    },
    {
      label: "School vs shift peaks",
      value:
        "Anna Nagar school vans and Ambattur shift changes do not coincide. Plan the opposite peak if you reverse-commute.",
    },
  ],
  civicWatchlist: [
    "**Western storm-water channels and lake bunds** — northeast monsoon notes here differ from Adyar estuary and Pallikaranai marsh. Watch GCC desilting when they publish.",
    "**Industrial-estate access and freight** — lorry movements and gate queues are local; they are not T. Nagar pedestrian stories.",
    "**MSME hiring spikes** — tooling, logistics, and workshop roles appear on Jobs; verify the unit address inside the estate.",
    "**Metro last-mile crowding** at Thirumangalam and Anna Nagar stations during office peaks.",
    "**Ward vs township name** — “Anna Nagar” and “Ambattur” span many wards; confirm the number before filing a complaint.",
  ],
  civicTitle: "What to watch in Anna Nagar and Ambattur",
  lifestyleNotes: [
    "The grid is family-evening oriented; the estate is shift-oriented. Shared metro feeders make them feel like one west Chennai.",
    "Do not reuse OMR apartment-town or T. Nagar festival checklists here.",
  ],
  practicalGuides: [
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "MSME, logistics, and west Chennai office roles",
    },
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "Civic and monsoon stories tagged west when available",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Rentals and neighbourhood wanted posts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Community dates in the grid",
    },
    {
      label: "Open on city map",
      href: homeMapUrlForHub(SLUG),
      hint: "Highlight Anna Nagar–Ambattur wards",
    },
    {
      label: "Salary guide 2026",
      href: "/guides/chennai-salary-guide-2026",
      hint: "Directional CTC — Ambattur corridor note included",
    },
  ],
  partnerLinks: [],
  relatedHubSlugs: [
    "madhavaram-madhavaram",
    "valasaravakkam-porur",
    "teynampet-nungambakkam",
  ],
  faq: [
    {
      question: "Is Anna Nagar the same as Ambattur?",
      answer:
        "No. Anna Nagar is the planned residential grid with Green Line metro stations. Ambattur includes the industrial estate and MSME corridors further west. This hub covers both because they share west Chennai feeders and a labour market.",
    },
    {
      question: "Which Metro stations serve this belt?",
      answer:
        "On the Green Line, Thirumangalam, Anna Nagar Tower, Anna Nagar East, and Shenoy Nagar are the usual stops. Confirm the live CMRL map for your trip — Ambattur estate last-mile is still auto or shuttle from those stations or from bus nodes toward Koyambedu.",
    },
    {
      question: "Where do MSME and factory jobs show up?",
      answer:
        "Open roles we list appear on the Chennai jobs hub. Ambattur Industrial Estate hiring is address-specific — ask for the unit / plot, not only “Ambattur.”",
    },
    {
      question: "How does monsoon flooding differ here?",
      answer:
        "West Chennai stories often involve lake bunds and storm-water channels, not the Adyar estuary or Pallikaranai marsh. Use GCC notices for your ward; this page is not a live flood warning.",
    },
    {
      question: "Is CMBT part of this hub?",
      answer:
        "Koyambedu / CMBT is the neighbouring bus super-node that feeds this belt. Treat delays there as west Chennai news even when the station name is not “Anna Nagar.”",
    },
    {
      question: "Is this an official GCC page?",
      answer:
        "No. mychennaicity.in is independent. Civic notes are editorial — confirm ward numbers and estate rules on official channels.",
    },
  ],
};
