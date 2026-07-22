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

const MOCK_DEVICES: DeviceSummary[] = [
  { deviceId: "DEV001", deviceName: "Living Room Controller", deviceType: "Home Automation", model: "HV4F", status: "online", lastSeen: "just now" },
  { deviceId: "DEV002", deviceName: "Office 8-Relay Panel", deviceType: "Home Automation", model: "HV8", status: "online", lastSeen: "2 min ago" },
  { deviceId: "DEV003", deviceName: "Farm Pump A", deviceType: "Agriculture Controller", model: "AG1", status: "offline", lastSeen: "3 hours ago" },
  { deviceId: "DEV004", deviceName: "Greenhouse Node", deviceType: "Agriculture Controller", model: "AG3S", status: "online", lastSeen: "1 min ago" },
  { deviceId: "DEV005", deviceName: "Borewell Pump", deviceType: "Water Pump Controller", model: "WPC-Pro", status: "online", lastSeen: "just now" },
  { deviceId: "DEV006", deviceName: "Main Panel Meter", deviceType: "Smart Energy Meter", model: "SEM-3P", status: "online", lastSeen: "just now" },
];

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

export async function getUserDevices(): Promise<DeviceSummary[]> {
  await wait(250);
  return MOCK_DEVICES;
}

export async function getDeviceCapabilities(deviceId: string): Promise<DeviceDetail> {
  await wait(350);
  const d = MOCK_DETAILS[deviceId];
  if (!d) throw new Error("Device not found");
  return d;
}
