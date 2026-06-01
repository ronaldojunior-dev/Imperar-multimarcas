import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { LeadForm } from "@/components/LeadForm";
import { STORES } from "@/lib/company";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  return (
    <>
      <PublicHeader />
      <main className="content-shell">
        <div className="page-title">
          <h1>Contato</h1>
          <p className="muted">{STORES.map((store) => `${store.name}: ${store.address}`).join(" | ")}</p>
        </div>
        <LeadForm />
      </main>
      <PublicFooter />
    </>
  );
}
