"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Initial = {
  id?: string;
  brand?: string;
  model?: string;
  version?: string;
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  color?: string;
  doors?: number;
  plateFinal?: string;
  price?: string | number;
  featured?: boolean;
  status?: string;
  description?: string;
  images?: { imageUrl: string }[];
};

export function VehicleAdminForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setError("");
    const images = String(formData.get("images") ?? "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      version: formData.get("version"),
      year: formData.get("year"),
      mileage: formData.get("mileage"),
      fuel: formData.get("fuel"),
      transmission: formData.get("transmission"),
      color: formData.get("color"),
      doors: formData.get("doors"),
      plateFinal: formData.get("plateFinal"),
      price: formData.get("price"),
      featured: formData.get("featured") === "on",
      status: formData.get("status"),
      description: formData.get("description"),
      images
    };

    const response = await fetch(initial?.id ? `/api/vehicles/${initial.id}` : "/api/vehicles", {
      method: initial?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Erro ao salvar veículo");
      return;
    }

    router.push("/admin/vehicles");
    router.refresh();
  }

  return (
    <form action={submit} className="form-card form-grid">
      <label className="field">Marca<input name="brand" defaultValue={initial?.brand} required /></label>
      <label className="field">Modelo<input name="model" defaultValue={initial?.model} required /></label>
      <label className="field full">Versão<input name="version" defaultValue={initial?.version} required /></label>
      <label className="field">Ano<input name="year" type="number" defaultValue={initial?.year} required /></label>
      <label className="field">KM<input name="mileage" type="number" defaultValue={initial?.mileage} required /></label>
      <label className="field">Combustível<input name="fuel" defaultValue={initial?.fuel ?? "Flex"} required /></label>
      <label className="field">Câmbio<input name="transmission" defaultValue={initial?.transmission ?? "Automático"} required /></label>
      <label className="field">Cor<input name="color" defaultValue={initial?.color} required /></label>
      <label className="field">Portas<input name="doors" type="number" defaultValue={initial?.doors ?? 4} required /></label>
      <label className="field">Final placa<input name="plateFinal" defaultValue={initial?.plateFinal} required /></label>
      <label className="field">Preço<input name="price" type="number" step="0.01" defaultValue={String(initial?.price ?? "")} required /></label>
      <label className="field">Status<select name="status" defaultValue={initial?.status ?? "ATIVO"}><option>ATIVO</option><option>RESERVADO</option><option>VENDIDO</option><option>ARQUIVADO</option></select></label>
      <label className="field full">Descrição<textarea name="description" rows={4} defaultValue={initial?.description} required /></label>
      <label className="field full">URLs das imagens, uma por linha<textarea name="images" rows={5} defaultValue={initial?.images?.map((img) => img.imageUrl).join("\n")} /></label>
      <label className="field full"><span><input name="featured" type="checkbox" defaultChecked={initial?.featured} /> Destaque</span></label>
      <button className="primary-button full" type="submit">Salvar veículo</button>
      {error && <p className="muted full">{error}</p>}
    </form>
  );
}
