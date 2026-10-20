/**
 * Kalenderdaten in Ortszeit (W189).
 *
 * Alle Nutzer sitzen in Deutschland (Europe/Berlin, MEZ = UTC+1, MESZ = UTC+2). Drei JavaScript-
 * Eigenheiten verschieben dort Kalenderdaten um einen Tag, während Probeläufe in UTC grün bleiben:
 *
 *   1. `new Date('YYYY-MM-DD')` ist UTC-Mitternacht, also 01:00 bzw. 02:00 Ortszeit. Vergleiche mit
 *      lokalen Mitternächten (`new Date(j, m, t)`) scheitern am ersten Tag, und `setDate`/`setMonth`
 *      behalten die Uhrzeit 01:00 bei, die nach der Umstellung auf MESZ 23:00 UTC des Vortags ist.
 *   2. `toISOString()` rechnet nach UTC um: Eine lokale Mitternacht wird zum Vortag (22:00/23:00 UTC),
 *      und `new Date()` liefert zwischen 00:00 und 01:00/02:00 Ortszeit noch das gestrige Datum.
 *   3. Monatsrechnung mit `setMonth` läuft am Monatsende in den Folgemonat über (31.05. + 1 Monat =
 *      01.07.); Fristen nach Monaten enden nach § 188 Abs. 3 BGB stattdessen am Monatsletzten.
 *
 * `lib/format-date.ts` formatiert nur fertige ISO-Strings für die Anzeige; Parser und ISO-Ausgabe
 * fehlten bisher. Gegenstück für Prüfskripte: `isoDateLocal` in `scripts/welle4-overrides.ts`.
 * Prüfskript: `scripts/verify-datum-zeitzone.ts`.
 */

/**
 * 'YYYY-MM-DD' (Wert eines `<input type="date">`) → lokale Mitternacht dieses Tages.
 * Ungültige oder leere Eingabe → ungültiges Datum (`getTime()` ist NaN), wie bei `new Date('')`.
 */
export function parseIsoLokal(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!m) return new Date(NaN);
  const jahr = Number(m[1]);
  const d = new Date(jahr, Number(m[2]) - 1, Number(m[3]));
  // new Date(j, …) deutet zweistellige Jahre als 19xx; beim Tippen liefert das Feld kurz „0002-…“
  if (jahr < 100) d.setFullYear(jahr);
  return d;
}

/** Datum → 'YYYY-MM-DD' aus den lokalen Gettern (nicht `toISOString()`, das nach UTC umrechnet). */
export function isoLokal(d: Date): string {
  const j = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const t = String(d.getDate()).padStart(2, '0');
  return `${j}-${m}-${t}`;
}

/**
 * `n` Monate addieren (auch negativ), Ergebnis lokale Mitternacht. Fehlt der gleichnamige Tag im
 * Zielmonat, ist es der Monatsletzte (§ 188 Abs. 3 BGB) statt eines Überlaufs in den Folgemonat.
 */
export function addMonateLokal(d: Date, n: number): Date {
  const jahr = d.getFullYear();
  const monat = d.getMonth() + n;
  const letzterTag = new Date(jahr, monat + 1, 0).getDate();
  return new Date(jahr, monat, Math.min(d.getDate(), letzterTag));
}

/**
 * Auch gebrochene Monate addieren (Haltbarkeit × Verpackungsfaktor): ganze Monate wie
 * `addMonateLokal`, der Rest zu 30 Tagen je Monat (Monat zu 30 Tagen wie in § 191 BGB).
 * 0,8 Monate = 24 Tage, 2,4 Monate = 2 Monate + 12 Tage, 13,5 Monate = 13 Monate + 15 Tage.
 * `setMonth` schneidet Nachkommastellen dagegen still ab (0,8 → 0).
 */
export function addMonateAnteilig(d: Date, monate: number): Date {
  const ganz = Math.trunc(monate);
  const r = addMonateLokal(d, ganz);
  r.setDate(r.getDate() + Math.round((monate - ganz) * 30));
  return r;
}

/**
 * Letzter Tag einer Frist von `n` Monaten, deren Beginn mitzählt (§ 187 Abs. 2, § 188 Abs. 2 und 3
 * BGB), etwa einer Probezeit: der Tag vor dem gleichnamigen Tag `n` Monate später; fehlt dieser,
 * der Monatsletzte. Beginn 01.02. + 6 Monate → 31.07.; Beginn 31.08. + 6 Monate → 28./29.02.
 */
export function fristEndeMonate(beginn: Date, n: number): Date {
  const jahr = beginn.getFullYear();
  const monat = beginn.getMonth() + n;
  const tag = beginn.getDate();
  const tageImZielmonat = new Date(jahr, monat + 1, 0).getDate();
  return tag <= tageImZielmonat ? new Date(jahr, monat, tag - 1) : new Date(jahr, monat + 1, 0);
}
