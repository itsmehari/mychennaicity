import { describe, expect, it } from "vitest";
import {
  bilingualJobSitemapLanguages,
  jobSlugLookupCandidates,
} from "./job-language";

const TA = "ஏசி-டெக்னீஷன்-ஹெல்பர்-50-காலியிடம்-மடிப்பாக்கம்-சென்னை";

describe("jobSlugLookupCandidates", () => {
  it("pairs a decoded Tamil slug with the stored percent-encoded form", () => {
    expect(jobSlugLookupCandidates(TA)).toEqual([TA, encodeURIComponent(TA)]);
  });

  it("pairs an encoded slug with the decoded Tamil form", () => {
    const encoded = encodeURIComponent(TA);
    expect(jobSlugLookupCandidates(encoded)).toEqual([encoded, TA]);
  });

  it("leaves an ASCII slug alone", () => {
    expect(
      jobSlugLookupCandidates(
        "ac-technician-helper-50-vacancies-madipakkam-chennai",
      ),
    ).toEqual(["ac-technician-helper-50-vacancies-madipakkam-chennai"]);
  });
});

describe("bilingualJobSitemapLanguages", () => {
  it("pairs the AC English and Tamil slugs", () => {
    const en = "ac-technician-helper-50-vacancies-madipakkam-chennai";
    const ta = encodeURIComponent(
      "ஏசி-டெக்னீஷன்-ஹெல்பர்-50-காலியிடம்-மடிப்பாக்கம்-சென்னை",
    );
    const known = new Set([en, ta]);
    const languages = bilingualJobSitemapLanguages(
      en,
      known,
      (slug) => `/chennai-jobs/${slug}`,
    );
    expect(languages).toEqual({
      en: `/chennai-jobs/${en}`,
      ta: `/chennai-jobs/${ta}`,
      "x-default": `/chennai-jobs/${en}`,
    });
  });

  it("omits hreflang when the Tamil twin is not published", () => {
    expect(
      bilingualJobSitemapLanguages(
        "warehouse-loading-picker-vanagaram-chennai",
        new Set(["warehouse-loading-picker-vanagaram-chennai"]),
        (slug) => `/chennai-jobs/${slug}`,
      ),
    ).toBeUndefined();
  });
});
