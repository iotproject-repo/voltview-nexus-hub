import { HardHat, Handshake, BarChart3, ArrowRight } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const tracks = [
  {
    icon: HardHat,
    t: "Certified Installers",
    d: "Get trained, listed and matched with customers in your district.",
    cta: "Become an installer",
  },
  {
    icon: Handshake,
    t: "Reseller Partners",
    d: "Stock VoltView hardware with margin-friendly bundles & co-marketing.",
    cta: "Apply to resell",
  },
  {
    icon: BarChart3,
    t: "Enterprise & B2B",
    d: "Multi-site dashboards, SLA support and white-glove rollouts.",
    cta: "Talk to sales",
  },
];

export function Partners() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Partner Network"
          title="Built with a network you can trust."
          subtitle="From the village electrician to the multi-plant CIO — there's a way to grow with VoltView."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tracks.map(({ icon: Icon, t, d, cta }) => (
            <div key={t} className="group glass relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1 hover:glow">
              <div className="ambient-blob -right-10 -top-10 h-40 w-40 bg-primary/20 opacity-0 transition group-hover:opacity-60" />
              <div className="relative">
                <div className="gradient-primary grid h-12 w-12 place-items-center rounded-2xl">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <button className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:gap-2.5">
                  {cta} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
