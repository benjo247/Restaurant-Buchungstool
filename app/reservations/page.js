import { sql } from '../../lib/db';
import ReservationList from '../../components/ReservationList';

export const dynamic = 'force-dynamic';

async function getReservations() {
  return sql`
    SELECT
      r.id,
      r.guest_name,
      r.guest_count,
      r.start_time,
      r.status,
      r.staff_name,
      t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
  `;
}

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <section className="simple-page">
      <div className="section-title">
        <p className="eyebrow">Reservierungen</p>
        <h2>Alle Buchungen</h2>
      </div>

      <div className="panel-light form-shell">
        <ReservationList reservations={reservations} />
      </div>
    </section>
  );
}
