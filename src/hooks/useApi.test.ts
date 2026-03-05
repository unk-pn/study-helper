import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "./useApi";
import z from "zod";

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

      await result.current.execute({ method: "POST", body: currentBody });
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

      await result.current.execute({ method: "DELETE" });
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

      await result.current.execute({
        method: "GET",
        headers: { Authorization: "Bearer token" },
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
      await result.current.execute({ method: "POST", body: validBody });

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
      await result.current.execute({ method: "POST", body: invalidBody });

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

      await result.current.execute({ method: "GET" });
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

      await result.current.execute({ method: "GET" });
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

      await result.current.execute({ method: "GET" });
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

      await result.current.execute({ method: "GET" });
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

      await result.current.execute({ method: "GET" });
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(mockFetch).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(result.current.error).toBe("Network error"));
      expect(result.current.data).toBeNull();
      expect(result.current.statusCode).toBeNull();
    });

    
  });

  // AbortController

  // Response Types

  // Refetch mechanisms

  // Edge Cases
});
