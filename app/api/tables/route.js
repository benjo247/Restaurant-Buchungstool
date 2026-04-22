import { sql } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await sql`
    SELECT id, name, capacity
    FROM restaurant_tables
    ORDER BY name ASC
  `;
  return Response.json(rows);
}
