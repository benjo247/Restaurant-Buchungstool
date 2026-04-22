# Restaurant App – Browser Only Starter

Dieses Paket ist bewusst **ohne Prisma** gebaut, damit du **ohne lokalen Node/Terminal-Schritt** starten kannst.

## Architektur
- GitHub: Code
- Vercel: App + API
- Neon: Datenbank

## 1. Repo hochladen
Lade alle Dateien in dein GitHub-Repo hoch.

## 2. Vercel verbinden
Importiere das Repo in Vercel.

## 3. Neon anlegen
Erstelle in Neon eine Datenbank und kopiere den Connection String.

## 4. Datenbank-Tabelle in Neon direkt anlegen
Öffne in Neon den SQL Editor und führe `neon-schema.sql` aus.

## 5. DATABASE_URL in Vercel setzen
Projekt → Settings → Environment Variables → `DATABASE_URL`

## 6. Neu deployen
Danach sollte die App laufen.

## Wichtige Seiten
- `/` Heute
- `/new` Neue Reservierung
- `/reservations` Reservierungen
- `/tables` Tische
- `/settings` Einstellungen
- `/api/reservations` API-Test

## Hinweis
Dieses Starterpaket ist für den schnellen Browser-Start gedacht. Als nächstes bauen wir:
- echte Datenanzeige auf der Startseite
- Formular-POST von `/new`
- Tischlogik
- iPad-PWA
