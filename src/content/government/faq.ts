export type GovernmentFaqItem = { q: string; a: string };

export const GOVERNMENT_HUB_FAQ: GovernmentFaqItem[] = [
  {
    q: "How many ministers are in the Tamil Nadu cabinet in 2026?",
    a: "35 ministers as of 21 May 2026, according to Lok Bhavan Press Release No. 40 — including Chief Minister C. Joseph Vijay and 34 cabinet ministers.",
  },
  {
    q: "Who is the Finance Minister of Tamil Nadu after the May 2026 reshuffle?",
    a: "Dr N. Marie Wilson holds Finance, Pensions and Pensionary Benefits, and Planning & Development. K.A. Sengottaiyan moved from Finance to Revenue and Disaster Management.",
  },
  {
    q: "Which minister handles Chennai municipal administration?",
    a: "Municipal Administration, Urban and Water Supply is with Chief Minister C. Joseph Vijay in the May 2026 allocation. Greater Chennai Corporation operates under the state municipal framework.",
  },
  {
    q: "Who is Tamil Nadu's AI minister?",
    a: "Dr Kumar R is Minister for Artificial Intelligence, Information Technology and Digital Services — a dedicated portfolio created in the May 2026 expansion.",
  },
  {
    q: "When were the ministers sworn in?",
    a: "The Council of Ministers was sworn in on 10 May 2026. Initial portfolios were announced 16 May (Press Release No. 38); the expanded 35-minister list followed on 21 May (Press Release No. 40).",
  },
];

export const GOVERNMENT_HUB_FAQ_TA: GovernmentFaqItem[] = [
  {
    q: "2026-ல் தமிழ்நாடு அமைச்சரவையில் எத்தனை அமைச்சர்கள்?",
    a: "21 May 2026 (Lok Bhavan PR 40) வரை 35 அமைச்சர்கள் — முதலமைச்சர் C. Joseph Vijay உட்பட.",
  },
  {
    q: "நிதி அமைச்சர் யார்?",
    a: "Dr N. Marie Wilson — Finance, Planning & Development. K.A. Sengottaiyan — Revenue & Disaster Management.",
  },
  {
    q: "சென்னை நகராட்சி யார் பொறுப்பு?",
    a: "Municipal Administration, Urban and Water Supply — முதலமைச்சர் C. Joseph Vijay.",
  },
];

export function faqToJsonLdItems(items: GovernmentFaqItem[]) {
  return items.map((f) => ({ question: f.q, answer: f.a }));
}
