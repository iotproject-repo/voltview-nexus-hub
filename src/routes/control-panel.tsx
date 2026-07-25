import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, Bell, Cpu, Home, Search, Settings, SlidersHorizontal, Zap } from "lucide-react";
import { getUserDevices, getDeviceCapabilities, type DeviceSummary, type DeviceDetail } from "@/lib/devices-api";
import { DeviceList } from "@/components/control-panel/DeviceList";
import { EmptyState } from "@/components/control-panel/EmptyState";
import { ControlRenderer } from "@/components/control-panel/ControlRenderer";
import { isAuthenticated } from "@/lib/auth-store";
import { useRequireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/control-panel")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  head: () => ({
    meta: [
      { title: "Control Panel — VoltView" },
      { name: "description", content: "Manage your VoltView devices with dynamic backend-driven controls." },
      { property: "og:title", content: "Control Panel — VoltView" },
      { property: "og:description", content: "Manage your VoltView devices with dynamic backend-driven controls." },
    ],
  }),
  component: ControlPanelPage,
});

function ControlPanelPage() {
  useRequireAuth();
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DeviceDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    let alive = true;
    getUserDevices().then(d => { if (alive) { setDevices(d); setLoadingList(false); } });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!selectedId) { setDetail(null); return; }
    let alive = true;
    setLoadingDetail(true);
    setDetail(null);
    getDeviceCapabilities(selectedId)
      .then(d => { if (alive) setDetail(d); })
      .finally(() => { if (alive) setLoadingDetail(false); });
    return () => { alive = false; };
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px] gap-6 p-4 sm:p-6">
        <Sidebar />
        <main className="min-w-0 flex-1 space-y-6">
          <TopBar />
          <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
            <div className="lg:h-[calc(100vh-180px)]">
              <DeviceList
                devices={devices}
                selectedId={selectedId}
                onSelect={setSelectedId}
                loading={loadingList}
              />
            </div>
            <div className="min-w-0">
              {loadingDetail && (
                <div className="glass flex h-full min-h-[400px] items-center justify-center rounded-3xl p-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
              {!loadingDetail && detail && <ControlRenderer device={detail} />}
              {!loadingDetail && !detail && <EmptyState />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const items = [
    { i: Home, n: "Overview", to: "/dashboard" as const },
    { i: SlidersHorizontal, n: "Control Panel", to: "/control-panel" as const },
    { i: Cpu, n: "Devices", to: "/dashboard" as const },
    { i: Activity, n: "Monitoring", to: "/dashboard" as const },
    { i: Bell, n: "Alerts", to: "/dashboard" as const },
    { i: Settings, n: "Settings", to: "/dashboard" as const },
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
          {items.map(({ i: I, n, to }) => (
            <Link
              key={n}
              to={to}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-surface hover:text-foreground"
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
        <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search devices…" />
      </div>
      <Link
        to="/add-device"
        className="gradient-primary rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Add device
      </Link>
    </div>
  );
}
