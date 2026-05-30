import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalVehicles, activeVehicles, soldVehicles, leads, featured, views] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { status: "ATIVO" } }),
    prisma.vehicle.count({ where: { status: "VENDIDO" } }),
    prisma.lead.count(),
    prisma.vehicle.count({ where: { featured: true } }),
    prisma.vehicleView.count()
  ]);

  const cards = [
    ["Total veículos", totalVehicles],
    ["Veículos ativos", activeVehicles],
    ["Veículos vendidos", soldVehicles],
    ["Leads recebidos", leads],
    ["Veículos em destaque", featured],
    ["Visualizações", views]
  ];

  return (
    <AdminShell>
      <h1>Dashboard</h1>
      <section className="admin-grid">
        {cards.map(([label, value]) => (
          <article className="admin-card" key={label}>
            <span className="muted">{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
