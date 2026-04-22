import { sql } from '../lib/db';
import ReservationCard from '../components/ReservationCard';

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

function formatDate(value) {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'short'
  }).format(new Date(value));
}

export default async function HomePage() {
  const reservations = await getReservations();
  const totalGuests = reservations.reduce((sum, item) => sum + Number(item.guest_count || 0), 0);
  const openTables = reservations.filter((item) => !item.table_name).length;
  const nextReservation = reservations[0];

  return (
    <section className="stack-lg">
      <section className="hero-grid">
        <div className="hero-card panel">
          <div className="hero-content">
            <div>
              <p className="eyebrow">Heute im Überblick</p>
              <h2>Serviceübersicht</h2>
              <p className="hero-copy">
                Alle heutigen Buchungen, Tische und Kontaktinfos in einer klaren Oberfläche.
              </p>
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="/new">+ Neue Reservierung</a>
              <a className="ghost-button" href="/reservations">Alle Buchungen</a>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="metric-card panel">
            <span className="metric-label">Reservierungen</span>
            <strong>{reservations.length}</strong>
            <p>heute geladen</p>
          </div>
          <div className="metric-card panel">
            <span className="metric-label">Gäste gesamt</span>
            <strong>{totalGuests}</strong>
            <p>erwartete Personen</p>
          </div>
          <div className="metric-card panel">
            <span className="metric-label">Offene Tische</span>
            <strong>{openTables}</strong>
            <p>noch nicht zugewiesen</p>
          </div>
          <div className="metric-card panel accent-card">
            <span className="metric-label">Nächste Ankunft</span>
            <strong>{nextReservation ? new Date(nextReservation.start_time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '—'}</strong>
            <p>{nextReservation ? formatDate(nextReservation.start_time) : 'noch keine Reservierung'}</p>
          </div>
        </div>
      </section>

      <section className="section-head">
        <div>
          <p className="eyebrow">Ankünfte</p>
          <h2>Heutige Reservierungen</h2>
        </div>
        <a className="ghost-button" href="/tables">Tische ansehen</a>
      </section>

      {reservations.length === 0 ? (
        <div className="panel empty-state empty-state-large">
          <h3>Noch keine Reservierungen</h3>
          <p>
            Lege jetzt die erste Buchung an oder importiere Daten über deine Webseite.
          </p>
          <a className="primary-button" href="/new">Jetzt erste Reservierung anlegen</a>
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
