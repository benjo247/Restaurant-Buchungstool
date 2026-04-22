import { prisma } from "@/lib/prisma";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { startTime: "asc" },
    include: { table: true },
  });

  return Response.json(reservations);
}

export async function POST(request: Request) {
  const body = await request.json();

  const reservation = await prisma.reservation.create({
    data: {
      guestName: body.guestName,
      guestPhone: body.guestPhone || null,
      guestCount: Number(body.guestCount),
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      notes: body.notes || null,
      status: body.status || "booked",
      source: body.source || "web",
      tableId: body.tableId || null,
    },
  });

  return Response.json(reservation, { status: 201 });
}
