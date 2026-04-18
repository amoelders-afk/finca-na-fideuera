import { createFileRoute } from "@tanstack/react-router";
import { GhostHeading, Section } from "@/components/section";
import galleryImg from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/die-finca")({
  head: () => ({
    meta: [
      { title: "Die Finca — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Detaillierte Informationen zur Finca Na Fideuera: 220 m² Wohnfläche, 4 Schlafzimmer, privater Pool, voll ausgestattet für bis zu 8 Personen.",
      },
      { property: "og:title", content: "Die Finca — Finca Na Fideuera" },
      { property: "og:description", content: "220 m² Wohnfläche, 4 Schlafzimmer, privater 60 m² Pool." },
      { property: "og:image", content: galleryImg },
    ],
  }),
  component: DieFinca,
});

const details: { label: string; value: string }[] = [
  { label: "Belegung", value: "max. 8 Personen + 2 Babys/Kleinkinder" },
  { label: "Wohnfläche", value: "220 m²" },
  { label: "Grundstück", value: "32.000 m²" },
  {
    label: "Zimmer",
    value:
      "3 Schlafzimmer (Doppelbetten) + Apartment (Doppelbett + Bad), 2 Bäder (WC + Dusche/Badewanne), geräumiges Wohnzimmer (Kamin + Sofa + Esstisch), große Küche",
  },
  { label: "Pool", value: "privat, 60 m²" },
  {
    label: "Ausstattung",
    value:
      "W-LAN, Deutsches Sat-TV, Heizung, Kamin, Ventilator, Hochstuhl, Babybett, Wasch- und Spülmaschine, CD- und DVD-Player, Gasgrill, Garage, Parkplatz, Hand- und Strandtücher",
  },
  { label: "Haustiere", value: "nicht gestattet" },
];

function DieFinca() {
  return (
    <Section className="overflow-hidden">
      <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
        <GhostHeading text="DIE FINCA" />
      </div>
      <div className="relative max-w-4xl mx-auto pt-32 md:pt-48">
        <div className="text-center mb-12">
          <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Details</p>
          <h1 className="text-4xl md:text-5xl text-foreground">Alles auf einen Blick</h1>
        </div>

        <div className="bg-card rounded-sm shadow-sm divide-y divide-border">
          {details.map((d) => (
            <div
              key={d.label}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 py-5"
            >
              <dt className="text-sm uppercase tracking-wider text-teal">{d.label}</dt>
              <dd className="md:col-span-2 text-foreground leading-relaxed">{d.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
