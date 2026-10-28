"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CanvasBoundary } from "./CanvasBoundary";
import { CHAPTERS } from "./chapters";
import { backgroundAt, chapterCoordFromRect, rgbCss, temperatureAt, LAST_CHAPTER } from "./timeline";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const StoryCanvas = dynamic(() => import("./StoryCanvas"), { ssr: false, loading: () => null });

/**
 * Scroll-driven story "El viaje del aire".
 *
 * A tall section holds a sticky 100vh stage with the WebGL canvas. Scroll progress is read with a
 * passive listener into `coordRef` (no React state per frame); the canvas reads that ref inside
 * `useFrame`. DOM overlays (background, temperature, progress rail) are written imperatively in the
 * same rAF tick; only the active chapter index lives in React state, and it changes 5 times total.
 */
export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const tempValueRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const coordRef = useRef(0);

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const c = chapterCoordFromRect(section.getBoundingClientRect(), window.innerHeight);
      coordRef.current = c;

      const bg = backgroundAt(c);
      const stage = stageRef.current;
      if (stage) {
        stage.style.backgroundColor = rgbCss(bg.color);
        stage.dataset.tone = bg.dark ? "dark" : "light";
      }

      const temp = temperatureAt(c);
      if (tempRef.current) tempRef.current.style.opacity = String(temp.visible);
      if (tempValueRef.current) {
        tempValueRef.current.textContent = `${Math.round(temp.value)}°C`;
        tempValueRef.current.style.color = rgbCss(temp.color);
      }
      if (railRef.current) railRef.current.style.transform = `scaleX(${c / LAST_CHAPTER})`;

      setActive(Math.round(c));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    observer.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  const current = CHAPTERS[active];

  return (
    <>
      <div id="historia" className="scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-10 lg:pt-24">
          <SectionHeader
            eyebrow="El viaje del aire"
            titleId="historia-title"
            title={
              <>
                Del taller a <span className="text-airflow">tu espacio</span>
              </>
            }
            lead="Así una lámina galvanizada termina convertida en aire fresco. Baja para ver el recorrido."
          />
        </div>
      </div>

      <section ref={sectionRef} aria-labelledby="historia-title" className="relative h-[550vh]">
        {/* Sticky stage */}
        <div
          ref={stageRef}
          data-tone="light"
          className="group/stage sticky top-0 h-svh overflow-hidden bg-paper transition-colors duration-300"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <CanvasBoundary>
              <StoryCanvas coordRef={coordRef} active={inView} reducedMotion={reducedMotion} />
            </CanvasBoundary>
          </div>

          {/* HUD */}
          <div className="pointer-events-none absolute top-20 right-4 left-4 flex items-start justify-between gap-3 sm:right-6 sm:left-auto sm:flex-col sm:items-end lg:right-10">
            <div className="rounded-full border border-steel/70 bg-white/70 px-4 py-2 text-ink shadow-sm backdrop-blur-md transition-colors duration-300 group-data-[tone=dark]/stage:border-white/15 group-data-[tone=dark]/stage:bg-ink/50 group-data-[tone=dark]/stage:text-paper">
              <p className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase">
                <span className="hidden sm:inline">El viaje del aire · </span>
                <span>
                  Capítulo {active + 1} de {CHAPTERS.length}
                </span>
              </p>
              <span className="mt-1.5 block h-1 w-28 overflow-hidden rounded-full bg-current/15 sm:w-full">
                <span ref={railRef} className="block h-full origin-left scale-x-0 bg-airflow" />
              </span>
            </div>
            <div
              ref={tempRef}
              className="rounded-2xl border border-white/15 bg-ink/50 px-4 py-2.5 text-right opacity-0 shadow-sm backdrop-blur-md"
              aria-hidden="true"
            >
              <span className="block font-mono text-[11px] tracking-[0.06em] text-paper/70 uppercase">

                <span className="hidden sm:inline">Temperatura del ambiente</span>
                <span className="sm:hidden">Ambiente</span>
              </span>
              <span ref={tempValueRef} className="heading block text-5xl text-heat tabular-nums sm:text-6xl">
                32°C
              </span>
            </div>
          </div>

          {/* Mobile: active chapter as a bottom overlay */}
          <div className="absolute inset-x-3 bottom-20 md:hidden" aria-live="polite">
            <ChapterCard key={active} index={active} title={current.title} text={current.text} active animate />
          </div>
        </div>

        {/* Desktop: chapter cards scroll over the stage */}
        <ol className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {CHAPTERS.map((chapter, i) => (
            <li key={chapter.title} className="flex h-[110vh] items-center px-6 lg:px-10">
              <div className="pointer-events-auto mx-auto w-full max-w-7xl">
                <div className="max-w-md">
                  <ChapterCard index={i} title={chapter.title} text={chapter.text} active={i === active} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

type ChapterCardProps = {
  index: number;
  title: string;
  text: string;
  active: boolean;
  animate?: boolean;
};

function ChapterCard({ index, title, text, active, animate = false }: ChapterCardProps) {
  return (
    <article
      className={`rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_24px_50px_-24px_rgb(10_18_32/0.45)] backdrop-blur-md transition-opacity duration-500 sm:p-6 ${
        active ? "opacity-100" : "opacity-45"
      } ${animate ? "motion-safe:animate-fade-up" : ""}`}
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-steel bg-white/80 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.06em] text-blue uppercase">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-airflow" />
        Capítulo {index + 1}
      </p>
      <h3 className="heading mt-3 text-3xl text-ink sm:text-4xl">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink/80">{text}</p>
      <span aria-hidden="true" className="mt-5 block h-1 overflow-hidden rounded-full bg-steel/40">
        <span
          className="block h-full rounded-full bg-airflow"
          style={{ width: `${((index + 1) / CHAPTERS.length) * 100}%` }}
        />
      </span>
    </article>
  );
}
