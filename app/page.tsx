import { sql } from "../lib/db";
import ReservationCard from "../components/ReservationCard";

export const dynamic = "force-dynamic";

type Reservation = {
  id: string;
  guest_name: string;
  guest_phone: string | null;
  guest_count: number;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  table_name: string | null;
};

async function getReservations(): Promise<Reservation[]> {
  const result = await sql`
    SELECT
      r.id,
      r.guest_name,
      r.guest_phone,
      r.guest_count,
      r.start_time,
      r.end_time,
      r.status,
      r.notes,
      t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
    LIMIT 20
  `;

  return result as Reservation[];
}

export default async function HomePage() {
  const reservations = await getReservations();

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <p className="eyebrow">Heute</p>
          <h2>Serviceübersicht</h2>
        </div>
        <a className="primary-button" href="/new">
          + Neue Reservierung
        </a>
      </div>

      {reservations.length === 0 ? (
        <div className="empty-state">
          <h3>Noch keine Reservierungen</h3>
          <p>Lege in Neon zuerst die Tabellen an und erstelle dann die erste Reservierung.</p>
        </div>
      ) : (
        <div className="card-list">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </section>
  );
}
