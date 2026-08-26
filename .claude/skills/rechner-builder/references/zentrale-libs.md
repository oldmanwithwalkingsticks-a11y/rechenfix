# Zentrale Libs (SSOT) — nicht duplizieren

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

**Wann lesen:** immer, bevor ein gesetzlich bestimmter Wert in einen Rechner geschrieben wird.

Tarif-, SV-, Unterhalts-, Mindestlohn-, Renten- und Pfändungs-Rechner dürfen Parameter nicht hartkodieren. Ein Duplikat eines zentralen Werts ist der häufigste Wiederholungsfehler im Repo (G10) und fällt meist erst beim Januar-Audit auf, wenn eine der Kopien nicht mitgezogen wurde.

Die vollständige Tabelle mit allen Exports steht in `CLAUDE.md` unter „Zentrale Libs (SSOT)". Unten die Kurzliste der wichtigsten.

---

## Zentrale Libs (nicht duplizieren)

Tarif-, SV-, Unterhalts-, Mindestlohn-, Renten- und Pfändungs-Rechner dürfen Parameter nicht hartkodieren, sondern nutzen die zentralen Libs. Die vollständige Tabelle mit Exports steht in `CLAUDE.md` unter „Zentrale Libs (SSOT)". Kurzliste der wichtigsten:

