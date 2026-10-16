import { describe, expect, it } from "vitest";
import { extractJobBenefits, extractJobFaqs } from "./job-faq";

describe("extractJobFaqs", () => {
  it("reads English and Tamil question blocks", () => {
    const body = `
Intro.

## Common questions

### What is the pay?
₹15,000 to ₹30,000 a month.

## How to apply

Call.
`.trim();
    expect(extractJobFaqs(body)).toEqual([
      { question: "What is the pay?", answer: "₹15,000 to ₹30,000 a month." },
    ]);

    const tamil = `
## பொதுவான கேள்விகள்

### சம்பளம் என்ன?
மாதம் ₹15,000 முதல் ₹30,000 வரை.
`.trim();
    expect(extractJobFaqs(tamil)[0]?.question).toBe("சம்பளம் என்ன?");
  });
});

describe("extractJobBenefits", () => {
  it("reads the benefits bullet", () => {
    expect(
      extractJobBenefits("- **Benefits:** Room and food"),
    ).toBe("Room and food");
  });
});
