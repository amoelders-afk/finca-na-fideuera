import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import hero from "@/assets/hero-pool.jpg";
import entrance from "@/assets/finca-entrance.jpg";
import poolLoungers from "@/assets/finca-pool-loungers.jpg";
import stoneEntrance from "@/assets/finca-stone-entrance.jpg";
import poolMountainView from "@/assets/finca-pool-mountain-view.jpg";
import bathroomStoneSink from "@/assets/finca-bathroom-stone-sink.jpg";
import exteriorPoolCypress from "@/assets/finca-exterior-pool-cypress.jpg";
import bedroomWoodBed from "@/assets/finca-bedroom-wood-bed.jpg";
import diningTableFireplace from "@/assets/finca-dining-table-fireplace.jpg";
import poolHouseEvening from "@/assets/finca-pool-house-evening.jpg";
import poolReeds from "@/assets/finca-pool-reeds.jpg";
import kitchen from "@/assets/finca-kitchen.jpg";
import facadeShutters from "@/assets/finca-facade-shutters.jpg";
import bathroomVanity from "@/assets/finca-bathroom-vanity.jpg";
import bathroomTub from "@/assets/finca-bathroom-tub.jpg";

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

const images = [
  { src: hero, alt: "Finca mit Pool", span: "row-span-2" },
  { src: g1, alt: "Pool und Sonnenliegen", span: "row-span-2" },
  { src: poolLoungers, alt: "Pool mit Sonnenliegen und Strohschirmen", span: "row-span-2" },
  { src: exteriorPoolCypress, alt: "Naturstein-Finca mit Pool und Zypressen", span: "" },
  { src: poolHouseEvening, alt: "Finca und Pool in Abendstimmung", span: "row-span-2" },
  { src: kitchen, alt: "Voll ausgestattete Küche", span: "" },
  { src: poolMountainView, alt: "Pool mit Blick auf die Berge", span: "" },
  { src: facadeShutters, alt: "Hausfassade mit Holzläden", span: "row-span-2" },
  { src: stoneEntrance, alt: "Hauseingang mit Natursteinfassade", span: "" },
  { src: bedroomWoodBed, alt: "Schlafzimmer mit Holzbett", span: "row-span-2" },
  { src: diningTableFireplace, alt: "Esstisch mit Kamin und Steinwand", span: "" },
  { src: bathroomStoneSink, alt: "Badezimmer mit Steinwaschbecken", span: "" },
  { src: bathroomVanity, alt: "Badezimmer mit Steinwaschtisch", span: "" },
  { src: bathroomTub, alt: "Badezimmer mit Badewanne", span: "" },
  { src: poolReeds, alt: "Pool mit Schilf und Sonnenliegen im Garten", span: "row-span-2" },
  { src: g2, alt: "Sonnenliegen am Pool", span: "" },
  { src: g3, alt: "Panoramablick mit Bergen", span: "" },
  { src: g4, alt: "Garten und Pool", span: "" },
  { src: g5, alt: "Hauseingang", span: "row-span-2" },
  { src: g6, alt: "Schlafzimmer", span: "" },
  { src: g7, alt: "Wohnzimmer mit Kamin", span: "" },
  { src: g8, alt: "Badezimmer", span: "" },
  { src: entrance, alt: "Einfahrt mit Tor", span: "" },
];

function GaleriePage() {
  return (
    <Section>
      <div className="text-center mb-16">
        <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Eindrücke</p>
        <h1 className="text-4xl md:text-5xl text-foreground">Galerie</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-sm group ${img.span}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
