/**
 * W17A.1.F — Verifiziert, dass die Keys in lib/social/kategorie-farben.json
 * exakt den im Repo verwendeten kategorieSlug-Werten entsprechen. Bei Drift
 * exit 1 — sonst würde sich der Image-Builder still auf eine Default-Farbe
 * zurückfallen, ohne Hinweis.
 *
 * Aufruf: npx tsx scripts/verify-kategorie-slugs.ts
 *
 * Pflicht-Trigger:
 * - Neue Kategorie wurde im Repo angelegt
 * - Eine Kategorie wurde umbenannt
 * - Vor jedem Image-Builder-Run
 */

import farbenFile from '../lib/social/kategorie-farben.json';
import { rechner, kategorien } from '../lib/rechner-config';

const FARBEN_KEYS = Object.keys(farbenFile.farben);

// 1) Sammele alle eindeutigen kategorieSlug-Werte aus den 170 Rechnern
const slugsAusRechnern = Array.from(new Set(rechner.map((r) => r.kategorieSlug))).sort();

// 2) Sammele alle kategorien[]-Slugs aus index.ts (separate SSOT-Liste)
const slugsAusKategorienListe = kategorien.map((k) => k.slug).sort();

const farbenKeysSorted = [...FARBEN_KEYS].sort();

console.log('--- Map-Keys (KATEGORIE_FARBEN) ---');
console.log('  ', farbenKeysSorted.join(', '));
console.log('--- kategorieSlug aus rechner[] (170 Configs) ---');
console.log('  ', slugsAusRechnern.join(', '));
console.log('--- kategorien[]-Slugs (separate SSOT) ---');
console.log('  ', slugsAusKategorienListe.join(', '));

const missingFromFarben = slugsAusRechnern.filter((s) => !FARBEN_KEYS.includes(s));
const missingFromRepo = FARBEN_KEYS.filter((s) => !slugsAusRechnern.includes(s));

const kategorienVsRechner = {
  inKategorienNotInRechner: slugsAusKategorienListe.filter((s) => !slugsAusRechnern.includes(s)),
  inRechnerNotInKategorien: slugsAusRechnern.filter((s) => !slugsAusKategorienListe.includes(s)),
};

console.log('\n--- Verifikation ---');

if (missingFromFarben.length > 0) {
  console.error(`✗ FEHLER: kategorieSlug im Repo, aber NICHT in FARBEN_KEYS: ${missingFromFarben.join(', ')}`);
  console.error('  → Image-Builder würde diese Kategorie auf Default-Farbe abbilden.');
}
if (missingFromRepo.length > 0) {
  console.error(`✗ FEHLER: FARBEN_KEYS-Eintrag, aber kein Rechner mit diesem kategorieSlug: ${missingFromRepo.join(', ')}`);
  console.error('  → Farb-Eintrag ist tot. Tippfehler?');
}
if (kategorienVsRechner.inKategorienNotInRechner.length > 0) {
  console.warn(`⚠ kategorien[]-Eintrag ohne Rechner: ${kategorienVsRechner.inKategorienNotInRechner.join(', ')}`);
}
if (kategorienVsRechner.inRechnerNotInKategorien.length > 0) {
  console.error(`✗ Rechner-kategorieSlug fehlt in kategorien[]: ${kategorienVsRechner.inRechnerNotInKategorien.join(', ')}`);
}

if (missingFromFarben.length === 0 && missingFromRepo.length === 0) {
  console.log('✓ FARBEN_KEYS deckt 9/9 kategorieSlug-Werte exakt');
  process.exit(0);
} else {
  process.exit(1);
}
