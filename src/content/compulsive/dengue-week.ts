import { compulsivePath } from "@/content/compulsive/index";

export const DENGUE_WEEK_PATH = compulsivePath("dengue-week");

export const DENGUE_GCC_NOTE =
  "GCC entomology (Dinamani / Samayam Tamil, mid-July 2026): 1,198 dengue cases in Greater Chennai from 1 Jan–15 Jul 2026, versus 1,910 in the same window of 2025. July 2026 was running ~4 cases/day vs ~10/day in July 2025 (ToI quoting GCC). Season typically builds from June and peaks toward November.";

export type DengueZoneCard = {
  id: string;
  zoneLabel: string;
  risk: "Watch" | "Checklist";
  why: string;
  doNow: string;
};

/**
 * Editorial risk themes — not a live case map.
 * GCC has not published a public August 2026 zone-wise case table we can cite.
 */
export const DENGUE_ZONE_CARDS: DengueZoneCard[] = [
  {
    id: "waterways",
    zoneLabel: "Cooum / Adyar / Buckingham Canal edges",
    risk: "Watch",
    why: "GCC flagged Culex (sewage water) along these banks for Japanese encephalitis / West Nile watch, separate from Aedes dengue.",
    doNow: "Don’t dump tyres or open drums on the bank. Report stagnant sewage to GCC 1913.",
  },
  {
    id: "construction",
    zoneLabel: "New construction / paused sites (citywide)",
    risk: "Watch",
    why: "GCC surveyed ~8,000 idle sites: standing water is enough for Aedes. Buildings dept told AEs to notice sites idle 15+ days.",
    doNow: "If a neighbouring plot has open tanks, photograph and file — don’t wait for a fever cluster.",
  },
  {
    id: "tnuhdb",
    zoneLabel: "TNUHDB / board colonies",
    risk: "Watch",
    why: "Open drums + 1 hp motors can pull larvae into overhead tanks (GCC vector-control officer to ToI).",
    doNow: "Close drums. Ask the association to cover sumps.",
  },
  {
    id: "omr-south",
    zoneLabel: "South / OMR new layouts",
    risk: "Checklist",
    why: "Fast layout growth + monsoon = more uncovered tanks, not a published zone case count.",
    doNow: "Weekly: terrace, AC trays, flower pots, discarded tyres.",
  },
  {
    id: "north",
    zoneLabel: "North industrial–housing mix",
    risk: "Checklist",
    why: "Same Aedes rules. No zone-wise 2026 case table in sources we reviewed — do not treat this as a ranking.",
    doNow: "DBC (domestic breeding checker) visits are the GCC field layer — let them in; one DBC per ~500 houses (GCC).",
  },
];

export const DENGUE_CHECKLIST = [
  "Empty AC outdoor trays and cooler tanks once a week",
  "Cover overhead tanks and sumps; no open drums",
  "Clear terrace / balcony saucers after rain",
  "Discard tyres or keep them dry and covered",
  "If fever + body pain after rains: test — don’t only take paracetamol for days",
];

export const DENGUE_FAQ = [
  {
    q: "Which zone has the most dengue right now?",
    a: "We do not publish a fake heat map. GCC released city totals (Jan–mid-Jul 2026) and said cases were lower than 2025, not a zone league table. This desk is a checklist + corridor watch.",
  },
  {
    q: "Is the monsoon surge “worse than last year”?",
    a: "City dengue totals through mid-July 2026 were lower than 2025 (GCC via Dinamani). Fever after rains still rose statewide (ToI, health dept). Lower than last year is not “safe”.",
  },
];
