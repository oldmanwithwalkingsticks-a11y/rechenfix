/**
 * W17A.1.F-Helper — Dumpt die für den Python-Image-Builder relevanten
 * Felder aller 170 Rechner als JSON nach lib/social/_rechner-snapshot.json.
 *
 * Aufruf:
 *   npx tsx scripts/dump-rechner-data.ts
 *
 * Wird vor jedem social-image-builder.py-Run aufgerufen, damit das
 * Python-Script die TS-Configs nicht parsen muss.
 *
 * Output-Schema (slug → { kategorieSlug, titel, icon, beispiel, beschreibung }).
 * In .gitignore, wird pro Build neu erzeugt — analog client-data.ts-Pattern.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { rechner } from '../lib/rechner-config';

const OUTPUT_PATH = './lib/social/_rechner-snapshot.json';

const snapshot: Record<string, {
  kategorieSlug: string;
  titel: string;
  icon: string;
  beispiel: string;
  beschreibung: string;
}> = {};

for (const r of rechner) {
  snapshot[r.slug] = {
    kategorieSlug: r.kategorieSlug,
    titel: r.titel,
    icon: r.icon ?? '📊',
    beispiel: r.beispiel ?? '',
    beschreibung: r.beschreibung ?? '',
  };
}

const payload = {
  version: 1,
  generatedFor: 'scripts/social-image-builder.py',
  rechner: snapshot,
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n');

console.log(`Snapshot (${Object.keys(snapshot).length} Rechner) → ${OUTPUT_PATH}`);
