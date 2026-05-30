import { PublicHeader } from "@/components/PublicHeader";
import { LeadForm } from "@/components/LeadForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SellCarPage() {
  const settings = await prisma.settings.findFirst();
  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>Vender seu carro</h1>
          <p className="muted">A solicitação entra como lead do tipo venda de veículo.</p>
        </div>
        <LeadForm type="VENDA_VEICULO" />
      </main>
    </>
  );
}
