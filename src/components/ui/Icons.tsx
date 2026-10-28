import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function Svg({ children, viewBox = "0 0 24 24", className = "size-5", ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Three short drifting air streams (animated via `.airflow-icon`, reduced-motion safe). */
export function AirflowIcon({ className = "h-3 w-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" className={`airflow-icon ${className}`}>
      <path d="M1 3.5c4-2 7 2 11 0s7-2 11 0" />
      <path d="M1 8c4-2 7 2 11 0s7-2 11 0" />
      <path d="M1 12.5c4-2 7 2 11 0s7-2 11 0" />
    </svg>
  );
}

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15m-5-5 5 5-5 5" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </Svg>
);

export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Svg>
);

/** Workshop / factory roofline. */
export const WorkshopIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 20V10l5 3v-3l5 3V5h4v15Z" />
    <path d="M3 20h18M7 17h2m3 0h2" />
  </Svg>
);

/** Stacked galvanized sheets. */
export const SheetsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </Svg>
);

export const BadgeCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 14.3 5l2.7-.2.9 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.9 2.6-2.7-.2L12 20.5 9.7 19l-2.7.2-.9-2.6-2.2-1.6.9-2.6-.9-2.6 2.2-1.6.9-2.6 2.7.2Z" />
    <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
  </Svg>
);

/** Rectangular 90° duct elbow with flanges. */
export const ElbowIcon = (p: IconProps) => (
  <Svg viewBox="0 0 48 48" {...p}>
    <path d="M9 42V25A17 17 0 0 1 26 8h14" />
    <path d="M20 42V26a6 6 0 0 1 6-6h14" />
    <path d="M6 42h17M40 5v18" />
    <path d="M14.5 42V25.5A11.5 11.5 0 0 1 26 14h14" strokeDasharray="2 3" strokeOpacity="0.55" />
  </Svg>
);

/** Kitchen hood with exhaust duct. */
export const HoodIcon = (p: IconProps) => (
  <Svg viewBox="0 0 48 48" {...p}>
    <path d="M20 4v12m8-12v12" />
    <path d="M17 16h14l11 13H6Z" />
    <path d="M4 29h40v4H4Z" />
    <path d="M15 41c1.5-2 1.5-3 0-5m9 5c1.5-2 1.5-3 0-5m9 5c1.5-2 1.5-3 0-5" strokeOpacity="0.6" />
  </Svg>
);

/** Axial fan with a service wrench. */
export const FanServiceIcon = (p: IconProps) => (
  <Svg viewBox="0 0 48 48" {...p}>
    <circle cx="20" cy="20" r="14" />
    <circle cx="20" cy="20" r="2.5" />
    <path d="M20 17.5c-1-5 1-9 5-9 2 3-1 7-5 9Z" />
    <path d="M22.2 21.3c4.8 1.7 7.3 5.3 5.3 8.7-3.6.2-5.7-4.2-5.3-8.7Z" />
    <path d="M17.8 21.2c-3.8 3.4-8.1 3.8-10.1.4 1.6-3.2 6.4-3 10.1-.4Z" />
    <path d="m33 33 9 9" strokeWidth="3.2" />
    <path d="M30.6 37.4a5 5 0 0 1 6.8-6.8l-3 3 .9 2.1 2.1.9 3-3" />
  </Svg>
);
