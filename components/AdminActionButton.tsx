"use client";

import { useRouter } from "next/navigation";

export function AdminActionButton({ vehicleId, action, label }: { vehicleId: string; action: string; label: string }) {
  const router = useRouter();

  async function run() {
    await fetch(`/api/vehicles/${vehicleId}/actions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action })
    });
    router.refresh();
  }

  return <button className="outline-button" type="button" onClick={run}>{label}</button>;
}
