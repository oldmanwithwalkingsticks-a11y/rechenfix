/**
 * titelbilder-verkleinern.mjs
 *
 * Verkleinert die Blog-Titelbilder auf exakt 1536 Pixel Breite und schreibt sie
 * in einen SEPARATEN Ordner. Es wird nichts ueberschrieben und nichts im Repo
 * geaendert.
 *
 * ── WARUM 1536 ──────────────────────────────────────────────────────────────
 * Die Quelldateien sind 2752x1536 bei durchschnittlich 6,5 MB, zusammen 130 MB.
 * Ausgeliefert wird davon nie mehr als 1536 Pixel Breite: gemessen am
 * ausgelieferten HTML fordert next/image
 *     /_next/image?url=...&w=1536&q=75
 * an, und 1536 ist die groesste Breite auf der ganzen Seite. Die Quelle ist
 * damit 1,8-mal groesser als je gebraucht.
 *
 * Ist die Quelle exakt 1536 breit, skaliert next/image gar nicht mehr - es
 * bleibt ein einziger Verarbeitungsschritt statt zwei.
 *
 * ── WARUM SHARP UND NICHT FFMPEG ODER PIL ───────────────────────────────────
 * next/image benutzt intern sharp. Wer mit einem anderen Resampler verkleinert,
 * erzeugt zwangslaeufig leicht andere Pixel als die Produktion.
 *
 * Gemessen am 27.08.2026 an steuerklassen-titelbild.png, jeweils der
 * ausgelieferte WebP-Stand gegen den heutigen:
 *     PIL Lanczos     SSIM 1,0000   <- zirkulaer: Referenz war selbst PIL
 *     ffmpeg Lanczos  SSIM 0,9731   <- normaler Abstand zweier Resampler
 * Die 1,0000 war ein Messfehler, kein Ergebnis. Mit sharp entfaellt die Frage:
 * es ist dieselbe Bibliothek, die Vercel zur Laufzeit verwendet.
 *
 * ── WARUM PNG BLEIBT ────────────────────────────────────────────────────────
 * Ursprünglich war eine Umbenennung nach .jpg geplant. Die Messung hat gezeigt,
 * dass jede verlustbehaftete Zwischenstufe rund 0,03 bis 0,04 SSIM kostet -
 * unabhaengig von der Qualitaetsstufe, weil lossy Codecs die feine Koernung der
 * generierten Bilder glaetten. Verlustfreies PNG bei 1536 kostet nichts und
 * spart trotzdem den Faktor 3,3.
 *
 * Zweiter Grund, der schwerer wiegt: Bleibt die Endung, aendert sich KEINE
 * Referenz. Kein <Bild src>, kein image: im Schema, kein Schluessel in
 * scripts/ki-metadaten-schreiben.mjs. Aus einer Welle mit breitem Eingriff wird
 * eine mit 17 Binaerdateien.
 *
 * Hochrechnung aus zwei gemessenen Dateien (Faktor 3,4 und 3,3):
 *     130 MB  ->  rund 39 MB
 *
 * ── ACHTUNG ─────────────────────────────────────────────────────────────────
 * Das Neuschreiben zerstoert die XMP-Kennzeichnung nach Art. 50 Abs. 4 KI-VO.
 * Nach dem Einspielen ins Repo muss scripts/ki-metadaten-schreiben.mjs erneut
 * laufen und --pruefen fuer jede Datei OK melden. Das passiert in der
 * Folgewelle, nicht hier.
 *
 * ── AUFRUF ──────────────────────────────────────────────────────────────────
 *   node scripts/titelbilder-verkleinern.mjs
 *   node scripts/titelbilder-verkleinern.mjs --breite 1536
 *   node scripts/titelbilder-verkleinern.mjs --nur bremsweg,meter
 *
 * Quelle ist bewusst public/blog und nicht das Archiv unter Blogs\Bilder:
 * public/blog enthaelt exakt das, was live ausgeliefert wird.
 */

import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';
import sharp from 'sharp';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const QUELLE = arg('quelle', 'public/blog');
const ZIEL = arg('ziel', 'Blogs/Bilder-neu');
const BREITE = Number(arg('breite', '1536'));
const NUR = arg('nur', '');

if (!Number.isInteger(BREITE) || BREITE < 800 || BREITE > 2752) {
  console.error(`ABBRUCH: --breite ${BREITE} liegt ausserhalb 800..2752.`);
  process.exit(1);
}

const mb = (b) => (b / 1048576).toFixed(2);

let dateien;
try {
  dateien = (await readdir(QUELLE)).filter((f) => f.endsWith('-titelbild.png')).sort();
} catch {
  console.error(`ABBRUCH: Quellordner nicht lesbar: ${QUELLE}`);
  process.exit(1);
}

