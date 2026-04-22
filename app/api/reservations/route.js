import { sql } from '../../../lib/db';
import { createId } from '../../../lib/id';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await sql`
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
      t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    ORDER BY r.start_time ASC
  `;
  return Response.json(rows);
}

export async function POST(request) {
  const body = await request.json();
  const id = createId();
  const guestName = String(body.guestName || '').trim();
  const guestPhone = body.guestPhone ? String(body.guestPhone).trim() : null;
  const guestCount = Number(body.guestCount || 2);
  const startTime = String(body.startTime || '');
  const endTime = String(body.endTime || '');
  const notes = body.notes ? String(body.notes).trim() : null;
  const tableId = body.tableId ? String(body.tableId) : null;
  const status = String(body.status || 'booked');
  const source = String(body.source || 'web');

  if (!guestName || !startTime || !endTime) {
    return Response.json({ error: 'guestName, startTime und endTime sind erforderlich.' }, { status: 400 });
  }

  await sql`
    INSERT INTO reservations (id, guest_name, guest_phone, guest_count, start_time, end_time, status, notes, source, table_id)
    VALUES (${id}, ${guestName}, ${guestPhone}, ${guestCount}, ${startTime}, ${endTime}, ${status}, ${notes}, ${source}, ${tableId})
  `;

  const rows = await sql`
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
      t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    WHERE r.id = ${id}
    LIMIT 1
  `;

  return Response.json(rows[0] || { ok: true, id });
}
