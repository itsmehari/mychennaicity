import { and, desc, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  articles,
  cities,
  classifiedListings,
  contentEngagementEvents,
  events,
  jobPostings,
  jobSeekerPosts,
} from "@/db/schema/tables";
import type { ContentKind, EngagementEventKind } from "@/lib/analytics/engagement-events";

const CHENNAI = "chennai";

function num(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export type EngagementRollup = {
  views: number;
  views7d: number;
  uniqueViewers: number;
  callClicks: number;
  callClicks7d: number;
  whatsappClicks: number;
  whatsappClicks7d: number;
};

export function emptyRollup(): EngagementRollup {
  return {
    views: 0,
    views7d: 0,
    uniqueViewers: 0,
    callClicks: 0,
    callClicks7d: 0,
    whatsappClicks: 0,
    whatsappClicks7d: 0,
  };
}

async function chennaiCityId(): Promise<string | null> {
  const db = getDb();
  const rows = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI))
    .limit(1);
  return rows[0]?.id ?? null;
}

export async function trackedContentExists(
  kind: ContentKind,
  slug: string,
): Promise<boolean> {
  const cityId = await chennaiCityId();
  if (!cityId) return false;
  const db = getDb();
  if (kind === "news") {
    const rows = await db
      .select({ id: articles.id })
      .from(articles)
      .where(and(eq(articles.cityId, cityId), eq(articles.slug, slug)))
      .limit(1);
    return Boolean(rows[0]);
  }
  if (kind === "job") {
    const rows = await db
      .select({ id: jobPostings.id })
      .from(jobPostings)
      .where(and(eq(jobPostings.cityId, cityId), eq(jobPostings.slug, slug)))
      .limit(1);
    return Boolean(rows[0]);
  }
  if (kind === "event") {
    const rows = await db
      .select({ id: events.id })
      .from(events)
      .where(and(eq(events.cityId, cityId), eq(events.slug, slug)))
      .limit(1);
    return Boolean(rows[0]);
  }
  if (kind === "classified") {
    const rows = await db
      .select({ id: classifiedListings.id })
      .from(classifiedListings)
      .where(and(eq(classifiedListings.cityId, cityId), eq(classifiedListings.slug, slug)))
      .limit(1);
    return Boolean(rows[0]);
  }
  const rows = await db
    .select({ id: jobSeekerPosts.id })
    .from(jobSeekerPosts)
    .where(and(eq(jobSeekerPosts.cityId, cityId), eq(jobSeekerPosts.slug, slug)))
    .limit(1);
  return Boolean(rows[0]);
}

export async function recordContentEngagement(input: {
  kind: ContentKind;
  slug: string;
  eventKind: EngagementEventKind;
  visitorId: string;
}): Promise<{ recorded: boolean }> {
  const db = getDb();
  const windowMs = input.eventKind === "pageview" ? 30 * 60 * 1000 : 8 * 1000;
  const since = new Date(Date.now() - windowMs);
  const recent = await db
    .select({ id: contentEngagementEvents.id })
    .from(contentEngagementEvents)
    .where(
      and(
        eq(contentEngagementEvents.contentKind, input.kind),
        eq(contentEngagementEvents.contentSlug, input.slug),
        eq(contentEngagementEvents.eventKind, input.eventKind),
        eq(contentEngagementEvents.visitorId, input.visitorId),
        gt(contentEngagementEvents.createdAt, since),
      ),
    )
    .limit(1);
  if (recent[0]) return { recorded: false };

  await db.insert(contentEngagementEvents).values({
    contentKind: input.kind,
    contentSlug: input.slug,
    eventKind: input.eventKind,
    visitorId: input.visitorId,
  });
  return { recorded: true };
}

