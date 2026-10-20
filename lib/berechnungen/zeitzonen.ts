/**
 * Zeitzonen-Umrechnung für den Uhrzeitrechner — mit Sommerzeit.
 *
 * W184: vorher feste Offsets in der Komponente (MEZ/MESZ immer UTC+1, EST immer UTC−5,
 * AEST immer UTC+10 …). Während der Sommerzeit lag jede Umrechnung, an der eine Zone mit
 * Zeitumstellung beteiligt ist, um eine Stunde daneben (z. B. 20.10.2026: 12:00 Berlin =
 * 19:00 Tokio, Rechner zeigte 20:00). Jetzt über die IANA-Zeitzonendatenbank
 * (Intl.DateTimeFormat mit timeZone), abhängig vom gewählten Datum. Damit gelten automatisch
 * die jeweiligen Umstellungsregeln:
 *   - EU: letzter Sonntag im März bis letzter Sonntag im Oktober (Richtlinie 2000/84/EG)
 *   - USA: zweiter Sonntag im März bis erster Sonntag im November (15 U.S.C. § 260a)
 *   - New South Wales: erster Sonntag im Oktober bis erster Sonntag im April
 *   - Japan, China, Indien, VAE: keine Sommerzeit
 */

export interface Zeitzone {
  id: string;
  stadt: string;
  /** IANA-Zeitzonenname */
  tz: string;
  kurzStandard: string;
  /** null = keine Sommerzeit */
  kurzSommer: string | null;
}

export const ZEITZONEN: Zeitzone[] = [
  { id: 'mez', stadt: 'Berlin', tz: 'Europe/Berlin', kurzStandard: 'MEZ', kurzSommer: 'MESZ' },
  { id: 'gmt', stadt: 'London', tz: 'Europe/London', kurzStandard: 'GMT', kurzSommer: 'BST' },
  { id: 'est', stadt: 'New York', tz: 'America/New_York', kurzStandard: 'EST', kurzSommer: 'EDT' },
  { id: 'cst', stadt: 'Chicago', tz: 'America/Chicago', kurzStandard: 'CST', kurzSommer: 'CDT' },
  { id: 'pst', stadt: 'Los Angeles', tz: 'America/Los_Angeles', kurzStandard: 'PST', kurzSommer: 'PDT' },
  { id: 'jst', stadt: 'Tokio', tz: 'Asia/Tokyo', kurzStandard: 'JST', kurzSommer: null },
  { id: 'chst', stadt: 'Peking', tz: 'Asia/Shanghai', kurzStandard: 'CST', kurzSommer: null },
  { id: 'ist', stadt: 'Mumbai', tz: 'Asia/Kolkata', kurzStandard: 'IST', kurzSommer: null },
  { id: 'aest', stadt: 'Sydney', tz: 'Australia/Sydney', kurzStandard: 'AEST', kurzSommer: 'AEDT' },
  { id: 'gst', stadt: 'Dubai', tz: 'Asia/Dubai', kurzStandard: 'GST', kurzSommer: null },
];

export function findeZeitzone(id: string): Zeitzone | undefined {
  return ZEITZONEN.find(z => z.id === id);
}

/** Bezeichnung für Auswahllisten, z. B. „MEZ/MESZ (Berlin)“. */
export function zonenLabel(z: Zeitzone): string {
  return `${z.kurzSommer ? `${z.kurzStandard}/${z.kurzSommer}` : z.kurzStandard} (${z.stadt})`;
}

interface Wandzeit { jahr: number; monat: number; tag: number; stunde: number; minute: number }

const formatCache = new Map<string, Intl.DateTimeFormat>();
function formatFuer(tz: string): Intl.DateTimeFormat {
  let f = formatCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    formatCache.set(tz, f);
  }
  return f;
}

/** Ortszeit (Wanduhr) einer Zone zu einem UTC-Zeitpunkt. */
export function wandzeitIn(tz: string, utcMs: number): Wandzeit {
  const teile: Record<string, number> = {};
  for (const p of formatFuer(tz).formatToParts(new Date(utcMs))) {
    if (p.type !== 'literal') teile[p.type] = parseInt(p.value, 10);
  }
  return { jahr: teile.year, monat: teile.month, tag: teile.day, stunde: teile.hour % 24, minute: teile.minute };
}

/** UTC-Offset der Zone in Minuten zum UTC-Zeitpunkt (Berlin im Sommer: +120). */
export function offsetMinuten(tz: string, utcMs: number): number {
  const w = wandzeitIn(tz, utcMs);
  const alsUtc = Date.UTC(w.jahr, w.monat - 1, w.tag, w.stunde, w.minute);
  const ohneSekunden = Math.floor(utcMs / 60000) * 60000;
  return Math.round((alsUtc - ohneSekunden) / 60000);
}

