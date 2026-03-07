// src/lib/fetch/__tests__/retry.test.ts
import { shouldRetry, getRetryDelay, sleep } from "../retry";

describe("shouldRetry", () => {
  // Test case: 5xx status codes NÊN retry
  it("should return true for 500", () => {
    expect(shouldRetry(500)).toBe(true);
  });

  it("should return true for 502, 503, 504", () => {
    expect(shouldRetry(502)).toBe(true);
    expect(shouldRetry(503)).toBe(true);
    expect(shouldRetry(504)).toBe(true);
  });

  // AC-04: KHÔNG retry 4xx
  it("should return false for 400", () => {
    expect(shouldRetry(400)).toBe(false);
  });

  it("should return false for 401, 403, 404", () => {
    expect(shouldRetry(401)).toBe(false);
    expect(shouldRetry(403)).toBe(false);
    expect(shouldRetry(404)).toBe(false);
  });

  it("should return false for 200 (success)", () => {
    expect(shouldRetry(200)).toBe(false);
  });
});

describe("getRetryDelay", () => {
  // AC-03: delay 1s → 2s → 4s
  it("should return 1000ms on attempt 0", () => {
    expect(getRetryDelay(0)).toBe(1000);
  });

  it("should return 2000ms on attempt 1", () => {
    expect(getRetryDelay(1)).toBe(2000);
  });

  it("should return 4000ms on attempt 2", () => {
    expect(getRetryDelay(2)).toBe(4000);
  });
});

describe("sleep", () => {
  it("should resolve after given ms", async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;
    // Cho phép +/- 50ms tolerance
    expect(elapsed).toBeGreaterThanOrEqual(90);
  });
});
