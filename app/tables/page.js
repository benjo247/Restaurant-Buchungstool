import { sql } from '../../lib/db';

export const dynamic = 'force-dynamic';

async function getTables() {
  return sql`SELECT id, name, capacity FROM restaurant_tables ORDER BY name ASC`;
}

export default async function TablesPage() {
  const tables = await getTables();

  return (
    <section className="simple-page">
      <div className="section-title">
        <p className="eyebrow">Tische</p>
        <h2>Tischübersicht</h2>
      </div>
      <div className="table-card-grid">
        {tables.map((table) => (
          <div className="panel-light table-card" key={table.id}>
            <h3>{table.name}</h3>
            <p>{table.capacity} Plätze</p>
          </div>
        ))}
      </div>
    </section>
  );
}
