function addMinutes(startTime, minutes) {
  const date = new Date(startTime);
  return new Date(date.getTime() + minutes * 60000);
}

function formatTime(value) {
  return new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

function statusForTable(tableId, reservations) {
  const linked = reservations.find((item) => item.table_id === tableId);
  if (!linked) return 'free';
  if (linked.status === 'seated') return 'occupied';
  if (linked.status === 'finished') return 'free';
  if (linked.status === 'no_show') return 'dirty';
  return 'reserved';
}

function getForecastFreeAt(linkedReservation) {
  if (!linkedReservation) return null;
  if (linkedReservation.end_time) return new Date(linkedReservation.end_time);

  const guestCount = Number(linkedReservation.guest_count || 2);
  const plannedDurationMinutes = guestCount <= 2 ? 90 : guestCount <= 4 ? 120 : 150;
  return addMinutes(linkedReservation.start_time, plannedDurationMinutes);
}

const positions = [
  { x: '10%', y: '16%' },
  { x: '34%', y: '18%' },
  { x: '58%', y: '16%' },
  { x: '18%', y: '58%' },
  { x: '47%', y: '58%' },
  { x: '73%', y: '56%' }
];

export default function FloorPlan({ tables = [], reservations = [], activeTableId = '', onSelectTable }) {
  return (
    <div className="floor-canvas floor-canvas-polished panel">
      <div className="floor-zone floor-zone-a floor-zone-polished">Main Dining</div>
      <div className="floor-zone floor-zone-b floor-zone-polished">Window</div>

      {tables.map((table, index) => {
        const pos = positions[index] || { x: `${12 + index * 8}%`, y: `${20 + index * 8}%` };
        const linkedReservation = reservations.find((item) => item.table_id === table.id);
        const status = statusForTable(table.id, reservations);
        const freeAt = getForecastFreeAt(linkedReservation);

        return (
          <button
            key={table.id}
            className={`table-node table-node-polished status-${status} ${activeTableId === table.id ? 'table-node-active' : ''}`}
            style={{ left: pos.x, top: pos.y }}
            onClick={() => onSelectTable(table.id)}
          >
            <span className="table-name">{table.name}</span>
            <span className="table-seats">{table.capacity} Plätze</span>
            <span className="table-guest">{linkedReservation ? linkedReservation.guest_name : 'frei'}</span>
            <span className={`table-status-line ${linkedReservation ? '' : 'free-now'}`}>
              {linkedReservation && freeAt ? `frei ab ${formatTime(freeAt)}` : 'sofort frei'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
