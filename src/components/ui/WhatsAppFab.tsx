import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Floating WhatsApp pill, bottom-right, with a soft pulse ring. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-ink shadow-[0_12px_28px_-10px_rgb(10_18_32/0.55)] ring-1 ring-black/5 transition-transform duration-200 motion-safe:hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden="true" className="fab-pulse absolute inset-0 -z-10 rounded-full bg-whatsapp" />
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
