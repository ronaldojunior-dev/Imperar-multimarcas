import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  return (
    <>
      <PublicHeader />
      <main className="content-shell">
        <div className="page-title">
          <h1>Quem somos</h1>
          <p className="muted">A Imperar Multimarcas trabalha com veículos selecionados, laudo de procedência, financiamento e atendimento consultivo.</p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
