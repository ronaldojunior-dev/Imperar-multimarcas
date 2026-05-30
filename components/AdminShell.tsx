import Link from "next/link";
import { getSession } from "@/lib/session";
import { LogoutButton } from "@/components/LogoutButton";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link className="logo" href="/admin">Imperar <span>Admin</span></Link>
        <p className="muted">{session?.user?.name} | {session?.user?.role}</p>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/vehicles">Veículos</Link>
          <Link href="/admin/leads">Leads</Link>
          <Link href="/admin/banners">Banners</Link>
          <Link href="/admin/testimonials">Depoimentos</Link>
          <Link href="/admin/settings">Configurações</Link>
          {session?.user?.role === "ADMIN" && <Link href="/admin/users">Usuários</Link>}
          <LogoutButton />
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
