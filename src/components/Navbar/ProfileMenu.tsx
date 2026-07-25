import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { User, LogIn, LogOut, LayoutDashboard, UserPlus } from "lucide-react";
import { logout, useAuth } from "@/lib/auth-store";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const authed = useAuth();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate({ to: "/", replace: true });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-muted-foreground transition-all duration-200 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_-4px_var(--primary)]"
      >
        <User className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="menu"
          className="glass absolute right-0 mt-2 w-52 origin-top-right rounded-2xl p-2 shadow-2xl animate-fade-in"
        >
          {authed ? (
            <>
              <button
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/dashboard" });
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-accent hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              <button
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-accent hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/login" });
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-accent hover:text-primary"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/signup" });
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-accent hover:text-primary"
              >
                <UserPlus className="h-4 w-4" />
                <span>Create account</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
