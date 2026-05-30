import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/AdminShell";
import { UserCreateForm } from "@/components/UserCreateForm";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <AdminShell>
      <h1>Usuários</h1>
      <UserCreateForm />
      <div className="admin-card" style={{ marginTop: 20 }}>
        <table className="table">
          <thead><tr><th>Nome</th><th>E-mail</th><th>Role</th><th>Ativo</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.active ? "Sim" : "Não"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
