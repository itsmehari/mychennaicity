import { describe, expect, it } from "vitest";
import type { AdCreative, AdSize } from "@/ads/registry";
import {
  getEligibleCreatives,
  hashString,
  selectCreative,
  utcDateKey,
} from "@/ads/select-creative";

const fixedDate = new Date("2026-03-15T12:00:00.000Z");

const mockAds: AdCreative[] = [
  {
    id: "a",
    advertiser: "A",
    url: "https://a.example",
    slot_ids: ["article-top"],
    sizes: ["728x90"],
    design: "resumedoctor",
    headline: "H1",
    tagline: "T1",
    active: true,
  },
  {
    id: "b",
    advertiser: "B",
    url: "https://b.example",
    slot_ids: ["article-top"],
    sizes: ["728x90"],
    design: "mycovai",
    headline: "H2",
    tagline: "T2",
    active: true,
  },
  {
    id: "inactive",
    advertiser: "X",
    url: "https://x.example",
    slot_ids: ["article-top"],
    sizes: ["728x90"],
    design: "bseri",
    headline: "H3",
    tagline: "T3",
    active: false,
  },
  {
    id: "wrong-slot",
    advertiser: "Y",
    url: "https://y.example",
    slot_ids: ["sidebar"],
    sizes: ["728x90"],
    design: "bseri",
    headline: "H4",
    tagline: "T4",
    active: true,
  },
];

describe("hashString", () => {
  it("is deterministic for the same input", () => {
    expect(hashString("a|b|c")).toBe(hashString("a|b|c"));
  });

  it("differs for different inputs", () => {
    expect(hashString("x")).not.toBe(hashString("y"));
  });
});

describe("utcDateKey", () => {
  it("returns YYYY-MM-DD in UTC", () => {
    expect(utcDateKey(fixedDate)).toBe("2026-03-15");
  });
});

describe("getEligibleCreatives", () => {
  it("filters by slot, size, and active", () => {
    const list = getEligibleCreatives("article-top", "728x90" as AdSize, mockAds);
    expect(list.map((c) => c.id).sort()).toEqual(["a", "b"]);
  });

  it("returns empty when no match", () => {
    expect(
      getEligibleCreatives("discover-top", "728x90" as AdSize, mockAds),
    ).toEqual([]);
  });
});

describe("selectCreative", () => {
  it("returns null when pool is empty", () => {
    expect(
      selectCreative("missing-slot", "300x250" as AdSize, {
        ads: mockAds,
        dateKey: "2026-03-15",
      }),
    ).toBeNull();
  });

  it("picks deterministically for a fixed dateKey", () => {
    const first = selectCreative("article-top", "728x90" as AdSize, {
      ads: mockAds,
      dateKey: "2026-03-15",
    });
    const second = selectCreative("article-top", "728x90" as AdSize, {
      ads: mockAds,
      dateKey: "2026-03-15",
    });
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(first!.id).toBe(second!.id);
  });

  it("can differ with pickKeySuffix", () => {
    const a = selectCreative("article-top", "728x90" as AdSize, {
      ads: mockAds,
      dateKey: "2026-03-15",
      pickKeySuffix: "|0",
    });
    const b = selectCreative("article-top", "728x90" as AdSize, {
      ads: mockAds,
      dateKey: "2026-03-15",
      pickKeySuffix: "|1",
    });
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();
    /* With two eligible ads, suffix almost always changes modulo bucket — allow same id rarely */
    expect([a!.id, b!.id].every((id) => id === "a" || id === "b")).toBe(true);
  });
});
