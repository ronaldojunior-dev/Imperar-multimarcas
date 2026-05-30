import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";
import { LeadStatusForm } from "@/components/LeadStatusForm";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const filters = await searchParams;
  const leads = await prisma.lead.findMany({
    where: {
      ...(filters.status ? { status: filters.status as never } : {}),
      ...(filters.q
        ? {
            OR: [
              { name: { contains: filters.q, mode: "insensitive" } },
              { phone: { contains: filters.q, mode: "insensitive" } },
              { email: { contains: filters.q, mode: "insensitive" } }
            ]
          }
        : {})
    },
    include: { vehicle: true, notes: true, history: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <AdminShell>
      <div className="section-heading">
        <h1>Leads</h1>
        <a className="primary-button" href="/api/leads/export">Exportar CSV</a>
      </div>
      <form className="form-card form-grid" action="/admin/leads">
        <label className="field">Pesquisar<input name="q" defaultValue={filters.q} /></label>
        <label className="field">Status<select name="status" defaultValue={filters.status ?? ""}><option value="">Todos</option><option>NOVO</option><option>CONTATO</option><option>NEGOCIACAO</option><option>FECHADO</option><option>PERDIDO</option></select></label>
        <button className="primary-button full" type="submit">Filtrar</button>
      </form>
      <div className="admin-grid" style={{ marginTop: 20 }}>
        {leads.map((lead) => (
          <article className="admin-card" key={lead.id}>
            <h3>{lead.name}</h3>
            <p className="muted">{lead.phone} | {lead.email}</p>
            <p>{lead.message}</p>
            <p className="muted">{lead.vehicle ? `${lead.vehicle.brand} ${lead.vehicle.model}` : lead.type}</p>
            <LeadStatusForm leadId={lead.id} status={lead.status} />
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
