import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
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
