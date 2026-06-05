/**
 * W17A.3 Hotfix-Verify — Roundtrip-Test für getCurrentBioSlug /
 * setCurrentBioSlug mit beiden Schreibwegen.
 *
 * Hintergrund: Karsten-Debug-Log am 06.06.2026 ergab, dass die alte
 * `redis`-Instance (Auto-JSON-Deserialization) bei rohem CLI-SET ohne
 * Quotes `null` zurückgab. Der Fix nutzt `redisRaw` (Auto-Deserial
 * aus) und schreibt rohe Strings. Dieses Script verifiziert, dass:
 *
 * 1. SDK-Write (setCurrentBioSlug) → SDK-Read (getCurrentBioSlug) roundtrip ✓
 * 2. CLI-äquivalent: roh-String via redisRaw.set → getCurrentBioSlug ✓
 * 3. CLI-äquivalent mit Outer-Quotes: "slug" → getCurrentBioSlug ✓ (unescaped)
 *
 * Aufruf:
 *   KV_REST_API_URL=… KV_REST_API_TOKEN=… npx tsx scripts/test-bio-slug.ts
 * oder
 *   node --env-file=.env.local --import tsx/esm scripts/test-bio-slug.ts
 *
 * Setzt am Ende den Test-Wert zurück auf den vorhandenen oder löscht ihn.
 */

import { redisRaw } from '../lib/redis';
import { setCurrentBioSlug, getCurrentBioSlug } from '../lib/social/state';

const KEY = 'social:current-bio-slug';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  console.error(
    'FEHLER: KV_REST_API_URL oder KV_REST_API_TOKEN nicht gesetzt.\n' +
      'Tipp: --env-file=.env.local benutzen oder Vars explizit exportieren.',
  );
  process.exit(1);
}

async function main(): Promise<void> {
  // Vorhandenen Wert sichern, damit wir am Ende restoren können.
  const before = await redisRaw.get(KEY);
  console.log(`Vor Test: ${KEY} = ${JSON.stringify(before)}`);

  const tests: Array<{
    name: string;
    write: () => Promise<void>;
    expectedRead: string;
  }> = [
    {
      name: 'SDK-Write via setCurrentBioSlug (Pipeline-Pfad)',
      write: async () => {
        await setCurrentBioSlug('test-slug-sdk');
      },
      expectedRead: 'test-slug-sdk',
    },
    {
      name: 'Raw CLI-äquivalent (roher String ohne Quotes)',
      write: async () => {
        await redisRaw.set(KEY, 'test-slug-raw');
      },
      expectedRead: 'test-slug-raw',
    },
    {
      name: 'Raw CLI-äquivalent mit Outer-Quotes (JSON-wrapped)',
      write: async () => {
        await redisRaw.set(KEY, '"test-slug-quoted"');
      },
      expectedRead: 'test-slug-quoted',
    },
  ];

  let pass = 0;
  let fail = 0;
  for (const t of tests) {
    process.stdout.write(`  ${t.name.padEnd(60)} `);
    try {
      await t.write();
      const got = await getCurrentBioSlug();
      if (got === t.expectedRead) {
        process.stdout.write(`✓ ${got}\n`);
        pass++;
      } else {
        process.stdout.write(`✗ got=${JSON.stringify(got)} want=${t.expectedRead}\n`);
        fail++;
      }
    } catch (err) {
      process.stdout.write(`✗ EXCEPTION: ${err instanceof Error ? err.message : String(err)}\n`);
      fail++;
    }
  }

  // Restore.
  if (before === null || before === undefined) {
    await redisRaw.del(KEY);
    console.log(`\nNach Test: ${KEY} gelöscht (vorher nicht vorhanden).`);
  } else {
    // before kommt als raw string aus redisRaw, also direkt zurücksetzen.
    await redisRaw.set(KEY, String(before));
    console.log(`\nNach Test: ${KEY} restored auf ${JSON.stringify(before)}.`);
  }

  console.log(`\nResult: ${pass} pass / ${fail} fail`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
