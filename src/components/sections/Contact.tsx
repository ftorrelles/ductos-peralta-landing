import type { ReactNode } from "react";
import { EMAIL, INSTAGRAM, LOCATION, PHONES } from "@/lib/contact";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icons";
import { Rivets } from "@/components/ui/MetalCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InquiryBuilder } from "./InquiryBuilder";

const linkClass = "font-semibold text-white underline-offset-4 decoration-sky decoration-2 transition-colors hover:text-sky hover:underline";

function InfoCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="relative min-w-0 rounded-2xl border border-white/10 bg-white/[0.05] p-4 pl-[4.25rem]">
      <dt className="font-mono text-[11px] tracking-[0.06em] text-steel uppercase">
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-sky/15 text-sky"
        >
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1 flex min-w-0 flex-col gap-0.5 text-base">{children}</dd>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="px-3 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="surface-blueprint relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy text-paper shadow-[0_40px_80px_-40px_rgb(11_45_91/0.8)] sm:rounded-[2.5rem]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-airflow" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 size-[30rem] rounded-full bg-sky/20 blur-3xl" />
        <Rivets tone="dark" inset="5" />

        <div className="relative grid gap-12 px-5 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-14 lg:py-16">
          <div>
            <SectionHeader
              eyebrow="Contacto"
              tone="dark"
              layout="stack"
              titleId="contacto-title"
              title={
                <>
                  Hablemos de tu <span className="text-airflow-bright">proyecto</span>
                </>
              }
              lead="Cuéntanos qué quieres climatizar o ventilar. Con unas fotos y medidas aproximadas ya podemos orientarte."
            />

            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              <InfoCard icon={<PhoneIcon className="size-5" />} label="Teléfonos">
                {PHONES.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className={linkClass}>
                    {p.label}
                    {p.whatsapp ? <span className="ml-1.5 text-xs font-medium text-steel">· WhatsApp</span> : null}
                  </a>
                ))}
              </InfoCard>
              <InfoCard icon={<MailIcon className="size-5" />} label="Correo">
                <a href={`mailto:${EMAIL}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {EMAIL.split("@")[0]}
                  <wbr />@{EMAIL.split("@")[1]}
                </a>
              </InfoCard>
              <InfoCard icon={<InstagramIcon className="size-5" />} label="Instagram">
                <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {INSTAGRAM.handle}
                </a>
              </InfoCard>
              <InfoCard icon={<MapPinIcon className="size-5" />} label="Ubicación">
                {/* TODO: show the city once the client confirms it (see LOCATION in src/lib/contact.ts). */}
                <span className="font-semibold text-white">{LOCATION}</span>
              </InfoCard>
            </dl>
          </div>

          <InquiryBuilder />
        </div>
      </div>
    </section>
  );
}
