const ITEMS = [
  "Ductos galvanizados",
  "Aire acondicionado",
  "Campanas de cocina",
  "Extracción",
  "Extractores axiales",
  "Centrífugos",
  "Rejillas y difusores",
  "Chimeneas",
  "Aislamiento",
  "Mantenimiento",
];

function FlowArrow() {
  return (
    <svg viewBox="0 0 28 12" aria-hidden="true" className="h-3 w-7 shrink-0" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h6" stroke="var(--heat)" strokeOpacity="0.85" />
      <path d="m12 2 4 4-4 4" stroke="var(--heat)" />
      <path d="m19 2 4 4-4 4" stroke="var(--blue)" />
    </svg>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6">
          <span className="text-base font-semibold tracking-tight whitespace-nowrap text-navy sm:text-lg">{item}</span>
          <FlowArrow />
        </li>
      ))}
    </ul>
  );
}

/**
 * A galvanized duct running across the page with the service names flowing through it like air.
 * Pauses on hover/focus; static for reduced motion.
 */
export function DuctBand() {
  return (
    <section aria-label="Lo que fabricamos" className="duct-band mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <div className="surface-galvanized relative h-16 overflow-hidden rounded-full border border-steel-dark/30 shadow-[inset_0_2px_0_rgb(255_255_255/0.85),inset_0_-8px_14px_-6px_rgb(10_18_32/0.25),0_14px_30px_-18px_rgb(10_18_32/0.45)] sm:h-20">
        <span aria-hidden="true" className="duct-flanges absolute inset-0" />
        <div className="duct-band-window relative flex h-full items-center">
          <div className="duct-band-track flex w-max animate-duct-flow items-center">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
