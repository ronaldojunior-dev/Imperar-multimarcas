import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { startDate: "desc" } });
  return (
    <AdminShell>
      <h1>Banners</h1>
      <div className="admin-card">
        <table className="table">
          <thead><tr><th>Título</th><th>Ativo</th><th>Link</th></tr></thead>
          <tbody>{banners.map((banner) => <tr key={banner.id}><td>{banner.title}</td><td>{banner.active ? "Sim" : "Não"}</td><td>{banner.link}</td></tr>)}</tbody>
        </table>
      </div>
    </AdminShell>
  );
}
