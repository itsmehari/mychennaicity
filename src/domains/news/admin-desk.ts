import { and, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { articles, cities } from "@/db/schema/tables";
import { DESK_PAGE_SIZE, deskLikeTerm, deskPage } from "@/lib/super-admin/desk-return";
import { CHENNAI_CITY_SLUG } from "./queries";

export type ArticleDeskStatus = "draft" | "published" | "archived";
export type ArticleDeskSegment = ArticleDeskStatus | "all";

export type ArticleDeskRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  status: ArticleDeskStatus;
  featured: boolean;
  category: string | null;
  sourceName: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
};

export async function loadArticleDesk(input: {
  segment: ArticleDeskSegment;
  q: string;
  pageRaw?: string;
}): Promise<{
  rows: ArticleDeskRow[];
  total: number;
  counts: Record<string, number>;
  page: number;
  pageCount: number;
}> {
  const empty = { rows: [], total: 0, counts: { all: 0 }, page: 1, pageCount: 1 };
  const [city] = await getDb()
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  if (!city) return empty;
  const db = getDb();
  const countRows = await db
    .select({ status: articles.status, n: sql<number>`count(*)::int` })
    .from(articles)
    .where(eq(articles.cityId, city.id))
    .groupBy(articles.status);
  const counts: Record<string, number> = { all: 0 };
  for (const row of countRows) {
    counts[row.status] = Number(row.n);
    counts.all += Number(row.n);
  }

  const filters: SQL[] = [eq(articles.cityId, city.id)];
  if (input.segment !== "all") filters.push(eq(articles.status, input.segment));
  const q = input.q.trim();
  if (q) {
    const term = deskLikeTerm(q);
    const search = or(
      ilike(articles.title, term),
      ilike(articles.slug, term),
      ilike(articles.summary, term),
      ilike(articles.category, term),
    );
    if (search) filters.push(search);
  }
  const where = and(...filters);
  const [{ total: totalRaw } = { total: 0 }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(articles)
    .where(where);
  const total = Number(totalRaw);
  const pageCount = Math.max(1, Math.ceil(total / DESK_PAGE_SIZE));
  const page = deskPage(input.pageRaw, pageCount);
  const rows = await db
    .select({
      id: articles.id,
      slug: articles.slug,
      title: articles.title,
      summary: articles.summary,
      status: articles.status,
      featured: articles.featured,
      category: articles.category,
      sourceName: articles.sourceName,
      publishedAt: articles.publishedAt,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .where(where)
    .orderBy(desc(articles.updatedAt))
    .limit(DESK_PAGE_SIZE)
    .offset((page - 1) * DESK_PAGE_SIZE);
  return { rows: rows as ArticleDeskRow[], total, counts, page, pageCount };
}
