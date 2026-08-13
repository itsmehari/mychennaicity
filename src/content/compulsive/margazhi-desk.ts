import { compulsivePath } from "@/content/compulsive/index";

export const MARGAZHI_DESK_PATH = compulsivePath("margazhi");

/**
 * Approximate Margazhi / Music Season window for Chennai desk use.
 * Traditional Margazhi aligns mid-Dec → mid-Jan; we use Dec 15–Jan 15 IST as a practical band.
 */
export function isMargazhiSeason(date: Date = new Date()): boolean {
  // Interpret calendar day in Asia/Kolkata without depending on runtime TZ data quirks.
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value ?? "0");
  const day = Number(parts.find((p) => p.type === "day")?.value ?? "0");
  if (month === 12 && day >= 15) return true;
  if (month === 1 && day <= 15) return true;
  return false;
}

export const MARGAZHI_OFF_SEASON_MESSAGE =
  "Margazhi Music Season is not in window right now (we treat ~15 Dec–15 Jan IST as the practical band). Use this page as an evergreen how-to, bookmark sabha habits, and check Chennai local events closer to December.";

export const MARGAZHI_IN_SEASON_MESSAGE =
  "You are inside the approximate Margazhi / Music Season window (~15 Dec–15 Jan IST). Schedules shift daily — verify with sabhas and our events desk before you travel.";

export type MargazhiHowToStep = {
  id: string;
  title: string;
  body: string;
};

export const MARGAZHI_HOW_TO: MargazhiHowToStep[] = [
  {
    id: "pick-sabha-cluster",
    title: "Pick a sabha cluster, not one pin",
    body: "Mylapore / TTK–Alwarpet orbits concentrate many kutcheris. Plan walking distance between venues so traffic does not eat the concert.",
  },
  {
    id: "read-the-bill",
    title: "Read the day’s bill early",
    body: "Morning lec-dems, afternoon slots, and evening headliners stack differently. Decide energy level before you book autos across town.",
  },
  {
    id: "tickets-and-queues",
    title: "Tickets, passes, and queue culture",
    body: "Some halls are members / season-pass heavy; others sell day tickets. Arrive with buffer — security and seating lines are part of the ritual.",
  },
  {
    id: "dress-and-etiquette",
    title: "Dress and hall etiquette",
    body: "Smart-traditional is welcome; silence phones; avoid walking during kritis. Clap between pieces, not mid-phrase.",
  },
  {
    id: "food-and-filter",
    title: "Filter coffee + light meals between slots",
    body: "Build caffeine and tiffin stops into the corridor map so you are not hangry in the balcony. Festival crowds thicken food lanes too.",
  },
  {
    id: "cross-check-live",
    title: "Cross-check live listings",
    body: "Artists cancel, halls shift timings, and rain rewrites outdoor plans. Use sabha notices plus mychennaicity local events — not memory from last year.",
  },
];

export type MargazhiSeasonPackItem = {
  id: string;
  label: string;
  hint: string;
};

export const MARGAZHI_SEASON_PACK: MargazhiSeasonPackItem[] = [
  {
    id: "week-theme",
    label: "Skim this week’s themes",
    hint: "Morning theory vs evening star billing — pick one lane per day if you are new.",
  },
  {
    id: "two-venues",
    label: "Choose two venues max per evening",
    hint: "Chennai traffic laughs at three-hall fantasies.",
  },
  {
    id: "rain-backup",
    label: "Keep a rain / AC hall backup",
    hint: "December drizzle and January humidity both show up uninvited.",
  },
  {
    id: "guest-plan",
    label: "Brief out-of-town guests",
    hint: "Explain silence etiquette and footwear / bag norms before the first kriti.",
  },
  {
    id: "events-desk",
    label: "Open Chennai local events",
    hint: "Pull live listings instead of screenshot folklore.",
  },
  {
    id: "festivals-cal",
    label: "Cross-check festivals calendar",
    hint: "Temple + civic festival days collide with kutcheri crowds — plan buffers.",
  },
];

export const MARGAZHI_FAQ = [
  {
    q: "Is Dec 15–Jan 15 the official Margazhi definition?",
    a: "It is our practical desk window in IST. Traditional Tamil Margazhi and sabha calendars can start slightly earlier or run special series outside that band — always check the venue.",
  },
  {
    q: "Do you list today’s exact kutcheri lineup here?",
    a: "This page is evergreen how-to plus a seasonal checklist. For dated listings, use Chennai local events and sabha announcements.",
  },
  {
    q: "What if I am reading this in July?",
    a: "You will see an honest off-season note. Bookmark the habits now; return when December approaches.",
  },
];
