# Barrierefreiheit: axe-Messung über die ganze Sitemap (November 2026)

**Stand:** 04.11.2026. **Wellen:** 201 und 202. **Zweck:** Grundlage für den Text von `/barrierefreiheit`, neu seit Welle 202.
Dort stand bis zu Welle 202 die Stichprobe vom 18.04.2026 (19 Rechner aus 9 Kategorien) und der Satz „Alle Formularfelder
(&lt;select&gt;, &lt;input&gt;) sind mit zugehörigen Labels verknüpft“. Die Vollprüfung Q4/2026 hatte entschieden, statt einer
erweiterten Stichprobe die ganze Sitemap zu messen.

## Verfahren

- **Werkzeug:** axe-core 4.11.2 in Chromium über Playwright. Regeln mit den Tags `wcag2a`, `wcag2aa`, `wcag21a`,
  `wcag21aa`, Ergebnisart `violations`.
- **Seiten:** alle 258 Adressen der Sitemap vom 02.11.2026.
- **Ansichten:** Desktop hell und Desktop dunkel (1280 × 900, `prefers-color-scheme`), seit der zweiten Messung
  zusätzlich Handy hell (390 × 844, Touch). Dunkel wird erst gemessen, wenn `<html>` die Klasse `dark` trägt.
- **Regeln für gute Praxis:** seit der Zusatzmessung vom 04.11.2026 auch der axe-Tag `best-practice` (u. a.
  `heading-order`, `landmark-*`, `empty-table-header`). Diese Regeln sind keine Erfolgskriterien der WCAG; sie prüfen
  aber, was `/barrierefreiheit` über Überschriften und Seitenaufbau sagt.
- **Ablauf je Seite:** laden bis `load`, Schriften fertig, 400–500 ms warten, axe einspielen und ausführen. Seiten mit
  Verstoß oder Ladefehler werden ein zweites Mal gemessen; gezählt wird die zweite Messung (in der ersten Messung: die
  erste, die zweite als Wiederholung daneben).
- **Eigene Prüfungen im DOM** (seit der zweiten Messung), weil axe einen Platzhalter wie „z. B. 75“ als Namen gelten
  lässt: Eingabefelder (`input` außer hidden/submit/button, `select`, `textarea`) ohne zugeordnetes `<label>` und ohne
  `aria-label`/`aria-labelledby`; `<label for>` ohne Ziel; doppelte `id`.
- **Grenze:** Automatisierte Prüfungen decken nur einen Teil der Erfolgskriterien ab. Verständliche Sprache, sinnvolle
  Alternativtexte und eine schlüssige Fokusreihenfolge beurteilt keine dieser Messungen.

## Messung 1 — live, 02.11.2026, vor der Welle

www.rechenfix.de, Desktop hell und dunkel. 258 von 258 Seiten mit HTTP 200. **142 Seiten mit mindestens einem
Verstoß.**

| Regel | Gewicht | Seiten | Knoten (hell + dunkel) |
|---|---|---|---|
| `link-in-text-block` | serious | 129 | 730 |
| `label` | critical | 32 | 148 |
| `button-name` | critical | 6 | — |
| `select-name` | critical | 1 | — |
| `scrollable-region-focusable` | serious | 2 | — |

`link-in-text-block`: Links mit `text-primary-600 dark:text-primary-400 hover:underline`, Kontrast zum umgebenden
Text 1,53 : 1 hell und 1,72 : 1 dunkel; axe verlangt 3 : 1 oder eine andere Auszeichnung. Fast alle stammen aus dem
Quellenblock („Originaltext“, `components/Quellen.tsx`), dazu `/datenschutz`, `/qualitaet` und `/ueber-uns`.

## Messung 2 — lokal, 03.11.2026, vor der Welle

