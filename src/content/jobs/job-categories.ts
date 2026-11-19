export type JobCategory = {
  slug: string;
  label: string;
  h1: string;
  intro: string;
};

export const JOB_CATEGORIES: JobCategory[] = [
  {
    slug: "walk-in",
    label: "Walk-in",
    h1: "Walk-in jobs in Chennai",
    intro:
      "These are Chennai notices that tell the candidate to attend a walk-in. The date, address, and what to carry are on each listing. If the notice does not say walk-in, it is not on this page.",
  },
  {
    slug: "fresher",
    label: "Freshers",
    h1: "Fresher jobs in Chennai",
    intro:
      "This page lists Chennai notices that mention freshers, trainees, or entry-level hiring. Read the experience line on the notice. A poster that also asks for senior experience is still shown when it explicitly invites freshers.",
  },
  {
    slug: "part-time",
    label: "Part-time",
    h1: "Part-time jobs in Chennai",
    intro:
      "Part-time means the notice is marked part-time or the employer wrote part-time hours. Full-time roles are on the main Chennai board.",
  },
  {
    slug: "internships",
    label: "Internships",
    h1: "Internships in Chennai",
    intro:
      "Internships and intern roles whose notice says so. A trainee job that does not say intern stays on the fresher list or the main board.",
  },
  {
    slug: "drivers",
    label: "Drivers",
    h1: "Driver jobs in Chennai",
    intro:
      "Driver notices for Chennai: the employer’s own text names a driver role. Licence class, vehicle, and shift are whatever the notice printed. This page does not add them.",
  },
  {
    slug: "retail",
    label: "Retail",
    h1: "Retail jobs in Chennai",
    intro:
      "Retail, cashier, billing, and showroom notices that use those words. A general office role is not listed here unless the notice says retail, cashier, billing, or showroom.",
  },
  {
    slug: "it",
    label: "IT",
    h1: "IT jobs in Chennai",
    intro:
      "Software, developer, programmer, and full-stack notices. The page does not treat every use of the word engineer as an IT job.",
  },
  {
    slug: "office-admin",
    label: "Office admin",
    h1: "Office admin jobs in Chennai",
    intro:
      "Office assistant, admin assistant, receptionist, and data-entry notices. Other desk jobs stay on the main Chennai board unless the notice uses one of those titles.",
  },
];

export function jobCategoryBySlug(slug: string): JobCategory | undefined {
  return JOB_CATEGORIES.find((item) => item.slug === slug);
}

export function jobMatchesCategory(
  categorySlug: string,
  input: { title: string; body: string; employmentType: string | null },
): boolean {
  const hay = `${input.title}\n${input.body}`;
  const employment = (input.employmentType ?? "").toUpperCase();
  switch (categorySlug) {
    case "walk-in":
      return /walk[\s-]?in/i.test(hay);
    case "fresher":
      return /fresher|freshers|entry[\s-]?level|\btrainee\b|fresh\s+graduates?/i.test(
        hay,
      );
    case "part-time":
      return employment === "PART_TIME" || /part[\s-]?time/i.test(hay);
    case "internships":
      return employment === "INTERN" || /\bintern(ship)?s?\b/i.test(hay);
    case "drivers":
      return /\bdrivers?\b/i.test(hay);
    case "retail":
      return /\b(retail|cashier|billing|showroom)\b/i.test(hay);
    case "it":
      return /\b(software|developer|programmer|full[\s-]?stack)\b/i.test(hay);
    case "office-admin":
      return /\b(office assistant|admin assistant|receptionist|data entry)\b/i.test(
        hay,
      );
    default:
      return false;
  }
}