if (NUR) {
  const muster = NUR.split(',').map((s) => s.trim()).filter(Boolean);
  dateien = dateien.filter((f) => muster.some((m) => f.includes(m)));
}

if (dateien.length === 0) {
  console.error(`ABBRUCH: keine *-titelbild.png in ${QUELLE}`);
  process.exit(1);
}

await mkdir(ZIEL, { recursive: true });

console.log('');
console.log(`Quelle : ${QUELLE}`);
console.log(`Ziel   : ${ZIEL}`);
console.log(`Breite : ${BREITE} px, PNG verlustfrei, Resampler: sharp (wie next/image)`);
console.log(`Dateien: ${dateien.length}`);
console.log('');

const zeilen = [];
let i = 0;

for (const name of dateien) {
  i += 1;
  const quellPfad = join(QUELLE, name);
  const zielPfad = join(ZIEL, name);

  let existiert = false;
  try { await stat(zielPfad); existiert = true; } catch { /* gibt es noch nicht */ }
  if (existiert) {
    console.log(`[${i}/${dateien.length}] UEBERSPRUNGEN (Ziel existiert): ${name}`);
    continue;
  }

  const vorMeta = await sharp(quellPfad).metadata();
  const vorBytes = (await stat(quellPfad)).size;

  if (vorMeta.width <= BREITE) {
    console.log(`[${i}/${dateien.length}] UEBERSPRUNGEN (schon ${vorMeta.width} px breit): ${name}`);
    continue;
  }

  await sharp(quellPfad)
    .resize({ width: BREITE, withoutEnlargement: true, kernel: 'lanczos3' })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(zielPfad);

  const nachMeta = await sharp(zielPfad).metadata();
  const nachBytes = (await stat(zielPfad)).size;

  const erwarteteHoehe = Math.round((vorMeta.height * BREITE) / vorMeta.width);
  const warnung = [];
  if (nachMeta.width !== BREITE) warnung.push(`BREITE ${nachMeta.width} statt ${BREITE}`);
  if (Math.abs(nachMeta.height - erwarteteHoehe) > 1) warnung.push(`HOEHE ${nachMeta.height} statt ~${erwarteteHoehe}`);
  if (nachBytes >= vorBytes) warnung.push('NICHT KLEINER');
  if (nachMeta.format !== 'png') warnung.push(`FORMAT ${nachMeta.format}`);
  if (vorMeta.hasAlpha !== nachMeta.hasAlpha) warnung.push('ALPHAKANAL WEICHT AB');

  const faktor = (vorBytes / nachBytes).toFixed(2);
  const marke = warnung.length ? `  ${warnung.join(' | ')}` : '';
  console.log(
    `[${i}/${dateien.length}] ${name}` +
    `\n        ${vorMeta.width}x${vorMeta.height}  ${mb(vorBytes)} MB` +
    `  ->  ${nachMeta.width}x${nachMeta.height}  ${mb(nachBytes)} MB  Faktor ${faktor}x${marke}`,
  );

  zeilen.push({
    Datei: name,
    VorMB: Number(mb(vorBytes)),
    NachMB: Number(mb(nachBytes)),
    Faktor: Number(faktor),
    VorBreite: vorMeta.width,
    NachBreite: nachMeta.width,
    NachHoehe: nachMeta.height,
    Warnung: warnung.join(' | '),
  });
}

console.log('');
console.log('================= BILANZ =================');
console.table(zeilen);

const vorSum = zeilen.reduce((s, z) => s + z.VorMB, 0);
const nachSum = zeilen.reduce((s, z) => s + z.NachMB, 0);
if (vorSum > 0) {
  console.log(`Summe vorher : ${vorSum.toFixed(1)} MB`);
  console.log(
    `Summe nachher: ${nachSum.toFixed(1)} MB   ` +
    `(${(100 - (nachSum / vorSum) * 100).toFixed(0)} % gespart, Faktor ${(vorSum / nachSum).toFixed(2)}x)`,
  );
}

const problem = zeilen.filter((z) => z.Warnung);
console.log('');
if (problem.length) {
  console.log(`ACHTUNG - ${problem.length} Datei(en) mit Warnung. NICHT ins Repo uebernehmen,`);
  console.log('bevor die Ursache geklaert ist:');
  problem.forEach((z) => console.log(`   ${z.Datei}: ${z.Warnung}`));
} else {
  console.log('Keine Warnungen.');
}

console.log('');
console.log('NAECHSTER SCHRITT - nichts wurde im Repo geaendert.');
console.log(`  1. Zwei bis drei Bilder aus ${ZIEL} gegen die Originale ansehen.`);
console.log('     Empfehlung: die groesste Datei (bremsweg) und eine mit feiner Zeichnung.');
console.log('  2. Erst danach die Folgewelle, die sie ins Repo uebernimmt und die');
console.log('     KI-Kennzeichnung neu schreibt.');
