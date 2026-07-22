import { useEffect } from "react";
import { AddDeviceForm } from "@/components/AddDeviceForm";
import { Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AddDevice() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[500px]">
        <Link
          to="/dashboard"
          className="mb-6 flex items-center justify-center gap-2 text-foreground transition hover:text-primary"
        >
          <div className="gradient-primary grid h-8 w-8 place-items-center rounded-xl glow">
            <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold">VoltView</span>
        </Link>

        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Add New Device
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your Device ID and Device Token to connect your device.
            </p>
          </div>

          <AddDeviceForm />
        </div>
      </div>
    </div>
  );
}
