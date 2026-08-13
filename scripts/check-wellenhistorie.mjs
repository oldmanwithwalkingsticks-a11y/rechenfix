#!/usr/bin/env node
/**
 * Meldet Wellen, die committet, aber nicht in der Wellenhistorie dokumentiert
 * sind.
 *
 * Hintergrund: Zwischen Welle 23 und Welle 81 klaffte drei Wochen lang eine
 * Luecke von 75 Wellen. Die Regel "Historie bei jedem Wellenabschluss
 * fortschreiben" stand in CLAUDE.md, aber nichts hat sie geprueft.
 *
 * Arbeitsweise: liest die Wellenkennungen aus den Commit-Betreffs und
 * vergleicht sie mit denen in der Historiendatei.
 *
 * WICHTIG — nur Warnung, kein Exit-Code:
 * Auf Vercel wird flach geklont, dort steht die Historie gar nicht zur
 * Verfuegung. Der Waechter erkennt das und ueberspringt still. Lokal, wo
 * Code-Claude baut, ist die Historie vollstaendig und der Vergleich greift.
 * Ein Dokumentationsmangel darf keinen Deploy blockieren.
 *
 * Aufruf: node scripts/check-wellenhistorie.mjs
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const HISTORIE = 'docs/audit-arbeitspapiere/welle-status-historie.md';
const GELB = '\x1b[33m';
const RESET = '\x1b[0m';

function git(befehl) {
  return execSync(befehl, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

try {
  // Flacher Klon (Vercel) oder kein Git: still ueberspringen.
  if (git('git rev-parse --is-shallow-repository') === 'true') process.exit(0);

  const betreffs = git('git log --pretty=%s');
  const committet = new Set();
  for (const zeile of betreffs.split('\n')) {
    const m = zeile.match(/^Welle\s+(\d+[a-z]?)\s*[:,]/i);
    if (m) committet.add(m[1].toLowerCase());
  }
  if (committet.size === 0) process.exit(0);

  const text = readFileSync(HISTORIE, 'utf8');
  const dokumentiert = new Set();
  for (const zeile of text.split('\n')) {
    if (!/^#{2,3}\s/.test(zeile)) continue;
    // "Welle 84:", "Wellen 72–74", "Welle 81, Schritt 2"
    const einzeln = zeile.match(/\bWelle[n]?\s+(\d+[a-z]?)/gi) || [];
    for (const e of einzeln) {
      const n = e.match(/(\d+[a-z]?)/)[1].toLowerCase();
      dokumentiert.add(n);
    }
    // Aeltere Schreibweise ohne Leerzeichen: "W19", "W20 Technik-Ausbau",
    // "WELLE 15C T4". Nur am Wortanfang, damit Woerter wie "SW21" nicht greifen.
    const kurz = zeile.match(/\bW(\d+[a-z]?)\b/gi) || [];
    for (const k of kurz) dokumentiert.add(k.slice(1).toLowerCase());
    // Spannen wie "Wellen 72–74" ausdehnen — aber nur in Ueberschriften, die
    // auch von Wellen sprechen. Sonst wuerde etwa eine Zeile ueber
    // Steuerschwellen ("70.000 -> 100.000 €") Wellennummern vortaeuschen und
    // eine echte Luecke verdecken.
    if (!/\bWelle/i.test(zeile)) continue;
    const spannen = zeile.match(/(\d+)\s*[–-]\s*(\d+)/g) || [];
    for (const s of spannen) {
      const [a, b] = s.split(/[–-]/).map((x) => parseInt(x.trim(), 10));
      if (Number.isFinite(a) && Number.isFinite(b) && b > a && b - a < 100) {
        for (let i = a; i <= b; i += 1) dokumentiert.add(String(i));
      }
    }
  }

  // Eine Welle gilt als dokumentiert, wenn ihre Nummer vorkommt — auch ohne
  // Buchstabenzusatz. '73a' ist durch '73' abgedeckt.
  const fehlend = [...committet]
    .filter((w) => {
      if (dokumentiert.has(w)) return false;
      const nurZahl = w.match(/^\d+/)[0];
      return !dokumentiert.has(nurZahl);
    })
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b));

  if (fehlend.length > 0) {
    console.warn(
      `${GELB}⚠ ${fehlend.length} committete Welle(n) fehlen in der Historie: ` +
      `${fehlend.join(', ')}\n` +
      `  Bitte in ${HISTORIE} nachtragen (neuester Block oben).${RESET}`,
    );
  }
} catch {
  // Kein Git, kein Repo, Datei fehlt: still ueberspringen, niemals brechen.
}
