import { afterEach, describe, expect, it } from "vitest";
import { readSuperAdminSession, signSuperAdminSession } from "./session";

describe("super admin session", () => {
  const previous = process.env.AUTH_SECRET;

  afterEach(() => {
    if (previous === undefined) delete process.env.AUTH_SECRET;
    else process.env.AUTH_SECRET = previous;
  });

  it("round-trips a signed cookie and rejects a tampered one", () => {
    process.env.AUTH_SECRET = "test-secret";
    const token = signSuperAdminSession("owner@example.com", 1_700_000_000_000);
    expect(token).toBeTruthy();
    expect(readSuperAdminSession(token, 1_700_000_000_000)?.email).toBe("owner@example.com");
    expect(readSuperAdminSession(`${token}x`, 1_700_000_000_000)).toBeNull();
  });

  it("returns null when the server has no signing secret", () => {
    delete process.env.AUTH_SECRET;
    delete process.env.SUPER_ADMIN_SESSION_SECRET;
    expect(signSuperAdminSession("owner@example.com")).toBeNull();
  });
});
