import { EMAIL, INSTAGRAM, LOCATION, PHONES } from "@/lib/contact";
import { LogoTile } from "@/components/ui/LogoTile";

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2rem] bg-navy pb-24 text-paper sm:rounded-t-[2.5rem] sm:pb-10">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-airflow" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-12 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-10">
        <div className="flex items-start gap-4">
          <LogoTile size={56} />
          <div>
            <p className="text-2xl font-extrabold tracking-tight">Ductos Peralta</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/70">
              Servicios y proyectos de instalación de sistemas de ductos para aire acondicionado, extracción y
              ventilación. {LOCATION}.
            </p>
          </div>
        </div>
        <ul className="space-y-1.5 text-sm text-paper/80 md:text-right">
          {PHONES.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className="transition-colors hover:text-sky">
                {p.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-sky">
              {EMAIL}
            </a>
          </li>
          <li>
            <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-sky">
              {INSTAGRAM.handle}
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-paper/60">
          <span>© Ductos Peralta · Todos los derechos reservados</span>
          <span className="rounded-full border border-white/20 px-3 py-1">Borrador de propuesta · no publicado</span>
        </div>
      </div>
    </footer>
  );
}
