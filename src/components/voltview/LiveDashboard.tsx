import { Power, Droplet, Lightbulb, AlertTriangle, Activity } from "lucide-react";
import { LiveChart } from "./LiveChart";

export function LiveDashboard() {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Live Dashboard"
          title="A control room in your pocket."
          subtitle="Realtime current, smart controls and intelligent alerts — beautifully calm by default."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Main Motor · Bay 02</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">14.2A <span className="text-base font-normal text-muted-foreground">/ 20A max</span></h3>
              </div>
              <button className="gradient-primary rounded-full px-4 py-2 text-sm font-medium text-primary-foreground">
                <Power className="mr-1.5 inline h-3.5 w-3.5" /> Running
              </button>
            </div>
            <div className="mt-4">
              <LiveChart height={180} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Voltage", v: "232V" },
                { l: "Power", v: "3.2kW" },
                { l: "Uptime", v: "14h 22m" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-surface p-3">
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                  <p className="font-display text-lg font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <DeviceTile icon={<Droplet className="h-5 w-5" />} name="Water Pump" status="Auto" detail="Tank 78% · 6.1A" tone="primary" />
            <DeviceTile icon={<Lightbulb className="h-5 w-5" />} name="Yard Lights" status="On" detail="4 fixtures · 1.2A" tone="warning" />
            <DeviceTile icon={<Activity className="h-5 w-5" />} name="Compressor" status="Idle" detail="0.0A · standby" tone="muted" />

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Smart alert</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Pump 2 current spiked above baseline at 4:12 PM. We paused it and notified you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeviceTile({ icon, name, status, detail, tone }: { icon: React.ReactNode; name: string; status: string; detail: string; tone: "primary" | "warning" | "muted" }) {
  const toneCls = tone === "primary" ? "bg-primary/15 text-primary" : tone === "warning" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground";
  return (
    <div className="glass flex items-center gap-4 rounded-3xl p-4">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${toneCls}`}>{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium">{status}</span>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
