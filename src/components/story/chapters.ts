export type Chapter = {
  title: string;
  text: string;
};

/** "El viaje del aire": one entry per scroll chapter (index = chapter coordinate). */
export const CHAPTERS: readonly Chapter[] = [
  {
    title: "Todo empieza con una lámina",
    text: "Lámina galvanizada, recta y lisa. Sobre ella trazamos las medidas de tu proyecto.",
  },
  {
    title: "Cortamos y doblamos",
    text: "En el taller la lámina se corta, se rola y se engrapa hasta convertirse en un tramo de ducto.",
  },
  {
    title: "Armamos la red",
    text: "Unimos tramos, codos y bridas desde el equipo hasta cada rejilla de tu espacio.",
  },
  {
    title: "El aire viaja frío",
    text: "El equipo enfría el aire y la red de ductos lo lleva, sin perder frío, hasta donde se necesita.",
  },
  {
    title: "Confort en cada espacio",
    text: "El difusor reparte el aire de forma pareja y el ambiente baja a la temperatura que buscas.",
  },
];
