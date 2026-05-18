import { ShoppingCart } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const products = [
  { name: "VV Sense · CT Clamp", price: 39, tag: "Current Sensor", desc: "0.1A resolution, 20A range." },
  { name: "VV Motor Controller M1", price: 149, tag: "Controller", desc: "Soft-start + protection up to 5HP." },
  { name: "VV Relay 8-Channel", price: 89, tag: "Relay Module", desc: "Wi-Fi + LoRa, DIN-rail mount." },
  { name: "VV Home Automation Kit", price: 249, tag: "Starter Kit", desc: "Hub + 4 relays + 2 sensors." },
];

export function Store() {
  return (
    <section id="store" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Store"
          title="Hardware that matches the software."
          subtitle="Designed in-house. Calibrated, certified and ready to pair in 30 seconds."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(p => (
            <div key={p.name} className="group glass overflow-hidden rounded-3xl">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-surface to-surface-elevated">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <ProductIcon name={p.name} />
                <span className="absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur">{p.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg font-semibold">${p.price}</span>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-background transition hover:opacity-90">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductIcon({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="gradient-primary h-28 w-28 rounded-3xl opacity-90 glow rotate-[8deg] grid place-items-center">
        <span className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
          {name.split(" ")[1]?.[0] ?? "V"}
        </span>
      </div>
    </div>
  );
}
