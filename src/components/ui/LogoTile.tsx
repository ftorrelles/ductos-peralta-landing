import Image from "next/image";

type LogoTileProps = {
  size?: number;
  className?: string;
  preload?: boolean;
};

/** The logo has a near-white background, so it always sits on a light rounded tile. */
export function LogoTile({ size = 44, className = "", preload = false }: LogoTileProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] bg-white shadow-[0_4px_12px_-6px_rgb(10_18_32/0.35)] ring-1 ring-steel ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/img/logo.jpg"
        alt="Logo de Ductos Peralta"
        width={size}
        height={size}
        preload={preload}
        className="size-full object-contain"
      />
    </span>
  );
}
