import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    title: "Visita técnica",
    text: "Vamos al sitio, medimos y revisamos los equipos, el techo y los recorridos posibles antes de proponer nada.",
  },
  {
    title: "Diseño y cálculo",
    text: "Definimos el recorrido, las secciones de cada tramo y la ubicación de rejillas y difusores según tu espacio.",
  },
  {
    title: "Fabricación en taller",
    text: "Cortamos, doblamos y armamos la lámina galvanizada en nuestro taller, pieza por pieza y a la medida.",
  },
  {
    title: "Instalación",
    text: "Montamos, soportamos y sellamos la red en obra con el mismo equipo que la fabricó.",
  },
  {
    title: "Prueba y entrega",
    text: "Revisamos el flujo de aire, corregimos detalles y te entregamos el trabajo funcionando.",
  },
];

/** Negative delays spread the particles along the line from the first frame. */
const PARTICLE_DELAYS = ["0s", "-1.4s", "-2.8s", "-4.1s"];

function Particles({ axis }: { axis: "x" | "y" }) {
  return (
    <>
      {PARTICLE_DELAYS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className={`absolute inset-0 ${axis === "x" ? "flow-x" : "flow-y"}`}
          style={{ animationDelay: axis === "x" ? delay : `calc(${delay} * 1.27)` }}
        >
          <span
            className={`flow-dot absolute size-2 rounded-full ${
              axis === "x" ? "top-1/2 left-0 -translate-y-1/2" : "top-0 left-1/2 -translate-x-1/2"
            }`}
          />
        </span>
      ))}
    </>
  );
}

/** Duct tube: brushed highlight on dark, with flowing particles. */
const TUBE = "overflow-hidden rounded-full bg-linear-to-b from-white/25 via-white/10 to-white/5 ring-1 ring-white/10";

export function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="surface-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_75%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-blue/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Proceso"
          tone="dark"
          titleId="proceso-title"
          title={
            <>
              Del plano al <span className="text-airflow-bright">techo</span>
            </>
          }
          lead="Cinco pasos, un solo equipo. Lo que medimos en la visita es exactamente lo que se monta en tu obra."
        />

        <div className="relative mt-16">
          {/* Desktop: horizontal duct line through the step nodes */}
          <div aria-hidden="true" className={`absolute top-[18px] right-0 left-5 hidden h-1.5 lg:block ${TUBE}`}>
            <Particles axis="x" />
          </div>
          {/* Mobile/tablet: vertical duct line */}
          <div aria-hidden="true" className={`absolute top-5 bottom-0 left-[17px] w-1.5 lg:hidden ${TUBE}`}>
            <Particles axis="y" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 80} className="flex gap-5 lg:flex-col lg:gap-0">
                  {/* Flange-like node */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 border-steel/50 bg-ink shadow-[0_0_0_5px_rgb(255_255_255/0.06)]"
                  >
                    <span className="size-3 rounded-full bg-sky shadow-[0_0_14px_rgb(63_169_245/0.9)]" />
                  </span>
                  <div className="lg:mt-6 lg:pr-2">
                    <p className="inline-flex rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[11px] tracking-[0.06em] text-sky">
                      Paso {i + 1}
                    </p>
                    <h3 className="heading mt-3 text-2xl text-white">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-paper/70">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
