import { Droplet, Thermometer, Waves } from "lucide-react";

export function SensorCards({
  temperature,
  humidity,
  waterLevel,
}: {
  temperature?: boolean;
  humidity?: boolean;
  waterLevel?: boolean;
}) {
  const items: { l: string; v: string; i: typeof Droplet }[] = [];
  if (temperature) items.push({ l: "Temperature", v: "27.4 °C", i: Thermometer });
  if (humidity) items.push({ l: "Humidity", v: "62 %", i: Droplet });
  if (waterLevel) items.push({ l: "Water Tank", v: "78 %", i: Waves });
  if (!items.length) return null;
  return (
    <section>
      <h3 className="mb-3 font-display text-base font-semibold">Sensors</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ l, v, i: I }) => (
          <div key={l} className="glass rounded-2xl p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <I className="h-4 w-4" />
            </span>
            <p className="mt-3 text-xs text-muted-foreground">{l}</p>
            <p className="font-display text-xl font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
