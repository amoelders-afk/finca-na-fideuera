import { createFileRoute } from "@tanstack/react-router";
import { GhostHeading, Section } from "@/components/section";
import locationImg from "@/assets/location-aerial.jpg";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Die Finca Na Fideuera liegt inmitten der Natur bei Artà, Mallorca – nahe Cala Rajada, Cala Mesquida, Naturpark und Golfplatz Capdepera.",
      },
      { property: "og:title", content: "Location — Finca Na Fideuera" },
      { property: "og:description", content: "Idyllisch gelegen bei Artà im Nordosten Mallorcas." },
      { property: "og:image", content: locationImg },
    ],
  }),
  component: LocationPage,
});

const labels = [
  { name: "Na Fideuera", x: "72%", y: "32%", primary: true },
  { name: "Artà", x: "68%", y: "38%" },
  { name: "Cala Rajada", x: "85%", y: "30%" },
  { name: "Cala Mesquida", x: "82%", y: "22%" },
  { name: "Cala Millor", x: "78%", y: "55%" },
  { name: "Porto Cristo", x: "70%", y: "65%" },
  { name: "Palma de Mallorca", x: "28%", y: "62%" },
];

function LocationPage() {
  return (
    <Section className="overflow-hidden">
      <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
        <GhostHeading text="LOCATION" />
      </div>

      <div className="relative pt-24 md:pt-32 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Lage</p>
          <h1 className="text-4xl md:text-5xl text-foreground mb-6">Im Herzen von Mallorca</h1>
          <p className="text-muted-foreground leading-relaxed">
            Die Finca befindet sich nur 5 Minuten von dem wunderschönen
            mittelalterlichen Dorf Artà entfernt. Die Entfernung vom Flughafen
            Palma de Mallorca beträgt ca. 55 km. Die Lage von Na Fideuera hat
            für jeden Geschmack etwas zu bieten. Unberührte Naturstrände,
            exzellente Restaurants, ikonische Bars, diverse Golfplätze,
            historische Innenstädte oder einfach eine Wanderung durch die
            Naturschutzgebiete vor Ihrer Haustür.
          </p>
        </div>

        {/* Stylized Mallorca map */}
        <div className="relative aspect-[4/3] bg-accent/40 rounded-sm overflow-hidden">
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Stylized Mallorca shape */}
            <path
              d="M70,180 Q40,140 60,100 Q90,60 160,55 Q220,50 280,70 Q340,85 360,130 Q370,175 340,210 Q300,245 230,250 Q160,255 110,235 Q80,215 70,180 Z"
              fill="oklch(0.94 0.02 195)"
              stroke="oklch(0.68 0.09 195)"
              strokeWidth="1.5"
            />
          </svg>
          {labels.map((l) => (
            <div
              key={l.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              style={{ left: l.x, top: l.y }}
            >
              <span
                className={`block rounded-full ${
                  l.primary ? "w-3 h-3 bg-coral" : "w-2 h-2 bg-teal"
                }`}
              />
              <span
                className={`text-[10px] md:text-xs whitespace-nowrap ${
                  l.primary ? "font-semibold text-coral" : "text-foreground"
                }`}
              >
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
