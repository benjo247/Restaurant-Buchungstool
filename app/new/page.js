export default function NewPage() {
  return (
    <section className="stack">
      <div className="section-head">
        <div>
          <p className="eyebrow">Neu</p>
          <h2>Neue Reservierung</h2>
        </div>
      </div>

      <form className="form-card" action="/api/reservations" method="post">
        <p>Das Formular-Frontend bauen wir im nächsten Schritt fertig. API ist vorbereitet.</p>
      </form>
    </section>
  );
}
