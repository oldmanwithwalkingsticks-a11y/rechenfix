/**
 * W17A.3 Hotfix-Verify — Roundtrip-Test für getCurrentBioSlug /
 * setCurrentBioSlug mit dem REST-Bypass.
 *
 * Hintergrund: Karsten-Debug-Log am 06.06.2026 zeigte, dass die
 * `@upstash/redis`-SDK auch mit `automaticDeserialization: false`
 * bei rohen Strings null zurückgibt. Pfad-A-Fix: Bio-Slug geht
 * direkt über die Upstash-REST-API mit `fetch`, SDK komplett umgangen.
 *
 * Dieses Script verifiziert drei Schreibwege:
 *
 * 1. Pipeline-Pfad: setCurrentBioSlug → getCurrentBioSlug
 *    (beide gehen jetzt über REST)
 * 2. CLI-äquivalent: direkter REST-SET roh → getCurrentBioSlug
 * 3. CLI-äquivalent mit Outer-Quotes: REST-SET „"slug"" → getCurrentBioSlug
 *    (sollte vom Outer-Quotes-Unescape-Helper abgefangen werden)
 *
 * Aufruf:
 *   node --env-file=.env.local --import tsx/esm scripts/test-bio-slug.ts
 *
 * Setzt am Ende den ursprünglichen Wert zurück oder löscht ihn,
 * damit die Live-Pipeline unverändert weiterläuft.
 */

import { setCurrentBioSlug, getCurrentBioSlug } from '../lib/social/state';

const KEY = 'social:current-bio-slug';

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
if (!url || !token) {
  console.error(
    'FEHLER: KV_REST_API_URL oder KV_REST_API_TOKEN nicht gesetzt.\n' +
      'Tipp: --env-file=.env.local benutzen oder Vars explizit exportieren.',
  );
  process.exit(1);
}

// Direkte REST-Helpers für die CLI-äquivalenten Test-Schreibwege.
async function restGet(key: string): Promise<string | null> {
  const res = await fetch(`${url!}/get/${encodeURIComponent(key)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token!}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`REST GET HTTP ${res.status}`);
  const json = (await res.json()) as { result?: string | null };
  return typeof json.result === 'string' ? json.result : null;
}
async function restSet(key: string, value: string): Promise<void> {
  const res = await fetch(url!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['SET', key, value]),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`REST SET HTTP ${res.status}: ${await res.text()}`);
}
async function restDel(key: string): Promise<void> {
  const res = await fetch(url!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['DEL', key]),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`REST DEL HTTP ${res.status}`);
}

async function main(): Promise<void> {
  // Vorhandenen Wert sichern.
  const before = await restGet(KEY);
  console.log(`Vor Test: ${KEY} = ${JSON.stringify(before)}`);

  const tests: Array<{
    name: string;
    write: () => Promise<void>;
    expectedRead: string;
  }> = [
    {
      name: 'Pipeline-Pfad: setCurrentBioSlug → getCurrentBioSlug',
      write: async () => {
        await setCurrentBioSlug('test-slug-sdk');
      },
      expectedRead: 'test-slug-sdk',
    },
    {
      name: 'Raw CLI-äquivalent (roher String ohne Quotes via REST)',
      write: async () => {
        await restSet(KEY, 'test-slug-raw');
      },
      expectedRead: 'test-slug-raw',
    },
    {
      name: 'Raw CLI-äquivalent mit Outer-Quotes (JSON-wrapped via REST)',
      write: async () => {
        await restSet(KEY, '"test-slug-quoted"');
      },
      expectedRead: 'test-slug-quoted',
    },
  ];

  let pass = 0;
  let fail = 0;
  for (const t of tests) {
    process.stdout.write(`  ${t.name.padEnd(64)} `);
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
  if (before === null) {
    await restDel(KEY);
    console.log(`\nNach Test: ${KEY} gelöscht (vorher nicht vorhanden).`);
  } else {
    await restSet(KEY, before);
    console.log(`\nNach Test: ${KEY} restored auf ${JSON.stringify(before)}.`);
  }

  console.log(`\nResult: ${pass} pass / ${fail} fail`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
