import { describe, expect, it } from "vitest";
import type { JobPostingWithEmployer } from "@/domains/jobs";
import { buildJobPostingJsonLd, jobPostalAddress } from "./job-posting-jsonld";

function sample(patch: {
  slug?: string;
  remotePolicy?: string;
  schemaEligible?: boolean;
  salaryDisclosed?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryUnit?: string | null;
}): JobPostingWithEmployer {
  const posted = new Date("2026-11-01T04:30:00.000Z");
  return {
    job: {
      title: "Billing Staff",
      body: "Handle counter billing.",
      slug: patch.slug ?? "billing-staff-guindy",
      publishedAt: posted,
      createdAt: posted,
      validThrough: null,
      locationLabel: "Guindy, Chennai",
      employmentType: "FULL_TIME",
      applicationUrl: null,
      salaryDisclosed: patch.salaryDisclosed ?? false,
      salaryMin: patch.salaryMin ?? null,
      salaryMax: patch.salaryMax ?? null,
      salaryUnit: patch.salaryUnit ?? null,
      remotePolicy: patch.remotePolicy ?? "onsite",
      schemaEligible: patch.schemaEligible ?? true,
    },
    employer: { name: "Example Stores", websiteUrl: null },
  } as JobPostingWithEmployer;
}

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
    expect(
      jobPostalAddress(
        "9, Chelliamman Koil Street, Keelkattalai 600117, Chennai",
      ),
    ).toMatchObject({
      streetAddress: "9, Chelliamman Koil Street, Keelkattalai",
      postalCode: "600117",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    });
  });

  it("marks a remote row and skips a multi-role poster", () => {
    const remote = buildJobPostingJsonLd(sample({ remotePolicy: "remote" }));
    expect(remote?.jobLocationType).toBe("TELECOMMUTE");
    expect(remote?.hiringOrganization).toMatchObject({ name: "Example Stores" });
    expect(remote?.baseSalary).toBeUndefined();
    expect(
      buildJobPostingJsonLd(
        sample({ slug: "pre-opening-team-cafe-chennai", schemaEligible: true }),
      ),
    ).toBeNull();
  });

  it("uses a stored monthly unit above the old threshold", () => {
    const paid = buildJobPostingJsonLd(
      sample({
        salaryDisclosed: true,
        salaryMin: 150000,
        salaryMax: 180000,
        salaryUnit: "MONTH",
      }),
    );
    expect(paid?.baseSalary).toMatchObject({
      currency: "INR",
      value: { unitText: "MONTH", minValue: 150000, maxValue: 180000 },
    });
  });
});
