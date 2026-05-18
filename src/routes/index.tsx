import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/voltview/Nav";
import { Hero } from "@/components/voltview/Hero";
import { VideoShowcase } from "@/components/voltview/VideoShowcase";
import { LiveDashboard } from "@/components/voltview/LiveDashboard";
import { Devices } from "@/components/voltview/Devices";
import { Features } from "@/components/voltview/Features";
import { Marketplace } from "@/components/voltview/Marketplace";
import { EnergySavings } from "@/components/voltview/EnergySavings";
import { AIFuture } from "@/components/voltview/AIFuture";
import { Testimonials } from "@/components/voltview/Testimonials";
import { Partners } from "@/components/voltview/Partners";
import { Store } from "@/components/voltview/Store";
import { AppPreview } from "@/components/voltview/AppPreview";
import { Footer } from "@/components/voltview/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoltView — The operating system for electrical intelligence" },
      { name: "description", content: "Realtime monitoring, smart automation, and intelligent protection for homes, farms, and industries. One calm platform for every electrical device." },
      { property: "og:title", content: "VoltView — Control every electrical device intelligently" },
      { property: "og:description", content: "The unified smart electrical control ecosystem for motors, pumps, smart homes and industrial systems." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <div id="demo"><VideoShowcase /></div>
      <LiveDashboard />
      <Devices />
      <Features />
      <div id="marketplace"><Marketplace /></div>
      <EnergySavings />
      <AIFuture />
      <Testimonials />
      <div id="partners"><Partners /></div>
      <Store />
      <AppPreview />
      <Footer />
    </div>
  );
}