- `lib/berechnungen/einkommensteuer.ts` — § 32a EStG Tarifzonen 2024/2025/2026, Grundfreibeträge, Soli-Freigrenzen
- `lib/berechnungen/lohnsteuer.ts` — Vorsorgepauschale § 39b Abs. 4 EStG PAP-konform
- `lib/berechnungen/brutto-netto.ts` — BBG (`BBG_KV_MONAT`, `BBG_RV_MONAT`), orchestriert LSt + SV + PV zum Netto
- `lib/berechnungen/sv-parameter.ts` — KV-Zusatzbeitrag, JAEG (`JAEG_2026_JAHR`/`_MONAT`)
- `lib/berechnungen/pflegeversicherung.ts` — PV-AN-Satz, Kinderlos-Zuschlag, Kinderabschlag § 55 Abs. 3 SGB XI (PUEG 2023)
- `lib/berechnungen/kindergeld.ts` — Kindergeld + Günstigerprüfung (`KINDERGELD_2026 = 259`)
- `lib/berechnungen/duesseldorfer-tabelle.ts` — DT 2026, Mindestbedarf, Selbstbehalte
- `lib/berechnungen/mindestlohn.ts` **(neu, 04/2026)** — `MINDESTLOHN`, `getAktuellerMindestlohn(stichtag)`, Switch auf 14,60 € zum 01.01.2027
- `lib/berechnungen/rente.ts` **(erweitert, 04/2026)** — `RENTENWERT`, `getAktuellerRentenwert(stichtag)`, Switch 40,79 → 42,52 € zum 01.07.2026
- `lib/berechnungen/pfaendung.ts` **(erweitert, 04/2026)** — `getAktuellePfaendungsParameter(stichtag)`, Switch 1.555,00 → 1.587,40 € zum 01.07.2026 (BGBl. 2026 I Nr. 80)
- `lib/berechnungen/bafoeg-parameter.ts` **(neu, Prompt 121, 22.04.2026)** — `getAktuelleBafoegParameter(stichtag)`, `getAnrechnungsquote(geschwister)` (0,50 − 0,05 × Kinder, min/max-Clamp), single-bucket `BAFOEG_AB_2024_08_01` mit Skeleton für WS 2026/27. Antragsteller zählt NICHT mit.
- `lib/berechnungen/buergergeld-parameter.ts` **(neu, Prompt 121, 22.04.2026)** — `getAktuelleBuergergeldParameter(stichtag)`, Zwei Buckets `BUERGERGELD_2026_H1` + `BUERGERGELD_2026_H2` (Switch 01.07.2026 auf „Neue Grundsicherung"; H2 derzeit identisch zu H1 als Skeleton bis Gesetzestext verabschiedet). Enthält Regelsätze RSS1–6, Vermögensfreibeträge, Mehrbedarfs-Sätze § 21 Abs. 2–7 SGB II.
- `lib/berechnungen/kfz-steuer-parameter.ts` **(neu, Prompt 131, 23.04.2026)** — SSOT KraftStG: § 9 Abs. 1 Nr. 2c CO₂-Staffel + § 3d Elektro-Befreiung. Exports: `CO2_STAFFEL_KRAFTSTG_9_NR2C` (7-stufig progressiv 2,00/2,20/2,50/2,90/3,40/4,00 €/g), `ELEKTRO_BEFREIUNG`, `berechneCO2Komponente(gProKm)`, `berechneElektroBefreiungsende(erstzulassung)` (8. KraftStÄndG v. 04.12.2025 — bis 31.12.2035, Erstzulassung bis 31.12.2030), `SOCKEL_PRO_100CCM`.
- `lib/berechnungen/strompreis.ts` **(neu, Prompt 147, 25.04.2026)** — BDEW-Mittel + Festpreis-Neukundentarif + Worst-Case Grundversorgung + Wärmepumpen-Spezialtarif. Exports: `STROMPREIS_2026` (4 Profile: durchschnitt_bdew=37, neukunden_festpreis=33, grundversorgung=40, waermepumpen_tarif=28 ct/kWh), `getStrompreis(profil?)`. Konsumiert von stromkosten-, stromvergleich-, balkon-solar-, energiekosten-, photovoltaik-, poolkosten-, waermepumpen-, heizkosten-Rechner.
- `lib/berechnungen/eeg-einspeiseverguetung.ts` **(neu, Prompt 147)** — § 49 EEG 2023 Halbjahres-Schalter. Exports: `getEegSatz(stichtag?)` (gibt 6 Sätze für bis-10/40/100 kWp jeweils Teil-/Volleinspeisung zurück + Prognose-Flag), `getMischVerguetung(kwp, modus, stichtag?)`, `EEG_DEGRESSION_HINWEIS`. BNetzA 04/2026: 7,78 ct/kWh bis 10 kWp Teil, 12,34 ct Voll; 6,73 ct 10–40 kWp Teil, 10,35 ct Voll; 5,50 ct 40–100 kWp Teil, 10,35 ct Voll. Prognose-Bucket für 01.08.2026 (−1 % Degression).
- `lib/berechnungen/beg-foerderung.ts` **(neu, Prompt 147)** — KfW 458 Förderquoten Heizungstausch. Exports: `BEG_FOERDERUNG_2026` (Konstanten: Grundförderung 30 %, Klimageschwindigkeit 20 %, Einkommen 30 %, Effizienz 5 %, Cap 70 %, Einkommensgrenze 40.000 €, max. förderfähige Kosten 30.000 €/1. WE), `berechneBegFoerderquote(boni)`, `berechneBegZuschuss(invest, boni, wohneinheiten)`, `BEG_LAUTSTAERKE_HINWEIS_2026` (10 dB unter Grenzwerten ab 01.01.2026 für Bestandsgebäude).
- `lib/berechnungen/vpi.ts` **(neu Prompt 147, erweitert Prompt 149b)** — Verbraucherpreisindex Destatis Lange Reihe (Tabelle 61111-0001, Basisjahr 2020 = 100). Exports: `VPI_AKTUELL` (letzter Monatswert + Veränderung), `VPI_JAHRESDURCHSCHNITTE` (Jahre 1995–2025), **`getVpi(jahr)` mit Fallback auf VPI_AKTUELL für laufendes Jahr** und Throw bei Out-of-Range, **`indexiereVermoegen(betrag, jahrAnfang, jahrEnde)` als § 1376 BGB-konformer Helper** (Verwendung im Zugewinnausgleich-Rechner zur Anfangsvermögen-Indexierung; Identitäts-Test bei gleichem Stichtag).
- `lib/berechnungen/pv-ertragsmodell.ts` **(neu, Prompt 147c, 25.04.2026)** — Mertens-Faktoren für PV-Ertragsschätzung (PR=0,85 nach VDI 6002 / IEC 61724 implizit im Basiswert 850 kWh/kWp/Jahr eingebacken). Exports: `PV_BASIS_ERTRAG_KWH_KWP = 850`, `AUSRICHTUNGS_FAKTOR` (8 Stufen: Süd 1,00 / SO/SW 0,95 / Ost/West 0,85 / NO/NW 0,72 / Nord 0,65), `NEIGUNGS_FAKTOR` (5 Stufen: 0–15° 0,87 / 15–25° 0,94 / 25–35° 1,00 / 35–45° 0,97 / 45°+ 0,91), Label-Maps für Dropdowns, `berechnePvErtrag({kwp, ausrichtung, neigung})`, `berechneSpezifischenErtrag(ausrichtung, neigung)`. Konsumiert von photovoltaik- und dachflaechen-Rechner. Hinweis: `lib/berechnungen/balkon-solar.ts` nutzt bewusst eigenes BKW-Modell (950 kWh/kWp Brutto vor PR + BKW-spezifische Aufstellungs-Faktoren), siehe Header-Doku in der Lib.
- `lib/berechnungen/bmi.ts` **(erweitert, Prompts 141 + 143, 25.04.2026)** — WHO-BMI-Kategorien + alters-adjustierter Optimal-Bereich (NRC 1989). Exports: `bmiKategorien` (SSOT seit 143, auch von SchwangerschaftGewichtRechner konsumiert), `getOptimalerBereich(alter)` (SSOT seit 143, auch von idealgewicht.ts konsumiert), **`BMI_ADULT_MIN_AGE = 18`** (Erwachsenen-Gating, Component unterdrückt Kategorie/Skala/Optimal-Bereich bei `alter < 18` und zeigt Verweis auf BMI-Perzentilen Kromeyer-Hauschild).
- `lib/berechnungen/kalorien.ts` **(erweitert, Prompt 141, 25.04.2026)** — Mifflin-St Jeor mit Eating-Disorder-Floor. `berechneKalorien(...)` setzt `zielKalorien = Math.max(zielKalorienRoh, grundumsatz)` und neues Flag `zielGeklammertAufGrundumsatz: boolean`; UI zeigt Hinweis bei Klammer.
- `lib/berechnungen/schwangerschaft.ts` **(neu, Prompt 143, 25.04.2026 — Voll-Fusion)** — Konsolidiert die früheren `geburtstermin.ts` + `ssw.ts` (beide gelöscht). Enthält Naegele + erweiterte Naegele für Zykluslänge ≠ 28; SSW-Berechnung; Trimester; Meilensteine. Exports: `parseDatum(s)` (zeitzonen-sicher mit `+'T00:00:00'`), `berechneGeburtstermin(eingabe)` (SSW ab LMP+Zyklus-Korrektur), `berechneSsw(eingabe)` (SSW ab reinem LMP — gynäkologischer Standard), `defaultPeriodeDatum`, `defaultTerminDatum`, `Methode`, `SswMethode`, `Meilenstein`. **Beide SSW-Konventionen klinisch korrekt** — JSDoc dokumentiert die Divergenz, nicht versehentlich vereinheitlichen.

Die drei Tarif-Rechner (Brutto-Netto, Lohnsteuer, Einkommensteuer) sind eine **Rechner-Gruppe** mit geteilter Logik. Änderungen an zentralen Parametern wirken auf alle drei. Siehe auch G10 (keine Dubletten zentraler Werte).
