"use client";

import { useId, useState, type FormEvent } from "react";
import { buildInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const NEEDS = ["Ductos para A/A", "Campana / extracción", "Extractor", "Mantenimiento", "Aún no sé"];
const SPACES = ["Oficina", "Comercio", "Restaurante", "Industria", "Vivienda"];

const labelClass = "font-mono text-[11px] font-medium tracking-[0.08em] text-steel uppercase";
const fieldClass =
  "mt-2 w-full rounded-xl border border-steel/40 bg-ink/30 px-4 py-3 text-base text-white transition-colors placeholder:text-steel/60 hover:border-steel/70 focus:border-sky focus:bg-ink/50";

type ChipProps = {
  label: string;
  pressed: boolean;
  onToggle: () => void;
};

function Chip({ label, pressed, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
        pressed
          ? "border-sky bg-sky text-ink"
          : "border-white/25 bg-white/5 text-paper hover:border-white/50 hover:bg-white/10"
      }`}
    >
      {pressed ? <CheckIcon className="size-4" strokeWidth={2.5} /> : null}
      {label}
    </button>
  );
}

/** "Arma tu consulta": builds a WhatsApp message from chips + free text. */
export function InquiryBuilder() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [space, setSpace] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const nameId = useId();
  const ideaId = useId();
  const previewId = useId();

  const message = buildInquiryMessage({ needs, space, name, idea });

  const toggleNeed = (need: string) => {
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="consulta-title"
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:rounded-3xl sm:p-7"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
        <h3 id="consulta-title" className="heading text-2xl text-white sm:text-3xl">
          Arma tu consulta
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp/15 px-3 py-1 text-xs font-semibold text-whatsapp">
          <WhatsAppIcon className="size-3.5" />
          WhatsApp
        </span>
      </div>

      <fieldset className="mt-6">
        <legend className={labelClass}>¿Qué necesitas?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((need) => (
            <Chip key={need} label={need} pressed={needs.includes(need)} onToggle={() => toggleNeed(need)} />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={labelClass}>Tipo de espacio</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SPACES.map((option) => (
            <Chip
              key={option}
              label={option}
              pressed={space === option}
              onToggle={() => setSpace((current) => (current === option ? null : option))}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor={nameId} className={labelClass}>
          Tu nombre
        </label>
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. María González"
          className={fieldClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={ideaId} className={labelClass}>
          Cuéntanos tu idea
        </label>
        <textarea
          id={ideaId}
          rows={4}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Ej. Necesito llevar el aire de un equipo de 5 toneladas a tres oficinas…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="mt-5">
        <p id={previewId} className={labelClass}>
          Vista previa del mensaje
        </p>
        <pre
          aria-labelledby={previewId}
          className="mt-2 rounded-xl border border-white/10 bg-ink/40 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-paper/85"
        >
          {message}
        </pre>
      </div>

      <button type="submit" className={buttonClasses("primary", "lg", "mt-6 w-full ring-1 ring-sky/40")}>
        <WhatsAppIcon className="size-5" />
        Enviar por WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-steel">Se abre WhatsApp con el mensaje listo. Tú decides si lo envías.</p>
    </form>
  );
}
