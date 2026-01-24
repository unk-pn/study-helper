import { useCallback, useEffect, useRef, useState } from "react";

interface ApiOptions<T = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
}

interface useApiOptions {
  refetchOnMount?: boolean;
  refetchInterval?: number;
  responseType?: "json" | "text" | "blob";
}

interface useApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (options: Partial<ApiOptions>) => Promise<T | void>;
  statusCode: number | null;
}

export const useApi = <T = unknown>(
  url: string,
  options: useApiOptions & { method?: ApiOptions["method"] } = {},
): useApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { refetchOnMount, refetchInterval } = options;

  const execute = useCallback(
    async <B>(opts: Partial<ApiOptions<B>>) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const { method = "GET", body, headers = {} } = opts;

      setLoading(true);
      setError(null);
      try {
        const fetchOptions: RequestInit = {
          method,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };
        // if (method !== "GET" && method !== "DELETE" && body !== undefined) {
        if (method !== "GET" && body !== undefined) {
          fetchOptions.body = JSON.stringify(body);
        }

        const res = await fetch(url, fetchOptions);
        setStatusCode(res.status);
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);

        let data;

        if (options.responseType === "blob") {
          data = await res.blob();
        } else if (options.responseType === "text") {
          data = await res.text();
        } else {
          data = await res.json();
        }

        setData(data as T);
        return data;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setError(error instanceof Error ? error.message : "Fetch error");
      } finally {
        abortControllerRef.current = null;
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    [url, options.responseType],
  );

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  useEffect(() => {
    if (refetchOnMount !== false) {
      execute({ method: "GET" });
    }
  }, [execute, refetchOnMount]);

  useEffect(() => {
    if (refetchInterval) {
      const interval = setInterval(
        () => execute({ method: "GET" }),
        refetchInterval,
      );
      return () => clearInterval(interval);
    }
  }, [refetchInterval, execute]);

  return { data, error, loading, execute, statusCode };
};
