/**
 * Verify-Script für den Passwort-Modus in lib/berechnungen/zufallszahl.ts (Welle 187).
 *
 * Anlass: generierePasswort() nutzte Math.random() — kein kryptografisch sicherer Generator.
 *
 * Externe Quellen:
 *   - MDN Web Docs, Math.random(): „does not provide cryptographically secure random numbers …
 *     Use the Web Crypto API instead, and more precisely the Crypto.getRandomValues() method.“
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *   - Rejection Sampling gegen Modulo-Bias: Werte ≥ 2³² − (2³² mod n) verwerfen.
 *     Beispiel n = 88 (a–z, A–Z, 0–9, 26 Sonderzeichen): 2³² mod 88 = 48 → Grenze 4.294.967.248.
 *
 * Ausführen: npx tsx scripts/verify-zufallszahl.ts
 */

import { generierePasswort, sichererIndex } from '../lib/berechnungen/zufallszahl';

type Fall = { name: string; ok: boolean; info?: string };
const faelle: Fall[] = [];

// 1) Rejection Sampling mit gesteuerter Quelle
const folge = (werte: number[]) => {
  let i = 0;
  return (p: Uint32Array) => { p[0] = werte[i++]; return p; };
};
const GRENZE_88 = 4294967296 - (4294967296 % 88);
faelle.push({ name: 'Grenze für n = 88 ist 4.294.967.248', ok: GRENZE_88 === 4294967248, info: String(GRENZE_88) });
faelle.push({ name: '0xFFFFFFFF wird verworfen, nächster Wert 5 → Index 5', ok: sichererIndex(88, folge([0xffffffff, 5])) === 5 });
faelle.push({ name: 'Wert Grenze − 1 wird angenommen → Index 87', ok: sichererIndex(88, folge([GRENZE_88 - 1])) === 87 });
faelle.push({ name: 'Wert = Grenze wird verworfen', ok: sichererIndex(88, folge([GRENZE_88, 3])) === 3 });
faelle.push({ name: 'n = 1 → immer 0', ok: sichererIndex(1, folge([0xffffffff])) === 0 });

// 2) Abbildung exakt gleichverteilt: Zählerquelle 0 … 88·1.000 − 1 → jede Stelle genau 1.000-mal
{
  let z = 0;
  const zaehler = (p: Uint32Array) => { p[0] = z++; return p; };
  const counts = new Array(88).fill(0);
  for (let i = 0; i < 88 * 1000; i++) counts[sichererIndex(88, zaehler)]++;
  faelle.push({ name: 'Zählerquelle: jeder Index genau 1.000-mal', ok: counts.every((c) => c === 1000) });
}

// 3) Echte Quelle (crypto): Chi-Quadrat-Test, df = 87, Schranke ≈ 165 (p ≈ 1e-6, Wilson-Hilferty)
{
  const n = 88, N = 88_000;
  const counts = new Array(n).fill(0);
  for (let i = 0; i < N; i++) counts[sichererIndex(n)]++;
  const e = N / n;
  const chi2 = counts.reduce((s, c) => s + (c - e) ** 2 / e, 0);
  faelle.push({ name: 'crypto: Chi² über 88 Klassen < 165', ok: chi2 < 165, info: chi2.toFixed(1) });
}

// 4) generierePasswort nutzt kein Math.random mehr
{
  const orig = Math.random;
  let aufgerufen = false;
  Math.random = () => { aufgerufen = true; return orig(); };
  const p = generierePasswort(16, { gross: true, klein: true, zahlen: true, sonder: true });
  Math.random = orig;
  faelle.push({ name: 'generierePasswort ruft Math.random nicht auf', ok: !aufgerufen });
  faelle.push({ name: 'Länge 16', ok: p.passwort.length === 16 && p.laenge === 16 });
  const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  faelle.push({ name: 'Nur Zeichen aus dem Pool (88 Zeichen)', ok: pool.length === 88 && [...p.passwort].every((c) => pool.includes(c)) });
  faelle.push({ name: '16 Zeichen, 4 Kategorien → „stark“', ok: p.staerke === 'stark', info: p.staerke });
  const nurZiffern = generierePasswort(8, { gross: false, klein: false, zahlen: true, sonder: false });
  faelle.push({ name: 'Nur Ziffern → nur 0–9', ok: /^[0-9]{8}$/.test(nurZiffern.passwort) });
  const z = generierePasswort(200, { gross: true, klein: true, zahlen: true, sonder: true });
  faelle.push({ name: 'Länge auf 64 begrenzt', ok: z.passwort.length === 64 });
}

let ok = 0;
for (const f of faelle) {
  if (f.ok) ok++;
  console.log(`${f.ok ? '✓' : '✗'} ${f.name}${f.info ? ` (${f.info})` : ''}`);
}
console.log(`\nZufallszahl/Passwort: ${ok}/${faelle.length} grün`);
process.exit(ok === faelle.length ? 0 : 1);
