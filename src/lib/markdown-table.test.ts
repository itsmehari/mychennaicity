import { describe, expect, it } from "vitest";
import {
  expandCollapsedMarkdownTable,
  isMarkdownTableBlock,
  parseMarkdownTableBlock,
} from "./markdown-table";

const COLLAPSED = `| Officer | From | To | |---------|------|-----| | **P. Akash** | Nagapattinam | **Madurai** |`;

describe("expandCollapsedMarkdownTable", () => {
  it("expands single-line pipe tables", () => {
    const out = expandCollapsedMarkdownTable(COLLAPSED);
    expect(out.split("\n").length).toBeGreaterThanOrEqual(3);
    expect(isMarkdownTableBlock(out)).toBe(true);
  });

  it("leaves multiline tables unchanged", () => {
    const multi = `| A | B |\n|---|---|\n| 1 | 2 |`;
    expect(expandCollapsedMarkdownTable(multi)).toBe(multi);
  });
});

describe("parseMarkdownTableBlock", () => {
  it("parses collapsed tables into headers and rows", () => {
    const { headers, rows } = parseMarkdownTableBlock(COLLAPSED);
    expect(headers).toEqual(["Officer", "From", "To"]);
    expect(rows.length).toBe(1);
    expect(rows[0]?.[0]).toContain("Akash");
  });
});
