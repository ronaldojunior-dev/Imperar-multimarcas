"use client";

import { useRouter } from "next/navigation";

export function UserCreateForm() {
  const router = useRouter();

  async function submit(formData: FormData) {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
        active: true
      })
    });
    router.refresh();
  }

  return (
    <form action={submit} className="form-card form-grid">
      <label className="field">Nome<input name="name" required /></label>
      <label className="field">E-mail<input name="email" type="email" required /></label>
      <label className="field">Senha<input name="password" type="password" required /></label>
      <label className="field">Permissão<select name="role"><option>VENDEDOR</option><option>ADMIN</option></select></label>
      <button className="primary-button full" type="submit">Criar usuário</button>
    </form>
  );
}
