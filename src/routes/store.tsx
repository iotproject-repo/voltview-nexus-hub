import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltview/Nav";
import { Store } from "@/components/voltview/Store";
import { Footer } from "@/components/voltview/Footer";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — VoltView" },
      { name: "description", content: "Buy current sensors, motor controllers, relays and automation kits." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-10"><Store /></div>
      <Footer />
    </div>
  ),
});
