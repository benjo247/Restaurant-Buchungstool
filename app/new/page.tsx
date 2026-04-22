"use client";

import { useState } from "react";

export default function NewPage() {
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestCount: "2",
    reservationDate: "",
    reservationTime: "",
    durationMinutes: "120",
    notes: "",
  });
  const [message, setMessage] = useState("");

  function update(key: string, value: string) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Speichert...");

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Fehler");
      return;
    }

    setMessage("Reservierung gespeichert.");
    setForm({
      guestName: "",
      guestPhone: "",
      guestCount: "2",
      reservationDate: "",
      reservationTime: "",
      durationMinutes: "120",
      notes: "",
    });
  }

  return (
    <div className="card">
      <h2>Neue Reservierung</h2>
      <div style={{ height: 12 }} />
      <form className="form" onSubmit={onSubmit}>
        <label className="label">
          Name
          <input className="input" value={form.guestName} onChange={(e) => update("guestName", e.target.value)} />
        </label>

        <label className="label">
          Telefonnummer
          <input className="input" value={form.guestPhone} onChange={(e) => update("guestPhone", e.target.value)} />
        </label>

        <div className="grid-2">
          <label className="label">
            Personen
            <input className="input" type="number" min="1" value={form.guestCount} onChange={(e) => update("guestCount", e.target.value)} />
          </label>

          <label className="label">
            Dauer (Minuten)
            <input className="input" type="number" min="30" step="30" value={form.durationMinutes} onChange={(e) => update("durationMinutes", e.target.value)} />
          </label>
        </div>

        <div className="grid-2">
          <label className="label">
            Datum
            <input className="input" type="date" value={form.reservationDate} onChange={(e) => update("reservationDate", e.target.value)} />
          </label>

          <label className="label">
            Uhrzeit
            <input className="input" type="time" value={form.reservationTime} onChange={(e) => update("reservationTime", e.target.value)} />
          </label>
        </div>

        <label className="label">
          Notiz
          <textarea className="textarea" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </label>

        <div className="actions">
          <button className="button" type="submit">Reservierung speichern</button>
          <a className="button secondary" href="/">Zurück</a>
        </div>
      </form>

      {message ? <p style={{ marginTop: 12 }} className="muted">{message}</p> : null}
    </div>
  );
}
