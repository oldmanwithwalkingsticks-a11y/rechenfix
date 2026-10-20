/**
 * Verify-Script für lib/berechnungen/sparplan.ts (Welle 187).
 *
 * Anlass: Im Modus „jährlich“ (Startwert des Sparrechners) verzinste die Lib alle zwölf
 * Monatsraten ein volles Jahr, als läge die Jahresrate am 1. Januar auf dem Konto.
 * 100 €/Monat, 5 %, 10 Jahre ergaben 15.848,14 € und damit mehr als bei monatlicher
 * Gutschrift (15.592,93 €), obwohl seltenere Zinsgutschrift weniger bringen muss.
 *
 * Unabhängige Sollwerte (geschlossene Formeln, nicht aus der Lib):
 *   - Jährliche Gutschrift, Raten vorschüssig zum Monatsanfang, unterjährig linear verzinst
 *     (finanzmathematische Standardformel „unterjährige Raten, jährliche Verzinsung“
 *     mit einfacher Verzinsung innerhalb des Jahres, Jahresersatzrate):
 *       Jahresersatzrate R = r × (12 + i × (12 + 11 + … + 1) / 12) = r × (12 + 6,5 × i)
 *       Endwert = K0 × q^n + R × (q^n − 1) / i,  q = 1 + i
 *   - Monatliche Gutschrift mit relativem Monatszins i/12, Raten vorschüssig:
 *       Endwert = K0 × (1 + i/12)^(12n) + r × (1 + i/12) × ((1 + i/12)^(12n) − 1) / (i/12)
 *   - Dynamik: Summe der Jahresblöcke, jeder mit eigener Rate und Restlaufzeit.
 *
 * Ausführen: npx tsx scripts/verify-sparplan.ts
 */

import { berechneSparplan, type Zinsintervall } from '../lib/berechnungen/sparplan';

type Fall = { name: string; ist: number | boolean; soll: number | boolean; tol?: number };
const faelle: Fall[] = [];

const S = (sparrate: number, zinssatz: number, sparzeit: number, zinsintervall: Zinsintervall, anfangskapital = 0, dynamik = 0) =>
  berechneSparplan({ anfangskapital, sparrate, zinssatz, sparzeit, dynamik, zinsintervall })!;

// Geschlossene Formeln
const jaehrlichSoll = (r: number, p: number, n: number, k0 = 0) => {
  const i = p / 100, q = 1 + i;
  const R = r * (12 + 6.5 * i);
  return k0 * q ** n + (i === 0 ? R * n : R * (q ** n - 1) / i);
};
const monatlichSoll = (r: number, p: number, n: number, k0 = 0) => {
  const im = p / 100 / 12, Q = 1 + im, m = 12 * n;
  return k0 * Q ** m + r * Q * (Q ** m - 1) / im;
};
const monatlichDynamikSoll = (r: number, p: number, n: number, d: number) => {
  const im = p / 100 / 12, Q = 1 + im;
  let summe = 0;
  for (let j = 1; j <= n; j++) {
    const rate = r * (1 + d / 100) ** (j - 1);
    const blockEnde = rate * Q * (Q ** 12 - 1) / im; // Wert des Jahresblocks am Ende von Jahr j
    summe += blockEnde * Q ** (12 * (n - j));
  }
  return summe;
};

const r2 = (x: number) => Math.round(x * 100) / 100;

