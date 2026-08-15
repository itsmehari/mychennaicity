import { compulsivePath } from "@/content/compulsive/index";

export const POWER_FEEDER_PATH = compulsivePath("power-feeder");

export const TANGEDCO_MINNAGAM = "94987 94987";
export const TANGEDCO_PORTAL = "https://www.tangedco.org/";
export const TNPDCL_BILL_HUB =
  "/chennai-local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection";

export type FeederCorridor = {
  id: string;
  zoneLabel: string;
  corridor: string;
  pattern: string;
  tip: string;
};

/** Editorial feeder / outage patterns — not live Tangedco SCADA. */
export const POWER_FEEDER_CORRIDORS: FeederCorridor[] = [
  {
    id: "north-harbour",
    zoneLabel: "Thiruvottiyur / Royapuram",
    corridor: "Harbour, Ennore, and industrial feeder belts",
    pattern:
      "Shift-change load plus coastal weather can trip industrial feeders; residential pockets nearby feel it as a sudden dark stretch.",
    tip: "Note if the whole street lost supply (feeder) vs one pole (streetlight). Feeder = Tangedco; isolated pole = often GCC electrical.",
  },
  {
    id: "ambattur-estate",
    zoneLabel: "Ambattur",
    corridor: "Estate and Mogappair residential loops",
    pattern:
      "Industrial + housing mix; summer AC peaks and monsoon tree-on-line faults are the usual complaints.",
    tip: "Keep your service connection (SC) number from the bill before calling Minnagam.",
  },
  {
    id: "anna-nagar",
    zoneLabel: "Anna Nagar / Kilpauk",
    corridor: "Planned avenues vs inner cross-cuts",
    pattern:
      "Main roads restore faster; inner streets wait on the same feeder. Transformer humming after a trip is a common neighbour cue.",
    tip: "Ask two neighbours if their SC is also dark before assuming a house-only fuse.",
  },
  {
    id: "teynampet",
    zoneLabel: "Teynampet / Nungambakkam",
    corridor: "Commercial arteries and service lanes",
    pattern:
      "Mixed HT/LT; one transformer can darken a lane while the arterial shops stay lit.",
    tip: "Landmark + transformer number painted on the kiosk helps the AE more than “Nungambakkam power cut”.",
  },
  {
    id: "adyar",
    zoneLabel: "Adyar / Thiruvanmiyur",
    corridor: "Canal-edge and beach-road residential",
    pattern:
      "Tree canopy and older UG/OH mix. Brief evening dips during rain are frequently reported.",
    tip: "Photo the dark block with a shop board; attach SC number in the Tangedco app / Minnagam call.",
  },
  {
    id: "omr",
    zoneLabel: "Perungudi / Sholinganallur",
    corridor: "OMR IT parks vs municipal stretches",
    pattern:
      "Campus DG keeps offices bright while the service road is dark — two different authorities.",
    tip: "Campus roads stay with the park / builder. Municipal stretch → Tangedco for supply, GCC for streetlights.",
  },
];

export const POWER_FEEDER_STEPS = [
  {
    title: "Decide: feeder vs streetlight vs house",
    body: "Whole street + neighbouring houses dark → Tangedco feeder. Only the pole lamp dark → GCC 1913. Only your flat → MCB / internal wiring first.",
  },
  {
    title: "Call Minnagam with SC number",
    body: `Tangedco consumer helpline ${TANGEDCO_MINNAGAM}. Have the 12-digit (or bill) service connection number ready.`,
  },
  {
    title: "Use the official portal / app",
    body: "Outage and complaint channels change; start at tangedco.org or the current TNPDCL consumer site printed on your bill. Do not pay anyone who DMs you a “restore fee”.",
  },
];

export const POWER_FEEDER_FAQ = [
  {
    q: "Is this a live outage map?",
    a: "No. It is an editorial desk of recurring Chennai feeder patterns plus how to report. Tangedco does not publish a public live map we can legally mirror.",
  },
  {
    q: "What if only the streetlight is dark?",
    a: "Use the streetlight dead-spots desk and GCC 1913. Supply to houses can be fine while the lamp is dead.",
  },
  {
    q: "Does this replace the July–August bill-shock desk?",
    a: "No. High bills are a metering/assessment issue. This page is about supply going off. Link both when relevant.",
  },
];
