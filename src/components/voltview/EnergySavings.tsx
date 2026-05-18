import { TrendingDown, Leaf, IndianRupee } from "lucide-react";

export function EnergySavings() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="ambient-blob -left-10 top-0 h-[300px] w-[300px] bg-success/30" />
          <div className="relative grid gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Monthly Insights</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                You saved <span className="text-gradient">₹420</span> this month.
              </h2>
              <p className="mt-4 text-muted-foreground">
                VoltView quietly tunes schedules and load patterns in the background. Every rupee saved
                arrives as a friendly report — never a wall of charts.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { i: IndianRupee, v: "₹420", l: "Saved" },
                  { i: TrendingDown, v: "-18%", l: "Load avg" },
                  { i: Leaf, v: "21 kg", l: "CO₂ avoided" },
                ].map(({ i: I, v, l }) => (
                  <div key={l} className="rounded-2xl bg-surface p-3 text-center">
                    <I className="mx-auto h-4 w-4 text-success" />
                    <p className="mt-2 font-display text-lg font-semibold">{v}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-surface p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Daily savings · this month</p>
                <div className="mt-6 flex h-44 items-end gap-1.5">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const h = 30 + Math.abs(Math.sin(i * 0.7)) * 60 + (i % 4) * 6;
                    return (
                      <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary-glow" style={{ height: `${h}%` }} />
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                  <span>1</span><span>10</span><span>20</span><span>30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
