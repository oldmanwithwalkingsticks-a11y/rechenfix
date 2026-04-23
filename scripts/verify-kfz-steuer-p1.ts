// P1-Verifikation Kfz-Steuer (Prompt 131).
// Ausführen: npx tsx scripts/verify-kfz-steuer-p1.ts
//
// Externe Primärquellen (Rule 11: nicht-zirkulär):
//   § 9 Abs. 1 Nr. 2a/2b KraftStG — Hubraum-Sockel (Benzin 2,00 €/100 ccm,
//     Diesel 9,50 €/100 ccm, "angefangene 100 ccm"). Primärquelle:
//     gesetze-im-internet.de/kraftstg/__9.html
//   § 9 Abs. 1 Nr. 2c KraftStG — progressive CO₂-Staffel ab 01.01.2021
//     (95/115/135/155/175/195 g/km mit 2,00/2,20/2,50/2,90/3,40/4,00 €/g).
//   § 3d KraftStG i.d.F. 8. KraftStÄndG (BT 04.12.2025, Drs. 21/2672) —
//     Elektro-Befreiung 10 J. ab Erstzulassung, längstens 31.12.2035,
//     Zulassungsfenster 18.05.2011–31.12.2030.

import { berechneKfzSteuer } from '../lib/berechnungen/kfz-steuer';
import {
  berechneCO2Komponente,
  berechneElektroBefreiungsende,
} from '../lib/berechnungen/kfz-steuer-parameter';

interface Fall {
  name: string;
  actual: number | string | null;
  expected: number | string | null;
  tol?: number;
  quelle: string;
}
const cases: Fall[] = [];

// === GRUPPE 1: CO₂-Komponente stützpunktweise (progressiv) ===

// Unter/auf Freibetrag: 0 €
cases.push({ name: 'CO₂ 95 g/km → 0 €', actual: berechneCO2Komponente(95), expected: 0, quelle: '§ 9 Abs. 1 Nr. 2c Alt. 1' });
cases.push({ name: 'CO₂ 0 g/km  → 0 €', actual: berechneCO2Komponente(0),  expected: 0, quelle: '§ 9 Abs. 1 Nr. 2c Alt. 1' });

// Erste Stufe (95–115): 2,00 €/g
// CO₂=100: (100-95)*2 = 10 €
cases.push({ name: 'CO₂ 100 g/km → 10,00 €', actual: berechneCO2Komponente(100), expected: 10, quelle: '§ 9 Abs. 1 Nr. 2c Alt. 2 (96–115, 2,00 €/g)' });
// CO₂=115: (115-95)*2 = 40 €
cases.push({ name: 'CO₂ 115 g/km → 40,00 € (Stufenende)', actual: berechneCO2Komponente(115), expected: 40, quelle: '§ 9 Abs. 1 Nr. 2c' });

