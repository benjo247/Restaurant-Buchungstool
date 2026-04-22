import { sql } from '../../lib/db';
import NewReservationForm from '../../components/NewReservationForm';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`SELECT id, name, capacity FROM restaurant_tables ORDER BY name ASC`;
}

export default async function NewPage() {
  const tables = await getTables();

  return (
    <section className="stack-lg">
      <div className="section-head">
        <div>
          <p className="eyebrow">Neu</p>
          <h2>Neue Reservierung</h2>
          <p className="section-copy">Eine saubere, touchfreundliche Eingabemaske für dein Team.</p>
        </div>
      </div>

      <div className="two-column-layout">
        <div className="panel info-card">
          <h3>Schneller Workflow</h3>
          <ul className="feature-list">
            <li>Gastdaten und Uhrzeit erfassen</li>
            <li>Tisch optional direkt zuweisen</li>
            <li>Notizen für Service sichtbar speichern</li>
            <li>Nach dem Speichern sofort auf der Startseite sehen</li>
          </ul>
        </div>

        <NewReservationForm tables={tables} />
      </div>
    </section>
  );
}
