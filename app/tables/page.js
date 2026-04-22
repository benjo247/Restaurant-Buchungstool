import { sql } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`
    SELECT
      t.id,
      t.name,
      t.capacity,
      COUNT(r.id) AS reservation_count
    FROM restaurant_tables t
    LEFT JOIN reservations r ON r.table_id = t.id
    GROUP BY t.id, t.name, t.capacity
    ORDER BY t.name ASC
  `;
}

export default async function TablesPage() {
  const tables = await getTables();

  return (
    <section className="stack-lg">
      <div className="section-head">
        <div>
          <p className="eyebrow">Tische</p>
          <h2>Tischübersicht</h2>
          <p className="section-copy">Kapazitäten und zugewiesene Reservierungen auf einen Blick.</p>
        </div>
      </div>

      <div className="table-grid">
        {tables.map((table) => (
          <article key={table.id} className="panel table-card">
            <div className="table-card-top">
              <span className="table-badge">{table.capacity} Plätze</span>
              <span className="table-counter">{Number(table.reservation_count)} Buchungen</span>
            </div>
            <h3>{table.name}</h3>
            <p className="muted">Interne ID: {table.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
