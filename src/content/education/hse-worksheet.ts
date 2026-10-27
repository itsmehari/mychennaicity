import type { EducationFaqItem } from "@/content/education/hse-faq";
import { EDUCATION_WORKSHEET_PATH, educationGroupPath } from "@/content/education/paths";

export const HSE_WORKSHEET_SEO_TITLE = "Plus Two group worksheet — student and parent ranking";
export const HSE_WORKSHEET_SEO_DESCRIPTION =
  "Rank Tamil Nadu Higher Secondary groups 2502, 2503, 2702, 2708, 2804 and 2802 on interest, ability and eligibility. Scores stay in this browser only.";
export const HSE_WORKSHEET_TITLE = "Student–parent ranking worksheet";
export const HSE_WORKSHEET_DEK =
  "Score each documented group from 1 (poor fit) to 5 (strong fit) on five checks. Nothing is uploaded. Totals are a conversation starter, not an admission result.";

export const HSE_WORKSHEET_STEPS = [
  {
    name: "List the school’s real codes",
    text: "Write the groups the admitting school actually offers. Strike any code that is not on the prospectus.",
  },
  {
    name: "Score interest",
    text: "For each remaining group, score 1–5 on whether the student wants those four subjects for two years.",
  },
  {
    name: "Score ability",
    text: "Score 1–5 on whether current marks and habits can carry the hardest paper in that group (Maths, Biology, Accountancy, or essay load).",
  },
  {
    name: "Score eligibility",
    text: "Score 1–5 on whether the intended degrees usually need those subjects. Check TNEA, NEET or the college — do not invent a cut-off.",
  },
  {
    name: "Talk, then rank",
    text: "Add the scores. The highest total is a discussion rank, not a seat. Read the matching group page before fees.",
  },
];

export const HSE_WORKSHEET_FACTORS = [
  { id: "interest", label: "Interest in the four cores" },
  { id: "ability", label: "Ability / stamina for the hardest paper" },
  { id: "eligibility", label: "Fit with degrees you might want" },
  { id: "career", label: "Career direction (not prestige)" },
  { id: "school", label: "School actually offers this code" },
] as const;

export const HSE_WORKSHEET_CODES = ["2502", "2503", "2702", "2708", "2804", "2802"] as const;

export const HSE_WORKSHEET_FAQ: EducationFaqItem[] = [
  {
    q: "Is the highest score the group I must take?",
    a: "No. It is a ranking aid. If the school does not offer that code, use the next total that still keeps your degree door open.",
  },
  {
    q: "Do you store my answers?",
    a: "Scores stay in this browser (localStorage). There is no account and no server worksheet.",
  },
  {
    q: "Should parents fill this alone?",
    a: "No. Sit with the student. Prestige pressure is one of the reasons this sheet exists.",
  },
];

export function worksheetGroupHref(code: string): string {
  return educationGroupPath(code);
}

export const HSE_WORKSHEET_PATH = EDUCATION_WORKSHEET_PATH;
