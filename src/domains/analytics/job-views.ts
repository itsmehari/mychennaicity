import { isJobPubliclyOpen } from "@/domains/jobs/public-open";
import { DESK_PAGE_SIZE, deskPage } from "@/lib/super-admin/desk-return";
import type { CatalogItem } from "./super-admin-catalog";

export const JOB_VIEWS_STATUSES = ["all", "open", "closed", "draft", "expired"] as const;
export const JOB_VIEWS_KINDS = ["all", "job", "job_seeker"] as const;
export const JOB_VIEWS_SORTS = [
  "heat",
  "readers",
  "calls",
  "whatsapp",
  "newest",
  "quiet",
] as const;

export type JobViewsStatus = (typeof JOB_VIEWS_STATUSES)[number];
export type JobViewsKind = (typeof JOB_VIEWS_KINDS)[number];
export type JobViewsSort = (typeof JOB_VIEWS_SORTS)[number];

export type JobViewsDeskMeta = {
  status: JobViewsStatus;
  kind: JobViewsKind;
  sort: JobViewsSort;
  page: number;
  pageCount: number;
  matched: number;
  counts: Record<JobViewsStatus | JobViewsKind, number>;
  openRoles: number;
  quietOpen: number;
  expiredOpen: number;
  readers: number;
  contactClicks: number;
  worthQuiet: CatalogItem[];
  worthExpired: CatalogItem[];
};

export function emptyJobViewsMeta(): JobViewsDeskMeta {
  return {
    status: "all",
    kind: "all",
    sort: "heat",
    page: 1,
    pageCount: 1,
    matched: 0,
    counts: {
      all: 0,
      open: 0,
      closed: 0,
      draft: 0,
      expired: 0,
      job: 0,
      job_seeker: 0,
    },
    openRoles: 0,
    quietOpen: 0,
    expiredOpen: 0,
    readers: 0,
    contactClicks: 0,
    worthQuiet: [],
    worthExpired: [],
  };
}

export function parseJobViewsStatus(value: string | undefined): JobViewsStatus {
  return JOB_VIEWS_STATUSES.includes(value as JobViewsStatus)
    ? (value as JobViewsStatus)
    : "all";
}

export function parseJobViewsKind(value: string | undefined): JobViewsKind {
  return JOB_VIEWS_KINDS.includes(value as JobViewsKind) ? (value as JobViewsKind) : "all";
}

export function parseJobViewsSort(value: string | undefined): JobViewsSort {
  return JOB_VIEWS_SORTS.includes(value as JobViewsSort) ? (value as JobViewsSort) : "heat";
}

export function jobIsExpiredOpen(item: CatalogItem, now = new Date()): boolean {
  return (
    item.kind === "job" &&
    item.status === "open" &&
    !isJobPubliclyOpen({ status: item.status, validThrough: item.validThrough ?? null }, now)
  );
}

export function jobIsQuietOpen(item: CatalogItem, now = new Date()): boolean {
  return (
    item.status === "open" &&
    !jobIsExpiredOpen(item, now) &&
    item.uniqueReaders > 0 &&
    item.callClicks === 0 &&
    item.whatsappClicks === 0 &&
    (item.contactRequests ?? 0) === 0
  );
}

function heat(item: CatalogItem): number {
  return item.views7d + (item.contactRequests7d ?? 0) + item.callClicks + item.whatsappClicks;
}

export function compareJobViews(a: CatalogItem, b: CatalogItem, sort: JobViewsSort): number {
  if (sort === "readers" && b.uniqueReaders !== a.uniqueReaders) {
    return b.uniqueReaders - a.uniqueReaders;
  }
  if (sort === "calls" && b.callClicks !== a.callClicks) return b.callClicks - a.callClicks;
  if (sort === "whatsapp" && b.whatsappClicks !== a.whatsappClicks) {
    return b.whatsappClicks - a.whatsappClicks;
  }
  if (sort === "newest") return (b.when?.getTime() ?? 0) - (a.when?.getTime() ?? 0);
  if (sort === "quiet") {
    const quiet = Number(jobIsQuietOpen(b)) - Number(jobIsQuietOpen(a));
    if (quiet) return quiet;
    if (b.uniqueReaders !== a.uniqueReaders) return b.uniqueReaders - a.uniqueReaders;
  }
  const heatDelta = heat(b) - heat(a);
  if (heatDelta) return heatDelta;
  if ((b.contactRequests ?? 0) !== (a.contactRequests ?? 0)) {
    return (b.contactRequests ?? 0) - (a.contactRequests ?? 0);
  }
  if (b.uniqueReaders !== a.uniqueReaders) return b.uniqueReaders - a.uniqueReaders;
  if (b.views !== a.views) return b.views - a.views;
  return (b.when?.getTime() ?? 0) - (a.when?.getTime() ?? 0);
}

