'use client';

import { useMemo, useState } from 'react';
import ReservationList from './ReservationList';
import ReservationEditorDrawer from './ReservationEditorDrawer';

export default function ReservationsWorkspace({ initialReservations, tables }) {
  const [reservations, setReservations] = useState(initialReservations || []);
  const [selectedReservationId, setSelectedReservationId] = useState(
    initialReservations && initialReservations.length ? initialReservations[0].id : ''
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedReservation = useMemo(() => {
    return reservations.find((item) => item.id === selectedReservationId) || null;
  }, [reservations, selectedReservationId]);

  async function refreshReservations() {
    const response = await fetch('/api/reservations', { cache: 'no-store' });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Reservierungen konnten nicht geladen werden.');
    }

    setReservations(data);
    return data;
  }

  async function updateReservation(id, payload) {
    const response = await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Speichern fehlgeschlagen.');
    }

    setReservations((current) =>
      current.map((item) => (item.id === id ? { ...item, ...data } : item))
    );

    setSelectedReservationId(id);
    return data;
  }

  function handleSelectReservation(id) {
    setSelectedReservationId(id);
  }

  return (
    <>
      <div className="panel">
        <ReservationList
          reservations={reservations}
          selectedReservationId={selectedReservationId}
          onSelectReservation={handleSelectReservation}
          onEditReservation={(id) => {
            handleSelectReservation(id);
            setIsDrawerOpen(true);
          }}
        />
      </div>

      <ReservationEditorDrawer
        open={isDrawerOpen}
        reservation={selectedReservation}
        tables={tables}
        onClose={() => setIsDrawerOpen(false)}
        onSaved={async (form) => {
          if (!selectedReservation) return;
          await updateReservation(selectedReservation.id, form);
          await refreshReservations();
          setIsDrawerOpen(false);
        }}
      />
    </>
  );
}
