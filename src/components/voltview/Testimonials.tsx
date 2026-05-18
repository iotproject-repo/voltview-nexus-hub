import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const stats = [
  { v: "12,480+", l: "Devices connected" },
  { v: "99.98%", l: "Platform uptime" },
  { v: "47k+", l: "Installations" },
  { v: "₹3.1Cr", l: "Saved by users" },
];

const reviews = [
  {
    name: "Ravi K.",
    role: "Farmer · Nashik",
    body: "I haven't burnt a motor in two seasons. The pump pauses itself when the tank is empty — it just works.",
  },
  {
    name: "Priya M.",
    role: "Homeowner · Bengaluru",
    body: "My parents use the app daily. Big buttons, calm colours, zero confusion. That's rare.",
  },
  {
    name: "Anand S.",
    role: "Plant Manager · Pune",
    body: "We replaced three dashboards with VoltView. Alerts are quieter, but we catch more.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="ambient-blob right-0 top-20 h-[360px] w-[360px] bg-primary-glow/20" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Trusted Everywhere"
          title="Farms, factories, families."
          subtitle="From a single pump in a village to a 400-device industrial floor — one trusted platform."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(s => (
            <div key={s.l} className="bg-card p-6 text-center">
              <p className="font-display text-3xl font-semibold text-gradient">{s.v}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {reviews.map(r => (
            <div key={r.name} className="glass rounded-3xl p-6">
              <Quote className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{r.body}"</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
                <div className="flex gap-0.5 text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