Stand `main` `d47274a`, `next build` und `next start` im Container. Ein Unterschied zum Live-Build: `app/layout.tsx`
lud die Schrift Inter für diese Messung aus einer lokalen Datei (`@fontsource-variable/inter`), weil der Container
Google Fonts nicht erreicht. Auf die gemessenen Regeln hat das keinen Einfluss; der Unterschied ist nicht Teil der Welle.

| Regel | Desktop hell | Desktop dunkel | Handy |
|---|---|---|---|
| `link-in-text-block` | 129 Seiten / 365 Knoten | 129 / 365 | 129 / 364 |
| `label` | 31 / 71 | 32 / 74 | 31 / 71 |
| `button-name` | 4 / 4 | 6 / 7 | 6 / 7 |
| `select-name` | 1 / 1 | 1 / 1 | 1 / 1 |
| `scrollable-region-focusable` | 2 / 2 | 2 / 2 | **199 / 475** |

Eigene Prüfungen: **321** verschiedene Eingabefelder ohne programmatische Beschriftung auf **207** Seiten (axe sah die
meisten nicht, weil sie einen Platzhalter tragen); **59** `<label for>` auf 23 Seiten, deren Ziel-`id` am Feld fehlte;
keine doppelte `id`.

Die Messung 1 bestätigt sich lokal Regel für Regel. Neu ist die Handyansicht: Dort scrollen fast alle Tabellen
waagerecht, und keine war per Tastatur erreichbar.

## Änderungen der Welle 201

- **Beschriftung:** in 157 Dateien 532 Paare aus sichtbarem `<label>` und Feld neu verknüpft (`htmlFor` und `id`,
  Schema `<rechner>-<feld>`); bei weiteren 81 Feldern trug das `<label>` schon ein `htmlFor`, dem Feld fehlte aber die
  `id` (10 davon mit zusammengesetzter `id`). 68 Felder unter einer Schritt-Überschrift in 36 Dateien mit `aria-label`
  (statischer Titel) oder `aria-labelledby`. 62 Ersetzungen von Hand: Zeilen in Listen, Felder unter
  Schnellwahl-Knöpfen, Freitextfelder, versteckte Kalender-Auswahl, Suchfeld, Miteigentumsanteil der Grundsteuer.
  `NummerEingabe` reicht `aria-label` und `aria-labelledby` durch. Zwei feste `id` in Listenzeilen
  (`alkoholabbau-select-1`, `mwst-select-1`) durch `aria-label` je Zeile ersetzt.
- **Schalter:** 10 Knöpfe in 8 Rechnern mit `type="button" role="switch" aria-checked aria-label`.
- **Auswahlfeld:** das `select` „Einkommensbonus“ im Wärmepumpen-Rechner mit seinem `<label>` verknüpft.
- **Links im Fließtext:** 19 Stellen von `hover:underline` auf `underline underline-offset-2`.
- **Scrollbare Bereiche:** 120 `div` mit `overflow-x-auto` in 105 Dateien mit `tabIndex={0} role="region"
  aria-label`; der Name ist der Blocktitel, die nächste Überschrift davor oder „Tabelle“.
- **Prüfskript:** `scripts/verify-barrierefreiheit.ts` (sechs Prüfungen am Quelltext, läuft in `verify:alle` und in
  der CI); Gegenprobe am Stand vor der Welle: 0 von 6 grün.
- **CLAUDE.md:** Regeln „Formularfelder, Schalter, Links, Tabellen“; Karola-Abnahme entfällt bei reinen
  Barrierefreiheits-Attributen, die axe-Messung tritt an ihre Stelle.

## Messung 3 — lokal, 03.11.2026, nach der Welle

Gleiches Verfahren wie Messung 2, Stand der Welle (Vorlagen der Übergabe angewandt auf `d47274a`).

774 Messungen (258 Seiten × 3 Ansichten), alle mit HTTP 200. **Kein Verstoß** gegen eine der gemessenen Regeln, in
keiner Ansicht. Eigene Prüfungen: **0** Eingabefelder ohne Beschriftung, **0** `<label for>` ohne Ziel, **0** doppelte
`id`.

