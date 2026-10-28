import type { ReactNode } from "react";

type RivetsProps = {
  tone?: "light" | "dark";
  /** Tailwind inset classes for the rivet positions. */
  inset?: string;
};

/** Four rivets, one per corner. Purely decorative. */
export function Rivets({ tone = "light", inset = "3.5" }: RivetsProps) {
  const cls = `rivet ${tone === "dark" ? "rivet-dark" : ""}`;
  const pos: Record<string, [string, string, string, string]> = {
    "2.5": ["top-2.5 left-2.5", "top-2.5 right-2.5", "bottom-2.5 left-2.5", "bottom-2.5 right-2.5"],
    "3.5": ["top-3.5 left-3.5", "top-3.5 right-3.5", "bottom-3.5 left-3.5", "bottom-3.5 right-3.5"],
    "5": ["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"],
  };

  return (
    <>
      {(pos[inset] ?? pos["3.5"]).map((p) => (
        <span key={p} aria-hidden="true" className={`${cls} ${p}`} />
      ))}
    </>
  );
}

type MetalCardProps = {
  as?: "article" | "div" | "li";
  variant?: "plate" | "white" | "featured";
  compact?: boolean;
  /** Lift + sheen on hover. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

const SURFACES = {
  plate: "surface-brushed border-steel text-ink shadow-plate",
  white: "bg-white border-steel/80 text-ink shadow-plate",
  featured:
    "bg-navy border-navy text-white shadow-[0_24px_50px_-20px_rgb(11_45_91/0.7)] bg-[radial-gradient(120%_80%_at_100%_0%,rgb(63_169_245/0.28),transparent_60%)]",
} as const;

/**
 * Galvanized metal plate: rounded, riveted corners, airflow bar along the top
 * and a light sheen sweeping across on hover.
 */
export function MetalCard({
  as: Tag = "div",
  variant = "plate",
  compact = false,
  interactive = true,
  className = "",
  children,
}: MetalCardProps) {
  return (
    <Tag
      className={`relative flex flex-col overflow-hidden rounded-3xl border ${SURFACES[variant]} ${
        compact ? "p-5 pt-6" : "p-6 pt-9 sm:p-8 sm:pt-10"
      } ${
        interactive
          ? "sheen transition-[transform,box-shadow] duration-300 ease-out hover:shadow-plate-lift motion-safe:hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-airflow" />
      <Rivets tone={variant === "featured" ? "dark" : "light"} inset={compact ? "2.5" : "3.5"} />
      {children}
    </Tag>
  );
}
