import { normalizeError, parseResponseError } from "../errorHandler";

describe("normalizeError", () => {
  it("should handle Error object with AbortError name", () => {
    const error = new Error("Timeout");
    error.name = "AbortError";
    const result = normalizeError(error, 408);
    expect(result.code).toBe("REQUEST_TIMEOUT");
    expect(result.statusCode).toBe(408);
  });

  it("should handle generic Error object", () => {
    const error = new Error("Some network issue");
    const result = normalizeError(error, 0);
    expect(result.code).toBe("NETWORK_ERROR");
    expect(result.message).toBe("Some network issue");
  });

  it("should handle unknown error types", () => {
    const result = normalizeError("string error", 500);
    expect(result.code).toBe("UNKNOWN_ERROR");
    expect(result.statusCode).toBe(500);
  });
});

describe("parseResponseError", () => {
  it("should extract message from JSON body", async () => {
    const mockResponse = {
      status: 400,
      statusText: "Bad Request",
      json: jest.fn().mockResolvedValue({ message: "Custom error message" }),
    } as unknown as Response;

    const result = await parseResponseError(mockResponse);
    expect(result.code).toBe("HTTP_400");
    expect(result.message).toBe("Custom error message");
    expect(result.statusCode).toBe(400);
  });

  it("should use statusText if JSON body has no message", async () => {
    const mockResponse = {
      status: 500,
      statusText: "Internal Server Error",
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Response;

    const result = await parseResponseError(mockResponse);
    expect(result.message).toBe("Internal Server Error");
  });

  it("should use statusText if JSON parsing fails", async () => {
    const mockResponse = {
      status: 502,
      statusText: "Bad Gateway",
      json: jest.fn().mockRejectedValue(new Error("Parse error")),
    } as unknown as Response;

    const result = await parseResponseError(mockResponse);
    expect(result.message).toBe("Bad Gateway");
  });
});
