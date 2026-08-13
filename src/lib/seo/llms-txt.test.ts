import { describe, expect, it } from "vitest";
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
    expect(md).toContain("https://mychennaicity.in/chennai-local-events");
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
  });
});
