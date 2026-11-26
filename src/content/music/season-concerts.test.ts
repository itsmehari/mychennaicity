import { describe, expect, it } from "vitest";
import {
  listSeasonSlots,
  seasonConcertPath,
  seasonEventDescription,
  SEASON_SERIES,
} from "@/content/music/season-concerts";

describe("printed music season sheets", () => {
  it("keeps 63 unique concert slugs and skips the two artist-sheet rows", () => {
    const rows = listSeasonSlots();
    expect(rows).toHaveLength(63);
    const slugs = rows.map(({ slot }) => slot.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
    expect(rows.filter(({ slot }) => !slot.seed).map(({ slot }) => slot.slug)).toEqual([
      "ramana-balachandran-vani-mahal-december-2026",
      "jayanthi-kumaresh-strings-attached-vani-mahal-january-2027",
    ]);
    expect(seasonConcertPath(slugs[0])).toBe(
      `/chennai-local-events/${slugs[0]}`,
    );
  });

  it("leaves the Vani Mahal last cell in December 2026", () => {
    const dummies = listSeasonSlots().find(
      ({ slot }) => slot.slug === "dummies-drama-kaanal-neero-vani-mahal-17-dec-2026",
    );
    expect(dummies?.slot.iso).toBe("2026-12-17");
    expect(dummies?.slot.printedDate).toBe("17th Dec. 2026");
    const text = seasonEventDescription(dummies!.series, dummies!.slot);
    expect(text).toContain("17th Dec. 2026");
    expect(text).not.toContain("http");
  });

  it("prints free entry only for Margazhi Maha Utsavam", () => {
    expect(SEASON_SERIES.find((series) => series.freeEntry)?.id).toBe(
      "margazhi-maha-utsavam",
    );
    expect(SEASON_SERIES.filter((series) => series.freeEntry)).toHaveLength(1);
  });
});
