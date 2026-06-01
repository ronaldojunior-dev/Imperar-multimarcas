import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { LeadForm } from "@/components/LeadForm";

export const dynamic = "force-dynamic";

export default async function SellCarPage() {
  return (
    <>
      <PublicHeader />
      <main className="content-shell">
        <div className="page-title">
          <h1>Vender seu carro</h1>
          <p className="muted">A solicitação entra como lead do tipo venda de veículo.</p>
        </div>
        <LeadForm type="VENDA_VEICULO" />
      </main>
      <PublicFooter />
    </>
  );
}
