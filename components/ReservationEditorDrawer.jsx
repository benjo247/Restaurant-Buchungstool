'use client';

import { useEffect, useState } from 'react';

const STAFF_OPTIONS = ['Host', 'Service 1', 'Service 2', 'Manager'];

function toLocalInput(value) {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export default function ReservationEditorDrawer({ open, reservation, tables, onClose, onSaved }) {
  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestCount: 2,
    startTime: '',
    endTime: '',
    notes: '',
    tableId: '',
    status: 'booked',
    staffName: ''
  });

  useEffect(() => {
    if (!reservation) return;
    setForm({
      guestName: reservation.guest_name || '',
      guestPhone: reservation.guest_phone || '',
      guestCount: Number(reservation.guest_count || 2),
      startTime: toLocalInput(reservation.start_time),
      endTime: toLocalInput(reservation.end_time),
      notes: reservation.notes || '',
      tableId: reservation.table_id || '',
      status: reservation.status || 'booked',
      staffName: reservation.staff_name || ''
    });
  }, [reservation]);

  if (!open || !reservation) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">Bearbeiten</p>
            <h3>{reservation.guest_name}</h3>
          </div>
          <button className="icon-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-form">
          <label className="field">
            <span>Gastname</span>
            <input value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
          </label>

          <label className="field">
            <span>Telefon</span>
            <input value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} />
          </label>

          <label className="field">
            <span>Personen</span>
            <input type="number" min="1" value={form.guestCount} onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })} />
          </label>

          <label className="field">
            <span>Status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="booked">Gebucht</option>
              <option value="seated">Eingetroffen</option>
              <option value="finished">Fertig</option>
              <option value="no_show">No-Show</option>
            </select>
          </label>

          <label className="field">
            <span>Start</span>
            <input type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          </label>

          <label className="field">
            <span>Ende</span>
            <input type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          </label>

          <label className="field">
            <span>Mitarbeiter</span>
            <select value={form.staffName} onChange={(e) => setForm({ ...form, staffName: e.target.value })}>
              <option value="">Nicht zugewiesen</option>
              {STAFF_OPTIONS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Tisch</span>
            <select value={form.tableId} onChange={(e) => setForm({ ...form, tableId: e.target.value })}>
              <option value="">Kein Tisch</option>
              {tables.map((table) => (
                <option value={table.id} key={table.id}>
                  {table.name} · {table.capacity} Plätze
                </option>
              ))}
            </select>
          </label>

          <label className="field field-full">
            <span>Notiz</span>
            <textarea rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </label>
        </div>

        <div className="drawer-actions">
          <button className="ghost-button" onClick={onClose}>Abbrechen</button>
          <button className="primary-button" onClick={() => onSaved(form)}>Änderungen speichern</button>
        </div>
      </aside>
    </div>
  );
}
