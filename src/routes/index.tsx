import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-pool.jpg";
import entranceImg from "@/assets/finca-entrance.jpg";
import artaImg from "@/assets/arta.jpg";
import naturparkImg from "@/assets/naturpark.jpg";
import calaRajadaImg from "@/assets/cala-rajada.jpg";
import golfImg from "@/assets/golf.jpg";
import mesquidaImg from "@/assets/mesquida.jpg";
import covesImg from "@/assets/coves.jpg";
import { GhostHeading, Section } from "@/components/section";
import {
  Home,
  BedDouble,
  Bath,
  Utensils,
  Wifi,
  Flame,
  Waves,
  Phone,
  Sparkles,
  Baby,
  PartyPopper,
  Handshake,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finca Na Fideuera — Wohlfühlfinca auf Mallorca" },
      {
        name: "description",
        content:
          "Willkommen auf der Finca Na Fideuera. Exklusive Ferienfinca im Naturschutzgebiet bei Artà mit privatem Pool, 4 Schlafzimmern und 32.000 m² Grundstück.",
      },
      { property: "og:title", content: "Finca Na Fideuera — Wohlfühlfinca auf Mallorca" },
      {
        property: "og:description",
        content:
          "Exklusive Ferienfinca im Naturschutzgebiet bei Artà — privater Pool, 220 m² Wohnfläche, 32.000 m² Grundstück.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const features = [
  { Icon: Home, label: "220 m² Wohnfläche" },
  { Icon: BedDouble, label: "4 Schlafzimmer" },
  { Icon: Bath, label: "3 Badezimmer" },
  { Icon: Utensils, label: "Geräumige Küche" },
  { Icon: Wifi, label: "High Speed W-LAN" },
  { Icon: Flame, label: "Weber Gasgrill" },
  { Icon: Waves, label: "60 m² Pool · 6 Liegen" },
];

const excursions = [
  {
    cat: "Kultur",
    name: "ARTÀ",
    img: artaImg,
    text: "Das mittelalterliche Dorf hat neben vielen Restaurants, Cafés, Boutiquen, auch einen sehr schönen Wochenmarkt. Über den alten spanischen Sandsteinhäusern liegt die Festung Sant Salvador mit Wallfahrtskirche.",
  },
  {
    cat: "Wandern",
    name: "NATURPARK",
    img: naturparkImg,
    text: "Das Naturschutzgebiet de la peninsula de Llevant befindet sich direkt vor Ihrer Haustür. Viele Routen laden zu einer Wanderung durch die Hügellandschaft ein.",
  },
  {
    cat: "Bars",
    name: "CALA RAJADA",
    img: calaRajadaImg,
    text: "Die Stadt ist für ihre kulinarischen Restaurants, sowie für ihr Nachtleben bekannt. Bloß 10 Minuten von guten Cocktails, Shops und leckeren Tapas entfernt.",
  },
  {
    cat: "Sport",
    name: "GOLF CAPDEPERA",
    img: golfImg,
    text: "Einer der schönsten Golfplätze der Insel liegt in der direkten Nachbarschaft. Ein Ort der Ruhe und Entspannung in einer idyllischen Oase.",
  },
  {
    cat: "Erholung",
    name: "CALA MESQUIDA",
    img: mesquidaImg,
    text: "Diese Bucht geprägt von ihrem breiten Sandstrand liegt mitten in einer Dünenlandschaft. Der Strand bietet alle Annehmlichkeiten, die ein Touristenstrand zu bieten hat.",
  },
  {
    cat: "Erkunden",
    name: "COVES DEL DRAC",
    img: covesImg,
    text: "Die Coves del Drac sind ein großes Höhlensystem südlich von Porto Cristo. Neben Stalagmiten und Stalaktiten kann man hier den größten unterirdischen See Europas besichtigen.",
  },
];

const services = [
  { Icon: Phone, text: "Schnelle Hilfe Notfallnummer" },
  { Icon: Sparkles, text: "Endreinigung inklusive" },
  { Icon: Baby, text: "Ausstattung für bis zu 2 Kleinkinder/Babys" },
  { Icon: PartyPopper, text: "Events oder Feiern? Sprechen Sie uns an!" },
  { Icon: Handshake, text: "Ohne Kaution" },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Pool­terrasse der Finca Na Fideuera"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-white text-[18vw] md:text-[10rem] leading-none tracking-wide drop-shadow-lg">
            BIENVENIDO
          </h1>
          <p className="mt-4 text-white/95 text-lg md:text-xl max-w-2xl drop-shadow">
            Willkommen auf der Finca Na Fideuera.
            <br />
            Die Wohlfühlfinca auf Mallorca.
          </p>
          <Link
            to="/die-finca"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3 text-coral-foreground text-sm uppercase tracking-widest hover:bg-coral/90 transition-colors"
          >
            Mehr erfahren <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ÜBER */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Über uns</p>
            <h2 className="text-4xl md:text-5xl text-foreground mb-6">Inmitten der Natur</h2>
            <p className="text-muted-foreground leading-relaxed">
              Die Finca „Na Fideuera" bietet einen exklusiven Urlaub inmitten eines
              Naturschutzgebietes, eingebettet in der Hügellandschaft von Artà. Sie
              glänzt mit vielen kleinen Details und verbreitet somit eine idyllische
              Atmosphäre. Die typisch mallorquinische Natursteinfinca umfasst ein
              32.000 m² großes Areal und schafft dadurch eine ausgezeichnete
              Privatsphäre. Auf den 3 Terrassen können Sie Ihren Urlaub zu jeder
              Tageszeit perfekt genießen.
            </p>
          </div>
          <div className="relative">
            <img
              src={entranceImg}
              alt="Einfahrt zur Finca mit Steinmauer"
              className="w-full h-[500px] object-cover rounded-sm"
              loading="lazy"
              width={1280}
              height={1280}
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 border-t border-border pt-12">
          {features.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <Icon className="text-teal" size={28} strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* AUSFLUGSZIELE */}
      <Section className="bg-secondary/40">
        <div className="text-center mb-16">
          <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Entdecken</p>
          <h2 className="text-4xl md:text-5xl text-foreground">Ausflugsziele</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursions.map((e) => (
            <article
              key={e.name}
              className="group bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={e.img}
                  alt={e.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-teal text-teal-foreground text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  {e.cat}
                </span>
                <h3 className="text-2xl text-foreground mb-3">{e.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* SERVICE */}
      <Section className="overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <GhostHeading text="SERVICE" />
        </div>
        <div className="relative">
          <div className="text-center mb-16">
            <p className="text-teal text-xs uppercase tracking-[0.3em] mb-4">Inklusive</p>
            <h2 className="text-4xl md:text-5xl text-foreground">Unser Service</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {services.map(({ Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                  <Icon className="text-teal" size={26} strokeWidth={1.5} />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl">Bereit für Ihren Traumurlaub?</h2>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3 text-coral-foreground text-sm uppercase tracking-widest hover:bg-coral/90 transition-colors"
          >
            Jetzt anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
