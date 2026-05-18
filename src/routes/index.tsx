import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltview/Nav";
import { Hero } from "@/components/voltview/Hero";
import { LiveDashboard } from "@/components/voltview/LiveDashboard";
import { Devices } from "@/components/voltview/Devices";
import { Features } from "@/components/voltview/Features";
import { AIFuture } from "@/components/voltview/AIFuture";
import { Store } from "@/components/voltview/Store";
import { AppPreview } from "@/components/voltview/AppPreview";
import { Footer } from "@/components/voltview/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoltView — Intelligent IoT control for motors, pumps & lights" },
      { name: "description", content: "Realtime current monitoring and smart device control. Tesla-grade design, beginner-friendly simplicity, enterprise-ready intelligence." },
      { property: "og:title", content: "VoltView — Intelligent IoT control" },
      { property: "og:description", content: "Control every amp. Trust every device. The calm operating system for the electrical world." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LiveDashboard />
      <Devices />
      <Features />
      <AIFuture />
      <Store />
      <AppPreview />
      <Footer />
    </div>
  );
}
