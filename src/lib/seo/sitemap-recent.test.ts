import { describe, expect, it } from "vitest";
import { MYBANGALORE_COMMUNITY_PATH } from "@/content/community/mybangalore-whatsapp";
import { ADVERTISE_LISTING_PATHS } from "@/lib/routes/advertise-listings";
import { RECENT_LAUNCH_PATHS } from "./sitemap-recent";

describe("recent sitemap launches", () => {
  it("keeps 4–5 November 2026 public desks in the recrawl window", () => {
    const byPath = new Map(
      RECENT_LAUNCH_PATHS.map((entry) => [entry.path, entry.lastModified]),
    );

    expect(byPath.get(MYBANGALORE_COMMUNITY_PATH)).toBe("2026-11-04");
    for (const path of ADVERTISE_LISTING_PATHS) {
      expect(byPath.get(path)).toBe("2026-11-05");
    }
    expect(byPath.get("/madras-university-exam-timetable-2026")).toBe(
      "2026-11-05",
    );
    expect(byPath.get("/madras-university-exam-timetable-2026/bsc")).toBe(
      "2026-11-05",
    );
    expect(byPath.get("/madras-university-exam-timetable-2026/bca")).toBe(
      "2026-11-05",
    );
  });
});
