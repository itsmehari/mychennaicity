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

  it("registers sitemap entries for all waves", () => {
    expect(GOVERNMENT_SITEMAP_ENTRIES.length).toBeGreaterThan(70);
    expect(GOVERNMENT_SITEMAP_ENTRIES.some((e) => e.path === "/guides/tn-council-of-ministers")).toBe(true);
    expect(GOVERNMENT_SITEMAP_ENTRIES.some((e) => e.path.includes("/ministers/c-joseph-vijay"))).toBe(true);
  });
});
