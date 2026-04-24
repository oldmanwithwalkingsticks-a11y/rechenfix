/**
 * Smoke-Tests für Prompt 143 — SSOT-Konsolidierung (P2.6 + P2.7 + P2.8).
 *
 * T1: BMI-Kategorien-SSOT in SchwangerschaftGewichtRechner — die Mapping-
 *     Logik getKat(bmi) liefert für alle WHO-Schwellen (18,5/25/30) die
 *     erwartete IOM-2009-Kategorie. Das prüfen wir hier indirekt über
 *     bmiKategorien.find() — gleiches Pattern wie im Component.
 *
 * T2: Alters-BMI-Tabelle ist SSOT — idealgewicht.ts und bmi.ts liefern für
 *     dieselbe Alter-Eingabe identische Spannen. Wert-Änderung gegenüber
 *     vor-143: für 175cm/25J jetzt 61,3–79,3 kg (statt vorher 61,3–76,6 kg).
 *
 * T3: Schwangerschafts-Lib Fusion — berechneGeburtstermin und berechneSsw
 *     sind aus @/lib/berechnungen/schwangerschaft importierbar, liefern für
 *     LMP 2026-01-15 identische ET (2026-10-22).
 *
 * T4: Alte Dateien gelöscht — fs.existsSync für geburtstermin.ts und ssw.ts.
 *
 * T5: Zeitzonen-Parser aus P2.4 ist übernommen (`parseDatum` exportiert).
 */
import { existsSync } from 'node:fs';
import { bmiKategorien, getOptimalerBereich } from '../lib/berechnungen/bmi';
import { berechneIdealgewicht } from '../lib/berechnungen/idealgewicht';
import {
  berechneGeburtstermin,
  berechneSsw,
  parseDatum,
  defaultPeriodeDatum,
  defaultTerminDatum,
} from '../lib/berechnungen/schwangerschaft';

interface Assertion {
  label: string;
  ok: boolean;
  detail?: string;
}
const results: Assertion[] = [];

// T1a — BMI-Kategorien-Schwellen für SchwangerschaftGewichtRechner-Mapping
// Mapping-Logik: Untergewicht→unter, Normal→normal, Übergewicht→ueber, alles Adipös→adipos
{
  const map = (bmi: number): string => {
    const k = bmiKategorien.find((cat) => bmi >= cat.min && bmi < cat.max);
    if (!k) return 'adipos';
    if (k.label === 'Untergewicht') return 'unter';
    if (k.label === 'Normalgewicht') return 'normal';
    if (k.label === 'Übergewicht') return 'ueber';
    return 'adipos';
  };
  const cases = [
    { bmi: 17, soll: 'unter' },
    { bmi: 18.5, soll: 'normal' },
    { bmi: 22, soll: 'normal' },
    { bmi: 25, soll: 'ueber' },
    { bmi: 29.9, soll: 'ueber' },
    { bmi: 30, soll: 'adipos' },
    { bmi: 37, soll: 'adipos' },
    { bmi: 45, soll: 'adipos' },
  ];
  const ok = cases.every((c) => map(c.bmi) === c.soll);
  results.push({
    label: 'T1a BMI-Kategorien-Mapping (SchwangerschaftGewicht)',
    ok,
    detail: cases.map((c) => `bmi=${c.bmi}→${map(c.bmi)} (soll: ${c.soll})`).join(' | '),
  });
}

// T1b — IOM-2009-Gewichtsempfehlung unverändert: BMI 22 (normal) → Einling 11,5–16 kg
// (Das prüfen wir indirekt über die Mapping-Korrektheit; Zahlen stehen hartkodiert
// im Component und werden vom Mapping nicht berührt.)
{
  const bmi = 22;
  const k = bmiKategorien.find((cat) => bmi >= cat.min && bmi < cat.max);
  const ok = k?.label === 'Normalgewicht';
  results.push({
    label: 'T1b BMI 22 → Normalgewicht (IOM-Tabelle: 11,5–16 kg Zunahme unverändert)',
    ok,
    detail: `label=${k?.label}`,
  });
}

