/**
 * TTDC / Tamil Nadu Tourism — “This weekend ECR plan” (Aug 2026 Independence weekend).
 * Editorial unpack of the official poster; timings from named primary sources.
 */

import {
  ECR_WEEKEND_PLAN_PATH,
  KITE_FESTIVAL_EVENT_SLUG,
  KITE_FESTIVAL_NEWS_PATH,
  SURFING_EVENT_SLUG,
  TTDC_ECR_NEWS_PATH,
  TTDC_ECR_POSTER_PATH,
} from "@/content/tourism/index";

export const ECR_WEEKEND_POSTER_ALT =
  "Tamil Nadu Tourism poster titled This Weekend ECR Plan — a Chennai loop along East Coast Road covering Marundeeswarar Temple, DakshinaChitra, Muttukkadu boating, TTDC ₹99 chicken biryani, the Mamallapuram kite festival, UNESCO Shore Temple, and a surfing championship";

export type EcrStopKind = "start" | "spiritual" | "culture" | "adventure" | "food" | "heritage";

export type EcrStop = {
  id: string;
  n: number;
  name: string;
  kind: EcrStopKind;
  kindLabel: string;
  place: string;
  kmFromChennai?: string;
  blurb: string;
  practical: string;
  mapsQuery: string;
  officialHref?: string;
  officialLabel?: string;
};

export const ECR_WEEKEND_PILLARS = [
  "Spiritual",
  "Culture",
  "Food",
  "Adventure",
] as const;

export const ECR_WEEKEND_WINDOW = {
  label: "Independence Day weekend, 14–16 August 2026",
  kiteDates: "14–16 August 2026",
  surfDates: "12–16 August 2026",
  loopNote:
    "The poster is a Chennai → ECR → Mamallapuram → Chennai loop, not a timed official tour package.",
};

