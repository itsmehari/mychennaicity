import { describe, expect, it } from "vitest";
import { isInternalMeasurementPath } from "./measurement-paths";

describe("isInternalMeasurementPath", () => {
  it("matches the desk and its subpages", () => {
    expect(isInternalMeasurementPath("/super-admin")).toBe(true);
    expect(isInternalMeasurementPath("/super-admin/")).toBe(true);
    expect(isInternalMeasurementPath("/super-admin/jobs")).toBe(true);
    expect(isInternalMeasurementPath("/super-admin?desk=jobs")).toBe(true);
    expect(
      isInternalMeasurementPath("https://mychennaicity.in/super-admin/whatsapp-join-requests"),
    ).toBe(true);
  });

  it("matches the redirected admin URLs", () => {
    expect(isInternalMeasurementPath("/admin")).toBe(true);
    expect(isInternalMeasurementPath("/admin/jobs")).toBe(true);
    expect(isInternalMeasurementPath("/login")).toBe(true);
  });

  it("leaves public pages alone", () => {
    expect(isInternalMeasurementPath("/")).toBe(false);
    expect(isInternalMeasurementPath("/chennai-local-news")).toBe(false);
    expect(isInternalMeasurementPath("/guides/super-admin-tools")).toBe(false);
    expect(isInternalMeasurementPath("")).toBe(false);
    expect(isInternalMeasurementPath(null)).toBe(false);
  });
});
