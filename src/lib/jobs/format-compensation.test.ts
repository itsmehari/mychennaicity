import { describe, expect, it } from "vitest";
import {
  formatJobCompensation,
  isMonthlyJobSalary,
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
});
