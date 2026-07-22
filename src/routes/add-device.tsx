import { createFileRoute } from "@tanstack/react-router";
import { AddDevice } from "@/pages/AddDevice";

export const Route = createFileRoute("/add-device")({
  head: () => ({
    meta: [
      { title: "Add Device — VoltView" },
      { name: "description", content: "Connect a new device to your VoltView workspace." },
    ],
  }),
  component: AddDevice,
});
