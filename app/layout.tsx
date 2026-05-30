import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  title: "Imperar Multimarcas",
  description: "Carros selecionados com procedência e financiamento.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Imperar Multimarcas",
    description: "Carros selecionados com procedência e financiamento.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperar Multimarcas",
    description: "Carros selecionados com procedência e financiamento."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
