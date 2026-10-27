# Konventionen-Register

Stand 27.10.2026. Maschinenlesbar in `assets/karola.json`, Block `konventionen`; `scripts/karola.py register` sucht die Muster, der Selbsttest prüft jedes Muster gegen sein Positiv- und Negativbeispiel und dass diese Datei für jede Kennung einen Abschnitt hat.

**Warum ein Register.** Rechtswerte haben seit April 2026 eine SSOT und einen Wächter (`scripts/check-jahreswerte.mjs`). Konventionen hatten keinen: Guard G10 nahm „nicht rechts- oder jahresabhängige Konstanten" ausdrücklich aus. Genau dort lag der 160-Stunden-Fehler. Eine Konvention ist eine Festlegung, die mehrere Rechner teilen und die anders getroffen werden könnte — 52 ÷ 12 statt 4,348, Arbeitstage aus dem Kalender statt pauschal. Sie braucht dieselbe Behandlung wie ein Rechtswert: einen Ort im Code, einen Grund, eine Suche nach Abweichlern.

**Stufen.** `befund`: jede Fundstelle ist ein Befund (B, bei sichtbar falschem Ergebnis A). `pruefen`: jede Fundstelle wird von Hand eingeordnet — Jahr im selben Satz, Interpolation aus der Lib oder Termin in `lib/termine.ts`, sonst B.

**Was nicht gezählt wird.** Kommentarzeilen und Zeilenendkommentare (Muster mit `zeilen: code`): Historienkommentare wie „W196: vorher 160" sollen stehen bleiben. Bei Stufe `pruefen` außerdem Zeilen, die das Jahr nennen (`ausser_wenn`), und die Pfade unter `ausnahmen_praefix` (Blogartikel tragen ihren Stand im Datum).

## KV01 Wochen pro Monat

- **Regel:** 52 ÷ 12 = 4,3333 Wochen pro Monat. Im Code nur über `WOCHEN_PRO_MONAT`. Im Text ist 4,33 als gerundete Anzeige erlaubt. Kalendergenau 4,348 Wochen (TVöD, Branchen-Mindestlöhne) nur als ausdrücklich benannter Vergleich, nie als Rechengrundlage.
- **SSOT:** `lib/berechnungen/_helpers.ts`, `WOCHEN_PRO_MONAT`. Rechner-Komponenten importieren ihn über die Domain-Lib, nie aus `_helpers.ts` direkt (`CLAUDE.md`, „Berechnungs-interne Helfer“).
- **Grund:** So rechnet der Gesetzgeber bei der Minijob-Grenze (§ 8 Abs. 1a SGB IV: Mindestlohn × 130 ÷ 3) und der Mindestlohnrechner des BMAS. Regel in `CLAUDE.md` seit Welle 197.
- **Muster:** Faktor 4,3 bis 4,35 hinter `*` oder `/` im Code; „woche … * 4".
- **Stand 27.10.2026:** eine Fundstelle, `components/rechner/EnergiekostenRechner.tsx:75` (`kwhWoche * 4.33`).

## KV02 Monatsstunden einer Vollzeitstelle

- **Regel:** 40 × 52 ÷ 12 = 173,33 Stunden. Im Code nur über `VOLLZEIT_STUNDEN_MONAT` oder Wochenstunden × `WOCHEN_PRO_MONAT`. Nie 160 (4 × 40 stimmt nur für einen Februar ohne Schalttag), nie 174 als Rechengrundlage.
- **SSOT:** `lib/berechnungen/_helpers.ts`, `VOLLZEIT_STUNDEN_MONAT`, für Komponenten re-exportiert über `lib/berechnungen/mindestlohn.ts`.
- **Grund:** Welle 196. Drei Seiten rechneten mit 160, eine FAQ nannte 174, der Stundenlohn-Rechner 173,33.
- **Muster:** dieselben sechs wie in `scripts/verify-monatsstunden.ts`, das sie als Gate im Build prüft. Das Register führt sie, damit die Regel an einer Stelle mit Begründung steht.

## KV03 Arbeitstage pro Monat

