"use client";

import { useRouter } from "next/navigation";

type Settings = {
  companyName: string;
  logo?: string | null;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  googleAnalytics?: string | null;
  metaPixel?: string | null;
} | null;

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();

  async function submit(formData: FormData) {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    router.refresh();
  }

  return (
    <form action={submit} className="form-card form-grid">
      <label className="field">Empresa<input name="companyName" defaultValue={initial?.companyName} required /></label>
      <label className="field">Logo<input name="logo" defaultValue={initial?.logo ?? ""} /></label>
      <label className="field">Telefone<input name="phone" defaultValue={initial?.phone} required /></label>
      <label className="field">WhatsApp<input name="whatsapp" defaultValue={initial?.whatsapp} required /></label>
      <label className="field">E-mail<input name="email" type="email" defaultValue={initial?.email} required /></label>
      <label className="field full">Endereço<input name="address" defaultValue={initial?.address} required /></label>
      <label className="field">Facebook<input name="facebook" defaultValue={initial?.facebook ?? ""} /></label>
      <label className="field">Instagram<input name="instagram" defaultValue={initial?.instagram ?? ""} /></label>
      <label className="field">Youtube<input name="youtube" defaultValue={initial?.youtube ?? ""} /></label>
      <label className="field">Google Analytics<input name="googleAnalytics" defaultValue={initial?.googleAnalytics ?? ""} /></label>
      <label className="field">Meta Pixel<input name="metaPixel" defaultValue={initial?.metaPixel ?? ""} /></label>
      <label className="field full">SEO título<input name="seoTitle" defaultValue={initial?.seoTitle ?? ""} /></label>
      <label className="field full">SEO descrição<textarea name="seoDescription" defaultValue={initial?.seoDescription ?? ""} /></label>
      <button className="primary-button full" type="submit">Salvar configurações</button>
    </form>
  );
}
