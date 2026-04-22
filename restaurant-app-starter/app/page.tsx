import { ReservationCard } from "@/components/ReservationCard";

const mockReservations = [
  {
    guestName: "Anna Becker",
    guestCount: 2,
    tableName: "Tisch 3",
    phone: "0176 12345678",
    notes: "Geburtstag",
    status: "booked",
    startTime: new Date().toISOString(),
  },
  {
    guestName: "Thomas Klein",
    guestCount: 4,
    tableName: "Tisch 6",
    phone: "0151 11112222",
    notes: "Fensterplatz",
    status: "seated",
    startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  },
];

export default function HomePage() {
  return (
    <>
      <section className="card">
        <h2 className="section-title">Heute</h2>
        <p className="section-subtitle">Die wichtigsten Reservierungen für den laufenden Service.</p>
      </section>

      {mockReservations.map((reservation) => (
        <ReservationCard key={`${reservation.guestName}-${reservation.startTime}`} {...reservation} />
      ))}
    </>
  );
}
