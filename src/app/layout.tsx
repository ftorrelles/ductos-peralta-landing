import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ductos Peralta · Sistemas de ductos para aire acondicionado",
  description:
    "Fabricamos e instalamos sistemas de ductos para aire acondicionado, campanas de cocina, extracción y ventilación en Venezuela. Lámina galvanizada a la medida, taller propio e instalación con el mismo equipo.",
  openGraph: {
    title: "Ductos Peralta · Sistemas de ductos para aire acondicionado",
    description:
      "Ductos galvanizados, campanas, extractores y chimeneas. Taller propio e instalación en Venezuela.",
    locale: "es_VE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-screen bg-paper text-ink">{children}</body>
    </html>
  );
}
