import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany();
  return (
    <AdminShell>
      <h1>Depoimentos</h1>
      <div className="admin-card">
        <table className="table">
          <thead><tr><th>Nome</th><th>Texto</th><th>Ativo</th></tr></thead>
          <tbody>{testimonials.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.text}</td><td>{item.active ? "Sim" : "Não"}</td></tr>)}</tbody>
        </table>
      </div>
    </AdminShell>
  );
}
