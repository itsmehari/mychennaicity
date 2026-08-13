import { compulsivePath } from "@/content/compulsive/index";

export const STREETLIGHT_PATH = compulsivePath("streetlight");

export type StreetlightCorridor = {
  id: string;
  zoneLabel: string;
  corridor: string;
  pattern: string;
  tip: string;
};

/**
 * Editorial corridors — known night-visibility pain patterns by zone.
 * Not live complaint status; not a UGC wall.
 */
export const STREETLIGHT_CORRIDORS: StreetlightCorridor[] = [
  {
    id: "thiru-ennore",
    zoneLabel: "Thiruvottiyur",
    corridor: "Ennore High Road stretches near industrial access roads",
    pattern: "Long gaps between poles; fog + dust reduce effective light at night.",
    tip: "Note the nearest landmark / bus stop and pole number if painted on the base.",
  },
  {
    id: "royapuram-harbour",
    zoneLabel: "Royapuram",
    corridor: "Harbour-side service lanes and approach roads",
    pattern: "Mixed agency lighting; some stretches feel dark between commercial strips.",
    tip: "Clarify whether the stretch is GCC road lighting vs port / agency compound lighting before escalating.",
  },
  {
    id: "ambattur-estate",
    zoneLabel: "Ambattur",
    corridor: "Industrial estate feeder roads after shift change",
    pattern: "Worker foot traffic after dark; intermittent dead poles reported by residents seasonally.",
    tip: "Photo the dark stretch with a readable landmark (gate number, shop board).",
  },
  {
    id: "anna-nagar-inner",
    zoneLabel: "Anna Nagar",
    corridor: "Inner residential cross-cuts away from 2nd Avenue",
    pattern: "Main avenues bright; side streets can have single-pole outages that go unnoticed.",
    tip: "Ward number + cross street names help zone electrical faster than “Anna Nagar” alone.",
  },
  {
    id: "teynampet-cut",
    zoneLabel: "Teynampet",
    corridor: "Service cuts behind commercial arteries (Nungambakkam / Teynampet belt)",
    pattern: "Tree canopy + parked vehicles hide outages until monsoon.",
    tip: "Mention if the pole is under trees — pruning vs lamp repair may be different desks.",
  },
  {
    id: "kodambakkam-lanes",
    zoneLabel: "Kodambakkam",
    corridor: "Film-city adjacent residential lanes off arterial roads",
    pattern: "Narrow lanes with older fittings; one dead pole darkens a whole bend.",
    tip: "Include Google/OSM pin if the lane has no clear board name.",
  },
  {
    id: "adyar-canal",
    zoneLabel: "Adyar",
    corridor: "Canal- and park-edge walks used as evening cut-throughs",
    pattern: "Pedestrian paths feel darker than parallel main roads.",
    tip: "Say whether the path is inside a park (Parks desk) or on a Corporation road (Electrical).",
  },
  {
    id: "perungudi-omr",
    zoneLabel: "Perungudi",
    corridor: "OMR service roads and IT park approach loops",
    pattern: "Bright IT campuses next to darker municipal stretches confuse complainants.",
    tip: "Confirm road ownership (GCC vs private campus / highway agency) before filing only with GCC.",
  },
  {
    id: "sholinganallur-link",
    zoneLabel: "Sholinganallur",
    corridor: "Link roads between OMR and residential layouts",
    pattern: "Rapid layout growth; poles added in phases leave temporary dark pockets.",
    tip: "New layouts: carry assessment / layout name plus landmark for the electrical wing.",
  },
];

export const STREETLIGHT_REPORT_STEPS = [
  {
    title: "Capture evidence",
    body: "Night photo, approximate address, landmark, and pole number if visible. Note since when it has been dark.",
  },
  {
    title: "Confirm authority",
    body: "Most streetlights on GCC roads → Greater Chennai Corporation Electrical (street lights). Feeder / supply collapse may involve Tangedco. Private campus roads stay with the campus.",
  },
  {
    title: "File via GCC channels",
    body: "Use GCC online civic services or dial 1913. Include ward / zone if you know them — our Zone & Ward Finder helps.",
  },
  {
    title: "Escalate with ticket id",
    body: "Keep the complaint number. Follow up at the ward office or zone electrical AE if the outage persists beyond the stated SLA on the portal.",
  },
];

export const STREETLIGHT_GCC_PORTAL =
  "https://chennaicorporation.gov.in/gcc/online-civic-services/";

export const STREETLIGHT_FAQ = [
  {
    q: "Is this a live map of every dark street?",
    a: "No. It is an editorial desk of recurring corridor patterns plus how to report. We do not host live complaint status or crowd pins in this MVP.",
  },
  {
    q: "Can I tip a corridor for the desk?",
    a: "Yes — email a short note (zone, street, pattern). Tips inform editorial updates; they are not an official GCC ticket.",
  },
  {
    q: "What if Tangedco is the real issue?",
    a: "If neighbouring houses also lost power or the whole feeder is out, start with Tangedco. Isolated dark poles on an otherwise lit road are usually GCC streetlight.",
  },
];
