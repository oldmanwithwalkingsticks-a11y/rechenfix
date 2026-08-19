#!/usr/bin/env node
// Zweitkanal zur taeglichen Health-Check-Mail: warnt im Build-Log, wenn ein
// Termin faellig oder ueberfaellig ist.
// Aufruf: node scripts/check-termine.mjs   /   npm run lint:termine
//
// NIEMALS Exit-Code != 0. Ein Termin ist eine Erinnerung, kein Fehler — er darf
// keinen Deploy blockieren. Gleiches Vorgehen wie die Preis-Freshness-Pruefung
// am Kopf von scripts/check-jahreswerte.mjs.
//
// lib/termine.ts ist TypeScript, dieses Skript ist reines Node: die Eintraege
// werden per Regex ausgelesen, nicht importiert. Gelesen werden nur die Felder,
// die fuer die Faelligkeit noetig sind (id, titel, datum, vorlaufTage,
// wiederholungMonate) — Fliesstextfelder bleiben der Mail vorbehalten.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATEI = 'lib/termine.ts';

const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

/** Ein Objektliteral aus der TERMINE-Liste in die noetigen Felder zerlegen. */
function lesen(block) {
  const feld = (name) => {
    const m = block.match(new RegExp(`${name}:\\s*'([^']*)'`));
    return m ? m[1] : null;
  };
  const zahl = (name) => {
    const m = block.match(new RegExp(`${name}:\\s*(\\d+)`));
    return m ? Number(m[1]) : null;
  };
  const id = feld('id');
  const datum = feld('datum');
  if (!id || !datum) return null;
  return {
    id,
    titel: feld('titel') ?? id,
    datum,
    vorlaufTage: zahl('vorlaufTage') ?? 0,
    wiederholungMonate: zahl('wiederholungMonate'),
  };
}

/**
 * Naechstes Vorkommen. Bewusst dieselbe Kappung auf das Monatsende wie in
 * lib/termine.ts — sonst weicht diese Ausgabe von der Mail ab, und zwei Kanaele,
 * die verschiedene Daten nennen, sind schlimmer als einer.
 */
function naechstesVorkommen(t, heuteMs) {
  if (!t.wiederholungMonate) return t.datum;
  const start = new Date(`${t.datum}T00:00:00Z`);
  const ankerTag = start.getUTCDate();
  let jahr = start.getUTCFullYear();
  let monat = start.getUTCMonth();

  const bauen = () => {
    const letzterTag = new Date(Date.UTC(jahr, monat + 1, 0)).getUTCDate();
    const d = new Date(Date.UTC(jahr, monat, Math.min(ankerTag, letzterTag)));
    return { iso: d.toISOString().slice(0, 10), zeit: d.getTime() };
  };

  let aktuell = bauen();
  let schutz = 0;
  while (aktuell.zeit < heuteMs && schutz < 600) {
    monat += t.wiederholungMonate;
    jahr += Math.floor(monat / 12);
    monat = ((monat % 12) + 12) % 12;
    aktuell = bauen();
    schutz++;
  }
  return aktuell.iso;
}

let quelltext;
try {
  quelltext = readFileSync(join(ROOT, DATEI), 'utf8');
} catch {
  console.warn(`${YELLOW}⚠ ${DATEI} nicht lesbar — die Terminpruefung laeuft ins Leere.${RESET}`);
  process.exit(0);
}

const liste = quelltext.split('export const TERMINE')[1] ?? '';
const termine = [...liste.matchAll(/\{([^{}]*)\}/g)]
  .map((m) => lesen(m[1]))
  .filter(Boolean);

if (termine.length === 0) {
  console.warn(
    `${YELLOW}⚠ Keine Eintraege in ${DATEI} erkannt — die Terminpruefung laeuft ins Leere. ` +
      `Vermutlich hat sich die Schreibweise der Liste geaendert.${RESET}`,
  );
  process.exit(0);
}

const heuteIso = new Date().toISOString().slice(0, 10);
const heuteMs = new Date(`${heuteIso}T00:00:00Z`).getTime();

const treffer = [];
for (const t of termine) {
  const datum = naechstesVorkommen(t, heuteMs);
  const tage = Math.round((new Date(`${datum}T00:00:00Z`).getTime() - heuteMs) / 86400000);
  if (tage < 0) treffer.push({ t, datum, tage, ueberfaellig: true });
  else if (tage <= t.vorlaufTage) treffer.push({ t, datum, tage, ueberfaellig: false });
}

if (treffer.length > 0) {
  treffer.sort((a, b) => a.tage - b.tage);
  console.warn(
    `${YELLOW}⚠ ${treffer.length} Termine faellig — Details in der taeglichen Health-Check-Mail.${RESET}`,
  );
  for (const e of treffer) {
    const text = e.ueberfaellig
      ? `🔴 ${e.t.id} — ueberfaellig seit ${Math.abs(e.tage)} Tagen (${e.datum})`
      : `🟡 ${e.t.id} — in ${e.tage} Tagen (${e.datum})`;
    console.warn(`${YELLOW}  ${text}${RESET}`);
  }
}

process.exit(0);
