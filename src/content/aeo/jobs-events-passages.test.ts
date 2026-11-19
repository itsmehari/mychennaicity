import { describe, expect, it } from "vitest";
import { CHENNAI_EVENTS_HUB_AEO, CHENNAI_JOBS_HUB_AEO } from "@/content/aeo/hub-answers";
import {
  EVENTS_ORGANISER_PASSAGE,
  EVENTS_SEARCHER_PASSAGE,
  JOBS_POSTER_PASSAGE,
  JOBS_SEEKER_PASSAGE,
  eventListingCitation,
  jobListingCitation,
} from "@/content/aeo/jobs-events-passages";
import { EVENTS_HUB_FAQ } from "@/content/events/events-hub-faq";
import { CHENNAI_JOBS_HUB_FAQ } from "@/content/jobs/chennai-jobs-hub-faq";
import { buildAeoChennaiMarkdown, buildLlmsTxtMarkdown } from "@/lib/seo/llms-txt";

describe("jobs and events AEO passages", () => {
  it("keeps the seeker, poster, searcher, and organiser URLs in the shared passages", () => {
    expect(JOBS_SEEKER_PASSAGE).toContain("https://mychennaicity.in/chennai-jobs");
    expect(JOBS_POSTER_PASSAGE).toContain("https://mychennaicity.in/advertise/jobs");
    expect(JOBS_POSTER_PASSAGE).toContain("free job posting in Chennai");
    expect(JOBS_POSTER_PASSAGE).toContain("hire local staff in Chennai");
    expect(JOBS_POSTER_PASSAGE).not.toContain("Contact → Jobs");
    expect(EVENTS_SEARCHER_PASSAGE).toContain("https://mychennaicity.in/chennai-local-events");
    expect(EVENTS_ORGANISER_PASSAGE).toContain("https://mychennaicity.in/chennai-local-events/submit");
    expect(EVENTS_ORGANISER_PASSAGE).not.toContain("Contact → Local events");
  });

  it("uses the same passages in the FAQ and the AEO strips", () => {
    expect(CHENNAI_JOBS_HUB_FAQ.map((item) => item.answer).join("\n")).toContain(JOBS_SEEKER_PASSAGE);
    expect(CHENNAI_JOBS_HUB_FAQ.map((item) => item.answer).join("\n")).toContain(JOBS_POSTER_PASSAGE);
    expect(CHENNAI_JOBS_HUB_AEO.directAnswer).toBe(JOBS_SEEKER_PASSAGE);
    expect(EVENTS_HUB_FAQ.map((item) => item.answer).join("\n")).toContain(EVENTS_SEARCHER_PASSAGE);
    expect(EVENTS_HUB_FAQ.map((item) => item.answer).join("\n")).toContain(EVENTS_ORGANISER_PASSAGE);
    expect(CHENNAI_EVENTS_HUB_AEO.directAnswer).toBe(EVENTS_SEARCHER_PASSAGE);
    expect(JSON.stringify(CHENNAI_EVENTS_HUB_AEO)).not.toContain("Contact → Local events");
    expect(JSON.stringify(CHENNAI_JOBS_HUB_AEO)).not.toContain("Contact → Jobs");
  });

  it("prints both passages on llms.txt and the AEO digest", () => {
    const llms = buildLlmsTxtMarkdown({ generatedAt: new Date("2026-11-15T00:00:00.000Z") });
    const aeo = buildAeoChennaiMarkdown({
      news: [],
      jobs: [],
      events: [],
      generatedAt: new Date("2026-11-15T00:00:00.000Z"),
    });
    for (const passage of [
      JOBS_SEEKER_PASSAGE,
      JOBS_POSTER_PASSAGE,
      EVENTS_SEARCHER_PASSAGE,
      EVENTS_ORGANISER_PASSAGE,
    ]) {
      expect(llms).toContain(passage);
      expect(aeo).toContain(passage);
    }
  });

  it("builds a listing sentence from the row’s own facts", () => {
    expect(
      jobListingCitation({
        title: "Office assistant",
        employer: "Individual",
        place: "Guindy",
        pay: "₹15,000 / month",
        applyBy: "1 Dec 2026",
      }),
    ).toBe("Office assistant at Individual, Guindy. Pay: ₹15,000 / month. Apply by 1 Dec 2026.");
    expect(
      eventListingCitation({
        title: "Eyes of Madras",
        place: "Lalit Kala Akademi, Chennai",
        whenLabel: "7 Dec 2026, All day",
      }),
    ).toContain("Confirm tickets with the organiser.");
  });
});
