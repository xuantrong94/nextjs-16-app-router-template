import type { AppError } from "./types";

export function normalizeError(error: unknown, statusCode = 0): AppError {
  if (error instanceof Error) {
    return {
      code: error.name === "AbortError" ? "REQUEST_TIMEOUT" : "NETWORK_ERROR",
      message: error.message,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }
  return {
    code: "UNKNOWN_ERROR",
    message: "An unknown error occurred",
    statusCode,
    timestamp: new Date().toISOString(),
  };
}

export async function parseResponseError(
  response: Response
): Promise<AppError> {
  let message = response.statusText;
  try {
    const body = await response.json();
    message = body.message ?? message;
  } catch {
    //
  }
  return {
    code: `HTTP_${response.status}`,
    message,
    statusCode: response.status,
    timestamp: new Date().toISOString(),
  };
}
