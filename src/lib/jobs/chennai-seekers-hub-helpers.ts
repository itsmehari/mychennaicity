import type { JobSeekerPostRow } from "@/domains/job-seekers";
import { CHENNAI_JOBS_LOCATIONS } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { chennaiJobSeekerDetailPath } from "@/lib/routes/chennai-jobs";

export type ChennaiSeekerHubCard = {
  id: string;
  slug: string;
  href: string;
  title: string;
  seekerLabel: string | null;
  roleSought: string | null;
  location: string;
  excerpt: string;
  initials: string;
  tags: string[];
  needsAccommodation: boolean;
  availability: string | null;
  sortDate: number;
  hasTamil: boolean;
  hasEnglish: boolean;
  isImmediate: boolean;
  isWatchman: boolean;
  isHousehold: boolean;
};

export type ChennaiSeekerSort = "latest" | "location" | "accommodation" | "immediate";

export type ChennaiSeekerFilters = {
  keyword: string;
  locationQuery: string;
  location: string;
  roleType: string;
  accommodation: string;
  availability: string;
  language: string;
  quickChip: string;
};

export const CHENNAI_SEEKERS_DEFAULT_FILTERS: ChennaiSeekerFilters = {
  keyword: "",
  locationQuery: "",
  location: "",
  roleType: "",
  accommodation: "",
  availability: "",
  language: "",
  quickChip: "",
};

export const CHENNAI_SEEKERS_ROLE_TYPES = [
  { id: "", label: "Any role" },
  { id: "watchman", label: "Watchman / security" },
  { id: "household", label: "Household help" },
  { id: "caretaker", label: "Caretaker" },
  { id: "driver", label: "Driver" },
  { id: "office", label: "Office staff" },
] as const;

export const CHENNAI_SEEKERS_ACCOMMODATION = [
  { id: "", label: "Any" },
  { id: "needs-stay", label: "Needs accommodation" },
  { id: "no-stay", label: "No stay needed" },
] as const;

export const CHENNAI_SEEKERS_AVAILABILITY = [
  { id: "", label: "Any" },
  { id: "immediate", label: "Immediate" },
  { id: "notice", label: "With notice" },
] as const;

export const CHENNAI_SEEKERS_LANGUAGES = [
  { id: "", label: "Any language" },
  { id: "tamil", label: "Tamil" },
  { id: "english", label: "English" },
  { id: "both", label: "Tamil & English" },
] as const;

export const CHENNAI_SEEKERS_QUICK_CHIPS = [
  { id: "watchman", label: "Watchman" },
  { id: "with-stay", label: "With stay" },
  { id: "immediate", label: "Immediate" },
  { id: "tamil", label: "Tamil-speaking" },
  { id: "household", label: "Household" },
  { id: "caretaker", label: "Caretaker" },
] as const;

export { CHENNAI_JOBS_LOCATIONS as CHENNAI_SEEKERS_LOCATIONS };

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

