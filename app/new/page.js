import { sql } from '../../lib/db';
import NewReservationForm from '../../components/NewReservationForm';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`SELECT id, name, capacity FROM restaurant_tables ORDER BY name ASC`;
}

export default async function NewPage() {
  const tables = await getTables();

  return (
    <section className="content-stack">
      <div className="page-hero panel-light page-hero-dark">
        <div>
          <p className="section-kicker">Neue Buchung</p>
          <h3>Reservierung anlegen</h3>
          <p>Große Eingabefelder, klare Struktur und direkt passend für Tablet und Desktop.</p>
        </div>
      </div>

      <div className="two-column-layout wide-layout">
        <div className="panel-light info-card side-dark-card">
          <h3>Schneller Workflow</h3>
          <ul className="feature-list feature-list-bright">
            <li>Gastdaten sauber erfassen</li>
            <li>Tisch direkt zuweisen oder offen lassen</li>
            <li>Interne Notiz für das Team hinterlegen</li>
            <li>Direkt zurück in die Tagesliste springen</li>
          </ul>
        </div>

        <NewReservationForm tables={tables} />
      </div>
    </section>
  );
}
