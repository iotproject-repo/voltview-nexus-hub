import { createFileRoute, redirect } from "@tanstack/react-router";
import { AddDevice } from "@/pages/AddDevice";
import { isAuthenticated } from "@/lib/auth-store";

export const Route = createFileRoute("/add-device")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  head: () => ({
    meta: [
      { title: "Add Device — VoltView" },
      { name: "description", content: "Connect a new device to your VoltView workspace." },
    ],
  }),
  component: AddDevice,
});
