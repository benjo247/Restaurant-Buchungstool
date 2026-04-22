# Restaurant App Starter

Ein minimales Starterprojekt für dein Reservierungssystem:
- Next.js App Router
- Prisma
- Neon/Postgres
- iPad-taugliches Grundlayout

## 1. Dateien nach GitHub hochladen
Lade den Inhalt dieses ZIPs in dein leeres Repository hoch.

## 2. Vercel verbinden
- Bei Vercel neues Projekt anlegen
- GitHub-Repo importieren
- Noch nicht nervös werden, wenn der erste Build scheitert: Die Datenbank ist noch nicht verbunden.

## 3. Neon-Datenbank anlegen
- Neue Postgres-Datenbank in Neon erstellen
- Connection String kopieren

## 4. Environment Variable setzen
In Vercel unter Settings -> Environment Variables:
- `DATABASE_URL`

## 5. Lokal einmalig ausführen
Auf deinem MacBook im Projektordner:
- `npm install`
- `cp .env.example .env`
- `.env` mit deinem echten `DATABASE_URL` füllen
- `npx prisma db push`

## 6. Änderungen committen und pushen
- Die App sollte danach bei Vercel sauber bauen.

## 7. Danach geht es weiter mit echter Logik
Nächste Schritte:
- Reservierungsformular an API anschließen
- echte Daten auf der Heute-Seite laden
- Tischlogik ergänzen
- PWA hinzufügen
