import { describe, expect, it } from "vitest";
import { buildBannerDesk } from "@/domains/analytics/super-admin-catalog";

describe("buildBannerDesk", () => {
  it("keeps every partner and splits clicks by placement", () => {
    const desk = buildBannerDesk({
      bySlug: [
        { slug: "mycovai--site_band", clicks: 4, clicks7d: 1, people: 2 },
        { slug: "mycovai--home_after_areas", clicks: 1, clicks7d: 1, people: 1 },
      ],
      byPartner: [{ partnerId: "mycovai", clicks: 5, clicks7d: 2, people: 3 }],
    });

    expect(desk.partners).toHaveLength(5);
    expect(desk.partners[0]).toMatchObject({ partnerId: "mycovai", clicks: 5, people: 3 });
    expect(desk.placements.filter((row) => row.partnerId === "mycovai").map((row) => row.placementLabel)).toEqual([
      "Site-wide band",
      "Home",
    ]);
    expect(desk.placements.find((row) => row.partnerId === "resumedoctor")?.placementLabel).toBe(
      "No clicks yet",
    );
  });
});
