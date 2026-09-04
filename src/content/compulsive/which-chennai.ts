import { compulsivePath } from "@/content/compulsive/index";

export const WHICH_CHENNAI_PATH = compulsivePath("which-chennai");

export type ChennaiArchetypeId = "mylapore" | "omr" | "north" | "west";

export type ChennaiArchetype = {
  id: ChennaiArchetypeId;
  label: string;
  tagline: string;
  blurb: string;
  vibe: string[];
  shareLine: string;
};

export const WHICH_CHENNAI_ARCHETYPES: ChennaiArchetype[] = [
  {
    id: "mylapore",
    label: "Mylapore / traditional south",
    tagline: "Temple bells, filter coffee, and “why are you rushing?” energy",
    blurb:
      "You clock festivals before FOMO apps. Sunday means a walkable stretch, a set meal, and the quiet confidence that Chennai’s heart still beats near Kapaleeswarar — even if your office is elsewhere.",
    vibe: [
      "Early mornings > late brunch chaos",
      "Strong opinions on filter coffee foam",
      "Neighbourhood loyalty over shiny malls",
    ],
    shareLine: "I got Mylapore / traditional south Chennai energy.",
  },
  {
    id: "omr",
    label: "OMR / IT corridor",
    tagline: "Standup at 10, AC at 11, cab math forever",
    blurb:
      "Your week revolves around campuses, gated communities, and whether the Outer Ring / OMR crawl will ruin dinner plans. You know every food court, every “quick” pizza, and every WFH negotiation.",
    vibe: [
      "Calendar blocks named after traffic",
      "Gated community WhatsApp is life",
      "Comfort food = whatever’s open at 11pm",
    ],
    shareLine: "I got OMR / IT corridor Chennai energy.",
  },
  {
    id: "north",
    label: "North Chennai pulse",
    tagline: "Harbour breeze, old markets, and unfiltered city pride",
    blurb:
      "You respect the city’s working spine — ports, mills heritage, beach stretches, and neighbourhoods that don’t need a brochure. Food is serious, loyalty is local, and you side-eye anyone who thinks Chennai starts at Adyar.",
    vibe: [
      "Markets over concept cafés (most days)",
      "Beach / harbour mental maps",
      "Straight talk, big heart",
    ],
    shareLine: "I got North Chennai pulse energy.",
  },
  {
    id: "west",
    label: "West Chennai planner",
    tagline: "Anna Nagar grids, Porur orbits, school-run logistics",
    blurb:
      "You think in rings and arterial roads. Schools, hospitals, Outer Ring access, and “is this society EB-ready?” sit in the same brain tab. Your Chennai is planned layouts, weekend malls, and a spreadsheet for weekend visits.",
    vibe: [
      "Layouts, parks, and parking debates",
      "West / ORR commute fluency",
      "Family logistics as a competitive sport",
    ],
    shareLine: "I got West Chennai planner energy.",
  },
];

export type WhichChennaiOption = {
  id: string;
  label: string;
  /** Points added to each archetype when selected */
  weights: Partial<Record<ChennaiArchetypeId, number>>;
};

export type WhichChennaiQuestion = {
  id: string;
  prompt: string;
  options: WhichChennaiOption[];
};

