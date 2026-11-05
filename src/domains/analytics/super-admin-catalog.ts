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
import { formatClassifiedCategoryLabel } from "@/lib/classifieds/categories";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import {
  chennaiJobSeekerDetailPath,
  chennaiJobsDetailPath,
} from "@/lib/routes/chennai-jobs";
import { parseBannerClickSlug, partnerAdRoster, partnerPlacementLabel } from "@/lib/partner-ads";
import {
  emptyBannerClickTotals,
  emptyRollup,
  loadBannerClickStats,
  loadEngagementRollups,
  type BannerClickTotals,
  type BannerPartnerStat,
  type BannerSlugStat,
  type EngagementRollup,
} from "./content-engagement";

export type SuperAdminDesk =
  | "overview"
  | "news"
  | "jobs"
  | "events"
  | "classifieds"
  | "banners";

export type BannerPlacementRow = {
  partnerId: string;
  partner: string;
  placement: string;
  placementLabel: string;
  clicks: number;
  clicks7d: number;
  people: number;
};

export type BannerPartnerRow = {
  partnerId: string;
  partner: string;
  kicker: string;
  href: string;
  clicks: number;
  clicks7d: number;
  people: number;
};

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
  contactRequests7d: number | null;
};

export type SuperAdminTotals = {
  posts: number;
  views7d: number;
  callClicks7d: number;
  whatsappClicks7d: number;
  contactRequests: number;
  contactRequests7d: number;
};

export type SuperAdminSnapshot = {
  desk: SuperAdminDesk;
  query: string;
  items: CatalogItem[];
  hidden: number;
  totals: SuperAdminTotals;
  bannerPlacements: BannerPlacementRow[];
  bannerPartners: BannerPartnerRow[];
  bannerTotals: BannerClickTotals;
  analyticsReady: boolean;
  databaseError: string | null;
};

const DESKS = new Set<SuperAdminDesk>([
  "overview",
  "news",
  "jobs",
  "events",
  "classifieds",
  "banners",
]);

export function emptyTotals(): SuperAdminTotals {
  return {
    posts: 0,
    views7d: 0,
    callClicks7d: 0,
    whatsappClicks7d: 0,
    contactRequests: 0,
    contactRequests7d: 0,
  };
}

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

