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
  const [selectedReservationId, setSelectedReservationId] = useState(
    initialReservations && initialReservations.length ? initialReservations[0].id : ''
  );
  const [selectedTableId, setSelectedTableId] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedReservation = useMemo(() => {
    return reservations.find((item) => item.id === selectedReservationId) || null;
  }, [reservations, selectedReservationId]);

  const selectedTable = useMemo(() => {
    return tables.find((item) => item.id === selectedTableId) || null;
  }, [tables, selectedTableId]);

  const activeTableId = selectedReservation?.table_id || selectedTableId || '';

  async function refreshReservations() {
    const response = await fetch('/api/reservations', { cache: 'no-store' });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Reservierungen konnten nicht geladen werden.');
    }

    setReservations(data);

    if (selectedReservationId) {
      const updated = data.find((item) => item.id === selectedReservationId);
      if (updated) {
        setSelectedTableId(updated.table_id || '');
      } else {
        setSelectedReservationId('');
        setSelectedTableId('');
      }
    }

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
    setSelectedTableId(data.table_id || '');

    return data;
  }

  async function handleStatusChange(status) {
    if (!selectedReservation) return;

    await updateReservation(selectedReservation.id, { status });
    await refreshReservations();
  }

  function handleSelectReservation(id) {
    const next = reservations.find((item) => item.id === id) || null;
    setSelectedReservationId(id);
    setSelectedTableId(next?.table_id || '');
  }

  function handleSelectTable(tableId) {
    setSelectedTableId(tableId);

    const linked = reservations.find((item) => item.table_id === tableId);

    if (linked) {
      setSelectedReservationId(linked.id);
    } else {
      setSelectedReservationId('');
    }
  }

  return (
    <section className="floor-page">
      <TopBar />
      <MetricTiles reservations={reservations} tables={tables} />

      <div className="floor-layout">
        <div className="floor-main">
          <FloorPlan
            tables={tables}
            reservations={reservations}
            activeTableId={activeTableId}
            onSelectTable={handleSelectTable}
          />

          <ReservationList
            reservations={reservations}
            selectedReservationId={selectedReservationId}
            onSelectReservation={handleSelectReservation}
            onEditReservation={(id) => {
              handleSelectReservation(id);
              setIsDrawerOpen(true);
            }}
            onSetStatus={async (id, status) => {
              await updateReservation(id, { status });
              await refreshReservations();
            }}
          />
        </div>

        <RightRail
          reservations={reservations}
          selectedReservation={selectedReservation}
          selectedTable={selectedTable}
        />
      </div>

      <BottomDock
        selectedReservation={selectedReservation}
        selectedTable={selectedTable}
        onOpenEdit={() => {
          if (!selectedReservation) return;
          setIsDrawerOpen(true);
        }}
        onSetStatus={handleStatusChange}
      />

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
    </section>
  );
}
