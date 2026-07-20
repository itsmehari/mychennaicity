import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { localityCardsForHub } from "@/lib/area-hubs/localities";
import { visualPackForHub } from "@/content/area-hubs/hub-visual-packs";

const SLUG = "omr-perungudi-sholinganallur";
const OMR_VISUALS = visualPackForHub(SLUG)!;

export const OMR_PERUNGUDI_SHOLINGANALLUR_HUB: RichAreaHubContent = {
  slug: SLUG,
  metaDescription:
    "OMR Perungudi to Sholinganallur area guide: IT corridor news, jobs, classifieds, metro Phase 2 updates, schools, flooding watchlist, and neighbourhood facts for Chennai's densest apartment-and-tech belt.",
  identityLine: "IT corridor & apartment towns on Rajiv Gandhi Salai",
  heroDek:
    "Rajiv Gandhi Salai from Perungudi through Sholinganallur is Chennai's busiest IT-and-apartment spine — metro construction, commute shuttles, schools, clinics, and civic stress all move faster here than in the core city.",
  heroImage: OMR_VISUALS.heroImage,
  heroImageAlt: OMR_VISUALS.heroImageAlt,
  mapBlurb:
    "Perungudi and Sholinganallur wards highlight on the city map — tap a ward for local context, then open news and jobs for this belt.",
  statChips: [
    { label: "GCC zones", value: "XIV (Perungudi) · XV (Sholinganallur)" },
    { label: "Core stretch", value: "Perungudi → Sholinganallur on OMR" },
    { label: "Metro", value: "Phase 2 elevated line under construction" },
    { label: "Assembly", value: "Sholinganallur constituency" },
  ],
  sectionNav: [
    { id: "best-of", label: "Best of" },
    { id: "about", label: "About the corridor" },
    { id: "localities", label: "Neighbourhoods" },
    { id: "on-the-map", label: "On the map" },
    { id: "local-news", label: "Local news" },
    { id: "classifieds", label: "Classifieds" },
    { id: "commute", label: "Commute & metro" },
    { id: "civic", label: "Civic watchlist" },
    { id: "guides", label: "Useful links" },
    { id: "faq", label: "FAQ" },
  ],
  bestOf: OMR_VISUALS.bestOf,
  aboutTitle: "About OMR — Perungudi to Sholinganallur",
  aboutSubtitle:
    "Rajiv Gandhi Salai is Chennai's IT spine; this hub tracks the densest apartment-and-office belt.",
  aboutParagraphs: [
    "**Old Mahabalipuram Road (OMR)** — officially **Rajiv Gandhi Salai** — is Chennai's best-known IT corridor. The **Perungudi to Sholinganallur** belt sits in the middle of that spine: tech parks, gated apartment towns, international schools, hospitals, and service retail stacked along a single arterial road.",
    "Residents here rarely live in one neighbourhood alone. Families commute between **Perungudi, Thoraipakkam, Karapakkam, Sholinganallur, and Navalur**; office shuttles, share autos, and peak-hour junction delays at **Sholinganallur** and **SRP Tools** shape daily life as much as office timings.",
    "The corridor grew fast in the 2000s–2010s as TIDEL Park and downstream tech campuses pulled talent south from the core city. Today it is a mix of **migrant professionals, long-time village cores, and dense apartment clusters** — which means water, drainage, power, and school-seat pressure show up in local news often.",
    "Our partner community portal **MyOMR.in** has covered OMR jobs, rentals, schools, traffic, and civic updates for years. **mychennaicity.in** adds editorial news, area-tagged classifieds, and Chennai-wide context from this hub.",
  ],
  corridorFacts: [
    { label: "Official road name", value: "Rajiv Gandhi Salai (OMR)" },
    { label: "Hub focus", value: "Perungudi → Sholinganallur core IT belt" },
    { label: "Greater OMR reach", value: "Extends south toward Navalur, Siruseri SIPCOT, Kelambakkam" },
    { label: "North connector", value: "Links toward Taramani / Adyar and Velachery retail hubs" },
    { label: "Major employers", value: "IT services, product startups, BPO, campus-style tech parks" },
    { label: "Housing pattern", value: "High-rise apartments, gated communities, PG clusters" },
    { label: "Flood context", value: "Pallikaranai marsh adjacency; verify GCC / highways bulletins each monsoon" },
    { label: "Elections", value: "Sholinganallur assembly segment — track ward and GCC updates separately" },
  ],
  localityCards: localityCardsForHub(SLUG),
  commuteRows: [
    {
      label: "CMRL Phase 2 (Corridor 3)",
      value:
        "Elevated metro from Taramani toward Sholinganallur and Siruseri SIPCOT — Perungudi and Sholinganallur stations under construction; CMRL reported ~52% overall Phase-2 progress in mid-2026.",
    },
    {
      label: "Sholinganallur interchange",
      value:
        "Planned multi-level station linking Corridor 3 and Corridor 5 — a future south Chennai rail hub; expect junction road works for several seasons.",
    },
    {
      label: "Grade separators",
      value:
        "CMRL / highways agencies have pursued flyovers and grade separators at Perungudi and SRP Tools junctions to ease IT-corridor traffic — check official notices before planning peak-hour drives.",
    },
    {
      label: "MTC & share autos",
      value:
        "Bus routes run the full OMR length; last-mile from apartment blocks to offices still relies heavily on company shuttles, cabs, and share autos.",
    },
    {
      label: "Velachery link",
      value:
        "Velachery acts as a retail and transit node feeding OMR-bound commuters — useful when OMR itself is jammed.",
    },
    {
      label: "ECR crossover",
      value:
        "East Coast Road branches east from the Sholinganallur belt toward coastal neighbourhoods — weekend beach traffic can back up onto OMR connectors.",
    },
  ],
  civicWatchlist: [
    "**Storm-water and Pallikaranai marsh** — OMR flooding patterns differ from core-city drains; watch GCC desilting and highways advisories together during northeast monsoon.",
    "**Permanent electricity connections** in new apartment belts — several south Chennai towers have seen long-running generator-dependence disputes; verify EB status before renting or buying.",
    "**TNEB / TANGEDCO billing** — many households are on bi-monthly domestic tariffs; high AC load in IT-corridor flats pushes bills faster than older independent houses.",
    "**School seat and transport pressure** — international and CBSE schools cluster along OMR; admission cycles and bus routes affect traffic twice daily.",
    "**Road cuts and metro barricades** — Phase-2 construction means lane closures, U-turn bans, and revised bus stops; bookmark official CMRL / GCC updates.",
    "**Water tanker dependence** in newer layouts — some apartment phases still rely on tankers between monsoons; ask residents' associations about supply schedules.",
  ],
  civicTitle: "What to watch on OMR",
  lifestyleNotes: [
    "Weekdays are IT-shift driven; weekends pull beach and ECR traffic onto the same junctions.",
    "Many residents live in one locality and work two exits away — treat Perungudi–Sholinganallur as one labour market.",
  ],
  practicalGuides: [
    {
      label: "Chennai local news",
      href: "/chennai-local-news",
      hint: "City-wide stories tagged for this belt when available",
    },
    {
      label: "Chennai jobs",
      href: "/chennai-jobs",
      hint: "Open roles — filter by OMR / Perungudi / Sholinganallur in listings",
    },
    {
      label: "Chennai classifieds",
      href: "/chennai-classifieds",
      hint: "Tuition, services, and neighbourhood wanted posts",
    },
    {
      label: "Chennai local events",
      href: "/chennai-local-events",
      hint: "Concerts, school events, and community dates",
    },
    {
      label: "Open on city map",
      href: "/#areas?hub=omr-perungudi-sholinganallur",
      hint: "Highlight Perungudi–Sholinganallur wards on the home map",
    },
    {
      label: "TNEB bill guide (Chennai)",
      href: "/chennai-local-news/tamil-nadu-electricity-bill-calculation-2026-june-tnpdcl",
      hint: "Includes OMR apartment billing scenarios",
    },
    {
      label: "OMR jobs on MyOMR.in",
      href: "https://myomr.in/omr-local-job-listings/",
      hint: "Long-running OMR job board — Perungudi, Sholinganallur, Navalur",
      external: true,
    },
    {
      label: "MyOMR community portal",
      href: "https://myomr.in/",
      hint: "Rentals, schools, traffic, and OMR civic updates",
      external: true,
    },
  ],
  partnerLinks: [
    {
      label: "MyOMR.in — OMR community portal",
      href: "https://myomr.in/",
      description:
        "Independent OMR portal covering jobs, rentals, schools, traffic alerts, and neighbourhood services from Perungudi through Kelambakkam.",
    },
    {
      label: "MyOMR job listings",
      href: "https://myomr.in/omr-local-job-listings/",
      description:
        "Local hiring across restaurants, security, admin, teaching, and site roles along the IT corridor.",
    },
  ],
  relatedHubSlugs: ["adyar-thiruvanmiyur", "saidapet-guindy-alandur"],
  faq: [
    {
      question: "Which areas does this OMR hub cover?",
      answer:
        "This page centres on Perungudi and Sholinganallur on Rajiv Gandhi Salai, including nearby OMR localities such as Thoraipakkam, Karapakkam, Navalur, Siruseri, and Velachery access points. Greater OMR extends further south toward Kelambakkam.",
    },
    {
      question: "Is Chennai Metro coming to Perungudi and Sholinganallur?",
      answer:
        "Yes — CMRL Phase 2 Corridor 3 includes elevated stations along OMR. Perungudi and Sholinganallur are part of the under-construction Taramani–Sholinganallur stretch; Sholinganallur is planned as a major interchange. Timelines should be taken from official CMRL announcements, not speculation.",
    },
    {
      question: "Why is Sholinganallur junction often congested?",
      answer:
        "The junction combines OMR through-traffic, ECR crossover movement, apartment-town peak flows, and metro construction barricades. Peak hours align with IT shift changes and school transport.",
    },
    {
      question: "Where can I find OMR jobs and rentals?",
      answer:
        "Use mychennaicity.in for curated Chennai jobs and classifieds with area tags. MyOMR.in maintains a long-running OMR-specific job and rental board used by corridor residents.",
    },
    {
      question: "Which GCC zones should I reference for complaints?",
      answer:
        "Perungudi falls under GCC Zone XIV and Sholinganallur under Zone XV. Always confirm your ward number on official GCC channels before filing grievances — apartment addresses often span ward boundaries.",
    },
    {
      question: "Does mychennaicity.in cover OMR news?",
      answer:
        "Yes. Stories about OMR civic issues, schools, and local events are published on our Chennai local news desk and tagged to this area hub when relevant.",
    },
  ],
};
