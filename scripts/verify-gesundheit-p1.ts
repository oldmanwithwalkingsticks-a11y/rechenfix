/**
 * Smoke-Tests für Prompt 141 (P1.1 Kalorien-Floor + P1.2 BMI Alters-Gate).
 * Prüft die Lib-Ebene; UI-Rendering (Hinweisbox) wird nicht hier getestet.
 */
import { berechneKalorien } from '../lib/berechnungen/kalorien';
import { berechneBmi, BMI_ADULT_MIN_AGE } from '../lib/berechnungen/bmi';

interface Assertion {
  label: string;
  ok: boolean;
  detail?: string;
}

const results: Assertion[] = [];

// S2 — Kalorien Regressions-Beispiel aus Audit
// Frau, 55 kg, 160 cm, 40 Jahre, PAL 1.2 (sedentär), abnehmen
{
  const e = berechneKalorien({ geschlecht: 'frau', alter: 40, groesse: 160, gewicht: 55, aktivitaet: 1.2, ziel: 'abnehmen' });
  if (!e) {
    results.push({ label: 'S2 Kalorien Audit-Fall', ok: false, detail: 'null' });
  } else {
    const grundumsatz = 10 * 55 + 6.25 * 160 - 5 * 40 - 161; // 1189
    const gesamtumsatz = grundumsatz * 1.2; // 1426.8
    // Vor Fix: 1427 - 500 = 927. Nach Fix: geklammert auf Grundumsatz (1189).
    const ok = e.zielKalorien === Math.round(grundumsatz)
      && e.zielGeklammertAufGrundumsatz === true
      && Math.abs(e.grundumsatz - Math.round(grundumsatz)) <= 1
      && Math.abs(e.gesamtumsatz - Math.round(gesamtumsatz)) <= 1;
    results.push({
      label: 'S2 Kalorien Audit-Fall (Frau 55/160/40/PAL1.2/abnehmen)',
      ok,
      detail: `grund=${e.grundumsatz} gesamt=${e.gesamtumsatz} ziel=${e.zielKalorien} geklammert=${e.zielGeklammertAufGrundumsatz}`,
    });
  }
}

// S3 — Kalorien Normalfall (nicht geklammert)
// Mann, 85 kg, 180 cm, 35 Jahre, PAL 1.55 (moderat), abnehmen
{
  const e = berechneKalorien({ geschlecht: 'mann', alter: 35, groesse: 180, gewicht: 85, aktivitaet: 1.55, ziel: 'abnehmen' });
  if (!e) {
    results.push({ label: 'S3 Kalorien Normalfall', ok: false, detail: 'null' });
  } else {
    // BMR = 10·85 + 6.25·180 - 5·35 + 5 = 850+1125-175+5 = 1805
    // TDEE = 1805 × 1.55 = 2797.75 → 2798
    // Ziel = 2798 - 500 = 2298 → klar > Grundumsatz
    const ok = e.zielKalorien > e.grundumsatz && e.zielGeklammertAufGrundumsatz === false;
    results.push({
      label: 'S3 Kalorien Normalfall (Mann 85/180/35/PAL1.55/abnehmen)',
      ok,
      detail: `grund=${e.grundumsatz} gesamt=${e.gesamtumsatz} ziel=${e.zielKalorien} geklammert=${e.zielGeklammertAufGrundumsatz}`,
    });
  }
}

// S3b — Kalorien "halten" niemals geklammert (Differenz 0)
{
  const e = berechneKalorien({ geschlecht: 'frau', alter: 40, groesse: 160, gewicht: 55, aktivitaet: 1.2, ziel: 'halten' });
  if (!e) {
    results.push({ label: 'S3b Halten-Fall', ok: false });
  } else {
    results.push({
      label: 'S3b Kalorien "halten" nie geklammert',
      ok: e.zielGeklammertAufGrundumsatz === false && e.zielKalorien === e.gesamtumsatz,
      detail: `ziel=${e.zielKalorien} gesamt=${e.gesamtumsatz}`,
    });
  }
}

// S4 — BMI 12-jährige Eingabe → BMI korrekt, Kategorie nicht zu beurteilen
// (Component-Logik: istKind steuert Anzeige; Lib liefert weiter Kategorie,
//  das ist by design, siehe R1.2.4 "Kein Breaking Change in bmi.ts")
{
  const e = berechneBmi({ gewicht: 55, groesse: 145, geschlecht: 'maennlich', alter: 12 });
  if (!e) {
    results.push({ label: 'S4 BMI 12-Jähriger', ok: false });
  } else {
    // 55 / 1.45² = 55 / 2.1025 = 26.16 → 26.16 (auf 2 Stellen)
    const ok = Math.abs(e.bmi - 26.16) < 0.05 && 12 < BMI_ADULT_MIN_AGE;
    results.push({
      label: 'S4 BMI 12-Jähriger: Wert korrekt + BMI_ADULT_MIN_AGE greift',
      ok,
      detail: `bmi=${e.bmi}, BMI_ADULT_MIN_AGE=${BMI_ADULT_MIN_AGE}, 12<${BMI_ADULT_MIN_AGE}=${12 < BMI_ADULT_MIN_AGE}`,
    });
  }
}

// S5 — BMI Erwachsene Regression
{
  const e = berechneBmi({ gewicht: 95, groesse: 175, geschlecht: 'maennlich', alter: 40 });
  if (!e) {
    results.push({ label: 'S5 BMI Erwachsener', ok: false });
  } else {
    // 95 / 1.75² = 95 / 3.0625 = 31.02
    const ok = Math.abs(e.bmi - 31.02) < 0.05
      && e.kategorie.label === 'Adipositas Grad I'
      && 40 >= BMI_ADULT_MIN_AGE;
    results.push({
      label: 'S5 BMI Erwachsener 40J: Kategorie "Adipositas Grad I"',
      ok,
      detail: `bmi=${e.bmi}, kategorie=${e.kategorie.label}`,
    });
  }
}

// S6 — BMI Alter leer
{
  const e = berechneBmi({ gewicht: 70, groesse: 175, geschlecht: 'maennlich' });
  if (!e) {
    results.push({ label: 'S6 BMI ohne Alter', ok: false });
  } else {
    // 70 / 1.75² = 22.86
    const ok = Math.abs(e.bmi - 22.86) < 0.05 && e.kategorie.label === 'Normalgewicht';
    results.push({
      label: 'S6 BMI ohne Alter: Kategorie "Normalgewicht"',
      ok,
      detail: `bmi=${e.bmi}, kategorie=${e.kategorie.label}`,
    });
  }
}

// SSOT: BMI_ADULT_MIN_AGE muss 18 sein
results.push({
  label: 'SSOT BMI_ADULT_MIN_AGE === 18',
  ok: BMI_ADULT_MIN_AGE === 18,
  detail: `${BMI_ADULT_MIN_AGE}`,
});

// Ausgabe
let allGreen = true;
for (const r of results) {
  const marker = r.ok ? 'OK  ' : 'FAIL';
  if (!r.ok) allGreen = false;
  console.log(`${marker} ${r.label}${r.detail ? ` | ${r.detail}` : ''}`);
}
process.exit(allGreen ? 0 : 1);
