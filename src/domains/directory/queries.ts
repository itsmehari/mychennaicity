import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, directoryEntries } from "@/db/schema/tables";
import {
  directoryEntryBody,
  parseDirectoryEntryMetadata,
  type DirectoryEntryMetadata,
} from "@/lib/directory/metadata";
import {
  isDirectoryEntryType,
  type DirectoryEntryType,
} from "@/lib/directory/type-labels";

export const CHENNAI_CITY_SLUG = "chennai";

export type DirectoryEntryRow = typeof directoryEntries.$inferSelect;

export type DirectoryEntryView = DirectoryEntryRow & {
  meta: DirectoryEntryMetadata;
  body: string;
};

async function getChennaiCityId(): Promise<string | null> {
  const db = getDb();
  const row = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  return row[0]?.id ?? null;
}

function toView(row: DirectoryEntryRow): DirectoryEntryView {
  const meta = parseDirectoryEntryMetadata(row.metadata);
  return {
    ...row,
    meta,
    body: directoryEntryBody(meta),
  };
}

export async function listDirectoryEntriesForChennaiHub(limit = 24) {
  const cityId = await getChennaiCityId();
  if (!cityId) return [] as DirectoryEntryView[];
  const db = getDb();
  const rows = await db
    .select()
    .from(directoryEntries)
    .where(eq(directoryEntries.cityId, cityId))
    .orderBy(desc(directoryEntries.updatedAt))
    .limit(limit);
  return rows.map(toView);
}

export async function countDirectoryEntriesForChennaiHub(): Promise<number> {
  const cityId = await getChennaiCityId();
  if (!cityId) return 0;
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(directoryEntries)
    .where(eq(directoryEntries.cityId, cityId));
  return Number(row?.n ?? 0);
}

export async function getDirectoryEntryByTypeAndSlug(
  typeRaw: string,
  slug: string,
): Promise<DirectoryEntryView | null> {
  if (!isDirectoryEntryType(typeRaw)) return null;
  const type = typeRaw as DirectoryEntryType;
  const cityId = await getChennaiCityId();
  if (!cityId) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(directoryEntries)
    .where(
      and(
        eq(directoryEntries.cityId, cityId),
        eq(directoryEntries.type, type),
        eq(directoryEntries.slug, slug),
      ),
    )
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  return toView(row);
}

export async function listDirectoryEntriesForSitemap(): Promise<
  { type: DirectoryEntryType; slug: string; lastModified: Date }[]
> {
  const cityId = await getChennaiCityId();
  if (!cityId) return [];
  const db = getDb();
  const rows = await db
    .select({
      type: directoryEntries.type,
      slug: directoryEntries.slug,
      updatedAt: directoryEntries.updatedAt,
    })
    .from(directoryEntries)
    .where(eq(directoryEntries.cityId, cityId));
  return rows.map((r) => ({
    type: r.type,
    slug: r.slug,
    lastModified: r.updatedAt,
  }));
}
