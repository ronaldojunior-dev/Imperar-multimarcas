import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";
import { SettingsForm } from "@/components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.settings.findFirst();
  return (
    <AdminShell>
      <h1>Configurações da empresa</h1>
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}
