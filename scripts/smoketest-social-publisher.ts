/**
 * Lokal-Smoketest für die Publisher-Datenauflösung (kein API-Call).
 * Verifiziert: Queue → Rechner-Config → Caption-Stub-Lookup
 * → SocialPost-Build wäre möglich (wenn captions.json gefüllt).
 *
 * Aufruf: npx tsx scripts/smoketest-social-publisher.ts
 */

import { rechner } from '../lib/rechner-config';
import queueFile from '../lib/social/queue.json';
import captionsFile from '../lib/social/captions.json';

const q = queueFile.queue;
const c = (captionsFile.captions ?? {}) as Record<string, unknown>;

console.log('Queue length:        ', q.length);
console.log('Captions filled:     ', Object.keys(c).length);

let resolvable = 0;
let captionMissing = 0;
let rechnerMissing = 0;
for (const slug of q) {
  const r = rechner.find((x) => x.slug === slug);
  const cap = c[slug];
  if (!r) rechnerMissing++;
  else if (!cap) captionMissing++;
  else resolvable++;
}
console.log('Resolvable (r + c):  ', resolvable);
console.log('Caption-Lücken:      ', captionMissing);
console.log('Rechner-Lücken:      ', rechnerMissing);

console.log('\nErste 3 Queue-Slugs mit Resolve-Status:');
for (const slug of q.slice(0, 3)) {
  const r = rechner.find((x) => x.slug === slug);
  const url = r ? `https://www.rechenfix.de/${r.kategorieSlug}/${r.slug}` : '—';
  console.log(`  ${slug.padEnd(35)} url=${url}`);
}
