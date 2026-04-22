import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

type TableRow = {
  id: string;
  name: string;
  capacity: number;
};

async function getTables(): Promise<TableRow[]> {
  const result = await sql`
    SELECT id, name, capacity
    FROM restaurant_tables
    ORDER BY capacity ASC, name ASC
  `;

  return result as TableRow[];
}

export default async function NewReservationPage() {
  const tables = await getTables();

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">Neu</p>
        <h2>Neue Reservierung</h2>
      </div>

      <form className="form-card form-grid" action="/api/reservations" method="post">
        <label>
          Name
          <input name="guestName" placeholder="Anna Becker" required />
        </label>

        <label>
          Telefonnummer
          <input name="guestPhone" placeholder="0176 ..." />
        </label>

        <label>
          Personen
          <input name="guestCount" type="number" min="1" defaultValue="2" required />
        </label>

        <label>
          Startzeit
          <input name="startTime" type="datetime-local" required />
        </label>

        <label>
          Endzeit
          <input name="endTime" type="datetime-local" required />
        </label>

        <label>
          Tisch
          <select name="tableId" defaultValue="">
            <option value="">Automatisch später / noch offen</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.name} · {table.capacity} Plätze
              </option>
            ))}
          </select>
        </label>

        <label>
          Notiz
          <textarea name="notes" placeholder="Geburtstag, Kinderstuhl, Fensterplatz ..." />
        </label>

        <div className="actions">
          <button className="primary-button" type="submit">Reservierung speichern</button>
          <a className="secondary-button" href="/">Abbrechen</a>
        </div>
      </form>
    </section>
  );
}