// Zweite Stufe (115–135): 2,20 €/g
// CO₂=128 (Kompaktwagen): 20*2,00 + 13*2,20 = 40 + 28,60 = 68,60 €
cases.push({ name: 'CO₂ 128 g/km → 68,60 € (Kompaktwagen)', actual: berechneCO2Komponente(128), expected: 68.60, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2c Stufen 1+2' });
// CO₂=135: 20*2,00 + 20*2,20 = 40 + 44 = 84 €
cases.push({ name: 'CO₂ 135 g/km → 84,00 € (Stufenende 2)', actual: berechneCO2Komponente(135), expected: 84, quelle: '§ 9 Abs. 1 Nr. 2c' });

// Dritte Stufe (135–155): 2,50 €/g
// CO₂=145: 40 + 44 + 10*2,50 = 109 €
cases.push({ name: 'CO₂ 145 g/km → 109,00 € (Mittelklasse)', actual: berechneCO2Komponente(145), expected: 109, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2c Stufen 1+2+3' });

// Vierte Stufe (155–175): 2,90 €/g
// CO₂=160: 40 + 44 + 50 + 5*2,90 = 148,50 €
cases.push({ name: 'CO₂ 160 g/km → 148,50 €', actual: berechneCO2Komponente(160), expected: 148.50, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2c Stufen 1..4' });
// CO₂=175: 40 + 44 + 50 + 20*2,90 = 192 €
cases.push({ name: 'CO₂ 175 g/km → 192,00 € (Diesel-SUV)', actual: berechneCO2Komponente(175), expected: 192, quelle: '§ 9 Abs. 1 Nr. 2c' });

// Fünfte Stufe (175–195): 3,40 €/g
// CO₂=190: 40 + 44 + 50 + 58 + 15*3,40 = 243 €
cases.push({ name: 'CO₂ 190 g/km → 243,00 € (Oberklasse)', actual: berechneCO2Komponente(190), expected: 243, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2c Stufen 1..5' });

// Sechste Stufe (≥195): 4,00 €/g
// CO₂=220: 40 + 44 + 50 + 58 + 68 + 25*4,00 = 360 €
cases.push({ name: 'CO₂ 220 g/km → 360,00 €', actual: berechneCO2Komponente(220), expected: 360, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2c alle 6 Stufen' });

// === GRUPPE 2: berechneKfzSteuer Integrationstests ===

// Kleinstwagen Benzin 95g/km 1000ccm: Sockel 10*2 = 20 €, kein CO₂
const t1 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 1000, co2: 95 })!;
cases.push({ name: 'Kleinstwagen 1000ccm/95g → 20,00 €', actual: t1.jahresSteuer, expected: 20, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2a + 2c' });

// Kompaktwagen Benzin 1500ccm/128g: Sockel 15*2=30 + CO₂ 68,60 = 98,60 €
const t2 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 1500, co2: 128 })!;
cases.push({ name: 'Kompaktwagen 1500ccm/128g → 98,60 €', actual: t2.jahresSteuer, expected: 98.60, tol: 0.005, quelle: 'Integration Sockel + CO₂' });

// Mittelklasse Benzin 2000ccm/145g: Sockel 20*2=40 + CO₂ 109 = 149 €
const t3 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 2000, co2: 145 })!;
cases.push({ name: 'Mittelklasse 2000ccm/145g → 149,00 €', actual: t3.jahresSteuer, expected: 149, tol: 0.005, quelle: 'Integration Benzin' });

// Diesel-SUV 2000ccm/175g: Sockel 20*9,50=190 + CO₂ 192 = 382 €
const t4 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'diesel', hubraum: 2000, co2: 175 })!;
cases.push({ name: 'Diesel-SUV 2000ccm/175g → 382,00 €', actual: t4.jahresSteuer, expected: 382, tol: 0.005, quelle: 'Integration Diesel-Sockel' });

// Oberklasse Benzin 3000ccm/190g: Sockel 30*2=60 + CO₂ 243 = 303 €
const t5 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 3000, co2: 190 })!;
cases.push({ name: 'Oberklasse 3000ccm/190g → 303,00 €', actual: t5.jahresSteuer, expected: 303, tol: 0.005, quelle: 'Integration 5 CO₂-Stufen' });

// Großmotor Benzin 4000ccm/220g: Sockel 40*2=80 + CO₂ 360 = 440 €
const t6 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 4000, co2: 220 })!;
cases.push({ name: 'Großmotor 4000ccm/220g → 440,00 €', actual: t6.jahresSteuer, expected: 440, tol: 0.005, quelle: 'Integration alle 6 CO₂-Stufen' });

// "angefangene 100 ccm"-Regel: 1498 ccm → 15 × 2,00 = 30 € (nicht 14,98 × 2)
const t7 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'benzin', hubraum: 1498, co2: 95 })!;
cases.push({ name: 'Sockel angefangene-100-Regel 1498ccm → 30 €', actual: t7.sockelbetrag, expected: 30, tol: 0.005, quelle: '§ 9 Abs. 1 Nr. 2a (Math.ceil)' });

// === GRUPPE 3: Elektro-Befreiung § 3d ===

// Innerhalb Förderzeitraum, vor 2025: Befreiungsende = Erstzulassung + 10 Jahre
const eBefr1 = berechneElektroBefreiungsende(new Date('2024-03-15'));
cases.push({
  name: 'Elektro EZ 2024-03-15 → Befreiung bis 2034-03-15',
  actual: eBefr1 ? eBefr1.toISOString().slice(0, 10) : null,
  expected: '2034-03-15',
  quelle: '§ 3d Abs. 1 KraftStG (10 J.)',
});

// Max-Cap greift: 2028+10J = 2038, aber max 2035-12-31
const eBefr2 = berechneElektroBefreiungsende(new Date('2028-07-01'));
cases.push({
  name: 'Elektro EZ 2028-07-01 → Befreiung bis 2035-12-31 (Cap)',
  actual: eBefr2 ? eBefr2.toISOString().slice(0, 10) : null,
  expected: '2035-12-31',
  quelle: '§ 3d Abs. 1 KraftStG (Max-Cap 31.12.2035)',
});

// Nach 31.12.2030: keine Befreiung
const eBefr3 = berechneElektroBefreiungsende(new Date('2031-01-01'));
cases.push({
  name: 'Elektro EZ 2031-01-01 → null (außerhalb Förderzeitraum)',
  actual: eBefr3 === null ? 'null' : (eBefr3 as Date).toISOString(),
  expected: 'null',
  quelle: '§ 3d Abs. 1 KraftStG (Zulassungs-Stichtag 31.12.2030)',
});

