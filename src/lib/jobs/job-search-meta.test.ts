import { describe, expect, it } from "vitest";
import {
  jobSearchDescription,
  jobSearchTitleSegment,
} from "./job-search-meta";

describe("jobSearchTitleSegment", () => {
  it("keeps the AC and HR headlines intact", () => {
    expect(
      jobSearchTitleSegment(
        "AC Technician and Helper · 50 vacancies · Madipakkam, Chennai",
      ),
    ).toBe("AC Technician and Helper · 50 vacancies · Madipakkam, Chennai");
    expect(
      jobSearchTitleSegment(
        "HR Recruiter · 10 vacancies · Sembakkam, Chennai",
      ),
    ).toBe("HR Recruiter · 10 vacancies · Sembakkam, Chennai");
    expect(
      jobSearchTitleSegment(
        "ஏசி டெக்னீஷன் மற்றும் ஹெல்பர் · 50 காலியிடம் · மடிப்பாக்கம், சென்னை",
      ),
    ).toBe(
      "ஏசி டெக்னீஷன் மற்றும் ஹெல்பர் · 50 காலியிடம் · மடிப்பாக்கம், சென்னை",
    );
    expect(
      jobSearchTitleSegment(
        "எச்ஆர் ரெக்ரூட்டர் · 10 காலியிடம் · செம்பாக்கம், சென்னை",
      ),
    ).toBe("எச்ஆர் ரெக்ரூட்டர் · 10 காலியிடம் · செம்பாக்கம், சென்னை");
  });
});

describe("jobSearchDescription", () => {
  it("uses the opening paragraph and stays within the snippet length", () => {
    const desc = jobSearchDescription({
      title: "AC Technician and Helper · 50 vacancies · Madipakkam, Chennai",
      employerName: "VV Placement Services",
      locationLabel: "Madipakkam, Chennai",
      body: `
**50 vacancies** for **AC technician** and **helper** in **Madipakkam, Chennai** — **VV Placement Services**. Salary **₹15,000–₹30,000** a month, with **room and food**. Call or WhatsApp **91767 97745**.

## Role at a glance
`,
    });
    expect(desc.startsWith("50 vacancies for AC technician and helper")).toBe(
      true,
    );
    expect(desc).toContain("Madipakkam");
    expect(desc.length).toBeLessThanOrEqual(158);
    expect(desc).not.toContain("**");
    expect(desc).not.toContain("Role at a glance");
  });
});
