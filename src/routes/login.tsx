import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { isAuthenticated, sanitizeRedirect } from "@/lib/auth-store";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: ({ search }) => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      const target = sanitizeRedirect((search as { redirect?: string })?.redirect);
      throw redirect({ to: target, replace: true });
    }
  },
  head: () => ({
    meta: [
      { title: "Login — VoltView" },
      { name: "description", content: "Login to access your VoltView dashboard." },
      { property: "og:title", content: "Login — VoltView" },
      { property: "og:description", content: "Login to access your VoltView dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to access your VoltView dashboard.">
      <LoginForm />
    </AuthLayout>
  );
}
