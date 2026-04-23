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

export default function ReservationEditorDrawer({
  open,
  reservation,
  tables,
  onClose,
  onSaved
}) {
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

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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

    setError('');
    setIsSaving(false);
  }, [reservation]);

  if (!open || !reservation) return null;

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      await onSaved(form);
    } catch (err) {
      setError(err?.message || 'Speichern fehlgeschlagen.');
      setIsSaving(false);
    }
  }

  return (
    <div className="drawer-backdrop">
      <aside className="drawer">
        <div className="drawer-head">
          <div>
            <p className="eyebrow">Bearbeiten</p>
            <h3>{reservation.guest_name}</h3>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Dialog schließen"
          >
            ✕
          </button>
        </div>

        <form className="drawer-form-wrap" onSubmit={handleSubmit}>
          <div className="drawer-form">
            <label className="field">
              <span>Gastname</span>
              <input
                value={form.guestName}
                onChange={(e) => updateField('guestName', e.target.value)}
              />
            </label>

            <label className="field">
              <span>Telefon</span>
              <input
                value={form.guestPhone}
                onChange={(e) => updateField('guestPhone', e.target.value)}
              />
            </label>

            <label className="field">
              <span>Personen</span>
              <input
                type="number"
                min="1"
                value={form.guestCount}
                onChange={(e) => updateField('guestCount', Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span>Status</span>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
              >
                <option value="booked">Gebucht</option>
                <option value="seated">Eingetroffen</option>
                <option value="finished">Fertig</option>
                <option value="no_show">No-Show</option>
              </select>
            </label>

            <label className="field">
              <span>Start</span>
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => updateField('startTime', e.target.value)}
              />
            </label>

            <label className="field">
              <span>Ende</span>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => updateField('endTime', e.target.value)}
              />
            </label>

            <label className="field">
              <span>Mitarbeiter</span>
              <select
                value={form.staffName}
                onChange={(e) => updateField('staffName', e.target.value)}
              >
                <option value="">Nicht zugewiesen</option>
                {STAFF_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Tisch</span>
              <select
                value={form.tableId}
                onChange={(e) => updateField('tableId', e.target.value)}
              >
                <option value="">Kein Tisch</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} · {table.capacity} Plätze
                  </option>
                ))}
              </select>
            </label>

            <label className="field field-full">
              <span>Notiz</span>
              <textarea
                rows="4"
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </label>
          </div>

          {error ? <p className="form-error-inline">{error}</p> : null}

          <div className="drawer-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={isSaving}
            >
              Abbrechen
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={isSaving}
            >
              {isSaving ? 'Speichert …' : 'Änderungen speichern'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
