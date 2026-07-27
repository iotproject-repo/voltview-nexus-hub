// Client-side auth store. JWT `exp` is the source of truth for session validity.
import { useEffect, useState } from "react";

const KEY = "voltview_auth";
const TOKEN_KEY = "voltview_token";
const EVENT = "voltview:auth-change";

// Fallback session duration when no JWT exp is available.
const SESSION_SHORT = 1000 * 60 * 60; // 1 hour
const SESSION_REMEMBER = 1000 * 60 * 60 * 24 * 30; // 30 days

interface Session {
  v: 1;
  expiresAt: number;
  remember: boolean;
}

function decodeJwtExp(token: string): number | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const parsed = JSON.parse(json) as { exp?: number };
    return typeof parsed.exp === "number" ? parsed.exp * 1000 : null;
  } catch {
    return null;
  }
}

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    // Prefer JWT exp when a token is present.
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      const exp = decodeJwtExp(token);
      if (exp) {
        const raw = window.localStorage.getItem(KEY);
        let remember = false;
        if (raw && raw !== "1") {
          try {
            remember = !!(JSON.parse(raw) as Session).remember;
          } catch {
            // ignore
          }
        }
        return { v: 1, expiresAt: exp, remember };
      }
    }

    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
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
    else {
      window.localStorage.removeItem(KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
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

/** Notify listeners of an auth change after a token is written externally. */
export function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT));
}

export function sanitizeRedirect(target: unknown, fallback = "/dashboard"): string {
  if (typeof target !== "string" || target.length === 0) return fallback;
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  return target;
}

export function useAuth(): boolean {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());
  useEffect(() => {
    const sync = () => setAuthed(isAuthenticated());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    const interval = window.setInterval(sync, 30_000);
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
