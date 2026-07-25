import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { handleForgotPassword } from "@/lib/auth-api";
import { isAuthenticated } from "@/lib/auth-store";

export const Route = createFileRoute("/forgot-password")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      throw redirect({ to: "/dashboard", replace: true });
    }
  },
  head: () => ({
    meta: [
      { title: "Forgot Password — VoltView" },
      { name: "description", content: "Reset your VoltView account password." },
      { property: "og:title", content: "Forgot Password — VoltView" },
      { property: "og:description", content: "Reset your VoltView account password." },
    ],
  }),
  component: ForgotPasswordPage,
});

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
});
type Values = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    await handleForgotPassword(values);
    setSubmitting(false);
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a secure reset link."
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-medium text-primary transition hover:opacity-80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Login
        </Link>
      }
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-foreground">
            If an account exists for <strong>{getValues("email")}</strong>, a reset link
            is on its way.
          </p>
          <p className="text-xs text-muted-foreground">
            Check your inbox and spam folder. The link expires in 30 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="gradient-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending link…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Send reset link
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
