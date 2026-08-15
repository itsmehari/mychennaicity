import { compulsivePath } from "@/content/compulsive/index";

export const FLOOD_STREET_PATH = compulsivePath("flood-street");

export const FLOOD_MAYOR_DESK =
  "/chennai-local-news/chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026";

/**
 * From GCC / Mayor R. Priya monsoon prep reporting (Aug 2026 week desk):
 * 294 mapped stagnation points; Sholinganallur cited with 76.
 * This is an editorial score, not a live flood sensor.
 */
export type FloodZoneScore = {
  id: string;
  zoneLabel: string;
  score: number;
  basis: string;
  doBeforeRain: string;
};

export const FLOOD_ZONE_SCORES: FloodZoneScore[] = [
  {
    id: "sholinganallur",
    zoneLabel: "Sholinganallur",
    score: 9,
    basis: "Mayor / GCC monsoon mapping cited 76 of 294 stagnation points in this zone — the highest named count in that briefing.",
    doBeforeRain: "Photograph street trenches and storm-water inlets now. Keep a dry-bag for documents.",
  },
  {
    id: "perungudi",
    zoneLabel: "Perungudi / OMR low pockets",
    score: 8,
    basis: "IT-corridor service roads and marsh edges recur in every monsoon desk. Not a separate official count in the 294 list we have.",
    doBeforeRain: "Know your building plinth vs road. Don’t park in known dip points overnight when a warning is out.",
  },
  {
    id: "adyar",
    zoneLabel: "Adyar / canal-edge",
    score: 7,
    basis: "Canal overtopping and underpasses are a documented historic pattern; treat as high watch, not a live gauge.",
    doBeforeRain: "Avoid canal-edge cut-throughs during a spell. Keep the ward number for GCC 1913.",
  },
  {
    id: "velachery",
    zoneLabel: "Velachery / south-west tanks",
    score: 7,
    basis: "Tank-surplus and underpass flooding is a long-running Chennai pattern.",
    doBeforeRain: "If you use an underpass daily, have a bypass route saved offline.",
  },
  {
    id: "north",
    zoneLabel: "North coastal / industrial",
    score: 6,
    basis: "Ennore–Manali drainage and bund issues appear in civic reporting; score is editorial, not the 76-point figure.",
    doBeforeRain: "Check local SWD work before the NE monsoon — our Kodungaiyur / canal desks are the paper trail.",
  },
  {
    id: "central",
    zoneLabel: "Central planned neighbourhoods",
    score: 4,
    basis: "Fewer named stagnation clusters in the August 2026 briefing than the far south. Still floods at underpasses.",
    doBeforeRain: "Clear balcony drains. Don’t assume “Anna Nagar doesn’t flood”.",
  },
];

export const FLOOD_FAQ = [
  {
    q: "Is 9/10 a live flood warning?",
    a: "No. It is an editorial score from published GCC stagnation mapping and historic corridor patterns. For tonight’s rain, use IMD / Skymet and GCC alerts — not this page.",
  },
  {
    q: "Where do the 294 points come from?",
    a: "Greater Chennai Corporation monsoon-prep reporting quoted by our Mayor 50 cm desk (August 2026). Sholinganallur 76 was named in that briefing. We do not invent the other zone counts.",
  },
];
