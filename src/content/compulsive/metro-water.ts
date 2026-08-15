import { compulsivePath } from "@/content/compulsive/index";

export const METRO_WATER_PATH = compulsivePath("metro-water");

export const CMWSSB_SITE = "https://chennaimetrowater.tn.gov.in/";
export const CMWSSB_HELPLINE = "044 4567 4567";

export type WaterZoneCard = {
  id: string;
  zoneLabel: string;
  typical: string;
  watch: string;
  tip: string;
};

/**
 * Editorial supply-day patterns. CMWSSB publishes area notices;
 * this is not a live tanker / valve schedule.
 */
export const METRO_WATER_ZONES: WaterZoneCard[] = [
  {
    id: "north",
    zoneLabel: "North (Tondiarpet–Manali belt)",
    typical:
      "Many pockets still run on notified supply days rather than 24×7. Overhead tanks and sumps are the household buffer.",
    watch: "Industrial demand nearby; summer notices often tighten hours first here.",
    tip: "Note your depot / area name as printed on CMWSSB bills — “north Chennai” is too wide for a complaint.",
  },
  {
    id: "central",
    zoneLabel: "Central (Anna Nagar–Kilpauk–Egmore)",
    typical:
      "Older piped network with mixed pressure. Flats on higher floors feel cuts first.",
    watch: "Maintenance shutdowns on trunk mains show up as a morning miss, not a tweet.",
    tip: "Ask the association if the sump filled; a building pump failure is not a city cut.",
  },
  {
    id: "south",
    zoneLabel: "South (Adyar–Thiruvanmiyur–Velachery)",
    typical:
      "Better coverage than the far south-west, still not uniform 24×7 in every lane.",
    watch: "Canal / lake restoration work can reroute mains for days.",
    tip: "Keep one day’s drinking water; don’t assume the next tanker is “official” without a CMWSSB marking.",
  },
  {
    id: "omr",
    zoneLabel: "IT corridor (Perungudi–Sholinganallur)",
    typical:
      "Layout growth outruns mains. Many apartments mix Metro Water days with private tankers.",
    watch: "New layouts: confirm whether the connection is CMWSSB or a local body / private.",
    tip: "Tanker receipts should name the supplier. Unmarked tankers are a quality risk, not a city schedule.",
  },
  {
    id: "west",
    zoneLabel: "West (Porur–Ambattur–Maduravoyal)",
    typical:
      "Suburban expansion; supply hours vary by scheme and booster.",
    watch: "Monsoon turbidity complaints after the first heavy spell.",
    tip: "Boil or filter if the water looks muddy after rain — then file with CMWSSB, don’t only WhatsApp the group.",
  },
];

export const METRO_WATER_STEPS = [
  {
    title: "Read the last official notice",
    body: "CMWSSB posts area-wise supply / shutdown notes on its site and local papers. This desk does not replace those notices.",
  },
  {
    title: "Separate building vs city",
    body: "If the street has water and your overhead tank is empty, start with the association pump / plumber.",
  },
  {
    title: "File with CMWSSB",
    body: `Helpline ${CMWSSB_HELPLINE} (confirm on the current bill / site). Carry consumer / assessment number.`,
  },
];

export const METRO_WATER_FAQ = [
  {
    q: "Do you publish today’s valve timings?",
    a: "No. Timings change with maintenance. Use CMWSSB notices. This page explains how Chennai supply usually works by corridor.",
  },
  {
    q: "Is tanker water the same as Metro Water?",
    a: "Not always. Official CMWSSB tankers and private tankers are different. Ask for the supplier name and don’t pay cash to an unmarked lorry for “Corporation water”.",
  },
];
