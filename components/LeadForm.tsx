"use client";

import { useState } from "react";

export function LeadForm({ vehicleId, type = "CONTATO" }: { vehicleId?: string; type?: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const payload = {
      vehicleId,
      type,
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    setSent(response.ok);
  }

  return (
    <form action={submit} className="form-card form-grid">
      <label className="field">
        Nome
        <input name="name" required />
      </label>
      <label className="field">
        WhatsApp
        <input name="phone" required />
      </label>
      <label className="field full">
        E-mail
        <input name="email" type="email" />
      </label>
      <label className="field full">
        Mensagem
        <textarea name="message" rows={4} required defaultValue="Tenho interesse e gostaria de mais informações." />
      </label>
      <button className="primary-button full" disabled={loading} type="submit">
        {loading ? "Enviando..." : "Enviar solicitação"}
      </button>
      {sent && <p className="muted full">Solicitação registrada com sucesso.</p>}
    </form>
  );
}
