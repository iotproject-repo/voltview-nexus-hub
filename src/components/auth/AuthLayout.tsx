import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        className="ambient-blob left-[-10%] top-[-10%] h-[420px] w-[420px]"
        style={{ background: "var(--primary)" }}
      />
      <div
        className="ambient-blob right-[-10%] bottom-[-10%] h-[420px] w-[420px]"
        style={{ background: "var(--primary-glow)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 w-full max-w-[460px] animate-fade-up">
        <Link
          to="/"
          className="mb-6 flex items-center justify-center gap-2 text-foreground transition hover:text-primary"
        >
          <div className="gradient-primary grid h-9 w-9 place-items-center rounded-xl glow">
            <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold">VoltView</span>
        </Link>

        <div className="glass rounded-3xl p-6 shadow-2xl sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 border-t border-border/60 pt-5 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
