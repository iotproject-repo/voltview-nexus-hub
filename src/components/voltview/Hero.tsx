import { ArrowRight, Activity, Gauge, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LiveChart } from "./LiveChart";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="ambient-blob -top-32 left-1/4 h-[420px] w-[420px] bg-primary/40" />
      <div className="ambient-blob top-40 right-0 h-[380px] w-[380px] bg-primary-glow/30" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Live · 12,480 devices online
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Control every <span className="text-gradient">amp</span>.
            <br />Trust every <span className="text-gradient">device</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            VoltView is the calm, intelligent operating system for motors, pumps, lights and
            industrial systems — realtime current monitoring with the simplicity of a thermostat.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="gradient-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-95 glow"
            >
              Launch Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#devices"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground transition hover:bg-surface-elevated"
            >
              Explore Devices
            </a>
          </div>
        </div>

        {/* Floating dashboard preview */}
        <div className="relative mx-auto mt-16 max-w-5xl animate-float">
          <div className="glass overflow-hidden rounded-3xl p-3 glow">
            <div className="rounded-2xl bg-surface p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Home overview</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">Good evening, Alex</h3>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard icon={<Activity className="h-4 w-4" />} label="Live current" value="14.2A" trend="+2.1%" />
                <StatCard icon={<Gauge className="h-4 w-4" />} label="Load" value="62%" trend="stable" />
                <StatCard icon={<Zap className="h-4 w-4" />} label="Saved today" value="3.8 kWh" trend="-12%" good />
              </div>

              <div className="mt-5 rounded-2xl bg-surface-elevated p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">Motor — Main Pump</p>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">Healthy</span>
                </div>
                <LiveChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, trend, good }: { icon: React.ReactNode; label: string; value: string; trend: string; good?: boolean }) {
  return (
    <div className="rounded-2xl bg-surface-elevated p-4">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
        <span className={`text-xs ${good ? "text-success" : ""}`}>{trend}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}
