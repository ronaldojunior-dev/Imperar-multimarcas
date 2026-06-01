import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { FinanceSimulator } from "@/components/FinanceSimulator";

export const dynamic = "force-dynamic";

export default async function FinancingPage() {
  return (
    <>
      <PublicHeader />
      <main className="content-shell">
        <div className="page-title">
          <h1>Financiamento</h1>
          <p className="muted">Simule e grave sua proposta no banco de dados.</p>
        </div>
        <FinanceSimulator />
      </main>
      <PublicFooter />
    </>
  );
}
