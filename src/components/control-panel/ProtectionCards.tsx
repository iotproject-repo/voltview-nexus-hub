import { ShieldCheck, ShieldAlert, Droplets, Zap } from "lucide-react";

const items = [
  { l: "Dry Run", v: "Safe", i: Droplets, ok: true },
  { l: "Overload", v: "Normal", i: Zap, ok: true },
  { l: "Phase Failure", v: "OK", i: ShieldCheck, ok: true },
  { l: "Protection Status", v: "Armed", i: ShieldAlert, ok: true },
];

export function ProtectionCards() {
  return (
    <section>
      <h3 className="mb-3 font-display text-base font-semibold">Motor Protection</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ l, v, i: I, ok }) => (
          <div key={l} className="glass rounded-2xl p-4">
            <span className={`grid h-9 w-9 place-items-center rounded-xl ${ok ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
              <I className="h-4 w-4" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{l}</p>
            <p className="font-display text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
