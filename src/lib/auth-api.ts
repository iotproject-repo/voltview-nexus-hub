// Placeholder auth API — swap with real backend integration later.
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export async function handleLogin(payload: LoginPayload) {
  await new Promise((r) => setTimeout(r, 800));
  console.log(payload);
  return { ok: true };
}

export async function handleSignup(payload: SignupPayload) {
  await new Promise((r) => setTimeout(r, 800));
  console.log(payload);
  return { ok: true };
}
