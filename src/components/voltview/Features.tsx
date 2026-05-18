import { Shield, Droplets, Calendar, Bell, Leaf, Workflow } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const features = [
  { icon: Shield, t: "Overload Protection", d: "Auto cut-off the instant current crosses your safe threshold." },
  { icon: Droplets, t: "Dry-Run Protection", d: "Pumps stop themselves when tanks run empty — no burnt motors." },
  { icon: Workflow, t: "Automations", d: "If-this-then-that flows across every device, no coding required." },
  { icon: Calendar, t: "Scheduling", d: "Calendar-grade scheduling with sunrise/sunset & seasonal logic." },
  { icon: Bell, t: "Smart Alerts", d: "Whisper-quiet notifications. Only what matters reaches you." },
  { icon: Leaf, t: "Energy Savings", d: "AI-tuned setpoints quietly trim 10–20% off your bill." },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="ambient-blob left-0 top-1/2 h-[400px] w-[400px] bg-primary/20" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Smart Features"
          title="Quiet protection. Loud savings."
          subtitle="Every device gets industrial-grade safety baked in — no extra hardware, no setup."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-card p-7 transition hover:bg-surface-elevated">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
