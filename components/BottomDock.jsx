export default function BottomDock({ selectedReservation, onOpenEdit, onSetStatus }) {
  return (
    <div className="bottom-dock">
      <div className="dock-context">
        {selectedReservation ? (
          <>
            <strong>{selectedReservation.guest_name}</strong>
            <span>{selectedReservation.table_name || 'Kein Tisch'} · {selectedReservation.guest_count} Pers.</span>
          </>
        ) : (
          <>
            <strong>Keine Reservierung gewählt</strong>
            <span>Bitte erst eine Reservierung in der Liste wählen.</span>
          </>
        )}
      </div>

      <div className="dock-actions">
        <button className="dock-action dock-action-active" onClick={onOpenEdit} disabled={!selectedReservation}>Bearbeiten</button>
        <button className="dock-action" onClick={() => onSetStatus('seated')} disabled={!selectedReservation}>Eingetroffen</button>
        <button className="dock-action" onClick={() => onSetStatus('finished')} disabled={!selectedReservation}>Fertig</button>
        <button className="dock-action" onClick={() => onSetStatus('no_show')} disabled={!selectedReservation}>No-Show</button>
        <button className="dock-action" onClick={() => onSetStatus('booked')} disabled={!selectedReservation}>Gebucht</button>
      </div>
    </div>
  );
}
