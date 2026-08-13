import { compulsivePath } from "@/content/compulsive/index";

export const AREA_RIVALRIES_PATH = compulsivePath("rivalries");

export type RivalrySide = {
  id: string;
  name: string;
  food: string;
  commute: string;
  vibe: string;
  peaceTip: string;
};

export type AreaRivalry = {
  id: string;
  title: string;
  tease: string;
  a: RivalrySide;
  b: RivalrySide;
};

export const AREA_RIVALRIES: AreaRivalry[] = [
  {
    id: "adyar-besant",
    title: "Adyar vs Besant Nagar",
    tease: "South royalty face-off — trees and temples vs beach breeze.",
    a: {
      id: "adyar",
      name: "Adyar",
      food: "Classic meals belts, bakery runs, and “we’ve always come here” loyalty.",
      commute: "Central-ish south links; traffic thickens near junctions and school hours.",
      vibe: "Leafy, institutional, quietly premium — less postcard, more lived-in south.",
      peaceTip: "Call it complementary: Adyar for errands and schools, Besant for sunset resets.",
    },
    b: {
      id: "besant",
      name: "Besant Nagar",
      food: "Beach-road snacks, café hops, and weekend crowd energy.",
      commute: "Beautiful until parking and beach traffic invent new rules.",
      vibe: "Elliot’s glow, stroll culture, and out-of-town guest magnet.",
      peaceTip: "Skip “better” — ask who needs daily walkability vs who needs the sea.",
    },
  },
  {
    id: "velachery-medavakkam",
    title: "Velachery vs Medavakkam",
    tease: "Metro lake belt vs expanding south-east suburb reality.",
    a: {
      id: "velachery",
      name: "Velachery",
      food: "Dense options — from quick bites to established favourites near the lake belt.",
      commute: "Metro advantage for many; road snarls still teach patience.",
      vibe: "Established mid-south density with retail and apartment rhythm.",
      peaceTip: "If Metro access is non-negotiable, Velachery often wins the argument.",
    },
    b: {
      id: "medavakkam",
      name: "Medavakkam",
      food: "Growing food map — more delivery heroes, fewer “classic” landmarks (yet).",
      commute: "Outer growth trade-off: space vs longer peaking corridors.",
      vibe: "Newer builds, younger households, still-settling street character.",
      peaceTip: "Budget and floor space often tip Medavakkam — visit at rush hour before signing.",
    },
  },
  {
    id: "anna-kk",
    title: "Anna Nagar vs KK Nagar",
    tease: "West planned-layout cousins with different flexes.",
    a: {
      id: "anna-nagar",
      name: "Anna Nagar",
      food: "Tower Park orbit eats, bakery culture, and reliable family restaurants.",
      commute: "Grid confidence — until you hit the arterials at school-out time.",
      vibe: "Classic west: parks, planned blocks, “we know our sector” pride.",
      peaceTip: "Both are west planners — pick by school cluster and your daily arterial.",
    },
    b: {
      id: "kk-nagar",
      name: "KK Nagar",
      food: "Neighbourhood staples and Ashok Pillar-adjacent convenience.",
      commute: "Ashok Pillar / west links; Metro adjacency is a real flex for some trips.",
      vibe: "Compact west living with strong local loops.",
      peaceTip: "If Metro + compact errands matter more than wide sectors, KK often lands softer.",
    },
  },
  {
    id: "tnagar-mylapore",
    title: "T Nagar vs Mylapore",
    tease: "Shopping sprint vs temple-and-tiffin soul.",
    a: {
      id: "t-nagar",
      name: "T Nagar",
      food: "Everything is nearby — and so is everyone else during sale season.",
      commute: "Usable mid-city links; weekends can feel like a festival without the music.",
      vibe: "Retail theatre, wedding shopping lore, high-energy streets.",
      peaceTip: "Shop in T Nagar, decompress in Mylapore — Chennai’s classic combo move.",
    },
    b: {
      id: "mylapore",
      name: "Mylapore",
      food: "Filter coffee orthodoxy and meals that don’t need a trend report.",
      commute: "Central-south character walks; car patience still required.",
      vibe: "Temple rhythm, heritage lanes, unhurried neighbourhood identity.",
      peaceTip: "If your guests want “real Chennai,” start Mylapore — then let them loose in T Nagar.",
    },
  },
  {
    id: "omr-ecr",
    title: "OMR vs ECR",
    tease: "Weekday campus grind vs weekend coastal fantasy.",
    a: {
      id: "omr",
      name: "OMR",
      food: "Food courts, cloud kitchens, and “what’s open after standup?”",
      commute: "IT corridor reality — plan buffers, celebrate rare free-flow days.",
      vibe: "Campuses, gated communities, hybrid-life logistics.",
      peaceTip: "Live OMR for work weeks; treat ECR as the reward lap, not the daily default.",
    },
    b: {
      id: "ecr",
      name: "ECR",
      food: "Seafood stops, scenic café stretches, Sunday playlist energy.",
      commute: "Gorgeous until you pretend it’s a reliable Monday plan.",
      vibe: "Coastal escape branding with real residential pockets in between.",
      peaceTip: "Romanticise ECR for weekends — stress-test weekday school/office runs before moving.",
    },
  },
  {
    id: "porur-ambattur",
    title: "Porur vs Ambattur",
    tease: "West hospital–ORR orbit vs industrial–IT north-west grit.",
    a: {
      id: "porur",
      name: "Porur",
      food: "Arcot Road convenience — chains, quick meals, hospital-visitor fuel.",
      commute: "Outer Ring / west access is the pitch; peaks still bite.",
      vibe: "Value west growth with medical + logistics adjacency.",
      peaceTip: "Compare your actual office pin — Porur and Ambattur solve different maps.",
    },
    b: {
      id: "ambattur",
      name: "Ambattur",
      food: "Local favourites near industrial / IT pockets; less brochure, more routine.",
      commute: "North-west work belts; know your shift timing or suffer.",
      vibe: "Working-city west — practical housing near jobs that actually exist.",
      peaceTip: "If your paycheck lives in Ambattur estates, don’t rent for Instagram elsewhere.",
    },
  },
  {
    id: "tambaram-chromepet",
    title: "Tambaram vs Chromepet",
    tease: "Southern suburban twins on the rail spine.",
    a: {
      id: "tambaram",
      name: "Tambaram",
      food: "Established suburban eats and market runs with long-time regulars.",
      commute: "Rail strength; road days depend on GST / southern corridor luck.",
      vibe: "South gateway energy — bigger catchment, busier junctions.",
      peaceTip: "Rail commuters: walk the last mile at night before you commit.",
    },
    b: {
      id: "chromepet",
      name: "Chromepet",
      food: "Neighbourhood staples between the bigger suburban magnets.",
      commute: "Same rail family; slightly different station-and-street trade-offs.",
      vibe: "In-between suburban living with its own loyal pockets.",
      peaceTip: "Don’t crown a winner — time your commute trial from each exact pin.",
    },
  },
  {
    id: "northbeach-royapuram",
    title: "North Beach vs Royapuram vibe",
    tease: "Postcard Marina energy vs harbour-neighbourhood soul.",
    a: {
      id: "north-beach",
      name: "North Beach / Marina stretch",
      food: "Snack culture, evening crowds, “guests must see this” defaults.",
      commute: "Event days and weekends rewrite the map; locals already know.",
      vibe: "City postcard — breeze, skyline chats, public-space theatre.",
      peaceTip: "Great for evenings out; living nearby means accepting crowd seasons.",
    },
    b: {
      id: "royapuram",
      name: "Royapuram",
      food: "Harbour-side and neighbourhood kitchens with less tourist scripting.",
      commute: "North links and local loops; know bridge / rail timing.",
      vibe: "Working waterfront city — pride without the brochure voice.",
      peaceTip: "If you want north without the postcard crush, Royapuram energy is the quieter thesis.",
    },
  },
];

export const AREA_RIVALRIES_FAQ = [
  {
    q: "Is one side “winning”?",
    a: "No. These cards are playful contrasts for residents and newcomers — not rankings, property advice, or community stereotypes.",
  },
  {
    q: "Can neighbourhoods change?",
    a: "Yes. Food maps, Metro access, and traffic patterns shift. Treat tips as conversation starters and verify on the ground.",
  },
];
