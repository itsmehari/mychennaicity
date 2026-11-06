import { describe, expect, it } from "vitest";
import type { CatalogItem } from "./super-admin-catalog";
import {
  compareJobViews,
  jobIsQuietOpen,
  matchesJobViewsStatus,
  paginateJobViews,
} from "./job-views";

function item(partial: Partial<CatalogItem> & { slug: string }): CatalogItem {
  return {
    kind: "job",
    kindLabel: "Job",
    title: partial.slug,
    status: "open",
    when: new Date("2026-11-01T00:00:00+05:30"),
    detail: "Guindy",
    href: `/chennai-jobs/${partial.slug}`,
    views: 0,
    views7d: 0,
    uniqueReaders: 0,
    callClicks: 0,
    whatsappClicks: 0,
    contactRequests: null,
    contactRequests7d: null,
    ...partial,
  };
}

describe("job views desk", () => {
  const now = new Date("2026-11-06T10:00:00+05:30");

  it("treats open-past-valid-through as expired, not open", () => {
    const expired = item({
      slug: "old",
      validThrough: new Date("2026-11-01T00:00:00+05:30"),
      uniqueReaders: 4,
    });
    expect(matchesJobViewsStatus(expired, "expired", now)).toBe(true);
    expect(matchesJobViewsStatus(expired, "open", now)).toBe(false);
  });

  it("flags quiet open roles with readers and no contact", () => {
    const quiet = item({ slug: "quiet", uniqueReaders: 12 });
    const noisy = item({ slug: "noisy", uniqueReaders: 12, callClicks: 1 });
    expect(jobIsQuietOpen(quiet, now)).toBe(true);
    expect(jobIsQuietOpen(noisy, now)).toBe(false);
    expect(compareJobViews(quiet, noisy, "quiet")).toBeLessThan(0);
  });

  it("pages forty rows and keeps worth-a-look from the whole desk", () => {
    const items = Array.from({ length: 45 }, (_, i) =>
      item({
        slug: `role-${i}`,
        uniqueReaders: i === 0 ? 20 : 0,
        views7d: i,
      }),
    );
    const page1 = paginateJobViews({
      items,
      query: "",
      status: "all",
      kind: "all",
      sort: "heat",
      pageRaw: "1",
      now,
    });
    expect(page1.items).toHaveLength(40);
    expect(page1.meta.matched).toBe(45);
    expect(page1.meta.pageCount).toBe(2);
    expect(page1.meta.worthQuiet[0]?.slug).toBe("role-0");
  });
});
