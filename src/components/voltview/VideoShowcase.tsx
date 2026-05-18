import { Play, Tractor, Home, Factory, Wrench } from "lucide-react";
import { SectionHeader } from "./LiveDashboard";

const videos = [
  { icon: Play, t: "Platform overview", d: "90 seconds inside VoltView.", tone: "from-primary/40 to-primary-glow/20" },
  { icon: Tractor, t: "On the farm", d: "How Ravi runs 6 pumps remotely.", tone: "from-success/30 to-primary/20" },
  { icon: Home, t: "In the home", d: "A calm smart-home control room.", tone: "from-primary-glow/30 to-warning/20" },
  { icon: Factory, t: "On the floor", d: "Industrial monitoring at scale.", tone: "from-primary/30 to-foreground/10" },
  { icon: Wrench, t: "Installation", d: "From box to first reading in 5 min.", tone: "from-warning/30 to-primary/20" },
  { icon: Play, t: "Realtime dashboard", d: "Live current, alerts, automations.", tone: "from-primary-glow/40 to-primary/30" },
];

export function VideoShowcase() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="See It In Motion"
          title="Watch the system breathe."
          subtitle="Real installations, real dashboards, real people — captured in cinematic detail."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map(({ icon: Icon, t, d, tone }, i) => (
            <button
              key={t}
              className="group glass relative aspect-video overflow-hidden rounded-3xl text-left transition hover:-translate-y-1 hover:glow"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tone}`} />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                {String(i + 1).padStart(2, "0")} · 0:{(45 + i * 7).toString().padStart(2, "0")}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="gradient-primary grid h-16 w-16 place-items-center rounded-full glow transition group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
