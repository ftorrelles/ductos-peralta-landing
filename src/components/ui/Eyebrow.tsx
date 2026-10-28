import type { ReactNode } from "react";
import { AirflowIcon } from "./Icons";

type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Small rounded pill with a drifting airflow icon, used above section titles. */
export function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  const dark = tone === "dark";

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase backdrop-blur-sm ${
        dark ? "border-white/20 bg-white/5 text-sky" : "border-steel bg-white/70 text-navy"
      } ${className}`}
    >
      <AirflowIcon className={`h-3 w-4.5 ${dark ? "text-sky" : "text-blue"}`} />
      {children}
    </p>
  );
}
