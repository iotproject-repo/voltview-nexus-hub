import type { DeviceSummary } from "@/lib/devices-api";
import { Cpu } from "lucide-react";

export function DeviceCard({
  device,
  selected,
  onClick,
}: {
  device: DeviceSummary;
  selected: boolean;
  onClick: () => void;
}) {
  const online = device.status === "online";
  return (
    <button
      onClick={onClick}
      className={`w-full text-left glass rounded-2xl p-4 transition hover:border-primary/50 ${
        selected ? "border-primary/70 bg-primary/5" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Cpu className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-medium">{device.deviceName}</p>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={`h-2 w-2 rounded-full ${online ? "bg-success animate-pulse-glow" : "bg-muted-foreground/50"}`}
              />
              {online ? "Online" : "Offline"}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {device.deviceType} · {device.model}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground/80">
            ID {device.deviceId} · Last seen {device.lastSeen}
          </p>
        </div>
      </div>
    </button>
  );
}
