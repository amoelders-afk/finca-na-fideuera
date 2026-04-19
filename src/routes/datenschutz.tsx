import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/section";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Finca Na Fideuera gemäß DSGVO.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-foreground">
        <h1 className="text-4xl md:text-5xl mb-10">Datenschutzerklärung</h1>

        <div className="space-y-10 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3 text-teal">1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-3">
              Ulrich Moelders<br />
              Finca Na Fideuera<br />
              Polygon 17, Parzelle-la 125, Camí Son Boyet<br />
              E-Mail: sarah.hofer0608@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Wir erheben personenbezogene Daten nur dann, wenn Sie uns diese
              im Rahmen des Kontaktformulars freiwillig mitteilen. Dazu
              gehören Name, E-Mail-Adresse, gewünschter Reisezeitraum,
              Anzahl der Personen sowie der Inhalt Ihrer Nachricht.
            </p>
            <p className="mt-3">
              Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer
              Anfrage. Eine Weitergabe an Dritte erfolgt nicht, außer dies
              ist zur Vertragsdurchführung erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              3. Rechtsgrundlage
            </h2>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO (Anbahnung eines Vertragsverhältnisses) sowie Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
              Ihrer Anfrage).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              4. Speicherdauer
            </h2>
            <p>
              Ihre Daten werden gelöscht, sobald sie für die Erreichung des
              Zwecks ihrer Erhebung nicht mehr erforderlich sind, spätestens
              jedoch nach Ablauf gesetzlicher Aufbewahrungspflichten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              5. E-Mail-Versand
            </h2>
            <p>
              Anfragen aus dem Kontaktformular werden per E-Mail über
              unseren Versanddienst übermittelt. Dabei werden Ihre Angaben
              verschlüsselt übertragen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              6. Verfügbarkeitskalender (Google Calendar)
            </h2>
            <p>
              Zur Darstellung der Buchungsverfügbarkeit binden wir einen
              Kalender von Google Calendar ein. Beim Aufruf der Seite mit
              dem Verfügbarkeitskalender wird eine Verbindung zu Google
              hergestellt und Kalenderdaten (Belegungszeiträume) abgerufen.
            </p>
            <p className="mt-3">
              Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Bereitstellung eines
              Verfügbarkeitsüberblicks für potenzielle Gäste). Die
              übermittelten Daten umfassen keine personenbezogenen Gästedaten,
              sondern lediglich allgemeine Belegungsinformationen.
            </p>
            <p className="mt-3">
              Google ist ein Drittanbieter mit Sitz in den USA. Die
              Datenübermittlung erfolgt auf Grundlage der
              Standardvertragsklauseln der EU-Kommission. Weitere
              Informationen zum Datenschutz bei Google finden Sie in der{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal">Google-Datenschutzerklärung</a>.
            </p>
          </section>


          <section>
            <h2 className="text-2xl mb-3 text-teal">
              7. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
              sowie Widerspruch gegen die Verarbeitung Ihrer Daten. Bitte
              wenden Sie sich hierzu an die oben genannte E-Mail-Adresse.
            </p>
            <p className="mt-3">
              Zudem steht Ihnen ein Beschwerderecht bei der zuständigen
              Datenschutzaufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              8. Cookies & Tracking
            </h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies und keine
              Analysedienste von Drittanbietern.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3 text-teal">
              9. Hosting
            </h2>
            <p>
              Diese Website wird auf Servern unseres Hosting-Anbieters
              betrieben. Beim Aufruf werden technische Daten wie IP-Adresse,
              Browsertyp und Zugriffszeitpunkt zur Sicherstellung des
              Betriebs verarbeitet.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
