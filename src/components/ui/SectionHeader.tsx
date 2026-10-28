import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  lead?: ReactNode;
  tone?: "light" | "dark";
  /** `split` puts the lead to the right of the title on desktop; `stack` keeps it below. */
  layout?: "split" | "stack";
  className?: string;
};

/** Eyebrow pill + sentence-case title + optional lead paragraph. */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  lead,
  tone = "light",
  layout = "split",
  className = "",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  const split = layout === "split" && lead;

  return (
    <Reveal className={className}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <div className={`mt-5 ${split ? "grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-12" : ""}`}>
        <h2
          id={titleId}
          className={`heading text-[clamp(2.3rem,5.2vw,4.5rem)] ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={`max-w-xl text-lg leading-relaxed ${split ? "" : "mt-5"} ${
              dark ? "text-paper/75" : "text-muted"
            }`}
          >
            {lead}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
