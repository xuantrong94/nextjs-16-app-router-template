const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);

export function shouldRetry(statusCode: number): boolean {
  // AC-04: KHÔNG retry 4xx
  if (statusCode >= 400 && statusCode < 500) return false;
  return RETRYABLE_STATUS.has(statusCode);
}

/**
 * Exponential backoff: 1s -> 2s -> 4s
 * delay = baseDelay * 2^attempt
 */
export const getRetryDelay = (attempt: number, baseDelay = 1000): number => {
  return baseDelay * Math.pow(2, attempt);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
