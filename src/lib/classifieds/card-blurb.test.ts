import { describe, expect, it } from "vitest";
import { classifiedCardBlurb } from "./card-blurb";

describe("classifiedCardBlurb", () => {
  it("skips headings and keeps the first sentences", () => {
    const body = `## Urgent requirement

A buyer is looking to **purchase** an independent house.

### Preferred locations
- **OMR**, Chennai
- Vandalur–Kelambakkam Road`;
    expect(classifiedCardBlurb(body)).toBe(
      "A buyer is looking to purchase an independent house.",
    );
  });
});