export const ECR_STOPS: EcrStop[] = [
  {
    id: "chennai",
    n: 1,
    name: "Chennai",
    kind: "start",
    kindLabel: "Start / finish",
    place: "City — typically Adyar / Thiruvanmiyur onto ECR",
    kmFromChennai: "0 km",
    blurb:
      "The Tamil Nadu Tourism poster starts and ends in Chennai. Most south-city drivers join East Coast Road at Thiruvanmiyur; OMR traffic can spill onto the same connectors on a festival weekend.",
    practical:
      "Leave before 8:00 IST if you want a temple stop before DakshinaChitra opens. Carry water, a hat, and cash/UPI — beach events fill parking early.",
    mapsQuery: "East Coast Road Thiruvanmiyur Chennai",
  },
  {
    id: "marundeeswarar",
    n: 2,
    name: "Marundeeswarar Temple",
    kind: "spiritual",
    kindLabel: "Spiritual",
    place: "Thiruvanmiyur, Chennai",
    kmFromChennai: "~14 km south of the core city",
    blurb:
      "A historic seaside Shiva temple (Paadal Petra Sthalam) on the ECR approach. The poster’s first stop after leaving the city — a short, grounded start before the museum and backwaters.",
    practical:
      "Typical pattern is morning and evening darshan windows; festival and Pradosham days rewrite queues. Dress for a living temple (shoulders and knees covered). Confirm timings on the temple notice board — we do not publish a fake aarti table.",
    mapsQuery: "Marundeeswarar Temple Thiruvanmiyur",
  },
  {
    id: "dakshinachitra",
    n: 3,
    name: "DakshinaChitra",
    kind: "culture",
    kindLabel: "Culture",
    place: "Muttukadu, East Coast Road",
    kmFromChennai: "~25 km from Thiruvanmiyur along ECR",
    blurb:
      "A living-heritage campus of relocated South Indian houses, crafts and performance spaces. The poster’s culture stop between the temple and the boat house.",
    practical:
      "Usually open through the day except a weekly holiday (often Tuesday — confirm before you drive). Budget 90–120 minutes if you also want Muttukkadu boats before lunch. Tickets are sold on site — we are not the box office.",
    mapsQuery: "DakshinaChitra Muttukadu ECR",
    officialHref: "https://dakshinachitra.net/",
    officialLabel: "DakshinaChitra",
  },
  {
    id: "muttukkadu",
    n: 4,
    name: "Muttukkadu boating",
    kind: "adventure",
    kindLabel: "Adventure",
    place: "Muttukadu backwaters, ECR",
    kmFromChennai: "Beside DakshinaChitra",
    blurb:
      "TTDC’s Muttukadu boat house sits on the backwaters just off ECR. The poster shows a water-sports beat — jet-ski style thrills sit beside calmer boat rides, depending on what the operator is running that day.",
    practical:
      "Boat slots and water-sport availability change with weather, crowd and maintenance. Book or walk in at the TTDC counter; do not assume a jet-ski is guaranteed. Life jackets are not optional.",
    mapsQuery: "TTDC Muttukadu Boat House",
    officialHref: "https://www.ttdconline.com/",
    officialLabel: "TTDC online",
  },
  {
    id: "ttdc-lunch",
    n: 5,
    name: "Lunch — TTDC special",
    kind: "food",
    kindLabel: "Food",
    place: "TTDC restaurant / Hotel Tamil Nadu properties (confirm the ECR outlet)",
    blurb:
      "The poster’s food callout is explicit: **TTDC 99 rupees chicken biryani**. Tamil Nadu Tourism Development Corporation launched a ₹99 chicken biryani plate in July 2026 — typically ~450–500 g with onion raita and brinjal gravy — at selected TTDC hotels, often on weekends.",
    practical:
      "The poster places lunch on this loop; it does **not** name which ECR kitchen is serving the ₹99 plate this weekend. Ask at Hotel Tamil Nadu / TTDC Ocean View / the nearest TTDC restaurant before you queue. Vegetarian travellers should ask for the regular menu — this callout is chicken biryani only.",
    mapsQuery: "Hotel Tamil Nadu Mamallapuram",
    officialHref: "https://www.ttdconline.com/",
    officialLabel: "TTDC hotels",
  },
  {
    id: "kite-festival",
    n: 6,
    name: "Kite Festival, Mamallapuram",
    kind: "adventure",
    kindLabel: "Adventure · this weekend",
    place: "TTDC Ocean View, Devaneri / ECR, Mamallapuram",
    kmFromChennai: "~50–55 km from central Chennai",
    blurb:
      "The 5th Tamil Nadu International Kite Festival (TNIKF) — 14 to 16 August 2026 — at TTDC Ocean View on ECR. Organised with the Department of Tourism, Tamil Nadu and Global Media Box. Professional flyers from Thailand, Singapore, Malaysia, Indonesia, Vietnam and India; giant and inflatable show kites; theme Save Marine Life. 16 August lists a Red Bull F1 static display.",
    practical: `Official site: **free beach-event entry**. Kites typically from **2:00 pm until sunset** (weather permitting); LED kites after sunset toward 7:00 pm. **Do not bring your own kite to fly** — this is a professional show. Parking and ECR southbound traffic will be heavy after lunch. Tourism minister S. Rajesh Kumar was scheduled to inaugurate on 14 August. Dedicated news: [kite festival this weekend](${KITE_FESTIVAL_NEWS_PATH}).`,
    mapsQuery: "TTDC Ocean View Mamallapuram ECR",
    officialHref: "https://tnikf.com/",
    officialLabel: "TNIKF official site",
  },
  {
    id: "unesco",
    n: 7,
    name: "Mamallapuram Group of Monuments (UNESCO)",
    kind: "heritage",
    kindLabel: "Heritage",
    place: "Mamallapuram (Mahabalipuram)",
    kmFromChennai: "Shore Temple is a short hop from TTDC Ocean View",
    blurb:
      "The poster’s heritage stop is the UNESCO World Heritage Group of Monuments — Shore Temple, Pancha Rathas, Arjuna’s Penance and the surrounding Pallava rock-cut landscape. Independent of the kite field, but the same town on the same afternoon.",
    practical:
      "ASI ticketed sites typically close around dusk. If you are committed to the 2:00 pm kite show, do Shore Temple / Rathas in the late morning or keep a tight sunset buffer. Footwear, water and a modest dress code still apply at the Shore Temple precinct.",
    mapsQuery: "Shore Temple Mamallapuram",
    officialHref: "https://whc.unesco.org/en/list/249/",
    officialLabel: "UNESCO listing",
  },
  {
    id: "surfing",
    n: 8,
    name: "Surfing championship, Mamallapuram",
    kind: "adventure",
    kindLabel: "Adventure · this weekend",
    place: "Mahabalipuram beach / Shore Temple break",
    blurb:
      "The World Surf League **Shore Temple Classic QS 2,000 & Pro Junior** runs **12–16 August 2026** in Mahabalipuram — India’s WSL return plus the country’s first WSL Pro Junior. About 120 surfers from around 12 countries were expected. Heats depend on swell; standby calls are normal.",
    practical:
      "This is a beach competition, not a public surf lesson. Watch from the designated spectator area; stay clear of the contest zone and camera lanes. Confirm the day’s call on the WSL event page — rain and flat spells pause heats. Last competition day is 16 August 2026.",
    mapsQuery: "Mahabalipuram Shore Temple beach surfing",
    officialHref:
      "https://www.worldsurfleague.com/events/2026/qs/547/shore-temple-classic-qs-2000-pro-junior/main",
    officialLabel: "WSL Shore Temple Classic",
  },
];

