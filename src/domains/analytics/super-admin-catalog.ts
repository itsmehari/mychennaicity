import { count, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  articles,
  cities,
  classifiedListings,
  classifiedPhoneReveals,
  employers,
  eventPageViewers,
  events,
  jobPageViewers,
  jobPostings,
  jobSeekerPosts,
} from "@/db/schema/tables";
import type { ContentKind } from "@/lib/analytics/engagement-events";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import {
  chennaiJobSeekerDetailPath,
  chennaiJobsDetailPath,
} from "@/lib/routes/chennai-jobs";
import {
  emptyRollup,
  loadEngagementRollups,
  type EngagementRollup,
} from "./content-engagement";

export type SuperAdminDesk = "overview" | "news" | "jobs" | "events" | "classifieds";

export type CatalogItem = {
  kind: ContentKind;
  kindLabel: string;
  slug: string;
  title: string;
  status: string;
  when: Date | null;
  detail: string | null;
  href: string;
  views: number;
  views7d: number;
  uniqueReaders: number;
  callClicks: number;
  whatsappClicks: number;
  contactRequests: number | null;
};

export type SuperAdminSnapshot = {
  desk: SuperAdminDesk;
  query: string;
  items: CatalogItem[];
  hidden: number;
  totals: {
    posts: number;
    views7d: number;
    callClicks7d: number;
    whatsappClicks7d: number;
  };
  analyticsReady: boolean;
  databaseError: string | null;
};

const DESKS = new Set<SuperAdminDesk>(["overview", "news", "jobs", "events", "classifieds"]);

export function parseDesk(value: string | undefined): SuperAdminDesk {
  return value && DESKS.has(value as SuperAdminDesk) ? (value as SuperAdminDesk) : "overview";
}

