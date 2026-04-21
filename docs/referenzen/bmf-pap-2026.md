# BMF-Programmablaufplan 2026 — Referenz

**Quelle:** Bundesfinanzministerium
**URL:** https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026-anlage-1.pdf
**Abgerufen:** 2026-04-21 (Prompt 118 Phase 1)
**BMF-Stand:** 12.11.2025 (endgültig, korrigierte Fassung)
**Dokument:** Anlage 1 — Programmablaufplan für die maschinelle Berechnung der vom Arbeitslohn einzubehaltenden Lohnsteuer, des Solidaritätszuschlags und der Maßstabsteuer für die Kirchenlohnsteuer für 2026
**Seiten:** 40
**Rechtsgrundlage:** § 39b Abs. 6 EStG
**Copyright:** Amtliche Werke gemäß § 5 UrhG — gemeinfrei. Keine Nutzungsbeschränkungen.

---

## Struktur

| Abschnitt | Seiten | Inhalt |
|---|---|---|
| 1. Gesetzliche Grundlagen | 1 | Geltungsbereich, ESt-Tarif-Anpassung 2026 |
| 2. Erläuterungen | 2 | Allgemeines, Feldlängen, Symbole, Zusatzbeitrag |
| 3.1 Eingangsparameter | 3-6 | Liste aller Input-Felder (STKL, RE4, KVZ, LZZ, R, VJAHR, VBEZ, PKPV, PVZ, ZKF, KRV, AF, AJAHR, …) |
| 3.2 Ausgangsparameter | 7 | LSTLZZ, SOLZLZZ, BK (Kirchenlohnsteuer-Bemessung) |
| 3.3 Ausgangsparameter DBA | 7-8 | Doppelbesteuerungsabkommen-Sonderausgabe |
| 4. Interne Felder | 8-14 | 100+ Zwischenvariablen (ANP, AVSATZAN, BMG, FVB, FVBZSO, HFVB, JW, RVSATZAN, SOLZFREI, ST2, TAB2, TAB4 etc.) mit Feldlänge/Typ/Initialisierung |
| 5. Programmablaufplan | 15-40 | **Flussdiagramm-Notation** (nicht strukturierter Pseudocode) |

## Format-Befund (wichtig für Porting)

Die Programmablaufplan-Sektion (Seiten 15-40, also ca. 60 % des Dokuments) ist in
**Flussdiagramm-Notation** dargestellt — Rauten für Entscheidungen, Rechtecke für
Zuweisungen, Pfeile für den Kontrollfluss, alles räumlich über die Seite verteilt.

Beispiel (aus Seite 15/16, MRE4/VBEZB-Zweig für Altersentlastungsbetrag):

```
J = 54     VJAHR       VJAHR
           < 2058      < 2006
                                 ZVBEZJ = 0
                                                       J = 1
              J = VJAHR - 2004
```

Text-Extraktion via `pdftotext -layout` liefert zwar lesbaren Text, aber die Spalten-Anordnung
macht die Kontrollfluss-Reihenfolge nicht maschinen-interpretierbar. Das räumliche Layout
im Original (Ja/Nein-Abzweige, Schleifen-Rückläufer) geht verloren.

**Konsequenz für Prompt 118 Phase 2:**
Ein 1:1-Port aus dem Extract ist nicht zuverlässig möglich. Der Port-Prozess erfordert entweder:
- manuelle Visuelle-Referenz zum PDF, Abschnitt für Abschnitt (menschliche Arbeit)
- eine strukturiert-portierbare Alternativquelle (siehe „Alternative Referenzquellen" unten)

## Alternative Referenzquellen

1. **BMF-Steuerrechner-Web-Service** (bmf-steuerrechner.de) — liefert offizielle Berechnung per
   HTTP GET. Könnte für Regressionstest-Stützpunkte als External Oracle verwendet werden,
   ersetzt aber nicht die Algorithmus-Portierung.
2. **ELSTER-XSD/XSLT-Referenz** (noch zu klären) — Finanzverwaltung veröffentlicht den PAP
   teils auch in XSLT. Maschinenlesbarer, aber eigener Parser-Aufwand.
3. **Bestehende OSS-Implementierungen** (z. B. [github.com/hufrea/BundesFinanzministerium-PAP](https://github.com/)) —
   Community-Ports des PAP als Java/Kotlin/TypeScript; können Referenz-Implementation sein, bringen aber Lizenz-/Attribution-Fragen mit.

## Raw-Extract

Die komplette Text-Extraktion des PDF liegt unter
[`bmf-pap-2026-anlage-1-raw.txt`](bmf-pap-2026-anlage-1-raw.txt) (UTF-8, 1811 Zeilen, 80 KB).

Die Abschnitte 3.1, 3.2, 3.3 und 4 (Parameter- und Feld-Definitionen) sind dort lesbar und
direkt nutzbar. Abschnitt 5 (Programmablauf) liefert Text, aber ohne verlässlichen Kontrollfluss.

## Zweitrangige Dokumente

Weitere Dokumente der Veröffentlichung (nicht im Repo gespiegelt):

- [BMF-Schreiben (Rundschreiben)](https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026-bmf-schreiben.pdf) — formaler Einführungstext
- [Anlage 2 (Lohnsteuertabellen-Berechnung)](https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026-anlage-2.pdf) — für manuelle Lohnsteuer-Tabellen
- [Anlage 3 (DBA-Begrenzung Versorgungsbezüge)](https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/programmablaufplan.html) — Sonderfall

Für Prompt 118 Phase 2-6 ist Anlage 1 die einschlägige Quelle.
