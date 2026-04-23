function statusForTable(tableId, reservations) {
  const linked = reservations.find((item) => item.table_id === tableId);
  if (!linked) return 'free';
  if (linked.status === 'seated') return 'occupied';
  if (linked.status === 'finished') return 'free';
  if (linked.status === 'no_show') return 'dirty';
  return 'reserved';
}

const positions = [
  { x: '10%', y: '14%' },
  { x: '34%', y: '18%' },
  { x: '58%', y: '16%' },
  { x: '18%', y: '52%' },
  { x: '47%', y: '56%' },
  { x: '73%', y: '52%' }
];

export default function FloorPlan({ tables = [], reservations = [], activeTableId = '', onSelectTable }) {
  return (
    <div className="floor-canvas panel">
      <div className="floor-zone floor-zone-a">Main Dining</div>
      <div className="floor-zone floor-zone-b">Terrace Flow</div>

      {tables.map((table, index) => {
        const pos = positions[index] || { x: `${12 + index * 8}%`, y: `${20 + index * 8}%` };
        const status = statusForTable(table.id, reservations);
        const linkedReservation = reservations.find((item) => item.table_id === table.id);

        return (
          <button
            key={table.id}
            className={`table-node status-${status} ${activeTableId === table.id ? 'table-node-active' : ''}`}
            style={{ left: pos.x, top: pos.y }}
            onClick={() => onSelectTable(table.id)}
          >
            <span className="table-name">{table.name}</span>
            <span className="table-seats">{table.capacity} Plätze</span>
            <span className="table-guest">{linkedReservation ? linkedReservation.guest_name : 'frei'}</span>
          </button>
        );
      })}
    </div>
  );
}
