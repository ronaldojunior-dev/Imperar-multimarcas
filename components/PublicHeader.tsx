import Link from "next/link";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/company";

export function PublicHeader(_props: { whatsapp?: string; phone?: string } = {}) {
  return (
    <header className="site-header">
      <Link className="logo" href="/">
        Imperar <span>Multimarcas</span>
      </Link>

      <nav className="main-nav" aria-label="Menu principal">
        <Link className="active" href="/">Home</Link>
        <Link href="/estoque">Estoque</Link>
        <Link href="/vender-meu-carro">Vender seu carro</Link>
        <Link href="/financiamento">Financiamento</Link>
        <Link href="/quem-somos">Quem somos</Link>
        <Link href="/contato">Contato</Link>
      </nav>

      <a className="phone-link" href={whatsappUrl()} target="_blank" rel="noreferrer">
        <span className="whatsapp-icon" aria-hidden="true">☎</span>
        <span>
          <strong>{WHATSAPP_DISPLAY}</strong>
          <small>Fale conosco</small>
        </span>
      </a>
    </header>
  );
}