| Regel | Desktop hell | Desktop dunkel | Handy |
|---|---|---|---|
| `link-in-text-block` | 0 | 0 | 0 |
| `label` | 0 | 0 | 0 |
| `button-name` | 0 | 0 | 0 |
| `select-name` | 0 | 0 | 0 |
| `scrollable-region-focusable` | 0 | 0 | 0 |

Gemessen wurde der Build aus den Vorlagen der Übergabe; davon ausgenommen ist nur
`docs/rechtstexte/aenderungshistorie.md`, das nicht in den Build eingeht. Zwischenstand vor den letzten vier
Korrekturen (Suchfeld, Miteigentumsanteil, Auswahlfeld „Einkommensbonus“, Namen der scrollbaren Bereiche): `select-name`
auf einer Seite in zwei Ansichten und vier unbeschriftete Felder auf drei Seiten; danach behoben und erneut gemessen.

`npx eslint . --no-cache`: 0 Fehler, 0 Warnungen, am Stand der Welle wie an `d47274a` und an `54f0b11` (31.10.2026,
`next` 16.4.1). Die zwei Warnungen `react-hooks/exhaustive-deps` aus Abschnitt 9.5 der Next.js-Bestandsaufnahme waren
also schon vor dem Nachzug auf 16.4.5 verschwunden — nicht durch den Cache und nicht durch das Update.

## Messung 4 — live, 04.11.2026, nach Welle 201

www.rechenfix.de am Stand `869ed7b`, 00:40–00:55 Uhr. Sitemap unverändert 258 Seiten. 774 Messungen (258 × 3), alle
mit HTTP 200. **Kein Verstoß** gegen die Regeln der WCAG 2.1 A und AA, in keiner Ansicht und auch nicht im ersten
Durchgang. Eigene Prüfungen: **0** Eingabefelder ohne Beschriftung (3.310 Felder auf 226 Seiten), **0**
`<label for>` ohne Ziel, **0** doppelte `id`. Das bestätigt Messung 3 auf der Live-Seite.

## Zusatzmessung gute Praxis — live, 04.11.2026

Anlass: `/barrierefreiheit` sagte „Korrekte Überschriften-Hierarchie (h1 → h2 → h3) auf allen Seiten“; das prüfen die
WCAG-Regeln von axe nicht. Gemessen: Tag `best-practice`, Desktop hell, 258 Seiten, 00:55–01:01 Uhr.

| Regel | Seiten | Ursache |
|---|---|---|
| `heading-order` | 80 | Baustein-Titel im `ContentBlockRenderer` waren h3; 78 Seiten springen von h1 direkt auf h3 |
| `landmark-complementary-is-top-level` | 21 | `KarstenSagt` als `<aside>` im Artikel, also in `<main>` |
| `landmark-unique` | 6 | gleich benannte `role="region"`: zweimal „Tabelle“ (Pfändung, Reifengröße); dieselbe Tabelle als Baustein und in der Komponente (Bremsweg, Trinkmenge, Auflösung); `/aktualisierungen` |
| `landmark-no-duplicate-main`, `landmark-main-is-top-level` | 1 | `/aktualisierungen` hatte ein zweites `<main>` im Layout-`<main>` |
| `empty-table-header` | 5 | leere `<th>` über der Zeilenbeschriftung (Teilzeit, Elterngeld, Kindergeld, Krankengeld, Photovoltaik) |

Genau eine h1 auf allen 258 Seiten.

**Taschenrechner, Funktionsprobe per Tastatur** (`/mathe/wissenschaftlicher-taschenrechner`, Playwright, 8 Fälle:
Enter auf angesteuerter Taste, Tab weiter, Enter auf „=“, Leertaste auf „C“, direktes Tippen mit Enter, Name der
Wurzel-Taste, Name der Modus-Taste, aria-live am Ergebnis): live **2 von 8**. Ein globaler `keydown`-Handler fing
Enter auch auf einer angesteuerten Taste ab und rechnete; die Taste selbst wurde nicht ausgelöst. `/barrierefreiheit`
nannte den Rechner „nur eingeschränkt per Tastatur bedienbar“, ohne Grund.

