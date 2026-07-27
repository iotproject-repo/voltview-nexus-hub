export type DeviceStatus = "online" | "offline";

export interface DeviceSummary {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  model: string;
  status: DeviceStatus;
  lastSeen: string;
}

export interface DeviceCapabilities {
  relayCount?: number;
  fan?: boolean;
  fanSpeedControl?: boolean;
  scheduler?: boolean;
  energyMonitoring?: boolean;
  temperatureSensor?: boolean;
  humiditySensor?: boolean;
  waterLevelSensor?: boolean;
  motorProtection?: boolean;
}

export interface Relay {
  id: number;
  name: string;
}

export interface DeviceDetail {
  deviceId: string;
  deviceName: string;
  model: string;
  category: string;
  status: DeviceStatus;
  capabilities: DeviceCapabilities;
  relays?: Relay[];
}

const MOCK_DETAILS: Record<string, DeviceDetail> = {
  DEV001: {
    deviceId: "DEV001",
    deviceName: "Living Room Controller",
    model: "HV4F",
    category: "home_automation",
    status: "online",
    capabilities: { relayCount: 4, fan: true, fanSpeedControl: true, scheduler: true, energyMonitoring: false },
    relays: [
      { id: 1, name: "Light" },
      { id: 2, name: "Fan" },
      { id: 3, name: "Socket" },
      { id: 4, name: "Garden" },
    ],
  },
  DEV002: {
    deviceId: "DEV002",
    deviceName: "Office 8-Relay Panel",
    model: "HV8",
    category: "home_automation",
    status: "online",
    capabilities: { relayCount: 8, scheduler: true, energyMonitoring: true },
    relays: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Channel ${i + 1}` })),
  },
  DEV003: {
    deviceId: "DEV003",
    deviceName: "Farm Pump A",
    model: "AG1",
    category: "agriculture",
    status: "offline",
    capabilities: { relayCount: 1, scheduler: true, motorProtection: true },
    relays: [{ id: 1, name: "Pump" }],
  },
  DEV004: {
    deviceId: "DEV004",
    deviceName: "Greenhouse Node",
    model: "AG3S",
    category: "agriculture",
    status: "online",
    capabilities: { relayCount: 3, scheduler: true, temperatureSensor: true, humiditySensor: true },
    relays: [
      { id: 1, name: "Drip" },
      { id: 2, name: "Sprinkler" },
      { id: 3, name: "Fogger" },
    ],
  },
  DEV005: {
    deviceId: "DEV005",
    deviceName: "Borewell Pump",
    model: "WPC-Pro",
    category: "water_pump",
    status: "online",
    capabilities: { relayCount: 1, waterLevelSensor: true, motorProtection: true, scheduler: true, energyMonitoring: true },
    relays: [{ id: 1, name: "Motor" }],
  },
  DEV006: {
    deviceId: "DEV006",
    deviceName: "Main Panel Meter",
    model: "SEM-3P",
    category: "energy_meter",
    status: "online",
    capabilities: { energyMonitoring: true },
  },
};

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));



// Defensive mapper: the backend response shape may vary and some UI fields
// (deviceType, model, lastSeen) may not be present. When missing we leave
// them empty rather than invent data. The capability-based frontend
// architecture is preserved.
function mapDevice(raw: unknown): DeviceSummary | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const deviceId =
    (r.deviceId as string) ??
    (r.device_id as string) ??
    (r.id as string) ??
    (r._id as string) ??
    "";
  if (!deviceId) return null;

  const deviceName =
    (r.deviceName as string) ??
    (r.name as string) ??
    (r.label as string) ??
    deviceId;

  const deviceType =
    (r.deviceType as string) ??
    (r.type as string) ??
    (r.category as string) ??
    "";

  const model = (r.model as string) ?? (r.modelName as string) ?? "";

  const rawStatus =
    (r.status as string) ??
    (typeof r.online === "boolean" ? (r.online ? "online" : "offline") : "") ??
    (typeof r.isOnline === "boolean" ? (r.isOnline ? "online" : "offline") : "");
  const status: DeviceStatus =
    String(rawStatus).toLowerCase() === "online" ? "online" : "offline";

  const lastSeen =
    (r.lastSeen as string) ??
    (r.last_seen as string) ??
    (r.lastSeenAt as string) ??
    "";

  return { deviceId, deviceName, deviceType, model, status, lastSeen };
}

export async function getUserDevices(): Promise<DeviceSummary[]> {
  const res = await api.get<unknown>("/api/v1/devices");
  let list: unknown[] = [];
  if (Array.isArray(res)) list = res;
  else if (res && typeof res === "object") {
    const r = res as Record<string, unknown>;
    if (Array.isArray(r.devices)) list = r.devices;
    else if (Array.isArray(r.data)) list = r.data;
    else if (r.data && typeof r.data === "object" && Array.isArray((r.data as Record<string, unknown>).devices)) {
      list = (r.data as { devices: unknown[] }).devices;
    }
  }
  return list.map(mapDevice).filter((d): d is DeviceSummary => d !== null);
}

export async function getDeviceCapabilities(deviceId: string): Promise<DeviceDetail> {
  await wait(350);
  const d = MOCK_DETAILS[deviceId];
  if (!d) throw new Error("Device not found");
  return d;
}
