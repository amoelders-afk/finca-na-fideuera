import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-display text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Finca Na Fideuera — Wohlfühlfinca auf Mallorca" },
      {
        name: "description",
        content:
          "Exklusive Ferienfinca im Naturschutzgebiet bei Artà, Mallorca. 220 m², 4 Schlafzimmer, privater Pool — die Wohlfühlfinca für bis zu 8 Personen.",
      },
      { name: "author", content: "Finca Na Fideuera" },
      { property: "og:title", content: "Finca Na Fideuera — Wohlfühlfinca auf Mallorca" },
      {
        property: "og:description",
        content:
          "Exklusive Ferienfinca im Naturschutzgebiet bei Artà, Mallorca. Privater Pool, 220 m² Wohnfläche, 32.000 m² Grundstück.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Finca Na Fideuera — Wohlfühlfinca auf Mallorca" },
      { name: "description", content: "Finca Na Fideuera is a Mallorca vacation rental website showcasing property details and booking information." },
      { property: "og:description", content: "Finca Na Fideuera is a Mallorca vacation rental website showcasing property details and booking information." },
      { name: "twitter:description", content: "Finca Na Fideuera is a Mallorca vacation rental website showcasing property details and booking information." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ad0b0c63-05ab-4448-a8af-56c46d20f35a/id-preview-43198332--2a6da1b7-5f04-406c-9c12-57defa1a17b5.lovable.app-1776580409405.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ad0b0c63-05ab-4448-a8af-56c46d20f35a/id-preview-43198332--2a6da1b7-5f04-406c-9c12-57defa1a17b5.lovable.app-1776580409405.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