function wantsDesk(desk: SuperAdminDesk, group: SuperAdminDesk | "overview"): boolean {
  return desk === "overview" || desk === group;
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
    const banners = buildBannerDesk({ bySlug: [], byPartner: [] });
    return {
      desk: input.desk,
      query: input.query,
      items: [],
      hidden: 0,
      totals: emptyTotals(),
      bannerPlacements: banners.placements,
      bannerPartners: banners.partners,
      bannerTotals: emptyBannerClickTotals(),
      analyticsReady: false,
      databaseError: "Chennai is not in this database yet.",
    };
  }

  let rollups = new Map<string, EngagementRollup>();
  let bannerStats: {
    bySlug: BannerSlugStat[];
    byPartner: BannerPartnerStat[];
    totals: BannerClickTotals;
  } = { bySlug: [], byPartner: [], totals: emptyBannerClickTotals() };
  let analyticsReady = true;
  const desk = input.desk;
  const wantsBanners = desk === "overview" || desk === "banners";
  try {
    if (desk !== "banners") rollups = await loadEngagementRollups();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/content_engagement_events|does not exist/i.test(message)) {
      analyticsReady = false;
    } else {
      throw err;
    }
  }
  if (wantsBanners && analyticsReady) {
    try {
      bannerStats = await loadBannerClickStats();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/content_engagement_events|does not exist/i.test(message)) {
        analyticsReady = false;
      } else {
        throw err;
      }
    }
  }

  const none = Promise.resolve([]);
  const [news, jobs, seekers, eventRows, classifieds, legacyJobs, legacyEvents, reveals] =
    await Promise.all([
      wantsDesk(desk, "news")
        ? db
            .select({
              slug: articles.slug,
              title: articles.title,
              status: articles.status,
              publishedAt: articles.publishedAt,
              category: articles.category,
            })
            .from(articles)
            .where(eq(articles.cityId, cityId))
        : none,
      wantsDesk(desk, "jobs")
        ? db
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
            .where(eq(jobPostings.cityId, cityId))
        : none,
      wantsDesk(desk, "jobs")
        ? db
            .select({
              slug: jobSeekerPosts.slug,
              title: jobSeekerPosts.title,
              status: jobSeekerPosts.status,
              publishedAt: jobSeekerPosts.publishedAt,
              location: jobSeekerPosts.locationLabel,
            })
            .from(jobSeekerPosts)
            .where(eq(jobSeekerPosts.cityId, cityId))
        : none,
      wantsDesk(desk, "events")
        ? db
            .select({
              slug: events.slug,
              title: events.title,
              status: events.status,
              startsAt: events.startsAt,
              locality: events.localityLabel,
            })
            .from(events)
            .where(eq(events.cityId, cityId))
        : none,
      wantsDesk(desk, "classifieds")
        ? db
            .select({
              slug: classifiedListings.slug,
              title: classifiedListings.title,
              status: classifiedListings.status,
              publishedAt: classifiedListings.publishedAt,
              category: classifiedListings.category,
            })
            .from(classifiedListings)
            .where(eq(classifiedListings.cityId, cityId))
        : none,
      wantsDesk(desk, "jobs")
        ? db
            .select({
              slug: jobPostings.slug,
              readers: sql<number>`count(${jobPageViewers.id})::int`,
            })
            .from(jobPageViewers)
            .innerJoin(jobPostings, eq(jobPostings.id, jobPageViewers.jobId))
            .groupBy(jobPostings.slug)
        : none,
      wantsDesk(desk, "events")
        ? db
            .select({
              slug: events.slug,
              readers: sql<number>`count(${eventPageViewers.id})::int`,
            })
            .from(eventPageViewers)
            .innerJoin(events, eq(events.id, eventPageViewers.eventId))
            .groupBy(events.slug)
        : none,
      wantsDesk(desk, "classifieds")
        ? db
            .select({
              slug: classifiedListings.slug,
              requests: count(classifiedPhoneReveals.id),
              requests7d: sql<number>`count(${classifiedPhoneReveals.id}) filter (where ${classifiedPhoneReveals.createdAt} > now() - interval '7 days')::int`,
            })
            .from(classifiedListings)
            .leftJoin(
              classifiedPhoneReveals,
              eq(classifiedPhoneReveals.listingId, classifiedListings.id),
            )
            .where(eq(classifiedListings.cityId, cityId))
            .groupBy(classifiedListings.slug)
        : none,
    ]);

  const legacyJobReaders = new Map(
    (legacyJobs as { slug: string; readers: number }[]).map((row) => [row.slug, num(row.readers)]),
  );
  const legacyEventReaders = new Map(
    (legacyEvents as { slug: string; readers: number }[]).map((row) => [row.slug, num(row.readers)]),
  );
  const revealCounts = new Map(
    (reveals as { slug: string; requests: number; requests7d: number }[]).map((row) => [
      row.slug,
      { all: num(row.requests), d7: num(row.requests7d) },
    ]),
  );

  const items: CatalogItem[] = [
    ...(news as {
      slug: string;
      title: string;
      status: string;
      publishedAt: Date | null;
      category: string | null;
    }[]).map((row) => {
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
        contactRequests7d: null,
      };
    }),
    ...(jobs as {
      slug: string;
      title: string;
      status: string;
      publishedAt: Date | null;
      location: string | null;
      employer: string | null;
    }[]).map((row) => {
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
        contactRequests7d: null,
      };
    }),
    ...(seekers as {
      slug: string;
      title: string;
      status: string;
      publishedAt: Date | null;
      location: string | null;
    }[]).map((row) => {
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
        contactRequests7d: null,
      };
    }),
    ...(eventRows as {
      slug: string;
      title: string;
      status: string;
      startsAt: Date | null;
      locality: string | null;
    }[]).map((row) => {
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
        contactRequests7d: null,
      };
    }),
    ...(classifieds as {
      slug: string;
      title: string;
      status: string;
      publishedAt: Date | null;
      category: string | null;
    }[]).map((row) => {
      const stats = rollupFor(rollups, "classified", row.slug);
      const revealsFor = revealCounts.get(row.slug);
      return {
        kind: "classified" as const,
        kindLabel: "Classified",
        slug: row.slug,
        title: row.title,
        status: row.status,
        when: row.publishedAt,
        detail: row.category ? formatClassifiedCategoryLabel(row.category) : null,
        href: chennaiClassifiedDetailPath(row.slug),
        views: stats.views,
        views7d: stats.views7d,
        uniqueReaders: stats.uniqueViewers,
        callClicks: stats.callClicks,
        whatsappClicks: stats.whatsappClicks,
        contactRequests: revealsFor?.all ?? 0,
        contactRequests7d: revealsFor?.d7 ?? 0,
      };
    }),
  ];

  const deskItems = items.filter((item) => {
    if (desk === "news") return item.kind === "news";
    if (desk === "jobs") return item.kind === "job" || item.kind === "job_seeker";
    if (desk === "events") return item.kind === "event";
    if (desk === "classifieds") return item.kind === "classified";
    return true;
  });

  const totals = deskItems.reduce((sum, item) => {
    sum.posts += 1;
    sum.views7d += item.views7d;
    sum.callClicks7d += rollupFor(rollups, item.kind, item.slug).callClicks7d;
    sum.whatsappClicks7d += rollupFor(rollups, item.kind, item.slug).whatsappClicks7d;
    sum.contactRequests += item.contactRequests ?? 0;
    sum.contactRequests7d += item.contactRequests7d ?? 0;
    return sum;
  }, emptyTotals());

  const needle = input.query.trim().toLowerCase();
  const matched = needle
    ? deskItems.filter((item) =>
        `${item.title} ${item.slug} ${item.detail ?? ""}`.toLowerCase().includes(needle),
      )
    : deskItems;
  matched.sort((a, b) => {
    const aHeat =
      a.views7d + (a.contactRequests7d ?? 0) + a.callClicks + a.whatsappClicks;
    const bHeat =
      b.views7d + (b.contactRequests7d ?? 0) + b.callClicks + b.whatsappClicks;
    if (bHeat !== aHeat) return bHeat - aHeat;
    if ((b.contactRequests ?? 0) !== (a.contactRequests ?? 0)) {
      return (b.contactRequests ?? 0) - (a.contactRequests ?? 0);
    }
    if (b.uniqueReaders !== a.uniqueReaders) return b.uniqueReaders - a.uniqueReaders;
    if (b.views !== a.views) return b.views - a.views;
    return (b.when?.getTime() ?? 0) - (a.when?.getTime() ?? 0);
  });

  const builtBanners = buildBannerDesk(bannerStats);
  const bannerNeedle = desk === "banners" ? needle : "";
  const bannerMatched = bannerNeedle
    ? builtBanners.placements.filter((row) =>
        `${row.partner} ${row.placement} ${row.placementLabel}`.toLowerCase().includes(bannerNeedle),
      )
    : builtBanners.placements;
  const limit = desk === "overview" ? 12 : 400;
  const bannerLimit = 400;
  return {
    desk,
    query: input.query,
    items: desk === "banners" ? [] : matched.slice(0, limit),
    hidden:
      desk === "banners"
        ? Math.max(0, bannerMatched.length - bannerLimit)
        : Math.max(0, matched.length - limit),
    totals,
    bannerPlacements:
      desk === "banners" ? bannerMatched.slice(0, bannerLimit) : builtBanners.placements,
    bannerPartners: builtBanners.partners,
    bannerTotals: bannerStats.totals,
    analyticsReady,
    databaseError: null,
  };
}

