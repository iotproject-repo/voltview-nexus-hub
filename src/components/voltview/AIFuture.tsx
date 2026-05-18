import { Sparkles, Brain, Waves } from "lucide-react";

export function AIFuture() {
  return (
    <section id="ai" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
          <div className="ambient-blob -top-20 right-10 h-[300px] w-[300px] bg-primary-glow/40" />
          <div className="ambient-blob -bottom-20 left-10 h-[300px] w-[300px] bg-primary/40" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">VoltView AI · Coming soon</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Devices that <span className="text-gradient">predict</span> their own future.
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Our ambient AI learns each motor's heartbeat. It catches what humans miss —
                weeks before a failure, days before a spike, seconds before a fault.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { i: Brain, t: "Predictive maintenance", d: "Forecasts wear & schedules service." },
                  { i: Sparkles, t: "AI recommendations", d: "Personalised energy & runtime suggestions." },
                  { i: Waves, t: "Abnormal current detection", d: "Anomalies surface before they're problems." },
                ].map(({ i: I, t, d }) => (
                  <div key={t} className="flex gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <I className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AIVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function AIVisual() {
  return (
    <div className="relative grid place-items-center">
      <div className="relative h-80 w-80">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-glow"
            style={{ animationDelay: `${i * 0.5}s`, transform: `scale(${0.4 + i * 0.2})` }}
          />
        ))}
        <div className="absolute inset-0 grid place-items-center">
          <div className="gradient-primary grid h-24 w-24 place-items-center rounded-full glow">
            <Sparkles className="h-9 w-9 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
