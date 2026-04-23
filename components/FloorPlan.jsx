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

function getLinkedReservation(tableId, reservations) {
  return reservations.find((item) => item.table_id === tableId) || null;
}

function getTableState(linkedReservation) {
  if (!linkedReservation) return 'free';
  if (linkedReservation.status === 'seated') return 'occupied';
  if (linkedReservation.status === 'finished') return 'free';
  if (linkedReservation.status === 'no_show') return 'dirty';
  return 'reserved';
}

function getForecastFreeAt(linkedReservation) {
  if (!linkedReservation) return null;

  if (linkedReservation.end_time) {
    return new Date(linkedReservation.end_time);
  }

  const guestCount = Number(linkedReservation.guest_count || 2);
  const plannedDurationMinutes = guestCount <= 2 ? 90 : guestCount <= 4 ? 120 : 150;
  return addMinutes(linkedReservation.start_time, plannedDurationMinutes);
}

export default function FloorPlan({ tables = [], reservations = [], activeTableId = '', onSelectTable }) {
  const mapped = [
    { x: '10%', y: '14%' },
    { x: '34%', y: '18%' },
    { x: '58%', y: '16%' },
    { x: '18%', y: '52%' },
    { x: '47%', y: '56%' },
    { x: '73%', y: '52%' },
    { x: '28%', y: '74%' },
    { x: '60%', y: '76%' }
  ];

  return (
    <div className="floor-canvas panel-light">
      <div className="floor-zone floor-zone-a">Main Dining</div>
      <div className="floor-zone floor-zone-b">Window</div>
      <div className="floor-zone floor-zone-c">Terrace Flow</div>

      {tables.map((table, index) => {
        const pos = mapped[index] || { x: `${12 + index * 10}%`, y: `${20 + index * 8}%` };
        const linkedReservation = getLinkedReservation(table.id, reservations);
        const status = getTableState(linkedReservation);
        const forecastFreeAt = getForecastFreeAt(linkedReservation);

        return (
          <button
            key={table.id}
            className={`table-node status-${status} ${activeTableId === table.id ? 'table-node-active' : ''}`}
            style={{ left: pos.x, top: pos.y }}
            onClick={() => onSelectTable?.(table.id)}
          >
            <span className="table-name">{table.name}</span>
            <span className="table-seats">{table.capacity} Plätze</span>

            {linkedReservation ? (
              <>
                <span className="table-guest">{linkedReservation.guest_name}</span>
                <span className="table-forecast">frei ab {formatTime(forecastFreeAt)}</span>
              </>
            ) : (
              <>
                <span className="table-guest muted-soft">frei</span>
                <span className="table-forecast table-forecast-free">sofort frei</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
