import { PublicHeader } from "@/components/PublicHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await prisma.settings.findFirst();
  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>Quem somos</h1>
          <p className="muted">A Imperar Multimarcas trabalha com veículos selecionados, laudo de procedência, financiamento e atendimento consultivo.</p>
        </div>
      </main>
    </>
  );
}
