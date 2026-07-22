import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";

const addDeviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  deviceToken: z.string().min(1, "Device Token is required"),
});

type AddDeviceFormValues = z.infer<typeof addDeviceSchema>;

export function AddDeviceForm() {
  const navigate = useNavigate({ from: "/add-device" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeviceFormValues>({
    resolver: zodResolver(addDeviceSchema),
    defaultValues: {
      deviceId: "",
      deviceToken: "",
    },
  });

  const handleAddDevice = async (values: AddDeviceFormValues) => {
    setIsSubmitting(true);

    // Placeholder submission — no backend connection yet.
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log({
      deviceId: values.deviceId,
      deviceToken: values.deviceToken,
    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleAddDevice)} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="deviceId" className="text-sm font-medium text-foreground">
          Device ID
        </label>
        <input
          id="deviceId"
          type="text"
          placeholder="Enter Device ID"
          {...register("deviceId")}
          className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        {errors.deviceId && (
          <p className="text-xs text-destructive">{errors.deviceId.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="deviceToken" className="text-sm font-medium text-foreground">
          Device Token
        </label>
        <input
          id="deviceToken"
          type="password"
          placeholder="Enter Device Token"
          {...register("deviceToken")}
          className="w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
        {errors.deviceToken && (
          <p className="text-xs text-destructive">{errors.deviceToken.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-primary inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding…
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Device
            </>
          )}
        </button>
        <Link
          to="/dashboard"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-input bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
