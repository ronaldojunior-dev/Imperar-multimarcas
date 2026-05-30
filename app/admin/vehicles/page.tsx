import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";
import { AdminActionButton } from "@/components/AdminActionButton";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div className="section-heading">
        <h1>Veículos</h1>
        <Link className="primary-button" href="/admin/vehicles/new">Cadastrar veículo</Link>
      </div>
      <div className="admin-card">
        <table className="table">
          <thead><tr><th>Veículo</th><th>Status</th><th>Preço</th><th>Ações</th></tr></thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.brand} {vehicle.model}<br /><span className="muted">{vehicle.version}</span></td>
                <td>{vehicle.status} {vehicle.featured ? " | destaque" : ""}</td>
                <td>{Number(vehicle.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>
                  <Link className="outline-button" href={`/admin/vehicles/${vehicle.id}`}>Editar</Link>{" "}
                  <AdminActionButton vehicleId={vehicle.id} action="feature" label="Destacar" />
                  <AdminActionButton vehicleId={vehicle.id} action="sold" label="Vendido" />
                  <AdminActionButton vehicleId={vehicle.id} action="reserved" label="Reservar" />
                  <AdminActionButton vehicleId={vehicle.id} action="archive" label="Arquivar" />
                  <AdminActionButton vehicleId={vehicle.id} action="duplicate" label="Duplicar" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
