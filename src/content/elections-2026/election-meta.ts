/**
 * Poll schedule, voter help links, and FAQ items. Verify URLs and dates against ECI / CEO TN.
 */

export type ElectionFaqItem = {
  question: string;
  answer: string;
  sourceUrl?: string;
  asOf?: string;
  editorialOnly?: boolean;
};

export const ELECTION_POLL_DATE = {
  value: "2026-04-23",
  sourceUrl:
    "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/mar/doc2026315824701.pdf",
  asOf: "2026-03-30",
} as const;

export const ELECTION_COUNTING_DATE = {
  value: "2026-05-04",
  sourceUrl:
    "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/mar/doc2026315824701.pdf",
  asOf: "2026-03-30",
} as const;

export const VOTER_CHECKLIST: string[] = [
  "Confirm your name and polling station in the official electoral roll before polling day.",
  "Carry your EPIC (Voter ID) or another officially accepted photo ID.",
  "Re-check your constituency name and booth location if you recently moved houses.",
  "Follow polling-station instructions; keep your ID ready and avoid crowding.",
];

export const ELECTION_FAQ: ElectionFaqItem[] = [
  {
    question: "When is the Tamil Nadu Assembly election 2026 polling day?",
    answer:
      "Polling for Tamil Nadu (all 234 Assembly constituencies) is scheduled for 23 April 2026.",
    sourceUrl: ELECTION_POLL_DATE.sourceUrl,
    asOf: ELECTION_POLL_DATE.asOf,
  },
  {
    question: "When will counting for Tamil Nadu Assembly election 2026 happen?",
    answer: "Counting is scheduled for 4 May 2026.",
    sourceUrl: ELECTION_COUNTING_DATE.sourceUrl,
    asOf: ELECTION_COUNTING_DATE.asOf,
  },
  {
    question: "What if I forget my EPIC card on polling day?",
    answer:
      "ECI guidance allows voters who cannot produce EPIC to use one of several alternative photo identity documents (check the latest ECI handbook for the current list).",
    sourceUrl: "https://www.goa.gov.in/wp-content/uploads/2026/03/ECI-LISTS-12-ALTERNATIVE-IDs.pdf",
    asOf: "2026-03-18",
  },
  {
    question: "How do I register as a new voter in India?",
    answer:
      "Form 6 is the application form for inclusion of a new voter’s name in the electoral roll (submitted to the Electoral Registration Officer).",
    sourceUrl: "https://voters.eci.gov.in/formspdf/Form_6_English.pdf",
    asOf: "2026-03-30",
  },
  {
    question: "Why do some constituencies say (SC) after the name?",
    answer:
      "That label indicates the seat is reserved for Scheduled Castes on official listings.",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  {
    question: "Are news reports the same as official nominations?",
    answer:
      "No. Treat press reports as party announcements. Final nomination and valid candidature must be checked on official election documents published by election authorities.",
    editorialOnly: true,
  },
  {
    question: "What is the difference between a ward and an Assembly constituency?",
    answer:
      "A ward is a local body unit (city/municipal administration). An Assembly constituency is a state-legislature election unit for choosing an MLA. Boundaries and authorities differ.",
    editorialOnly: true,
  },
];
