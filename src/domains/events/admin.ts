import { and, asc, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, events } from "@/db/schema/tables";
import { DESK_PAGE_SIZE, deskLikeTerm, deskPage } from "@/lib/super-admin/desk-return";
import { CHENNAI_CITY_SLUG } from "./queries";

export type EventDeskStatus = "draft" | "scheduled" | "cancelled" | "completed";
export type EventDeskSegment = EventDeskStatus | "all";

export type EventDeskRow = {
  id: string;
  slug: string;
  title: string;
  status: EventDeskStatus;
  featured: boolean;
  startsAt: Date;
  endsAt: Date | null;
  venueName: string | null;
  localityLabel: string | null;
  description: string | null;
  updatedAt: Date;
};

export type EventDesk = {
  rows: EventDeskRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
};

async function chennaiCityId(): Promise<string | null> {
  const [row] = await getDb()
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row?.id ?? null;
}

export async function loadEventDesk(input: {
  segment: EventDeskSegment;
  q: string;
  pageRaw?: string;
}): Promise<EventDesk> {
  const empty = { rows: [], total: 0, counts: { all: 0 }, page: 1, pageCount: 1 };
  const cityId = await chennaiCityId();
  if (!cityId) return empty;
  const db = getDb();
  const countRows = await db
    .select({ status: events.status, n: sql<number>`count(*)::int` })
    .from(events)
    .where(eq(events.cityId, cityId))
    .groupBy(events.status);
  const counts: Record<string, number> = { all: 0 };
  for (const row of countRows) {
    counts[row.status] = Number(row.n);
    counts.all += Number(row.n);
  }

  const filters: SQL[] = [eq(events.cityId, cityId)];
  if (input.segment !== "all") filters.push(eq(events.status, input.segment));
  const q = input.q.trim();
  if (q) {
    const term = deskLikeTerm(q);
    const search = or(
      ilike(events.title, term),
      ilike(events.slug, term),
      ilike(events.venueName, term),
      ilike(events.localityLabel, term),
    );
    if (search) filters.push(search);
  }
  const where = and(...filters);
  const [{ total: totalRaw } = { total: 0 }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(events)
    .where(where);
  const total = Number(totalRaw);
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
  const rows = await db
    .select({
      id: events.id,
      slug: events.slug,
      title: events.title,
      status: events.status,
      featured: events.featured,
      startsAt: events.startsAt,
      endsAt: events.endsAt,
      venueName: events.venueName,
      localityLabel: events.localityLabel,
      description: events.description,
      updatedAt: events.updatedAt,
    })
    .from(events)
    .where(where)
    .orderBy(
      input.segment === "scheduled" ? asc(events.startsAt) : desc(events.updatedAt),
    )
    .limit(DESK_PAGE_SIZE)
    .offset((page - 1) * DESK_PAGE_SIZE);
  return { rows: rows as EventDeskRow[], total, counts, page, pageCount };
}
