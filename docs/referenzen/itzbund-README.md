# ITZBund-Referenzimplementation Lohnsteuer 2026

**Verwendungszweck:** Maßgebliche Algorithmus-Spezifikation für `lib/berechnungen/_lohnsteuer-pap-2026.ts` (Prompt 118).

## Primäre Quelle

**Datei:** `itzbund-Lohnsteuer2026.xml`
**URL:** https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2026.xml.xhtml
**Abgerufen:** 2026-04-21 via `curl -sL`
**SHA256:** `63d8981646d139eba2f4dd990c13b43c4fb3883b402a5a40cddf253aa7aa96b4`
**Größe:** 65.585 Bytes, 1396 Zeilen
**Interner Stand:** 2025-10-23 12:40 (ITZBund Berlin)
**Version:** 1.0

## Lizenz

Amtliches Werk nach § 5 UrhG — gemeinfrei. Keine Nutzungsbeschränkungen, keine Attribution zwingend, kommerzielle Nutzung zulässig. Herausgeber: IT-Zentrum Bund (ITZBund), technischer Träger des BMF-Steuerrechners.

Der XML-Pseudocode wird auf https://www.bmf-steuerrechner.de/interface/pseudocodes.xhtml öffentlich zum Download angeboten, explizit als strukturierte Form des Programmablaufplans für Entwickler.

## Format

Strukturierte Pseudocode-Spezifikation mit Java-Syntax in den `exec`-Attributen. Elemente:

- `<INPUT name="..." type="int|BigDecimal|double" default="..."/>` — 36 Eingabefelder
- `<OUTPUT name="..." type="..." default="..."/>` — 14 Ausgabefelder
- `<INTERNAL name="..." type="..." default="..."/>` — 70 Zwischenvariablen
- `<CONSTANT name="..." type="..." value="..."/>` — 17 Konstanten (Steuer-Parameter 2026, Altersentlastungs-Staffeln TAB1..TAB5)
- `<METHOD name="...">` — 24 Unterprozeduren, darunter `MPARA`, `MRE4JL`, `MRE4`, `MRE4ALTE`, `MRE4ABZ`, `MBERECH`, `MZTABFB`, `MLSTJAHR`, `UPLSTLZZ`, `UPMLST`, `UPEVP`, `MVSPKVPV`, `MVSPHB`, `MST5_6`, `UP5_6`, `MSOLZ`, `UPANTEIL`, `MSONST`, `STSMIN`, `MSOLZSTS`, `MOSONST`, `MRE4SONST`, `UPTAB26`, `MAIN`
- Innerhalb der Methoden: `<EVAL exec="..."/>` für Zuweisungen, `<IF expr="..."><THEN>...</THEN><ELSE>...</ELSE></IF>` für Kontrollfluss

Da alle arithmetischen Operationen in `BigDecimal` formuliert sind (`.add()`, `.subtract()`, `.multiply()`, `.divide(s, ROUND_DOWN)` usw.), ist ein mechanischer Port nach TypeScript mit `decimal.js` 1:1-Abbildung möglich.

## Port-Ziel

`lib/berechnungen/_lohnsteuer-pap-2026.ts` — Underscore-Präfix = private Implementations-Datei, wird nur von `lohnsteuer.ts` konsumiert.

## Verifikation

Keine offizielle XML-Prüfdatensatz-Datei öffentlich auffindbar (Stand April 2026). Verifikation stattdessen gegen:

1. Die 20 BMF-Stützpunkte aus `scripts/verify-lohnsteuer-vvi.ts` (aus Prompt 115b2, gegen bmf-steuerrechner.de manuell verifiziert)
2. Zusätzliche Stützpunkte für Kl. I/II/III/IV je 6 Werte (ebenfalls gegen bmf-steuerrechner.de manuell gegengerechnet in Prompt 118 Phase 3)

Das **BMF-Steuerrechner-Web-Interface** (`https://www.bmf-steuerrechner.de/interface/einganginterface.xhtml`) ist eine JSF/Mojarra-Anwendung, die Session-Tokens und POST-Requests erfordert — kein direkter URL-API-Oracle nutzbar. Abgleiche erfolgen manuell/interaktiv.

Akzeptanzkriterium der Portierung:
- Δ = 0 Cent an allen 20+ Stützpunkten
- Breite Regressions-Tests über alle Rechner, die `berechneLohnsteuerJahr` konsumieren (siehe Prompt 118 Phase 5)

## Jährlicher Update-Prozess

Der ITZBund veröffentlicht typischerweise im Oktober/November den PAP für das Folgejahr. Ablauf für den 01.01.-Wechsel:

1. Neue XML-Datei herunterladen: `https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer{JAHR}.xml.xhtml`
2. SHA256 + Abruf-Datum in diese README eintragen (als neuer Abschnitt für Jahr)
3. Diffs zum Vorjahr analysieren: in der Regel nur Konstanten in `MPARA` (Grundfreibetrag, Zonengrenzen, BBG) + ggf. Konstanten in `UPTAB` (Soli-Freigrenze, Zahlenwerte)
4. Neue Datei `_lohnsteuer-pap-{JAHR}.ts` durch Duplizieren + Konstanten-Austausch erzeugen
5. `berechneLohnsteuerJahr` in `lohnsteuer.ts` auf Jahres-Switch umstellen (analog Mindestlohn/Rentenwert-Pattern)
6. Alte Tests in `verify-lohnsteuer-pap.ts` um Jahres-Assertions erweitern

Siehe [docs/jahreswerte-kalender.md](../jahreswerte-kalender.md) Punkt 9.