export const ECR_SUGGESTED_DAY = [
  {
    when: "07:30–09:00",
    what: "Marundeeswarar Temple, Thiruvanmiyur — darshan before ECR traffic builds.",
  },
  {
    when: "09:45–11:15",
    what: "DakshinaChitra — houses and crafts; don’t try to “do the whole campus” if kites are the afternoon goal.",
  },
  {
    when: "11:15–12:30",
    what: "Muttukkadu boats (TTDC) — short backwater loop, then south toward Mamallapuram.",
  },
  {
    when: "12:30–13:45",
    what: "TTDC lunch — ask whether the ₹99 chicken biryani is actually on at that kitchen today.",
  },
  {
    when: "14:00–sunset",
    what: "Kite Festival at TTDC Ocean View. UNESCO monuments either before 14:00 or as a tight sunset add-on. Surf heats if the WSL call is on.",
  },
  {
    when: "Return",
    what: "North on ECR after dark is slow on festival Sundays — budget extra time into Thiruvanmiyur / OMR connectors.",
  },
];

export const ECR_WEEKEND_FAQ = [
  {
    question: "Is this an official TTDC packaged tour I can book?",
    answer:
      "No. Tamil Nadu Tourism published a suggested weekend loop on a poster (spiritual, culture, food, adventure). Each stop has its own ticket, boat counter, or free beach entry. We are not TTDC and we do not sell seats.",
  },
  {
    question: "When is the kite festival?",
    answer:
      "14–16 August 2026 at TTDC Ocean View, Mamallapuram ECR. Official site: free entry; professional kites from about 2:00 pm until sunset, weather permitting. Public kite-flying inside the ground is not allowed.",
  },
  {
    question: "When is the surfing championship?",
    answer:
      "The WSL Shore Temple Classic QS 2000 and Pro Junior is listed 12–16 August 2026 at Mahabalipuram. Heat times move with the swell — check the World Surf League event page on the morning you go.",
  },
  {
    question: "Is the ₹99 chicken biryani available on ECR this weekend?",
    answer:
      "TTDC announced a ₹99 chicken biryani (about 450–500 g with raita and brinjal gravy) at selected hotels, often on weekends, from July 2026. The ECR poster advertises it as the lunch stop. Confirm at the specific TTDC restaurant — the first rollout named inland and hill properties, and coastal kitchens can differ.",
  },
  {
    question: "Can I do every stop in one day?",
    answer:
      "You can touch all of them if you start early and treat DakshinaChitra and the monuments as short visits. A calmer plan is temple + museum + boats on one half, kites + Shore Temple + surf watch on the other — or split Saturday and Sunday.",
  },
];

