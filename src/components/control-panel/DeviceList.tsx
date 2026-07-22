import type { DeviceSummary } from "@/lib/devices-api";
import { DeviceCard } from "./DeviceCard";

export function DeviceList({
  devices,
  selectedId,
  onSelect,
  loading,
}: {
  devices: DeviceSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading: boolean;
}) {
  return (
    <div className="glass flex h-full flex-col rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="font-display text-lg font-semibold">My Devices</h2>
        <span className="text-xs text-muted-foreground">{devices.length}</span>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass h-20 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}
        {!loading &&
          devices.map(d => (
            <DeviceCard
              key={d.deviceId}
              device={d}
              selected={selectedId === d.deviceId}
              onClick={() => onSelect(d.deviceId)}
            />
          ))}
      </div>
    </div>
  );
}
