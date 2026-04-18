import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import hero from "@/assets/hero-pool.jpg";
import entrance from "@/assets/finca-entrance.jpg";

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
  { src: hero, alt: "Pool­terrasse", span: "row-span-2" },
  { src: g1, alt: "Wohnzimmer", span: "row-span-2" },
  { src: g2, alt: "Schlafzimmer", span: "" },
  { src: g3, alt: "Terrasse mit Grill", span: "" },
  { src: g4, alt: "Pool", span: "" },
  { src: g5, alt: "Küche", span: "row-span-2" },
  { src: g6, alt: "Außenansicht", span: "" },
  { src: entrance, alt: "Einfahrt", span: "" },
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
