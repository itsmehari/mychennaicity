import { describe, expect, it } from "vitest";
import {
  activeFeaturedJobCampaigns,
  isActiveFeaturedJobSlug,
  pageHidesFeaturedJobsCatchAll,
} from "./featured-job-campaigns";

const AC = "ac-technician-helper-50-vacancies-madipakkam-chennai";
const HR = "hr-recruiter-10-vacancies-sembakkam-chennai";

describe("featured job campaigns", () => {
  it("keeps the VV Placement roles live on 23 Oct and through 12 Nov 2026 IST", () => {
    const start = new Date("2026-10-23T04:00:00.000Z");
    const lastEvening = new Date("2026-11-12T18:29:00.000Z");
    expect(activeFeaturedJobCampaigns(start).map((c) => c.englishSlug)).toEqual([
      AC,
      HR,
    ]);
    expect(activeFeaturedJobCampaigns(lastEvening)).toHaveLength(2);
    expect(isActiveFeaturedJobSlug(AC, start)).toBe(true);
  });

  it("drops the campaign on 13 Nov 2026 IST", () => {
    const after = new Date("2026-11-12T18:30:00.000Z");
    expect(activeFeaturedJobCampaigns(after)).toEqual([]);
    expect(isActiveFeaturedJobSlug(HR, after)).toBe(false);
  });

  it("hides the footer band where a page already features the roles", () => {
    expect(pageHidesFeaturedJobsCatchAll("/")).toBe(true);
    expect(pageHidesFeaturedJobsCatchAll("/chennai-jobs")).toBe(true);
    expect(
      pageHidesFeaturedJobsCatchAll(
        "/chennai-jobs/ac-technician-helper-50-vacancies-madipakkam-chennai",
      ),
    ).toBe(true);
    expect(pageHidesFeaturedJobsCatchAll("/chennai-local-news")).toBe(true);
    expect(
      pageHidesFeaturedJobsCatchAll("/chennai-local-news/some-story"),
    ).toBe(true);
    expect(pageHidesFeaturedJobsCatchAll("/privacy")).toBe(true);
    expect(pageHidesFeaturedJobsCatchAll("/chennai-local-news/topic/chennai")).toBe(
      false,
    );
    expect(pageHidesFeaturedJobsCatchAll("/chennai-map")).toBe(false);
    expect(pageHidesFeaturedJobsCatchAll("/areas/ambattur-annanagar")).toBe(
      false,
    );
  });
});
