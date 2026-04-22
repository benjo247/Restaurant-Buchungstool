import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function TablesPage() {
  const rows = await sql`
    SELECT id, name, capacity
    FROM restaurant_tables
    ORDER BY capacity ASC, name ASC
  ` as Array<{
    id: string;
    name: string;
    capacity: number;
  }>;

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">Stammdaten</p>
        <h2>Tische</h2>
      </div>

      <div className="table-list">
        {rows.map((row) => (
          <article key={row.id} className="info-card">
            <h3>{row.name}</h3>
            <p>{row.capacity} Plätze</p>
          </article>
        ))}
      </div>
    </section>
  );
}
