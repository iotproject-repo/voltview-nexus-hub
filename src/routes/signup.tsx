import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export const Route = createFileRoute("/signup")({
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
