import type { DeviceDetail } from "@/lib/devices-api";
import { RelayPanel } from "./RelayPanel";
import { FanSlider } from "./FanSlider";
import { SchedulerCard } from "./SchedulerCard";
import { EnergyCards } from "./EnergyCards";
import { SensorCards } from "./SensorCards";
import { ProtectionCards } from "./ProtectionCards";

export function ControlRenderer({ device }: { device: DeviceDetail }) {
  const c = device.capabilities ?? {};
  const online = device.status === "online";

  return (
    <div className="space-y-5">
      <header className="glass flex flex-wrap items-center justify-between gap-3 rounded-3xl p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {device.category.replace(/_/g, " ")} · {device.model}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold">{device.deviceName}</h2>
          <p className="text-xs text-muted-foreground">ID {device.deviceId}</p>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ${online ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
          <span className={`h-2 w-2 rounded-full ${online ? "bg-success animate-pulse-glow" : "bg-muted-foreground/60"}`} />
          {online ? "Online" : "Offline"}
        </span>
      </header>

      {!!c.relayCount && c.relayCount > 0 && (
        <RelayPanel count={c.relayCount} relays={device.relays} deviceId={device.deviceId} disabled={!online} />
      )}

      {c.fanSpeedControl && <FanSlider />}

      {c.scheduler && <SchedulerCard />}

      {c.energyMonitoring && <EnergyCards />}

      {(c.temperatureSensor || c.humiditySensor || c.waterLevelSensor) && (
        <SensorCards
          temperature={c.temperatureSensor}
          humidity={c.humiditySensor}
          waterLevel={c.waterLevelSensor}
        />
      )}

      {c.motorProtection && <ProtectionCards />}
    </div>
  );
}
