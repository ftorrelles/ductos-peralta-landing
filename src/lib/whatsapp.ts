import { BUSINESS_NAME, WHATSAPP_NUMBER } from "./contact";

export const DEFAULT_MESSAGE = `Hola, ${BUSINESS_NAME}. Quiero cotizar un proyecto de ductos.`;

/** Builds a wa.me link with an optional prefilled message. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Inquiry = {
  needs: readonly string[];
  space: string | null;
  name: string;
  idea: string;
};

/** Composes the message produced by the "Arma tu consulta" builder. */
export function buildInquiryMessage({ needs, space, name, idea }: Inquiry): string {
  const lines: string[] = [];
  const trimmedName = name.trim();

  lines.push(trimmedName ? `Hola, ${BUSINESS_NAME}. Soy ${trimmedName}.` : `Hola, ${BUSINESS_NAME}.`);
  lines.push(
    needs.length > 0
      ? `Necesito: ${needs.join(", ").toLowerCase()}.`
      : "Quiero cotizar un proyecto de ductos.",
  );
  if (space) lines.push(`Tipo de espacio: ${space.toLowerCase()}.`);

  const trimmedIdea = idea.trim();
  if (trimmedIdea) lines.push(`Mi idea: ${trimmedIdea}`);

  return lines.join("\n");
}
