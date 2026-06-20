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
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { directoryDetailPath } from "@/lib/routes/directory";

export type HomeSpotlightJob = {
  title: string;
  company: string;
  location: string;
  href: string;
  external: boolean;
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

export type HomeLiveCounts = {
  jobs: number;
  events: number;
  articles: number;
  directory: number;
};

export type HomeFeedData = {
  counts: HomeLiveCounts;
  jobs: HomeSpotlightJob[];
  events: HomeSpotlightEvent[];
  directory: HomeDirectoryTeaser[];
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
    counts: { jobs: 0, events: 0, articles: 0, directory: 0 },
    jobs: [],
    events: [],
    directory: [],
    hasLiveJobs: false,
    hasLiveEvents: false,
    hasLiveDirectory: false,
  };

  try {
    const [jobCount, eventCount, articleCount, directoryCount] =
      await Promise.all([
        countOpenJobPostingsForChennaiHub(),
        countPublicEventsForChennaiHub(),
        countPublishedArticlesForChennai(),
        countDirectoryEntriesForChennaiHub(),
      ]);

    const counts: HomeLiveCounts = {
      jobs: jobCount,
      events: eventCount,
      articles: articleCount,
      directory: directoryCount,
    };

    const [jobRows, eventRows, directoryRows] = await Promise.all([
      jobCount > 0 ? listOpenJobPostingsForChennaiHub(4, 0) : Promise.resolve([]),
      eventCount > 0 ? listPublicEventsForChennaiHub(40) : Promise.resolve([]),
      directoryCount > 0
        ? listDirectoryEntriesForChennaiHub(6)
        : Promise.resolve([]),
    ]);

    const jobs: HomeSpotlightJob[] = jobRows.map(({ job, employer }) => ({
      title: job.title,
      company: employer.name,
      location: job.locationLabel?.trim() || "Chennai",
      href: chennaiJobsDetailPath(job.slug),
      external: false,
    }));

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

    return {
      counts,
      jobs,
      events,
      directory,
      hasLiveJobs: jobs.length > 0,
      hasLiveEvents: events.length > 0,
      hasLiveDirectory: directory.length > 0,
    };
  } catch (err) {
    console.error("[home-feed] load failed:", err);
    return empty;
  }
}
