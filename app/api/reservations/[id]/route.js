import { sql } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const id = params.id;
  const body = await request.json();

  const guestName = body.guestName ?? null;
  const guestPhone = body.guestPhone !== undefined ? (body.guestPhone || null) : undefined;
  const guestCount = body.guestCount ?? null;
  const startTime = body.startTime ?? null;
  const endTime = body.endTime ?? null;
  const status = body.status ?? null;
  const notes = body.notes !== undefined ? (body.notes || null) : undefined;
  const tableId = body.tableId !== undefined ? (body.tableId || null) : undefined;
  const staffName = body.staffName !== undefined ? (body.staffName || null) : undefined;

  await sql`
    UPDATE reservations
    SET
      guest_name = COALESCE(${guestName}, guest_name),
      guest_phone = CASE WHEN ${body.guestPhone !== undefined} THEN ${guestPhone} ELSE guest_phone END,
      guest_count = COALESCE(${guestCount}, guest_count),
      start_time = COALESCE(${startTime}, start_time),
      end_time = COALESCE(${endTime}, end_time),
      status = COALESCE(${status}, status),
      notes = CASE WHEN ${body.notes !== undefined} THEN ${notes} ELSE notes END,
      table_id = CASE WHEN ${body.tableId !== undefined} THEN ${tableId} ELSE table_id END,
      staff_name = CASE WHEN ${body.staffName !== undefined} THEN ${staffName} ELSE staff_name END
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
      r.staff_name,
      t.name as table_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    WHERE r.id = ${id}
    LIMIT 1
  `;

  return Response.json(rows[0] || { ok: true });
}
