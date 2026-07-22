import { useState } from "react";
import { Fan } from "lucide-react";

export function FanSlider() {
  const [speed, setSpeed] = useState(3);
  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <Fan className={`h-4 w-4 ${speed > 0 ? "animate-spin" : ""}`} style={{ animationDuration: `${2 / Math.max(speed, 1)}s` }} />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Fan Speed</h3>
            <p className="text-xs text-muted-foreground">Level {speed} of 5</p>
          </div>
        </div>
        <span className="font-display text-2xl font-semibold">{speed}</span>
      </div>
      <input
        type="range"
        min={0}
        max={5}
        value={speed}
        onChange={e => setSpeed(Number(e.target.value))}
        className="w-full accent-[var(--primary)]"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        {["Off", "1", "2", "3", "4", "5"].map(l => <span key={l}>{l}</span>)}
      </div>
    </section>
  );
}
