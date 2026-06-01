export const WHATSAPP_NUMBER = "5548992125373";
export const WHATSAPP_DISPLAY = "(48) 99212-5373";
export const INSTAGRAM_USER = "@imperarmultimarcas";
export const INSTAGRAM_URL = "https://instagram.com/imperarmultimarcas";

export const STORES = [
  {
    name: "Loja 1",
    address: "Rua Edelberto de Oliveira, nº 120"
  },
  {
    name: "Loja 2",
    address: "Rua José Bonifácio de Souza, nº 193"
  }
];

export function whatsappUrl(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export function googleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
