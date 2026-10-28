import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BadgeCheckIcon, SheetsIcon, WorkshopIcon } from "@/components/ui/Icons";
import { Rivets } from "@/components/ui/MetalCard";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { DuctDrawing } from "./DuctDrawing";

const TRUST: { icon: ReactNode; label: string }[] = [
  { icon: <WorkshopIcon className="size-4" />, label: "Taller propio" },
  { icon: <SheetsIcon className="size-4" />, label: "Lámina galvanizada" },
  { icon: <BadgeCheckIcon className="size-4" />, label: "Instalación incluida" },
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Ambient airflow glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-[-12%] size-[38rem] rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute top-1/2 left-[-14%] size-[26rem] rounded-full bg-heat/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:px-10 lg:pt-14 lg:pb-16">
        <div>
          <Eyebrow>Sistemas de ductos · Venezuela</Eyebrow>

          <h1 id="hero-title" className="heading mt-6 text-[clamp(2.9rem,6.5vw,6.25rem)]">
            El aire va donde lo <span className="text-airflow">llevamos</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
            Fabricamos e instalamos sistemas de ductos para aire acondicionado, extracción y ventilación. Lámina
            galvanizada cortada, doblada y montada a la medida de tu espacio, por el mismo equipo de principio a fin.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl("Hola, Ductos Peralta. Quiero cotizar mi proyecto de ductos.")}
              external
              icon={<WhatsAppIcon className="size-5" />}
            >
              Cotizar mi proyecto
            </ButtonLink>
            <ButtonLink href="#proceso" variant="secondary" arrow>
              Ver cómo trabajamos
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Por qué elegirnos">
            {TRUST.map((item) => (
              <li
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-steel bg-white/60 px-3 py-1.5 text-sm font-medium text-ink/85"
              >
                <span className="text-blue">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-blueprint relative rounded-3xl bg-navy p-4 shadow-[0_30px_60px_-28px_rgb(11_45_91/0.75)] ring-1 ring-navy/30 sm:p-6">
          <Rivets tone="dark" />
          <DuctDrawing className="w-full" />
        </div>
      </div>
    </section>
  );
}
