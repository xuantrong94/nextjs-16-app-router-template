/**
 * Create a AbortController that will be aborted after the specified timeout.
 */
export const createTimeoutSignal = (ms: number): AbortSignal => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  // cleanup timer when the request is finished
  controller.signal.addEventListener("abort", () => clearTimeout(timer));
  return controller.signal;
};
