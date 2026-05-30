import { prisma } from "@/lib/prisma";
import { PublicHeader } from "@/components/PublicHeader";
import { VehicleCard } from "@/components/VehicleCard";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function EstoquePage({ searchParams }: { searchParams: Promise<{ q?: string; brand?: string }> }) {
  const filters = await searchParams;
  const settings = await prisma.settings.findFirst();
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: { in: ["ATIVO", "RESERVADO"] },
      ...(filters.brand ? { brand: { equals: filters.brand, mode: "insensitive" } } : {}),
      ...(filters.q
        ? {
            OR: [
              { model: { contains: filters.q, mode: "insensitive" } },
              { version: { contains: filters.q, mode: "insensitive" } }
            ]
          }
        : {})
    },
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>Estoque</h1>
          <p className="muted">Filtros, busca e ordenação trabalham sobre os veículos cadastrados no banco.</p>
        </div>
        <form className="form-card form-grid" action="/estoque">
          <label className="field"><span>Marca</span><input name="brand" defaultValue={filters.brand} /></label>
          <label className="field"><span>Buscar</span><input name="q" defaultValue={filters.q} /></label>
          <button className="primary-button full" type="submit">Filtrar estoque</button>
        </form>
        <div className="vehicle-grid" style={{ marginTop: 24 }}>
          {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
        </div>
      </main>
    </>
  );
}
