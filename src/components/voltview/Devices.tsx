import { Cpu, Droplet, Lightbulb, ToggleRight, Factory, Gauge } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const devices = [
  { icon: Cpu, name: "Smart Motors", desc: "Soft-start, overload & dry-run protection.", tag: "From 1HP – 25HP" },
  { icon: Droplet, name: "Pump Controllers", desc: "Tank-aware automation with leak detection.", tag: "Single & 3-phase" },
  { icon: Lightbulb, name: "Smart Lighting", desc: "Schedules, scenes and motion intelligence.", tag: "Dim · Tunable" },
  { icon: ToggleRight, name: "Relay Modules", desc: "Wi-Fi & LoRa relays for any device.", tag: "4 / 8 / 16 ch" },
  { icon: Factory, name: "Industrial Control", desc: "DIN-rail controllers with Modbus.", tag: "RS-485 · MQTT" },
  { icon: Gauge, name: "Current Sensors", desc: "Non-invasive CT clamps, 0.1A precision.", tag: "20A / 100A / 400A" },
];

export function Devices() {
  return (
    <section id="devices" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Device Ecosystem"
          title="One platform. Every device."
          subtitle="A consistent design language from a single relay to an entire industrial floor."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map(({ icon: Icon, name, desc, tag }) => (
            <div key={name} className="group glass relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:glow">
              <div className="ambient-blob -right-10 -top-10 h-40 w-40 bg-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative">
                <div className="gradient-primary grid h-12 w-12 place-items-center rounded-2xl">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                <p className="mt-4 inline-block rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground">{tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