function num(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function rollupFor(
  map: Map<string, EngagementRollup>,
  kind: ContentKind,
  slug: string,
): EngagementRollup {
  return map.get(`${kind}:${slug}`) ?? emptyRollup();
}

export async function loadSuperAdminSnapshot(input: {
  desk: SuperAdminDesk;
  query: string;
}): Promise<SuperAdminSnapshot> {
  const db = getDb();
  const cityRows = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  const cityId = cityRows[0]?.id;
  if (!cityId) {
    return {
      desk: input.desk,
      query: input.query,
      items: [],
      hidden: 0,
      totals: { posts: 0, views7d: 0, callClicks7d: 0, whatsappClicks7d: 0 },
      analyticsReady: false,
      databaseError: "Chennai is not in this database yet.",
    };
  }

  let rollups = new Map<string, EngagementRollup>();
  let analyticsReady = true;
  try {
    rollups = await loadEngagementRollups();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/content_engagement_events|does not exist/i.test(message)) {
      analyticsReady = false;
    } else {
      throw err;
    }
  }

  const [news, jobs, seekers, eventRows, classifieds, legacyJobs, legacyEvents, reveals] =
    await Promise.all([
      db
        .select({
          slug: articles.slug,
          title: articles.title,
          status: articles.status,
          publishedAt: articles.publishedAt,
          category: articles.category,
        })
        .from(articles)
        .where(eq(articles.cityId, cityId)),
      db
        .select({
          slug: jobPostings.slug,
          title: jobPostings.title,
          status: jobPostings.status,
          publishedAt: jobPostings.publishedAt,
          location: jobPostings.locationLabel,
          employer: employers.name,
        })
        .from(jobPostings)
        .innerJoin(employers, eq(employers.id, jobPostings.employerId))
        .where(eq(jobPostings.cityId, cityId)),
      db
        .select({
          slug: jobSeekerPosts.slug,
          title: jobSeekerPosts.title,
          status: jobSeekerPosts.status,
          publishedAt: jobSeekerPosts.publishedAt,
          location: jobSeekerPosts.locationLabel,
        })
        .from(jobSeekerPosts)
        .where(eq(jobSeekerPosts.cityId, cityId)),
      db
        .select({
          slug: events.slug,
          title: events.title,
          status: events.status,
          startsAt: events.startsAt,
          locality: events.localityLabel,
        })
        .from(events)
        .where(eq(events.cityId, cityId)),
      db
        .select({
          slug: classifiedListings.slug,
          title: classifiedListings.title,
          status: classifiedListings.status,
          publishedAt: classifiedListings.publishedAt,
          category: classifiedListings.category,
        })
        .from(classifiedListings)
        .where(eq(classifiedListings.cityId, cityId)),
      db
        .select({
          slug: jobPostings.slug,
          readers: sql<number>`count(${jobPageViewers.id})::int`,
        })
        .from(jobPageViewers)
        .innerJoin(jobPostings, eq(jobPostings.id, jobPageViewers.jobId))
        .groupBy(jobPostings.slug),
      db
        .select({
          slug: events.slug,
          readers: sql<number>`count(${eventPageViewers.id})::int`,
        })
        .from(eventPageViewers)
        .innerJoin(events, eq(events.id, eventPageViewers.eventId))
        .groupBy(events.slug),
      db
        .select({
          slug: classifiedListings.slug,
          requests: count(classifiedPhoneReveals.id),
        })
        .from(classifiedListings)
        .leftJoin(
          classifiedPhoneReveals,
          eq(classifiedPhoneReveals.listingId, classifiedListings.id),
        )
        .where(eq(classifiedListings.cityId, cityId))
        .groupBy(classifiedListings.slug),
    ]);

  const legacyJobReaders = new Map(legacyJobs.map((row) => [row.slug, num(row.readers)]));
  const legacyEventReaders = new Map(legacyEvents.map((row) => [row.slug, num(row.readers)]));
  const revealCounts = new Map(reveals.map((row) => [row.slug, num(row.requests)]));

  const items: CatalogItem[] = [
    ...news.map((row) => {
      const stats = rollupFor(rollups, "news", row.slug);
      return {
        kind: "news" as const,
        kindLabel: "News",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.publishedAt,
        detail: row.category,
        href: `/chennai-local-news/${encodeURIComponent(row.slug)}`,
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: stats.uniqueViewers,
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: null,
      };
    }),
    ...jobs.map((row) => {
      const stats = rollupFor(rollups, "job", row.slug);
      return {
        kind: "job" as const,
        kindLabel: "Job",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.publishedAt,
        detail: [row.employer, row.location].filter(Boolean).join(" · ") || null,
        href: chennaiJobsDetailPath(row.slug),
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: Math.max(stats.uniqueViewers, legacyJobReaders.get(row.slug) ?? 0),
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: null,
      };
    }),
    ...seekers.map((row) => {
      const stats = rollupFor(rollups, "job_seeker", row.slug);
      return {
        kind: "job_seeker" as const,
        kindLabel: "Looking for work",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.publishedAt,
        detail: row.location,
        href: chennaiJobSeekerDetailPath(row.slug),
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: stats.uniqueViewers,
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: null,
      };
    }),
    ...eventRows.map((row) => {
      const stats = rollupFor(rollups, "event", row.slug);
      return {
        kind: "event" as const,
        kindLabel: "Event",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.startsAt,
        detail: row.locality,
        href: `/chennai-local-events/${encodeURIComponent(row.slug)}`,
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: Math.max(stats.uniqueViewers, legacyEventReaders.get(row.slug) ?? 0),
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: null,
      };
    }),
    ...classifieds.map((row) => {
      const stats = rollupFor(rollups, "classified", row.slug);
      return {
        kind: "classified" as const,
        kindLabel: "Classified",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.publishedAt,
        detail: row.category,
        href: chennaiClassifiedDetailPath(row.slug),
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: stats.uniqueViewers,
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: revealCounts.get(row.slug) ?? 0,
      };
    }),
  ];

  const totals = items.reduce(
    (sum, item) => {
      sum.posts += 1;
      sum.views7d += item.views7d;
      sum.callClicks7d += rollupFor(rollups, item.kind, item.slug).callClicks7d;
      sum.whatsappClicks7d += rollupFor(rollups, item.kind, item.slug).whatsappClicks7d;
      return sum;
    },
    { posts: 0, views7d: 0, callClicks7d: 0, whatsappClicks7d: 0 },
  );

  const needle = input.query.trim().toLowerCase();
  const deskItems = items.filter((item) => {
    if (input.desk === "news") return item.kind === "news";
    if (input.desk === "jobs") return item.kind === "job" || item.kind === "job_seeker";
    if (input.desk === "events") return item.kind === "event";
    if (input.desk === "classifieds") return item.kind === "classified";
    return true;
  });
  const matched = needle
    ? deskItems.filter((item) =>
        `${item.title} ${item.slug} ${item.detail ?? ""}`.toLowerCase().includes(needle),
      )
    : deskItems;
  matched.sort((a, b) => {
    if (b.views7d !== a.views7d) return b.views7d - a.views7d;
    if (b.views !== a.views) return b.views - a.views;
    const aTime = a.when?.getTime() ?? 0;
    const bTime = b.when?.getTime() ?? 0;
    return bTime - aTime;
  });

  const limit = input.desk === "overview" ? 12 : 400;
  return {
    desk: input.desk,
    query: input.query,
    items: matched.slice(0, limit),
    hidden: Math.max(0, matched.length - limit),
    totals,
    analyticsReady,
    databaseError: null,
  };
}

export async function loadTrackedPost(
  kind: ContentKind,
  slug: string,
): Promise<CatalogItem | null> {
  const desk: SuperAdminDesk =
    kind === "news"
      ? "news"
      : kind === "event"
        ? "events"
        : kind === "classified"
          ? "classifieds"
          : "jobs";
  const snapshot = await loadSuperAdminSnapshot({ desk, query: slug });
  return snapshot.items.find((item) => item.kind === kind && item.slug === slug) ?? null;
}
