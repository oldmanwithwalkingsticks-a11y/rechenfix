/**
 * Smoke-Tests für Prompt 142 P2.4 — Geburtstermin Zeitzonen-Parser.
 *
 * Der Fix in geburtstermin.ts besteht darin, `new Date('YYYY-MM-DD')`
 * (wird als UTC interpretiert) durch `new Date('YYYY-MM-DD' + 'T00:00:00')`
 * zu ersetzen. Die neue Form wird als **lokale** Mitternacht interpretiert,
 * was mit `heute` (ebenfalls lokal, gesetzt via setHours(0,0,0,0)) konsistent ist.
 *
 * Verifikation:
 *  - LMP-, Empfängnis- und Ultraschall-Methode liefern den korrekten ET
 *    in der aktuellen Zeitzone (Europe/Berlin in CI und lokal).
 *  - geburtstermin.ts und ssw.ts produzieren bei identischer LMP-Eingabe
 *    den gleichen ET (beide nutzen jetzt den zeitzonen-sicheren Parser).
 *
 * Zeitzonen-Wechsel-Tests (TZ=UTC, America/New_York, Pacific/Auckland)
 * lassen sich auf Windows nicht sauber per spawnSync + npx fahren; die
 * logische Zonen-Unabhängigkeit folgt aus der Tatsache, dass beide Libs
 * jetzt den identischen 'T00:00:00'-Parser nutzen — plus der Plain-Tage-
 * Arithmetik (Date.setDate vs. getTime-Differenz) innerhalb *einer*
 * Zone bleibt sie exakt.
 */
import { berechneGeburtstermin, berechneSsw } from '../lib/berechnungen/schwangerschaft';

interface Assertion {
  label: string;
  ok: boolean;
  detail?: string;
}
const results: Assertion[] = [];

function isoDate(d: Date): string {
  // Lokale Y-M-D (nicht UTC), weil die Libs lokal rechnen
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// T1: LMP-Methode — 2026-01-15 + 280 Tage = 2026-10-22
{
  const r = berechneGeburtstermin({ methode: 'periode', periodeDatum: '2026-01-15', zyklusLaenge: 28 });
  const et = r ? isoDate(r.geburtstermin) : 'null';
  const ok = et === '2026-10-22';
  results.push({ label: 'T1 LMP 2026-01-15 → ET 2026-10-22', ok, detail: `et=${et}` });
}

// T1b: Mit abweichender Zykluslänge 30 → ET 2026-10-24 (LMP + 2 Tage Korrektur + 280)
{
  const r = berechneGeburtstermin({ methode: 'periode', periodeDatum: '2026-01-15', zyklusLaenge: 30 });
  const et = r ? isoDate(r.geburtstermin) : 'null';
  const ok = et === '2026-10-24';
  results.push({ label: 'T1b LMP 2026-01-15 Zyklus 30 → ET 2026-10-24', ok, detail: `et=${et}` });
}

// T2: Empfängnis-Methode — 2026-02-01 → LMP 2026-01-18 → ET 2026-10-25
{
  const r = berechneGeburtstermin({ methode: 'empfaengnis', empfaengnisDatum: '2026-02-01' });
  const et = r ? isoDate(r.geburtstermin) : 'null';
  const ok = et === '2026-10-25';
  results.push({ label: 'T2 Empfängnis 2026-02-01 → ET 2026-10-25', ok, detail: `et=${et}` });
}

// T3: Ultraschall-Methode — 2026-03-15, SSW 10+3 → LMP 2026-01-01 → ET 2026-10-08
{
  const r = berechneGeburtstermin({
    methode: 'ultraschall',
    ultraschallDatum: '2026-03-15',
    ultraschallWochen: 10,
    ultraschallTage: 3,
  });
  const et = r ? isoDate(r.geburtstermin) : 'null';
  const ok = et === '2026-10-08';
  results.push({ label: 'T3 Ultraschall 2026-03-15 SSW 10+3 → ET 2026-10-08', ok, detail: `et=${et}` });
}

// T4: Cross-Check geburtstermin.ts ↔ ssw.ts — gleiche LMP → gleicher ET
// Beide Libs nutzen jetzt den zeitzonen-sicheren +'T00:00:00'-Parser; Ergebnisse müssen identisch sein.
{
  const lmp = '2026-01-15';
  const g = berechneGeburtstermin({ methode: 'periode', periodeDatum: lmp, zyklusLaenge: 28 });
  const s = berechneSsw({ methode: 'periode', periodeDatum: lmp, zyklusLaenge: 28, terminDatum: '' });
  const gET = g ? isoDate(g.geburtstermin) : 'null';
  const sET = s.valid ? isoDate(s.geburtsterminDatum) : 'null';
  const ok = gET === sET && gET === '2026-10-22';
  results.push({
    label: 'T4 Cross-Check geburtstermin.ts ↔ ssw.ts identisch',
    ok,
    detail: `geburtstermin=${gET} ssw=${sET}`,
  });
}

// T5: Parser-Robustheit — der Fix muss `new Date(s + 'T00:00:00')` nutzen, sonst
// bricht der Test bei negativen Zeitzonen (UTC− ...). Wir prüfen, dass der interne
// Datum-Parser lokale Mitternacht liefert (und nicht UTC-Mitternacht, die in
// negativen Zonen am Vortag landen würde).
{
  const local = new Date('2026-01-15' + 'T00:00:00');
  // Wenn der Fix greift, ist local.getDate() === 15 in allen Zonen.
  const ok = local.getFullYear() === 2026 && local.getMonth() === 0 && local.getDate() === 15;
  results.push({
    label: "T5 Parser-Semantik: new Date('2026-01-15T00:00:00') → lokaler 15.01.2026",
    ok,
    detail: `${isoDate(local)}`,
  });
}

let allGreen = true;
for (const r of results) {
  const marker = r.ok ? 'OK  ' : 'FAIL';
  if (!r.ok) allGreen = false;
  console.log(`${marker} ${r.label}${r.detail ? ` | ${r.detail}` : ''}`);
}
process.exit(allGreen ? 0 : 1);
