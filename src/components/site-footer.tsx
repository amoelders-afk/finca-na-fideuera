import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">© 2026 by na-Fideuera</p>
        <nav className="flex items-center gap-6">
          <Link
            to="/impressum"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Impressum
          </Link>
          <Link
            to="/datenschutz"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
