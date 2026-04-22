# Restaurant Buchungstool – Clean Restart

Saubere Minimalversion mit funktionalem Kern:
- Reservierungen laden
- Reservierung bearbeiten und speichern
- Status ändern
- Tisch zuweisen
- Mitarbeiter zuweisen
- Floor-Ansicht und Reservierungsliste

## Deployment
1. Inhalt dieses Ordners ins Repo hochladen
2. `DATABASE_URL` in Vercel gesetzt lassen
3. In Neon einmal `neon-schema.sql` ausführen oder mindestens die `ALTER TABLE` Zeilen laufen lassen
4. Neu deployen