// Vor 18.05.2011: keine § 3d-Befreiung
const eBefr4 = berechneElektroBefreiungsende(new Date('2010-01-01'));
cases.push({
  name: 'Elektro EZ 2010-01-01 → null (vor 18.05.2011)',
  actual: eBefr4 === null ? 'null' : (eBefr4 as Date).toISOString(),
  expected: 'null',
  quelle: '§ 3d Abs. 1 KraftStG (Zulassungs-Beginn 18.05.2011)',
});

// Genau am Grenzwert: 2030-12-31 → Befreiung bis 2035-12-31 (nicht 2040)
const eBefr5 = berechneElektroBefreiungsende(new Date('2030-12-31'));
cases.push({
  name: 'Elektro EZ 2030-12-31 → Befreiung bis 2035-12-31',
  actual: eBefr5 ? eBefr5.toISOString().slice(0, 10) : null,
  expected: '2035-12-31',
  quelle: '§ 3d Abs. 1 KraftStG (Max-Cap greift vor 10-J-Frist)',
});

// === GRUPPE 4: berechneKfzSteuer Integration Elektro ===

const tE1 = berechneKfzSteuer({
  zulassung: 'nach-2009', antrieb: 'elektro', hubraum: 0, co2: 0,
  erstzulassungsdatum: new Date('2024-03-15'),
})!;
cases.push({ name: 'Elektro 2024 → befreit=true', actual: tE1.befreit ? 'true' : 'false', expected: 'true', quelle: 'Integration § 3d' });
cases.push({ name: 'Elektro 2024 → jahresSteuer = 0', actual: tE1.jahresSteuer, expected: 0, quelle: 'Integration § 3d' });
cases.push({ name: 'Elektro 2024 → befreitBis = 15.03.2034', actual: tE1.befreitBis ?? '', expected: '15.03.2034', quelle: 'UI-Formatierung deutsch' });

const tE2 = berechneKfzSteuer({
  zulassung: 'nach-2009', antrieb: 'elektro', hubraum: 0, co2: 0,
  erstzulassungsdatum: new Date('2031-01-01'),
})!;
cases.push({ name: 'Elektro 2031 → befreit=false', actual: tE2.befreit ? 'true' : 'false', expected: 'false', quelle: 'außerhalb Förderzeitraum' });
cases.push({ name: 'Elektro 2031 → keineBefreiungGrund = nach-2030', actual: tE2.keineBefreiungGrund ?? '', expected: 'nach-2030', quelle: 'UI-Branching' });

// Ohne Erstzulassungs-Datum: konservativer Default auf Max-Cap
const tE3 = berechneKfzSteuer({ zulassung: 'nach-2009', antrieb: 'elektro', hubraum: 0, co2: 0 })!;
cases.push({ name: 'Elektro ohne EZ-Datum → befreit=true (Fallback)', actual: tE3.befreit ? 'true' : 'false', expected: 'true', quelle: 'UI-Default' });
cases.push({ name: 'Elektro ohne EZ-Datum → befreitBis = 31.12.2035', actual: tE3.befreitBis ?? '', expected: '31.12.2035', quelle: 'konservativer Max-Cap-Default' });

// === Regression-Schutz: Alt-Staffel (Pre-131) würde diese Werte liefern ===
// Bei CO₂=128 g/km wäre der alte Code: 20*2 + 13*2,50 = 72,50 € (neu korrekt: 68,60 €)
// Bei CO₂=190 g/km: alt 20*2+20*2,50+20*3+15*3,50 = 40+50+60+52,50 = 202,50 € (neu: 243 €)
// Die Alt-Werte sind in den Testfällen oben nicht als Erwartung hinterlegt — sollte
// jemand versehentlich die Staffel wieder zurückändern, schlagen alle CO₂-Tests fehl.

// === Ausgabe ===
let fail = 0;
for (const c of cases) {
  let ok: boolean;
  if (typeof c.expected === 'number' && typeof c.actual === 'number') {
    ok = Math.abs(c.actual - c.expected) <= (c.tol ?? 0.005);
  } else {
    ok = c.actual === c.expected;
  }
  const mark = ok ? '✓' : '✗';
  const actualStr = String(c.actual).padStart(12);
  const expectedStr = String(c.expected).padStart(12);
  console.log(`${mark} ${c.name.padEnd(60)} ist=${actualStr}  soll=${expectedStr}  [${c.quelle}]`);
  if (!ok) fail++;
}
console.log(`\n${cases.length - fail}/${cases.length} Testfälle grün${fail > 0 ? ` — ${fail} FAIL` : ''}.`);
process.exit(fail > 0 ? 1 : 0);
