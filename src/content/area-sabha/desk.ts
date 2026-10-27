import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const AREA_SABHA_WHOIS =
  "https://chennaicorporation.gov.in/gcc/who-is-who/index_data.jsp";
export const GCC_COMPLAINT =
  "https://chennaicorporation.gov.in/gcc/online-civic-services/";
export const GCC_COUNCIL =
  "https://chennaicorporation.gov.in/gcc/council/about-council";

export const AREA_SABHA_AEO_ANSWER =
  "Greater Chennai still runs on the operational 15-zone, 200-ward system. Ward Committees exist in GCC (each zone has a listed Ward Committee Chairman on the Corporation who-is-who). Area Sabha — the smaller street-level meeting envisaged in urban local-body law — is not published by GCC as a citywide, machine-readable calendar. This desk explains how the two layers work, where to look for a notice, and what to take. Meeting minutes appear below only after we verify a notice; we do not invent dates or venues.";

export const AREA_SABHA_STEPS = [
  {
    title: "Confirm your current ward",
    body: "Use the Zone & Ward Finder with a locality, PIN hint, or map pin. Apartment marketing names often straddle two wards. The operational answer is always the current 15-zone GCC ward — not a proposed 20-zone map.",
  },
  {
    title: "Find the Ward Committee chair and zonal office",
    body: "GCC Who is Who lists a Ward Committee Chairman per zone and a Zonal Officer with address, landline, and aczone email. That is the first official door for a neighbourhood grievance that is not an emergency.",
  },
  {
    title: "Ask how the next meeting is notified",
    body: "Ask the zonal office and your councillor how Ward Committee / Area Sabha sittings are announced — notice board, WhatsApp, or a paper circular. Do not rely on this website as the live calendar until a verified row is listed below.",
  },
  {
    title: "File the civic issue in parallel",
    body: "A meeting does not replace 1913 or GCC online civic services. Use the Responsibility Router to pick the right agency (GCC, Metro Water, Tangedco, police) before you wait for a sabha slot.",
  },
];

export const AREA_SABHA_FAQ = [
  {
    q: "Does Chennai already operate Area Sabhas in every ward?",
    a: "Ward Committees are listed on GCC’s who-is-who. Area Sabha sittings — smaller, more local meetings — are not issued by the Corporation as a single public feed. Treat any date you see on social media as unverified until the zonal office or councillor confirms it.",
  },
  {
    q: "What can a Ward Committee actually do?",
    a: "In Tamil Nadu’s urban local-body framework, ward committees can take up local works, grievances, and proposals that then go to the council. They cannot rewrite zone boundaries, override a police station, or replace Metro Water / Tangedco helplines.",
  },
  {
    q: "Will this page show tomorrow’s meeting?",
    a: "Only after we ingest a verified notice or minutes (date, venue, ward, source). The list below is empty on purpose. We would rather show a gap than a fake agenda.",
  },
  {
    q: "Who do I call if the drain is overflowing tonight?",
    a: "GCC 1913 and the online civic-services portal. Then use the zonal office desk for the Zone I–XV counter. Do not wait for an Area Sabha.",
  },
];

export const AREA_SABHA_RELATED = [
  { href: CIVIC_TOOL_PATHS.zoneWardFinder, label: "Zone & Ward Finder" },
  { href: CIVIC_TOOL_PATHS.zonalOfficeAccess, label: "Zonal office access" },
  { href: CIVIC_TOOL_PATHS.responsibilityRouter, label: "Responsibility router" },
  { href: CIVIC_TOOL_PATHS.reorgTracker, label: "Reorganisation tracker" },
];