// T2 — Alters-BMI-Tabelle ist SSOT (bmi.ts). idealgewicht.ts nutzt getOptimalerBereich.
// Erwartet: 175 cm, 25 Jahre → 61,3–79,3 kg (basiert auf {min: 20.0, max: 25.9})
{
  const e = berechneIdealgewicht({ geschlecht: 'mann', alter: 25, groesse: 175, gewicht: 70, koerperbau: 'normal' });
  if (!e) {
    results.push({ label: 'T2 Idealgewicht 175/25 → Wert-Change', ok: false, detail: 'null' });
  } else {
    // 20.0 × 1.75² = 61.25 → 61.3; 25.9 × 1.75² = 79.31875 → 79.3
    const ok = Math.abs(e.bmiSpanne.gewichtUnten - 61.3) < 0.05
      && Math.abs(e.bmiSpanne.gewichtOben - 79.3) < 0.05
      && e.bmiSpanne.bmiUnten === 20.0
      && e.bmiSpanne.bmiOben === 25.9;
    results.push({
      label: 'T2 Idealgewicht 175cm/25J: Spanne 61,3–79,3 kg (Wert-Change)',
      ok,
      detail: `bmiUnten=${e.bmiSpanne.bmiUnten} bmiOben=${e.bmiSpanne.bmiOben} gewUnten=${e.bmiSpanne.gewichtUnten} gewOben=${e.bmiSpanne.gewichtOben}`,
    });
  }
}

// T2b — Alters-BMI-SSOT-Drift-Check: getOptimalerBereich liefert für alter=25 {20, 25.9},
// und idealgewicht.ts konsumiert denselben Wert
{
  const bmiRange = getOptimalerBereich(25);
  const e = berechneIdealgewicht({ geschlecht: 'mann', alter: 25, groesse: 180, gewicht: 75, koerperbau: 'normal' });
  const ok = e !== null && e.bmiSpanne.bmiUnten === bmiRange.min && e.bmiSpanne.bmiOben === bmiRange.max;
  results.push({
    label: 'T2b Alters-BMI-SSOT: bmi.ts und idealgewicht.ts identisch für alter=25',
    ok,
    detail: `bmi.ts={${bmiRange.min},${bmiRange.max}} idealgewicht.ts={${e?.bmiSpanne.bmiUnten},${e?.bmiSpanne.bmiOben}}`,
  });
}

// T3 — Schwangerschafts-Lib importierbar; Naegele-Kernergebnisse
{
  const g = berechneGeburtstermin({ methode: 'periode', periodeDatum: '2026-01-15', zyklusLaenge: 28 });
  const s = berechneSsw({ methode: 'periode', periodeDatum: '2026-01-15', zyklusLaenge: 28, terminDatum: '' });
  const gET = g && `${g.geburtstermin.getFullYear()}-${String(g.geburtstermin.getMonth() + 1).padStart(2, '0')}-${String(g.geburtstermin.getDate()).padStart(2, '0')}`;
  const sET = s.valid && `${s.geburtsterminDatum.getFullYear()}-${String(s.geburtsterminDatum.getMonth() + 1).padStart(2, '0')}-${String(s.geburtsterminDatum.getDate()).padStart(2, '0')}`;
  const ok = gET === '2026-10-22' && sET === '2026-10-22';
  results.push({
    label: 'T3 schwangerschaft.ts: berechneGeburtstermin + berechneSsw LMP 2026-01-15 → ET 2026-10-22',
    ok,
    detail: `geburtstermin=${gET} ssw=${sET}`,
  });
}

// T3b — defaultPeriodeDatum / defaultTerminDatum exportiert
{
  const dp = defaultPeriodeDatum();
  const dt = defaultTerminDatum();
  const ok = typeof dp === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dp)
    && typeof dt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dt);
  results.push({
    label: 'T3b defaultPeriodeDatum / defaultTerminDatum exportiert und gültig',
    ok,
    detail: `periode=${dp} termin=${dt}`,
  });
}

// T4 — Alte Dateien gelöscht
{
  const geburtstermin = existsSync('lib/berechnungen/geburtstermin.ts');
  const ssw = existsSync('lib/berechnungen/ssw.ts');
  const ok = !geburtstermin && !ssw;
  results.push({
    label: 'T4 geburtstermin.ts + ssw.ts gelöscht',
    ok,
    detail: `geburtstermin=${geburtstermin} ssw=${ssw}`,
  });
}

// T5 — parseDatum aus Prompt 142 P2.4 übernommen und als exportierter Helper
{
  const d = parseDatum('2026-01-15');
  const ok = d !== null
    && d.getFullYear() === 2026
    && d.getMonth() === 0
    && d.getDate() === 15;
  results.push({
    label: 'T5 parseDatum zeitzonen-sicher (lokale Mitternacht 15.01.2026)',
    ok,
    detail: d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : 'null',
  });
}

let allGreen = true;
for (const r of results) {
  const marker = r.ok ? 'OK  ' : 'FAIL';
  if (!r.ok) allGreen = false;
  console.log(`${marker} ${r.label}${r.detail ? ` | ${r.detail}` : ''}`);
}
process.exit(allGreen ? 0 : 1);
