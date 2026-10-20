/**
 * Zyklusrechner — Eisprung, fruchtbare Tage und Kalendermarkierung (Kalendermethode).
 *
 * Modell (unverändert aus ZyklusRechner.tsx übernommen): Eisprung = Periodenbeginn + Zykluslänge
 * − 14 Tage (Lutealphase rund 14 Tage), fruchtbar 5 Tage davor bis 1 Tag danach, nächste Periode
 * = Beginn + Zykluslänge.
 *
 * W189: aus der Komponente herausgezogen, damit `scripts/verify-datum-zeitzone.ts` die Rechnung
 * prüfen kann. Vorher parste die Komponente das Startdatum mit `new Date(iso)` (UTC-Mitternacht,
 * in Deutschland 01:00/02:00 Uhr). Die Kalenderzellen sind lokale Mitternächte, der Vergleich
 * `zelle >= Periodenbeginn` schlug deshalb am ersten Periodentag und am ersten fruchtbaren Tag fehl:
 * Start 05.10.2026, 5 Tage Periode → markiert 06.–09.10. statt 05.–09.10., fruchtbar ab 15.10.
 * statt ab 14.10.2026.
 */

import { parseIsoLokal } from '../datum-lokal';

export type ZyklusTagesArt = 'period' | 'fertile' | 'ovulation' | 'normal';

export interface Zyklus {
  periodenBeginn: Date;
  eisprung: Date;
  fruchtbarVon: Date;
  fruchtbarBis: Date;
  naechstePeriode: Date;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function berechneZyklus(start: Date, laenge: number): Zyklus {
  const eisprung = addDays(start, laenge - 14);
  const fruchtbarVon = addDays(eisprung, -5);
  const fruchtbarBis = addDays(eisprung, 1);
  const naechstePeriode = addDays(start, laenge);
  return { periodenBeginn: start, eisprung, fruchtbarVon, fruchtbarBis, naechstePeriode };
}

/**
 * `anzahl` aufeinanderfolgende Zyklen ab dem ersten Tag der letzten Periode ('YYYY-MM-DD').
 * Alle Daten sind lokale Mitternächte. `null` bei leerem oder ungültigem Datum.
 */
export function berechneZyklen(startDatum: string, laenge: number, anzahl: number): Zyklus[] | null {
  const start = parseIsoLokal(startDatum);
  if (isNaN(start.getTime())) return null;
  const zyklen: Zyklus[] = [];
  for (let i = 0; i < anzahl; i++) {
    zyklen.push(berechneZyklus(addDays(start, laenge * i), laenge));
  }
  return zyklen;
}

/** Markierung einer Kalenderzelle (lokale Mitternacht). Periode: Tag 1 = Beginn, Tag N = Beginn + N − 1. */
export function zyklusTagesArt(datum: Date, zyklen: Zyklus[], periodenTage: number): ZyklusTagesArt {
  for (const z of zyklen) {
    const periodenEnde = addDays(z.periodenBeginn, periodenTage - 1);
    if (datum >= z.periodenBeginn && datum <= periodenEnde) return 'period';
    if (datum.toDateString() === z.eisprung.toDateString()) return 'ovulation';
    if (datum >= z.fruchtbarVon && datum <= z.fruchtbarBis) return 'fertile';
  }
  return 'normal';
}
