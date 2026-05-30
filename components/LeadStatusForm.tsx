"use client";

import { useRouter } from "next/navigation";

export function LeadStatusForm({ leadId, status }: { leadId: string; status: string }) {
  const router = useRouter();

  async function submit(formData: FormData) {
    await fetch(`/api/leads/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: formData.get("status"),
        note: formData.get("note")
      })
    });
    router.refresh();
  }

  return (
    <form action={submit} className="form-grid">
      <label className="field">
        Status
        <select name="status" defaultValue={status}>
          <option>NOVO</option>
          <option>CONTATO</option>
          <option>NEGOCIACAO</option>
          <option>FECHADO</option>
          <option>PERDIDO</option>
        </select>
      </label>
      <label className="field">
        Observação
        <input name="note" />
      </label>
      <button className="primary-button full" type="submit">Atualizar lead</button>
    </form>
  );
}