## Änderungen der Welle 202

- **Überschriften:** `BlockTitel` und der Titel der Checkliste im `ContentBlockRenderer` sind h2.
- **`/aktualisierungen`:** inneres `<main>` → `<div>`.
- **Bereichsnamen:** 39 Bereiche, die nur „Tabelle“ hießen, tragen einen sprechenden Namen; Bausteine ohne Titel heißen
  „Tabelle: <Spaltenköpfe>“ bzw. „Vergleich: A und B“; vier Rechner-Tabellen, deren Titel auch als Baustein auf der
  Seite steht, heißen „Rechner: …“ (Bremsweg, Trinkmenge, Auflösung, Leasingfaktor).
- **Tabellenköpfe:** 6 leere `<th>` mit `<span className="sr-only">`; einen davon (Abfindung) hatte axe nicht gemeldet,
  er war aber ebenso leer.
- **`KarstenSagt`:** `<div role="note" aria-label="Karsten sagt">`.
- **Taschenrechner:** Enter und Leertaste auf einem fokussierten Knopf werden nicht mehr abgefangen; `aria-live` am
  Ergebnis; `type="button"`; 31 Tasten mit gesprochenem Namen; Rechenweg und Anzeige unverändert.
- **Prüfskript:** `verify-barrierefreiheit` mit 9 statt 6 Prüfungen (Bereichsnamen, Tabellenköpfe, genau ein `<main>`);
  Gegenprobe an `869ed7b`: 6 von 9 grün.
- **CLAUDE.md:** Lighthouse-Sätze durch die axe-Messung ersetzt, Regeln ergänzt, Ausnahme in Regel 8 erweitert.
- **`/barrierefreiheit`:** neuer Text mit Stand 4. November 2026 (eigener `recht:`-Commit).

## Messung 5 — lokal, 04.11.2026, nach Welle 202

Stand der Welle (Vorlagen der Übergabe angewandt auf `869ed7b`), `next build` und `next start` im Container, mit
derselben Ausnahme wie in Messung 2 (Schrift Inter aus lokaler Datei). Regeln: WCAG 2.1 A/AA **und** `best-practice`,
alle drei Ansichten, 10:27–10:40 Uhr.

774 Messungen, alle mit HTTP 200. **Kein Verstoß** gegen die WCAG-Regeln. Regeln für gute Praxis: **0** nach der
letzten Korrektur. Eigene Prüfungen: **0** Eingabefelder ohne Beschriftung, **0** `<label for>` ohne Ziel, **0**
doppelte `id`; genau eine h1 je Seite, kein Sprung in der Überschriftenfolge.

Zwischenstand vor der letzten Korrektur: `landmark-unique` auf `/auto/leasingfaktor-rechner` in allen drei Ansichten
(„Bewertungsskala (Privat, brutto)“ als Baustein und in der Komponente). Die Tabelle in der Komponente heißt seitdem
„Rechner: Bewertungsskala (Privat, brutto)“; ein Abgleich aller festen Bereichsnamen der Komponenten gegen die
Baustein-Titel der Config fand keinen weiteren Fall. Nachgemessen am Endstand der Übergabe: `/auto/leasingfaktor-rechner`,
`/barrierefreiheit`, `/auto/bremsweg-rechner` und `/mathe/wissenschaftlicher-taschenrechner` in drei Ansichten, 0 Verstöße.

Taschenrechner, Funktionsprobe per Tastatur: **8 von 8**.

`npm run verify:alle` 88 von 88 grün, `npx eslint . --no-cache` ohne Befund, Build 272/272.

## Messung 6 — live, nach dem Deploy von Welle 202

Folgt durch die Chat-Sitzung: WCAG 2.1 A/AA und `best-practice`, drei Ansichten, Funktionsprobe Taschenrechner.
