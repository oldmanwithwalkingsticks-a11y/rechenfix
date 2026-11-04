/**
 * Verify: Abhängigkeitswache der Betriebsmeldung (lib/abhaengigkeiten.ts, Welle 203).
 *
 * Ohne Netz: Seiten, Skripte und die Advisory-Datenbank werden durch eine Attrappe ersetzt. Die
 * Treffer für next 16.3.6 sind die echte Antwort der Advisory-Datenbank von npm vom 04.11.2026
 * (zehn Einträge, gekürzt auf die gelesenen Felder) — die Lage von diekonkursmasse.de vom 14.10.
 * bis 03.11.2026, die niemand bemerkt hat. Für 16.4.5 antwortete die Datenbank am selben Tag leer.
 *
 * Aufruf: npx tsx scripts/verify-abhaengigkeiten.ts
 */
import {
  ADVISORY_URL,
  DOMAINS,
  abschnitt,
  fassungAusSkript,
  liesFassung,
  pruefeAbhaengigkeiten,
  skriptPfade,
  zaehle,
  type Advisory,
} from '../lib/abhaengigkeiten';

const TREFFER_16_3_6: Advisory[] = [
  { id: 1241496, url: 'https://github.com/advisories/GHSA-cjq9-62q9-8jv4', title: 'Next.js has Server-Side Request Forgery in Image Optimization', severity: 'high', vulnerable_versions: '>=16.0.0 <16.3.8' },
  { id: 1241493, url: 'https://github.com/advisories/GHSA-f87g-xv8r-7p7x', title: 'Next.js has information disclosure in App Router metadata image routes via dynamicParams bypass', severity: 'moderate', vulnerable_versions: '>=16.0.0 <16.3.8' },
  { id: 1241495, url: 'https://github.com/advisories/GHSA-mcj8-r9mp-w47p', title: 'Next.js has cache poisoning in SSG/ISR rendering that leads to cross-user content substitution and persistent denial of service', severity: 'moderate', vulnerable_versions: '>=16.0.0 <16.3.8' },
  { id: 1241489, url: 'https://github.com/advisories/GHSA-3w37-wq28-93x7', title: 'Next.js: Pending `use cache` fill can leak Draft Mode content into regular responses and persisted pages', severity: 'moderate', vulnerable_versions: '>=16.3.0 <16.3.8' },
  { id: 1241490, url: 'https://github.com/advisories/GHSA-4jqv-mc3x-m676', title: 'Next.js has cache poisoning of SSG and ISR pages in self-hosted applications', severity: 'moderate', vulnerable_versions: '>=16.0.0 <16.3.8' },
  { id: 1241492, url: 'https://github.com/advisories/GHSA-39w2-rjm5-chcv', title: "Next.js has information disclosure in development server's Model Context Protocol endpoint", severity: 'low', vulnerable_versions: '>=16.0.0 <16.3.8' },
  { id: 1242825, url: 'https://github.com/advisories/GHSA-h694-7cp9-m8p3', title: "next.js cache leak across root param values in nested 'use cache' functions", severity: 'moderate', vulnerable_versions: '>=16.3.0 <16.3.8' },
  { id: 1242818, url: 'https://github.com/advisories/GHSA-p3m5-59mp-jv5r', title: 'Next.js: Denial of Service in App Router using Server Actions', severity: 'high', vulnerable_versions: '>=16.0.0 <=16.4.0' },
  { id: 1242816, url: 'https://github.com/advisories/GHSA-2464-fhr4-w9xw', title: 'Next.js: Unauthenticated Remote Code Execution in Image Optimization API when SVG files are used', severity: 'critical', vulnerable_versions: '>=16.0.0 <=16.4.0' },
  { id: 1242859, url: 'https://github.com/advisories/GHSA-673q-mjm6-r5xr', title: 'Next.js: Unauthenticated Remote Code Execution in `use cache` functions returning typed arrays', severity: 'critical', vulnerable_versions: '>=16.0.0 <=16.4.0' },
];

const html = (pfade: string[]) =>
  `<!DOCTYPE html><html><head>${pfade.map((p) => `<script src="${p}" async=""></script>`).join('')}</head></html>`;
const chunk = (fassung: string | null) =>
  `(self.webpackChunk=self.webpackChunk||[]).push([[1],{1:function(){}}]);${fassung ? `window.next={version:"${fassung}",appDir:!0};` : ''}`;

/** Attrappe: Domain -> Fassung (oder HTTP-Status der Startseite), Advisory-Datenbank je Fassung. */
function attrappe(seiten: Record<string, string | number>, advisoryStatus = 200) {
  const anfragen: string[] = [];
  const holen = async (url: string, init?: RequestInit) => {
    if (url === ADVISORY_URL) {
      const fassung = (JSON.parse(String(init?.body)) as { next: string[] }).next[0];
      anfragen.push(fassung);
      if (advisoryStatus !== 200) return { status: advisoryStatus, text: 'Fehler' };
      return { status: 200, text: JSON.stringify(fassung === '16.3.6' ? { next: TREFFER_16_3_6 } : {}) };
    }
    const u = new URL(url);
    const wert = seiten[u.host];
    if (typeof wert === 'number') return { status: wert, text: '' };
    if (u.pathname === '/') {
      return { status: 200, text: html(['/_next/static/chunks/webpack-a.js', '/_next/static/chunks/main-b.js', '/_next/static/chunks/8755-c.js']) };
    }
    return { status: 200, text: chunk(u.pathname.endsWith('8755-c.js') ? wert : null) };
  };
  return { holen, anfragen };
}

