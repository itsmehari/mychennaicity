import { and, desc, eq, ilike, isNotNull, isNull, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, classifiedListings, classifiedPhoneReveals } from "@/db/schema/tables";
import { DESK_PAGE_SIZE, deskLikeTerm, deskPage } from "@/lib/super-admin/desk-return";
import { CHENNAI_CITY_SLUG } from "./queries";

export type ClassifiedDeskStatus = "draft" | "open" | "closed";
export type ClassifiedDeskSegment = ClassifiedDeskStatus | "all";

export type ClassifiedDeskRow = {
  id: string;
  slug: string;
  title: string;
  status: ClassifiedDeskStatus;
  featured: boolean;
  category: string | null;
  locationLabel: string | null;
  posterName: string | null;
  contactPhone: string | null;
  contactPhoneGated: boolean;
  publishedAt: Date | null;
  expiresAt: Date | null;
  updatedAt: Date;
  body: string;
};

export type ClassifiedDesk = {
  rows: ClassifiedDeskRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
};

export type ContactDeskSegment = "new" | "followed" | "all";

export type ContactDeskRow = {
  id: string;
  name: string | null;
  phone: string;
  createdAt: Date;
  followedUpAt: Date | null;
  title: string;
  slug: string;
};

async function chennaiCityId(): Promise<string | null> {
  const [row] = await getDb()
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row?.id ?? null;
}

export async function loadClassifiedDesk(input: {
  segment: ClassifiedDeskSegment;
  q: string;
  pageRaw?: string;
}): Promise<ClassifiedDesk> {
  const empty = { rows: [], total: 0, counts: { all: 0 }, page: 1, pageCount: 1 };
  const cityId = await chennaiCityId();
  if (!cityId) return empty;
  const db = getDb();
  const countRows = await db
    .select({ status: classifiedListings.status, n: sql<number>`count(*)::int` })
    .from(classifiedListings)
    .where(eq(classifiedListings.cityId, cityId))
    .groupBy(classifiedListings.status);
  const counts: Record<string, number> = { all: 0 };
  for (const row of countRows) {
    counts[row.status] = Number(row.n);
    counts.all += Number(row.n);
  }

  const filters: SQL[] = [eq(classifiedListings.cityId, cityId)];
  if (input.segment !== "all") filters.push(eq(classifiedListings.status, input.segment));
  const q = input.q.trim();
  if (q) {
    const term = deskLikeTerm(q);
    const search = or(
      ilike(classifiedListings.title, term),
      ilike(classifiedListings.slug, term),
      ilike(classifiedListings.locationLabel, term),
      ilike(classifiedListings.posterName, term),
      ilike(classifiedListings.contactPhone, term),
    );
    if (search) filters.push(search);
  }
  const where = and(...filters);
  const [{ total: totalRaw } = { total: 0 }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(classifiedListings)
    .where(where);
  const total = Number(totalRaw);
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
  const rows = await db
    .select({
      id: classifiedListings.id,
      slug: classifiedListings.slug,
      title: classifiedListings.title,
      status: classifiedListings.status,
      featured: classifiedListings.featured,
      category: classifiedListings.category,
      locationLabel: classifiedListings.locationLabel,
      posterName: classifiedListings.posterName,
      contactPhone: classifiedListings.contactPhone,
      contactPhoneGated: classifiedListings.contactPhoneGated,
      publishedAt: classifiedListings.publishedAt,
      expiresAt: classifiedListings.expiresAt,
      updatedAt: classifiedListings.updatedAt,
      body: classifiedListings.body,
    })
    .from(classifiedListings)
    .where(where)
    .orderBy(desc(classifiedListings.updatedAt))
    .limit(DESK_PAGE_SIZE)
    .offset((page - 1) * DESK_PAGE_SIZE);
  return { rows: rows as ClassifiedDeskRow[], total, counts, page, pageCount };
}

export async function loadContactDesk(input: {
  segment: ContactDeskSegment;
  q: string;
  pageRaw?: string;
}): Promise<{
  rows: ContactDeskRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
}> {
  const db = getDb();
  const [{ fresh } = { fresh: 0 }] = await db
    .select({ fresh: sql<number>`count(*)::int` })
    .from(classifiedPhoneReveals)
    .where(isNull(classifiedPhoneReveals.followedUpAt));
  const [{ followed } = { followed: 0 }] = await db
    .select({ followed: sql<number>`count(*)::int` })
    .from(classifiedPhoneReveals)
    .where(isNotNull(classifiedPhoneReveals.followedUpAt));
  const counts = {
    new: Number(fresh),
    followed: Number(followed),
    all: Number(fresh) + Number(followed),
  };

  const filters: SQL[] = [];
  if (input.segment === "new") filters.push(isNull(classifiedPhoneReveals.followedUpAt));
  if (input.segment === "followed") filters.push(isNotNull(classifiedPhoneReveals.followedUpAt));
  const q = input.q.trim();
  if (q) {
    const term = deskLikeTerm(q);
    const digits = q.replace(/\D/g, "");
    const parts = [
      ilike(classifiedPhoneReveals.enquirerName, term),
      ilike(classifiedPhoneReveals.enquirerPhone, term),
      ilike(classifiedListings.title, term),
      ilike(classifiedListings.slug, term),
    ];
    if (digits) parts.push(ilike(classifiedPhoneReveals.enquirerPhone, deskLikeTerm(digits)));
    const search = or(...parts);
    if (search) filters.push(search);
  }
  const where = filters.length ? and(...filters) : undefined;
  const [{ total: totalRaw } = { total: 0 }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(classifiedPhoneReveals)
    .innerJoin(
      classifiedListings,
      eq(classifiedListings.id, classifiedPhoneReveals.listingId),
    )
    .where(where);
  const total = Number(totalRaw);
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
  const rows = await db
    .select({
      id: classifiedPhoneReveals.id,
      name: classifiedPhoneReveals.enquirerName,
      phone: classifiedPhoneReveals.enquirerPhone,
      createdAt: classifiedPhoneReveals.createdAt,
      followedUpAt: classifiedPhoneReveals.followedUpAt,
      title: classifiedListings.title,
      slug: classifiedListings.slug,
    })
    .from(classifiedPhoneReveals)
    .innerJoin(
      classifiedListings,
      eq(classifiedListings.id, classifiedPhoneReveals.listingId),
    )
    .where(where)
    .orderBy(desc(classifiedPhoneReveals.createdAt))
    .limit(DESK_PAGE_SIZE)
    .offset((page - 1) * DESK_PAGE_SIZE);
  return { rows, total, counts, page, pageCount };
}
