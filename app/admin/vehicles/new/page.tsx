import { AdminShell } from "@/components/AdminShell";
import { VehicleAdminForm } from "@/components/VehicleAdminForm";

export const dynamic = "force-dynamic";

export default function NewVehiclePage() {
  return (
    <AdminShell>
      <h1>Cadastrar veículo</h1>
      <VehicleAdminForm />
    </AdminShell>
  );
}