export const WHICH_CHENNAI_QUESTIONS: WhichChennaiQuestion[] = [
  {
    id: "weekend",
    prompt: "Ideal Sunday morning?",
    options: [
      {
        id: "temple-coffee",
        label: "Temple / quiet street + filter coffee",
        weights: { mylapore: 3, north: 1 },
      },
      {
        id: "beach-jog",
        label: "Beach stretch or harbour breeze walk",
        weights: { north: 3, mylapore: 1 },
      },
      {
        id: "mall-brunch",
        label: "Mall brunch then catch up on emails",
        weights: { omr: 2, west: 2 },
      },
      {
        id: "park-kids",
        label: "Park / society playground + school WhatsApp catch-up",
        weights: { west: 3, mylapore: 1 },
      },
    ],
  },
  {
    id: "commute",
    prompt: "Your commute philosophy?",
    options: [
      {
        id: "walk-short",
        label: "Keep it short — walkable beats heroic",
        weights: { mylapore: 3, north: 1 },
      },
      {
        id: "cab-budget",
        label: "Cab / auto budget is a line item",
        weights: { omr: 3 },
      },
      {
        id: "orr-ring",
        label: "Ring roads and arterial timing are a skill",
        weights: { west: 3, omr: 1 },
      },
      {
        id: "local-bus",
        label: "Locals / buses / know-your-route pride",
        weights: { north: 3, mylapore: 1 },
      },
    ],
  },
  {
    id: "food",
    prompt: "Comfort meal when the week wins?",
    options: [
      {
        id: "meals",
        label: "Proper meals / tiffin place you’ve trusted for years",
        weights: { mylapore: 3, north: 1 },
      },
      {
        id: "biryani",
        label: "Serious biryani from a neighbourhood name",
        weights: { north: 3, mylapore: 1 },
      },
      {
        id: "foodcourt",
        label: "Food court / cloud kitchen roulette",
        weights: { omr: 3, west: 1 },
      },
      {
        id: "chain",
        label: "Reliable chain near the mall / ORR",
        weights: { west: 3, omr: 1 },
      },
    ],
  },
  {
    id: "housing",
    prompt: "Dream housing vibe?",
    options: [
      {
        id: "independent",
        label: "Older independent / street with character",
        weights: { mylapore: 3, north: 2 },
      },
      {
        id: "gated",
        label: "Gated community with gym + generator lore",
        weights: { omr: 3, west: 2 },
      },
      {
        id: "layout",
        label: "Planned layout, parks, school cluster",
        weights: { west: 3, mylapore: 1 },
      },
      {
        id: "near-work",
        label: "Whatever is closest to the office campus",
        weights: { omr: 3 },
      },
    ],
  },
  {
    id: "fest",
    prompt: "Festival season mode?",
    options: [
      {
        id: "kolam",
        label: "Kolam, temple calendar, traditional playlist",
        weights: { mylapore: 3, west: 1 },
      },
      {
        id: "office",
        label: "Office decorations + WFH hybrid chaos",
        weights: { omr: 3 },
      },
      {
        id: "street",
        label: "Street processions / neighbourhood loud pride",
        weights: { north: 3, mylapore: 1 },
      },
      {
        id: "kids",
        label: "School events + society cultural night",
        weights: { west: 3 },
      },
    ],
  },
  {
    id: "guest",
    prompt: "Out-of-town guests arrive. First stop?",
    options: [
      {
        id: "kapali",
        label: "Temple / heritage south stretch",
        weights: { mylapore: 3 },
      },
      {
        id: "marina",
        label: "Marina / north beach energy",
        weights: { north: 3 },
      },
      {
        id: "ecr",
        label: "ECR sunset after an OMR lunch",
        weights: { omr: 3, mylapore: 1 },
      },
      {
        id: "phoenix",
        label: "Big mall + easy parking",
        weights: { west: 3, omr: 1 },
      },
    ],
  },
  {
    id: "news",
    prompt: "What city news hooks you first?",
    options: [
      {
        id: "culture",
        label: "Festivals, kutcheris, neighbourhood stories",
        weights: { mylapore: 3, west: 1 },
      },
      {
        id: "infra",
        label: "Flyovers, metro, ORR, campus shuttles",
        weights: { omr: 2, west: 2 },
      },
      {
        id: "civic",
        label: "Ports, markets, working-city beats",
        weights: { north: 3 },
      },
      {
        id: "schools",
        label: "Schools, hospitals, society EB drama",
        weights: { west: 3, omr: 1 },
      },
    ],
  },
  {
    id: "rain",
    prompt: "When rains hit hard, your instinct?",
    options: [
      {
        id: "stock",
        label: "Stock groceries early; trust old neighbourhood wisdom",
        weights: { mylapore: 2, north: 2 },
      },
      {
        id: "wfh",
        label: "Flip to WFH and watch OMR status stories",
        weights: { omr: 3 },
      },
      {
        id: "pump",
        label: "Check sump / society generator WhatsApp",
        weights: { west: 3, omr: 1 },
      },
      {
        id: "ground",
        label: "Check low-lying streets you actually know",
        weights: { north: 3, mylapore: 1 },
      },
    ],
  },
  {
    id: "identity",
    prompt: "Pick the line that feels most you:",
    options: [
      {
        id: "slow",
        label: "“Chennai isn’t slow — you’re impatient.”",
        weights: { mylapore: 3 },
      },
      {
        id: "ship",
        label: "“Ship the sprint; traffic is just lag.”",
        weights: { omr: 3 },
      },
      {
        id: "spine",
        label: "“Don’t erase the city’s working spine.”",
        weights: { north: 3 },
      },
      {
        id: "plan",
        label: "“If it isn’t planned, it’ll cost you later.”",
        weights: { west: 3 },
      },
    ],
  },
];

export const WHICH_CHENNAI_FAQ = [
  {
    q: "Is this a scientific personality test?",
    a: "No — it is a playful Chennai desk quiz. Archetypes are editorial shorthand for neighbourhood energy, not identity labels or rankings.",
  },
  {
    q: "Can I share my result?",
    a: "Yes. Use the copy / share button. Deep links use ?r=archetypeId so friends can open your result directly.",
  },
  {
    q: "What if I live in one place and work in another?",
    a: "That is normal Chennai. Answer with how you actually spend weekends and evenings — the quiz is vibe, not your pin code.",
  },
  {
    q: "Does this rank Chennai neighbourhoods?",
    a: "No. Archetypes are playful editorial shorthand, not a league table or property advice.",
  },
  {
    q: "Should I use this to choose a rental area?",
    a: "No. Use the afford-area calculator and area hubs for planning. This quiz is vibe only.",
  },
];

export function scoreWhichChennai(
  answers: Record<string, string>,
): { scores: Record<ChennaiArchetypeId, number>; winner: ChennaiArchetype } {
  const scores: Record<ChennaiArchetypeId, number> = {
    mylapore: 0,
    omr: 0,
    north: 0,
    west: 0,
  };

  for (const q of WHICH_CHENNAI_QUESTIONS) {
    const optionId = answers[q.id];
    if (!optionId) continue;
    const option = q.options.find((o) => o.id === optionId);
    if (!option) continue;
    for (const [arch, pts] of Object.entries(option.weights) as [
      ChennaiArchetypeId,
      number,
    ][]) {
      scores[arch] += pts;
    }
  }

  const winnerId = (Object.keys(scores) as ChennaiArchetypeId[]).reduce((best, id) =>
    scores[id] > scores[best] ? id : best,
  );

  const winner =
    WHICH_CHENNAI_ARCHETYPES.find((a) => a.id === winnerId) ?? WHICH_CHENNAI_ARCHETYPES[0];

  return { scores, winner };
}

export function archetypeById(id: string | null | undefined): ChennaiArchetype | undefined {
  if (!id) return undefined;
  return WHICH_CHENNAI_ARCHETYPES.find((a) => a.id === id);
}
