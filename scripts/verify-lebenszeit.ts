/**
 * Verify-Script für lib/berechnungen/lebenszeit.ts (Welle 187).
 *
 * Anlass: Lebenserwartung 78,5 / 83,2 Jahre stammte aus der Sterbetafel 2022/2024.
 *
 * Externe Quelle: Destatis, Sterbefälle und Lebenserwartung – Sterbetafel (Stand 07.07.2026):
 *   „Nach den Ergebnissen der aktuellen Sterbetafel 2023/2025 liegen diese Werte bei 78,8 Jahren (Männer)
 *   beziehungsweise 83,4 Jahren (Frauen)“ — https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Sterbefaelle-Lebenserwartung/sterbetafel.html
 *   Sollwerte von Hand: 78,8 × 365,25 = 28.781,7 → 28.782 Tage; 83,4 × 365,25 = 30.461,85 → 30.462 Tage.
 *
 * Ausführen: npx tsx scripts/verify-lebenszeit.ts
 */

import { berechneLebenszeit } from '../lib/berechnungen/lebenszeit';

type Fall = { name: string; ist: number; soll: number; tol?: number };
const faelle: Fall[] = [];

// Geburtsdatum genau 14.609 Tage vor jetzt (≈ 40 Jahre), damit gesamtTage deterministisch ist
const TAG = 86_400_000;
const geburt = new Date(Date.now() - 14_609 * TAG - 1000);
const m = berechneLebenszeit({ geburtsdatum: geburt, geschlecht: 'maennlich' });
const w = berechneLebenszeit({ geburtsdatum: geburt, geschlecht: 'weiblich' });

faelle.push(
  { name: 'Lebenserwartung Männer 78,8 (vorher 78,5)', ist: m.lebenserwartung, soll: 78.8 },
  { name: 'Lebenserwartung Frauen 83,4 (vorher 83,2)', ist: w.lebenserwartung, soll: 83.4 },
  { name: 'Gelebte Tage 14.609', ist: m.gesamtTage, soll: 14609 },
  { name: 'Mann 40 J.: verbleibend 28.782 − 14.609 = 14.173 Tage', ist: m.verbleibendeTage, soll: 14173 },
  { name: 'Mann 40 J.: 2.024 volle Wochen(enden)', ist: m.verbleibendeWochenenden, soll: 2024 },
  { name: 'Mann 40 J.: 50,8 % gelebt', ist: Math.round(m.prozentGelebt * 10) / 10, soll: 50.8 },
  { name: 'Frau 40 J.: verbleibend 30.462 − 14.609 = 15.853 Tage', ist: w.verbleibendeTage, soll: 15853 },
  { name: 'Frau 40 J.: 48,0 % gelebt', ist: Math.round(w.prozentGelebt * 10) / 10, soll: 48.0 },
);

let ok = 0;
for (const f of faelle) {
  const gruen = Math.abs(f.ist - f.soll) <= (f.tol ?? 1e-9);
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nLebenszeit: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
