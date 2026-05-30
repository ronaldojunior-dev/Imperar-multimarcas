import { PublicHeader } from "@/components/PublicHeader";
import { FinanceSimulator } from "@/components/FinanceSimulator";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FinancingPage() {
  const settings = await prisma.settings.findFirst();
  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>Financiamento</h1>
          <p className="muted">Simule e grave sua proposta no banco de dados.</p>
        </div>
        <FinanceSimulator />
      </main>
    </>
  );
}
