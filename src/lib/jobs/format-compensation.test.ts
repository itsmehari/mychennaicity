import { describe, expect, it } from "vitest";
import {
  formatJobCompensation,
  isMonthlyJobSalary,
  salaryUnitText,
} from "./format-compensation";

describe("formatJobCompensation", () => {
  it("formats security-style monthly bands", () => {
    expect(isMonthlyJobSalary(22_000, 30_000)).toBe(true);
    expect(formatJobCompensation(22_000, 30_000)).toBe(
      "₹22,000 – ₹30,000 / month",
    );
  });

  it("formats tech-style annual LPA", () => {
    expect(isMonthlyJobSalary(480_000, 720_000)).toBe(false);
    expect(formatJobCompensation(480_000, 720_000)).toBe("₹4.8 – ₹7.2 LPA");
  });

  it("lets a stored unit override the threshold", () => {
    expect(salaryUnitText(150_000, 180_000, "MONTH")).toBe("MONTH");
    expect(formatJobCompensation(150_000, 180_000, "MONTH")).toContain("/ month");
    expect(salaryUnitText(22_000, 30_000, null)).toBe("MONTH");
  });
});
