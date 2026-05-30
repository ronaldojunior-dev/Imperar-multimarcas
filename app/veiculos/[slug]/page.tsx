import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PublicHeader } from "@/components/PublicHeader";
import { LeadForm } from "@/components/LeadForm";
import { FinanceSimulator } from "@/components/FinanceSimulator";

export const dynamic = "force-dynamic";

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, vehicle] = await Promise.all([
    prisma.settings.findFirst(),
    prisma.vehicle.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: "asc" } } }
    })
  ]);

  if (!vehicle) notFound();

  const headerList = await headers();
  await prisma.vehicleView.create({
    data: {
      vehicleId: vehicle.id,
      ip: headerList.get("x-forwarded-for"),
      userAgent: headerList.get("user-agent")
    }
  });

  const price = Number(vehicle.price);

  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>{vehicle.brand} {vehicle.model}</h1>
          <p className="muted">{vehicle.version}</p>
        </div>
        <section className="detail-grid">
          <div className="gallery">
            {vehicle.images.map((image) => <img key={image.id} src={image.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} />)}
          </div>
          <aside className="form-card">
            <h2>{price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h2>
            <p>{vehicle.description}</p>
            <p className="muted">{vehicle.year} | {vehicle.mileage.toLocaleString("pt-BR")} km | {vehicle.fuel} | {vehicle.transmission}</p>
            <a className="primary-button full" href={`https://wa.me/${settings?.whatsapp}?text=Tenho interesse no ${vehicle.brand} ${vehicle.model}`}>Enviar WhatsApp</a>
          </aside>
        </section>
        <section className="detail-grid" style={{ marginTop: 24 }}>
          <LeadForm vehicleId={vehicle.id} />
          <FinanceSimulator vehicleId={vehicle.id} price={price} />
        </section>
      </main>
    </>
  );
}
