# Midijob AN-SV-Abweichung — Logik-Analyse

**Datum:** 22.04.2026
**Auslöser:** Post-Deploy-Review Prompt 125a, Testfall AE = 1.500 €, StKl I, 0 Kinder, keine KiSt
**Scope:** Nur Analyse, keine Code-Änderungen

---

## Befund in einem Satz

**Der im UI ausgewiesene AN-SV-Betrag 279,31 € ist korrekt** und spiegelt den aktuellen BMG-Stand 2026 (Zusatzbeitrag 2,9 %, Kinderlos-Zuschlag 0,6 %) präzise wider. Die User-Erwartung **276,74 € / 269,04 €** basiert auf einem **2025er-Zusatzbeitrags-Wert (2,5 %)** — das ist nicht mehr der gesetzlich gültige Durchschnittssatz für 2026.

Separat: Der **Gesamtbeitrag 620,76 €** ist um **8,56 € überhöht**, weil `gesamtSvSatz = anSvSatz × 2` den Kinderlos-Zuschlag (nur AN-Kostenträger) fälschlich verdoppelt. Konsequenz: der AG-Anteil wird um 8,56 € zu hoch ausgewiesen (341,45 € statt korrekt 332,89 €). Das ist **ein Bug — aber beim AG-Anteil, nicht beim AN-Anteil**, und war in der 125a-Commit-Nachricht bereits als „nicht priorisierte Näherung" vermerkt.

---

## Code-Pfad

`components/rechner/MidijobRechner.tsx:66-93`:

```ts
// Zeilen 72–73 — korrekte BE-Trennung (aus 125a)
const beGesamt = imBereich ? berechneBemessungsgrundlageGesamt(b) : b;
const beAn     = imBereich ? berechneBemessungsgrundlageAN(b)     : b;

// Zeile 80 — PV-Satz inkl. Kinderlos-Zuschlag (default alterUeber23=true)
const pvAnSatz = pvAnteilAn2026(anzahlKinder, true, false);

// Zeile 81 — AN-Gesamt-Satz (halbe Regelsätze + voller PV-AN inkl. Zuschlag)
const anSvSatz = SV_AN_OHNE_PV + pvAnSatz;

// Zeile 85 — Näherung: Gesamt-Satz = AN-Satz × 2 (Problemstelle!)
const gesamtSvSatz = anSvSatz * 2;

// Zeile 87 — Gesamtbeitrag (leicht überhöht)
const gesamtSv = beGesamt * gesamtSvSatz;

// Zeile 88 — AN-Anteil: BE_AN × AN-Satz ✓ korrekt
const anSv = beAn * anSvSatz;

// Zeile 91 — AG als Differenz (erbt Gesamt-Überhöhung)
const agSv = Math.max(0, gesamtSv - anSv);
```

**Wichtig: Hypothese B ist widerlegt.** Die AN-SV-Formel greift korrekt auf `beAn` zu (Zeile 88), nicht auf `beGesamt`. Die 125a-Refactoring-Trennung funktioniert beim AN-Anteil sauber.

---

## Beitragssatz-Zusammensetzung

| Komponente | Voller Satz 2026 | AN-Anteil (halber Satz) | Quelle im Code |
|---|---|---|---|
| KV-Basis | 14,6 % | 7,3 % = `0,073` | [`brutto-netto.ts:125`](../../lib/berechnungen/brutto-netto.ts) `KV_BASISSATZ_AN_2026` |
| KV-Zusatzbeitrag Ø 2026 | **2,9 %** | 1,45 % = `0,0145` | [`sv-parameter.ts:22`](../../lib/berechnungen/sv-parameter.ts) `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT = 2.9` |
| RV | 18,6 % | 9,3 % = `0,093` | [`brutto-netto.ts:126`](../../lib/berechnungen/brutto-netto.ts) `RV_SATZ_AN_2026` |
| ALV | 2,6 % | 1,3 % = `0,013` | [`brutto-netto.ts:127`](../../lib/berechnungen/brutto-netto.ts) `AV_SATZ_AN_2026` |
| PV-Basis | 3,6 % | 1,8 % = `0,018` | [`pflegeversicherung.ts:8`](../../lib/berechnungen/pflegeversicherung.ts) `BASIS_AN` |
| **PV-Kinderlos-Zuschlag** | 0,6 % (nur AN) | 0,6 % = `0,006` | [`pflegeversicherung.ts:9`](../../lib/berechnungen/pflegeversicherung.ts) `ZUSCHLAG_KINDERLOS`, greift bei `kinder===0 && alterUeber23===true` |
| **Summe AN bei 0 Kindern** | — | **21,75 %** | berechnet in `MidijobRechner.tsx:81` |

**Herleitung 21,75 %:** 7,3 + 1,45 + 9,3 + 1,3 + 1,8 + 0,6 = 21,75 ✓

Der Code verwendet also den **aktuellen BMG-Durchschnitts-Zusatzbeitrag 2,9 %** (halber Wert 1,45 %), nicht 2,5 %. Die Konstante `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT = 2.9` in `sv-parameter.ts` ist zeitgemäß. Der User hat in der Erwartung fälschlich 2,5 % angenommen — das war der Durchschnittswert für 2025, nicht 2026.

