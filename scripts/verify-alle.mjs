#!/usr/bin/env node
/**
 * Führt alle Prüfskripte scripts/verify-*.ts aus und meldet, welche rot sind.
 *
 * Anlass (Welle 186): Zehn Prüfskripte waren über Monate rot, ohne dass es auffiel, weil prebuild
 * nur drei davon ausführt. Dieses Skript ist das Sammel-Gate für jede Welle.
 *
 * Läuft außerdem in GitHub Actions bei jedem Push auf main und täglich, in Europe/Berlin und UTC
 * (.github/workflows/pruefskripte.yml).
 *
 * Aufruf:  npm run verify:alle            (alle)
 *          node scripts/verify-alle.mjs elternzeit urlaub   (nur Dateien, deren Name einen der Begriffe enthält)
 * Exit 0 = alle grün, Exit 1 = mindestens eines rot (Liste am Ende).
 */
import { readdirSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsxCli = join(wurzel, 'node_modules', 'tsx', 'dist', 'cli.mjs');
// tsx ist feste devDependency (package.json). Fehlt er in node_modules, wären sonst alle Skripte rot
// mit „Cannot find module“ — deshalb vorher ein klarer Hinweis.
if (!existsSync(tsxCli)) {
  console.error('tsx fehlt in node_modules. Erst „npm install“ ausführen (tsx steht seit Welle 186 in den devDependencies).');
  process.exit(1);
}
const filter = process.argv.slice(2).map((s) => s.toLowerCase());
const dateien = readdirSync(join(wurzel, 'scripts'))
  .filter((d) => /^verify-.+\.ts$/.test(d))
  .filter((d) => filter.length === 0 || filter.some((f) => d.toLowerCase().includes(f)))
  .sort();

const parallel = Math.max(1, Math.min(4, cpus().length));
const ZEITLIMIT_MS = 300_000;

function letzteZeile(text) {
  const zeilen = text.split(/\r?\n/).map((z) => z.trim()).filter(Boolean);
  return (zeilen[zeilen.length - 1] ?? '').slice(0, 140);
}

function lauf(datei) {
  return new Promise((resolve) => {
    const kind = spawn(process.execPath, [tsxCli, join('scripts', datei)], { cwd: wurzel, env: process.env });
    let ausgabe = '';
    kind.stdout.on('data', (d) => { ausgabe += d; });
    kind.stderr.on('data', (d) => { ausgabe += d; });
    const timer = setTimeout(() => { kind.kill(); ausgabe += '\nZEITLIMIT überschritten'; }, ZEITLIMIT_MS);
    kind.on('close', (code) => {
      clearTimeout(timer);
      resolve({ datei, code: code ?? 1, ausgabe });
    });
  });
}

const ergebnisse = [];
let naechste = 0;
async function arbeiter() {
  while (naechste < dateien.length) {
    const d = dateien[naechste++];
    const e = await lauf(d);
    ergebnisse.push(e);
    console.log(`${e.code === 0 ? '✓' : '✗'} ${d.padEnd(46)} ${letzteZeile(e.ausgabe)}`);
  }
}
await Promise.all(Array.from({ length: parallel }, arbeiter));

const rot = ergebnisse.filter((e) => e.code !== 0).sort((a, b) => a.datei.localeCompare(b.datei));
console.log('');
console.log(`Prüfskripte: ${ergebnisse.length - rot.length}/${ergebnisse.length} grün${rot.length ? `, ${rot.length} rot:` : '.'}`);
for (const e of rot) {
  console.log(`\n✗ ${e.datei} (Exit ${e.code})`);
  const zeilen = e.ausgabe.split(/\r?\n/).filter((z) => /✗|FAIL|FEHL|Error|DIFF|ZEITLIMIT/.test(z)).slice(0, 15);
  for (const z of zeilen) console.log(`    ${z.trim().slice(0, 200)}`);
}
process.exit(rot.length ? 1 : 0);