// Jährliche Gutschrift (Startwert des Rechners)
const j10 = S(100, 5, 10, 'jaehrlich');
faelle.push(
  { name: 'Jährlich 100 €/5 %/10 J.: Endkapital 15.502,25',  ist: j10.endkapital,          soll: r2(jaehrlichSoll(100, 5, 10)) },
  { name: 'Jährlich 100 €/5 %/10 J.: Soll-Formel = 15.502,25', ist: r2(jaehrlichSoll(100, 5, 10)), soll: 15502.25 },
  { name: 'Jährlich: Zinsen 3.502,25',                        ist: j10.gesamtzinsen,        soll: 3502.25 },
  { name: 'Jährlich: Einzahlung 12.000',                      ist: j10.eigenkapital,        soll: 12000 },
  { name: 'Jährlich Jahr 1: Zinsen 100 × 5 % × 78/12 = 32,50', ist: j10.jahre[0].zinsenJahr, soll: 32.5 },
  { name: 'Jährlich Jahr 1: Kapital 1.232,50',                ist: j10.jahre[0].kapital,    soll: 1232.5 },
  { name: 'Jährlich 100 €/3 %/20 J.',                         ist: S(100, 3, 20, 'jaehrlich').endkapital, soll: r2(jaehrlichSoll(100, 3, 20)) },
  { name: 'Jährlich 10.000 € einmalig, 5 %, 10 J. = ×1,05¹⁰',  ist: S(0, 5, 10, 'jaehrlich', 10000).endkapital, soll: r2(10000 * 1.05 ** 10) },
  { name: 'Jährlich 5.000 € + 50 €/Monat, 4 %, 15 J.',         ist: S(50, 4, 15, 'jaehrlich', 5000).endkapital, soll: r2(jaehrlichSoll(50, 4, 15, 5000)) },
  { name: 'Jährlich 0 %: nur Einzahlungen',                    ist: S(100, 0, 10, 'jaehrlich').endkapital, soll: 12000 },
);

// Monatliche Gutschrift
const m10 = S(100, 5, 10, 'monatlich');
faelle.push(
  { name: 'Monatlich 100 €/5 %/10 J.: 15.592,93',             ist: m10.endkapital,          soll: r2(monatlichSoll(100, 5, 10)) },
  { name: 'Jährliche Gutschrift < monatliche Gutschrift',     ist: j10.endkapital < m10.endkapital, soll: true },
);

// Werte der Seitentexte (lib/rechner-config/finanzen.ts, Block sparrechner; monatliche Verzinsung)
faelle.push(
  { name: 'Seite: 100 €/3 %/10 J. ≈ 14.009',  ist: Math.round(S(100, 3, 10, 'monatlich').endkapital), soll: Math.round(monatlichSoll(100, 3, 10)) },
  { name: 'Seite: 100 €/3 %/10 J. = 14.009',  ist: Math.round(monatlichSoll(100, 3, 10)), soll: 14009 },
  { name: 'Seite: 100 €/3 %/20 J. = 32.912',  ist: Math.round(S(100, 3, 20, 'monatlich').endkapital), soll: 32912 },
  { name: 'Seite: 100 €/3 %/30 J. = 58.419',  ist: Math.round(S(100, 3, 30, 'monatlich').endkapital), soll: 58419 },
  { name: 'Seite: 100 €/3 %/40 J. = 92.837',  ist: Math.round(S(100, 3, 40, 'monatlich').endkapital), soll: 92837 },
  { name: 'Seite: 200 €/3 %/20 J. = 65.825',  ist: Math.round(S(200, 3, 20, 'monatlich').endkapital), soll: 65825 },
  { name: 'Seite: 100 €/1 %/20 J. = 26.578',  ist: Math.round(S(100, 1, 20, 'monatlich').endkapital), soll: 26578 },
  { name: 'Seite: 100 €/5 %/20 J. = 41.275',  ist: Math.round(S(100, 5, 20, 'monatlich').endkapital), soll: 41275 },
  { name: 'Formel: 100 €/3 %/20 J. = 32.912', ist: Math.round(monatlichSoll(100, 3, 20)), soll: 32912 },
  { name: 'Seite: Dynamik 3 %, 100 €/3 %/20 J. = 42.939', ist: Math.round(S(100, 3, 20, 'monatlich', 0, 3).endkapital), soll: Math.round(monatlichDynamikSoll(100, 3, 20, 3)) },
  { name: 'Formel: Dynamik = 42.939',         ist: Math.round(monatlichDynamikSoll(100, 3, 20, 3)), soll: 42939 },
);

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) < (f.tol ?? 0.005) : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(56)} ist ${String(f.ist).padStart(10)}  soll ${String(f.soll).padStart(10)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
