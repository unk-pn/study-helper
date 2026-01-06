import { useCallback, useEffect, useRef, useState } from "react";

interface ApiOptions<T = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
}

interface useApiOptions {
  refetchOnMount?: boolean;
  refetchInterval?: number;
}

interface useApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (options: Partial<ApiOptions>) => Promise<T | void>;
}

export const useApi = <T = unknown>(
  url: string,
  options: useApiOptions & { method?: ApiOptions["method"] } = {}
): useApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        if (method !== "GET" && method !== "DELETE" && body !== undefined) {
          fetchOptions.body = JSON.stringify(body);
        }

        const res = await fetch(url, fetchOptions);
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        const data = await res.json();
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
    [url]
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
        refetchInterval
      );
      return () => clearInterval(interval);
    }
  }, [refetchInterval, execute]);

  return { data, error, loading, execute };
};
