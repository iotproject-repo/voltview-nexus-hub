// Placeholder client-side auth flag. Swap for real session when backend lands.
const KEY = "voltview_auth";

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
  } catch {
    // ignore
  }
}

export function logout() {
  setAuthenticated(false);
}
