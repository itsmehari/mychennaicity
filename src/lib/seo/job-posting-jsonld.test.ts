import { describe, expect, it } from "vitest";
import { jobPostalAddress } from "./job-posting-jsonld";

describe("jobPostalAddress", () => {
  it("keeps Chennai as the city and the neighbourhood as the street", () => {
    expect(jobPostalAddress("Madipakkam, Chennai")).toMatchObject({
      addressLocality: "Chennai",
      streetAddress: "Madipakkam",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    });
    expect(jobPostalAddress("செம்பாக்கம், சென்னை")).toMatchObject({
      addressLocality: "Chennai",
      streetAddress: "செம்பாக்கம்",
    });
  });
});
