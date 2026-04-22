'use client';

import { useMemo, useState } from 'react';
import TopBar from './TopBar';
import MetricTiles from './MetricTiles';
import FloorPlan from './FloorPlan';
import RightRail from './RightRail';
import BottomDock from './BottomDock';
import ReservationList from './ReservationList';
import ReservationEditorDrawer from './ReservationEditorDrawer';

export default function FloorWorkspace({ initialReservations, tables }) {
  const [reservations, setReservations] = useState(initialReservations || []);
  const [selectedReservationId, setSelectedReservationId] = useState(initialReservations && initialReservations.length ? initialReservations[0].id : '');
  const [selectedTableId, setSelectedTableId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedReservation = useMemo(
    () => reservations.find((item) => item.id === selectedReservationId) || null,
    [reservations, selectedReservationId]
  );

  const selectedTable = useMemo(
    () => tables.find((item) => item.id === selectedTableId) || null,
    [tables, selectedTableId]
  );

  const activeTableId = selectedReservation?.table_id || selectedTableId || '';

  async function refreshReservations() {
    const response = await fetch('/api/reservations', { cache: 'no-store' });
    const data = await response.json();
    setReservations(data);
  }

  async function updateReservation(id, payload) {
    const response = await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Änderung fehlgeschlagen.');
    }

    setReservations((current) => current.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }

  async function handleStatusChange(status) {
    if (!selectedReservation) return;
    await updateReservation(selectedReservation.id, { status });
    await refreshReservations();
  }

  function handleSelectReservation(id) {
    const next = reservations.find((item) => item.id === id);
    setSelectedReservationId(id);
    setSelectedTableId(next?.table_id || '');
  }

  function handleSelectTable(tableId) {
    setSelectedTableId(tableId);
    const linkedReservation = reservations.find((item) => item.table_id === tableId);
    if (linkedReservation) {
      setSelectedReservationId(linkedReservation.id);
    } else {
      setSelectedReservationId('');
    }
  }

  return (
    <section className="floor-page">
      <TopBar />
      <MetricTiles reservations={reservations} />
      <div className="floor-layout">
        <div className="floor-main">
          <FloorPlan tables={tables} reservations={reservations} activeTableId={activeTableId} onSelectTable={handleSelectTable} />
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

        <RightRail reservations={reservations} selectedReservation={selectedReservation} selectedTable={selectedTable} />
      </div>

      <BottomDock
        selectedReservation={selectedReservation}
        selectedTable={selectedTable}
        onOpenEdit={() => selectedReservation ? setIsDrawerOpen(true) : null}
        onSetStatus={handleStatusChange}
      />

      <ReservationEditorDrawer
        open={isDrawerOpen}
        reservation={selectedReservation}
        tables={tables}
        onClose={() => setIsDrawerOpen(false)}
        onSaved={async (payload) => {
          if (!selectedReservation) return;
          await updateReservation(selectedReservation.id, payload);
          await refreshReservations();
          setIsDrawerOpen(false);
        }}
      />
    </section>
  );
}
