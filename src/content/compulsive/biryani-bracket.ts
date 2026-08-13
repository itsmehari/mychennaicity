import { compulsivePath } from "@/content/compulsive/index";

export const BIRYANI_BRACKET_PATH = compulsivePath("biryani");

export const BIRYANI_VOTE_STORAGE_KEY = "mcc-biryani-bracket-v1";

export type BiryaniContender = {
  id: string;
  name: string;
  styleTag: string;
  blurb: string;
  hallmarks: string[];
};

/**
 * Editorial style/area bracket — not a brand award show.
 * Do not crown official winners or claim trademark restaurant rankings.
 */
export const BIRYANI_CONTENDERS: BiryaniContender[] = [
  {
    id: "ambur-style",
    name: "Ambur-style Seeraga Samba lane",
    styleTag: "Ambur-style",
    blurb:
      "Seeraga samba grain, soft meat, and that soft spice warmth Chennai lunch groups argue about forever.",
    hallmarks: [
      "Short-grain aroma over basmati drama",
      "Often milder heat than Donne heat-seekers expect",
      "Classic “office lunch pack” energy",
    ],
  },
  {
    id: "donne-style",
    name: "Donne-style heat bowl",
    styleTag: "Donne-style",
    blurb:
      "Leaf-bowl / high-heat cousin energy — fragrant, assertive, and proud of its spice punch.",
    hallmarks: [
      "Spice-forward, not shy",
      "Best with raita diplomacy",
      "Late-night recovery optional, not guaranteed",
    ],
  },
  {
    id: "thalassery-inspired",
    name: "Thalassery-inspired Malabar note",
    styleTag: "Thalassery-inspired",
    blurb:
      "Kerala-coast perfume — ghee, fried onion sweetness, and a softer spice arc than military-hotel spice stacks.",
    hallmarks: [
      "Aromatic, layered, often slightly sweeter edges",
      "Pairs well with pickle + papadam rituals",
      "Guest-dinner flex when you want “different but familiar”",
    ],
  },
  {
    id: "military-hotel",
    name: "Military-hotel style plate",
    styleTag: "Military hotel style",
    blurb:
      "No-frills spice, generous portions, and “we came for the rice, stayed for the debate” energy.",
    hallmarks: [
      "Bold masala, less plating theatre",
      "Often a group-order classic",
      "Ask heat level before you commit the whole table",
    ],
  },
  {
    id: "mylapore-legend",
    name: "Mylapore / traditional south legend lane",
    styleTag: "Local legend · south",
    blurb:
      "Neighbourhood loyalty plates — temple-town calendar meets Sunday family orders.",
    hallmarks: [
      "“We’ve always ordered from here” stories",
      "Festival weekends rewrite wait times",
      "More about trust than trend",
    ],
  },
  {
    id: "triplicane-legend",
    name: "Triplicane / Royapettah legend lane",
    styleTag: "Local legend · central",
    blurb:
      "Dense old-city food memory — short walks, long arguments, and midnight hunger maps.",
    hallmarks: [
      "Walkable hunger corridors",
      "Student + office mix traffic",
      "Confirm today’s special before you travel far",
    ],
  },
  {
    id: "omr-corridor",
    name: "OMR / IT corridor feast style",
    styleTag: "Local legend · OMR",
    blurb:
      "Campus lunch + gated-community dinner biryani — delivery apps know this map by heart.",
    hallmarks: [
      "Portion math for standup survivors",
      "Often fusion-adjacent menus nearby",
      "Traffic may arrive before the food does",
    ],
  },
  {
    id: "north-chennai",
    name: "North Chennai neighbourhood plate",
    styleTag: "Local legend · north",
    blurb:
      "Area pride, spice confidence, and “come eat at our place” hospitality — not a tourist brochure.",
    hallmarks: [
      "Strong local recommendations over map pins",
      "Spice and portion generosity",
      "Ask hosts — they know the real lane",
    ],
  },
];

/** Fixed playful rounds for the editorial bracket UI. */
export const BIRYANI_ROUNDS: { id: string; title: string; a: string; b: string }[] = [
  {
    id: "r1-ambur-donne",
    title: "Round 1 · Grain vs heat",
    a: "ambur-style",
    b: "donne-style",
  },
  {
    id: "r1-thalassery-military",
    title: "Round 1 · Perfume vs punch",
    a: "thalassery-inspired",
    b: "military-hotel",
  },
  {
    id: "r1-mylapore-triplicane",
    title: "Round 1 · South loyalty lanes",
    a: "mylapore-legend",
    b: "triplicane-legend",
  },
  {
    id: "r1-omr-north",
    title: "Round 1 · Corridor vs north pride",
    a: "omr-corridor",
    b: "north-chennai",
  },
];

export const BIRYANI_BRACKET_FAQ = [
  {
    q: "Is this an official restaurant ranking?",
    a: "No. It is a playful editorial bracket of styles and area legends. We do not award trademark brand winners or claim certified “best biryani in Chennai.”",
  },
  {
    q: "Where are my votes stored?",
    a: "Only in this browser (localStorage). Nobody else sees your crown unless you share it.",
  },
  {
    q: "Can menus and recipes change?",
    a: "Always. Treat style notes as conversation starters — confirm today’s plate with the kitchen.",
  },
];

export function getBiryaniContender(id: string): BiryaniContender | undefined {
  return BIRYANI_CONTENDERS.find((c) => c.id === id);
}