- **Regel:** Nie pauschal 21,67, 21,7, 21,75 oder 22 Arbeitstage pro Monat. Arbeitstage kommen aus dem Kalender mit den bundesweiten Feiertagen von Montag bis Freitag oder sind eine Eingabe.
- **SSOT:** `lib/berechnungen/wahrer-stundenlohn.ts` (Arbeitstage aus Kalender und Feiertagen).
- **Grund:** Welle 164 löste die Pauschale von 21,7 Tagen ab; 2026 hat 261 Tage von Montag bis Freitag, davon 7 bundesweite Feiertage.
- **Muster:** „21,7 Arbeitstage pro Monat" und Konstanten `ARBEITSTAGE…MONAT = 21…`.

## KV04 Minijob-Grenze

- **Regel:** Mindestlohn × 130 ÷ 3, aufgerundet auf volle Euro (2026: 603 €, 2027: 633 €). In Code und Anzeige über `getMinijobGrenzeMonat`; als Zahl im Text nur mit Jahr im selben Satz oder mit Termin.
- **SSOT:** `lib/berechnungen/mindestlohn.ts`, `getMinijobGrenzeMonat`.
- **Grund:** § 8 Abs. 1a SGB IV koppelt die Grenze an den Mindestlohn. Zum 01.01.2027 springt sie auf 633 €; jedes „603 €" ohne Jahr ist ab dann falsch.
- **Stufe:** `pruefen`. Stand 27.10.2026: drei Stellen in Komponenten (`AfbgRechner.tsx:128`, `BafoegRechner.tsx:167`, `NebenjobRechner.tsx:67`).

## KV05 Mindestlohn-Monatsbrutto bei 40 Wochenstunden

- **Regel:** Mindestlohn × 40 × 52 ÷ 12 (2026: 2.409,33 €, 2027: 2.530,67 €). In Code und Anzeige über `mindestlohnMonatVollzeit`; als Zahl im Text nur mit Jahr im selben Satz oder mit Termin.
- **SSOT:** `lib/berechnungen/mindestlohn.ts`, `mindestlohnMonatVollzeit`.
- **Grund:** Welle 196.
- **Stufe:** `pruefen`. Stand 27.10.2026: eine Stelle, `lib/rechner-config/finanzen.ts:4549` (Tabellenzeile ohne Jahr).

## KV06 Jahreswerte als Zahl im Text

- **Regel:** Die Jahreswerte aus `scripts/jahreswerte-config.json` (Grundfreibetrag, Soli-Grenzen, Rentenwert, Beitragsbemessungsgrenzen, Kinderfreibetrag, Mindestlohn …) stehen im Text nur mit Jahr im selben Satz, aus der Lib interpoliert oder mit Termin.
- **SSOT:** die Lib, die `jahreswerte-config.json` je Wert nennt.
- **Grund:** `check-jahreswerte.mjs` sucht diese Werte im Code in Code-Schreibweise (`5812.50`), aber nicht in deutscher Schreibweise im Text (`5.812,50`) und nicht in `lib/rechner-config/`. Gefunden am 27.10.2026: `components/rechner/SchnellCheck.tsx:82` prüft `brutto > BBG_KV_MONAT` aus der Lib, schreibt aber „(5.812,50 €)" fest in den Text — die Bedingung wechselt mit dem Rechenstand, der Text nicht.
- **Muster:** zur Laufzeit aus `jahreswerte-config.json` gebaut, je Wert alle Schreibweisen, Kontextwörter wie dort. Fehlt die Datei, greift das Ersatzmuster für 5.812,50.
- **Stufe:** `pruefen`. Stand 27.10.2026 ohne Blog: 103 Stellen, davon 83 in `lib/rechner-config/finanzen.ts`; in einer Abnahme zählen nur die Stellen des geprüften Rechners (`--slug`).

## Neue Konvention aufnehmen

1. Die Größe kommt in mindestens zwei Rechnern vor, und es gibt eine Festlegung mit Grund (Gesetz, amtlicher Rechner, Welle).
2. Die SSOT existiert im Code; sonst zuerst eine Welle, die sie schafft.
3. Eintrag in `assets/karola.json` mit `id` (nächste freie `KVnn`), `groesse`, `regel`, `ssot`, `quelle`, `seit`, `stufe`, `pfade`, `ausnahmen`, `zeilen` und je Muster `name`, `regex`, `flags`, `positiv`, `negativ`.
4. Abschnitt `## KVnn <Größe>` in dieser Datei.
5. `karola.py selbsttest` grün, `karola.py register <klon>` gemessen; die Fundstellen stehen mit Datum im Abschnitt.
6. Stand-Zeile der `SKILL.md` heben. Aufnahme nur mit Karstens OK.
