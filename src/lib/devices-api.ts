import { api } from "./api-client";

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

  let rawStatus: string = (r.status as string) ?? "";
  if (!rawStatus && typeof r.online === "boolean") rawStatus = r.online ? "online" : "offline";
  if (!rawStatus && typeof r.isOnline === "boolean") rawStatus = r.isOnline ? "online" : "offline";
  const status: DeviceStatus = rawStatus.toLowerCase() === "online" ? "online" : "offline";

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

// Unwrap common backend envelopes: raw object, { data: {...} }, { device: {...} }
function unwrap(res: unknown): Record<string, unknown> | null {
  if (!res || typeof res !== "object") return null;
  const r = res as Record<string, unknown>;
  if (r.device && typeof r.device === "object") return r.device as Record<string, unknown>;
  if (r.data && typeof r.data === "object") {
    const d = r.data as Record<string, unknown>;
    if (d.device && typeof d.device === "object") return d.device as Record<string, unknown>;
    return d;
  }
  return r;
}

function mapCapabilities(raw: unknown): DeviceCapabilities {
  if (!raw || typeof raw !== "object") return {};
  const c = raw as Record<string, unknown>;
  const out: DeviceCapabilities = {};
  if (typeof c.relayCount === "number") out.relayCount = c.relayCount;
  else if (typeof c.relays === "number") out.relayCount = c.relays as number;
  if (typeof c.fan === "boolean") out.fan = c.fan;
  if (typeof c.fanSpeedControl === "boolean") out.fanSpeedControl = c.fanSpeedControl;
  if (typeof c.scheduler === "boolean") out.scheduler = c.scheduler;
  if (typeof c.energyMonitoring === "boolean") out.energyMonitoring = c.energyMonitoring;
  if (typeof c.temperatureSensor === "boolean") out.temperatureSensor = c.temperatureSensor;
  if (typeof c.humiditySensor === "boolean") out.humiditySensor = c.humiditySensor;
  if (typeof c.waterLevelSensor === "boolean") out.waterLevelSensor = c.waterLevelSensor;
  if (typeof c.motorProtection === "boolean") out.motorProtection = c.motorProtection;
  return out;
}

function mapRelays(raw: unknown): Relay[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const relays: Relay[] = [];
  raw.forEach((item, idx) => {
    if (!item || typeof item !== "object") return;
    const r = item as Record<string, unknown>;
    const id = typeof r.id === "number" ? r.id : typeof r.index === "number" ? r.index : idx + 1;
    const name = (r.name as string) ?? (r.label as string) ?? `Relay ${id}`;
    relays.push({ id, name });
  });
  return relays.length ? relays : undefined;
}

export async function getDeviceCapabilities(deviceId: string): Promise<DeviceDetail> {
  const res = await api.get<unknown>(`/api/v1/devices/${encodeURIComponent(deviceId)}`);
  const d = unwrap(res);
  if (!d) throw new Error("Device not found");

  const id =
    (d.deviceId as string) ??
    (d.device_id as string) ??
    (d.id as string) ??
    (d._id as string) ??
    deviceId;

  const deviceName =
    (d.deviceName as string) ??
    (d.name as string) ??
    (d.label as string) ??
    id;

  const model = (d.model as string) ?? (d.modelName as string) ?? "";
  const category =
    (d.category as string) ??
    (d.deviceType as string) ??
    (d.type as string) ??
    "";

  let rawStatus: string = (d.status as string) ?? "";
  if (!rawStatus && typeof d.online === "boolean") rawStatus = d.online ? "online" : "offline";
  if (!rawStatus && typeof d.isOnline === "boolean") rawStatus = d.isOnline ? "online" : "offline";
  const status: DeviceStatus = rawStatus.toLowerCase() === "online" ? "online" : "offline";

  const capabilities = mapCapabilities(d.capabilities);
  const relays = mapRelays(d.relays);

  return { deviceId: id, deviceName, model, category, status, capabilities, relays };
}

