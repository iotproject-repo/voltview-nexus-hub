import { Activity, Gauge, Plug, Zap } from "lucide-react";

const stats = [
  { l: "Voltage", v: "231 V", i: Plug },
  { l: "Current", v: "6.2 A", i: Activity },
  { l: "Power", v: "1.43 kW", i: Gauge },
  { l: "Energy", v: "128 kWh", i: Zap },
];

export function EnergyCards() {
  return (
    <section>
      <h3 className="mb-3 font-display text-base font-semibold">Energy Monitoring</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ l, v, i: I }) => (
          <div key={l} className="glass rounded-2xl p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <I className="h-4 w-4" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{l}</p>
            <p className="font-display text-xl font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
