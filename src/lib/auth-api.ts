// Placeholder auth API — swap with real backend integration later.
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

export async function handleLogin(payload: LoginPayload) {
  await new Promise((r) => setTimeout(r, 800));
  console.log("login", { ...payload, password: "***" });
  return { ok: true };
}

export async function handleSignup(payload: SignupPayload) {
  await new Promise((r) => setTimeout(r, 800));
  console.log("signup", { ...payload, password: "***" });
  return { ok: true };
}

export async function handleForgotPassword(payload: ForgotPayload) {
  await new Promise((r) => setTimeout(r, 900));
  console.log("forgot-password", payload);
  return { ok: true };
}

export async function handleResetPassword(payload: ResetPayload) {
  await new Promise((r) => setTimeout(r, 900));
  console.log("reset-password", { token: payload.token, password: "***" });
  return { ok: true };
}
