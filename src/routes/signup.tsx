import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { isAuthenticated } from "@/lib/auth-store";

export const Route = createFileRoute("/signup")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      throw redirect({ to: "/dashboard", replace: true });
    }
  },

  head: () => ({
    meta: [
      { title: "Create Account — VoltView" },
      { name: "description", content: "Join VoltView and start managing your smart devices." },
      { property: "og:title", content: "Create Account — VoltView" },
      { property: "og:description", content: "Join VoltView and start managing your smart devices." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join VoltView and start managing your smart devices."
    >
      <SignupForm />
    </AuthLayout>
  );
}
