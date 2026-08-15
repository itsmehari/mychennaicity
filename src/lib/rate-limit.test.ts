import { describe, expect, it } from "vitest";
import { rateLimitConsume } from "./rate-limit";

describe("rateLimitConsume", () => {
  it("allows up to the limit then blocks in the same window", () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    expect(rateLimitConsume(key, 2, 60_000).ok).toBe(true);
    expect(rateLimitConsume(key, 2, 60_000).ok).toBe(true);
    expect(rateLimitConsume(key, 2, 60_000).ok).toBe(false);
  });
});