export function buildBannerDesk(stats: {
  bySlug: BannerSlugStat[];
  byPartner: BannerPartnerStat[];
}): { placements: BannerPlacementRow[]; partners: BannerPartnerRow[] } {
  const roster = partnerAdRoster();
  const byId = new Map(roster.map((partner) => [partner.id, partner]));
  const placements: BannerPlacementRow[] = [];
  for (const row of stats.bySlug) {
    const parsed = parseBannerClickSlug(row.slug);
    const partner = parsed ? byId.get(parsed.partnerId) : undefined;
    if (!parsed || !partner) continue;
    placements.push({
      partnerId: partner.id,
      partner: partner.partner,
      placement: parsed.placement,
      placementLabel: partnerPlacementLabel(parsed.placement),
      clicks: row.clicks,
      clicks7d: row.clicks7d,
      people: row.people,
    });
  }
  const seen = new Set(placements.map((row) => row.partnerId));
  for (const partner of roster) {
    if (seen.has(partner.id)) continue;
    placements.push({
      partnerId: partner.id,
      partner: partner.partner,
      placement: "",
      placementLabel: "No clicks yet",
      clicks: 0,
      clicks7d: 0,
      people: 0,
    });
  }
  placements.sort(
    (a, b) =>
      b.clicks - a.clicks ||
      b.clicks7d - a.clicks7d ||
      a.partner.localeCompare(b.partner) ||
      a.placementLabel.localeCompare(b.placementLabel),
  );

  const partnerStats = new Map(stats.byPartner.map((row) => [row.partnerId, row]));
  const partners = roster
    .map((partner) => {
      const stat = partnerStats.get(partner.id);
      return {
        partnerId: partner.id,
        partner: partner.partner,
        kicker: partner.kicker,
        href: partner.url,
        clicks: stat?.clicks ?? 0,
        clicks7d: stat?.clicks7d ?? 0,
        people: stat?.people ?? 0,
      };
    })
    .sort(
      (a, b) =>
        b.clicks7d - a.clicks7d || b.clicks - a.clicks || a.partner.localeCompare(b.partner),
    );
  return { placements, partners };
}