/** Gilt in der Zone zum Zeitpunkt Sommerzeit? (Offset größer als der Standard-Offset des Jahres) */
export function istSommerzeit(tz: string, utcMs: number): boolean {
  const jahr = new Date(utcMs).getUTCFullYear();
  const jan = offsetMinuten(tz, Date.UTC(jahr, 0, 1, 12));
  const jul = offsetMinuten(tz, Date.UTC(jahr, 6, 1, 12));
  return offsetMinuten(tz, utcMs) > Math.min(jan, jul);
}

/** Kürzel der gerade geltenden Zeit, z. B. „MESZ“ statt „MEZ“. */
export function zonenKuerzel(z: Zeitzone, utcMs: number): string {
  return z.kurzSommer && istSommerzeit(z.tz, utcMs) ? z.kurzSommer : z.kurzStandard;
}

/** „UTC+2“, „UTC−4“, „UTC+5:30“ */
export function formatUtcOffset(min: number): string {
  const vz = min < 0 ? '−' : '+';
  const abs = Math.abs(min);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${vz}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

/**
 * Ortszeit (Datum + Uhrzeit) in einer Zone → UTC-Zeitpunkt.
 * Zweistufige Näherung: erst mit dem Offset zur „naiven“ Zeit, dann mit dem Offset am
 * Ergebnis. Eine Uhrzeit, die es wegen der Umstellung nicht gibt (z. B. 02:30 am letzten
 * Märzsonntag in Berlin), landet eine Stunde später; bei doppelt vorkommenden Zeiten
 * (Oktober) wird die zweite (Standardzeit) genommen.
 */
export function ortszeitZuUtc(tz: string, jahr: number, monat: number, tag: number, stunde: number, minute: number): number {
  const naiv = Date.UTC(jahr, monat - 1, tag, stunde, minute);
  let utc = naiv - offsetMinuten(tz, naiv) * 60000;
  utc = naiv - offsetMinuten(tz, utc) * 60000;
  return utc;
}

export interface ZonenErgebnis {
  /** Zielzeit „HH:MM“ */
  ziel: string;
  /** Zieldatum ISO „JJJJ-MM-TT“ */
  zielDatumIso: string;
  /** Kalendertage Ziel minus Quelle (−1, 0, +1) */
  tagOffset: number;
  /** Zeitunterschied Ziel − Quelle in Minuten */
  unterschiedMinuten: number;
  vonOffsetMin: number;
  nachOffsetMin: number;
  vonKuerzel: string;
  nachKuerzel: string;
  /** Eingegebene Uhrzeit existiert am Datum wegen der Zeitumstellung nicht */
  uhrzeitUngueltig: boolean;
  utcMs: number;
}

const zwei = (n: number) => String(n).padStart(2, '0');

/**
 * Rechnet eine Uhrzeit an einem Datum von einer Zone in eine andere um.
 * datumIso „JJJJ-MM-TT“, zeit „HH:MM“.
 */
export function rechneZeitzone(datumIso: string, zeit: string, vonId: string, nachId: string): ZonenErgebnis | null {
  const dm = datumIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const zm = zeit.match(/^(\d{1,2}):(\d{2})$/);
  const von = findeZeitzone(vonId);
  const nach = findeZeitzone(nachId);
  if (!dm || !zm || !von || !nach) return null;
  const jahr = parseInt(dm[1], 10), monat = parseInt(dm[2], 10), tag = parseInt(dm[3], 10);
  const stunde = parseInt(zm[1], 10), minute = parseInt(zm[2], 10);
  if (monat < 1 || monat > 12 || tag < 1 || tag > 31 || stunde > 23 || minute > 59) return null;

  const utcMs = ortszeitZuUtc(von.tz, jahr, monat, tag, stunde, minute);
  const quelle = wandzeitIn(von.tz, utcMs);
  const ziel = wandzeitIn(nach.tz, utcMs);
  const vonOffsetMin = offsetMinuten(von.tz, utcMs);
  const nachOffsetMin = offsetMinuten(nach.tz, utcMs);
  const tagOffset = Math.round(
    (Date.UTC(ziel.jahr, ziel.monat - 1, ziel.tag) - Date.UTC(jahr, monat - 1, tag)) / 86400000,
  );
  return {
    ziel: `${zwei(ziel.stunde)}:${zwei(ziel.minute)}`,
    zielDatumIso: `${ziel.jahr}-${zwei(ziel.monat)}-${zwei(ziel.tag)}`,
    tagOffset,
    unterschiedMinuten: nachOffsetMin - vonOffsetMin,
    vonOffsetMin,
    nachOffsetMin,
    vonKuerzel: zonenKuerzel(von, utcMs),
    nachKuerzel: zonenKuerzel(nach, utcMs),
    uhrzeitUngueltig: quelle.stunde !== stunde || quelle.minute !== minute,
    utcMs,
  };
}
