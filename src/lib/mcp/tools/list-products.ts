import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PRODUCTS = [
  { id: "vv-hub-pro", name: "VoltView Hub Pro", category: "Gateway", price_inr: 8999, description: "Central AI-powered controller for the VoltView ecosystem." },
  { id: "vv-relay-4", name: "VoltView Smart Relay (4-Channel)", category: "Automation", price_inr: 3499, description: "4-channel Wi-Fi relay with energy metering and scheduling." },
  { id: "vv-fan-ctrl", name: "VoltView Fan Controller", category: "Automation", price_inr: 1799, description: "Smart fan speed controller with silent triac dimming." },
  { id: "vv-energy-meter", name: "VoltView Energy Meter", category: "Metering", price_inr: 4499, description: "3-phase real-time energy meter with cloud dashboards." },
  { id: "vv-motor-guard", name: "VoltView Motor Guard", category: "Protection", price_inr: 5999, description: "Motor protection with dry-run, overload, and voltage guard." },
  { id: "vv-sensor-pack", name: "VoltView Sensor Pack", category: "Sensing", price_inr: 2299, description: "Temperature, humidity, and current sensor bundle." },
];

export default defineTool({
  name: "list_products",
  title: "List VoltView products",
  description: "Return the public VoltView product catalog with pricing and descriptions.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category filter, e.g. Automation, Metering, Protection, Sensing, Gateway."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category
      ? PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      : PRODUCTS;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { products: items },
    };
  },
});
