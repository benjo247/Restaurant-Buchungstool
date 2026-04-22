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
    <section className="content-stack">
      <div className="page-hero panel-light">
        <div>
          <p className="section-kicker">Kapazität</p>
          <h3>Tischübersicht</h3>
          <p>Eine kompakte Raum- und Kapazitätsbasis für den nächsten grafischen Tischplan.</p>
        </div>
      </div>

      <div className="table-grid">
        {tables.map((table) => (
          <article key={table.id} className="table-tile panel-light">
            <div className="table-tile-top">
              <span className="table-pill">{table.capacity} Plätze</span>
              <span className="table-pill subtle">{Number(table.reservation_count)} Buchungen</span>
            </div>
            <h3>{table.name}</h3>
            <p>ID: {table.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
