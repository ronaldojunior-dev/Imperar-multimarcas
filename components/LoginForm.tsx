"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setError("");
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    if (result?.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    setError("E-mail ou senha inválidos.");
  }

  return (
    <form action={submit} className="form-card form-grid">
      <h1 className="full">Painel Administrativo</h1>
      <label className="field full">E-mail<input name="email" type="email" required /></label>
      <label className="field full">Senha<input name="password" type="password" required /></label>
      <button className="primary-button full" type="submit">Entrar</button>
      {error && <p className="full muted">{error}</p>}
    </form>
  );
}
