import { CalendarClock, Plus } from "lucide-react";

export function SchedulerCard() {
  return (
    <section className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <CalendarClock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Scheduler</h3>
            <p className="text-xs text-muted-foreground">Automate on/off by time or sunset</p>
          </div>
        </div>
        <button className="gradient-primary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-primary-foreground">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </section>
  );
}
