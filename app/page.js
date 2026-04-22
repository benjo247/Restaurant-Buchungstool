import { sql } from '../lib/db';
import ReservationCard from '../components/ReservationCard';
import QuickFilters from '../components/QuickFilters';

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
    LIMIT 30
  `;
}

export default async function HomePage() {
  const reservations = await getReservations();
  const totalGuests = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);
  const openTables = reservations.filter((item) => !item.table_name).length;
  const seated = reservations.filter((item) => item.status === 'seated').length;

  return (
    <section className="content-stack">
      <section className="stats-row">
        <div className="stat-panel panel-light accent-violet">
          <span className="stat-label">Reservierungen</span>
          <strong>{reservations.length}</strong>
          <p>heute eingeplant</p>
        </div>
        <div className="stat-panel panel-light accent-cyan">
          <span className="stat-label">Gäste</span>
          <strong>{totalGuests}</strong>
          <p>erwartete Personen</p>
        </div>
        <div className="stat-panel panel-light accent-amber">
          <span className="stat-label">Offene Tische</span>
          <strong>{openTables}</strong>
          <p>noch nicht zugewiesen</p>
        </div>
        <div className="stat-panel panel-light accent-green">
          <span className="stat-label">Eingetroffen</span>
          <strong>{seated}</strong>
          <p>bereits im Haus</p>
        </div>
      </section>

      <QuickFilters />

      <section className="list-shell panel-light">
        <div className="list-header">
          <div>
            <p className="section-kicker">Tagesliste</p>
            <h3>Reservierungen</h3>
          </div>
          <div className="list-header-meta">
            <span>Live Übersicht</span>
            <span>{reservations.length} Einträge</span>
          </div>
        </div>

        {reservations.length === 0 ? (
          <div className="empty-state table-empty">
            <h3>Noch keine Reservierungen</h3>
            <p>Lege die erste Reservierung an, damit die Tagesansicht befüllt wird.</p>
            <a className="topbar-primary" href="/new">Jetzt anlegen</a>
          </div>
        ) : (
          <div className="reservation-table-list">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
