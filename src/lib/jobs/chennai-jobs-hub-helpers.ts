import type { JobPostingWithEmployer } from "@/domains/jobs";
import { formatJobCompensation } from "@/lib/jobs/format-compensation";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

export type ChennaiJobsHubCard = {
  id: string;
  slug: string;
  href: string;
  title: string;
  employerName: string;
  employerVerified: boolean;
  location: string;
  excerpt: string;
  employmentType: string | null;
  workMode: string | null;
  compensation: string | null;
  initials: string;
  tags: string[];
  publishedAt: string | null;
  sortDate: number;
  isWalkIn: boolean;
  isFresherFriendly: boolean;
  hasTamil: boolean;
  hasEnglish: boolean;
  salaryMin: number | null;
};

export type ChennaiJobsSort = "latest" | "location" | "freshers" | "walk-in";

export type ChennaiJobsFilters = {
  keyword: string;
  locationQuery: string;
  location: string;
  jobType: string;
  experience: string;
  workMode: string;
  language: string;
  salaryMin: number;
  quickChip: string;
};

export const CHENNAI_JOBS_DEFAULT_FILTERS: ChennaiJobsFilters = {
  keyword: "",
  locationQuery: "",
  location: "",
  jobType: "",
  experience: "",
  workMode: "",
  language: "",
  salaryMin: 0,
  quickChip: "",
};

export const CHENNAI_JOBS_LOCATIONS = [
  { id: "all", label: "All Chennai" },
  { id: "omr", label: "OMR", match: ["omr", "perungudi", "sholinganallur", "thoraipakkam"] },
  { id: "t-nagar", label: "T. Nagar", match: ["t. nagar", "t nagar", "tnagar"] },
  { id: "anna-nagar", label: "Anna Nagar", match: ["anna nagar"] },
  { id: "velachery", label: "Velachery", match: ["velachery"] },
  { id: "tambaram", label: "Tambaram", match: ["tambaram"] },
  { id: "porur", label: "Porur", match: ["porur"] },
  { id: "guindy", label: "Guindy", match: ["guindy"] },
  { id: "ambattur", label: "Ambattur", match: ["ambattur"] },
] as const;

export const CHENNAI_JOBS_TYPES = [
  { id: "", label: "Any type" },
  { id: "FULL_TIME", label: "Full-time" },
  { id: "PART_TIME", label: "Part-time" },
  { id: "INTERN", label: "Internship" },
  { id: "CONTRACTOR", label: "Contract" },
  { id: "walk-in", label: "Walk-in" },
] as const;

export const CHENNAI_JOBS_SEARCH_TYPES = [
  { id: "", label: "Any type" },
  { id: "FULL_TIME", label: "Full-time" },
  { id: "PART_TIME", label: "Part-time" },
  { id: "INTERN", label: "Internship" },
  { id: "remote", label: "Work from home" },
  { id: "walk-in", label: "Walk-in" },
  { id: "field", label: "Field job" },
] as const;

export const CHENNAI_JOBS_EXPERIENCE = [
  { id: "", label: "Any experience" },
  { id: "freshers", label: "Freshers" },
  { id: "0-1", label: "0–1 year" },
  { id: "1-3", label: "1–3 years" },
  { id: "3+", label: "3+ years" },
] as const;

export const CHENNAI_JOBS_WORK_MODES = [
  { id: "", label: "Any mode" },
  { id: "onsite", label: "Office" },
  { id: "field", label: "Field" },
  { id: "hybrid", label: "Hybrid" },
  { id: "remote", label: "Work from home" },
] as const;

export const CHENNAI_JOBS_LANGUAGES = [
  { id: "", label: "Any language" },
  { id: "tamil", label: "Tamil" },
  { id: "english", label: "English" },
  { id: "both", label: "Tamil & English" },
] as const;

export const CHENNAI_JOBS_QUICK_CHIPS = [
  { id: "freshers", label: "Freshers" },
  { id: "women-friendly", label: "Women-friendly" },
  { id: "walk-in", label: "Walk-in" },
  { id: "remote", label: "Work from home" },
  { id: "tamil-english", label: "Tamil & English" },
  { id: "office", label: "Office jobs" },
  { id: "sales", label: "Sales" },
  { id: "it", label: "IT jobs" },
] as const;

