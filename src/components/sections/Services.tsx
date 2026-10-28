import type { ComponentType } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, ElbowIcon, FanServiceIcon, HoodIcon } from "@/components/ui/Icons";
import { MetalCard } from "@/components/ui/MetalCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Service = {
  title: string;
  items: string[];
  cta: string;
  message: string;
  icon: ComponentType<{ className?: string }>;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Ductos para aire acondicionado",
    items: [
      "Diseño de la red de ductos",
      "Fabricación en lámina galvanizada",
      "Ductos rectangulares y circulares",
      "Aislamiento térmico",
      "Rejillas y difusores",
    ],
    cta: "Cotizar ductos",
    message: "Hola, Ductos Peralta. Quiero cotizar ductos para aire acondicionado.",
    icon: ElbowIcon,
  },
  {
    title: "Campanas y extracción",
    items: [
      "Campanas para cocinas comerciales",
      "Ductos de extracción",
      "Chimeneas con sombrerete",
      "Extractores axiales y centrífugos",
    ],
    cta: "Cotizar extracción",
    message: "Hola, Ductos Peralta. Quiero cotizar una campana / sistema de extracción.",
    icon: HoodIcon,
    featured: true,
  },
  {
    title: "Mantenimiento y ajustes",
    items: [
      "Revisión y sellado de fugas",
      "Reemplazo de tramos",
      "Limpieza de ductos",
      "Reubicación de rejillas",
    ],
    cta: "Pedir revisión",
    message: "Hola, Ductos Peralta. Necesito mantenimiento o ajustes en mis ductos.",
    icon: FanServiceIcon,
  },
];

function ServiceCard({ service }: { service: Service }) {
  const featured = service.featured === true;
  const Icon = service.icon;

  return (
    <MetalCard as="article" variant={featured ? "featured" : "plate"} className="h-full">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid size-16 place-items-center rounded-2xl border ${
            featured ? "border-white/15 bg-white/10 text-sky" : "border-steel bg-white/70 text-blue"
          }`}
        >
          <Icon className="size-10" />
        </span>
        {featured ? (
          <span className="rounded-full bg-sky px-3 py-1 text-xs font-semibold text-ink">Lo más pedido</span>
        ) : null}
      </div>

      <h3 className="heading mt-6 text-[1.75rem] sm:text-3xl">{service.title}</h3>

      <ul className={`mt-5 flex-1 space-y-2.5 text-[15px] ${featured ? "text-paper/85" : "text-ink/80"}`}>
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                featured ? "bg-sky/20 text-sky" : "bg-sky/15 text-blue"
              }`}
            >
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={whatsappUrl(service.message)}
        external
        arrow
        variant={featured ? "light" : "primary"}
        className="mt-8 w-full"
      >
        {service.cta}
      </ButtonLink>
    </MetalCard>
  );
}

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Servicios"
          titleId="servicios-title"
          title={
            <>
              ¿Qué necesitas <span className="text-airflow">mover</span>?
            </>
          }
          lead="Tres líneas de trabajo, un mismo taller. Diseñamos, fabricamos e instalamos para que el aire llegue justo donde lo necesitas."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90} className={service.featured ? "md:-mt-4 md:mb-4" : "md:mt-4"}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
