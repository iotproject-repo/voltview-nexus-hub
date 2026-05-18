import { Power, Droplet, Lightbulb, Activity } from "lucide-react";
import { LiveChart } from "./LiveChart";

export function AppPreview() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Mobile App</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Same calm.<br />Pocket sized.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              The VoltView mobile app shares pixel-perfect parity with the web dashboard.
              No re-learning. No surprises. Just instant control.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background">App Store</button>
              <button className="glass rounded-xl px-5 py-3 text-sm font-medium">Google Play</button>
            </div>
          </div>

          <div className="relative flex justify-center gap-6">
            <Phone tilt="-rotate-6">
              <div className="px-5 pt-12">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Home</p>
                <h4 className="font-display text-lg font-semibold">Devices</h4>
                <div className="mt-4 space-y-2.5">
                  {[
                    { i: Power, n: "Main Motor", s: "Running" },
                    { i: Droplet, n: "Water Pump", s: "Auto" },
                    { i: Lightbulb, n: "Yard Lights", s: "On" },
                    { i: Activity, n: "Compressor", s: "Idle" },
                  ].map(({ i: I, n, s }) => (
                    <div key={n} className="flex items-center gap-3 rounded-xl bg-surface-elevated p-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
                        <I className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{n}</p>
                        <p className="text-[10px] text-muted-foreground">{s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Phone>
            <Phone tilt="rotate-6" className="mt-12 hidden sm:block">
              <div className="px-5 pt-12">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Bay 02</p>
                <h4 className="font-display text-lg font-semibold">Main Motor</h4>
                <div className="mt-4 rounded-2xl bg-surface-elevated p-3">
                  <p className="font-display text-2xl font-semibold">14.2A</p>
                  <p className="text-[10px] text-muted-foreground">Healthy · 232V</p>
                  <div className="mt-2"><LiveChart height={70} /></div>
                </div>
                <button className="gradient-primary mt-4 w-full rounded-xl py-2.5 text-xs font-medium text-primary-foreground">
                  <Power className="mr-1 inline h-3 w-3" /> Stop motor
                </button>
              </div>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone({ children, tilt = "", className = "" }: { children: React.ReactNode; tilt?: string; className?: string }) {
  return (
    <div className={`${tilt} ${className} relative h-[520px] w-[260px] rounded-[44px] border border-border bg-card p-2 shadow-2xl`}>
      <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-background" />
      <div className="h-full w-full overflow-hidden rounded-[36px] bg-background">
        {children}
      </div>
    </div>
  );
}
