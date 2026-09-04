import { describe, expect, it } from "vitest";
import { EDUCATION_SITEMAP_ENTRIES } from "@/content/education/index";
import { getHseGroup, HSE_GROUPS, hseExamList } from "@/content/education/hse-groups";

describe("HSE groups", () => {
  it("documents six current codes", () => {
    expect(HSE_GROUPS.map((g) => g.code)).toEqual([
      "2502",
      "2503",
      "2702",
      "2708",
      "2804",
      "2802",
    ]);
  });

  it("lists six examination papers per group", () => {
    for (const group of HSE_GROUPS) {
      expect(group.cores).toHaveLength(4);
      expect(hseExamList(group)).toHaveLength(6);
    }
  });

  it("looks up by code", () => {
    expect(getHseGroup("2502")?.nameEn).toMatch(/Computer Science/);
    expect(getHseGroup("9999")).toBeUndefined();
  });
});

describe("education sitemap", () => {
  it("ships Wave A routes only", () => {
    expect(EDUCATION_SITEMAP_ENTRIES).toHaveLength(10);
    expect(EDUCATION_SITEMAP_ENTRIES.map((e) => e.path)).toContain(
      "/guides/tn-plus-two",
    );
    expect(EDUCATION_SITEMAP_ENTRIES.map((e) => e.path)).not.toContain(
      "/plus-two-textbooks-pdf",
    );
  });
});