type Fall = { name: string; soll: string; ist: string };
const faelle: Fall[] = [];

async function main() {
  // 1 Skript-Pfade in der Reihenfolge des HTML, ohne Wiederholung, beide Bauformen
  const h = '<script src="/_next/static/chunks/a.js"></script><script src="/_next/static/immutable/chunks/1counz.js"></script><link href="/_next/static/chunks/a.js"/><script src="/_next/static/css/x.css"></script>';
  faelle.push({ name: '1 Skript-Pfade', soll: '/_next/static/chunks/a.js, /_next/static/immutable/chunks/1counz.js', ist: skriptPfade(h).join(', ') });

  // 2 Fassung aus dem Chunk
  faelle.push({
    name: '2 Fassung aus window.next, sonst null',
    soll: '16.4.5 | null',
    ist: `${fassungAusSkript(chunk('16.4.5'))} | ${fassungAusSkript(chunk(null))}`,
  });

  // 3 liesFassung: gefunden im dritten Skript; Startseite 401; keine Fassung; Abruf wirft
  const a = attrappe({ 'www.x.de': '16.4.5', 'www.y.de': 401, 'www.z.de': '' });
  const f1 = await liesFassung('www.x.de', a.holen);
  const f2 = await liesFassung('www.y.de', a.holen);
  const f3 = await liesFassung('www.z.de', a.holen);
  const f4 = await liesFassung('www.x.de', async () => { throw new Error('getaddrinfo ENOTFOUND'); });
  faelle.push({
    name: '3 liesFassung: gefunden, HTTP 401, nicht gefunden, Abruf gescheitert',
    soll: '16.4.5 | Startseite HTTP 401 | Fassung in 3 Skripten nicht gefunden | Startseite nicht geholt: getaddrinfo ENOTFOUND',
    ist: [f1.fassung, f2.fehler, f3.fehler, f4.fehler].join(' | '),
  });

  // 4 Gesamtlauf mit der Lage vom 14.10. bis 03.11.2026
  const lage = attrappe({ 'www.rechenfix.de': '16.4.5', 'www.diekonkursmasse.de': '16.3.6', 'www.wuerdezeit.de': '16.4.5' });
  const erg = await pruefeAbhaengigkeiten(lage.holen);
  const z = zaehle(erg);
  faelle.push({
    name: '4 Gesamtlauf: drei Domains, je Fassung eine Anfrage',
    soll: `${DOMAINS.join(', ')} | Anfragen 16.4.5, 16.3.6`,
    ist: `${erg.map((e) => e.domain).join(', ')} | Anfragen ${[...lage.anfragen].join(', ')}`,
  });
  faelle.push({
    name: '5 Zaehlung: 2 kritisch, 2 hoch, 6 mittel oder niedrig, kein Fehler',
    soll: 'seiten=3 fehler=0 kritisch=2 hoch=2 mittel=6',
    ist: `seiten=${z.seiten} fehler=${z.fehler} kritisch=${z.kritisch} hoch=${z.hoch} mittel=${z.mittel}`,
  });

  // 6 Abschnitt der Mail
  const text = abschnitt(erg);
  const dkm = text.findIndex((t) => t.includes('www.diekonkursmasse.de'));
  faelle.push({
    name: '6 Abschnitt: ruhige Domain, betroffene Domain, kritisch zuerst',
    soll: '✅ www.rechenfix.de: next 16.4.5 — keine bekannte Lücke | 🔴 www.diekonkursmasse.de: next 16.3.6 — 2 kritisch, 2 hoch, 6 mittel oder niedrig | kritisch: Next.js: Unauthenticated Remote Code Execution in Image Optimization API when SVG files are used',
    ist: [
      text.find((t) => t.includes('www.rechenfix.de')),
      text[dkm],
      text[dkm + 1]?.trim().split(' (')[0],
    ].join(' | '),
  });

  // 7 Advisory-Datenbank antwortet nicht: Fehler je Domain, keine Treffer
  const kaputt = attrappe({ 'www.rechenfix.de': '16.4.5', 'www.diekonkursmasse.de': '16.4.5', 'www.wuerdezeit.de': 503 }, 500);
  const erg2 = await pruefeAbhaengigkeiten(kaputt.holen);
  const z2 = zaehle(erg2);
  faelle.push({
    name: '7 Advisory-Datenbank HTTP 500, wuerdezeit HTTP 503: drei Fehler, keine Treffer',
    soll: 'fehler=3 kritisch=0 hoch=0 | Advisory-Abfrage gescheitert: Advisory-Datenbank HTTP 500 | Startseite HTTP 503',
    ist: `fehler=${z2.fehler} kritisch=${z2.kritisch} hoch=${z2.hoch} | ${erg2[0].fehler} | ${erg2[2].fehler}`,
  });

  let fehler = 0;
  for (const f of faelle) {
    const ok = f.soll === f.ist;
    if (!ok) fehler++;
    console.log(`${ok ? '✓' : '✗'} ${f.name}\n    Soll: ${f.soll}\n    Ist:  ${f.ist}`);
  }
  console.log(`\nAbhaengigkeiten: ${faelle.length - fehler}/${faelle.length} grün`);
  process.exit(fehler === 0 ? 0 : 1);
}

main();
