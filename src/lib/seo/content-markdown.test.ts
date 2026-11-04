import { describe, expect, it } from "vitest";
import {
  buildEventMarkdown,
  buildJobMarkdown,
  buildNewsMarkdown,
  markdownTwinPath,
  prefersMarkdown,
} from "./content-markdown";

describe("content markdown twins", () => {
  it("maps public detail paths and skips hubs", () => {
    expect(markdownTwinPath("/chennai-jobs/office-assistant")).toBe(
      "/chennai-jobs/office-assistant/markdown",
    );
    expect(markdownTwinPath("/chennai-jobs/looking-for-work")).toBeNull();
    expect(markdownTwinPath("/chennai-jobs/looking-for-work/watchman")).toBe(
      "/chennai-jobs/looking-for-work/watchman/markdown",
    );
    expect(markdownTwinPath("/chennai-local-events/submit")).toBeNull();
    expect(markdownTwinPath("/chennai-local-events/fair")).toBe(
      "/chennai-local-events/fair/markdown",
    );
    expect(markdownTwinPath("/chennai-local-news/feed.xml")).toBeNull();
    expect(markdownTwinPath("/chennai-jobs/office-assistant/markdown")).toBeNull();
    expect(
      markdownTwinPath("/community/mybangalore-whatsapp-community"),
    ).toBe("/community/mybangalore-whatsapp-community/markdown");
  });

  it("serves Markdown only when it outranks HTML", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/html,application/xhtml+xml")).toBe(false);
    expect(prefersMarkdown("text/markdown, text/html;q=0.8")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown;q=0.9")).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
  });

  it("builds a job page with facts and the listing body", () => {
    const md = buildJobMarkdown({
      title: "Office assistant",
      canonical: "https://mychennaicity.in/chennai-jobs/office-assistant",
      markdownUrl: "https://mychennaicity.in/chennai-jobs/office-assistant/markdown",
      employer: "Individual employer",
      location: "Guindy",
      pay: "₹15,000 / month",
      applyBy: "1 Dec 2026",
      applyUrl: "https://wa.me/919999999999",
      body: "See the [flyer](/images/listings/flyer.jpg).",
      origin: "https://mychennaicity.in",
    });
    expect(md.startsWith("# Office assistant")).toBe(true);
    expect(md).toContain("₹15,000 / month");
    expect(md).toContain("Apply by: 1 Dec 2026");
    expect(md).toContain("https://mychennaicity.in/images/listings/flyer.jpg");
    expect(md).toContain("https://wa.me/919999999999");
  });

  it("builds an event page in the supplied when-line", () => {
    const md = buildEventMarkdown({
      title: "Vibrant Hues",
      canonical: "https://mychennaicity.in/chennai-local-events/vibrant-hues",
      markdownUrl: "https://mychennaicity.in/chennai-local-events/vibrant-hues/markdown",
      when: "31 Oct 2026, 11:00 am – 7 Nov 2026, 6:00 pm IST",
      venue: "Art Cube Gallery",
      locality: "Virugambakkam",
      description: "Paintings and sculptures.",
      origin: "https://mychennaicity.in",
    });
    expect(md).toContain("Art Cube Gallery");
    expect(md).toContain("Paintings and sculptures.");
  });

  it("builds a news page with the named source", () => {
    const md = buildNewsMarkdown({
      title: "Reservoirs at 39%",
      canonical: "https://mychennaicity.in/chennai-local-news/reservoirs",
      markdownUrl: "https://mychennaicity.in/chennai-local-news/reservoirs/markdown",
      published: "29 Sep 2026",
      sourceName: "CMWSSB",
      sourceUrl: "https://cmwssb.tn.gov.in/example",
      summary: "Five lakes at 38.9%.",
      report: "On 29 September the board published the table.",
      origin: "https://mychennaicity.in",
    });
    expect(md).toContain("CMWSSB (https://cmwssb.tn.gov.in/example)");
    expect(md).toContain("Five lakes at 38.9%.");
    expect(md).toContain("On 29 September the board published the table.");
  });
});