export const CHENNAI_JOBS_CAREER_RESOURCES = [
  {
    title: "How to read Chennai job ads",
    description: "Plain tips on hybrid wording, pay talk, and safe applying.",
    href: "/guides/chennai-tech-careers",
  },
  {
    title: "Local job ads for owners and HR",
    description: "Write clearer neighbourhood ads, then add national boards if you still need volume.",
    href: "/chennai-local-news/chennai-local-job-ads-guide-business-owners-hr",
  },
  {
    title: "How to avoid fake job offers",
    description: "What we remove from listings and what to watch for.",
    href: "/community-guidelines",
  },
  {
    title: "Chennai areas for office work",
    description: "Browse zones — OMR, central Chennai, and western suburbs.",
    href: "/#areas",
  },
  {
    title: "Editorial standards",
    description: "How we check listings and handle corrections.",
    href: "/editorial-standards",
  },
] as const;

function employmentTypeLabel(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim().toUpperCase();
  const map: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACTOR: "Contract",
    INTERN: "Internship",
  };
  return map[u] ?? null;
}

function workModeLabel(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const v = raw.trim().toLowerCase();
  const map: Record<string, string> = {
    onsite: "Office",
    remote: "Work from home",
    hybrid: "Hybrid",
    field: "Field",
  };
  return map[v] ?? null;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function buildExcerpt(body: string, max = 140): string {
  const plain = stripMarkdown(body);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1).trimEnd()}…`;
}

function buildInitials(title: string): string {
  const words = title
    .replace(/[^a-zA-Z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !/^(and|the|for|in|at|to|of|a|an)$/i.test(w));
  if (words.length === 0) return "JO";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function inferTags(title: string, body: string, employmentType: string | null): string[] {
  const hay = `${title} ${body}`.toLowerCase();
  const tags: string[] = [];
  if (employmentTypeLabel(employmentType)) tags.push(employmentTypeLabel(employmentType)!);
  if (/walk[\s-]?in/i.test(hay)) tags.push("Walk-in");
  if (/fresher|freshers|entry[\s-]?level|trainee/i.test(hay)) tags.push("Freshers");
  if (/tamil/i.test(hay) && /english/i.test(hay)) tags.push("Tamil & English");
  else if (/tamil/i.test(hay)) tags.push("Tamil");
  else if (/english/i.test(hay)) tags.push("English");
  if (/women|female/i.test(hay)) tags.push("Women-friendly");
  if (/\b(it|software|developer|engineer|tech)\b/i.test(hay)) tags.push("IT");
  if (/\bsales\b/i.test(hay)) tags.push("Sales");
  return [...new Set(tags)].slice(0, 5);
}

function locationMatches(areaId: string, location: string, title: string, body: string): boolean {
  if (!areaId || areaId === "all") return true;
  const area = CHENNAI_JOBS_LOCATIONS.find((l) => l.id === areaId);
  if (!area || !("match" in area)) return true;
  const hay = `${location} ${title} ${body}`.toLowerCase();
  return area.match.some((m) => hay.includes(m));
}

function experienceMatches(id: string, title: string, body: string): boolean {
  if (!id) return true;
  const hay = `${title} ${body}`.toLowerCase();
  if (id === "freshers") return /fresher|freshers|entry[\s-]?level|trainee|graduate/i.test(hay);
  if (id === "0-1") return /0[\s–-]1|0 to 1|upto 1|up to 1|fresher/i.test(hay);
  if (id === "1-3") return /1[\s–-]3|1 to 3|2[\s–-]4/i.test(hay);
  if (id === "3+") return /3\+|3[\s–-]5|5\+|senior|lead\b/i.test(hay);
  return true;
}

function languageMatches(id: string, hasTamil: boolean, hasEnglish: boolean): boolean {
  if (!id) return true;
  if (id === "tamil") return hasTamil;
  if (id === "english") return hasEnglish;
  if (id === "both") return hasTamil && hasEnglish;
  return true;
}

function quickChipMatches(chipId: string, card: ChennaiJobsHubCard): boolean {
  if (!chipId) return true;
  const hay = `${card.title} ${card.excerpt}`.toLowerCase();
  switch (chipId) {
    case "freshers":
      return card.isFresherFriendly;
    case "women-friendly":
      return /women|female/i.test(hay);
    case "walk-in":
      return card.isWalkIn;
    case "remote":
      return card.workMode === "Work from home";
    case "tamil-english":
      return card.hasTamil && card.hasEnglish;
    case "office":
      return card.workMode === "Office" || card.workMode === "Hybrid";
    case "sales":
      return /\bsales\b/i.test(hay);
    case "it":
      return /\b(it|software|developer|engineer|tech)\b/i.test(hay);
    default:
      return true;
  }
}

export function buildChennaiJobsHubCard(row: JobPostingWithEmployer): ChennaiJobsHubCard {
  const { job, employer } = row;
  const hay = `${job.title} ${job.body}`;
  const hasTamil = /tamil/i.test(hay);
  const hasEnglish = /english/i.test(hay);
  const isWalkIn = /walk[\s-]?in/i.test(hay);
  const isFresherFriendly = /fresher|freshers|entry[\s-]?level|trainee|graduate/i.test(hay);

  let compensation: string | null = null;
  if (job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null) {
    compensation = formatJobCompensation(job.salaryMin, job.salaryMax);
  }

  return {
    id: job.id,
    slug: job.slug,
    href: `${CHENNAI_JOBS_HUB_PATH}/${job.slug}`,
    title: job.title,
    employerName: employer.name,
    employerVerified: employer.verified,
    location: job.locationLabel?.trim() || "Chennai",
    excerpt: buildExcerpt(job.body),
    employmentType: employmentTypeLabel(job.employmentType),
    workMode: workModeLabel(job.remotePolicy),
    compensation,
    initials: buildInitials(job.title),
    tags: inferTags(job.title, job.body, job.employmentType),
    publishedAt: job.publishedAt
      ? job.publishedAt.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeZone: "Asia/Kolkata",
        })
      : null,
    sortDate: (job.publishedAt ?? job.createdAt).getTime(),
    isWalkIn,
    isFresherFriendly,
    hasTamil,
    hasEnglish,
    salaryMin: job.salaryDisclosed ? job.salaryMin : null,
  };
}

export function buildChennaiJobsHubCards(
  rows: JobPostingWithEmployer[],
): ChennaiJobsHubCard[] {
  return rows.map(buildChennaiJobsHubCard);
}

export function filterChennaiJobsHubCards(
  cards: ChennaiJobsHubCard[],
  filters: ChennaiJobsFilters,
): ChennaiJobsHubCard[] {
  const kw = filters.keyword.trim().toLowerCase();
  return cards.filter((card) => {
    if (kw) {
      const hay = `${card.title} ${card.employerName} ${card.excerpt} ${card.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    if (!locationMatches(filters.location, card.location, card.title, card.excerpt)) {
      return false;
    }
    const locQ = filters.locationQuery.trim().toLowerCase();
    if (locQ) {
      const locHay = `${card.location} ${card.title} ${card.excerpt}`.toLowerCase();
      if (!locHay.includes(locQ)) return false;
    }
    if (filters.jobType) {
      if (filters.jobType === "walk-in" && !card.isWalkIn) return false;
      if (filters.jobType === "remote" && card.workMode !== "Work from home") return false;
      if (filters.jobType === "field") {
        if (card.workMode !== "Field" && !/field/i.test(card.title)) return false;
      }
      if (filters.jobType === "INTERN" && card.employmentType !== "Internship") return false;
      if (filters.jobType === "FULL_TIME" && card.employmentType !== "Full-time") return false;
      if (filters.jobType === "PART_TIME" && card.employmentType !== "Part-time") return false;
      if (filters.jobType === "CONTRACTOR" && card.employmentType !== "Contract") return false;
    }
    if (!experienceMatches(filters.experience, card.title, card.excerpt)) return false;
    if (filters.workMode) {
      const mode = workModeLabel(filters.workMode);
      if (filters.workMode === "field") {
        if (card.workMode !== "Field" && !/field/i.test(card.title)) return false;
      } else if (mode && card.workMode !== mode) {
        return false;
      }
    }
    if (!languageMatches(filters.language, card.hasTamil, card.hasEnglish)) return false;
    if (filters.salaryMin > 0 && (card.salaryMin == null || card.salaryMin < filters.salaryMin)) {
      return false;
    }
    if (!quickChipMatches(filters.quickChip, card)) return false;
    return true;
  });
}

export function sortChennaiJobsHubCards(
  cards: ChennaiJobsHubCard[],
  sort: ChennaiJobsSort,
): ChennaiJobsHubCard[] {
  const list = [...cards];
  switch (sort) {
    case "location":
      return list.sort((a, b) => a.location.localeCompare(b.location));
    case "freshers":
      return list.sort((a, b) => {
        if (a.isFresherFriendly !== b.isFresherFriendly) {
          return a.isFresherFriendly ? -1 : 1;
        }
        return b.sortDate - a.sortDate;
      });
    case "walk-in":
      return list.sort((a, b) => {
        if (a.isWalkIn !== b.isWalkIn) return a.isWalkIn ? -1 : 1;
        return b.sortDate - a.sortDate;
      });
    case "latest":
    default:
      return list.sort((a, b) => b.sortDate - a.sortDate);
  }
}

export function countWalkInJobs(cards: ChennaiJobsHubCard[]): number {
  return cards.filter((c) => c.isWalkIn).length;
}

export function countFresherJobs(cards: ChennaiJobsHubCard[]): number {
  return cards.filter((c) => c.isFresherFriendly).length;
}
