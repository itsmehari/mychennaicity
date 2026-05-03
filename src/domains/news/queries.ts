import { unstable_cache } from "next/cache";
import { and, desc, eq, isNotNull, ne } from "drizzle-orm";
import { getDb } from "@/db/client";
import { articles, cities } from "@/db/schema/tables";

export const CHENNAI_CITY_SLUG = "chennai";

export type PublicArticleRow = typeof articles.$inferSelect;

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

const publishedCond = and(
  eq(articles.status, "published"),
  isNotNull(articles.publishedAt),
);

export async function listPublishedArticlesForChennai(limit = 50) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(articles)
    .where(and(eq(articles.cityId, cityId), publishedCond))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<PublicArticleRow | null> {
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        eq(articles.slug, slug),
        publishedCond,
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function featuredArticlesForHome(limit = 3) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        publishedCond,
        eq(articles.featured, true),
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function latestArticlesForHome(limit = 8) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(articles)
    .where(and(eq(articles.cityId, cityId), publishedCond))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

/** Short CDN/data-cache TTL for home bulletin — keeps TTFB lower while staying fresh. */
const HOME_NEWS_REVALIDATE_SEC = 120;

export async function homeNewsBulletinCached(): Promise<{
  featured: PublicArticleRow[];
  latest: PublicArticleRow[];
}> {
  return unstable_cache(
    async () => {
      const featured = await featuredArticlesForHome(3);
      const latest = await latestArticlesForHome(10);
      return { featured, latest };
    },
    ["home-news-bulletin"],
    { revalidate: HOME_NEWS_REVALIDATE_SEC },
  )();
}

const ARTICLE_PUBLIC_REVALIDATE_SEC = 120;

/** Cached read for public article pages (metadata + body share one cache entry per slug). */
export async function getPublishedArticleBySlugCached(
  slug: string,
): Promise<PublicArticleRow | null> {
  return unstable_cache(
    () => getPublishedArticleBySlug(slug),
    ["news-article-public", slug],
    { revalidate: ARTICLE_PUBLIC_REVALIDATE_SEC },
  )();
}

export async function getPublishedSlugsForChennai(): Promise<string[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({ slug: articles.slug })
    .from(articles)
    .where(and(eq(articles.cityId, cityId), publishedCond));
  return rows.map((r) => r.slug);
}

export type SitemapArticleRow = {
  slug: string;
  lastModified: Date;
  heroImageUrl: string | null;
};

export async function listArticlesForSitemap(): Promise<SitemapArticleRow[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      slug: articles.slug,
      updatedAt: articles.updatedAt,
      publishedAt: articles.publishedAt,
      heroImageUrl: articles.heroImageUrl,
    })
    .from(articles)
    .where(and(eq(articles.cityId, cityId), publishedCond));
  return rows.map((r) => ({
    slug: r.slug,
    lastModified: r.updatedAt ?? r.publishedAt ?? new Date(),
    heroImageUrl: r.heroImageUrl,
  }));
}

export async function listArticlesByCategoryForChennai(
  category: string,
  limit = 30,
) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  return db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        publishedCond,
        eq(articles.category, category),
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function relatedArticlesForChennai(
  slug: string,
  category: string | null,
  limit = 4,
) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const conds = [
    eq(articles.cityId, cityId),
    publishedCond,
    ne(articles.slug, slug),
  ];
  if (category) {
    conds.push(eq(articles.category, category));
  }
  return db
    .select()
    .from(articles)
    .where(and(...conds))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

/** Distinct categories that have at least one published article (Chennai). */
export async function listTopicKeysForChennai(): Promise<string[]> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .selectDistinct({ category: articles.category })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        publishedCond,
        isNotNull(articles.category),
        ne(articles.category, ""),
      ),
    );
  return rows
    .map((r) => r.category)
    .filter((c): c is string => Boolean(c));
}
