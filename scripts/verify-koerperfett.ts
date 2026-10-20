/**
 * Verify-Script für lib/berechnungen/koerperfett.ts (Welle 187).
 *
 * Anlass: Die Kategorie-Zuordnung prüfte „kfa >= von && kfa <= bis“ mit ganzzahligen Grenzen
 * (Mann 2–5, 6–13, 14–17, 18–24, 25–50) und fiel sonst auf „Übergewichtig“ zurück. 13,2 %,
 * 17,2 % oder 24,2 % beim Mann landeten so im obersten Bereich.
 *
 * Externe Quellen / Sollwerte:
 *   - US-Navy-Umfangformel (Hodgdon & Beckett 1984), metrisch:
 *     Mann: 495 / (1,0324 − 0,19077 · log10(Bauch − Hals) + 0,15456 · log10(Größe)) − 450
 *     Frau: 495 / (1,29579 − 0,35004 · log10(Taille + Hüfte − Hals) + 0,22100 · log10(Größe)) − 450
 *     Sollwerte unabhängig in Python nachgerechnet (auf 0,1 gerundet).
 *   - ACE-Body-Fat-Kategorien (Tabelle der Seite): Mann 2–5 / 6–13 / 14–17 / 18–24 / ab 25 %,
 *     Frau 10–13 / 14–20 / 21–24 / 25–31 / ab 32 %; halboffen gelesen (bis unter die nächste Untergrenze).
 *
 * Ausführen: npx tsx scripts/verify-koerperfett.ts
 */

import { berechneKoerperfett } from '../lib/berechnungen/koerperfett';

type Fall = { name: string; ist: number | string | null; soll: number | string | null };
const faelle: Fall[] = [];

const M = (bauch: number) => berechneKoerperfett({ geschlecht: 'mann', groesse: 178, bauchumfang: bauch, halsumfang: 38, hueftumfang: 0, alter: 30, gewicht: 0 });
const F = (taille: number, huefte: number) => berechneKoerperfett({ geschlecht: 'frau', groesse: 165, bauchumfang: taille, halsumfang: 32, hueftumfang: huefte, alter: 30, gewicht: 0 });

// Mann, 178 cm, Hals 38 cm
const mann: [number, number, string][] = [
  [72, 4.9, 'Essentielles Fett'],
  [73, 5.9, 'Essentielles Fett'],          // vorher Default „Übergewichtig“
  [74, 6.9, 'Athletisch'],
  [80, 12.4, 'Athletisch'],
  [81, 13.2, 'Athletisch'],                // vorher „Übergewichtig“
  [85, 16.4, 'Fitness'],                   // Startwerte der Komponente / Seitenbeispiel
  [86, 17.2, 'Fitness'],                   // vorher „Übergewichtig“
  [87, 18.0, 'Durchschnittlich'],
  [96, 24.2, 'Durchschnittlich'],          // vorher „Übergewichtig“
  [97, 24.9, 'Durchschnittlich'],          // vorher „Übergewichtig“
  [105, 29.7, 'Oberhalb des Durchschnitts'],
];
for (const [bauch, kfa, kat] of mann) {
  const e = M(bauch);
  faelle.push({ name: `Mann Bauch ${bauch} → KFA ${kfa}`, ist: e?.kfa ?? null, soll: kfa });
  faelle.push({ name: `Mann Bauch ${bauch} → ${kat}`, ist: e?.kategorie ?? null, soll: kat });
}

// Frau, 165 cm, Hals 32 cm
const frau: [number, number, number, string][] = [
  [55, 83, 9.6, 'Essentielles Fett'],      // unter 10 % — vorher Default „Übergewichtig“
  [60, 85, 13.8, 'Essentielles Fett'],     // vorher „Übergewichtig“
  [62, 88, 16.7, 'Athletisch'],
  [55, 102, 20.6, 'Athletisch'],           // vorher „Übergewichtig“
  [66, 90, 20.1, 'Athletisch'],
  [55, 109, 24.3, 'Fitness'],              // vorher „Übergewichtig“
  [72, 95, 25.9, 'Durchschnittlich'],
  [64, 114, 31.4, 'Durchschnittlich'],     // vorher „Übergewichtig“
  [80, 100, 32.4, 'Oberhalb des Durchschnitts'],
  [85, 105, 37.1, 'Oberhalb des Durchschnitts'],
];
for (const [taille, huefte, kfa, kat] of frau) {
  const e = F(taille, huefte);
  faelle.push({ name: `Frau ${taille}/${huefte} → KFA ${kfa}`, ist: e?.kfa ?? null, soll: kfa });
  faelle.push({ name: `Frau ${taille}/${huefte} → ${kat}`, ist: e?.kategorie ?? null, soll: kat });
}

// Kein Label „Übergewichtig“ mehr
faelle.push({ name: 'Label „Übergewichtig“ entfernt', ist: [...mann.map(([b]) => M(b)?.kategorie), ...frau.map(([t, h]) => F(t, h)?.kategorie)].includes('Übergewichtig') ? 'ja' : 'nein', soll: 'nein' });

let ok = 0;
for (const f of faelle) {
  const gruen = typeof f.soll === 'number' && typeof f.ist === 'number' ? Math.abs(f.ist - f.soll) < 1e-9 : f.ist === f.soll;
  if (gruen) ok++;
  console.log(`${gruen ? '✓' : '✗'} ${f.name}: ist ${f.ist}, soll ${f.soll}`);
}
console.log(`\nKörperfett: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
