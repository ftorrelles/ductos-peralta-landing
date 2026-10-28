import Image from "next/image";
import { INSTAGRAM } from "@/lib/contact";
import { ArrowRightIcon, InstagramIcon } from "@/components/ui/Icons";
import { MetalCard } from "@/components/ui/MetalCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Project = {
  src: string;
  alt: string;
  code: string;
  name: string;
  span: string;
  sizes: string;
};

const PROJECTS: Project[] = [
  {
    src: "/img/campana-cocina.jpg",
    alt: "Campana de cocina en acero con codo de ducto circular",
    code: "P-01",
    name: "Campana de cocina",
    span: "col-span-2 row-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    src: "/img/ducto-techo.jpg",
    alt: "Ducto rectangular aislado con difusores instalado en el techo de una oficina",
    code: "P-02",
    name: "Ducto aislado con difusores",
    span: "col-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    src: "/img/chimenea.jpg",
    alt: "Chimenea galvanizada con sombrerete sobre un techo rojo",
    code: "P-03",
    name: "Chimenea con sombrerete",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "/img/extractor-centrifugo.jpg",
    alt: "Extractor centrífugo instalado",
    code: "P-04",
    name: "Extractor centrífugo",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "/img/obra-montaje.jpg",
    alt: "Técnico fijando la base de un ducto circular al piso",
    code: "P-05",
    name: "Montaje en obra",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "/img/rejilla-instalacion.jpg",
    alt: "Instalación de una rejilla de aire en la pared",
    code: "P-06",
    name: "Instalación de rejilla",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "/img/equipo.jpg",
    alt: "Dos técnicos de Ductos Peralta con arnés trabajando en una planta",
    code: "P-07",
    name: "Equipo en planta",
    span: "",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
];

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Proyectos"
          titleId="proyectos-title"
          title={
            <>
              Hecho por <span className="text-airflow">nosotros</span>
            </>
          }
          lead="Cocinas, oficinas, comercios y plantas. Cada pieza salió de nuestro taller y la montó nuestro equipo."
        />

        <Reveal className="mt-14">
          <ul className="grid auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:auto-rows-[240px] lg:grid-cols-4 lg:gap-4">
            {PROJECTS.map((project) => (
              <li
                key={project.src}
                className={`group relative overflow-hidden rounded-2xl bg-steel shadow-[0_14px_30px_-18px_rgb(10_18_32/0.5)] ring-1 ring-ink/5 ${project.span}`}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes={project.sizes}
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 left-2.5 flex max-w-[calc(100%-1.25rem)] flex-wrap items-baseline gap-x-2 rounded-xl border border-white/60 bg-white/75 px-3 py-1.5 shadow-sm backdrop-blur-md transition-transform duration-300 motion-safe:group-hover:-translate-y-1 sm:bottom-3 sm:left-3">
                  <span className="font-mono text-[10px] font-medium text-blue">{project.code}</span>
                  <span className="text-xs font-semibold text-ink sm:text-sm">{project.name}</span>
                </span>
              </li>
            ))}
            <MetalCard as="li" variant="featured" compact className="justify-between">
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ig flex size-full flex-col justify-between rounded-2xl"
              >
                <span className="grid size-9 place-items-center rounded-full bg-white/10 text-sky sm:size-10">
                  <InstagramIcon className="size-5" />
                </span>
                <span>
                  <span className="heading block text-lg text-white sm:text-2xl">Mira más en Instagram</span>
                  <span className="mt-1.5 inline-flex flex-wrap items-center gap-1.5 text-xs break-all text-sky sm:text-sm">
                    {INSTAGRAM.handle}
                    <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover/ig:translate-x-1" />
                  </span>
                </span>
              </a>
            </MetalCard>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
