/**
 * Shared helpers for `scripts/seed-event-*.ts` — idempotent inserts into `events`.
 * See `docs/prompts/ADD_CHENNAI_EVENT.md` and `docs/CHENNAI_EVENTS.md`.
 */
import { config as loadEnv } from "dotenv";
import { and, eq } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../../src/db/schema";
import { cities, events } from "../../src/db/schema/tables";

export type EventSeedRow = {
  slug: string;
  title: string;
  description: string;
  startsAt: Date;
  endsAt: Date | null;
  allDay?: boolean;
  venueName?: string | null;
  venueAddress?: string | null;
  localityLabel?: string | null;
  featured?: boolean;
  presentationKey?: string | null;
  contentRef?: string | null;
};

export function isLiveSeed(argv: string[] = process.argv): boolean {
  return process.env.SEED_LIVE === "1" || argv.includes("--live");
}

/** Dev: secrets + .env.local. Live: .env.production.local only. */
export function loadEventSeedEnv(live: boolean): void {
  if (live) {
    loadEnv({ path: ".env.production.local" });
  } else {
    loadEnv({ path: "secrets/database.local.env" });
    loadEnv({ path: ".env.local" });
    loadEnv({ path: ".env" });
  }
}

export function requireDatabaseUrl(live: boolean): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      live
        ? "Live: DATABASE_URL missing. Add to .env.production.local (vercel env pull)."
        : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
    );
    process.exit(1);
  }
  return url;
}

export async function getChennaiCityId(
  db: NeonHttpDatabase<typeof schema>,
): Promise<string> {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) {
    console.error("City slug 'chennai' not found. Seed cities first.");
    process.exit(1);
  }
  return city.id;
}

/** Inserts when `(city_id, slug)` is new; skips when row already exists. */
export async function insertEventIfMissing(
  db: NeonHttpDatabase<typeof schema>,
  cityId: string,
  row: EventSeedRow,
): Promise<"inserted" | "exists"> {
  const [existing] = await db
    .select({ id: events.id })
    .from(events)
    .where(and(eq(events.cityId, cityId), eq(events.slug, row.slug)))
    .limit(1);

  if (existing) {
    console.log("Event already exists:", row.slug, existing.id);
    return "exists";
  }

  await db.insert(events).values({
    cityId,
    slug: row.slug,
    title: row.title,
    description: row.description,
    startsAt: row.startsAt,
    endsAt: row.endsAt,
    allDay: row.allDay ?? false,
    venueName: row.venueName ?? null,
    venueAddress: row.venueAddress ?? null,
    localityLabel: row.localityLabel ?? null,
    status: "scheduled",
    featured: row.featured ?? false,
    presentationKey: row.presentationKey ?? null,
    contentRef: row.contentRef ?? null,
  });

  console.log("Inserted event:", row.slug);
  return "inserted";
}

/** Insert or refresh row when `(city_id, slug)` already exists. */
export async function upsertEvent(
  db: NeonHttpDatabase<typeof schema>,
  cityId: string,
  row: EventSeedRow,
): Promise<"inserted" | "updated"> {
  const result = await insertEventIfMissing(db, cityId, row);
  if (result === "inserted") return "inserted";

  await db
    .update(events)
    .set({
      title: row.title,
      description: row.description,
      startsAt: row.startsAt,
      endsAt: row.endsAt,
      allDay: row.allDay ?? false,
      venueName: row.venueName ?? null,
      venueAddress: row.venueAddress ?? null,
      localityLabel: row.localityLabel ?? null,
      featured: row.featured ?? false,
      presentationKey: row.presentationKey ?? null,
      contentRef: row.contentRef ?? null,
      status: "scheduled",
      updatedAt: new Date(),
    })
    .where(and(eq(events.cityId, cityId), eq(events.slug, row.slug)));

  console.log("Refreshed event:", row.slug);
  return "updated";
}

/** Call at end of live event/job seed scripts to refresh sitemap + hubs. */
export async function finishListingSeedLive(options?: {
  jobSlug?: string;
  jobSeekerSlug?: string;
  eventSlug?: string;
  directoryType?: string;
  directorySlug?: string;
  label?: string;
}): Promise<void> {
  if (!isLiveSeed()) return;
  const { revalidateListingsAfterSeed } = await import(
    "./revalidate-listings-after-seed"
  );
  await revalidateListingsAfterSeed({
    jobSlug: options?.jobSlug,
    jobSeekerSlug: options?.jobSeekerSlug,
    eventSlug: options?.eventSlug,
    directoryType: options?.directoryType,
    directorySlug: options?.directorySlug,
    label: options?.label ?? "listing-seed",
  });
}

/**
 * Convert IST wall-clock to UTC `Date` for `starts_at` / `ends_at`.
 * Example: `istToUtcDate(2026, 6, 1, 18, 0)` → 1 Jun 2026 6:00 PM IST.
 */
export function istToUtcDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
): Date {
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+05:30`;
  return new Date(iso);
}
