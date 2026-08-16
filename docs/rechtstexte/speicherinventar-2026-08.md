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
| 1 | `components/ThemeProvider.tsx:38` | `rechenfix-theme` | `'light'` oder `'dark'` | **automatisch** beim Seitenaufruf — siehe Korrektur unten | bis der Nutzer die Websitedaten löscht | ja, Abschnitt 7 (Tabelle, Zeile „Essenziell") |
| 2 | `components/pwa/OfflineSchalter.tsx:53` | `rechenfix-offline-einwilligung` | Zeitstempel der Zustimmung (ISO) | **Nutzer** — Schalter auf `/offline-nutzung` | bis zum Abschalten | ja, Abschnitt 7 (Tabelle) und Abschnitt 7a |
| 3 | Service Worker `public/sw.js` | Cache Storage (mehrere Namen) | Seiteninhalte, Programmcode, Gestaltung, Bilder, Schriften | **Nutzer** — Schalter auf `/offline-nutzung`; zusätzlich automatisch, wenn die Anwendung bereits installiert vom Startbildschirm gestartet wird (`components/pwa/PwaStart.tsx:29`) | bis zum Abschalten oder bis der Nutzer die Websitedaten löscht | ja, Abschnitt 7a |
| 4 | `components/rechner/Prozentrechner.tsx:119` | `rechenfix_prozent_history` | bis zu 5 Rechenergebnisse mit Beschriftung, Modus und Uhrzeit | **automatisch** bei jeder Berechnung, ohne Zutun des Nutzers | unbegrenzt | **nein** |
| 5 | `components/cookie/CookieConsentProvider.tsx:84` | `cookie-consent` | `{ necessary: true, timestamp }` | **Nutzer** — Klick im Banner | 365 Tage, danach erneute Abfrage | ja, Abschnitt 7 (Tabelle) |
| 6 | `app/admin/affiliate-stats/page.tsx:146` | `rf_admin_stats_token` (sessionStorage) | das eingegebene Admin-Kennwort im Klartext | **Nutzer** — Anmeldung des Betreibers | Sitzung, endet mit dem Schließen des Tabs | nein — interne Seite, nicht für Besucher erreichbar |

---

## Bewertung

> **Korrektur vom 16.08.2026 (Welle R4).** Zeile 1 war in der Erst-Erhebung fälschlich als „vom
> Nutzer ausgelöst" eingestuft. Das `setItem` stand zwar im Umschalter-Umfeld, lief aber in einem
> Effekt, der bei **jedem** Einhängen der Komponente feuert — also bei jedem Seitenaufruf, auch
> ohne jede Nutzeraktion. Aufgefallen ist das erst bei Karstens Browserprüfung nach R3: Nach dem
> ersten Aufruf stand `rechenfix-theme` im Speicher, ohne dass etwas angeklickt worden war.
>
> Die statische Suche nach `setItem` findet die Zeile, beantwortet aber nicht, **wodurch** sie
> ausgelöst wird. Für die Einordnung nach § 25 TDDDG ist genau das die entscheidende Frage. Lehre
> für künftige Erhebungen: Bei jeder Fundstelle den umgebenden Ausführungspfad mitprüfen —
> Effekt ohne Bedingung heißt automatisch, unabhängig davon, wie die Datei heißt.
>
> Auf den Ablauf von R3 wirkt sich der Fehler nicht aus: `rechenfix-theme` war in der
> STOP-Bedingung namentlich ausgenommen, die Bedingung hätte also auch bei richtiger Einstufung
> nicht ausgelöst. Behoben mit `04be477` (R4.1).

**Nach dieser Korrektur waren es zwei automatische Schreiber: Zeile 1 und Zeile 4.** Beide hätten
nach § 25 Abs. 1 TDDDG eine Einwilligung gebraucht. Zeile 4 war zugleich die einzige, die in keiner
Kategorie des Consent-Banners benannt war; sie lief faktisch unter „Notwendige Cookies" mit, obwohl
deren Beschreibung nur „Cookie-Einwilligung, Dark-Mode-Einstellung" nennt. Zeile 1 war dort zwar
benannt, aber als vom Nutzer gesetzt beschrieben — was sie nicht war.

**Zeilen 2, 3 und 5** werden sämtlich durch eine Handlung des Nutzers ausgelöst und sind für
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
einschaltet.

---

## Aktueller Stand (16.08.2026, nach R3, S1 und R4)

| # | Fundstelle | Schlüssel | Auslösung | Rechtsgrundlage | In der Datenschutzerklärung? |
|---|---|---|---|---|---|
| 1 | `components/ThemeProvider.tsx` (`toggleTheme`) | `rechenfix-theme` | **Nutzer** — Betätigen des Umschalters im Seitenkopf; ohne gespeicherten Wert entscheidet `prefers-color-scheme`, ohne zu schreiben (seit `04be477`, R4.1) | § 25 Abs. 2 Nr. 2 TDDDG | ja, Abschnitt 7 |
| 2 | `components/pwa/OfflineSchalter.tsx:53` | `rechenfix-offline-einwilligung` | Nutzer — Schalter auf `/offline-nutzung` | § 25 Abs. 1 TDDDG (siehe offene Frage unten) | ja, Abschnitt 7 und 7a |
| 3 | Service Worker `public/sw.js` | Cache Storage | Nutzer — Schalter; im installierten Zustand der Start über das Symbol | § 25 Abs. 1 bzw. Abs. 2 Nr. 2 TDDDG | ja, Abschnitt 7 und 7a |
| 4 | `components/rechner/Prozentrechner.tsx` über `hooks/useOptInStorage.ts` | `rechenfix-verlauf-einwilligung` und `rechenfix_prozent_history` | **Nutzer** — Schalter unterhalb der Verlaufsanzeige | § 25 Abs. 2 Nr. 2 TDDDG | ja, Abschnitt 7 und 7b |
| 5 | `lib/admin-session.ts`, gesetzt von `/api/admin/login` | `rf_admin_session` (Cookie, `HttpOnly`) | Nutzer — Anmeldung des Betreibers | interne Seite, nicht für Besucher erreichbar | nein, bewusst |

**Entfallen gegenüber der Erhebung:**

- `cookie-consent` — der Consent-Banner ist mit R3.3 vollständig zurückgebaut; der Altbestand wird
  bei den Besuchern durch `components/cookie/EinwilligungsspeicherAufraeumen.tsx` beim ersten
  Laden gelöscht.
- `rf_admin_stats_token` (sessionStorage) — lag im Klartext und ist mit Welle S1 durch das
  `HttpOnly`-Sitzungscookie in Zeile 5 ersetzt worden (`ff5d675`). Der Altwert wird beim Aufruf der
  Admin-Seite entfernt.

**Kein automatischer Schreiber mehr — seit R4.1 auch tatsächlich.** Beim gewöhnlichen Besuch der
Website wird nichts auf dem Endgerät abgelegt. Jede verbleibende Speicherung wird durch eine
Handlung des Nutzers ausgelöst. Bis R4 galt dieser Satz nur mit einer Einschränkung, die in der
Erst-Erhebung übersehen worden war: Der Darstellungsmodus wurde beim Seitenaufruf ungefragt
geschrieben. Erst mit `04be477` trifft die Aussage in Abschnitt 7 der Datenschutzerklärung
(„Im Browser gespeichert wird ausschließlich, was Sie selbst einschalten") ohne Vorbehalt zu.

### Offene Frage zur Einordnung

Der Offline-Schalter (Zeile 2/3) und der Verlaufsschalter (Zeile 4) sind bauartgleich — beide
werden ausschließlich durch eine bewusste Handlung des Nutzers ausgelöst — werden aber
unterschiedlich begründet: Abschnitt 7a führt den Offline-Schalter seit Welle 69 als **Einwilligung
nach § 25 Abs. 1**, Abschnitt 7b den Verlauf als **Ausnahme nach § 25 Abs. 2 Nr. 2**. Beide
Einordnungen sind vertretbar, aber sie sollten angeglichen werden. Solange sie auseinanderfallen,
kann in Abschnitt 7 nicht behauptet werden, die Website setze überhaupt keine
einwilligungspflichtigen Speicherungen ein — der Satz ist dort entsprechend vorsichtiger gefasst.

Das ist eine Bewertungsfrage, keine Umsetzungsfrage, und daher bewusst offen gelassen.

### Regel für neue Rechner

Wer einen Rechner mit Verlauf oder gemerkten Eingaben ausstattet, benutzt `hooks/useOptInStorage.ts`
und schreibt **nicht** direkt in den Browserspeicher. Der Hook erzwingt den Standardzustand „aus",
das Löschen beim Abschalten und das Aufräumen von Altbeständen ohne Einwilligungskennzeichen.
Andernfalls kehrt der automatische Schreiber zurück, den Welle R2 gefunden hat — und diese Tabelle
wird still unrichtig.
