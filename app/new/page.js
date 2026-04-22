import { sql } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`SELECT id, name, capacity FROM restaurant_tables ORDER BY name ASC`;
}

export default async function NewPage() {
  const tables = await getTables();

  return (
    <section className="simple-page">
      <div className="panel-light form-shell">
        <p className="eyebrow">Neu</p>
        <h2>Neue Reservierung</h2>
        <form className="simple-form">
          <input placeholder="Gastname" />
          <input placeholder="Telefon" />
          <input type="number" placeholder="Personen" />
          <select>
            <option>Tisch optional wählen</option>
            {tables.map((table) => (
              <option key={table.id}>{table.name} · {table.capacity} Plätze</option>
            ))}
          </select>
          <input type="datetime-local" />
          <input type="datetime-local" />
          <textarea rows="4" placeholder="Notiz" />
          <button type="button" className="primary-button">Reservierung speichern</button>
        </form>
      </div>
    </section>
  );
}
