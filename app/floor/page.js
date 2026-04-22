import { sql } from '../../lib/db';
import FloorWorkspace from '../../components/FloorWorkspace';

export const dynamic = 'force-dynamic';

async function getReservations() {
  return sql`
    SELECT
      r.id,
      r.guest_name,
      r.guest_phone,
      r.guest_count,
      r.start_time,
      r.end_time,
      r.status,
      r.notes,
      r.source,
      r.table_id,
      r.staff_name,
      t.name AS table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
    LIMIT 30
  `;
}

async function getTables() {
  return sql`
    SELECT id, name, capacity
    FROM restaurant_tables
    ORDER BY name ASC
  `;
}

export default async function FloorPage() {
  const [reservations, tables] = await Promise.all([getReservations(), getTables()]);
  return <FloorWorkspace initialReservations={reservations} tables={tables} />;
}
