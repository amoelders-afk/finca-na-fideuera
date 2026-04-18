import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { de } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

type RawEvent = { start: string; end: string; summary: string };
type Booking = { start: Date; end: Date };

function isBooked(day: Date, bookings: Booking[]) {
  return bookings.some((b) =>
    // iCal end dates are exclusive — treat range as [start, end)
    isWithinInterval(day, { start: b.start, end: new Date(b.end.getTime() - 1) }) ||
    isSameDay(day, b.start),
  );
}

function MonthGrid({ month, bookings }: { month: Date; bookings: Booking[] }) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div>
      <h3 className="text-base font-medium mb-3 text-center capitalize">
        {format(month, "MMMM yyyy", { locale: de })}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-[0.7rem] uppercase tracking-wider text-muted-foreground mb-2">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
          <div key={d} className="text-center py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === month.getMonth();
          const booked = isBooked(day, bookings);
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={day.toISOString()}
              className={[
                "aspect-square flex items-center justify-center text-sm rounded-sm transition-colors",
                !inMonth && "text-muted-foreground/30",
                inMonth && booked && "bg-coral text-coral-foreground line-through",
                inMonth && !booked && "bg-muted/40 hover:bg-muted",
                isToday && "ring-2 ring-teal ring-offset-1 ring-offset-background",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar() {
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        setEvents(d.events || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const bookings = useMemo<Booking[]>(
    () => events.map((e) => ({ start: new Date(e.start), end: new Date(e.end) })),
    [events],
  );

  const baseMonth = useMemo(() => addMonths(startOfMonth(new Date()), offset), [offset]);
  const months = [baseMonth, addMonths(baseMonth, 1), addMonths(baseMonth, 2)];

  return (
    <div className="bg-background text-foreground rounded-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl">Belegung</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Rote Tage sind belegt — graue Tage sind frei.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffset((o) => o - 1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Vorherige Monate"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => setOffset(0)}
            className="text-xs uppercase tracking-wider px-3 py-1 hover:bg-muted rounded-full transition-colors"
          >
            Heute
          </button>
          <button
            onClick={() => setOffset((o) => o + 1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Nächste Monate"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Lade Belegung…</p>}
      {error && (
        <p className="text-sm text-coral mb-4">
          Hinweis: {error}
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {months.map((m) => (
          <MonthGrid key={m.toISOString()} month={m} bookings={bookings} />
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-muted/40 border border-border" /> Frei
        </div>
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-coral" /> Belegt
        </div>
      </div>
    </div>
  );
}
