/**
 * Live jobs, looking-for-work notices, and upcoming events for /llms.txt.
 * Contact numbers stay on the listing page.
 */
import { activeFeaturedJobCampaigns } from "@/content/jobs/featured-job-campaigns";
import { listPublicEventsForChennaiHub, countPublicEventsForChennaiHub } from "@/domains/events";
import type { PublicEventRow } from "@/domains/events";
import {
  countOpenJobSeekerPostsForChennaiHub,
  listOpenJobSeekerPostsForChennaiHub,
} from "@/domains/job-seekers";
import type { JobSeekerPostRow } from "@/domains/job-seekers";
import {
  countOpenJobPostingsForChennaiHub,
  listOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import type { JobPostingWithEmployer } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { buildChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { buildChennaiSeekerHubCard } from "@/lib/jobs/chennai-seekers-hub-helpers";
import { isTamilJobSlug, jobEnglishSlug, jobTamilSlug } from "@/lib/jobs/job-language";
import { chennaiJobsDetailPath, chennaiJobSeekerDetailPath } from "@/lib/routes/chennai-jobs";
import type { LlmsDigestItem, LlmsLiveCatalog } from "@/lib/seo/llms-txt";

/** Safety cap. The public hubs stay the full list if this is exceeded. */
export const LLMS_CATALOG_LIMIT = 400;

const IST = "Asia/Kolkata";

export function formatIstDate(date: Date, withTime = false): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

/** Drop phones, emails, and WhatsApp links from text copied into the AI index. */
export function redactListingContacts(text: string): string {
  return text
    .replace(/https?:\/\/(?:wa\.me|api\.whatsapp\.com)\/\S+/gi, "")
    .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "")
    .replace(/(?:\+?\d[\d\s().-]{8,}\d)/g, (match) => {
      const digits = match.replace(/\D/g, "");
      const local = digits.startsWith("91") ? digits.slice(2) : digits.replace(/^0/, "");
      if (local.length === 10) return "";
      return match;
    })
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;])/g, "$1")
    .trim();
}

export function listingSnippet(text: string | null | undefined, max = 220): string | null {
  if (!text?.trim()) return null;
  const plain = redactListingContacts(
    text
      .replace(/<[^>]+>/g, " ")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*_`>]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
  if (!plain) return null;
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1).trimEnd()}…`;
}

function joinFacts(parts: Array<string | null | undefined>): string {
  return parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(" · ");
}

function absolutePath(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function tamilTwinSlug(englishSlug: string, openSlugs: Set<string>): string | null {
  const tamil = jobTamilSlug(englishSlug);
  if (openSlugs.has(tamil)) return tamil;
  try {
    const decoded = decodeURIComponent(tamil);
    if (decoded !== tamil && openSlugs.has(decoded)) return decoded;
  } catch {
    /* stored slug is not percent-encoded */
  }
  return null;
}

export function jobRowsToLlmsDigests(rows: JobPostingWithEmployer[]): LlmsDigestItem[] {
  const openSlugs = new Set(rows.map((row) => row.job.slug));
  const englishSlugs = new Set(
    rows.filter((row) => !isTamilJobSlug(row.job.slug)).map((row) => jobEnglishSlug(row.job.slug)),
  );
  const featured = new Map(
    activeFeaturedJobCampaigns().map((campaign) => [campaign.englishSlug, campaign.contextEn]),
  );

  const visible = rows.filter((row) => {
    if (!isTamilJobSlug(row.job.slug)) return true;
    return !englishSlugs.has(jobEnglishSlug(row.job.slug));
  });

  return visible.map((row) => {
    const card = buildChennaiJobsHubCard(row);
    const englishSlug = jobEnglishSlug(row.job.slug);
    const tamilSlug = isTamilJobSlug(row.job.slug) ? null : tamilTwinSlug(englishSlug, openSlugs);
    const applyBy = row.job.validThrough
      ? `Apply by ${formatIstDate(row.job.validThrough)}`
      : null;
    return {
      title: row.job.title,
      url: chennaiJobsDetailPath(row.job.slug),
      date: card.publishedAt,
      summary: joinFacts([
        featured.has(englishSlug) ? `Featured: ${featured.get(englishSlug)}` : null,
        card.employerName,
        card.location,
        card.employmentType,
        card.workMode,
        card.compensation,
        row.job.openingsCount > 1 ? `${row.job.openingsCount} openings` : null,
        card.isWalkIn ? "Walk-in" : null,
        applyBy,
        listingSnippet(card.excerpt, 180),
        tamilSlug ? `Tamil page: ${absolutePath(chennaiJobsDetailPath(tamilSlug))}` : null,
      ]),
    };
  });
}

export function seekerRowsToLlmsDigests(rows: JobSeekerPostRow[]): LlmsDigestItem[] {
  return rows.map((post) => {
    const card = buildChennaiSeekerHubCard(post);
    const posted = post.publishedAt ?? post.createdAt;
    return {
      title: post.title,
      url: chennaiJobSeekerDetailPath(post.slug),
      date: formatIstDate(posted),
      summary: joinFacts([
        card.seekerLabel,
        card.roleSought,
        card.location,
        card.availability,
        card.needsAccommodation ? "Needs accommodation" : null,
        listingSnippet(card.excerpt, 180),
      ]),
    };
  });
}

function eventWhen(event: PublicEventRow): string {
  const start = formatIstDate(event.startsAt, !event.allDay);
  if (!event.endsAt) return event.allDay ? start : `${start} IST`;
  const end = formatIstDate(event.endsAt, !event.allDay);
  if (start === end) return event.allDay ? start : `${start} IST`;
  return `${start} – ${end} IST`;
}

export function eventRowsToLlmsDigests(rows: PublicEventRow[]): LlmsDigestItem[] {
  return rows.map((event) => ({
    title: event.title,
    url: `/chennai-local-events/${event.slug}`,
    date: eventWhen(event),
    summary: joinFacts([
      event.venueName,
      event.localityLabel,
      event.venueAddress,
      listingSnippet(event.description, 240),
    ]),
  }));
}

export async function loadLlmsLiveCatalog(): Promise<LlmsLiveCatalog> {
  const [jobRows, jobCount, eventRows, eventCount, seekerRows, seekerCount] =
    await Promise.all([
      listOpenJobPostingsForChennaiHub(LLMS_CATALOG_LIMIT, 0),
      countOpenJobPostingsForChennaiHub(),
      listPublicEventsForChennaiHub(LLMS_CATALOG_LIMIT),
      countPublicEventsForChennaiHub(),
      listOpenJobSeekerPostsForChennaiHub(LLMS_CATALOG_LIMIT, 0),
      countOpenJobSeekerPostsForChennaiHub(),
    ]);

  return {
    jobs: jobRowsToLlmsDigests(jobRows),
    seekers: seekerRowsToLlmsDigests(seekerRows),
    events: eventRowsToLlmsDigests(eventRows),
    jobsOmitted: Math.max(0, jobCount - jobRows.length),
    seekersOmitted: Math.max(0, seekerCount - seekerRows.length),
    eventsOmitted: Math.max(0, eventCount - eventRows.length),
  };
}
