/**
 * Abhängigkeitswache der Betriebsmeldung (Welle 203).
 *
 * Anlass: diekonkursmasse.de lief vom 14.10. bis 03.11.2026 mit Next.js 16.3.6, wuerdezeit.de mit
 * 16.3.5 — beide unter den am 14.10.2026 veröffentlichten kritischen Advisories GHSA-2464-fhr4-w9xw
 * und GHSA-673q-mjm6-r5xr. Niemand hat es bemerkt, weil nur rechenfix.de beobachtet wurde
 * (docs/audit-arbeitspapiere/nextjs-16-bestandsaufnahme.md, Abschnitte 11 und 12).
 *
 * Verfahren, täglich im Cron app/api/cron/health-check/route.ts:
 *   1. Für jede Domain die Startseite holen und die Skripte unter /_next/static/ in der Reihenfolge
 *      des HTML lesen, bis eines die Zeile window.next={version:"…"} enthält. Das ist die Fassung,
 *      die tatsächlich ausgeliefert wird — nicht die aus einer package.json.
 *   2. Je gefundener Fassung genau eine Anfrage an die Advisory-Datenbank von npm
 *      (POST https://registry.npmjs.org/-/npm/v1/security/advisories/bulk, Körper {"next":["16.4.5"]}).
 *      Mit genau einer Fassung je Anfrage betrifft jeder Treffer diese Fassung; ein Abgleich der
 *      Versionsbereiche entfällt. Das ist dieselbe Quelle, die `npm audit` fragt.
 *   3. Ergebnis je Domain: Fassung, Treffer nach Schwere oder ein Fehler. Ein Fehler ist eine
 *      Nichtprüfung, kein Befund (Berichtswache ab v46).
 *
 * Grenze: Gesehen wird nur `next`. Die übrigen Pakete von diekonkursmasse und wuerdezeit (z. B.
 * sharp, nodemailer) verrät die ausgelieferte Seite nicht; für sie steht der monatliche Termin
 * `npm-audit-dkm-wz` in lib/termine.ts.
 *
 * Die reinen Funktionen (skriptPfade, fassungAusSkript, zaehle, abschnitt) prüft
 * scripts/verify-abhaengigkeiten.ts ohne Netz.
 */

export const DOMAINS = ['www.rechenfix.de', 'www.diekonkursmasse.de', 'www.wuerdezeit.de'] as const;

export const ADVISORY_URL = 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk';

/** Höchstens so viele Skripte je Domain lesen. Gemessen 04.11.2026: das dritte trug die Fassung, bei allen drei Domains. */
export const MAX_SKRIPTE = 40;

const ZEITLIMIT_MS = 10_000;
const KENNUNG = 'rechenfix-betriebsmeldung';

export interface Advisory {
  id: number;
  url: string;
  title: string;
  severity: string;
  vulnerable_versions: string;
}

export interface DomainErgebnis {
  domain: string;
  fassung: string | null;
  fehler: string | null;
  advisories: Advisory[];
}

export interface Zaehlung {
  seiten: number;
  fehler: number;
  kritisch: number;
  hoch: number;
  mittel: number;
}

/** Skript-Pfade unter /_next/static/ in der Reihenfolge des HTML, ohne Wiederholungen. */
export function skriptPfade(html: string): string[] {
  const aus: string[] = [];
  for (const m of html.matchAll(/\/_next\/static\/[^"'\s<>]+?\.js/g)) {
    if (!aus.includes(m[0])) aus.push(m[0]);
  }
  return aus;
}

/** Fassung aus window.next={version:"…"}, sonst null. */
export function fassungAusSkript(js: string): string | null {
  const m = js.match(/window\.next=\{version:"([^"]+)"/);
  return m ? m[1] : null;
}

type Holen = (url: string, init?: RequestInit) => Promise<{ status: number; text: string }>;

const holenStandard: Holen = async (url, init) => {
  const res = await fetch(url, {
    ...init,
    headers: { 'User-Agent': KENNUNG, ...(init?.headers ?? {}) },
    cache: 'no-store',
    signal: AbortSignal.timeout(ZEITLIMIT_MS),
  });
  return { status: res.status, text: await res.text() };
};

function meldung(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/** Liest die ausgelieferte Next.js-Fassung einer Domain. */
export async function liesFassung(
  domain: string,
  holen: Holen = holenStandard,
): Promise<{ fassung: string | null; fehler: string | null }> {
  let start: { status: number; text: string };
  try {
    start = await holen(`https://${domain}/`);
  } catch (e) {
    return { fassung: null, fehler: `Startseite nicht geholt: ${meldung(e)}` };
  }
  if (start.status !== 200) return { fassung: null, fehler: `Startseite HTTP ${start.status}` };
  const pfade = skriptPfade(start.text);
  if (pfade.length === 0) return { fassung: null, fehler: 'keine Skripte unter /_next/static/ in der Startseite' };
  for (const pfad of pfade.slice(0, MAX_SKRIPTE)) {
    try {
      const js = await holen(`https://${domain}${pfad}`);
      if (js.status !== 200) continue;
      const fassung = fassungAusSkript(js.text);
      if (fassung) return { fassung, fehler: null };
    } catch {
      // nächstes Skript
    }
  }
  return { fassung: null, fehler: `Fassung in ${Math.min(pfade.length, MAX_SKRIPTE)} Skripten nicht gefunden` };
}

/** Fragt die npm-Advisory-Datenbank nach genau einer Fassung von next. */
export async function frageAdvisories(fassung: string, holen: Holen = holenStandard): Promise<Advisory[]> {
  const res = await holen(ADVISORY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ next: [fassung] }),
  });
  if (res.status !== 200) throw new Error(`Advisory-Datenbank HTTP ${res.status}`);
  const daten = JSON.parse(res.text) as Record<string, Advisory[] | undefined>;
  return Array.isArray(daten.next) ? daten.next : [];
}

