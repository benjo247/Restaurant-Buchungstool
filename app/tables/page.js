import { sql } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`SELECT id, name, capacity FROM restaurant_tables ORDER BY name ASC`;
}

export default async function TablesPage() {
  const tables = await getTables();

  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <p className="eyebrow">Tische</p>
          <h2>Tischübersicht</h2>
        </div>
      </div>
      <div className="card-list">
        {tables.map((table) => (
          <div key={table.id} className="reservation-card">
            <h3>{table.name}</h3>
            <p>{table.capacity} Plätze</p>
          </div>
        ))}
      </div>
    </section>
  );
}