function buildInitials(title: string, role: string | null): string {
  const source = role?.trim() || title;
  const words = source
    .replace(/[^a-zA-Z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (words.length === 0) return "AV";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function inferTags(post: JobSeekerPostRow): string[] {
  const hay = `${post.title} ${post.body} ${post.roleSought ?? ""}`.toLowerCase();
  const tags: string[] = [];
  if (post.needsAccommodation) tags.push("Stay needed");
  if (post.availability?.trim()) tags.push(post.availability.trim());
  if (/watchman|security|guard/i.test(hay)) tags.push("Watchman");
  if (/household|maid|cook|helper/i.test(hay)) tags.push("Household");
  if (/caretaker|care taker/i.test(hay)) tags.push("Caretaker");
  if (/tamil/i.test(hay) && /english/i.test(hay)) tags.push("Tamil & English");
  else if (/tamil/i.test(hay)) tags.push("Tamil");
  if (/immediate|urgent|asap/i.test(hay)) tags.push("Immediate");
  return [...new Set(tags)].slice(0, 5);
}

function locationMatches(areaId: string, location: string, title: string, body: string): boolean {
  if (!areaId || areaId === "all") return true;
  const area = CHENNAI_JOBS_LOCATIONS.find((l) => l.id === areaId);
  if (!area || !("match" in area)) return true;
  const hay = `${location} ${title} ${body}`.toLowerCase();
  return area.match.some((m) => hay.includes(m));
}

function roleTypeMatches(id: string, hay: string): boolean {
  if (!id) return true;
  if (id === "watchman") return /watchman|security|guard/i.test(hay);
  if (id === "household") return /household|maid|cook|helper|domestic/i.test(hay);
  if (id === "caretaker") return /caretaker|care taker|elder/i.test(hay);
  if (id === "driver") return /\bdriver\b/i.test(hay);
  if (id === "office") return /office|admin|clerk|reception/i.test(hay);
  return true;
}

function quickChipMatches(chipId: string, card: ChennaiSeekerHubCard): boolean {
  if (!chipId) return true;
  const hay = `${card.title} ${card.excerpt} ${card.roleSought ?? ""}`.toLowerCase();
  switch (chipId) {
    case "watchman":
      return card.isWatchman;
    case "with-stay":
      return card.needsAccommodation;
    case "immediate":
      return card.isImmediate;
    case "tamil":
      return card.hasTamil;
    case "household":
      return card.isHousehold;
    case "caretaker":
      return /caretaker|care taker/i.test(hay);
    default:
      return true;
  }
}

export function buildChennaiSeekerHubCard(post: JobSeekerPostRow): ChennaiSeekerHubCard {
  const hay = `${post.title} ${post.body} ${post.roleSought ?? ""}`;
  const hasTamil = /tamil/i.test(hay);
  const hasEnglish = /english/i.test(hay);
  const isImmediate = /immediate|urgent|asap/i.test(hay);
  const isWatchman = /watchman|security|guard/i.test(hay);
  const isHousehold = /household|maid|cook|helper|domestic/i.test(hay);

  return {
    id: post.id,
    slug: post.slug,
    href: chennaiJobSeekerDetailPath(post.slug),
    title: post.title,
    seekerLabel: post.seekerLabel?.trim() || null,
    roleSought: post.roleSought?.trim() || null,
    location: post.locationLabel?.trim() || "Chennai",
    excerpt: buildExcerpt(post.body),
    initials: buildInitials(post.title, post.roleSought),
    tags: inferTags(post),
    needsAccommodation: post.needsAccommodation,
    availability: post.availability?.trim() || null,
    sortDate: (post.publishedAt ?? post.createdAt).getTime(),
    hasTamil,
    hasEnglish,
    isImmediate,
    isWatchman,
    isHousehold,
  };
}

export function buildChennaiSeekerHubCards(posts: JobSeekerPostRow[]): ChennaiSeekerHubCard[] {
  return posts.map(buildChennaiSeekerHubCard);
}

export function filterChennaiSeekerHubCards(
  cards: ChennaiSeekerHubCard[],
  filters: ChennaiSeekerFilters,
): ChennaiSeekerHubCard[] {
  const kw = filters.keyword.trim().toLowerCase();
  return cards.filter((card) => {
    if (kw) {
      const hay = `${card.title} ${card.seekerLabel ?? ""} ${card.roleSought ?? ""} ${card.excerpt} ${card.tags.join(" ")}`.toLowerCase();
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
    const hay = `${card.title} ${card.excerpt} ${card.roleSought ?? ""}`.toLowerCase();
    if (!roleTypeMatches(filters.roleType, hay)) return false;
    if (filters.accommodation === "needs-stay" && !card.needsAccommodation) return false;
    if (filters.accommodation === "no-stay" && card.needsAccommodation) return false;
    if (filters.availability === "immediate" && !card.isImmediate) return false;
    if (filters.availability === "notice" && card.isImmediate) return false;
    if (filters.language === "tamil" && !card.hasTamil) return false;
    if (filters.language === "english" && !card.hasEnglish) return false;
    if (filters.language === "both" && !(card.hasTamil && card.hasEnglish)) return false;
    if (!quickChipMatches(filters.quickChip, card)) return false;
    return true;
  });
}

export function sortChennaiSeekerHubCards(
  cards: ChennaiSeekerHubCard[],
  sort: ChennaiSeekerSort,
): ChennaiSeekerHubCard[] {
  const list = [...cards];
  switch (sort) {
    case "location":
      return list.sort((a, b) => a.location.localeCompare(b.location));
    case "accommodation":
      return list.sort((a, b) => {
        if (a.needsAccommodation !== b.needsAccommodation) {
          return a.needsAccommodation ? -1 : 1;
        }
        return b.sortDate - a.sortDate;
      });
    case "immediate":
      return list.sort((a, b) => {
        if (a.isImmediate !== b.isImmediate) return a.isImmediate ? -1 : 1;
        return b.sortDate - a.sortDate;
      });
    case "latest":
    default:
      return list.sort((a, b) => b.sortDate - a.sortDate);
  }
}

export function countAccommodationSeekers(cards: ChennaiSeekerHubCard[]): number {
  return cards.filter((c) => c.needsAccommodation).length;
}

export function countImmediateSeekers(cards: ChennaiSeekerHubCard[]): number {
  return cards.filter((c) => c.isImmediate).length;
}
