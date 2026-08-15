import { describe, expect, it } from "vitest";
import { AUTO_FARE_OFFICIAL_2013, autoFareInr } from "./auto-fare";

describe("autoFareInr", () => {
  it("charges only the flag under the flag distance", () => {
    expect(autoFareInr(1, AUTO_FARE_OFFICIAL_2013)).toBe(25);
  });

  it("adds per-km after 1.8 km on the 2013 meter", () => {
    expect(autoFareInr(2.8, AUTO_FARE_OFFICIAL_2013)).toBe(37);
  });
});
