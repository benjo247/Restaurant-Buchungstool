import { sql } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const id = params.id;
  const body = await request.json();

  const currentRows = await sql`
    SELECT *
    FROM reservations
    WHERE id = ${id}
    LIMIT 1
  `;

  const current = currentRows[0];

  if (!current) {
    return Response.json({ error: 'Reservierung nicht gefunden.' }, { status: 404 });
  }

  const guestName =
    body.guestName !== undefined ? String(body.guestName || '').trim() : current.guest_name;

  const guestPhone =
    body.guestPhone !== undefined
      ? (body.guestPhone ? String(body.guestPhone).trim() : null)
      : current.guest_phone;

  const guestCount =
    body.guestCount !== undefined ? Number(body.guestCount || 0) : current.guest_count;

  const startTime =
    body.startTime !== undefined ? String(body.startTime || '') : current.start_time;

  const endTime =
    body.endTime !== undefined ? String(body.endTime || '') : current.end_time;

  const status =
    body.status !== undefined ? String(body.status || 'booked') : current.status;

  const notes =
    body.notes !== undefined
      ? (body.notes ? String(body.notes).trim() : null)
      : current.notes;

  const tableId =
    body.tableId !== undefined ? (body.tableId ? String(body.tableId) : null) : current.table_id;

  const staffName =
    body.staffName !== undefined
      ? (body.staffName ? String(body.staffName).trim() : null)
      : current.staff_name;

  if (!guestName || !guestCount || !startTime || !endTime) {
    return Response.json(
      { error: 'Name, Personen, Start und Ende sind erforderlich.' },
      { status: 400 }
    );
  }

  await sql`
    UPDATE reservations
    SET
      guest_name = ${guestName},
      guest_phone = ${guestPhone},
      guest_count = ${guestCount},
      start_time = ${startTime},
      end_time = ${endTime},
      status = ${status},
      notes = ${notes},
      table_id = ${tableId},
      staff_name = ${staffName}
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

  return Response.json(rows[0]);
}
