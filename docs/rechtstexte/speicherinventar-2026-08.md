# Speicherinventar — was Rechenfix.de auf dem Endgerät ablegt

**Stand:** 16.08.2026
**Erhebung:** Welle Susanne Recht R3.0, Volltextsuche über `app/`, `components/`, `lib/`, `hooks/`
**Zweck:** Grundlage für jede Aussage über Cookies und Speicherung in den Rechtstexten.
Deckt ein Satz im Rechtstext keine Zeile dieser Tabelle, wird der Satz geändert — nicht die Tabelle.

**Maßstab:** § 25 TDDDG fragt nach dem Zugriff auf das Endgerät, unabhängig vom Personenbezug und
unabhängig davon, ob Daten das Gerät verlassen. Vom Nutzer selbst ausgelöst → einwilligungsfrei
nach Absatz 2 Nummer 2. Automatisch angelegt → einwilligungspflichtig.

---

## Erhebungsmethode

Gesucht wurde nicht nur nach `setItem`, sondern nach jeder Form des Endgerätezugriffs:

```bash
git grep -n "localStorage\|sessionStorage\|document\.cookie\|indexedDB\|caches\.\|cookies()" \
  -- app/ components/ lib/ hooks/
git grep -n "Set-Cookie\|from 'next/headers'\|serviceWorker.register" -- app/ components/ lib/
```

Ergebnis der Zusatzprüfungen:

- **Keine `middleware.ts`** im Projekt, also keine serverseitig gesetzten Cookies.
- **Kein `Set-Cookie`** und kein `cookies()` aus `next/headers` in Route-Handlern.
- **Keine IndexedDB-Nutzung.**
- **Keine Fremdskripte**, die eigenständig speichern könnten — `scripts/check-drittanbieter.mjs`
  meldet 0 ungegatete Fremdskripte über 390 geprüfte Dateien.

---

## Tabelle

| # | Fundstelle | Schlüssel | Was gespeichert wird | Auslösung | Lebensdauer | In der Datenschutzerklärung? |
|---|---|---|---|---|---|---|
| 1 | `components/ThemeProvider.tsx:38` | `rechenfix-theme` | `'light'` oder `'dark'` | **Nutzer** — Umschalter im Kopfbereich | bis der Nutzer die Websitedaten löscht | ja, Abschnitt 7 (Tabelle, Zeile „Essenziell") |
| 2 | `components/pwa/OfflineSchalter.tsx:53` | `rechenfix-offline-einwilligung` | Zeitstempel der Zustimmung (ISO) | **Nutzer** — Schalter auf `/offline-nutzung` | bis zum Abschalten | ja, Abschnitt 7 (Tabelle) und Abschnitt 7a |
| 3 | Service Worker `public/sw.js` | Cache Storage (mehrere Namen) | Seiteninhalte, Programmcode, Gestaltung, Bilder, Schriften | **Nutzer** — Schalter auf `/offline-nutzung`; zusätzlich automatisch, wenn die Anwendung bereits installiert vom Startbildschirm gestartet wird (`components/pwa/PwaStart.tsx:29`) | bis zum Abschalten oder bis der Nutzer die Websitedaten löscht | ja, Abschnitt 7a |
| 4 | `components/rechner/Prozentrechner.tsx:119` | `rechenfix_prozent_history` | bis zu 5 Rechenergebnisse mit Beschriftung, Modus und Uhrzeit | **automatisch** bei jeder Berechnung, ohne Zutun des Nutzers | unbegrenzt | **nein** |
| 5 | `components/cookie/CookieConsentProvider.tsx:84` | `cookie-consent` | `{ necessary: true, timestamp }` | **Nutzer** — Klick im Banner | 365 Tage, danach erneute Abfrage | ja, Abschnitt 7 (Tabelle) |
| 6 | `app/admin/affiliate-stats/page.tsx:146` | `rf_admin_stats_token` (sessionStorage) | das eingegebene Admin-Kennwort im Klartext | **Nutzer** — Anmeldung des Betreibers | Sitzung, endet mit dem Schließen des Tabs | nein — interne Seite, nicht für Besucher erreichbar |

---

## Bewertung

**Zeile 4 ist der einzige automatische Schreiber.** Sie ist damit die einzige Speicherung, die
nach § 25 Abs. 1 TDDDG eine Einwilligung bräuchte — und zugleich die einzige, die in keiner
Kategorie des Consent-Banners benannt war. Sie lief faktisch unter „Notwendige Cookies" mit,
obwohl deren Beschreibung nur „Cookie-Einwilligung, Dark-Mode-Einstellung" nennt.

**Zeilen 1, 2, 3 und 5** werden sämtlich durch eine Handlung des Nutzers ausgelöst und sind für
den jeweils gewünschten Dienst erforderlich. Sie fallen unter die Ausnahme des § 25 Abs. 2 Nr. 2
TDDDG. Für Zeile 3 gilt das im installierten Zustand mit derselben Begründung: Wer die Anwendung
installiert hat, hat den Offline-Dienst ausdrücklich gewünscht. Im gewöhnlichen Browserfenster
passiert ohne Schalter nichts.

**Zeile 6** betrifft keine Besucher. Die Seite ist intern, nicht indexiert und nur mit Kennwort
erreichbar; gespeichert wird die Eingabe des Betreibers auf seinem eigenen Gerät. Datenschutz-
rechtlich für Besucher ohne Belang. Unabhängig davon ist die Ablage eines Kennworts im Klartext
im Sitzungsspeicher eine Schwäche, die bei Gelegenheit eigenständig zu betrachten ist — sie
gehört nicht in diese Welle.

---

## Änderung durch Welle R3

Zeile 4 wird auf Opt-in umgestellt: Ohne einen vom Nutzer gesetzten Schalter wird nichts mehr auf
dem Gerät abgelegt; der Verlauf besteht dann nur im Arbeitsspeicher der laufenden Sitzung.
Bereits vorhandene Verläufe ohne Einwilligungskennzeichen werden beim ersten Laden gelöscht —
sie sind ohne Einwilligung entstanden und werden nicht nachträglich legitimiert.

Zeile 5 entfällt mit dem Consent-Banner, weil nach der Umstellung keine einwilligungspflichtige
Verarbeitung mehr übrig bleibt. Der Schlüssel wird bei den Besuchern aktiv aufgeräumt.

Nach Abschluss von R3 verbleiben damit ausschließlich Speicherungen, die der Nutzer selbst
einschaltet. Die Fortschreibung dieser Tabelle steht am Ende dieses Dokuments unter „Stand nach
R3".