---

## Rückrechnung Testfall

### AN-SV (sauber, korrekt)

| Schritt | Wert |
|---|---|
| AE (Brutto) | 1.500,00 € |
| BE_AN (§ 20a Abs. 2a SGB IV) | 1.284,18 € |
| AN-Gesamt-Satz (0 Kinder, Kinderlos-Zuschlag) | 21,75 % |
| AN-SV | 1.284,18 × 0,2175 = **279,31 €** ✓ |

Das ist exakt der UI-Wert. Der Code rechnet richtig nach aktueller Rechtslage.

### Gesamtbeitrag (überhöht)

| Schritt | Ist (Code) | Soll |
|---|---|---|
| Gesamt-Satz | 21,75 × 2 = **43,5 %** | 14,6 + 2,9 + 18,6 + 2,6 + 3,6 + **0,6** = **42,9 %** |
| Gesamtbeitrag auf BE_gesamt = 1.427,03 € | 1.427,03 × 0,435 = **620,76 €** | 1.427,03 × 0,429 = **612,20 €** |
| Differenz | +8,56 € | — |

**Warum die Überhöhung:** Der Kinderlos-Zuschlag 0,6 % ist rechtlich ausschließlich vom AN zu tragen (§ 55 Abs. 3 Satz 1 SGB XI). Der AG zahlt ihn nicht. `gesamtSvSatz = anSvSatz × 2` verdoppelt den im `anSvSatz` enthaltenen 0,6 %-Zuschlag und rechnet ihn damit implizit auch dem AG zu.

### AG-Anteil (erbt Überhöhung)

| Schritt | Ist (Code) | Soll |
|---|---|---|
| AG-Anteil = Gesamt − AN | 620,76 − 279,31 = **341,45 €** | 612,20 − 279,31 = **332,89 €** |
| Überhöhung | +8,56 € (= der fälschlich verdoppelte Kinderlos-Zuschlag) | — |

---

## Hypothesen-Check

