import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function TablesPage() {
  let tables: any[] = [];
  let error = "";

  try {
    const sql = getSql();
    tables = await sql`
      select id, name, capacity
      from restaurant_tables
      order by name asc
    `;
  } catch (e: any) {
    error = e?.message ?? "Unbekannter Fehler";
  }

  return (
    <>
      <div className="card">
        <h2>Tische</h2>
      </div>
      {error ? <div className="notice">Datenbankfehler: {error}</div> : null}
      {tables.length === 0 ? (
        <div className="empty">Noch keine Tische vorhanden.</div>
      ) : (
        <div className="card-list">
          {tables.map((table) => (
            <div className="card" key={table.id}>
              <h3>{table.name}</h3>
              <p className="muted">{table.capacity} Plätze</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
