import { describe, expect, it } from "vitest";
import { getMinister, MINISTER_COUNT, MINISTER_SLUGS } from "@/content/government/ministers-may-2026";
import { GOVERNMENT_SITEMAP_ENTRIES } from "@/content/government/index";

describe("TN Council of Ministers desk data", () => {
  it("has 35 ministers with unique slugs", () => {
    expect(MINISTER_COUNT).toBe(35);
    expect(new Set(MINISTER_SLUGS).size).toBe(35);
  });

  it("resolves minister by slug", () => {
    expect(getMinister("c-joseph-vijay")?.ministryTitle).toBe("Chief Minister");
    expect(getMinister("n-marie-wilson")?.ministryTitle).toContain("Finance");
  });

  it("registers sitemap entries for hubs and IAS (minister pages stay off sitemap)", () => {
    expect(GOVERNMENT_SITEMAP_ENTRIES.some((e) => e.path.includes("/ministers/"))).toBe(false);
    expect(GOVERNMENT_SITEMAP_ENTRIES.some((e) => e.path.endsWith("/ias-leadership"))).toBe(true);
    expect(GOVERNMENT_SITEMAP_ENTRIES).toHaveLength(10);
    expect(GOVERNMENT_SITEMAP_ENTRIES.some((e) => e.path === "/guides/tn-council-of-ministers")).toBe(true);
  });

  it("has a Chennai relevance paragraph on every minister", () => {
    for (const slug of MINISTER_SLUGS) {
      const row = getMinister(slug);
      expect(row?.chennaiRelevance?.trim().length).toBeGreaterThan(40);
    }
  });
});
