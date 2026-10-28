import Image from "next/image";
import { MetalCard, Rivets } from "@/components/ui/MetalCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STATS = [
  { value: "100%", label: "a la medida de tu espacio" },
  { value: "1", label: "solo equipo: taller e instalación" },
  { value: "Ø/▭", label: "ductos circulares y rectangulares" },
];

export function Workshop() {
  return (
    <section id="taller" aria-labelledby="taller-title" className="border-y border-steel/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Taller"
              layout="stack"
              titleId="taller-title"
              title={
                <>
                  Taller propio, <span className="text-airflow">cero intermediarios</span>
                </>
              }
            />
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                Cada ducto sale de nuestro taller: cortamos, doblamos y armamos la lámina galvanizada para que cada
                pieza encaje en tu espacio, sin adaptar medidas estándar a la fuerza.
              </p>
              <p>
                Como el mismo equipo fabrica e instala, lo que se mide en la visita es lo que se monta en la obra. Menos
                vueltas, menos sorpresas y una sola persona a quien escribirle.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {STATS.map((stat) => (
                <MetalCard key={stat.label} as="li" compact interactive={false}>
                  <p className="heading text-4xl text-blue">{stat.value}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{stat.label}</p>
                </MetalCard>
              ))}
            </ul>
          </div>

          <Reveal className="relative pb-20 sm:pb-24">
            {/* Riveted galvanized frame */}
            <figure className="surface-brushed relative w-[90%] rounded-[2rem] border border-steel p-3 shadow-plate sm:p-4">
              <Rivets inset="2.5" />
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-steel">
                <Image
                  src="/img/taller.jpg"
                  alt="Artesano en el taller junto a un ducto circular galvanizado y una transición de campana"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute top-6 left-6 rounded-full border border-white/60 bg-white/75 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-md sm:top-7 sm:left-7">
                <span className="mr-1.5 font-mono text-[10px] font-medium text-blue">T-01</span>
                Taller
              </figcaption>
            </figure>

            <figure className="absolute right-0 bottom-0 aspect-square w-[46%] overflow-hidden rounded-2xl border-4 border-white bg-steel shadow-[0_24px_48px_-20px_rgb(10_18_32/0.55)]">
              <Image
                src="/img/extractor-axial.jpg"
                alt="Fundador de Ductos Peralta junto a un gran extractor axial azul"
                fill
                sizes="(min-width: 1024px) 22vw, 46vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full bg-navy/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md sm:text-xs">
                <span className="mr-1.5 font-mono text-[10px] font-medium text-sky">T-02</span>
                Extractor axial
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
