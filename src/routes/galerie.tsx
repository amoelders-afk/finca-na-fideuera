import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";
import hero from "@/assets/hero-pool.jpg";
import poolLoungers from "@/assets/finca-pool-loungers.jpg";
import poolTerraceUmbrella from "@/assets/finca-pool-terrace-umbrella.jpg";
import poolMountainsReeds from "@/assets/finca-pool-mountains-reeds.jpg";
import facadeCypress from "@/assets/finca-facade-cypress.jpg";
import facadeShutters from "@/assets/finca-facade-shutters.jpg";
import stoneCourtyard from "@/assets/finca-stone-courtyard.jpg";
import stoneEntrance from "@/assets/finca-stone-entrance.jpg";
import entrance from "@/assets/finca-entrance.jpg";
import bedroomWoodBed from "@/assets/finca-bedroom-wood-bed.jpg";
import diningTableFireplace from "@/assets/finca-dining-table-fireplace.jpg";
import kitchen from "@/assets/finca-kitchen.jpg";
import bathroomStoneSink from "@/assets/finca-bathroom-stone-sink.jpg";
import bathroomVanity from "@/assets/finca-bathroom-vanity.jpg";
import bathroomTub from "@/assets/finca-bathroom-tub.jpg";
import bathroomShower from "@/assets/finca-bathroom-shower.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Bildergalerie der Finca Na Fideuera auf Mallorca. Pool, Terrasse, Innenräume und Umgebung.",
      },
      { property: "og:title", content: "Galerie — Finca Na Fideuera" },
      { property: "og:description", content: "Eindrücke von der Finca." },
      { property: "og:image", content: hero },
    ],
  }),
  component: GaleriePage,
});

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: "Außen" | "Pool" | "Innen" | "Bad";
};

const images: GalleryImage[] = [
  { src: poolTerraceUmbrella, alt: "Pool­terrasse mit Sonnenschirm", caption: "Pool­terrasse", category: "Pool" },
  { src: facadeCypress, alt: "Naturstein-Finca mit Zypressen", caption: "Fassade mit Zypressen", category: "Außen" },
  { src: bedroomWoodBed, alt: "Schlafzimmer mit Massivholzbett", caption: "Schlafzimmer", category: "Innen" },
  { src: poolLoungers, alt: "Sonnenliegen am Pool mit Strohschirmen", caption: "Sonnenliegen", category: "Pool" },
  { src: diningTableFireplace, alt: "Esstisch mit Kamin und Naturstein­wand", caption: "Esszimmer", category: "Innen" },
  { src: poolMountainsReeds, alt: "Pool mit Schilf, Zypressen und Bergblick", caption: "Pool mit Bergblick", category: "Pool" },
  { src: stoneCourtyard, alt: "Innenhof mit Naturstein-Wand und Holzläden", caption: "Innenhof", category: "Außen" },
  { src: bathroomShower, alt: "Bad mit Steinwaschbecken und Dusche", caption: "Bad mit Dusche", category: "Bad" },
  { src: kitchen, alt: "Voll ausgestattete Küche", caption: "Küche", category: "Innen" },
  { src: facadeShutters, alt: "Hausfassade mit Holzläden", caption: "Holzläden", category: "Außen" },
  { src: bathroomStoneSink, alt: "Badezimmer mit Steinwaschbecken", caption: "Steinwaschbecken", category: "Bad" },
  { src: stoneEntrance, alt: "Hauseingang mit Natursteinfassade", caption: "Eingang", category: "Außen" },
  { src: bathroomVanity, alt: "Badezimmer mit Steinwaschtisch", caption: "Waschtisch", category: "Bad" },
  { src: bathroomTub, alt: "Badezimmer mit Badewanne", caption: "Badewanne", category: "Bad" },
  { src: entrance, alt: "Einfahrt mit Tor 'Na Fideuera'", caption: "Einfahrt", category: "Außen" },
];

function GaleriePage() {
  return (
    <Section>
      <div className="text-center mb-16">
        <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Eindrücke</p>
        <h1 className="text-4xl md:text-5xl text-foreground mb-6">Galerie</h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Pool, Terrassen, Wohnräume und Bäder — ein Blick auf die Finca Na Fideuera.
        </p>
      </div>

      {/* Masonry mit CSS columns – natürlich variierende Höhen */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 [column-fill:_balance]">
        {images.map((img, i) => (
          <figure
            key={i}
            className="relative mb-4 lg:mb-6 break-inside-avoid overflow-hidden rounded-sm group bg-secondary/40"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto block object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            {/* Overlay mit Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <figcaption className="absolute left-0 right-0 bottom-0 p-5 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-teal-foreground/90 bg-teal/80 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit mb-2">
                {img.category}
              </span>
              <span className="block text-base font-medium drop-shadow">{img.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
