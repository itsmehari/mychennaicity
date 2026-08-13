import { compulsivePath } from "@/content/compulsive/index";

export const WEDDING_VENUE_PATH = compulsivePath("wedding-venue");

export type WeddingZoneId =
  | "south-central"
  | "omr-ecr"
  | "west"
  | "north-suburbs";

export type WeddingSeasonId = "peak" | "shoulder" | "off";

export type WeddingVenueBand = {
  zoneId: WeddingZoneId;
  seasonId: WeddingSeasonId;
  /** Hall / mandapam day hire mid, INR (directional) */
  hallLowInr: number;
  hallMidInr: number;
  hallHighInr: number;
  /** Catering per plate mid band, INR */
  plateLowInr: number;
  plateMidInr: number;
  plateHighInr: number;
  note: string;
};

export const WEDDING_ZONES: {
  id: WeddingZoneId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "south-central",
    label: "South / Central (T. Nagar · Mylapore · Adyar orbit)",
    blurb: "Classic city mandapams and club halls — parking and guest density drive cost",
  },
  {
    id: "omr-ecr",
    label: "OMR / ECR belt",
    blurb: "Resort and banquet stock for IT-corridor families — décor packages often bundled",
  },
  {
    id: "west",
    label: "West (Anna Nagar · Porur · Arcot Road)",
    blurb: "Strong mid-market banquet density; easier coach access than core south",
  },
  {
    id: "north-suburbs",
    label: "North / outer suburbs",
    blurb: "Value halls and community spaces — travel time is the real guest tax",
  },
];

export const WEDDING_SEASONS: {
  id: WeddingSeasonId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "peak",
    label: "Peak muhurtham (Nov–Feb + big festival weekends)",
    blurb: "Dates book out; hall and catering both stretch toward the high band",
  },
  {
    id: "shoulder",
    label: "Shoulder (Aug–Oct, Mar–Apr)",
    blurb: "More negotiating room on décor and non-veg add-ons",
  },
  {
    id: "off",
    label: "Off-peak / weekday lean months",
    blurb: "Best chance at mid-or-below hall rates — still confirm catering minimums",
  },
];

/** Directional Chennai wedding hall + catering bands — editorial planning, not quotes. */
export const WEDDING_VENUE_BANDS: WeddingVenueBand[] = [
  {
    zoneId: "south-central",
    seasonId: "peak",
    hallLowInr: 180000,
    hallMidInr: 350000,
    hallHighInr: 750000,
    plateLowInr: 450,
    plateMidInr: 750,
    plateHighInr: 1200,
    note: "Premium clubs and heritage halls sit well above mid; parking valet often extra",
  },
  {
    zoneId: "south-central",
    seasonId: "shoulder",
    hallLowInr: 140000,
    hallMidInr: 280000,
    hallHighInr: 550000,
    plateLowInr: 400,
    plateMidInr: 650,
    plateHighInr: 1000,
    note: "Weekday noon slots can pull hall toward the low band",
  },
  {
    zoneId: "south-central",
    seasonId: "off",
    hallLowInr: 100000,
    hallMidInr: 220000,
    hallHighInr: 420000,
    plateLowInr: 350,
    plateMidInr: 550,
    plateHighInr: 900,
    note: "Off-peak still needs a catering minimum — ask for plate × covers in writing",
  },
  {
    zoneId: "omr-ecr",
    seasonId: "peak",
    hallLowInr: 200000,
    hallMidInr: 400000,
    hallHighInr: 900000,
    plateLowInr: 500,
    plateMidInr: 850,
    plateHighInr: 1400,
    note: "Resort packages may look all-in until you add rooms, generator, and late-night music",
  },
  {
    zoneId: "omr-ecr",
    seasonId: "shoulder",
    hallLowInr: 160000,
    hallMidInr: 320000,
    hallHighInr: 700000,
    plateLowInr: 450,
    plateMidInr: 750,
    plateHighInr: 1200,
    note: "Midweek ECR banquets often discount décor more than food",
  },
  {
    zoneId: "omr-ecr",
    seasonId: "off",
    hallLowInr: 120000,
    hallMidInr: 250000,
    hallHighInr: 500000,
    plateLowInr: 400,
    plateMidInr: 650,
    plateHighInr: 1000,
    note: "Heat / monsoon weeks — confirm indoor backup and AC load charges",
  },
  {
    zoneId: "west",
    seasonId: "peak",
    hallLowInr: 120000,
    hallMidInr: 250000,
    hallHighInr: 550000,
    plateLowInr: 380,
    plateMidInr: 650,
    plateHighInr: 1000,
    note: "Popular west banquets fill festival weekends early — book with a written date lock",
  },
  {
    zoneId: "west",
    seasonId: "shoulder",
    hallLowInr: 90000,
    hallMidInr: 200000,
    hallHighInr: 420000,
    plateLowInr: 350,
    plateMidInr: 550,
    plateHighInr: 900,
    note: "Strong mid-market — compare veg / non-veg plate splits carefully",
  },
  {
    zoneId: "west",
    seasonId: "off",
    hallLowInr: 70000,
    hallMidInr: 150000,
    hallHighInr: 320000,
    plateLowInr: 300,
    plateMidInr: 480,
    plateHighInr: 800,
    note: "Best value corridor for large guest lists if travel is acceptable",
  },
  {
    zoneId: "north-suburbs",
    seasonId: "peak",
    hallLowInr: 80000,
    hallMidInr: 180000,
    hallHighInr: 400000,
    plateLowInr: 320,
    plateMidInr: 520,
    plateHighInr: 850,
    note: "Community halls keep the floor low; premium outdoor setups still spike",
  },
  {
    zoneId: "north-suburbs",
    seasonId: "shoulder",
    hallLowInr: 60000,
    hallMidInr: 140000,
    hallHighInr: 300000,
    plateLowInr: 280,
    plateMidInr: 450,
    plateHighInr: 750,
    note: "Factor guest transport / stay — the “cheap hall” can cost more in logistics",
  },
  {
    zoneId: "north-suburbs",
    seasonId: "off",
    hallLowInr: 45000,
    hallMidInr: 110000,
    hallHighInr: 240000,
    plateLowInr: 250,
    plateMidInr: 400,
    plateHighInr: 650,
    note: "Off-peak value — still audit generator, water, and waste clauses",
  },
];

