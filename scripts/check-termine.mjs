#!/usr/bin/env node
// Zweitkanal zur taeglichen Health-Check-Mail: warnt im Build-Log, wenn ein
// Termin faellig oder ueberfaellig ist.
// Aufruf: node scripts/check-termine.mjs   /   npm run lint:termine
//   --heute YYYY-MM-DD  ersetzt den heutigen Tag (UTC)
//   --json              gibt auf stdout genau ein JSON-Array
//                       [{ id, datum, tage, ueberfaellig }] aus, ohne Farbcodes;
//                       Warnungen gehen dann auf stderr. Gelesen von
//                       scripts/verify-termine.ts (Paritaet mit lib/termine.ts).
//
// NIEMALS Exit-Code != 0. Ein Termin ist eine Erinnerung, kein Fehler — er darf
// keinen Deploy blockieren. Gleiches Vorgehen wie die Preis-Freshness-Pruefung
// am Kopf von scripts/check-jahreswerte.mjs.
//
// lib/termine.ts ist TypeScript, dieses Skript ist reines Node: die Eintraege
// werden per Regex ausgelesen, nicht importiert. Gelesen werden nur die Felder,
// die fuer die Faelligkeit noetig sind (id, titel, datum, vorlaufTage,
// wiederholungMonate, quittiertVorkommen, quittiertAm; von quittungVermerk nur,
// ob es gesetzt ist) — Fliesstextfelder bleiben der Mail vorbehalten. Dazu
// QUITTUNGSPFLICHT_AB, ebenfalls per Regex.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATEI = 'lib/termine.ts';

const args = process.argv.slice(2);
const JSON_MODUS = args.includes('--json');
const heuteArg = args.includes('--heute') ? args[args.indexOf('--heute') + 1] : null;

const YELLOW = JSON_MODUS ? '' : '\x1b[33m';
const RESET = JSON_MODUS ? '' : '\x1b[0m';

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
    quittiertVorkommen: feld('quittiertVorkommen'),
    quittiertAm: feld('quittiertAm'),
    hatVermerk: /quittungVermerk:\s*'/.test(block),
  };
}

const tagMs = (iso) => new Date(`${iso}T00:00:00Z`).getTime();

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

/**
 * Das Vorkommen, das als naechstes erledigt werden muss — dieselbe Form wie
 * offenesVorkommen in lib/termine.ts. Haengt nicht vom heutigen Tag ab.
 */
function offenesVorkommen(t, quittungspflichtAb) {
  if (!t.wiederholungMonate) return t.datum;
  let grenze = quittungspflichtAb;
  if (t.quittiertVorkommen) {
    const tagDanach = new Date(tagMs(t.quittiertVorkommen) + 86400000).toISOString().slice(0, 10);
    if (tagDanach > grenze) grenze = tagDanach;
  }
  return naechstesVorkommen(t, tagMs(grenze));
}

let quelltext;
try {
  quelltext = readFileSync(join(ROOT, DATEI), 'utf8');
} catch {
  console.warn(`${YELLOW}⚠ ${DATEI} nicht lesbar — die Terminpruefung laeuft ins Leere.${RESET}`);
  process.exit(0);
}

const pflicht = quelltext.match(/QUITTUNGSPFLICHT_AB\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
if (!pflicht) {
  console.warn(
    `${YELLOW}⚠ QUITTUNGSPFLICHT_AB in ${DATEI} nicht gefunden — die Terminpruefung laeuft ins Leere.${RESET}`,
  );
  process.exit(0);
}
const QUITTUNGSPFLICHT_AB = pflicht[1];

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

const heuteIso = heuteArg && /^\d{4}-\d{2}-\d{2}$/.test(heuteArg)
  ? heuteArg
  : new Date().toISOString().slice(0, 10);
const heuteMs = tagMs(heuteIso);

// Pruefung der Quittungen — nur Warnung, nie ein Exit-Code.
const quittungsWarnungen = [];
for (const t of termine) {
  const felder = [t.quittiertVorkommen, t.quittiertAm, t.hatVermerk ? 'ja' : null];
  const gesetzt = felder.filter(Boolean).length;
  if (gesetzt === 0) continue;
  if (!t.wiederholungMonate) {
    quittungsWarnungen.push(`${t.id}: Quittungsfeld an einem Einmaltermin`);
    continue;
  }
  if (gesetzt < 3) {
    quittungsWarnungen.push(`${t.id}: nicht alle drei Quittungsfelder gesetzt (quittiertVorkommen, quittiertAm, quittungVermerk)`);
  }
  if (t.quittiertVorkommen && naechstesVorkommen(t, tagMs(t.quittiertVorkommen)) !== t.quittiertVorkommen) {
    quittungsWarnungen.push(`${t.id}: quittiertVorkommen ${t.quittiertVorkommen} ist kein tatsaechliches Vorkommen`);
  }
  if (t.quittiertAm && t.quittiertAm > heuteIso) {
    quittungsWarnungen.push(`${t.id}: quittiertAm ${t.quittiertAm} liegt nach heute (${heuteIso})`);
  }
}
for (const w of quittungsWarnungen) console.warn(`${YELLOW}⚠ Quittung: ${w}${RESET}`);

const treffer = [];
for (const t of termine) {
  const datum = offenesVorkommen(t, QUITTUNGSPFLICHT_AB);
  const tage = Math.round((tagMs(datum) - heuteMs) / 86400000);
  if (tage < 0) treffer.push({ t, datum, tage, ueberfaellig: true });
  else if (tage <= t.vorlaufTage) treffer.push({ t, datum, tage, ueberfaellig: false });
}
treffer.sort((a, b) => a.tage - b.tage);

if (JSON_MODUS) {
  process.stdout.write(
    JSON.stringify(treffer.map((e) => ({ id: e.t.id, datum: e.datum, tage: e.tage, ueberfaellig: e.ueberfaellig }))) + '\n',
  );
  process.exit(0);
}

if (treffer.length > 0) {
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
