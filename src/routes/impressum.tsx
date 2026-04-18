import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Finca Na Fideuera" },
      { name: "description", content: "Impressum der Finca Na Fideuera." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-foreground mb-10">Impressum</h1>
        <dl className="space-y-5 text-foreground">
          <Row label="Eigentümer" value="Ulrich Moelders" />
          <Row label="Beherbergungsbetrieb" value="Finca Na Fideuera" />
          <Row label="Lizenznummer" value="ET/2152" />
          <Row label="Spanische Steuernummer" value="Y1829912-T" />
          <Row label="Wohneinheiten" value="3 Wohneinheiten, 6 Plätze" />
          <Row label="Adresse" value="Polygon 17, Parzelle-la 125, Camí Son Boyet" />
          <Row label="Kontakt" value="finca-na-fideuera@gmx.net" />
        </dl>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 border-b border-border pb-4">
      <dt className="text-sm uppercase tracking-wider text-teal">{label}</dt>
      <dd className="md:col-span-2">{value}</dd>
    </div>
  );
}
