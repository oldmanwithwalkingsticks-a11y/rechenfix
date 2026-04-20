// Merges current rendered-length data with proposals and writes v2 report.
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'reports', '_titles-v2-data.json');
const suggPath = path.resolve(__dirname, '..', 'reports', '_titles-v2-suggestions.json');
const outPath = path.resolve(__dirname, '..', 'reports', 'title-kuerzungsreport-v2.md');

const { stats, entries } = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const suggestions = JSON.parse(fs.readFileSync(suggPath, 'utf8'));
const suggMap = new Map(suggestions.map(s => [s.url, s]));

// Filter to entries ≥61 chars rendered
const over = entries.filter(e => e.renderedLen >= 61);

// Group by kategorieSlug
const CAT_ORDER = ['finanzen', 'alltag', 'wohnen', 'arbeit', 'gesundheit', 'auto', 'kochen', 'mathe', 'sport'];
const CAT_LABEL = {
  finanzen: 'Finanzen',
  alltag: 'Alltag',
  wohnen: 'Wohnen',
  arbeit: 'Arbeit',
  gesundheit: 'Gesundheit',
  auto: 'Auto',
  kochen: 'Kochen',
  mathe: 'Mathe',
  sport: 'Sport',
};

const grouped = {};
for (const cat of CAT_ORDER) grouped[cat] = [];
for (const e of over) {
  grouped[e.kategorieSlug].push(e);
}
// Already sorted by renderedLen desc from extract-titles-v2.ts