### A) Kinderlos-Zuschlag wird auch bei Personen unter 23 angewendet
**Teilweise bestätigt.** Der Rechner hat kein Alter-Input. Der Aufruf `pvAnteilAn2026(anzahlKinder, true, false)` ([MidijobRechner.tsx:80](../../components/rechner/MidijobRechner.tsx#L80)) setzt `alterUeber23 = true` hart, unabhängig vom tatsächlichen Alter.

Konsequenz: Für Midijobber **unter 23** wird der Zuschlag zu Unrecht berechnet (+0,6 %-Punkte AN-Satz). Dieses Detail betrifft aber nur die sehr kleine Teilmenge der Midijobber unter 23 und ist im Hilfetext des Rechners transparent („Annahme Alter > 23"). **Kein Bug im Sinne einer Berechnung, aber eine vertretbare Vereinfachung.**

Das erklärt jedoch **nicht** die im Prompt genannte Abweichung, weil der Testfall unter „Annahme Kinderlos-Zuschlag aktiv" geprüft wurde.

### B) Beitragssatz wird auf BE_gesamt statt BE_AN angewandt
**Widerlegt.** Zeile 88 nutzt explizit `beAn`:
```ts
const anSv = beAn * anSvSatz;    // 1284.18 × 0.2175 = 279.31 ✓
```
Die 125a-Refactoring-Trennung ist beim AN-Anteil sauber umgesetzt. Die klassische Verwechslungsgefahr existiert in diesem Code nicht mehr.

### C) Zusatzbeitrag durchschnittlich zu hoch
**Widerlegt.** Die Konstante `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT = 2.9` entspricht dem **BMF-bekanntgemachten Durchschnittssatz für 2026**. Der User hat in der Prompt-Erwartung 2,5 % angesetzt — das war der Wert **für 2025**. Der Zusatzbeitrag wurde zum 01.01.2026 um 0,4 %-Punkte angehoben (durch steigende GKV-Beitragssätze).

Konsequenz: Die User-Erwartung (21,55 % oder 20,95 %) basiert auf einem veralteten Zusatzbeitrag. Der Code (21,75 %) ist aktuell.

### D) Kombination A + C
**Widerlegt.** Weder A (betrifft nur unter-23-Fall, im Testfall nicht relevant) noch C (Konstante ist korrekt) treffen die primäre AN-SV-Abweichung.

### E) Zusätzlich: Gesamtbeitrag falsch durch verdoppelten Kinderlos-Zuschlag
**Bestätigt** — aber beim Gesamtbeitrag/AG-Anteil, nicht beim AN-Anteil:
```ts
const gesamtSvSatz = anSvSatz * 2;  // 0.2175 × 2 = 0.435 statt 0.429
```
Der rechtliche korrekte Gesamtbeitragssatz bei 0 Kindern ist 42,9 % (KV 14,6 + Zusatz 2,9 + RV 18,6 + ALV 2,6 + PV 3,6 + **nur AN-Seite** 0,6 Kinderlos-Zuschlag). Der Code nutzt 43,5 % → Gesamtbeitrag um 8,56 € überhöht, damit AG-Anteil um denselben Betrag zu hoch.

Das ist **ein klarer Bug**, aber ich hatte ihn in der 125a-Commit-Nachricht bereits als **„nicht priorisierte Näherung"** dokumentiert (Zitat: „Aktuelle Näherung `gesamtSvSatz = anSvSatz × 2` überschätzt den AG-Anteil minimal, weil der Kinderlos-Zuschlag nur vom AN getragen wird. Präzisionsverlust im 0,3 €-Bereich bei Max-Midijob — nicht priorisiert.").

Die Behauptung „0,3 €-Bereich" im Commit war zu optimistisch — bei AE = 1.500 € sind es 8,56 €, bei Max-Midijob (AE = 2.000 €, BE_gesamt = OG = 2.000 €) sogar 12,00 €.

---

## Einschätzung

1. **Kein Bug beim AN-Anteil.** Die 279,31 € sind **korrekt nach BMG-Stand 2026**. Die User-Erwartung war auf einem 2025er-Zusatzbeitrag basiert — das ist ein **Rechenfehler im Prompt**, nicht im Code.

2. **Ein echter Bug beim Gesamtbeitrag und AG-Anteil** (Überhöhung um 8,56 € bei AE = 1.500 €, bis 12,00 € bei Max-Midijob). Ursache: `gesamtSvSatz = anSvSatz × 2` verdoppelt den Kinderlos-Zuschlag fälschlich. Der AG-Wert 341,45 € sollte korrekt 332,89 € sein.

3. **Eine vertretbare Vereinfachung:** Kinderlos-Zuschlag greift ohne Alter-Input. Nur relevant für Midijobber unter 23 — kleine Nische.

Die User-Kontrolle hat zwar die Fehlerquelle **falsch lokalisiert** (AN statt AG), aber die Beobachtung selbst war nützlich: Sie hat den verdoppelten Kinderlos-Zuschlag im Gesamtsatz freigelegt. Ohne die User-Prüfung wäre der AG-Wert weiterhin ungenau geblieben, weil er an keiner anderen Stelle prominent auftaucht.

---

## Empfehlung für Folge-Prompt

### Primäre Empfehlung: **Ein-Zeilen-Fix für den Gesamtbeitragssatz**

Ersetze in `components/rechner/MidijobRechner.tsx:85`:
```ts
// FALSCH (aktuell):
const gesamtSvSatz = anSvSatz * 2;

// KORREKT:
// AG-Seite trägt KV+Zusatz+RV+ALV+PV-Basis hälftig, NICHT den Kinderlos-Zuschlag.
// Der Kinderlos-Zuschlag ist nur AN-Last (§ 55 Abs. 3 Satz 1 SGB XI).
const agSvSatz = SV_AN_OHNE_PV + 0.018;  // PV-Basis 1,8 % auch AG, kein Kinderlos
const gesamtSvSatz = anSvSatz + agSvSatz;
```

Oder eleganter als zwei separate Ableitungen, damit der AG-Satz explizit sichtbar ist und Kinderabschläge/Kinderlos-Zuschlag nur im AN-Anteil wirken.

**Impact:** AG-Anteil bei AE = 1.500 € sinkt von 341,45 € auf 332,89 € (realistischer), bei Max-Midijob entsprechend.

### Sekundäre Empfehlung: **Verify-Script erweitern**

`scripts/verify-midijob-p1.ts` um einen Testfall ergänzen:
```
MJ-AG-RECHT: AE = 1.500 €, 0 Kinder → AG-SV ≈ 332,89 € (= 1427,03 × 0,429 − 279,31)
```
— dann fängt das Script künftige Regressionen dieses Bugs strukturell ab.

### Sekundär, aber niedrige Priorität: **Alters-Input**

Ein explizites „Alter < 23?"-Toggle im UI für den Kinderlos-Zuschlag. Klein, aber beeinflusst nur die Unter-23-Nische. Kann warten, bis User-Feedback das fordert.

### Doku-Nachtrag

Nach einem Fix-Prompt:
- `docs/audit-arbeitspapiere/welle1-stufe4a-bericht.md` Nachtrag Prompt 125a um eine kurze Ergänzung „Gesamtbeitragssatz präzisiert — Kinderlos-Zuschlag nicht mehr doppelt angerechnet"
- Die 125a-Commit-Message-Behauptung „Präzisionsverlust im 0,3 €-Bereich" sollte als zu optimistisch korrigiert werden (tatsächlich bis 12 € bei Max-Midijob).

---

## Offene Frage für Karsten

Wenn die User-Rechnung das AN-Ziel 276,74 €/269,04 € ergab: Die zugrunde liegende Annahme „Zusatzbeitrag 2,5 %" stammt aus welcher Quelle? Falls aus einem aktuellen BMG-Dokument, müssen wir den `KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT = 2.9` in `sv-parameter.ts` erneut prüfen. Der Prompt nennt den Wert ohne Quelle; BMF/BMG geben meines Wissens 2,9 % an. Kurzer Cross-Check gegen [bundesgesundheitsministerium.de](https://www.bundesgesundheitsministerium.de/) lohnt vor dem nächsten Fix.
