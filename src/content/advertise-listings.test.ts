import { describe, expect, it } from "vitest";
import { propertyAdPackage, propertyPackageSentence } from "./advertise-listings";

describe("property ad package copy", () => {
  it("does not invent a rupee amount while the package is unset", () => {
    expect(propertyAdPackage.feeInr).toBeNull();
    expect(propertyPackageSentence("en")).not.toMatch(/₹\d/);
    expect(propertyPackageSentence("ta")).not.toMatch(/₹\d/);
  });
});
