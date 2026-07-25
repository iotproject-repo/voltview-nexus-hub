import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Loader2, LogIn, ShieldAlert } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { handleLogin } from "@/lib/auth-api";
import { sanitizeRedirect, setAuthenticated } from "@/lib/auth-store";

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirectTarget = sanitizeRedirect(search?.redirect);
  const showUnauthorized = typeof search?.redirect === "string" && search.redirect.length > 0;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    await handleLogin(values);
    setAuthenticated(true, { remember: !!values.remember });
    setSubmitting(false);
    navigate({ to: redirectTarget, replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {showUnauthorized && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/10 px-3.5 py-2.5 text-xs text-warning"
        >
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>You need to sign in to access that page.</span>
        </div>
      )}
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

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-muted-foreground transition hover:text-primary"
          >
            Forgot Password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          {...register("remember")}
          className="h-4 w-4 rounded border-input bg-surface accent-primary"
        />
        <span>Remember me for 30 days</span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="gradient-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            Sign In
          </>
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-primary transition hover:opacity-80">
          Create Account
        </Link>
      </p>
    </form>
  );
}
