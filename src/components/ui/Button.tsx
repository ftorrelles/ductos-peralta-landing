import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

export type ButtonVariant = "primary" | "secondary" | "light" | "secondary-dark";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn-primary text-white",
  secondary: "border-[1.5px] border-ink/70 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.06]",
  light: "bg-white text-navy shadow-[0_8px_20px_-10px_rgb(0_0_0/0.5)] hover:bg-paper",
  "secondary-dark": "border-[1.5px] border-white/40 bg-transparent text-white hover:border-white/70 hover:bg-white/10",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "gap-2 px-4 py-2 text-sm",
  md: "gap-2.5 px-6 py-3 text-[15px]",
  lg: "gap-3 px-7 py-4 text-base",
};

/** Shared pill classes so `<button>` elements can match `ButtonLink`. */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  return `sheen group inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow,transform] duration-200 motion-safe:active:scale-[0.98] ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon (e.g. WhatsApp). */
  icon?: ReactNode;
  /** Trailing arrow that nudges on hover. */
  arrow?: boolean;
  external?: boolean;
  children: ReactNode;
};

/** Rounded pill link button. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  arrow = false,
  external = false,
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {arrow ? (
        <ArrowRightIcon className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}
