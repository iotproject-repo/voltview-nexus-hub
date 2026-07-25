import { useEffect } from "react";
import { redirect, useNavigate } from "@tanstack/react-router";
import { isAuthenticated, useAuth } from "./auth-store";

/** Use inside a route's `beforeLoad` to enforce authentication. */
export function requireAuth(location: { href: string }) {
  if (typeof window === "undefined") return;
  if (!isAuthenticated()) {
    throw redirect({ to: "/login", search: { redirect: location.href } });
  }
}

/**
 * Client-side watcher for protected pages. If the session expires mid-session
 * (timer, storage event from another tab, or explicit logout), send the user
 * to /login with a redirect back to the current page.
 */
export function useRequireAuth() {
  const authed = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authed) {
      navigate({
        to: "/login",
        replace: true,
        search: { redirect: window.location.pathname + window.location.search },
      });
    }
  }, [authed, navigate]);
}
