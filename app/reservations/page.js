import { sql } from '../../lib/db';
import ReservationCard from '../../components/ReservationCard';

export const dynamic = 'force-dynamic';

async function getReservations() {
  return sql`
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
  `;
}

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <section className="stack-lg">
      <div className="section-head">
        <div>
          <p className="eyebrow">Reservierungen</p>
          <h2>Alle Buchungen</h2>
          <p className="section-copy">Vollständige Liste aller gespeicherten Reservierungen.</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="panel empty-state">
          <p>Noch keine Einträge vorhanden.</p>
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
