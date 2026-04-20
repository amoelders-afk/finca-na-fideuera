import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { AvailabilityCalendar } from "@/components/availability-calendar";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Finca Na Fideuera" },
      {
        name: "description",
        content:
          "Kontaktieren Sie uns für Buchungsanfragen und Informationen zur Finca Na Fideuera auf Mallorca. Wir freuen uns auf Ihre Anfrage!",
      },
      { property: "og:title", content: "Kontakt — Finca Na Fideuera" },
      { property: "og:description", content: "Unverbindliche Anfrage stellen." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    von: "",
    bis: "",
    personen: "",
    nachricht: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Senden fehlgeschlagen");
      }
      toast.success("Vielen Dank! Ihre Anfrage wurde gesendet.");
      setForm({ name: "", email: "", von: "", bis: "", personen: "", nachricht: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Senden fehlgeschlagen");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <Toaster />
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <h1 className="text-5xl md:text-7xl">Kontakt</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Kontaktieren Sie uns gerne für eine unverbindliche Anfrage.
            </p>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 mb-12 flex items-center justify-between flex-wrap gap-4">
            <span className="text-primary-foreground/70">sarah.hofer0608@gmail.com</span>
            <a
              href="mailto:sarah.hofer0608@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3 text-coral-foreground text-sm uppercase tracking-widest hover:bg-coral/90 transition-colors"
            >
              Hier
            </a>
          </div>

          <div className="mb-12">
            <AvailabilityCalendar />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-background text-foreground rounded-sm p-8 md:p-12 grid gap-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Name" required>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="input-base"
                />
              </Field>
              <Field label="E-Mail" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  className="input-base"
                />
              </Field>
              <Field label="Reisezeitraum (Von)">
                <input
                  type="date"
                  value={form.von}
                  onChange={update("von")}
                  className="input-base"
                />
              </Field>
              <Field label="Reisezeitraum (Bis)">
                <input
                  type="date"
                  value={form.bis}
                  onChange={update("bis")}
                  className="input-base"
                />
              </Field>
              <Field label="Anzahl Personen">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.personen}
                  onChange={update("personen")}
                  className="input-base"
                />
              </Field>
            </div>
            <Field label="Nachricht">
              <textarea
                rows={5}
                value={form.nachricht}
                onChange={update("nachricht")}
                className="input-base resize-none"
              />
            </Field>
            <button
              type="submit"
              disabled={submitting}
              className="justify-self-start inline-flex items-center gap-2 rounded-full bg-coral px-8 py-3 text-coral-foreground text-sm uppercase tracking-widest hover:bg-coral/90 transition-colors disabled:opacity-60"
            >
              {submitting ? "Senden..." : "Senden"}
            </button>
          </form>
        </div>
      </section>

      <style>{`
        .input-base {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.5rem 0;
          font-size: 0.95rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.2s;
        }
        .input-base:focus {
          border-bottom-color: var(--teal);
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      {children}
    </label>
  );
}
