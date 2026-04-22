'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

function defaultStartTime() {
  const now = new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.toISOString().slice(0, 16);
}

function addMinutes(localIsoString, minutes) {
  const date = new Date(localIsoString);
  return new Date(date.getTime() + minutes * 60000).toISOString().slice(0, 16);
}

export default function NewReservationForm({ tables }) {
  const router = useRouter();
  const initialStart = useMemo(() => defaultStartTime(), []);
  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestCount: 2,
    startTime: initialStart,
    endTime: addMinutes(initialStart, 120),
    tableId: '',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Reservierung konnte nicht gespeichert werden.');
      }

      setSuccess('Reservierung erfolgreich gespeichert.');
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Ein Fehler ist aufgetreten.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Name des Gastes</span>
          <input
            required
            value={form.guestName}
            onChange={(event) => updateField('guestName', event.target.value)}
            placeholder="z. B. Max Mustermann"
          />
        </label>

        <label className="field">
          <span>Telefon</span>
          <input
            value={form.guestPhone}
            onChange={(event) => updateField('guestPhone', event.target.value)}
            placeholder="z. B. +49 170 1234567"
          />
        </label>

        <label className="field">
          <span>Anzahl Gäste</span>
          <input
            type="number"
            min="1"
            max="20"
            value={form.guestCount}
            onChange={(event) => updateField('guestCount', Number(event.target.value))}
          />
        </label>

        <label className="field">
          <span>Tisch</span>
          <select value={form.tableId} onChange={(event) => updateField('tableId', event.target.value)}>
            <option value="">Später zuweisen</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.name} · {table.capacity} Plätze
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Start</span>
          <input
            type="datetime-local"
            required
            value={form.startTime}
            onChange={(event) => updateField('startTime', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Ende</span>
          <input
            type="datetime-local"
            required
            value={form.endTime}
            onChange={(event) => updateField('endTime', event.target.value)}
          />
        </label>

        <label className="field field-full">
          <span>Notiz</span>
          <textarea
            rows="4"
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Allergien, Kinderstuhl, Geburtstag …"
          />
        </label>
      </div>

      {error ? <p className="form-message form-error">{error}</p> : null}
      {success ? <p className="form-message form-success">{success}</p> : null}

      <div className="form-actions">
        <a className="ghost-button" href="/">Abbrechen</a>
        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Speichert …' : 'Reservierung speichern'}
        </button>
      </div>
    </form>
  );
}
