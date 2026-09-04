export const CHENNAI_SALARY_GUIDE_PATH = "/guides/chennai-salary-guide-2026";

export type SalaryBandRow = {
  role: string;
  fresher: string;
  mid: string;
  senior: string;
  note: string;
};

/**
 * Directional Chennai CTC bands (annual) synthesised from public 2026 market models
 * (e.g. percentile-style city guides). Not an offer letter. Verify with recruiters.
 */
export const CHENNAI_SALARY_BANDS_2026: SalaryBandRow[] = [
  {
    role: "Software / full-stack developer",
    fresher: "₹4.9L – ₹7.9L",
    mid: "₹7.9L – ₹19.7L",
    senior: "₹19.7L – ₹30L+",
    note: "Services vs product gap is large; OMR product roles skew higher",
  },
  {
    role: "Java developer",
    fresher: "₹5.1L – ₹8.2L",
    mid: "₹8.2L – ₹20.6L",
    senior: "₹20.6L – ₹31.5L",
    note: "Enterprise stacks remain strong in Guindy / Ambattur / OMR",
  },
  {
    role: "React / frontend",
    fresher: "₹5.3L – ₹8.5L",
    mid: "₹8.5L – ₹21.3L",
    senior: "₹21.3L – ₹32.5L",
    note: "Median often cited near ~₹12.5L for React in Chennai models",
  },
  {
    role: "Software engineer (broad)",
    fresher: "₹3.6L – ₹12L",
    mid: "₹8L – ₹25L",
    senior: "₹18L – ₹45L+",
    note: "Wide band = services campus hire vs product/MNC; stock matters at senior",
  },
  {
    role: "Non-tech office / ops (indicative)",
    fresher: "₹2.5L – ₹4.5L",
    mid: "₹4.5L – ₹9L",
    senior: "₹9L – ₹18L",
    note: "Varies heavily by industry; always ask take-home + PF + bonus",
  },
];

export const SALARY_CORRIDOR_NOTES = [
  {
    corridor: "OMR / Sholinganallur / Perungudi",
    tip: "Highest density of IT product + captive centres; hybrid common; commute cost into CTC talks",
  },
  {
    corridor: "Guindy / TIDEL / Kathipara",
    tip: "Mix of services, product, and startups; Metro access improving offer stickiness",
  },
  {
    corridor: "Ambattur / Ambattur OT / GST belt",
    tip: "Manufacturing + IT parks; often slightly lower cash CTC than OMR product peers",
  },
  {
    corridor: "Sriperumbudur / Oragadam orbit",
    tip: "Factory + auto + EV supply chain; shift allowances can matter more than base",
  },
];

/** Public 2026 city models; not NCC / recruiter census. Bands are annual CTC, not take-home. */
export const SALARY_SOURCE_NOTE =
  "These bands are synthesised from public 2026 Chennai market write-ups (percentile-style city guides). They are not an NCC survey, not a recruiter census, and not an offer letter. Figures are annual CTC. Take-home is lower after PF, professional tax, and variable pay. We do not invent new rupee rows without updating this note.";

export const SALARY_CTC_VS_TAKEHOME = [
  "CTC includes employer PF, gratuity accruals, and sometimes joining bonuses that never hit your monthly account.",
  "Employee PF and professional tax come off the cash you actually see; ask HR for a month-1 payslip simulation.",
  "Variable / performance pay is often a percentage of CTC that is not guaranteed — treat it as a separate conversation.",
  "ESOPs and RSUs (common at senior product roles) are not the same as salary; vesting and tax events sit outside this table.",
  "OMR and Guindy commute cost (bus, cab, Metro, extra hours) can erase a small CTC gap — run the rupees, do not assume the higher letter wins.",
];

export const SALARY_WHEN_NOT_TO_USE = [
  "Campus / internship stipends and first-job “package” posters that mix CTC with one-time joining cash.",
  "Tamil Nadu government pay matrices, DA, and secretariat grades — those are not private-sector CTC bands.",
  "Gig, daily-wage, and shop-floor cash jobs — use the Chennai jobs hub and the listing itself, not this table.",
];
