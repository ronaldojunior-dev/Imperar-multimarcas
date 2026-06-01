export const WHATSAPP_NUMBER = "5548992125373";
export const WHATSAPP_DISPLAY = "(48) 99212-5373";
export const INSTAGRAM_USER = "@imperarmultimarcas";
export const INSTAGRAM_URL = "https://instagram.com/imperarmultimarcas";

export const STORES = [
  {
    name: "Loja Florianópolis",
    address: "Rua Edelberto de Oliveira, nº 120 - Monte Cristo, Florianópolis - SC"
  },
  {
    name: "Loja Palhoça",
    address: "Rua José Bonifácio de Souza, nº 193 - Passa Vinte, Palhoça - SC"
  }
];

export function whatsappUrl(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export function googleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
