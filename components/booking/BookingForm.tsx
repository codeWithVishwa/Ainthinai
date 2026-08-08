"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { money } from "@/content/elements";
import { rooms, findRoom, roomElement } from "@/content/rooms";
import { RULE } from "../ui/primitives";

/**
 * Booking request form.
 *
 * No availability service exists yet, so submitting routes to the confirmation
 * screen with the details in the query string. Swapping that for a POST is the
 * only change needed when a backend arrives.
 */

const TAX = 0.18;

/** Today's date, read without risking a hydration mismatch.
 *  The server has no useful clock for the visitor, so it returns "" and the
 *  client fills it in during hydration. */
function useToday(): string {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const d = new Date();
      d.setHours(12, 0, 0, 0);
      return d.toISOString().slice(0, 10);
    },
    () => "",
  );
}

const addDays = (isoDate: string, n: number) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const nightsBetween = (a: string, b: string) => {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
};

export default function BookingForm({ initialRoom }: { initialRoom?: string }) {
  const router = useRouter();
  const today = useToday();

  const [roomSlug, setRoomSlug] = useState(initialRoom ?? rooms[0].slug);
  // null means "not touched" — the default is derived from today instead.
  const [arriveRaw, setArrive] = useState<string | null>(null);
  const [departRaw, setDepart] = useState<string | null>(null);
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const arrive = arriveRaw ?? addDays(today, 14);
  const depart = departRaw ?? addDays(today, 17);

  const room = findRoom(roomSlug) ?? rooms[0];
  const nights = nightsBetween(arrive, depart);

  const totals = useMemo(() => {
    const sub = room.rate * nights;
    const tax = Math.round(sub * TAX);
    return { sub, tax, total: sub + tax };
  }, [room.rate, nights]);

  const errors: string[] = [];
  if (nights < 1) errors.push("Departure must be after arrival.");
  if (nights > 0 && nights < room.minNights)
    errors.push(`${room.name} has a ${room.minNights}-night minimum.`);
  if (Number(guests) > room.capacity)
    errors.push(`${room.name} sleeps ${room.capacity}.`);
  if (!name.trim()) errors.push("We need a name for the reservation.");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("A valid email address, please.");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (errors.length) return;
    const ref = `AIN-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 4)
      .toUpperCase()}`;
    const q = new URLSearchParams({
      ref, room: room.slug, arrive, depart, guests, name, email,
    });
    router.push(`/booking/confirmation?${q.toString()}`);
  };

  const field =
    "w-full rounded-[10px] border bg-transparent px-4 py-3 text-sm outline-none [color-scheme:inherit]";
  const fieldStyle = { borderColor: "color-mix(in srgb, currentColor 20%, transparent)" };
  const label = "u-label mb-2 block opacity-45";

  return (
    <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
      {/* Fields */}
      <div>
        <fieldset>
          <legend className="u-label mb-6 opacity-45">Your stay</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={label}>Room</span>
              <select
                value={roomSlug}
                onChange={(e) => setRoomSlug(e.target.value)}
                className={field}
                style={{ ...fieldStyle, color: "var(--ink)" }}
              >
                {rooms.map((r) => (
                  <option key={r.slug} value={r.slug} style={{ color: "#111" }}>
                    {r.name} — {roomElement(r).floorLabel}, {r.category}, {money(r.rate)}/night
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={label}>Arrive</span>
              <input
                type="date"
                value={arrive}
                min={today || undefined}
                onChange={(e) => setArrive(e.target.value)}
                className={field}
                style={fieldStyle}
              />
            </label>

            <label>
              <span className={label}>Depart</span>
              <input
                type="date"
                value={depart}
                min={arrive || undefined}
                onChange={(e) => setDepart(e.target.value)}
                className={field}
                style={fieldStyle}
              />
            </label>

            <label>
              <span className={label}>Guests</span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={field}
                style={{ ...fieldStyle, color: "var(--ink)" }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} style={{ color: "#111" }}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="mt-12">
          <legend className="u-label mb-6 opacity-45">You</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={label}>Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                style={fieldStyle}
                autoComplete="name"
              />
            </label>
            <label>
              <span className={label}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
                style={fieldStyle}
                autoComplete="email"
              />
            </label>
            <label>
              <span className={label}>Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={field}
                style={fieldStyle}
                autoComplete="tel"
              />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Anything we should know</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Dietary requirements, arrival time, occasion…"
                className={`${field} resize-y`}
                style={fieldStyle}
              />
            </label>
          </div>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[18px] border p-6" style={{ borderColor: RULE }}>
          <h2 className="font-display text-xl leading-none">{room.name}</h2>
          <p className="u-label mt-2 opacity-45">
            {roomElement(room).floorLabel} · {room.category} · sleeps {room.capacity}
          </p>

          <dl className="mt-6 flex flex-col gap-3 border-t pt-5 text-sm" style={{ borderColor: RULE }}>
            <Row k="Nights" v={nights > 0 ? String(nights) : "—"} />
            <Row k={`${money(room.rate)} × ${nights || 0}`} v={money(totals.sub)} />
            <Row k="Taxes and fees (18%)" v={money(totals.tax)} />
          </dl>

          <div
            className="mt-5 flex items-baseline justify-between border-t pt-5"
            style={{ borderColor: RULE }}
          >
            <span className="u-label opacity-60">Total</span>
            <span className="font-display text-2xl" style={{ color: "var(--accent)" }}>
              {money(totals.total)}
            </span>
          </div>

          {touched && errors.length > 0 && (
            <ul className="mt-5 flex flex-col gap-1.5" role="alert">
              {errors.map((e) => (
                <li key={e} className="text-xs leading-snug" style={{ color: "var(--accent)" }}>
                  {e}
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full py-3.5 transition-transform duration-500 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent)", color: "var(--ground)" }}
          >
            <span className="u-label">Request this stay</span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="mt-4 text-xs leading-relaxed text-muted">
            No card is taken now. We confirm by email within one working day, and
            you can cancel free up to seven days before arrival.
          </p>
        </div>
      </aside>
    </form>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="u-readout">{v}</dd>
    </div>
  );
}
