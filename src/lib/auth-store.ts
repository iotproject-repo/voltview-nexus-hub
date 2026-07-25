// Placeholder client-side auth store. Swap for real session when backend lands.
import { useEffect, useState } from "react";

const KEY = "voltview_auth";
const EVENT = "voltview:auth-change";

// Session durations (ms)
const SESSION_SHORT = 1000 * 60 * 60; // 1 hour
const SESSION_REMEMBER = 1000 * 60 * 60 * 24 * 30; // 30 days

interface Session {
  v: 1;
  expiresAt: number;
  remember: boolean;
}

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    // Legacy value: "1" -> treat as short session starting now.
    if (raw === "1") {
      const s: Session = { v: 1, expiresAt: Date.now() + SESSION_SHORT, remember: false };
      window.localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    const parsed = JSON.parse(raw) as Session;
    if (!parsed || parsed.v !== 1 || typeof parsed.expiresAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(s: Session | null) {
  if (typeof window === "undefined") return;
  try {
    if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
    else window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // ignore
  }
}

export function isAuthenticated(): boolean {
  const s = readSession();
  if (!s) return false;
  if (Date.now() >= s.expiresAt) {
    writeSession(null);
    return false;
  }
  return true;
}

/** Legacy setter kept for compatibility. Creates a short (1h) session. */
export function setAuthenticated(value: boolean, options?: { remember?: boolean }) {
  if (!value) {
    writeSession(null);
    return;
  }
  const remember = options?.remember ?? false;
  writeSession({
    v: 1,
    remember,
    expiresAt: Date.now() + (remember ? SESSION_REMEMBER : SESSION_SHORT),
  });
}

export function logout() {
  writeSession(null);
}

/** Only allow internal, same-origin path redirects. */
export function sanitizeRedirect(target: unknown, fallback = "/dashboard"): string {
  if (typeof target !== "string" || target.length === 0) return fallback;
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  return target;
}

/** React hook — reactive auth flag with automatic expiry handling. */
export function useAuth(): boolean {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());
  useEffect(() => {
    const sync = () => setAuthed(isAuthenticated());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    // Also re-check periodically so an expired session flips the UI without a nav.
    const interval = window.setInterval(sync, 30_000);
    // And when the tab regains focus.
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(interval);
    };
  }, []);
  return authed;
}
