import { MousePointerClick } from "lucide-react";

export function EmptyState() {
  return (
    <div className="glass flex h-full min-h-[400px] items-center justify-center rounded-3xl p-8">
      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary glow">
          <MousePointerClick className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold">Select a device</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Pick a device from the list to view live controls, sensors, and automations.
        </p>
      </div>
    </div>
  );
}
