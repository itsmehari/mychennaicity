import {
  countOpenClassifiedListingsForChennaiHub,
  listOpenClassifiedListingsForChennaiHub,
} from "@/domains/classifieds";
import {
  countDirectoryEntriesForChennaiHub,
  listDirectoryEntriesForChennaiHub,
} from "@/domains/directory";
import {
  countPublicEventsForChennaiHub,
  listPublicEventsForChennaiHub,
} from "@/domains/events";
import {
  countOpenJobPostingsForChennaiHub,
  listOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import { formatEventDateBadge } from "@/lib/events/event-hub-helpers";
import { directoryTypeLabel } from "@/lib/directory/type-labels";
import { countPublishedArticlesForChennai } from "@/lib/site-search";
import { classifiedCoverSrc } from "@/lib/classifieds/images";
import { formatClassifiedCategoryLabel } from "@/lib/classifieds/categories";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { loadFeaturedJobsRail } from "@/lib/jobs/featured-jobs";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { directoryDetailPath } from "@/lib/routes/directory";

export type HomeSpotlightJob = {
  title: string;
  company: string;
  location: string;
  href: string;
  external: boolean;
  featured?: boolean;
  openings?: number;
};

export type HomeSpotlightEvent = {
  title: string;
  when: string;
  where: string;
  href: string;
  external?: boolean;
};

export type HomeDirectoryTeaser = {
  title: string;
  subtitle: string;
  href: string;
};

export type HomeSpotlightClassified = {
  title: string;
  location: string;
  category: string;
  href: string;
  imageSrc: string | null;
  featured: boolean;
};

export type HomeLiveCounts = {
  jobs: number;
  events: number;
  articles: number;
  directory: number;
  classifieds: number;
};

export type HomeFeedData = {
  counts: HomeLiveCounts;
  jobs: HomeSpotlightJob[];
  events: HomeSpotlightEvent[];
  directory: HomeDirectoryTeaser[];
  classifieds: HomeSpotlightClassified[];
  hasLiveJobs: boolean;
  hasLiveEvents: boolean;
  hasLiveDirectory: boolean;
};

function venueLine(
  venueName: string | null | undefined,
  locality: string | null | undefined,
): string {
  const parts = [venueName?.trim(), locality?.trim()].filter(Boolean);
  return parts.length ? parts.join(", ") : "Chennai";
}

export async function loadHomeFeedData(): Promise<HomeFeedData> {
  const empty: HomeFeedData = {
    counts: { jobs: 0, events: 0, articles: 0, directory: 0, classifieds: 0 },
    jobs: [],
    events: [],
    directory: [],
    classifieds: [],
    hasLiveJobs: false,
    hasLiveEvents: false,
    hasLiveDirectory: false,
  };

  try {
    const [jobCount, eventCount, articleCount, directoryCount, classifiedCount] =
      await Promise.all([
        countOpenJobPostingsForChennaiHub(),
        countPublicEventsForChennaiHub(),
        countPublishedArticlesForChennai(),
        countDirectoryEntriesForChennaiHub(),
        countOpenClassifiedListingsForChennaiHub(),
      ]);

    const counts: HomeLiveCounts = {
      jobs: jobCount,
      events: eventCount,
      articles: articleCount,
      directory: directoryCount,
      classifieds: classifiedCount,
    };

    const [jobRows, featuredJobs, eventRows, directoryRows, classifiedRows] =
      await Promise.all([
      jobCount > 0 ? listOpenJobPostingsForChennaiHub(8, 0) : Promise.resolve([]),
      loadFeaturedJobsRail({ language: "en" }).catch(() => null),
      eventCount > 0 ? listPublicEventsForChennaiHub(40) : Promise.resolve([]),
      directoryCount > 0
        ? listDirectoryEntriesForChennaiHub(6)
        : Promise.resolve([]),
      classifiedCount > 0
        ? listOpenClassifiedListingsForChennaiHub(3, 0)
        : Promise.resolve([]),
    ]);

    const featuredSpotlight: HomeSpotlightJob[] = (featuredJobs?.cards ?? []).map(
      (card) => ({
        title: card.title,
        company: card.company,
        location: card.location,
        href: card.href,
        external: false,
        featured: true,
        openings: card.openings,
      }),
    );
    const featuredHrefs = new Set(featuredSpotlight.map((job) => job.href));
    const otherSpotlight: HomeSpotlightJob[] = jobRows
      .filter(({ job }) => !featuredHrefs.has(chennaiJobsDetailPath(job.slug)))
      .slice(0, Math.max(0, 4 - featuredSpotlight.length))
      .map(({ job, employer }) => ({
        title: job.title,
        company: employer.name,
        location: job.locationLabel?.trim() || "Chennai",
        href: chennaiJobsDetailPath(job.slug),
        external: false,
      }));
    const jobs: HomeSpotlightJob[] = [...featuredSpotlight, ...otherSpotlight].slice(
      0,
      4,
    );

    const sortedEvents = [...eventRows].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.startsAt.getTime() - b.startsAt.getTime();
    });

    const events: HomeSpotlightEvent[] = sortedEvents.slice(0, 4).map((ev) => ({
      title: ev.title,
      when: formatEventDateBadge(ev.startsAt),
      where: venueLine(ev.venueName, ev.localityLabel),
      href: `/chennai-local-events/${ev.slug}`,
    }));

    const directory: HomeDirectoryTeaser[] = directoryRows.slice(0, 3).map(
      (entry) => ({
        title: entry.name,
        subtitle: `${directoryTypeLabel(entry.type)} · ${entry.localityLabel?.trim() || "Chennai"}`,
        href: directoryDetailPath(entry.type, entry.slug),
      }),
    );

    const classifieds: HomeSpotlightClassified[] = classifiedRows.map((row) => ({
      title: row.title,
      location: row.locationLabel?.trim() || "Chennai",
      category: row.category
        ? formatClassifiedCategoryLabel(row.category)
        : "Classified",
      href: chennaiClassifiedDetailPath(row.slug),
      imageSrc: classifiedCoverSrc(row.imageUrls),
      featured: row.featured,
    }));

    return {
      counts,
      jobs,
      events,
      directory,
      classifieds,
      hasLiveJobs: jobs.length > 0,
      hasLiveEvents: events.length > 0,
      hasLiveDirectory: directory.length > 0,
    };
  } catch (err) {
    console.error("[home-feed] load failed:", err);
    return empty;
  }
}