export async function loadBannerPartner(partnerId: string): Promise<{
  item: CatalogItem;
  placements: BannerPlacementRow[];
} | null> {
  const partner = partnerAdRoster().find((row) => row.id === partnerId);
  if (!partner) return null;
  let stats: {
    bySlug: BannerSlugStat[];
    byPartner: BannerPartnerStat[];
    totals: BannerClickTotals;
  } = { bySlug: [], byPartner: [], totals: emptyBannerClickTotals() };
  try {
    stats = await loadBannerClickStats();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!/content_engagement_events|does not exist/i.test(message)) throw err;
  }
  const built = buildBannerDesk(stats);
  const summary = built.partners.find((row) => row.partnerId === partnerId);
  return {
    item: {
      kind: "banner",
      kindLabel: "Banner ad",
      slug: partner.id,
      title: partner.partner,
      status: "live",
      when: null,
      detail: partner.kicker,
      href: partner.url,
      views: summary?.clicks ?? 0,
      views7d: summary?.clicks7d ?? 0,
      uniqueReaders: summary?.people ?? 0,
      callClicks: 0,
      whatsappClicks: 0,
      contactRequests: null,
      contactRequests7d: null,
    },
    placements: built.placements.filter((row) => row.partnerId === partnerId && row.placement),
  };
}

export async function loadTrackedPost(
  kind: ContentKind,
  slug: string,
): Promise<CatalogItem | null> {
  if (kind === "banner") return null;
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