export type HiddenCostItem = {
  id: string;
  title: string;
  summary: string;
};

/** Costs that rarely sit inside the headline hall + plate quote. */
export const WEDDING_HIDDEN_COSTS: HiddenCostItem[] = [
  {
    id: "gst-service",
    title: "GST + service charge",
    summary:
      "Ask whether quoted plate and hall figures are inclusive. 18% GST and venue service % can move the all-in total more than décor upgrades.",
  },
  {
    id: "generator-eb",
    title: "Generator / EB load",
    summary:
      "Peak AC + lighting + live music often triggers a separate generator or EB surcharge — especially on OMR / outdoor lawns.",
  },
  {
    id: "decoration-floor",
    title: "Décor minimums",
    summary:
      "Many halls mandate an in-house or preferred decorator with a floor spend. “Hall only” quotes can be misleading.",
  },
  {
    id: "extra-hours",
    title: "Extra hours & late music",
    summary:
      "Reception overrun, baraat delay, and DJ past curfew attract hourly fees or police permission costs.",
  },
  {
    id: "parking-valet",
    title: "Parking / valet / traffic police",
    summary:
      "Central south venues often need paid valet plus temporary traffic arrangements — not in the mandapam brochure line.",
  },
  {
    id: "guest-buffer",
    title: "Plate buffer & leftover policy",
    summary:
      "Caterers bill a guaranteed minimum covers count. Clarify buffer %, leftover packing, and kid plate rules before the final headcount.",
  },
  {
    id: "stay-travel",
    title: "Guest stay & coach hire",
    summary:
      "Suburban / ECR venues shift cost onto rooms and buses. Add that to the family budget, not just hall + catering.",
  },
  {
    id: "cleanup-damage",
    title: "Cleaning / damage deposit",
    summary:
      "Refundable deposits and floral-cleanup charges show up on the final invoice — photograph the venue at handover.",
  },
];

export const WEDDING_VENUE_METHODOLOGY =
  "Editorial synthesis of directional Chennai wedding hall and catering bands for family planning talks — not a venue rate card, not a caterer quote, and not advice from a wedding planner. Season, guest count, menu, and extras change totals sharply. Always get a written all-in estimate before paying advances.";

export const WEDDING_VENUE_FAQ = [
  {
    q: "Is the hall band per day or per function?",
    a: "Treat it as a directional day / function hire for planning. Many venues price morning + evening slots separately — confirm slot length in the contract.",
  },
  {
    q: "Does plate cost include welcome drinks and dessert?",
    a: "Often not fully. Live counters, mocktails, and ice-cream carts are common add-ons — list them before comparing two caterers.",
  },
  {
    q: "Why relate this to gold rate?",
    a: "Jewellery and gifts are a large parallel spend in Chennai weddings. Pair this desk with the gold rate hub when building a total family budget.",
  },
];

export function bandFor(
  zoneId: WeddingZoneId,
  seasonId: WeddingSeasonId,
): WeddingVenueBand | undefined {
  return WEDDING_VENUE_BANDS.find(
    (b) => b.zoneId === zoneId && b.seasonId === seasonId,
  );
}

export function formatWeddingInr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
