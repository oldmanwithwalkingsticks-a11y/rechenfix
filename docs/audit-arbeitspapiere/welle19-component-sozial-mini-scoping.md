# Welle 19 · Mini-Scoping — Component-only Sozial (krankengeld, kurzarbeitergeld, witwenrente)

## Zweck
Fünfte Domäne der Sozial-Schiene: drei Sozialleistungs-Rechner OHNE eigene Berechnungs-Lib — die **Component ist SSOT**
(wie k1 kapitalertragsteuer). Berechnungslogik + Konstanten stehen in `components/rechner/<Name>Rechner.tsx`. Werte NUR
aus dem Component übernehmen, nicht aus Memory/Web herleiten. YMYL (SGB V / SGB III / SGB VI). Repo-Ablage:
`docs/audit-arbeitspapiere/welle19-component-sozial-mini-scoping.md`.

## GEMEINSAME YMYL-DATENAUFLAGE
1. **Component gewinnt über Memory/Web.** Bei Konflikt: Component ist SSOT, melden — nicht stillschweigend Component ändern.
2. 2026-Werte (web-bestätigt 06/2026 gegen SGB / Bundesregierung / DRV).
3. Primärquelle § + gesetze-im-internet.de → Heading „Quellen & Rechtsgrundlagen".
4. Stichtag „(Stand 2026)". Keine Sozial-/Steuer-/Rechtsberatung, Disclaimer.
5. Content darf KEINE eigenen SV-Quoten/Prozentsätze herleiten, die der Component-Logik widersprechen. Erklärtext nennt
   gesetzliche Sätze; Rechenwege spiegeln die Component (z. B. KuG = % der Netto-Entgeltdifferenz, NICHT % vom Brutto).

## VERIFIZIERTE WERTE 2026 (web 06/2026 — Components spiegeln diese)

### c1 krankengeld — `KrankengeldRechner.tsx` (SSOT)
- Krankengeld brutto = **70 % des Bruttoentgelts, gedeckelt auf 90 % des Nettoentgelts** (§ 47 SGB V), kalendertäglich (÷30).
- Vom Krankengeld gehen AN-Anteile zu RV/ALV/PV ab (Component: RV 4,65 + ALV 0,65 + PV 0,85 = **6,15 %**; kinderlos +0,3 → **6,45 %**).
- **BBG KV 2026 = 5.812,50 €/Monat** (69.750 €/Jahr) — aus `brutto-netto.ts` (BBG_KV_MONAT), web-bestätigt. Deckel für Brutto.
- Lohnfortzahlung AG **Tag 1–42 (6 Wochen)**, ab Tag 43 Krankengeld. Max. **78 Wochen / 546 Tage** in 3 Jahren je Krankheit.
- **Progressionsvorbehalt** (§ 32b EStG): steuerfrei, erhöht aber den Steuersatz. **PKV → kein Krankengeld, sondern Krankentagegeld** je Tarif.

### c2 kurzarbeitergeld — `KurzarbeitergeldRechner.tsx` (SSOT)
- KuG = **60 % (ohne Kind) / 67 % (mit Kind)** der **Netto-Entgeltdifferenz** (Soll-Netto − Ist-Netto), § 105 SGB III.
- Soll-/Ist-Netto via zentrale Lohnsteuer-Lib (§ 39b EStG, PAP 2026) + pauschaler SV-Abzug **21 %**. KiSt **Bayern/BW 8 %, sonst 9 %**.
- Hinweis: KuG selbst ist sozialabgabenfrei (AG führt SV auf fiktives Entgelt ab); steuerfrei mit **Progressionsvorbehalt** (§ 32b EStG).
- KEINE Corona-Sondersätze (70/77/80/87 % waren befristet, ausgelaufen). Bezugsdauer regulär bis 12 Monate (§ 104 SGB III), verlängerbar per Verordnung.

### c3 witwenrente — `WitwenrenteRechner.tsx` (SSOT) — ZEITKRITISCH
- Große Witwenrente: **55 % (neues Recht, Heirat ab 2002) / 60 % (altes Recht)** der Rente des Verstorbenen; kleine: **25 %**, neues Recht auf **24 Monate befristet** (§ 46 SGB VI).
- **Einkommensanrechnung § 97 SGB VI:** Freibetrag = **26,4 × aktueller Rentenwert** + **5,6 × Rentenwert je Kind <18**; **40 %** des den Freibetrag übersteigenden **Nettoeinkommens** werden abgezogen.
- **Sterbevierteljahr:** die ersten 3 Monate volle Rente des Verstorbenen, anrechnungsfrei (§ 67 SGB VI).
- **ZEITKRITISCH — aktueller Rentenwert wechselt 01.07.2026** (`getAktuellerRentenwert()`-Switch, `RENTENWERT_AB_01_07_2026`):
  - bis 30.06.2026: **40,79 €** → Freibetrag-Basis 26,4 × 40,79 = **1.076,86 €**.
  - ab 01.07.2026: **42,52 €** (+4,24 %, Rentenwertbestimmungsverordnung 2026, Bundesrat 12.06.2026, § 68 SGB VI) → Freibetrag-Basis **1.122,53 €**.
  - **Heute = 23.06.2026** — Wechsel in 8 Tagen. Content MUSS beide Stände nennen + ab-wann; beispiel-Feld FUTURE-PROOF (ab-01.07.-Wert als Hauptbeispiel, bis-30.06. mitgenannt). Wie pfaendung (s3).
- Probe (verifiziert, rv 1.500 / en 1.800 / k0, große neu): bis 30.06. → Auszahlung 535,74 €; ab 01.07. → 554,01 € (höherer Freibetrag senkt Anrechnung). Klein (25 %) ab 01.07. → 104,01 €. Mit 2 Kindern ab 01.07. → 744,50 €.

## ABGRENZUNG
- `krankengeld`: Lohnersatz bei längerer Arbeitsunfähigkeit (ab Tag 43). Abgrenzen von Lohnfortzahlung (AG, erste 6 Wochen) und von brutto-netto.
- `kurzarbeitergeld`: Lohnersatz bei vorübergehendem Arbeitsausfall im bestehenden Job. Abgrenzen von Arbeitslosengeld (Jobverlust).
- `witwenrente`: Hinterbliebenenrente der GRV. Andere Domäne (SGB VI), nur thematisch „Sozialleistung". Schärfste Abgrenzung: NICHT eigene Rente, sondern abgeleiteter Anspruch + Einkommensanrechnung.
- Alle drei: keine eigene Lib — Component lesen, nicht raten.

## REIHENFOLGE (jeweils eigenes Leitformat — Schablonen-Falle vermeiden)
- c1 `krankengeld-rechner` (Leitformat: **tabelle** — Netto-Gehalt vs. Krankengeld + Timeline-Phasen).
- c2 `kurzarbeitergeld-rechner` (Leitformat: **beispielrechnung** — Soll/Ist-Netto-Differenz an mehreren Kurzarbeits-Quoten). Anders als c1.
- c3 `witwenrente-rechner` (Leitformat: **vergleich** — groß/klein, neues/altes Recht, bis-30.06./ab-01.07.). PFLICHT beide Rentenwert-Stände. Anders als c1/c2.

## PRO-PROMPT-DISZIPLIN
Header SKILL.md + CLAUDE.md, linear, keine Rückfragen, Build-Gate Vercel-grün, atomar je Rechner, NIE `git add .`. Goldstandard-Spec: ≥11 Blöcke, ~1.560 W (nie <1.500), kein text-Block >170 W, Leitformat ≥2–3×, config.quellen Pflicht, strukturell einzigartig.