export const ECR_WEEKEND_SOURCES = [
  {
    label: "Tamil Nadu Tourism / TTDC poster — This Weekend ECR Plan",
    href: TTDC_ECR_POSTER_PATH,
    note: "Primary visual source for the loop and the ₹99 biryani callout.",
  },
  {
    label: "TNIKF — 5th Tamil Nadu International Kite Festival",
    href: "https://tnikf.com/",
    note: "14–16 Aug 2026, TTDC Ocean View, free entry, 2 pm–sunset.",
  },
  {
    label: "DT Next — kite festival preview",
    href: "https://www.dtnext.in/news/tamilnadu/tamil-nadu-international-kite-festival-to-take-flight-in-mamallapuram-this-weekend-check-details-here",
    note: "30+ flyers; 2 pm–sunset; LED kites after sunset.",
  },
  {
    label: "World Surf League — Shore Temple Classic QS 2000 & Pro Junior",
    href: "https://www.worldsurfleague.com/events/2026/qs/547/shore-temple-classic-qs-2000-pro-junior/main",
    note: "12–16 August 2026, Mahabalipuram.",
  },
  {
    label: "Sportstar — WSL returns to India",
    href: "https://sportstar.thehindu.com/other-sports/wsl-world-surfing-league-returns-to-india-shore-temple-classic-qs-2000-pro-junior-tamil-nadu/article71294081.ece",
    note: "Field size and Pro Junior context.",
  },
  {
    label: "TTDC ₹99 chicken biryani (July 2026 rollout)",
    href: "https://en.channeliam.com/2026/07/13/ttdc-rs99-chicken-biryani-offer-tamil-nadu-tourism/",
    note: "Plate size and accompaniments as reported when the scheme launched.",
  },
  {
    label: "TTDC booking portal",
    href: "https://www.ttdconline.com/",
    note: "Hotels, boats, Ocean View venue notes.",
  },
];

export const ECR_WEEKEND_RELATED = [
  { href: TTDC_ECR_NEWS_PATH, label: "News desk: TTDC this-weekend ECR plan" },
  {
    href: KITE_FESTIVAL_NEWS_PATH,
    label: "News: Tamil Nadu International Kite Festival",
  },
  {
    href: `/chennai-local-events/${KITE_FESTIVAL_EVENT_SLUG}`,
    label: "Event: Tamil Nadu International Kite Festival",
  },
  {
    href: `/chennai-local-events/${SURFING_EVENT_SLUG}`,
    label: "Event: Shore Temple Classic surfing",
  },
  { href: "/chennai-local-events#events-weekend", label: "All events this weekend" },
  { href: "/guides/chennai-festivals-calendar", label: "Chennai festivals calendar" },
  { href: "/guides/chennai-temple-quiet-hours", label: "Temple quiet-hour guide" },
  { href: "/guides/chennai-biryani-bracket", label: "Chennai biryani bracket" },
];

export function ecrWhatsAppShare(siteUrl: string): string {
  const url = `${siteUrl.replace(/\/$/, "")}${ECR_WEEKEND_PLAN_PATH}`;
  return `This weekend ECR plan (Tamil Nadu Tourism / TTDC)

Chennai → Marundeeswarar Temple → DakshinaChitra → Muttukkadu boats → TTDC ₹99 chicken biryani → Kite Festival (Mamallapuram, 14–16 Aug) → UNESCO Shore Temple → Surfing championship → back to Chennai

Kites: free entry, ~2 pm–sunset at TTDC Ocean View. Confirm biryani and boat slots on the ground.

${url}

#Chennai #ECR #Mamallapuram #TTDC #KiteFestival #mychennaicity`;
}
