import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Activity, Bell, Cpu, Droplet, Gauge, Home, Lightbulb, Power, Search, Settings, Zap, AlertTriangle, Plus, SlidersHorizontal } from "lucide-react";

import { useEffect } from "react";
import { LiveChart } from "@/components/voltview/LiveChart";
import { isAuthenticated } from "@/lib/auth-store";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  head: () => ({
    meta: [
      { title: "Dashboard — VoltView" },
      { name: "description", content: "Live IoT control room: motors, pumps, lights and industrial systems." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px] gap-6 p-4 sm:p-6">
        <Sidebar />
        <main className="min-w-0 flex-1 space-y-6">
          <TopBar />
          <Overview />
          <DevicesGrid />
          <Alerts />
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const items = [
    { i: Home, n: "Overview", to: "/dashboard", active: true },
    { i: SlidersHorizontal, n: "Control Panel", to: "/control-panel" },
    { i: Cpu, n: "Devices", to: "/dashboard" },
    { i: Activity, n: "Monitoring", to: "/dashboard" },
    { i: Bell, n: "Alerts", to: "/dashboard" },
    { i: Settings, n: "Settings", to: "/dashboard" },
  ];
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="glass sticky top-6 rounded-3xl p-4">
        <Link to="/" className="mb-6 flex items-center gap-2 px-2">
          <div className="gradient-primary grid h-8 w-8 place-items-center rounded-xl glow">
            <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold">VoltView</span>
        </Link>
        <nav className="space-y-1">
          {items.map(({ i: I, n, to, active }) => (
            <Link
              key={n}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-surface hover:text-foreground"}`}
              activeProps={{ className: "bg-primary/15 text-primary" }}
            >
              <I className="h-4 w-4" /> {n}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl bg-surface p-4">
          <p className="text-xs text-muted-foreground">Plan</p>
          <p className="mt-1 font-display text-base font-semibold">Pro Workspace</p>
          <button className="gradient-primary mt-3 w-full rounded-xl py-2 text-xs font-medium text-primary-foreground">Upgrade</button>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="glass flex flex-wrap items-center gap-3 rounded-3xl p-3">
      <div className="flex flex-1 items-center gap-2 rounded-xl bg-surface px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search devices, automations, alerts…" />
      </div>
      <button className="grid h-10 w-10 place-items-center rounded-xl bg-surface text-muted-foreground"><Bell className="h-4 w-4" /></button>
      <Link
        to="/add-device"
        className="gradient-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        <Plus className="h-4 w-4" /> Add device
      </Link>
    </div>
  );
}

function Overview() {
  const stats = [
    { l: "Devices online", v: "14 / 16", i: Cpu, t: "+2 today" },
    { l: "Total current", v: "38.4A", i: Activity, t: "stable" },
    { l: "Power draw", v: "8.7 kW", i: Gauge, t: "-5%" },
    { l: "Saved this week", v: "21 kWh", i: Zap, t: "+12%" },
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ l, v, i: I, t }) => (
        <div key={l} className="glass rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary"><I className="h-4 w-4" /></span>
            <span className="text-xs text-muted-foreground">{t}</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{l}</p>
          <p className="font-display text-2xl font-semibold">{v}</p>
        </div>
      ))}
    </section>
  );
}

function DevicesGrid() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="glass rounded-3xl p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Main Motor · Bay 02</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">14.2A <span className="text-base font-normal text-muted-foreground">/ 20A</span></h3>
          </div>
          <button className="gradient-primary rounded-full px-4 py-2 text-sm font-medium text-primary-foreground"><Power className="mr-1.5 inline h-3.5 w-3.5" /> Running</button>
        </div>
        <div className="mt-4"><LiveChart height={200} /></div>
      </div>
      <div className="space-y-4">
        <DTile icon={<Droplet className="h-5 w-5" />} name="Water Pump" detail="Tank 78% · 6.1A" status="Auto" />
        <DTile icon={<Lightbulb className="h-5 w-5" />} name="Yard Lights" detail="4 fixtures · 1.2A" status="On" />
        <DTile icon={<Activity className="h-5 w-5" />} name="Compressor" detail="0.0A · standby" status="Idle" />
      </div>
    </section>
  );
}

function DTile({ icon, name, detail, status }: { icon: React.ReactNode; name: string; detail: string; status: string }) {
  return (
    <div className="glass flex items-center gap-4 rounded-3xl p-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      <span className="rounded-full bg-surface px-3 py-1 text-xs">{status}</span>
    </div>
  );
}

function Alerts() {
  const items = [
    { t: "Pump 2 current spike", d: "Paused automatically at 4:12 PM", level: "warning" },
    { t: "Yard Lights schedule updated", d: "Sunset trigger applied to 4 fixtures", level: "info" },
    { t: "Compressor maintenance due", d: "Predicted in ~6 days based on runtime", level: "info" },
  ];
  return (
    <section className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Activity</h3>
        <a href="#" className="text-xs text-primary">View all</a>
      </div>
      <div className="mt-4 divide-y divide-border">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3 py-3">
            <span className={`grid h-8 w-8 place-items-center rounded-xl ${it.level === "warning" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"}`}>
              <AlertTriangle className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{it.t}</p>
              <p className="text-xs text-muted-foreground">{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
