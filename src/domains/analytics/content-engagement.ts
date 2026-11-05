import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { contentEngagementEvents } from "@/db/schema/tables";
import type { ContentKind, EngagementEventKind } from "@/lib/analytics/engagement-events";

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

export async function recordContentEngagement(input: {
  kind: ContentKind;
  slug: string;
  eventKind: EngagementEventKind;
  visitorId: string;
}): Promise<{ recorded: boolean }> {
  const db = getDb();
  const windowMs = input.eventKind === "pageview" ? 30 * 60 * 1000 : 8 * 1000;
  const since = new Date(Date.now() - windowMs);
  await db.execute(sql`
    INSERT INTO content_engagement_events (content_kind, content_slug, event_kind, visitor_id)
    SELECT ${input.kind}, ${input.slug}, ${input.eventKind}, ${input.visitorId}
    WHERE NOT EXISTS (
      SELECT 1
      FROM content_engagement_events
      WHERE content_kind = ${input.kind}
        AND content_slug = ${input.slug}
        AND event_kind = ${input.eventKind}
        AND visitor_id = ${input.visitorId}
        AND created_at > ${since}
    )
  `);
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
  bannerClicks: number;
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
    const current = byDay.get(day) ?? {
      day,
      views: 0,
      callClicks: 0,
      whatsappClicks: 0,
      bannerClicks: 0,
    };
    const total = num(row.total);
    if (row.eventKind === "pageview") current.views += total;
    if (row.eventKind === "call_click") current.callClicks += total;
    if (row.eventKind === "whatsapp_click") current.whatsappClicks += total;
    if (row.eventKind === "banner_click") current.bannerClicks += total;
    byDay.set(day, current);
  }

  const days: EngagementDay[] = [];
  const today = istDay(new Date());
  for (let i = 29; i >= 0; i--) {
    const day = shiftIstDay(today, -i);
    days.push(
      byDay.get(day) ?? { day, views: 0, callClicks: 0, whatsappClicks: 0, bannerClicks: 0 },
    );
  }
  return days;
}

export type RecentEngagement = {
  eventKind: string;
  contentSlug: string;
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
      contentSlug: contentEngagementEvents.contentSlug,
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

export type BannerSlugStat = {
  slug: string;
  clicks: number;
  clicks7d: number;
  people: number;
};

export type BannerPartnerStat = {
  partnerId: string;
  clicks: number;
  clicks7d: number;
  people: number;
};

export type BannerClickTotals = {
  clicks: number;
  clicks7d: number;
  people: number;
};

export function emptyBannerClickTotals(): BannerClickTotals {
  return { clicks: 0, clicks7d: 0, people: 0 };
}

const bannerClickWhere = and(
  eq(contentEngagementEvents.contentKind, "banner"),
  eq(contentEngagementEvents.eventKind, "banner_click"),
);

export async function loadBannerClickStats(): Promise<{
  bySlug: BannerSlugStat[];
  byPartner: BannerPartnerStat[];
  totals: BannerClickTotals;
}> {
  const db = getDb();
  const partnerId = sql<string>`split_part(${contentEngagementEvents.contentSlug}, '--', 1)`;
  const clicks = sql<number>`count(*)::int`;
  const clicks7d = sql<number>`count(*) filter (where ${contentEngagementEvents.createdAt} > now() - interval '7 days')::int`;
  const people = sql<number>`count(distinct ${contentEngagementEvents.visitorId})::int`;
  const [slugRows, partnerRows, totalRows] = await Promise.all([
    db
      .select({
        slug: contentEngagementEvents.contentSlug,
        clicks,
        clicks7d,
        people,
      })
      .from(contentEngagementEvents)
      .where(bannerClickWhere)
      .groupBy(contentEngagementEvents.contentSlug),
    db
      .select({ partnerId, clicks, clicks7d, people })
      .from(contentEngagementEvents)
      .where(bannerClickWhere)
      .groupBy(partnerId),
    db.select({ clicks, clicks7d, people }).from(contentEngagementEvents).where(bannerClickWhere),
  ]);

  const total = totalRows[0];
  return {
    bySlug: slugRows.map((row) => ({
      slug: row.slug,
      clicks: num(row.clicks),
      clicks7d: num(row.clicks7d),
      people: num(row.people),
    })),
    byPartner: partnerRows.map((row) => ({
      partnerId: String(row.partnerId),
      clicks: num(row.clicks),
      clicks7d: num(row.clicks7d),
      people: num(row.people),
    })),
    totals: {
      clicks: num(total?.clicks),
      clicks7d: num(total?.clicks7d),
      people: num(total?.people),
    },
  };
}

export async function loadBannerSeries(partnerId: string): Promise<EngagementDay[]> {
  const db = getDb();
  const rows = await db
    .select({
      day: sql<string>`to_char(${contentEngagementEvents.createdAt} at time zone 'Asia/Kolkata', 'YYYY-MM-DD')`,
      total: sql<number>`count(*)::int`,
    })
    .from(contentEngagementEvents)
    .where(
      and(
        eq(contentEngagementEvents.contentKind, "banner"),
        eq(contentEngagementEvents.eventKind, "banner_click"),
        sql`${contentEngagementEvents.contentSlug} like ${`${partnerId}--%`}`,
        sql`${contentEngagementEvents.createdAt} > now() - interval '30 days'`,
      ),
    )
    .groupBy(sql`to_char(${contentEngagementEvents.createdAt} at time zone 'Asia/Kolkata', 'YYYY-MM-DD')`);

  const byDay = new Map<string, number>();
  for (const row of rows) byDay.set(String(row.day), num(row.total));

  const days: EngagementDay[] = [];
  const today = istDay(new Date());
  for (let i = 29; i >= 0; i--) {
    const day = shiftIstDay(today, -i);
    const bannerClicks = byDay.get(day) ?? 0;
    days.push({ day, views: 0, callClicks: 0, whatsappClicks: 0, bannerClicks });
  }
  return days;
}

export async function loadRecentBannerClicks(partnerId: string): Promise<RecentEngagement[]> {
  const db = getDb();
  return db
    .select({
      eventKind: contentEngagementEvents.eventKind,
      contentSlug: contentEngagementEvents.contentSlug,
      visitorId: contentEngagementEvents.visitorId,
      createdAt: contentEngagementEvents.createdAt,
    })
    .from(contentEngagementEvents)
    .where(
      and(
        eq(contentEngagementEvents.contentKind, "banner"),
        eq(contentEngagementEvents.eventKind, "banner_click"),
        sql`${contentEngagementEvents.contentSlug} like ${`${partnerId}--%`}`,
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
