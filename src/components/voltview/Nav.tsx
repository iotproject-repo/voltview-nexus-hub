import { Link } from "@tanstack/react-router";
import { Zap, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="gradient-primary grid h-8 w-8 place-items-center rounded-xl glow">
              <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">VoltView</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#dashboard" className="transition hover:text-foreground">Platform</a>
            <a href="#devices" className="transition hover:text-foreground">Devices</a>
            <a href="#marketplace" className="transition hover:text-foreground">Marketplace</a>
            <a href="#ai" className="transition hover:text-foreground">AI</a>
            <a href="#partners" className="transition hover:text-foreground">Partners</a>
            <Link to="/store" className="transition hover:text-foreground">Store</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(d => !d)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-muted-foreground transition hover:text-foreground"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/dashboard"
              className="hidden rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 sm:inline-block"
            >
              Open App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
