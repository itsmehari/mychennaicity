import { describe, expect, it } from "vitest";
import {
  cellState,
  checkerResult,
  disruptionIcs,
  journeyAdvice,
  kolkataTodayIso,
  tonightRows,
} from "./beach-tambaram-guindy-cancellations-2026";

describe("Beach–Tambaram Guindy cancellation list", () => {
  it("cancels 11:59 Beach–Tambaram from 26 September through 3 October only", () => {
    expect(cellState("beach-2359", "2026-09-26")).toBe("cancelled");
    expect(cellState("beach-2359", "2026-09-27")).toBe("cancelled");
    expect(cellState("beach-2359", "2026-10-03")).toBe("cancelled");
    expect(cellState("beach-2359", "2026-10-04")).toBe("na");
  });

  it("keeps 8:45 Tambaram–Beach off the list on 27 September", () => {
    expect(cellState("tambaram-2045", "2026-09-26")).toBe("cancelled");
    expect(cellState("tambaram-2045", "2026-09-27")).toBe("not-listed");
    expect(cellState("tambaram-2045", "2026-09-28")).toBe("cancelled");
    expect(cellState("tambaram-2045", "2026-10-03")).toBe("cancelled");
    expect(cellState("tambaram-2045", "2026-10-04")).toBe("na");
  });

  it("cancels 11:40 Tambaram–Beach on 27 September only", () => {
    expect(cellState("tambaram-2340", "2026-09-26")).toBe("na");
    expect(cellState("tambaram-2340", "2026-09-27")).toBe("cancelled");
    expect(cellState("tambaram-2340", "2026-09-28")).toBe("na");
  });

  it("uses today-language on 27 September for the two cancelled trains", () => {
    const late = checkerResult("beach-2359", "2026-09-27", "2026-09-27");
    const mid = checkerResult("tambaram-2340", "2026-09-27", "2026-09-27");
    const early = checkerResult("tambaram-2045", "2026-09-27", "2026-09-27");
    expect(late.title).toBe("Cancelled today");
    expect(late.detail).toContain("11:59 p.m. Chennai Beach → Tambaram");
    expect(mid.title).toBe("Cancelled today");
    expect(early.title).toBe("Not listed as cancelled today");
    expect(early.detail).toContain("8:45 p.m. Tambaram → Chennai Beach");
  });

  it("names both Sunday cancellations in the tonight strip", () => {
    const tonight = tonightRows("2026-09-27");
    expect(tonight.heading).toContain("Sunday");
    expect(tonight.rows.map((row) => [row.id, row.state])).toEqual([
      ["tambaram-2045", "not-listed"],
      ["tambaram-2340", "cancelled"],
      ["beach-2359", "cancelled"],
    ]);
  });

  it("changes the tonight strip on 28 September", () => {
    const tonight = tonightRows("2026-09-28");
    expect(tonight.rows.find((row) => row.id === "tambaram-2045")?.state).toBe(
      "cancelled",
    );
    expect(tonight.rows.find((row) => row.id === "tambaram-2340")?.state).toBe(
      "na",
    );
  });

  it("warns a late Guindy–Tambaram trip about the 11:59 cancellation", () => {
    const text = journeyAdvice({
      fromId: "guindy",
      toId: "tambaram",
      time: "23:30",
      isoDate: "2026-09-27",
    });
    expect(text).toContain("11:59 p.m.");
    expect(text).toContain("cancelled");
    expect(text).toContain("Guindy");
  });

  it("does not treat a morning trip as one of the listed cancellations", () => {
    const text = journeyAdvice({
      fromId: "beach",
      toId: "tambaram",
      time: "08:15",
      isoDate: "2026-09-27",
    });
    expect(text).toContain("outside the three listed cancellations");
  });

  it("builds a reminder file only for a cancelled departure", () => {
    const file = disruptionIcs("beach-2359", "2026-09-27");
    expect(file).toContain("BEGIN:VCALENDAR");
    expect(file).toContain("TRIGGER:-PT75M");
    expect(file).toContain("11:59 p.m. Chennai Beach–Tambaram");
    expect(disruptionIcs("tambaram-2045", "2026-09-27")).toBeNull();
  });

  it("reads the India calendar date, not UTC", () => {
    expect(kolkataTodayIso(new Date("2026-09-26T19:30:00.000Z"))).toBe(
      "2026-09-27",
    );
  });
});
