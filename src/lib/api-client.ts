// Reusable API client for the VoltView backend.
// Base URL is fixed for development per user directive.
import { logout } from "./auth-store";

export const API_BASE_URL = "https://observation-string-practitioner-treating.trycloudflare.com";

const TOKEN_KEY = "voltview_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  auth?: boolean;
}

function handleUnauthorized() {
  logout();
  setToken(null);
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
    const redirect = window.location.pathname + window.location.search;
    window.location.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
  }
}

export async function apiRequest<T = unknown>(
  path: string,
  { body, auth = true, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  let payload: BodyInit | undefined;
  if (body !== undefined) {
    if (body instanceof FormData) {
      payload = body;
    } else {
      finalHeaders["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
  }

  if (auth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, { ...init, headers: finalHeaders, body: payload });

  if (res.status === 401) {
    handleUnauthorized();
    throw new ApiError("Unauthorized", 401, null);
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : null) || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export const api = {
  get: <T = unknown>(path: string, opts?: RequestOptions) =>
    apiRequest<T>(path, { ...opts, method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(path, { ...opts, method: "POST", body }),
  put: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(path, { ...opts, method: "PUT", body }),
  patch: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiRequest<T>(path, { ...opts, method: "PATCH", body }),
  delete: <T = unknown>(path: string, opts?: RequestOptions) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};
