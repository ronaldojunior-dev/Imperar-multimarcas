import { PublicHeader } from "@/components/PublicHeader";
import { LeadForm } from "@/components/LeadForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await prisma.settings.findFirst();
  return (
    <>
      <PublicHeader phone={settings?.phone} whatsapp={settings?.whatsapp} />
      <main className="content-shell">
        <div className="page-title">
          <h1>Contato</h1>
          <p className="muted">{settings?.address}</p>
        </div>
        <LeadForm />
      </main>
    </>
  );
}
