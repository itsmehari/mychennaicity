import { describe, expect, it } from "vitest";
import { isJobPubliclyOpen, jobStatusForDeadline } from "./public-open";

const now = new Date("2026-09-12T12:00:00.000Z");

describe("isJobPubliclyOpen", () => {
  it("hides draft and closed rows", () => {
    expect(
      isJobPubliclyOpen({ status: "draft", validThrough: null }, now),
    ).toBe(false);
    expect(
      isJobPubliclyOpen({ status: "closed", validThrough: null }, now),
    ).toBe(false);
  });

  it("treats open rows with no deadline as public", () => {
    expect(
      isJobPubliclyOpen({ status: "open", validThrough: null }, now),
    ).toBe(true);
  });

  it("hides open rows past validThrough", () => {
    expect(
      isJobPubliclyOpen(
        { status: "open", validThrough: "2026-08-24T11:30:00.000Z" },
        now,
      ),
    ).toBe(false);
  });

  it("keeps open rows before validThrough", () => {
    expect(
      isJobPubliclyOpen(
        { status: "open", validThrough: "2026-12-01T00:00:00.000Z" },
        now,
      ),
    ).toBe(true);
  });
});

describe("jobStatusForDeadline", () => {
  it("closes when the deadline has passed", () => {
    expect(jobStatusForDeadline(new Date("2026-06-02T18:29:59.000Z"), now)).toBe(
      "closed",
    );
    expect(jobStatusForDeadline(new Date("2026-12-01T00:00:00.000Z"), now)).toBe(
      "open",
    );
  });
});
