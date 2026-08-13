import { compulsivePath } from "@/content/compulsive/index";

export const FILTER_COFFEE_PATH = compulsivePath("filter-coffee");

export type CoffeeCorridor =
  | "Mylapore"
  | "Triplicane"
  | "T Nagar"
  | "Anna Nagar"
  | "Adyar"
  | "Besant Nagar"
  | "Velachery"
  | "OMR"
  | "Egmore / Central"
  | "West Chennai";

export type FilterCoffeeSpot = {
  id: string;
  name: string;
  corridor: CoffeeCorridor;
  landmark: string;
  vibe: string;
  note: string;
};

/** Editorial shortlist — not ratings, rankings, or sponsored placements. */
export const FILTER_COFFEE_SPOTS: FilterCoffeeSpot[] = [
  {
    id: "kapali-lane-filter",
    name: "Kapali lane filter stop",
    corridor: "Mylapore",
    landmark: "Near Kapaleeswarar temple tank orbit",
    vibe: "Temple-morning steam, steel tumbler, zero hurry theatre.",
    note: "Go early; festival days rewrite the queue math.",
  },
  {
    id: "luz-corner-decoction",
    name: "Luz corner decoction desk",
    corridor: "Mylapore",
    landmark: "Luz / Royapettah High Road pocket",
    vibe: "Classic south loyalty — foam debate welcome.",
    note: "Ask for degree strength if you want less sugar drama.",
  },
  {
    id: "triplicane-beach-road-brew",
    name: "Triplicane beach-road brew",
    corridor: "Triplicane",
    landmark: "Wallajah Road / Marina approach belt",
    vibe: "Student + office mix; quick pour, loud street.",
    note: "Pair with a walk toward the Marina if heat allows.",
  },
  {
    id: "parthasarathy-orbit-coffee",
    name: "Parthasarathy orbit coffee",
    corridor: "Triplicane",
    landmark: "Near Parthasarathy temple lanes",
    vibe: "Neighbourhood ritual more than Instagram set.",
    note: "Respect temple queue flow; coffee after darshan is the local move.",
  },
  {
    id: "pondy-bazaar-filter-sprint",
    name: "Pondy Bazaar filter sprint",
    corridor: "T Nagar",
    landmark: "Pondy Bazaar shopping spine",
    vibe: "Shop-break caffeine between sari bags.",
    note: "Weekends = standing room only; weekday mid-morning is kinder.",
  },
  {
    id: "panagal-park-side-tumbler",
    name: "Panagal Park side tumbler",
    corridor: "T Nagar",
    landmark: "Panagal Park / Usman Road orbit",
    vibe: "Retail marathon fuel — sweet or strong, pick a side.",
    note: "Parking nearby is the real boss fight.",
  },
  {
    id: "anna-nagar-tower-filter",
    name: "Anna Nagar tower-park filter",
    corridor: "Anna Nagar",
    landmark: "Tower Park / 2nd Avenue pocket",
    vibe: "Planned-west calm; family tables and evening walks.",
    note: "Good “introduce a guest to Chennai coffee” corridor.",
  },
  {
    id: "shanti-colony-decoction",
    name: "Shanti Colony decoction stop",
    corridor: "Anna Nagar",
    landmark: "Shanti Colony / 6th Avenue belt",
    vibe: "Resident loyalty more than tourist map pins.",
    note: "Ask locals which day the decoction hits peak — opinions vary.",
  },
  {
    id: "adyar-bridge-morning-filter",
    name: "Adyar bridge morning filter",
    corridor: "Adyar",
    landmark: "Adyar bridge / LB Road approach",
    vibe: "South institutional calm — newspapers optional, opinions mandatory.",
    note: "School-hour traffic can delay your “quick” stop.",
  },
  {
    id: "gandhi-nagar-filter-lane",
    name: "Gandhi Nagar filter lane",
    corridor: "Adyar",
    landmark: "Gandhi Nagar / Indira Nagar edge",
    vibe: "Leafy south — decoction before errands.",
    note: "Editorial pick for “I live here” energy, not influencer queues.",
  },
  {
    id: "elliots-beach-filter-reset",
    name: "Elliot’s beach filter reset",
    corridor: "Besant Nagar",
    landmark: "Elliot’s Beach road stretch",
    vibe: "Sea breeze + coffee foam — guest magnet.",
    note: "Sunset rush is chaos; morning is the quiet flex.",
  },
  {
    id: "velachery-mrts-filter",
    name: "Velachery MRTS filter pit-stop",
    corridor: "Velachery",
    landmark: "Near Velachery MRTS / lake belt retail",
    vibe: "Commute caffeine — stand, sip, board.",
    note: "Peak office hours compress service; off-peak tastes better.",
  },
  {
    id: "vijayanagar-velachery-brew",
    name: "Vijayanagar Velachery brew",
    corridor: "Velachery",
    landmark: "Vijayanagar bus terminus orbit",
    vibe: "Dense mid-south options; delivery apps know this map well.",
    note: "Try a seated spot if you want conversation, not just a tumbler.",
  },
  {
    id: "thiruvanmiyur-omr-filter",
    name: "Thiruvanmiyur OMR filter gate",
    corridor: "OMR",
    landmark: "Thiruvanmiyur junction / ECR–OMR hinge",
    vibe: "Beach-IT hinge — coffee before the corridor crawl.",
    note: "Useful if you are heading south on OMR from the city.",
  },
  {
    id: "sholinganallur-campus-coffee",
    name: "Sholinganallur campus coffee orbit",
    corridor: "OMR",
    landmark: "Sholinganallur IT / SIPCOT pocket",
    vibe: "Office Indian English + filter nostalgia in one cup.",
    note: "Many spots lean café; seek decoction-first places if that is your test.",
  },
  {
    id: "perungudi-filter-lane",
    name: "Perungudi filter lane",
    corridor: "OMR",
    landmark: "Perungudi MRTS / Old Mahabalipuram Road belt",
    vibe: "Tech-corridor pit stop between standups.",
    note: "Evenings can be packed with WFH escapes and cab waits.",
  },
  {
    id: "egmore-station-decoction",
    name: "Egmore station decoction dash",
    corridor: "Egmore / Central",
    landmark: "Egmore railway station approach",
    vibe: "Travel coffee — steel, steam, platform timing.",
    note: "Confirm open hours around train schedules; festival travel spikes queues.",
  },
  {
    id: "central-park-town-filter",
    name: "Park Town / Central filter sprint",
    corridor: "Egmore / Central",
    landmark: "Chennai Central / Park Town orbit",
    vibe: "City-core hurry coffee before the next connection.",
    note: "Keep it quick; luggage + tumbler is an advanced skill.",
  },
  {
    id: "ashok-pillar-west-filter",
    name: "Ashok Pillar west filter",
    corridor: "West Chennai",
    landmark: "Ashok Pillar / KK Nagar hinge",
    vibe: "West planned-layout loyalty cups.",
    note: "Good halfway meet for Anna Nagar ↔ south friends.",
  },
  {
    id: "porur-bypass-filter",
    name: "Porur bypass filter stop",
    corridor: "West Chennai",
    landmark: "Porur / Mount-Poonamallee corridor",
    vibe: "Outer-west fuel before the bypass crawl.",
    note: "Illustrative corridor pick — confirm the day’s open hours.",
  },
];

export const FILTER_COFFEE_CORRIDORS: CoffeeCorridor[] = [
  "Mylapore",
  "Triplicane",
  "T Nagar",
  "Anna Nagar",
  "Adyar",
  "Besant Nagar",
  "Velachery",
  "OMR",
  "Egmore / Central",
  "West Chennai",
];

export const FILTER_COFFEE_FAQ = [
  {
    q: "Are these official ratings or paid listings?",
    a: "No. This is an editorial corridor map for conversation — no star scores, no “#1 in Chennai” claims, and no sponsored winners.",
  },
  {
    q: "Why editorial names instead of famous brand chains?",
    a: "We describe places by neighbourhood feel so the map stays trademark-safe and useful even when signboards change. Ask locals for the exact shop they swear by.",
  },
  {
    q: "Will timings and menus match what I find today?",
    a: "They change. Treat this as a starting compass — confirm open hours and preferences at the counter.",
  },
];
