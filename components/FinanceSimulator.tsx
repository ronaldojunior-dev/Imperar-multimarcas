"use client";

import { useState } from "react";

type Result = {
  installmentValue: string;
  totalValue: string;
};

export function FinanceSimulator({ vehicleId, price = 90000 }: { vehicleId?: string; price?: number }) {
  const [result, setResult] = useState<Result | null>(null);

  async function submit(formData: FormData) {
    const response = await fetch("/api/finance/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId,
        name: formData.get("name"),
        phone: formData.get("phone"),
        vehiclePrice: formData.get("vehiclePrice"),
        downPayment: formData.get("downPayment"),
        installments: formData.get("installments"),
        monthlyRate: formData.get("monthlyRate")
      })
    });
    const data = await response.json();
    setResult({
      installmentValue: Number(data.installmentValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      totalValue: Number(data.totalValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    });
  }

  return (
    <form action={submit} className="form-card form-grid">
      <label className="field">
        Nome
        <input name="name" />
      </label>
      <label className="field">
        WhatsApp
        <input name="phone" />
      </label>
      <label className="field">
        Valor do veículo
        <input name="vehiclePrice" type="number" defaultValue={price} required />
      </label>
      <label className="field">
        Entrada
        <input name="downPayment" type="number" defaultValue={Math.round(price * 0.2)} required />
      </label>
      <label className="field">
        Parcelas
        <input name="installments" type="number" defaultValue={48} required />
      </label>
      <label className="field">
        Juros ao mês (%)
        <input name="monthlyRate" type="number" step="0.01" defaultValue={1.79} required />
      </label>
      <button className="primary-button full" type="submit">Simular financiamento</button>
      {result && (
        <p className="muted full">
          Parcela estimada: <strong>{result.installmentValue}</strong> | Valor final: <strong>{result.totalValue}</strong>
        </p>
      )}
    </form>
  );
}
