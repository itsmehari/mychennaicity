import { and, count, eq, ilike, isNotNull, or, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { articles, cities, directoryEntries, events, jobPostings } from "@/db/schema/tables";

const CHENNAI_SLUG = "chennai";

async function chennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

function likePattern(q: string): string {
  return `%${q.replace(/[%_\\]/g, "").trim()}%`;
}

export type SiteSearchHit = {
  kind: "news" | "job" | "event" | "directory";
  title: string;
  href: string;
  meta: string;
};

export async function searchSite(query: string, limitPerKind = 8): Promise<SiteSearchHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const cityId = await chennaiCityId();
  if (!cityId) return [];

  const db = getDb();
  const pattern = likePattern(q);
  const hits: SiteSearchHit[] = [];

  const newsRows = await db
    .select({
      title: articles.title,
      slug: articles.slug,
      category: articles.category,
    })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
        or(
          ilike(articles.title, pattern),
          ilike(articles.summary, pattern),
          ilike(articles.dek, pattern),
        ),
      ),
    )
    .limit(limitPerKind);

  for (const row of newsRows) {
    hits.push({
      kind: "news",
      title: row.title,
      href: `/chennai-local-news/${row.slug}`,
      meta: row.category?.trim() || "Chennai local news",
    });
  }

  const jobRows = await db
    .select({
      title: jobPostings.title,
      slug: jobPostings.slug,
      location: jobPostings.locationLabel,
    })
    .from(jobPostings)
    .where(
      and(
        eq(jobPostings.cityId, cityId),
        eq(jobPostings.status, "open"),
        or(
          ilike(jobPostings.title, pattern),
          ilike(jobPostings.body, pattern),
          ilike(jobPostings.locationLabel, pattern),
        ),
      ),
    )
    .limit(limitPerKind);

  for (const row of jobRows) {
    hits.push({
      kind: "job",
      title: row.title,
      href: `/chennai-jobs/${row.slug}`,
      meta: row.location?.trim() || "Chennai",
    });
  }

  const eventRows = await db
    .select({
      title: events.title,
      slug: events.slug,
      locality: events.localityLabel,
    })
    .from(events)
    .where(
      and(
        eq(events.cityId, cityId),
        eq(events.status, "scheduled"),
        sql`COALESCE(${events.endsAt}, ${events.startsAt}) >= NOW()`,
        or(
          ilike(events.title, pattern),
          ilike(events.description, pattern),
        ),
      ),
    )
    .limit(limitPerKind);

  for (const row of eventRows) {
    hits.push({
      kind: "event",
      title: row.title,
      href: `/chennai-local-events/${row.slug}`,
      meta: row.locality?.trim() || "Chennai",
    });
  }

  const dirRows = await db
    .select({
      name: directoryEntries.name,
      slug: directoryEntries.slug,
      type: directoryEntries.type,
      locality: directoryEntries.localityLabel,
    })
    .from(directoryEntries)
    .where(
      and(
        eq(directoryEntries.cityId, cityId),
        or(
          ilike(directoryEntries.name, pattern),
          ilike(directoryEntries.localityLabel, pattern),
          ilike(directoryEntries.address, pattern),
        ),
      ),
    )
    .limit(limitPerKind);

  for (const row of dirRows) {
    hits.push({
      kind: "directory",
      title: row.name,
      href: `/directory/${encodeURIComponent(row.type)}/${encodeURIComponent(row.slug)}`,
      meta: row.locality?.trim() || "Chennai directory",
    });
  }

  return hits;
}

export async function countPublishedArticlesForChennai(): Promise<number> {
  const cityId = await chennaiCityId();
  if (!cityId) return 0;
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(articles)
    .where(
      and(
        eq(articles.cityId, cityId),
        eq(articles.status, "published"),
        isNotNull(articles.publishedAt),
      ),
    );
  return Number(row?.n ?? 0);
}
