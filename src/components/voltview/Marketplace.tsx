import { Moon, Droplets, ShieldCheck, Sun, Zap, Calendar } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const routines = [
  { icon: Moon, t: "Night Saver Mode", d: "Dims non-essentials & caps motor load after 10 PM.", tag: "Energy", installs: "8.2k" },
  { icon: Droplets, t: "Smart Farm Watering", d: "Tank + soil aware irrigation, sunrise scheduled.", tag: "Agriculture", installs: "4.5k" },
  { icon: ShieldCheck, t: "Auto Protection Rules", d: "Voltage, overload & dry-run guards in one click.", tag: "Safety", installs: "12.1k" },
  { icon: Sun, t: "Solar Priority", d: "Run heavy loads when panels peak. Save the grid.", tag: "Energy", installs: "3.7k" },
  { icon: Zap, t: "Industrial Soft-Start", d: "Sequenced startups to flatten current spikes.", tag: "Industrial", installs: "2.1k" },
  { icon: Calendar, t: "Seasonal Schedules", d: "Adjusts pump timing across monsoon & summer.", tag: "Agriculture", installs: "5.6k" },
];

export function Marketplace() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Automation Marketplace"
          title="An App Store for electrical intelligence."
          subtitle="One-tap routines built by experts and tuned by AI — install in seconds, edit anytime."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routines.map(({ icon: Icon, t, d, tag, installs }) => (
            <div key={t} className="group glass rounded-3xl p-6 transition hover:-translate-y-1 hover:glow">
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">{tag}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{installs} installed</span>
                <button className="rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition hover:opacity-90">
                  Install
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
