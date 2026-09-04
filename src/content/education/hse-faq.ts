export type EducationFaqItem = { q: string; a: string };

export const HSE_HUB_FAQ: EducationFaqItem[] = [
  {
    q: "Do I have to write Tamil and English?",
    a: "A general academic Higher Secondary student in Tamil Nadu normally writes Part I (language) and Part II (English) plus four Part III core papers. Part I may be Tamil or another permitted language — confirm with the school.",
  },
  {
    q: "What does a group code mean?",
    a: "A group code (for example 2502) is the Directorate of Government Examinations label for one combination of four Part III subjects. The code tells the school and the board which four cores you study.",
  },
  {
    q: "Are these the only groups in Tamil Nadu?",
    a: "No. This guide covers five preferred combinations that DGE lists as current codes: 2502, 2503, 2702, 2708, and 2800-series humanities (we document 2804 and 2802). Schools may offer other codes. Always check the prospectus.",
  },
  {
    q: "Can 2502 students study medicine?",
    a: "Group 2502 does not include Biology. Medical counselling that requires Biology in Classes XI–XII is usually a 2503-type mix. Confirm the current year’s NEET and university eligibility — do not treat a website as the rule.",
  },
  {
    q: "Can 2503 students study engineering?",
    a: "Many engineering admissions look for Physics, Chemistry and Mathematics. Group 2503 includes those three plus Biology. Whether a particular college or TNEA year accepts the mix is an official-eligibility question — verify before you assume.",
  },
  {
    q: "Which commerce group is better for CA?",
    a: "Both 2702 and 2708 include Accountancy, Commerce and Economics. 2708 adds Business Mathematics; 2702 adds Computer Applications. CA has its own foundation rules after Class 12. Choose the fourth paper you can actually score in.",
  },
  {
    q: "Are all groups available in every school?",
    a: "No. Group availability differs by school. Confirm the exact current code and subject combination at the school you are joining.",
  },
  {
    q: "Can I study law after any group?",
    a: "Many law programmes admit graduates from recognised streams, and some integrated law programmes admit after Class 12 with their own tests. Humanities can give early subject exposure; it is not the only legal path. Check the college.",
  },
];

export const HSE_CHOOSE_FAQ: EducationFaqItem[] = [
  {
    q: "Should I copy my friends’ group?",
    a: "No. Friends, prestige talk (“science is always superior”), or a temporarily popular group are weak reasons. Match interest, ability, and the subjects your intended degree actually requires.",
  },
  {
    q: "What if my parent wants a different group?",
    a: "Use the five-factor check together: interest, ability, eligibility, career direction, and whether the school offers the group. The worksheet page (later wave) is for that conversation. For now, read the group pages side by side.",
  },
  {
    q: "What if the school does not offer my first choice?",
    a: "That is common. Rank a second group that still keeps your degree door open, or look at another school. Do not pick a leftover group that blocks the degree you actually want.",
  },
];

export const HSE_STRUCTURE_FAQ: EducationFaqItem[] = [
  {
    q: "How many examinations do I write?",
    a: "A typical general academic student writes six papers: Part I language, Part II English, and four Part III cores that the group defines.",
  },
  {
    q: "Is the group code the same as an old combination I heard about?",
    a: "Codes have been revised with the new syllabus. This guide uses current DGE codes 2502, 2503, 2702, 2708 and 2800-series humanities. If a relative quotes an older number, ask the school for the current code.",
  },
];

export const HSE_COMPARE_FAQ: EducationFaqItem[] = [
  {
    q: "Why is humanities shown as 2804 in the table?",
    a: "The matrix needs one humanities column. We use 2804 (Political Science). Group 2802 is the Computer Applications humanities option — open that page for the fourth-subject swap.",
  },
  {
    q: "Does “strong” mean guaranteed admission?",
    a: "No. “Strong” means the school subjects usually overlap with that degree family. Cut-offs, NEET, TNEA and college rules decide admission.",
  },
];

export function faqToJsonLdItems(items: EducationFaqItem[]) {
  return items.map((item) => ({ question: item.q, answer: item.a }));
}
