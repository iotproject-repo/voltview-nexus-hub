import { useState } from "react";
import { Loader2, Power } from "lucide-react";
import { sendMotorCommand, type Relay } from "@/lib/devices-api";

export function RelayPanel({
  count,
  relays,
  deviceId,
  disabled,
}: {
  count: number;
  relays?: Relay[];
  deviceId: string;
  disabled?: boolean;
}) {
  const list: Relay[] =
    relays && relays.length
      ? relays
      : Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Relay ${i + 1}` }));

  const [on, setOn] = useState<Record<number, boolean>>({});
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggle(id: number) {
    if (pending !== null || disabled) return;
    const next = !on[id];
    setPending(id);
    setError(null);
    try {
      await sendMotorCommand(deviceId, next ? "on" : "off");
      setOn(s => ({ ...s, [id]: next }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Command failed");
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Relays</h3>
        <span className="text-xs text-muted-foreground">{list.length} channels</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map(r => {
          const active = !!on[r.id];
          const busy = pending === r.id;
          return (
            <button
              key={r.id}
              onClick={() => toggle(r.id)}
              disabled={disabled || pending !== null}
              className={`flex items-center justify-between rounded-2xl border p-4 transition disabled:cursor-not-allowed disabled:opacity-60 ${
                active
                  ? "border-primary/60 bg-primary/10"
                  : "border-border bg-surface hover:border-primary/30"
              }`}
            >
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Channel {r.id}</p>
                <p className="font-medium">{r.name}</p>
              </div>
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  active ? "gradient-primary text-primary-foreground glow" : "bg-surface-elevated text-muted-foreground"
                }`}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Power className="h-4 w-4" />}
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
    </section>
  );
}
