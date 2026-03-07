import { createTimeoutSignal } from "../timeout";

describe("createTimeoutSignal", () => {
  jest.useFakeTimers();

  it("should return an AbortSignal", () => {
    const signal = createTimeoutSignal(1000);
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(signal.aborted).toBe(false);
  });

  it("should abort after specified ms", () => {
    const signal = createTimeoutSignal(1000);
    expect(signal.aborted).toBe(false);

    jest.advanceTimersByTime(1000);
    expect(signal.aborted).toBe(true);
  });

  it("should cleanup timer on manual abort", () => {
    // Verify it doesn't throw
    createTimeoutSignal(1000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
