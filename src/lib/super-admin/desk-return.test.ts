import { describe, expect, it } from "vitest";
import { deskHref, deskPage, safeDeskReturn, withDeskFlag } from "./desk-return";

describe("desk return", () => {
  it("keeps only the named desk page", () => {
    expect(safeDeskReturn("/super-admin/events", "/super-admin/events?status=draft&q=marina")).toBe(
      "/super-admin/events?status=draft&q=marina",
    );
    expect(safeDeskReturn("/super-admin/events", "https://evil.example/super-admin/events")).toBe(
      "/super-admin/events",
    );
    expect(safeDeskReturn("/super-admin/events", "/super-admin/jobs")).toBe("/super-admin/events");
  });

  it("replaces the previous notice", () => {
    expect(
      withDeskFlag("/super-admin/articles", "/super-admin/articles?status=draft&error=save", "notice", "published"),
    ).toBe("/super-admin/articles?status=draft&notice=published");
  });

  it("builds a lookup href and clamps the page", () => {
    expect(deskHref("/super-admin/jobs", { status: "open", q: "electrician", page: 2 })).toBe(
      "/super-admin/jobs?status=open&q=electrician&page=2",
    );
    expect(deskPage("3", 2)).toBe(2);
    expect(deskPage("0", 4)).toBe(1);
  });
});
