export default function BottomDock({ selectedReservation, selectedTable, onOpenEdit, onSetStatus }) {
  return (
    <div className="bottom-dock">
      <div className="dock-context">
        {selectedReservation ? (
          <>
            <strong>{selectedReservation.guest_name}</strong>
            <span>{selectedReservation.table_name || 'Kein Tisch'} · {selectedReservation.guest_count} Pers.</span>
          </>
        ) : selectedTable ? (
          <>
            <strong>{selectedTable.name}</strong>
            <span>{selectedTable.capacity} Plätze</span>
          </>
        ) : (
          <>
            <strong>Kein Tisch ausgewählt</strong>
            <span>Wähle einen Tisch oder eine Reservierung.</span>
          </>
        )}
      </div>

      <div className="dock-actions">
        <button className="dock-action active" onClick={onOpenEdit} disabled={!selectedReservation}>Bearbeiten</button>
        <button className="dock-action" onClick={() => onSetStatus?.('seated')} disabled={!selectedReservation}>Eingetroffen</button>
        <button className="dock-action" onClick={() => onSetStatus?.('finished')} disabled={!selectedReservation}>Fertig</button>
        <button className="dock-action" onClick={() => onSetStatus?.('no_show')} disabled={!selectedReservation}>No-Show</button>
        <button className="dock-action" onClick={() => onSetStatus?.('booked')} disabled={!selectedReservation}>Zurück auf gebucht</button>
      </div>
    </div>
  );
}
