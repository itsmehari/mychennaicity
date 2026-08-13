import { compulsivePath } from "@/content/compulsive/index";

export const USED_VEHICLE_PATH = compulsivePath("used-vehicle");

export type VehicleSegmentId = "hatch" | "compact-suv" | "activa" | "bike-150";

export type YearBucketId = "0-3" | "3-6" | "6-10" | "10-plus";

export type UsedVehicleBand = {
  segmentId: VehicleSegmentId;
  yearBucketId: YearBucketId;
  /** Directional low asking / deal floor, INR */
  lowInr: number;
  /** Directional mid planning figure, INR */
  midInr: number;
  /** Directional high / clean example, INR */
  highInr: number;
  note: string;
};

export const VEHICLE_SEGMENTS: {
  id: VehicleSegmentId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "hatch",
    label: "Hatchback",
    blurb: "City hatch class — Swift / i20 / Polo orbit, petrol-biased stock",
  },
  {
    id: "compact-suv",
    label: "Compact SUV",
    blurb: "Creta / Seltos / Brezza-class — Chennai’s favourite family upgrade",
  },
  {
    id: "activa",
    label: "Activa-class scooter",
    blurb: "110–125cc automatic scooter — Activa / Jupiter / Access orbit",
  },
  {
    id: "bike-150",
    label: "150cc bike",
    blurb: "Pulsar / Apache / R15-adjacent 150–160cc sport-commuter band",
  },
];

export const YEAR_BUCKETS: {
  id: YearBucketId;
  label: string;
  short: string;
}[] = [
  { id: "0-3", label: "0–3 years", short: "Near-new" },
  { id: "3-6", label: "3–6 years", short: "Mid" },
  { id: "6-10", label: "6–10 years", short: "Older" },
  { id: "10-plus", label: "10+ years", short: "Vintage stock" },
];

/** Directional Chennai used bands — editorial 2026 planning figures, not live listings. */
export const USED_VEHICLE_BANDS: UsedVehicleBand[] = [
  // Hatch
  {
    segmentId: "hatch",
    yearBucketId: "0-3",
    lowInr: 450000,
    midInr: 620000,
    highInr: 850000,
    note: "Low-km single-owner stock; dealer warranty packs push the high end",
  },
  {
    segmentId: "hatch",
    yearBucketId: "3-6",
    lowInr: 280000,
    midInr: 420000,
    highInr: 580000,
    note: "Sweet spot for city buyers — RC / insurance / service book decide the mid",
  },
  {
    segmentId: "hatch",
    yearBucketId: "6-10",
    lowInr: 150000,
    midInr: 250000,
    highInr: 380000,
    note: "Bodywork and AC compressor surprises are common in coastal humidity",
  },
  {
    segmentId: "hatch",
    yearBucketId: "10-plus",
    lowInr: 60000,
    midInr: 120000,
    highInr: 220000,
    note: "Scrappage policy + fitness paperwork matter more than sticker price",
  },
  // Compact SUV
  {
    segmentId: "compact-suv",
    yearBucketId: "0-3",
    lowInr: 850000,
    midInr: 1150000,
    highInr: 1600000,
    note: "Top variants and diesel hold the high band; OMR / ECR commute demand stays firm",
  },
  {
    segmentId: "compact-suv",
    yearBucketId: "3-6",
    lowInr: 550000,
    midInr: 780000,
    highInr: 1100000,
    note: "Most liquid segment in Chennai classifieds — verify accident history carefully",
  },
  {
    segmentId: "compact-suv",
    yearBucketId: "6-10",
    lowInr: 320000,
    midInr: 480000,
    highInr: 720000,
    note: "Tyre + suspension refresh often needed after Outer Ring / IT corridor km",
  },
  {
    segmentId: "compact-suv",
    yearBucketId: "10-plus",
    lowInr: 150000,
    midInr: 280000,
    highInr: 450000,
    note: "First-gen compact SUVs — budget for rust, mounts, and rising parts cost",
  },
  // Activa-class scooter
  {
    segmentId: "activa",
    yearBucketId: "0-3",
    lowInr: 55000,
    midInr: 72000,
    highInr: 95000,
    note: "Near-new automatics move fast; check for flood / submerged history after monsoon",
  },
  {
    segmentId: "activa",
    yearBucketId: "3-6",
    lowInr: 35000,
    midInr: 48000,
    highInr: 65000,
    note: "Belt, rollers, and battery are the usual negotiation levers",
  },
  {
    segmentId: "activa",
    yearBucketId: "6-10",
    lowInr: 18000,
    midInr: 28000,
    highInr: 40000,
    note: "Honest daily-use stock — rusted floorboard and warped panels sink the low end",
  },
  {
    segmentId: "activa",
    yearBucketId: "10-plus",
    lowInr: 8000,
    midInr: 15000,
    highInr: 25000,
    note: "Parts still easy; treat as short-hop transport, not an investment",
  },
  // 150cc bike
  {
    segmentId: "bike-150",
    yearBucketId: "0-3",
    lowInr: 85000,
    midInr: 115000,
    highInr: 160000,
    note: "Sport-commuter near-new — ABS variants sit toward the high band",
  },
  {
    segmentId: "bike-150",
    yearBucketId: "3-6",
    lowInr: 55000,
    midInr: 78000,
    highInr: 110000,
    note: "Most common student / first-job purchase band in Chennai",
  },
  {
    segmentId: "bike-150",
    yearBucketId: "6-10",
    lowInr: 30000,
    midInr: 45000,
    highInr: 70000,
    note: "Chain-sprocket, fork seals, and tyre set often overdue — bake into the offer",
  },
  {
    segmentId: "bike-150",
    yearBucketId: "10-plus",
    lowInr: 12000,
    midInr: 25000,
    highInr: 40000,
    note: "Paperwork + frame condition trump cosmetic shine",
  },
];

export const USED_VEHICLE_METHODOLOGY =
  "Editorial synthesis of directional Chennai used-market ranges for planning conversations — not classified ads, not a live auction feed, and not a valuation certificate. Actual asking prices swing with km, variant, accident history, finance clearance, and season. Always inspect, verify RC / insurance, and get an independent mechanic check before paying.";

export const USED_VEHICLE_FAQ = [
  {
    q: "Can I use these bands as a loan sanction quote?",
    a: "No. Lenders and dealers use their own valuation grids. Treat this as a conversation starter before you shortlist and inspect.",
  },
  {
    q: "Why no brand-model matrix?",
    a: "Variant, colour, and accident history move numbers more than a generic model name. Segment + year keeps the pulse honest without pretending to be OLX.",
  },
  {
    q: "Do flood years change the mid?",
    a: "Yes — after heavy monsoon seasons, clean documented stock commands a premium and submerged risk stock should sit well below our low band.",
  },
];

export function bandsForSegment(segmentId: VehicleSegmentId): UsedVehicleBand[] {
  return USED_VEHICLE_BANDS.filter((b) => b.segmentId === segmentId);
}

export function formatInrLakhOrWhole(n: number): string {
  if (n >= 100000) {
    const lakh = n / 100000;
    const rounded = lakh >= 10 ? lakh.toFixed(1) : lakh.toFixed(2);
    return `₹${rounded.replace(/\.?0+$/, "")}L`;
  }
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
