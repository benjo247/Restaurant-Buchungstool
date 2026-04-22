import { sql } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const id = params.id;
  const body = await request.json();

  await sql`
    UPDATE reservations
    SET
      guest_name = COALESCE(${body.guestName !== undefined ? (body.guestName || None) : None}, guest_name),
      guest_phone = CASE WHEN ${body.guestPhone !== undefined} THEN ${body.guestPhone || None} ELSE guest_phone END,
      guest_count = COALESCE(${body.guestCount !== undefined ? body.guestCount : None}, guest_count),
      start_time = COALESCE(${body.startTime !== undefined ? body.startTime : None}, start_time),
      end_time = COALESCE(${body.endTime !== undefined ? body.endTime : None}, end_time),
      status = COALESCE(${body.status !== undefined ? body.status : None}, status),
      notes = CASE WHEN ${body.notes !== undefined} THEN ${body.notes || None} ELSE notes END,
      table_id = CASE WHEN ${body.tableId !== undefined} THEN ${body.tableId || None} ELSE table_id END
    WHERE id = ${id}
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

  return Response.json(rows[0] || { ok: true });
}
