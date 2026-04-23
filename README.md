Paket A

Dieses ZIP enthält alle kompletten Dateien für:
- /reservations funktioniert
- Bearbeiten / Speichern funktioniert
- Status ändern funktioniert
- Tisch und Mitarbeiter im Drawer änderbar
- Buttons sind mit größeren Touch-Flächen iPad-freundlicher

Nach dem Upload in Neon einmal ausführen:
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS staff_name TEXT;
