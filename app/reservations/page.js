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
    <section className="content-stack">
      <div className="page-hero panel-light">
        <div>
          <p className="section-kicker">Historie</p>
          <h3>Alle Buchungen</h3>
          <p>Vollständige Liste aller gespeicherten Reservierungen im gleichen Control-Center-Look.</p>
        </div>
      </div>

      <section className="list-shell panel-light">
        <div className="list-header">
          <div>
            <p className="section-kicker">Archiv</p>
            <h3>Reservierungsübersicht</h3>
          </div>
          <div className="list-header-meta">
            <span>{reservations.length} Einträge</span>
          </div>
        </div>

        <div className="reservation-table-list">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      </section>
    </section>
  );
}
