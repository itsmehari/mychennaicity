import { describe, expect, it } from "vitest";
import {
  EXAM_DATES,
  EXAM_PAPERS,
  EXAM_PROGRAMMES,
  examPaperAnswer,
  examPapersByCode,
  examPapersMatching,
  examProgrammeBySlug,
  examSitemapEntries,
} from "./madras-university-nov-2026";

describe("Madras University November 2026 timetable", () => {
  it("keeps the checked Zoology paper from the official PDF", () => {
    const rows = examPapersByCode("343C5A");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      date: "2026-11-12",
      session: "FN",
      subject: "Evolutionary Biology",
      programmeSlug: "zoology",
      batch: "2023-24",
      semester: 5,
    });
    expect(examPaperAnswer(rows[0]!)).toContain("12 November 2026");
    expect(examPaperAnswer(rows[0]!)).toContain("10:00 AM");
    expect(examPapersMatching("343C5A")).toHaveLength(1);
    expect(examPapersMatching("e")).toHaveLength(0);
  });

  it("does not invent the unreadable Financial Accounting I code", () => {
    const row = EXAM_PAPERS.find(
      (paper) => paper.subject === "Financial Accounting I" && paper.flagged,
    );
    expect(row).toMatchObject({ date: "2026-12-10", session: "FN", code: "" });
  });

  it("publishes a page per programme and exam date, plus the hub and B.Sc. overview", () => {
    expect(EXAM_PROGRAMMES.length).toBeGreaterThan(20);
    expect(examProgrammeBySlug("bca")?.degree).toBe("bca");
    expect(examProgrammeBySlug("computer-science")).toBeTruthy();
    const paths = examSitemapEntries().map((entry) => entry.path);
    expect(paths).toContain("/madras-university-exam-timetable-2026");
    expect(paths).toContain("/madras-university-exam-timetable-2026/bsc");
    expect(paths).toContain("/madras-university-exam-timetable-2026/bca");
    expect(paths).toContain("/madras-university-exam-timetable-2026/computer-science");
    expect(paths).toContain(`/madras-university-exam-timetable-2026/on/${EXAM_DATES[0]}`);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