export function matchesJobViewsStatus(
  item: CatalogItem,
  status: JobViewsStatus,
  now = new Date(),
): boolean {
  if (status === "all") return true;
  if (status === "expired") return jobIsExpiredOpen(item, now);
  if (status === "open") return item.status === "open" && !jobIsExpiredOpen(item, now);
  return item.status === status;
}

export function paginateJobViews(input: {
  items: CatalogItem[];
  query: string;
  status: JobViewsStatus;
  kind: JobViewsKind;
  sort: JobViewsSort;
  pageRaw?: string;
  unpaged?: boolean;
  now?: Date;
}): { items: CatalogItem[]; meta: JobViewsDeskMeta; hidden: number } {
  const now = input.now ?? new Date();
  const status = input.status;
  const kind = input.kind;
  const sort = input.sort;
  const counts: JobViewsDeskMeta["counts"] = {
    all: input.items.length,
    open: 0,
    closed: 0,
    draft: 0,
    expired: 0,
    job: 0,
    job_seeker: 0,
  };
  let openRoles = 0;
  let quietOpen = 0;
  let expiredOpen = 0;
  let readers = 0;
  let contactClicks = 0;
  const worthQuiet: CatalogItem[] = [];
  const worthExpired: CatalogItem[] = [];

  for (const item of input.items) {
    readers += item.uniqueReaders;
    contactClicks += item.callClicks + item.whatsappClicks + (item.contactRequests ?? 0);
    if (item.kind === "job") counts.job += 1;
    if (item.kind === "job_seeker") counts.job_seeker += 1;
    if (jobIsExpiredOpen(item, now)) {
      counts.expired += 1;
      expiredOpen += 1;
      worthExpired.push(item);
    } else if (item.status === "open") {
      counts.open += 1;
      openRoles += 1;
      if (jobIsQuietOpen(item, now)) {
        quietOpen += 1;
        worthQuiet.push(item);
      }
    } else if (item.status === "closed") counts.closed += 1;
    else if (item.status === "draft") counts.draft += 1;
  }

  worthQuiet.sort((a, b) => b.uniqueReaders - a.uniqueReaders || heat(b) - heat(a));
  worthExpired.sort((a, b) => (b.when?.getTime() ?? 0) - (a.when?.getTime() ?? 0));

  const needle = input.query.trim().toLowerCase();
  const matched = input.items
    .filter((item) => (kind === "all" ? true : item.kind === kind))
    .filter((item) => matchesJobViewsStatus(item, status, now))
    .filter((item) =>
      needle
        ? `${item.title} ${item.slug} ${item.detail ?? ""}`.toLowerCase().includes(needle)
        : true,
    );
  matched.sort((a, b) => compareJobViews(a, b, sort));

  const pageCount = Math.max(1, Math.ceil(matched.length / DESK_PAGE_SIZE));
  const page = input.unpaged ? 1 : deskPage(input.pageRaw, pageCount);
  const items = input.unpaged
    ? matched
    : matched.slice((page - 1) * DESK_PAGE_SIZE, page * DESK_PAGE_SIZE);

  return {
    items,
    hidden: input.unpaged ? 0 : Math.max(0, matched.length - items.length),
    meta: {
      status,
      kind,
      sort,
      page,
      pageCount,
      matched: matched.length,
      counts,
      openRoles,
      quietOpen,
      expiredOpen,
      readers,
      contactClicks,
      worthQuiet: worthQuiet.slice(0, 5),
      worthExpired: worthExpired.slice(0, 5),
    },
  };
}
