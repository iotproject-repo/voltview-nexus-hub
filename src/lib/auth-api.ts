// Real authentication API wired to the VoltView backend.
import { api, ApiError, setToken } from "./api-client";
import { notifyAuthChange } from "./auth-store";

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}
export interface ForgotPayload {
  email: string;
}
export interface ResetPayload {
  token: string;
  password: string;
}

interface AuthResponse {
  token?: string;
  accessToken?: string;
  data?: { token?: string; accessToken?: string; user?: unknown };
  user?: unknown;
}

function extractToken(res: AuthResponse): string {
  const token =
    res?.token ??
    res?.accessToken ??
    res?.data?.token ??
    res?.data?.accessToken ??
    null;
  if (!token) throw new ApiError("Missing token in auth response", 500, res);
  return token;
}

export async function handleLogin(payload: LoginPayload) {
  const res = await api.post<AuthResponse>(
    "/api/v1/auth/login",
    { email: payload.email, password: payload.password },
    { auth: false },
  );
  const token = extractToken(res);
  setToken(token);
  notifyAuthChange();
  return { ok: true as const, token, user: res?.user ?? res?.data?.user ?? null };
}

export async function handleSignup(payload: SignupPayload) {
  const res = await api.post<AuthResponse>(
    "/api/v1/auth/register",
    { name: payload.name, email: payload.email, password: payload.password },
    { auth: false },
  );
  const token = extractToken(res);
  setToken(token);
  notifyAuthChange();
  return { ok: true as const, token, user: res?.user ?? res?.data?.user ?? null };
}

// Placeholder stubs — backend does not yet support password reset.
// Kept so the /forgot-password and /reset-password pages remain functional UI.
export async function handleForgotPassword(payload: ForgotPayload) {
  await new Promise((r) => setTimeout(r, 600));
  console.warn("[auth] forgot-password not yet supported by backend", payload.email);
  return { ok: true as const };
}

export async function handleResetPassword(payload: ResetPayload) {
  await new Promise((r) => setTimeout(r, 600));
  console.warn("[auth] reset-password not yet supported by backend", payload.token);
  return { ok: true as const };
}
