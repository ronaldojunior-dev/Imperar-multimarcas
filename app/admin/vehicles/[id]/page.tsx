import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";
import { VehicleAdminForm } from "@/components/VehicleAdminForm";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } }
  });

  if (!vehicle) notFound();

  return (
    <AdminShell>
      <h1>Editar veículo</h1>
      <VehicleAdminForm initial={{ ...vehicle, price: vehicle.price.toString() }} />
    </AdminShell>
  );
}
