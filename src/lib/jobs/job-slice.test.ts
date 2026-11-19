import { describe, expect, it } from "vitest";
import { jobMatchesCategory } from "@/content/jobs/job-categories";
import { textMatchesLocality, jobLocalityBySlug } from "@/content/jobs/job-localities";
import { classifyJobAvailability } from "@/lib/jobs/job-availability";
import { jobPostingSchemaEligible } from "@/lib/jobs/job-schema-eligibility";
import { jobSliceIsIndexable } from "@/lib/jobs/job-slice";

describe("job slice gate", () => {
  it("indexes only when openings and employers both clear the bar", () => {
    expect(jobSliceIsIndexable(5, 3)).toBe(true);
    expect(jobSliceIsIndexable(8, 2)).toBe(false);
    expect(jobSliceIsIndexable(2, 2)).toBe(false);
  });

  it("matches a locality token and a category word", () => {
    const omr = jobLocalityBySlug("omr");
    expect(omr).toBeTruthy();
    expect(textMatchesLocality(omr!, "Perungudi, Chennai")).toBe(true);
    expect(textMatchesLocality(omr!, "T. Nagar")).toBe(false);
    expect(
      jobMatchesCategory("drivers", {
        title: "Car driver",
        body: "School route",
        employmentType: null,
      }),
    ).toBe(true);
    expect(
      jobMatchesCategory("it", {
        title: "Office assistant",
        body: "Front desk",
        employmentType: "FULL_TIME",
      }),
    ).toBe(false);
  });
});

describe("job availability", () => {
  const now = new Date("2026-11-19T10:00:00.000Z");

  it("keeps a live row open and marks a published closed row gone", () => {
    expect(
      classifyJobAvailability(
        { status: "open", validThrough: null, publishedAt: now },
        now,
      ),
    ).toBe("open");
    expect(
      classifyJobAvailability(
        { status: "closed", validThrough: null, publishedAt: now },
        now,
      ),
    ).toBe("gone");
    expect(
      classifyJobAvailability(
        { status: "draft", validThrough: null, publishedAt: null },
        now,
      ),
    ).toBe("missing");
  });
});

describe("job schema eligibility", () => {
  it("drops multi-role posters and rows an editor turned off", () => {
    expect(jobPostingSchemaEligible({ slug: "billing-staff", schemaEligible: true })).toBe(
      true,
    );
    expect(
      jobPostingSchemaEligible({
        slug: "pre-opening-team-cafe-chennai",
        schemaEligible: true,
      }),
    ).toBe(false);
    expect(jobPostingSchemaEligible({ slug: "billing-staff", schemaEligible: false })).toBe(
      false,
    );
  });
});