export async function loadEngagementRollups(): Promise<Map<string, EngagementRollup>> {
  const db = getDb();
  const rows = await db
    .select({
      kind: contentEngagementEvents.contentKind,
      slug: contentEngagementEvents.contentSlug,
      views: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'pageview')::int`,
      views7d: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'pageview' and ${contentEngagementEvents.createdAt} > now() - interval '7 days')::int`,
      uniqueViewers: sql<number>`count(distinct ${contentEngagementEvents.visitorId}) filter (where ${contentEngagementEvents.eventKind} = 'pageview')::int`,
      callClicks: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'call_click')::int`,
      callClicks7d: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'call_click' and ${contentEngagementEvents.createdAt} > now() - interval '7 days')::int`,
      whatsappClicks: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'whatsapp_click')::int`,
      whatsappClicks7d: sql<number>`count(*) filter (where ${contentEngagementEvents.eventKind} = 'whatsapp_click' and ${contentEngagementEvents.createdAt} > now() - interval '7 days')::int`,
    })
    .from(contentEngagementEvents)
    .groupBy(contentEngagementEvents.contentKind, contentEngagementEvents.contentSlug);

  const map = new Map<string, EngagementRollup>();
  for (const row of rows) {
    map.set(`${row.kind}:${row.slug}`, {
      views: num(row.views),
      views7d: num(row.views7d),
      uniqueViewers: num(row.uniqueViewers),
      callClicks: num(row.callClicks),
      callClicks7d: num(row.callClicks7d),
      whatsappClicks: num(row.whatsappClicks),
      whatsappClicks7d: num(row.whatsappClicks7d),
    });
  }
  return map;
}

export type EngagementDay = {
  day: string;
  views: number;
  callClicks: number;
  whatsappClicks: number;
};

export async function loadEngagementSeries(
  kind: ContentKind,
  slug: string,
): Promise<EngagementDay[]> {
  const db = getDb();
  const rows = await db
    .select({
      day: sql<string>`to_char(${contentEngagementEvents.createdAt} at time zone 'Asia/Kolkata', 'YYYY-MM-DD')`,
      eventKind: contentEngagementEvents.eventKind,
      total: sql<number>`count(*)::int`,
    })
    .from(contentEngagementEvents)
    .where(
      and(
        eq(contentEngagementEvents.contentKind, kind),
        eq(contentEngagementEvents.contentSlug, slug),
        sql`${contentEngagementEvents.createdAt} > now() - interval '30 days'`,
      ),
    )
    .groupBy(
      sql`to_char(${contentEngagementEvents.createdAt} at time zone 'Asia/Kolkata', 'YYYY-MM-DD')`,
      contentEngagementEvents.eventKind,
    );

  const byDay = new Map<string, EngagementDay>();
  for (const row of rows) {
    const day = String(row.day);
    const current = byDay.get(day) ?? { day, views: 0, callClicks: 0, whatsappClicks: 0 };
    const total = num(row.total);
    if (row.eventKind === "pageview") current.views += total;
    if (row.eventKind === "call_click") current.callClicks += total;
    if (row.eventKind === "whatsapp_click") current.whatsappClicks += total;
    byDay.set(day, current);
  }

  const days: EngagementDay[] = [];
  const today = istDay(new Date());
  for (let i = 29; i >= 0; i--) {
    const day = shiftIstDay(today, -i);
    days.push(byDay.get(day) ?? { day, views: 0, callClicks: 0, whatsappClicks: 0 });
  }
  return days;
}

export type RecentEngagement = {
  eventKind: string;
  visitorId: string;
  createdAt: Date;
};

export async function loadRecentEngagement(
  kind: ContentKind,
  slug: string,
): Promise<RecentEngagement[]> {
  const db = getDb();
  return db
    .select({
      eventKind: contentEngagementEvents.eventKind,
      visitorId: contentEngagementEvents.visitorId,
      createdAt: contentEngagementEvents.createdAt,
    })
    .from(contentEngagementEvents)
    .where(
      and(
        eq(contentEngagementEvents.contentKind, kind),
        eq(contentEngagementEvents.contentSlug, slug),
      ),
    )
    .orderBy(desc(contentEngagementEvents.createdAt))
    .limit(40);
}

function istDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function shiftIstDay(day: string, delta: number): string {
  const [year, month, date] = day.split("-").map(Number);
  const utc = Date.UTC(year, month - 1, date) + delta * 86_400_000;
  return new Date(utc).toISOString().slice(0, 10);
}
