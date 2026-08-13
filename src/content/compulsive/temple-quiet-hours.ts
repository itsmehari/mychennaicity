import { compulsivePath } from "@/content/compulsive/index";

export const TEMPLE_QUIET_PATH = compulsivePath("temple-quiet");

export type TempleQuietEntry = {
  id: string;
  name: string;
  area: string;
  quietWindows: string;
  crowdNotes: string;
  respectNotes: string;
};

/** Editorial quiet-hour compass — confirm with temple authorities; timings shift on festivals. */
export const TEMPLE_QUIET_ENTRIES: TempleQuietEntry[] = [
  {
    id: "kapaleeswarar",
    name: "Kapaleeswarar Temple",
    area: "Mylapore",
    quietWindows:
      "Often calmer mid-morning on ordinary weekdays after the first rush, and late afternoon before evening aarti crowds thicken.",
    crowdNotes:
      "Fridays, Pradosham, and festival weeks (especially around Panguni) rewrite the map. Tank-side lanes fill fast on weekends.",
    respectNotes:
      "Modest dress; remove footwear at marked points. Photography rules vary — ask before shooting inside. Keep phones silent near sanctum queues.",
  },
  {
    id: "parthasarathy",
    name: "Parthasarathy Temple",
    area: "Triplicane",
    quietWindows:
      "Weekday mid-mornings are usually kinder than evening aarti peaks; early opening slots suit a slower darshan.",
    crowdNotes:
      "Vaikunta Ekadasi and major Vaishnava dates bring long waits. Marina-side traffic can slow access even when the temple itself is manageable.",
    respectNotes:
      "Cover shoulders and knees; follow queue marshals. Avoid blocking narrow lane entrances for selfies.",
  },
  {
    id: "ashtalakshmi",
    name: "Ashtalakshmi Temple",
    area: "Besant Nagar",
    quietWindows:
      "Weekday mornings before beach tourist peaks; avoid Elliot’s sunset rush if you want quieter lanes.",
    crowdNotes:
      "Weekends mix devotees and beach visitors. Fridays and special Lakshmi-related observances draw denser crowds.",
    respectNotes:
      "Sea-breeze temple — still treat it as sacred space. Dress modestly; keep beachwear covers for the visit.",
  },
  {
    id: "marundeeswarar",
    name: "Marundeeswarar Temple",
    area: "Thiruvanmiyur",
    quietWindows:
      "Ordinary weekday mornings and late mornings often feel steadier than evening temple + OMR spillover hours.",
    crowdNotes:
      "Pradosham evenings and local festival days pack the courtyard. Junction traffic near Thiruvanmiyur can dominate the visit time.",
    respectNotes:
      "Standard Shaiva etiquette — modest clothes, quiet near sanctum, follow footwear instructions.",
  },
  {
    id: "vadapalani",
    name: "Vadapalani Murugan Temple",
    area: "Vadapalani / West Chennai",
    quietWindows:
      "Early weekday slots before office + shopping belt traffic; mid-afternoon can be calmer than evenings.",
    crowdNotes:
      "Tuesdays and Krithigai are busier. Arcot Road / shopping corridor congestion adds wait outside the temple.",
    respectNotes:
      "Murugan devotee flow can be brisk — stay in lane, keep offerings tidy, dress modestly.",
  },
  {
    id: "mangadu",
    name: "Mangadu Kamakshi Temple",
    area: "Mangadu (west outskirts)",
    quietWindows:
      "Weekday mornings for a less compressed visit; plan buffer for outer-west roads.",
    crowdNotes:
      "Fridays and Rahu Kala / special Kamakshi observances (as locally observed) can spike queues. Festival calendars matter more than clock alone.",
    respectNotes:
      "Longer travel — carry water, dress for temple + heat, follow local queue customs.",
  },
  {
    id: "tiruverkadu",
    name: "Tiruverkadu Devi Temple",
    area: "Tiruverkadu",
    quietWindows:
      "Weekday daytime visits are usually less intense than Amman festival peaks and Sundays.",
    crowdNotes:
      "Amman festival seasons and Tuesday/Friday patterns (as locally followed) change density quickly.",
    respectNotes:
      "Outer-west temple — modest dress, quiet devotion, confirm special-day rules with temple staff.",
  },
  {
    id: "murugan-kandakottam",
    name: "Kandakottam Murugan Temple",
    area: "Park Town / Central",
    quietWindows:
      "Mid-weekday mornings when city-core traffic is between peaks; early is best if you dislike crowds.",
    crowdNotes:
      "Central / Park Town access is the variable — festival and Tuesday flows stack with station-area density.",
    respectNotes:
      "City-core temple etiquette: compact bags, modest clothes, follow volunteers in tight spaces.",
  },
  {
    id: "sriperumbudur",
    name: "Sri Ramanujar / Adikesava precinct (Sriperumbudur)",
    area: "Sriperumbudur (day trip west)",
    quietWindows:
      "Weekday late mornings outside major Vaishnava calendar peaks; avoid rushing right after highway crawl.",
    crowdNotes:
      "Weekend + pilgrimage combo days fill parking and queues. Major Ramanuja-related observances transform the visit.",
    respectNotes:
      "Treat as a day pilgrimage — modest dress, hydration, confirm open hours before highway departure.",
  },
  {
    id: "kalikambal",
    name: "Kalikambal Temple",
    area: "Georgetown / North Chennai",
    quietWindows:
      "Weekday mid-mornings in the old commercial core; evenings and festival nights are denser.",
    crowdNotes:
      "North Chennai festival calendars and Amman observances can pack narrow approaches. Pair with respectful neighbourhood awareness.",
    respectNotes:
      "Modest dress; keep phones low; ask before photography. Follow local volunteer guidance in crowded lanes.",
  },
];

export const TEMPLE_QUIET_FAQ = [
  {
    q: "Are these official temple timings?",
    a: "No. Quiet windows are editorial crowd-pattern notes. Opening hours, aarti times, and festival schedules come from temple authorities — verify before you go.",
  },
  {
    q: "What should I wear?",
    a: "Modest clothing that covers shoulders and knees is the safe default. Some temples have stricter norms — follow posted rules and volunteer guidance.",
  },
  {
    q: "Why link the festivals calendar?",
    a: "Festival days are when “quiet hour” advice fails first. Cross-check /guides/chennai-festivals-calendar before planning around major dates.",
  },
];