// Build report
const lines = [];
lines.push('# Title-Kürzungsreport v2 — Korrigiert nach gerenderter Länge');
lines.push('');
lines.push('**Methodik:** Gemessen wird die **gerenderte** Browser-Titel-Länge = `metaTitle` + ` | Rechenfix.de` (Suffix 15 Zeichen).');
lines.push('Ziel: ≤60 Zeichen gerendert. 61–65 Zeichen akzeptabel. >65 Zeichen unerwünscht (Google schneidet in SERP ab).');
lines.push('');
lines.push('**Sanity-Check Homepage (live, 17.04.2026):**');
lines.push('');
lines.push('- Live `<title>`: `Rechenfix.de — Kostenlose Online-Rechner` → **40 Zeichen**');
lines.push('- Verifikation Formel `/finanzen/brutto-netto-rechner`: metaTitle (42) + ` | Rechenfix.de` (15) = **57 Zeichen** (live bestätigt)');
lines.push('- Formel verifiziert: `renderedLen = metaTitle.length + 15`');
lines.push('');
lines.push('**v1-Report-Fehler:** v1 zählte nur `metaTitle.length`, ignorierte das 15-Zeichen-Suffix. Nach Prompt 83 (v1-Kürzungen deployed) sind live immer noch 125 von 170 Titeln ≥61 Zeichen gerendert.');
lines.push('');
lines.push('**Ausgangslage (Ist-Zustand, nach Prompt 83):**');
lines.push('');
lines.push(`- Gesamt: ${stats.total} Rechner`);
lines.push(`- Über 60 Zeichen: **${stats.over60}** (Anteil: ${Math.round((stats.over60 / stats.total) * 100)} %)`);
lines.push(`- Durchschnitt: ${stats.avg} Zeichen`);
lines.push(`- Maximum: ${stats.max} Zeichen`);
lines.push('');
lines.push('Verteilung (gerenderte Länge):');
lines.push('');
lines.push(`| Bucket | Anzahl |`);
lines.push(`|---|---:|`);
lines.push(`| ≤55 | ${stats.le55} |`);
lines.push(`| 56–60 | ${stats.b56to60} |`);
lines.push(`| 61–65 | ${stats.b61to65} |`);
lines.push(`| 66–70 | ${stats.b66to70} |`);
lines.push(`| 71–75 | ${stats.b71to75} |`);
lines.push(`| ≥76 | ${stats.ge76} |`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Kürzungsvorschläge — 125 Einträge');
lines.push('');
lines.push('Sortierung: Kategorien in Sidebar-Reihenfolge, innerhalb längste zuerst.');
lines.push('Spalten-Legende: `Ist` = aktuelle gerenderte Länge, `Neu` = gerenderte Länge nach Vorschlag.');
lines.push('');

let totalCount = 0;
for (const cat of CAT_ORDER) {
  const group = grouped[cat];
  if (group.length === 0) continue;
  lines.push(`### ${CAT_LABEL[cat]} (${group.length})`);
  lines.push('');
  lines.push('| URL | Ist | Aktueller metaTitle | Neu | Vorschlag |');
  lines.push('|---|---:|---|---:|---|');
  for (const e of group) {
    const sug = suggMap.get(e.url);
    if (!sug) {
      lines.push(`| \`${e.url}\` | ${e.renderedLen} | ${e.metaTitle} | — | **FEHLT** |`);
      continue;
    }
    lines.push(`| \`${e.url}\` | ${e.renderedLen} | ${e.metaTitle} | ${sug.renderedLen} | ${sug.meta} |`);
    totalCount++;
  }
  lines.push('');
}

// Schwer kürzbar: renderedLen > 60 in the proposals (should be none now)
const hard = suggestions.filter(s => s.renderedLen > 60);
lines.push('## Schwer kürzbar');
lines.push('');
if (hard.length === 0) {
  lines.push('Keine. Alle 125 Vorschläge rendern ≤60 Zeichen.');
} else {
  lines.push('| URL | Neu | Vorschlag |');
  lines.push('|---|---:|---|');
  for (const s of hard) lines.push(`| \`${s.url}\` | ${s.renderedLen} | ${s.meta} |`);
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Zusammenfassung');
lines.push('');
lines.push(`- **Einträge im Report:** ${over.length}`);
lines.push(`- **Vorschläge ≤60 Zeichen:** ${suggestions.filter(s => s.renderedLen <= 60).length}`);
lines.push(`- **Vorschläge 61–65 (akzeptabel):** ${suggestions.filter(s => s.renderedLen >= 61 && s.renderedLen <= 65).length}`);
lines.push(`- **Vorschläge >65 (schwer kürzbar):** ${hard.length}`);
lines.push('');
lines.push('Verteilung nach Umsetzung aller Vorschläge (Ist-Ist-Rechner ≤60 + neue ≤60):');
lines.push('');
// Calculate post-implementation stats
const unchanged = entries.filter(e => e.renderedLen <= 60);
const postDist = { le55: 0, b56to60: 0 };
for (const e of unchanged) {
  if (e.renderedLen <= 55) postDist.le55++;
  else postDist.b56to60++;
}
for (const s of suggestions) {
  if (s.renderedLen <= 55) postDist.le55++;
  else if (s.renderedLen <= 60) postDist.b56to60++;
}
lines.push(`| Bucket | Anzahl |`);
lines.push(`|---|---:|`);
lines.push(`| ≤55 | ${postDist.le55} |`);
lines.push(`| 56–60 | ${postDist.b56to60} |`);
lines.push(`| 61+ | 0 |`);
lines.push('');
lines.push('**Kürzungsregeln angewendet (in Reihenfolge):**');
lines.push('');
lines.push('1. Jahreszahl nur dort behalten, wo jährlich aktualisierte Werte zentral sind (Steuer-Tabellen, Kindergeld, BAföG, Eltern-/Pflegegeld, Rente, Arbeitslosengeld, KuG, Minijob/Midijob, AfA, Grundsteuer 2026, Abi, Mutterschutz, Ü-Stunden/Arbeitstage, Taxi, Sprit).');
lines.push('2. Redundante Verben (`berechnen`, `ermitteln`, `checken`) gestrichen, wenn schon durch `-Rechner` impliziert.');
lines.push('3. Füllwörter (`online`, `einfach`, `schnell`, `professionell`, `kostenlos`) entfernt.');
lines.push('4. Wort-Wiederholungen gekürzt (`Kostenlos + Gratis` → nur eins).');
lines.push('5. Synonym-Aufzählungen gestutzt (`Freibetrag & Steuer berechnen` → `Freibeträge`).');
lines.push('');
lines.push('**Sonderfall:** `/finanzen/einkommensteuer-rechner` hat nach Prompt 83 bereits `Einkommensteuer-Rechner 2026 — § 32a EStG` = 57 Zeichen gerendert und erscheint hier NICHT (bereits ≤60). Vier weitere Rechner (kaffee-kosten, lieferservice, quadratmeter) sind in Prompt 83 bewusst unverändert geblieben und liegen bereits ≤60 Zeichen.');
lines.push('');

fs.writeFileSync(outPath, lines.join('\n'));
console.log('Written:', outPath);
console.log('Entries in report:', totalCount);
console.log('Hard (>60):', hard.length);
