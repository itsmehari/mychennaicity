import { describe, expect, it } from "vitest";
import { hashAdminPassword, matchAdminLogin, verifyAdminPassword } from "./admin-password";

describe("admin password", () => {
  it("matches only the original password", async () => {
    const stored = await hashAdminPassword("correct horse battery");
    expect(await verifyAdminPassword("correct horse battery", stored)).toBe(true);
    expect(await verifyAdminPassword("wrong horse battery", stored)).toBe(false);
    expect(await verifyAdminPassword("correct horse battery", "not-a-hash")).toBe(false);
  });

  it("accepts the env admin and rejects a different password", async () => {
    const previousEmail = process.env.ADMIN_EMAIL;
    const previousHash = process.env.ADMIN_PASSWORD_HASH;
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD_HASH = await hashAdminPassword("sample-pass-99");
    await expect(matchAdminLogin("Admin@Example.com", "sample-pass-99")).resolves.toMatchObject({
      email: "admin@example.com",
      role: "admin",
    });
    await expect(matchAdminLogin("admin@example.com", "wrong-pass-99")).resolves.toBeNull();
    if (previousEmail === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previousEmail;
    if (previousHash === undefined) delete process.env.ADMIN_PASSWORD_HASH;
    else process.env.ADMIN_PASSWORD_HASH = previousHash;
  });
});
