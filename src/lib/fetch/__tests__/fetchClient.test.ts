import { fetchClient } from "../fetchClient";
import fetchMock from "jest-fetch-mock";

describe("fetchClient", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock localStorage
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("should make a successful request and return JSON", async () => {
    const mockData = { id: 1, name: "Test" };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchClient("/api/test");

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith("/api/test", expect.any(Object));
  });

  it("should attach authorization header if token exists", async () => {
    const token = "mock-token";
    (localStorage.getItem as jest.Mock).mockReturnValue(token);
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await fetchClient("/api/test");

    const callHeaders = (fetchMock.mock.calls[0][1] as any).headers as Headers;
    expect(callHeaders.get("Authorization")).toBe(`Bearer ${token}`);
  });

  it("should retry on 500 error", async () => {
    // Mock 1 failure then 1 success
    fetchMock.mockResponses(
      [JSON.stringify({ message: "Server Error" }), { status: 500 }],
      [JSON.stringify({ success: true }), { status: 200 }]
    );

    const result = await fetchClient("/api/test", { retry: 1 });

    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("should throw error after max retries", async () => {
    fetchMock.mockResponse(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });

    await expect(fetchClient("/api/test", { retry: 2 })).rejects.toMatchObject({
      statusCode: 500,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("should throw error immediately on 400 error", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Bad Request" }), {
      status: 400,
    });

    await expect(fetchClient("/api/test")).rejects.toMatchObject({
      statusCode: 400,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
