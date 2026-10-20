/**
 * Verify-Script für lib/berechnungen/backform.ts (Welle 184).
 *
 * Geometrie (allgemeingültig): Kreisfläche π · r², Rechteck L · B, Quader L · B · H.
 * Sollwerte von Hand gerechnet:
 *   26 cm rund: π · 13² = 530,93 cm²; 20 cm: π · 10² = 314,16 cm²; Faktor 100/169 = 0,5917
 *   250 g × 0,5917 = 147,93 g → Tabelle (5-g-Schritte) 150 g; 150 g → 88,76 → 90 g; 4 Eier → 2,37 → 2
 *   Kastenform 30 × 11 × 7 = 2.310 cm³; 25 × 11 × 7 = 1.925 cm³ → Faktor 1.925 / 2.310 = 0,8333
 *   Kastenform 30 × 11 × 7 → 30 × 11 × 9: Volumen-Faktor 9/7 = 1,2857 (Fläche allein: 1,0)
 *   Kastenform 30 × 11 (330 cm²) → 26 cm rund: Flächenfaktor 530,93 / 330 = 1,6089
 *
 * Ausführen: npx tsx scripts/verify-backform.ts
 */

import { berechneBackform, zutatUmgerechnet, type BackformMasse } from '../lib/berechnungen/backform';

const rund = (d: number): BackformMasse => ({ typ: 'rund', durchmesser: d, laenge: 0, breite: 0, hoehe: 0 });
const kasten = (l: number, b: number, h: number): BackformMasse => ({ typ: 'kasten', durchmesser: 0, laenge: l, breite: b, hoehe: h });

type Fall = { name: string; ist: number | boolean | null; soll: number | boolean | null; tol?: number };
const r2620 = berechneBackform(rund(26), rund(20));
const k = berechneBackform(kasten(30, 11, 7), kasten(25, 11, 7));
const kh = berechneBackform(kasten(30, 11, 7), kasten(30, 11, 9));
const kr = berechneBackform(kasten(30, 11, 7), rund(26));

const faelle: Fall[] = [
  { name: '26 cm rund: Fläche 530,93 cm²',              ist: r2620.flaecheOrig, soll: 530.93, tol: 0.01 },
  { name: '20 cm rund: Fläche 314,16 cm²',              ist: r2620.flaecheZiel, soll: 314.16, tol: 0.01 },
  { name: '26 → 20 cm: Faktor 0,5917',                  ist: r2620.faktor, soll: 0.5917, tol: 0.0001 },
  { name: '26 → 20 cm: Mehl 250 g → 150 g (5-g-Raster)', ist: zutatUmgerechnet(250, r2620.faktor, 'g'), soll: 150 },
  { name: '26 → 20 cm: Zucker 150 g → 90 g',            ist: zutatUmgerechnet(150, r2620.faktor, 'g'), soll: 90 },
  { name: '26 → 20 cm: 4 Eier → 2',                     ist: zutatUmgerechnet(4, r2620.faktor, 'Stück'), soll: 2 },
  { name: 'Rund: kein Volumen',                         ist: r2620.volumenOrig, soll: null },
  { name: 'Kastenform 30 × 11 × 7: 2.310 cm³',          ist: k.volumenOrig, soll: 2310 },
  { name: 'Kasten → Kasten: nach Volumen',              ist: k.nachVolumen, soll: true },
  { name: 'Kasten 30 → 25 cm: Faktor 0,8333',           ist: k.faktor, soll: 0.8333, tol: 0.0001 },
  { name: 'Kasten 7 → 9 cm hoch: Faktor 1,2857',        ist: kh.faktor, soll: 1.2857, tol: 0.0001 },
  { name: 'Kasten → rund: nach Fläche',                 ist: kr.nachVolumen, soll: false },
  { name: 'Kasten → rund: als gemischt markiert',       ist: kr.gemischtMitKasten, soll: true },
  { name: 'Kasten 30 × 11 → 26 cm rund: Faktor 1,6089', ist: kr.faktor, soll: 1.6089, tol: 0.0001 },
];

let rot = 0;
for (const f of faelle) {
  const ok = typeof f.ist === 'number' && typeof f.soll === 'number' ? Math.abs(f.ist - f.soll) <= (f.tol ?? 0.005) : f.ist === f.soll;
  if (!ok) rot++;
  console.log(`  ${ok ? '✓' : '✗'} ${f.name.padEnd(48)} ist ${String(typeof f.ist === 'number' ? Math.round(f.ist * 10000) / 10000 : f.ist).padStart(10)}  soll ${String(f.soll).padStart(10)}`);
}
console.log('');
console.log(`Ergebnis: ${faelle.length - rot}/${faelle.length} grün, ${rot} rot.`);
process.exit(rot === 0 ? 0 : 1);
