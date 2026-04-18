import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/section";
import { Euro } from "lucide-react";

export const Route = createFileRoute("/preise")({
  head: () => ({
    meta: [
      { title: "Preise — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Preiskatalog der Finca Na Fideuera. Übernachtungspreise nach Saison und Anzahl Schlafzimmer. Nebensaison ab 270 €, Hauptsaison ab 350 €.",
      },
      { property: "og:title", content: "Preise — Finca Na Fideuera" },
      { property: "og:description", content: "Übernachtungspreise nach Saison." },
    ],
  }),
  component: PreisePage,
});

const seasons = [
  {
    name: "Nebensaison",
    months: "April · Mai · Oktober",
    p1: "270 €",
    p2: "320 €",
  },
  {
    name: "Hauptsaison",
    months: "Juni · Juli · August · September",
    p1: "350 €",
    p2: "400 €",
    featured: true,
  },
  {
    name: "Winter",
    months: "November · Dezember · Januar · Februar · März",
    p1: "200 €",
    p2: "250 €",
  },
];

function PreisePage() {
  return (
    <Section>
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center">
            <Euro className="text-coral" size={24} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl text-foreground mb-4">Preiskatalog</h1>
        <p className="text-sm text-muted-foreground">
          Preise gelten pro Nacht und richten sich nach Anzahl benötigter Schlafzimmer.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {seasons.map((s) => (
          <div
            key={s.name}
            className={`bg-card rounded-sm p-8 flex flex-col ${
              s.featured ? "ring-2 ring-coral shadow-xl md:-translate-y-4" : "shadow-sm"
            }`}
          >
            <h2 className="text-3xl text-foreground mb-1">{s.name}</h2>
            <p className="text-xs uppercase tracking-wider text-teal mb-8">{s.months}</p>

            <div className="space-y-4 mb-8 flex-1">
              <div className="flex justify-between items-baseline border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">bis 4 Personen</span>
                <span className="text-2xl text-coral font-display">{s.p1}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">ab 5 Personen</span>
                <span className="text-2xl text-coral font-display">{s.p2}</span>
              </div>
            </div>

            <Link
              to="/kontakt"
              className="block text-center w-full rounded-full bg-coral px-6 py-3 text-coral-foreground text-sm uppercase tracking-widest hover:bg-coral/90 transition-colors"
            >
              Anfragen
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
