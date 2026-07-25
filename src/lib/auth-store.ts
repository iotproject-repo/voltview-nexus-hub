// Placeholder client-side auth flag. Swap for real session when backend lands.
import { useEffect, useState } from "react";

const KEY = "voltview_auth";
const EVENT = "voltview:auth-change";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // ignore
  }
}

export function logout() {
  setAuthenticated(false);
}

/** Only allow internal, same-origin path redirects. */
export function sanitizeRedirect(target: unknown, fallback = "/dashboard"): string {
  if (typeof target !== "string" || target.length === 0) return fallback;
  // Reject protocol-relative and absolute URLs; require leading "/"
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  return target;
}

/** React hook — reactive auth flag, persisted via localStorage. */
export function useAuth(): boolean {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());
  useEffect(() => {
    const sync = () => setAuthed(isAuthenticated());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return authed;
}
