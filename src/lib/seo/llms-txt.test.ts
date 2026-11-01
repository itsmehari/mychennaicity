import { describe, expect, it } from "vitest";
import { listingSnippet, redactListingContacts } from "./llms-live-catalog";
import {
  buildAeoChennaiMarkdown,
  buildLlmsFullMarkdown,
  buildLlmsTxtMarkdown,
} from "./llms-txt";

describe("llms.txt builders", () => {
  it("emits H1, blockquote, and absolute hub links", () => {
    const md = buildLlmsTxtMarkdown({
      generatedAt: new Date("2026-08-08T00:00:00.000Z"),
    });
    expect(md.startsWith("# mychennaicity.in\n")).toBe(true);
    expect(md).toContain("> Chennai-first local news");
    expect(md).toContain("https://mychennaicity.in/chennai-local-news");
    expect(md).toContain("https://mychennaicity.in/chennai-jobs");
    expect(md).toContain("https://mychennaicity.in/chennai-jobs/looking-for-work");
    expect(md).toContain("https://mychennaicity.in/chennai-local-events");
    expect(md).not.toContain("# Live Chennai jobs and events");
    expect(md).toContain("https://mychennaicity.in/guides/tn-plus-two/textbooks");
    expect(md).toContain("/llms-full.txt");
  });

  it("includes recent digests in llms-full", () => {
    const md = buildLlmsFullMarkdown({
      news: [
        {
          title: "Sample civic story",
          url: "/chennai-local-news/sample",
          summary: "A short summary",
        },
      ],
      jobs: [],
      events: [],
      generatedAt: new Date("2026-08-08T00:00:00.000Z"),
    });
    expect(md).toContain("Sample civic story");
    expect(md).toContain("https://mychennaicity.in/chennai-local-news/sample");
    expect(md).toContain("## Open Chennai jobs");
    expect(md).toContain("## Upcoming Chennai events");
  });

  it("lists live jobs and events on llms.txt", () => {
    const md = buildLlmsTxtMarkdown({
      generatedAt: new Date("2026-11-01T00:00:00.000Z"),
      catalog: {
        jobs: [
          {
            title: "Office assistant — Guindy",
            url: "/chennai-jobs/male-office-assistant-guindy-race-course",
            plainTextUrl: "/chennai-jobs/male-office-assistant-guindy-race-course/markdown",
            summary: "Individual employer · Guindy · ₹15,000 / month",
            date: "1 Nov 2026",
          },
        ],
        seekers: [
          {
            title: "Watchman available in Porur",
            url: "/chennai-jobs/looking-for-work/watchman-porur",
            summary: "Watchman · Porur · Immediate",
          },
        ],
        events: [
          {
            title: "Vibrant Hues at Art Cube Gallery",
            url: "/chennai-local-events/vibrant-hues-art-cube-gallery-virugambakkam-november-2026",
            summary: "Art Cube Gallery · Virugambakkam",
            date: "31 Oct 2026, 11:00 am – 7 Nov 2026, 6:00 pm IST",
          },
        ],
        jobsOmitted: 2,
      },
    });
    expect(md).toContain(
      "https://mychennaicity.in/chennai-jobs/male-office-assistant-guindy-race-course",
    );
    expect(md).toContain(
      "Plain text: https://mychennaicity.in/chennai-jobs/male-office-assistant-guindy-race-course/markdown",
    );
    expect(md).toContain("₹15,000 / month");
    expect(md).toContain("https://mychennaicity.in/chennai-jobs/looking-for-work/watchman-porur");
    expect(md).toContain(
      "https://mychennaicity.in/chennai-local-events/vibrant-hues-art-cube-gallery-virugambakkam-november-2026",
    );
    expect(md).toContain("2 more rows are on the hub");
  });

  it("strips phone numbers and emails from catalog snippets", () => {
    expect(redactListingContacts("Call 76710 65348 or write jobs@example.com today.")).toBe(
      "Call or write today.",
    );
    expect(listingSnippet("![Flyer](https://mychennaicity.in/a.jpg) Hiring in Navalur.")).toBe(
      "Hiring in Navalur.",
    );
  });

  it("builds answer-first AEO digest", () => {
    const md = buildAeoChennaiMarkdown({
      news: [],
      jobs: [{ title: "Office manager", url: "/chennai-jobs/office-manager" }],
      events: [],
    });
    expect(md).toContain("# Chennai AEO digest");
    expect(md).toContain("Office manager");
    expect(md).toContain("Where is Chennai news today?");
    expect(md).toContain("/chennai-today");
    expect(md).toContain("/guides/chennai-afford-area-calculator");
    expect(md).toContain("/guides/which-chennai-are-you");
    expect(md).toContain("/guides/chennai-auto-fare");
    expect(md).toContain("/civic-tools/power-feeder-desk");
    expect(md).toContain("/guides/tn-plus-two");
    expect(md).toContain("/guides/tn-plus-two/textbooks");
    expect(md).toContain("Who is looking for work in Chennai?");
  });
});
