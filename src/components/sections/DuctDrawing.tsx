/**
 * Technical blueprint of a rectangular 90° elbow with dimension callouts, drawn for a navy
 * blueprint panel. A dashed heat-to-sky stream travels along the centerline (reduced-motion safe).
 */
export function DuctDrawing({ className = "" }: { className?: string }) {
  const line = "#dce6f0";
  const dim = "var(--sky)";

  return (
    <figure className={className}>
      <figcaption className="mb-2 flex items-center justify-between gap-3 px-3 font-mono text-[11px] tracking-[0.08em] text-steel uppercase">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-airflow" />
          DT-001 · Codo 90°
        </span>
        <span>Esc. 1:10</span>
      </figcaption>
      <svg
        viewBox="0 0 520 470"
        role="img"
        aria-labelledby="dt001-title"
        className="h-auto w-full"
        fill="none"
        strokeLinecap="round"
      >
        <title id="dt001-title">Plano técnico de un codo de ducto de 90 grados con sus medidas</title>
        <defs>
          <marker id="dt-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9" fill="none" stroke={dim} strokeWidth="1.4" />
          </marker>
          <linearGradient id="dt-flow-gradient" gradientUnits="userSpaceOnUse" x1="100" y1="420" x2="460" y2="120">
            <stop offset="0" stopColor="#ff6a2b" />
            <stop offset="1" stopColor="#3fa9f5" />
          </linearGradient>
        </defs>

        {/* Elbow body (faint fill) */}
        <path d="M40 420 V300 A240 240 0 0 1 280 60 H460 V180 H280 A120 120 0 0 0 160 300 V420 Z" fill="#3fa9f5" fillOpacity="0.06" />

        {/* Centerline */}
        <path d="M100 420 V300 A180 180 0 0 1 280 120 H460" stroke={dim} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="10 4 2 4" />

        {/* Moving airflow along the centerline */}
        <path d="M100 420 V300 A180 180 0 0 1 280 120 H460" stroke="url(#dt-flow-gradient)" strokeOpacity="0.25" strokeWidth="10" />
        <path
          className="dt-flow"
          d="M100 420 V300 A180 180 0 0 1 280 120 H460"
          stroke="url(#dt-flow-gradient)"
          strokeWidth="3.5"
          strokeDasharray="14 22"
        />

        {/* Elbow body */}
        <g stroke={line} strokeWidth="2">
          <path d="M40 420 V300 A240 240 0 0 1 280 60 H460" />
          <path d="M160 420 V300 A120 120 0 0 1 280 180 H460" />
          {/* Joints */}
          <path d="M40 300 H160 M280 60 V180" strokeWidth="1.25" strokeOpacity="0.7" />
          {/* Flanges */}
          <path d="M30 420 H170 M30 428 H170 M30 420 V428 M170 420 V428" strokeWidth="1.5" />
          <path d="M460 50 V190 M468 50 V190 M460 50 H468 M460 190 H468" strokeWidth="1.5" />
        </g>

        {/* Seam / lock lines */}
        <path d="M70 420 V300 A210 210 0 0 1 280 90 H460" stroke={line} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />

        {/* A · ANCHO (inlet width) */}
        <g stroke={dim} strokeWidth="1.2">
          <path d="M40 432 V458 M160 432 V458" strokeDasharray="2 3" />
          <path d="M46 450 H154" markerStart="url(#dt-arrow)" markerEnd="url(#dt-arrow)" />
        </g>
        <text x="100" y="444" textAnchor="middle" fill={dim} className="font-mono" fontSize="12" letterSpacing="1.5">
          A · ANCHO
        </text>

        {/* B · ALTO (outlet height) */}
        <g stroke={dim} strokeWidth="1.2">
          <path d="M472 60 H506 M472 180 H506" strokeDasharray="2 3" />
          <path d="M498 66 V174" markerStart="url(#dt-arrow)" markerEnd="url(#dt-arrow)" />
        </g>
        <text
          x="488"
          y="120"
          textAnchor="middle"
          transform="rotate(-90 488 120)"
          fill={dim}
          className="font-mono"
          fontSize="12"
          letterSpacing="1.5"
        >
          B · ALTO
        </text>

        {/* Radius callout */}
        <path d="M280 300 L195 215" stroke={dim} strokeWidth="1" markerEnd="url(#dt-arrow)" />
        <circle cx="280" cy="300" r="3" fill={dim} />
        <text x="290" y="318" fill={dim} className="font-mono" fontSize="12" letterSpacing="1.5">
          R · 180
        </text>

        {/* Round duct section */}
        <g stroke={line} strokeWidth="2">
          <circle cx="390" cy="330" r="58" />
          <circle cx="390" cy="330" r="52" strokeWidth="1" strokeOpacity="0.4" />
        </g>
        <path d="M332 330 H448" stroke={dim} strokeWidth="1.2" markerStart="url(#dt-arrow)" markerEnd="url(#dt-arrow)" />
        <path d="M390 268 V392" stroke={dim} strokeWidth="1" strokeDasharray="8 3 2 3" />
        <text x="390" y="420" textAnchor="middle" fill={line} className="font-mono" fontSize="14" letterSpacing="1.5">
          Ø 12&quot;
        </text>

        {/* Gauge callout */}
        <path d="M118 140 L76 194" stroke={line} strokeWidth="1" />
        <circle cx="76" cy="194" r="3" fill={line} />
        <text x="96" y="132" fill={line} className="font-mono" fontSize="12" letterSpacing="1.5">
          CAL. 24
        </text>
        <text x="96" y="148" fill="var(--steel)" className="font-mono" fontSize="10" letterSpacing="1.2">
          LÁM. GALVANIZADA
        </text>

        {/* Air direction */}
        <path d="M100 400 V350" stroke="var(--heat)" strokeWidth="2.5" markerEnd="url(#dt-arrow)" />
        <path d="M360 120 H420" stroke="var(--sky)" strokeWidth="2.5" markerEnd="url(#dt-arrow)" />
      </svg>
    </figure>
  );
}
