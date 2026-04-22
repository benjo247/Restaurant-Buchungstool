'use client';

import { useEffect, useState } from 'react';

const STAFF_OPTIONS = ['Host', 'Service 1', 'Service 2', 'Manager'];

function addMinutes(value, minutes) {
  const date = new Date(value);
  return new Date(date.getTime() + minutes * 60000).toISOString().slice(0, 16);
}

function roundedNow() {
  const now = new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function NewPage() {
  const [tables, setTables] = useState([]);
  const initialStart = roundedNow();
  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestCount: 2,
    tableId: '',
    startTime: initialStart,
    endTime: addMinutes(initialStart, 120),
    notes: '',
    staffName: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/tables', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setTables(Array.isArray(data) ? data : []))
      .catch(() => setTables([]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || 'Speichern fehlgeschlagen.');
      return;
    }

    setMessage('Reservierung gespeichert. Gehe jetzt zurück zum Floor.');
  }

  return (
    <section className="simple-page">
      <div className="page-title">
        <p className="eyebrow">Neu</p>
        <h2>Neue Reservierung</h2>
      </div>

      <div className="panel form-shell">
        <form className="simple-form" onSubmit={handleSubmit}>
          <input placeholder="Gastname" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
          <input placeholder="Telefon" value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} />
          <input type="number" placeholder="Personen" value={form.guestCount} onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })} />
          <select value={form.staffName} onChange={(e) => setForm({ ...form, staffName: e.target.value })}>
            <option value="">Mitarbeiter wählen</option>
            {STAFF_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={form.tableId} onChange={(e) => setForm({ ...form, tableId: e.target.value })}>
            <option value="">Tisch optional wählen</option>
            {tables.map((table) => <option key={table.id} value={table.id}>{table.name} · {table.capacity} Plätze</option>)}
          </select>
          <input type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          <input type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          <textarea rows="4" placeholder="Notiz" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button type="submit" className="primary-button">Reservierung speichern</button>
          {message ? <p className="muted">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