/** Alle Domains, parallel; je Fassung eine Advisory-Anfrage. Wirft nie. */
export async function pruefeAbhaengigkeiten(holen: Holen = holenStandard): Promise<DomainErgebnis[]> {
  const fassungen = await Promise.all(DOMAINS.map((d) => liesFassung(d, holen)));
  const anfragen = new Map<string, Promise<Advisory[]>>();
  return Promise.all(
    DOMAINS.map(async (domain, i) => {
      const { fassung, fehler } = fassungen[i];
      if (!fassung) return { domain, fassung: null, fehler, advisories: [] };
      if (!anfragen.has(fassung)) anfragen.set(fassung, frageAdvisories(fassung, holen));
      try {
        return { domain, fassung, fehler: null, advisories: await anfragen.get(fassung)! };
      } catch (e) {
        return { domain, fassung, fehler: `Advisory-Abfrage gescheitert: ${meldung(e)}`, advisories: [] };
      }
    }),
  );
}

/** Zählung für die Maschinenzeile. mittel = moderate und low; je Domain gezählt. */
export function zaehle(ergebnisse: DomainErgebnis[]): Zaehlung {
  const z: Zaehlung = { seiten: ergebnisse.length, fehler: 0, kritisch: 0, hoch: 0, mittel: 0 };
  for (const e of ergebnisse) {
    if (e.fehler) z.fehler++;
    for (const a of e.advisories) {
      if (a.severity === 'critical') z.kritisch++;
      else if (a.severity === 'high') z.hoch++;
      else z.mittel++;
    }
  }
  return z;
}

const SCHWERE: Record<string, string> = { critical: 'kritisch', high: 'hoch', moderate: 'mittel', low: 'niedrig' };
const RANG: Record<string, number> = { critical: 0, high: 1, moderate: 2, low: 3 };

/** Abschnitt ABHÄNGIGKEITEN der Betriebsmeldung. */
export function abschnitt(ergebnisse: DomainErgebnis[]): string[] {
  const zeilen = [
    '─────────── ABHÄNGIGKEITEN ───────────',
    'Ausgelieferte Next.js-Fassung je Domain, gefragt bei der Advisory-Datenbank von npm:',
  ];
  for (const e of ergebnisse) {
    if (e.fehler) {
      zeilen.push('', `⚠️ ${e.domain}: nicht geprüft${e.fassung ? ` (next ${e.fassung})` : ''} — ${e.fehler}`);
      continue;
    }
    const z = zaehle([e]);
    if (e.advisories.length === 0) {
      zeilen.push('', `✅ ${e.domain}: next ${e.fassung} — keine bekannte Lücke`);
      continue;
    }
    const marke = z.kritisch + z.hoch > 0 ? '🔴' : '🟡';
    zeilen.push('', `${marke} ${e.domain}: next ${e.fassung} — ${z.kritisch} kritisch, ${z.hoch} hoch, ${z.mittel} mittel oder niedrig`);
    const sortiert = [...e.advisories].sort((a, b) => (RANG[a.severity] ?? 9) - (RANG[b.severity] ?? 9));
    for (const a of sortiert) {
      zeilen.push(`   ${SCHWERE[a.severity] ?? a.severity}: ${a.title} (${a.url}, betroffen ${a.vulnerable_versions})`);
    }
  }
  zeilen.push(
    '',
    'Bei kritisch oder hoch: next im betroffenen Repo auf eine behobene Fassung anheben, bauen, deployen (Muster: Nachzug vom 03.11.2026, docs/audit-arbeitspapiere/nextjs-16-bestandsaufnahme.md Abschnitt 11). Gesehen wird nur next; die übrigen Pakete von diekonkursmasse und wuerdezeit prüft der monatliche Termin npm-audit-dkm-wz.',
  );
  return zeilen;
}
