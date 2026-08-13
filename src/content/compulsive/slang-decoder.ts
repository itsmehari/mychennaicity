import { compulsivePath } from "@/content/compulsive/index";

export const SLANG_DECODER_PATH = compulsivePath("slang");

export type SlangEntry = {
  term: string;
  meaning: string;
  example?: string;
};

/** Chennai / Tamil–English desk slang — playful, not exhaustive or academic. */
export const SLANG_ENTRIES: SlangEntry[] = [
  {
    term: "Da / di",
    meaning: "Familiar address — friend-ish energy (tone matters a lot).",
    example: "Vaa da, filter coffee kedachuma?",
  },
  {
    term: "Machan / macha",
    meaning: "Buddy / mate — borrowed brother-in-law warmth used casually.",
    example: "Macha, traffic fulla irukku.",
  },
  {
    term: "Anna / akka",
    meaning: "Respectful older-brother / older-sister address in shops and autos.",
    example: "Anna, straight-a Adyar vidunga.",
  },
  {
    term: "Mama",
    meaning: "Uncle-ish address; also playful for shopkeepers or drivers.",
    example: "Mama, meter-la podunga please.",
  },
  {
    term: "Seri",
    meaning: "Okay / alright — the city’s multipurpose agree button.",
    example: "Seri, naan 7 ku varren.",
  },
  {
    term: "Aama",
    meaning: "Yes.",
    example: "Aama, indha road dhaan.",
  },
  {
    term: "Illaya / illa",
    meaning: "No / isn’t it? (context shifts the force).",
    example: "Indha exit illaya?",
  },
  {
    term: "Sariya?",
    meaning: "Correct? / okay? — seeking confirmation.",
    example: "Meeting 11 ku dhana, sariya?",
  },
  {
    term: "Fulla",
    meaning: "Fully / totally — intensifier.",
    example: "Theatre fulla booked.",
  },
  {
    term: "Scene",
    meaning: "Situation / drama / plan — flexible slang noun.",
    example: "Enna scene da innikki?",
  },
  {
    term: "Mass",
    meaning: "Impressive / stylish / high-energy approval.",
    example: "That entry mass da.",
  },
  {
    term: "Gethu",
    meaning: "Swagger / prestige — looking sharp or acting boss.",
    example: "Bike gethu-va irukku.",
  },
  {
    term: "Vera level",
    meaning: "Next level — praise for food, film, or a flex.",
    example: "That biryani vera level.",
  },
  {
    term: "Figa / figure",
    meaning: "Looks / physique — often teasing.",
    example: "Gym figa maintain panraan.",
  },
  {
    term: "Adjust",
    meaning: "Please be flexible — classic Indian English, Chennai edition included.",
    example: "Two people seat-la adjust pannunga.",
  },
  {
    term: "Only",
    meaning: "Softener stuck at the end of English sentences.",
    example: "I’m coming only, wait.",
  },
  {
    term: "Itself",
    meaning: "Emphasis particle in Indian English.",
    example: "I told in the morning itself.",
  },
  {
    term: "Current",
    meaning: "Electricity / power supply.",
    example: "Current pochu — generator on ah?",
  },
  {
    term: "EB",
    meaning: "Electricity board / power bill shorthand.",
    example: "EB bill shock this month.",
  },
  {
    term: "Water problem",
    meaning: "Supply shortage — summer classic.",
    example: "Area-la water problem, tanker book pannunga.",
  },
  {
    term: "Auto",
    meaning: "Share or call auto-rickshaw (context decides).",
    example: "Auto-va? Meter-la podunga.",
  },
  {
    term: "Share auto",
    meaning: "Shared route auto with fixed-ish stops and fares.",
    example: "Tambaram share auto fulla irukku.",
  },
  {
    term: "Cut",
    meaning: "Take a short turn / shortcut; also “cut the call.”",
    example: "Inga cut panni left edunga.",
  },
  {
    term: "Signal",
    meaning: "Traffic light junction.",
    example: "Next signal-la right.",
  },
  {
    term: "Flyover",
    meaning: "Elevated road — also a meeting landmark.",
    example: "Flyover keezha wait pannu.",
  },
  {
    term: "Side",
    meaning: "Area / direction — “that side” geography.",
    example: "OMR side offices romba irukku.",
  },
  {
    term: "Area",
    meaning: "Neighbourhood identity — people “belong” to an area.",
    example: "Naan Velachery area.",
  },
  {
    term: "Local",
    meaning: "Suburban train; also “local person.”",
    example: "Local miss aayiduchu.",
  },
  {
    term: "Out",
    meaning: "Going out of town / not in Chennai.",
    example: "Weekend out — native.",
  },
  {
    term: "Native",
    meaning: "Hometown / family place outside the city.",
    example: "Pongal ku native poren.",
  },
  {
    term: "Leave",
    meaning: "Time off work — “putting leave.”",
    example: "Monday leave potten.",
  },
  {
    term: "Office",
    meaning: "Work — often means the whole corporate life, not just a building.",
    example: "Office heavy this week.",
  },
  {
    term: "Client call",
    meaning: "The sacred calendar blocker that excuses everything.",
    example: "Can’t talk — client call.",
  },
  {
    term: "WFA / WFH",
    meaning: "Work from anywhere / home — hybrid Chennai survival tools.",
    example: "Friday WFH confirm ah?",
  },
  {
    term: "Cab",
    meaning: "App taxi — Ola/Uber discourse included.",
    example: "Cab surge crazy now.",
  },
  {
    term: "Token",
    meaning: "Small advance payment — shops, clinics, brokers.",
    example: "Token kuduthutu slot fix pannunga.",
  },
  {
    term: "Advance",
    meaning: "Deposit — rent / PG money talk.",
    example: "Two months advance + one rent.",
  },
  {
    term: "Broker",
    meaning: "Housing middle-person — fee negotiations incoming.",
    example: "Broker commission yevvalavu?",
  },
  {
    term: "Society",
    meaning: "Apartment association / gated community governance.",
    example: "Society meeting Sunday.",
  },
  {
    term: "Watchman",
    meaning: "Security uncle — gate politics included.",
    example: "Watchman kitta visitor pre-inform pannunga.",
  },
  {
    term: "Generator",
    meaning: "Backup power — summer flex for societies.",
    example: "Generator maintenance fund raise.",
  },
  {
    term: "Sump",
    meaning: "Underground water tank — monsoon and tanker conversations.",
    example: "Sump clean pannanga last month.",
  },
  {
    term: "Tanker",
    meaning: "Private water delivery truck.",
    example: "Tanker morning 6 ku varum.",
  },
  {
    term: "Meals",
    meaning: "Banana-leaf or plate meals — serious lunch culture.",
    example: "Meals-ku enna place nalla irukku?",
  },
  {
    term: "Tiffin",
    meaning: "Light meals — idli, dosa, vada universe.",
    example: "Evening tiffin podava?",
  },
  {
    term: "Filter coffee",
    meaning: "Decoction coffee with milk — hill to die on.",
    example: "Filter coffee without sugar, strong-a.",
  },
  {
    term: "Degree coffee",
    meaning: "Marketed “degree” filter coffee — heritage café energy.",
    example: "Degree coffee shop-la meet pannalam.",
  },
  {
    term: "Biryani war",
    meaning: "Endless loyalty debate across city kitchens.",
    example: "Don’t start biryani war at the table.",
  },
  {
    term: "Beedi kadai chai",
    meaning: "Roadside shop tea — unfancy, correct.",
    example: "Beedi kadai chai hits different after night shift.",
  },
  {
    term: "Kadai",
    meaning: "Shop / stall.",
    example: "Corner kadai still open.",
  },
  {
    term: "Paisa",
    meaning: "Money — also “worth it” vibes in talk.",
    example: "Indha ticket ku paisa worth-a?",
  },
  {
    term: "Free-a",
    meaning: "For free / complimentary.",
    example: "Extra chutney free-a kudunga.",
  },
  {
    term: "Tension",
    meaning: "Stress — do not add.",
    example: "Traffic tension vendam.",
  },
  {
    term: "Moodu",
    meaning: "Shut / close — shops, topics, debates.",
    example: "Shop mooditaru.",
  },
  {
    term: "Open aacha?",
    meaning: "Is it open yet?",
    example: "Temple open aacha?",
  },
  {
    term: "Romba",
    meaning: "Very / a lot.",
    example: "Romba late aayiduchu.",
  },
  {
    term: "Konjam",
    meaning: "A little — the polite ask.",
    example: "Konjam slow-a drive pannunga.",
  },
  {
    term: "Ipdiye",
    meaning: "Just like this / casually.",
    example: "Ipdiye drop pannidungo.",
  },
  {
    term: "Appadiye",
    meaning: "Just like that — acceptance or resignation.",
    example: "Appadiye naalum traffic.",
  },
  {
    term: "Enna da idhu",
    meaning: "What is this? — surprise or mild outrage.",
    example: "Enna da idhu bill?",
  },
  {
    term: "Sokal",
    meaning: "Idiot move / foolishness (keep it light among friends).",
    example: "Parking sokal pannadhe.",
  },
  {
    term: "Padam",
    meaning: "Movie; also “picture” of a situation.",
    example: "Indha padam second half slow.",
  },
  {
    term: "Thala / Thalapathy discourse",
    meaning: "Film-star loyalty banter — treat as sport, not war.",
    example: "Office group-la thala vs thalapathy thread again.",
  },
  {
    term: "Pass",
    meaning: "Go ahead / move — traffic talk; also exam pass.",
    example: "Pass pannunga, ambulance behind.",
  },
  {
    term: "Divert",
    meaning: "Take alternate route — rain and VIP movement classic.",
    example: "Marina side divert.",
  },
  {
    term: "VIP movement",
    meaning: "Convoy-related traffic freeze — calendar wildcard.",
    example: "VIP movement — leave early.",
  },
  {
    term: "Nalla irukku",
    meaning: "It’s good — food approval gold standard.",
    example: "Chutney nalla irukku.",
  },
  {
    term: "Bajaar",
    meaning: "Market; also chaotic crowd energy.",
    example: "T Nagar bajaar vibe today.",
  },
  {
    term: "Out of station",
    meaning: "Not in town — older Indian English still alive.",
    example: "Manager out of station till Thursday.",
  },
  {
    term: "Reaching",
    meaning: "I’m almost there — arrival theatre.",
    example: "Reaching in 5 — basement parking.",
  },
  {
    term: "On the way",
    meaning: "Could mean anything from “left home” to “stuck at signal.”",
    example: "On the way — don’t order yet.",
  },
  {
    term: "Same pin",
    meaning: "Same apartment / locality shorthand in chats.",
    example: "Delivery same pin, tower 3.",
  },
  {
    term: "Tower",
    meaning: "Apartment block in a gated community.",
    example: "Tower B lobby-la wait.",
  },
  {
    term: "Clubhouse",
    meaning: "Society common facility — meetings and birthday logistics.",
    example: "Clubhouse booking full this Saturday.",
  },
  {
    term: "Maintenance",
    meaning: "Society fee — and the debates around it.",
    example: "Maintenance hike mail vandhuchi.",
  },
];

export const SLANG_DECODER_FAQ = [
  {
    q: "Is this “proper” Tamil?",
    a: "It is city-desk slang and Tamil–English mix as people actually speak in Chennai chats and streets — not a grammar course.",
  },
  {
    q: "Can tone change the meaning?",
    a: "Always. Words like da / machan are affectionate among friends and rude if the relationship isn’t there. When unsure, default to anna / akka and politeness.",
  },
];
