/** Single source of truth for Ductos Peralta contact data. */

export const BUSINESS_NAME = "Ductos Peralta";

export const PHONES = [
  { label: "0424-280.31.12", tel: "+584242803112", whatsapp: true },
  { label: "0422-886.22.50", tel: "+584228862250", whatsapp: false },
] as const;

export const EMAIL = "ductosperalta@gmail.com";

export const INSTAGRAM = {
  handle: "@ductos_peralta",
  url: "https://www.instagram.com/ductos_peralta/",
} as const;

/** Primary WhatsApp number in international format, digits only (from 0424-280.31.12). */
export const WHATSAPP_NUMBER = "584242803112";

// TODO: replace with the client's city once confirmed (e.g. "Valencia, Carabobo · Venezuela").
export const LOCATION = "Venezuela";
