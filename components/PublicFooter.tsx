import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { googleMapsUrl, INSTAGRAM_URL, INSTAGRAM_USER, STORES, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/company";

export function PublicFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-brand">
          <strong>Imperar <span>Multimarcas</span></strong>
          <p>Veículos selecionados, atendimento consultivo e negociação transparente.</p>
        </div>

        <div className="footer-section">
          <h2>Nossas lojas</h2>
          <div className="footer-stores">
            {STORES.map((store) => (
              <article key={store.name} className="footer-store">
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <strong>{store.name}</strong>
                  <p>{store.address}</p>
                  <a href={googleMapsUrl(store.address)} target="_blank" rel="noreferrer">
                    Abrir no Google Maps
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="footer-section footer-social">
          <h2>Atendimento</h2>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <Instagram size={20} aria-hidden="true" />
            {INSTAGRAM_USER}
          </a>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp">
        <MessageCircle size={30} aria-hidden="true" />
      </a>
    </>
  );
}
