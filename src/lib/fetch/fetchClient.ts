import { normalizeError, parseResponseError } from "./errorHandler";
import { getRetryDelay, shouldRetry, sleep } from "./retry";
import { createTimeoutSignal } from "./timeout";
import { AppError, RequestOptions } from "./types";

function getAuthToken(): string | null {
  if (globalThis === undefined) return null;
  return localStorage.getItem("token");
}

export async function fetchClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    timeout = 10000,
    retry = 3,
    tags,
    revalidate,
    ...fetchOptions
  } = options;

  //--- Interceptor: Attach Auth Header ---
  const token = getAuthToken();
  const headers = new Headers(fetchOptions.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  // --- Next.js Catch Config ---
  const nextConfig =
    tags || revalidate !== undefined ? { next: { tags, revalidate } } : {};

  let lastError: AppError | null = null;

  // --- Retry Loop ---
  for (let attempt = 0; attempt <= retry; attempt++) {
    const signal = createTimeoutSignal(timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        ...nextConfig,
        headers,
        signal,
      });

      if (!response.ok) {
        const appError = await parseResponseError(response);

        // Just retry when server error appear (5xx)
        if (shouldRetry(response.status) && attempt < retry) {
          lastError = appError;
          await sleep(getRetryDelay(attempt));
          continue;
        }

        throw appError;
      }
      return response.json() as Promise<T>;
    } catch (error) {
      // AbortError = timeout
      if (error && typeof error === "object" && "code" in error) {
        throw error;
      }
      lastError = normalizeError(error);

      if (attempt < retry) {
        await sleep(getRetryDelay(attempt));
        continue;
      }
    }
  }
  throw lastError ?? normalizeError(new Error("Max retries exceeded"));
}
