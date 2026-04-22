import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function ReservationsPage() {
  const rows = await sql`
    SELECT
      r.id,
      r.guest_name,
      r.guest_count,
      r.start_time,
      r.status,
      t.name AS table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
  ` as Array<{
    id: string;
    guest_name: string;
    guest_count: number;
    start_time: string;
    status: string;
    table_name: string | null;
  }>;

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">Verwaltung</p>
        <h2>Reservierungen</h2>
      </div>

      <div className="table-list">
        {rows.map((row) => (
          <article key={row.id} className="info-card">
            <h3>{row.guest_name}</h3>
            <p>{row.guest_count} Personen</p>
            <p>{new Date(row.start_time).toLocaleString("de-DE")}</p>
            <p>{row.table_name || "Noch kein Tisch"}</p>
            <p className="small-text">Status: {row.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
