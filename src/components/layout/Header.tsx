import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { LogoTile } from "@/components/ui/LogoTile";

const NAV = [
  { href: "#historia", label: "Historia" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel/80 bg-paper/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a
          href="#inicio"
          className="flex min-w-0 items-center gap-3 rounded-xl"
          aria-label="Ductos Peralta, ir al inicio"
        >
          <LogoTile size={40} preload />
          <span className="min-w-0 leading-none">
            <span className="block truncate text-lg font-extrabold tracking-tight [font-stretch:95%]">
              Ductos Peralta
            </span>
            <span className="mt-1 block truncate font-mono text-[10px] tracking-[0.08em] text-muted">
              Ductos · A/A · Extracción
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-steel/70 bg-white/50 p-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:bg-white hover:text-ink hover:shadow-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 sm:block">
          <ButtonLink href={whatsappUrl()} external size="sm" arrow>
            Escríbenos
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
