import { describe, expect, it } from "vitest";
import {
  activeFeaturedJobCampaigns,
  isActiveFeaturedJobSlug,
  pageHidesFeaturedJobsCatchAll,
} from "./featured-job-campaigns";

const CAST =
  "male-models-south-style-casting-studio-ponneri-minjur-thiruvallur-chennai";
const OFFICE = "male-office-assistant-guindy-race-course";
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
    expect(activeFeaturedJobCampaigns(lastEvening).map((c) => c.englishSlug)).toEqual([
      OFFICE,
      AC,
      HR,
    ]);
    expect(isActiveFeaturedJobSlug(AC, start)).toBe(true);
    expect(isActiveFeaturedJobSlug(OFFICE, start)).toBe(false);
    expect(isActiveFeaturedJobSlug(OFFICE, lastEvening)).toBe(true);
  });

  it("drops the VV Placement roles on 13 Nov 2026 IST and keeps Guindy through 1 Dec", () => {
    const afterVv = new Date("2026-11-12T18:30:00.000Z");
    const lastGuindyEvening = new Date("2026-12-01T18:29:00.000Z");
    const afterGuindy = new Date("2026-12-01T18:30:00.000Z");
    expect(activeFeaturedJobCampaigns(afterVv).map((c) => c.englishSlug)).toEqual([
      CAST,
      OFFICE,
    ]);
    expect(isActiveFeaturedJobSlug(HR, afterVv)).toBe(false);
    expect(isActiveFeaturedJobSlug(CAST, afterVv)).toBe(true);
    expect(isActiveFeaturedJobSlug(OFFICE, lastGuindyEvening)).toBe(true);
    expect(activeFeaturedJobCampaigns(afterGuindy).map((c) => c.englishSlug)).toEqual([
      CAST,
    ]);
    expect(isActiveFeaturedJobSlug(OFFICE, afterGuindy)).toBe(false);
    expect(isActiveFeaturedJobSlug(CAST, afterGuindy)).toBe(true);
  });

  it("drops the casting studio pin on 14 Dec 2026 IST", () => {
    const lastEvening = new Date("2026-12-13T18:29:00.000Z");
    const nextMorning = new Date("2026-12-13T18:30:00.000Z");
    expect(isActiveFeaturedJobSlug(CAST, lastEvening)).toBe(true);
    expect(activeFeaturedJobCampaigns(nextMorning)).toEqual([]);
    expect(isActiveFeaturedJobSlug(CAST, nextMorning)).toBe(false);
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
