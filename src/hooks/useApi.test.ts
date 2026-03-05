import { renderHook, waitFor, act } from "@testing-library/react";
import { useApi } from "./useApi";
import z from "zod";

const makeMockResponse = (data: unknown, status = 200) => ({
  ok: true,
  status,
  headers: new Headers({ "Content-Type": "application/json" }),
  json: async () => data,
});

const withDelay = <T>(value: T, ms = 1000) =>
  new Promise<T>((res) => setTimeout(() => res(value), ms));

describe("useApi test cases", () => {
  let mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  // HTTP Tests
  describe("HTTP", () => {
    test("GET request on mount", async () => {
      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      const { result } = renderHook(() => useApi("api/test"));

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeNull();

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({ method: "GET" }),
      );

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
      expect(result.current.statusCode).toBe(200);
    });

    test("no GET request on mount with refetchOnMount = false", async () => {
      renderHook(() => useApi("api/test", { refetchOnMount: false }));
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test("POST request", async () => {
      const mockData = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );

      const currentBody = { id: 1, name: "Test" };

      await act(async () => {
        await result.current.execute({ method: "POST", body: currentBody });
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(currentBody),
        }),
      );

      await waitFor(() => expect(result.current.data).toEqual(mockData));
      expect(result.current.error).toBeNull();
      expect(result.current.statusCode).toBe(201);
    });

    test("DELETE request", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );
      await act(async () => {
        await result.current.execute({ method: "DELETE" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({ method: "DELETE" }),
      );

      await waitFor(() => expect(result.current.data).toEqual({}));
      expect(result.current.error).toBeNull();
      expect(result.current.statusCode).toBe(200);
    });

    test("Custom Headers", async () => {
      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );

      await act(async () => {
        await result.current.execute({
          method: "GET",
          headers: { Authorization: "Bearer token" },
        });
      });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          }),
        }),
      );

      await waitFor(() => expect(result.current.data).toEqual(mockData));
      expect(result.current.error).toBeNull();
      expect(result.current.statusCode).toBe(200);
    });
  });

  // Zod
  describe("Zod Validation", () => {
    test("Validate request body successfully", async () => {
      const requestSchema = z.object({
        id: z.number(),
        name: z.string(),
      });

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false, requestSchema }),
      );

      const validBody = { id: 1, name: "Test" };
      await act(async () => {
        await result.current.execute({ method: "POST", body: validBody });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(validBody),
        }),
      );

      await waitFor(() =>
        expect(result.current.data).toEqual({ success: true }),
      );
      expect(result.current.error).toBeNull();
    });

    test("Handle request validation error", async () => {
      const requestSchema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false, requestSchema }),
      );

      const invalidBody = { id: "not-a-number", name: "Test" };
      await act(async () => {
        await result.current.execute({ method: "POST", body: invalidBody });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).not.toHaveBeenCalled();
      await waitFor(() =>
        expect(result.current.error).toMatch(
          /Request validation failed: id: Invalid input: expected number, received string/,
        ),
      );
    });

    test("Validate response body successfully", async () => {
      const responseSchema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false, responseSchema }),
      );

      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      await waitFor(() => expect(result.current.data).toEqual(mockData));
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.current.error).toBeNull();
    });

    test("Handle response validation error", async () => {
      const responseSchema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const mockData = { id: "not-a-number", name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false, responseSchema }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(1);
      await waitFor(() =>
        expect(result.current.error).toMatch(
          /Response validation failed: id: Invalid input: expected number, received string/,
        ),
      );
    });

    test("No validation with responseType = blob", async () => {
      const responseSchema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const mockBlob = new Blob(["test"], { type: "text/plain" });
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        blob: async () => mockBlob,
      });

      const { result } = renderHook(() =>
        useApi("api/test", {
          refetchOnMount: false,
          responseSchema,
          responseType: "blob",
        }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      await waitFor(() => expect(result.current.data).toEqual(mockBlob));
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.current.error).toBeNull();
    });
  });

  // Error Handling
  describe("Error Handling", () => {
    test("handles non-OK response", async () => {
      const mockError = { error: "Not Found" };
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockError,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "api/test",
        expect.objectContaining({ method: "GET" }),
      );

      await waitFor(() => expect(result.current.error).toBe("HTTP status 404"));
      expect(result.current.data).toBeNull();
      expect(result.current.statusCode).toBe(404);
    });

    test("handles fetch error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(result.current.error).toBe("Network error"));
      expect(result.current.data).toBeNull();
      expect(result.current.statusCode).toBeNull();
    });

    test("network error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(result.current.error).toBe("Network error"));
      expect(result.current.data).toBeNull();
    });

    test("invalid content type", async () => {
      const mockInvalidContent = new Blob(["test"], { type: "text/plain" });
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "text/plain" }),
        blob: async () => mockInvalidContent,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false, responseType: "json" }),
      );
      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(result.current.error).toBeTruthy());
      expect(result.current.data).toBeNull();
    });

    test("clear error on new request", async () => {
      const mockError = { error: "Not Found" };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockError,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );

      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.error).toBeTruthy();

      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => mockData,
      });

      await act(async () => {
        await result.current.execute({ method: "GET" });
      });
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(mockData);
    });
  });

  // AbortController
  describe("AbortController", () => {
    test("abort on unmount", async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, "abort");

      mockFetch.mockImplementation(() =>
        withDelay(makeMockResponse({ id: 1, name: "Test" })),
      );

      const { unmount } = renderHook(() => useApi("api/test"));
      unmount();

      expect(abortSpy).toHaveBeenCalled();
      abortSpy.mockRestore();
    });

    test("abort on new request", async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, "abort");

      mockFetch.mockImplementation(() =>
        withDelay(makeMockResponse({ id: 1, name: "Test" })),
      );

      const { result } = renderHook(() =>
        useApi("api/test", { refetchOnMount: false }),
      );

      await act(async () => {
        const firstRequest = result.current.execute({ method: "GET" });
        const secondRequest = result.current.execute({ method: "GET" });
        await Promise.allSettled([firstRequest, secondRequest]);
      });

      expect(abortSpy).toHaveBeenCalledTimes(1);
      abortSpy.mockRestore();
    });

    test("no error on abort", async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, "abort");
      mockFetch.mockImplementation(() =>
        withDelay(makeMockResponse({ id: 1, name: "Test" })),
      );

      const { result } = renderHook(() => useApi("api/test"));

      await act(async () => {
        result.current.execute({ method: "GET" });
        result.current.execute({ method: "GET" });
      });
      expect(abortSpy).toHaveBeenCalled();
      abortSpy.mockRestore();
    });
  });

  // Response Types
  describe("Response Types", () => {
    test("handles json response (by default)", async () => {
      const mockData = { id: 1, name: "Test" };
      const jsonSpy = jest.fn().mockResolvedValue(mockData);

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: jsonSpy,
      });

      const { result } = renderHook(() => useApi("api/test"));

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(jsonSpy).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockData);
    });

    test("handles text response", async () => {
      const mockText = "Plain Test Text";
      const textSpy = jest.fn().mockResolvedValue(mockText);

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "text/plain" }),
        text: textSpy,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { responseType: "text" }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(textSpy).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockText);
    });

    test("handles blob response", async () => {
      const mockBlob = new Blob(["Plain Test Text"], {
        type: "application/pdf",
      });
      const blobSpy = jest.fn().mockResolvedValue(mockBlob);

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/pdf" }),
        blob: blobSpy,
      });

      const { result } = renderHook(() =>
        useApi("api/test", { responseType: "blob" }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(blobSpy).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockBlob);
    });
  });

  // Refetch mechanisms
  describe("Refetch Mechanisms", () => {
    test("refetch on interval", async () => {
      jest.useFakeTimers();

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useApi("api/test", { refetchInterval: 5000 }),
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(1);

      await act(async () => {
        jest.advanceTimersByTime(5000);
        await Promise.resolve();
      });
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(2);

      await act(async () => {
        jest.advanceTimersByTime(5000);
        await Promise.resolve();
      });
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    test("clear refetch interval on unmount", async () => {
      const clearIntervalSpy = jest.spyOn(window, "clearInterval");

      const { unmount } = renderHook(() =>
        useApi("api/test", { refetchInterval: 5000 }),
      );
      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    test("no interval if refetchInterval is not provided", async () => {
      jest.useFakeTimers();

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() => useApi("api/test"));

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(mockFetch).toHaveBeenCalledTimes(1);

      await act(async () => {
        jest.advanceTimersByTime(10000);
        await Promise.resolve();
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    test("handles empty response body", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() => useApi("api/test"));

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.data).toEqual({});
      expect(result.current.error).toBeNull();
      expect(result.current.statusCode).toBe(204);
    });

    test("undefined post body", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useApi("/api/users", { refetchOnMount: false }),
      );
      
      await act(async () => {
        await result.current.execute({
          method: "POST",
          body: undefined,
        });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/users",
        expect.not.objectContaining({
          body: expect.anything(),
        }),
      );
    });

    test("No body in GET request", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useApi("/api/users", { refetchOnMount: false }),
      );

      await act(async () => {
        await result.current.execute({
          method: "GET",
          body: { shouldNotBeSent: true },
        });
      });

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/users",
        expect.objectContaining({
          method: "GET",
        }),
      );

      const fetchCall = mockFetch.mock.calls[0][1];
      expect(fetchCall.body).toBeUndefined();
    });
  });
});
