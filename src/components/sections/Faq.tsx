import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FAQS = [
  {
    q: "¿Hacen la visita técnica antes de cotizar?",
    a: "Sí. Para cotizar bien necesitamos ver el espacio, los equipos y el recorrido posible de los ductos. Escríbenos con tu ubicación y coordinamos la visita.",
  },
  {
    q: "¿Trabajan con lámina galvanizada?",
    a: "Sí, fabricamos los ductos en lámina galvanizada en nuestro propio taller, tanto circulares como rectangulares, y les colocamos aislamiento térmico cuando el proyecto lo requiere.",
  },
  {
    q: "¿Instalan en oficinas, comercios e industrias?",
    a: "Sí. Hemos trabajado en oficinas, locales comerciales, cocinas y plantas industriales. Cada espacio tiene sus condiciones, así que lo evaluamos caso por caso.",
  },
  {
    q: "¿Fabrican campanas para cocinas comerciales?",
    a: "Sí. Fabricamos e instalamos campanas de extracción con su ducto, chimenea con sombrerete y el extractor adecuado (axial o centrífugo) según la cocina.",
  },
  {
    q: "¿Pueden cambiar o reparar un tramo de ducto existente?",
    a: "En muchos casos sí: sellamos fugas, reemplazamos tramos dañados y reubicamos rejillas. Mándanos fotos del ducto por WhatsApp y te decimos qué se puede hacer.",
  },
  {
    q: "¿Trabajan fuera de su ciudad?",
    a: "Depende del tamaño del proyecto y de la ubicación. Escríbenos y lo evaluamos contigo.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.45fr] lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Preguntas"
          layout="stack"
          titleId="preguntas-title"
          className="lg:sticky lg:top-28 lg:self-start"
          title={
            <>
              Preguntas <span className="text-airflow">frecuentes</span>
            </>
          }
          lead="Lo que más nos preguntan antes de empezar. Si tu duda no está aquí, escríbenos."
        />

        <Reveal className="space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group relative rounded-2xl border border-steel bg-white/60 transition-[background-color,box-shadow] duration-300 open:bg-white open:shadow-plate"
            >
              <span
                aria-hidden="true"
                className="absolute top-4 bottom-4 left-0 w-1 origin-top scale-y-0 rounded-full bg-airflow-v transition-transform duration-300 group-open:scale-y-100"
              />
              <summary className="flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:text-blue sm:px-6 sm:py-5">
                <span className="flex-1 text-lg font-semibold sm:text-xl">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="relative grid size-9 shrink-0 place-items-center rounded-full border border-steel bg-white text-ink transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-navy group-open:bg-navy group-open:text-white"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                </span>
              </summary>
              <p className="max-w-2xl px-5 pb-6 text-base leading-relaxed text-ink/80 sm:px-6">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
