/**
 * Elternzeit — Berechnungen nach BEEG.
 *
 * Quellen:
 * - BEEG § 15 Abs. 1, 2: Anspruch auf Elternzeit, max. 36 Monate pro Elternteil
 *   bis zum 8. Geburtstag des Kindes.
 *   https://www.gesetze-im-internet.de/beeg/__15.html
 * - BEEG § 16 Abs. 1: Anmeldefristen — 7 Wochen vor Beginn (in den ersten
 *   3 Lebensjahren), 13 Wochen vor Beginn (zwischen 3. und 8. Geburtstag).
 *   https://www.gesetze-im-internet.de/beeg/__16.html
 * - BEEG § 18 Abs. 1: Kündigungsschutz frühestens 8 Wochen vor Elternzeit-
 *   Beginn (innerhalb der ersten 3 Lebensjahre), frühestens 14 Wochen vor
 *   Beginn zwischen 3. und 8. Geburtstag, bis zum Ende der Elternzeit.
 *   https://www.gesetze-im-internet.de/beeg/__18.html
 * - BEEG § 4 Abs. 4: Partnermonate-Bonus — beide Eltern müssen mindestens
 *   2 Monate nehmen für volle 14 Monate Elterngeld.
 * - MuSchG § 3 Abs. 2: Mutterschutz nach Geburt 8 Wochen — wird auf Elternzeit
 *   der Mutter angerechnet (Überlappungs-Hinweis).
 *
 * Welle-4 M2b — Lib-Extraktion aus ElternzeitRechner.tsx (03.05.2026).
 * Component zuvor KEINE-LIB mit substantieller Inline-Logik.
 *
 * W179:
 * - Elternzeit der Mutter beginnt am Tag NACH dem Mutterschutz (Geburt + 57 Tage),
 *   vorher am letzten Mutterschutztag.
 * - Ende = letzter Tag der Frist (§ 188 Abs. 2, 3 BGB): 12 Monate ab 13.03.2026
 *   enden am 12.03.2027, 2 Monate ab 15.01.2026 am 14.03.2026 (vorher je ein Tag
 *   später; Monatsenden ohne JS-Überlauf).
 * - Anmeldung spätestens am Tag vor Beginn der 7- bzw. 13-Wochen-Frist, also Beginn
 *   minus 50 bzw. 92 Tage (Mutter nach Mutterschutz: 7 Wochen vor dessen Ende).
 * - Kündigungsschutz ab 3. Geburtstag frühestens 14 statt 8 Wochen vor Beginn.
 * - Neues Ergebnisfeld basisParallelHinweis: Basiselterngeld gibt es bei Geburten
 *   ab 01.04.2024 nur für höchstens einen Monat gleichzeitig (§ 4 Abs. 6 BEEG).
 */

import { isoLokal } from '../datum-lokal';

export const MAX_ELTERNZEIT_MONATE = 36;
export const MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT = 56; // 8 Wochen, MuSchG § 3 Abs. 2 Standard
export const ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG = 49; // 7 Wochen, BEEG § 16 Abs. 1 Satz 1
export const ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG = 91; // 13 Wochen, BEEG § 16 Abs. 1 Satz 2
export const KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN = 56; // 8 Wochen, BEEG § 18 Abs. 1 Satz 2 Nr. 1
export const KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN_NACH_3_GEBURTSTAG = 98; // 14 Wochen, BEEG § 18 Abs. 1 Satz 2 Nr. 2
export const PARTNERMONATE_MINDEST = 2;

export interface ElternzeitInput {
  /** ISO-Date-String. Pflicht. Bei leer/ungültig: null-Return. */
  geburt: string;
  /** ISO-Date-String. Bei leer/undefined: Default = Tag nach Mutterschutz-Ende (Geburt + 57 d). */
  p1Beginn?: string;
  /** Bei undefined oder negativ: 0. Geclampt auf [0, MAX_ELTERNZEIT_MONATE]. */
  p1Monate?: number;
  /** ISO-Date-String. Bei leer/undefined: Default = Geburt. */
  p2Beginn?: string;
  /** Bei undefined oder negativ: 0. Geclampt auf [0, MAX_ELTERNZEIT_MONATE]. */
  p2Monate?: number;
}

export interface ElternzeitErgebnis {
  geburt: Date;
  achterGeburtstag: Date;
  p1B: Date;
  p1E: Date;
  p1Mon: number;
  p2B: Date;
  p2E: Date;
  p2Mon: number;
  anmeldungP1: Date;
  anmeldungP2: Date;
  kSchutzBeginnP1: Date;
  kSchutzBeginnP2: Date;
  kSchutzEndeP1: Date;
  kSchutzEndeP2: Date;
  verbleibendP1: number;
  verbleibendP2: number;
  partnermonateOk: boolean;
  mutterschutzEnde: Date;
  ueberlappung: boolean;
  gesamtMonate: number;
  /**
   * true, wenn die Elternzeit des zweiten Elternteils mehr als einen Monat mit der Zeit der Mutter
   * (Mutterschutz + Elternzeit) zusammenfällt: Basiselterngeld gibt es dann nicht für alle diese
   * Monate gleichzeitig (Geburten ab 01.04.2024).
   */
  basisParallelHinweis: boolean;
}

/**
 * Letzter Tag eines Zeitraums von m Monaten ab Beginn `d` (Beginn zählt mit, § 187 Abs. 2,
 * § 188 Abs. 2 und 3 BGB): Tag vor dem gleichnamigen Tag m Monate später, fehlt dieser,
 * der Monatsletzte.
 */
function endeNachMonaten(d: Date, m: number): Date {
  const y = d.getFullYear();
  const mon = d.getMonth() + m;
  const tag = d.getDate();
  const tageImZielmonat = new Date(y, mon + 1, 0).getDate();
  return tag <= tageImZielmonat ? new Date(y, mon, tag - 1) : new Date(y, mon + 1, 0);
}

function addTage(d: Date, t: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + t);
}

/** 'YYYY-MM-DD' als lokales Datum (ohne UTC-Verschiebung). */
function parseDatum(s: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(NaN);
}

/**
 * Vorschlag für das Feld „Beginn“ von Partner 1: Tag nach dem Ende des Mutterschutzes
 * (Geburt + 57 Tage) als 'YYYY-MM-DD'; '' bei leerer oder ungültiger Geburt.
 * W189: vorher in ElternzeitRechner.tsx mit new Date(iso) (UTC-Mitternacht), setDate und
 * toISOString(). In deutscher Zeit lag der Vorschlag einen Tag zu früh, sobald die Umstellung auf
 * die Sommerzeit dazwischen lag (Geburt 15.02.2026 → 12.04. statt 13.04.2026), und mit ihm
 * Ende, Anmeldefrist und Kündigungsschutz von Partner 1.
 */
export function vorschlagBeginnP1(geburt: string): string {
  const g = parseDatum(geburt);
  if (isNaN(g.getTime())) return '';
  return isoLokal(addTage(g, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT + 1));
}

export function berechneElternzeit(input: ElternzeitInput): ElternzeitErgebnis | null {
  if (!input.geburt) return null;
  const g = parseDatum(input.geburt);
  if (isNaN(g.getTime())) return null;

  // MuSchG § 3 Abs. 2: 8 Wochen nach der Entbindung; Geburtstag zählt nicht mit (§ 187 Abs. 1 BGB),
  // Ende mit Ablauf des gleichnamigen Wochentags (Geburt Do 15.01. → Mutterschutz bis Do 12.03.).
  const mutterschutzEnde = addTage(g, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT);

  // Defaults: P1 = Tag nach dem Mutterschutz; P2 = Geburt
  const p1B = input.p1Beginn ? parseDatum(input.p1Beginn) : addTage(mutterschutzEnde, 1);
  const p2B = input.p2Beginn ? parseDatum(input.p2Beginn) : new Date(g);
  if (isNaN(p1B.getTime()) || isNaN(p2B.getTime())) return null;

  const p1Mon = Math.max(0, Math.min(MAX_ELTERNZEIT_MONATE, Math.round(input.p1Monate ?? 0)));
  const p2Mon = Math.max(0, Math.min(MAX_ELTERNZEIT_MONATE, Math.round(input.p2Monate ?? 0)));

  // Ende = letzter Tag der Elternzeit (bei 0 Monaten: Tag vor Beginn)
  const p1E = endeNachMonaten(p1B, p1Mon);
  const p2E = endeNachMonaten(p2B, p2Mon);

  const achterGeburtstag = new Date(g);
  achterGeburtstag.setFullYear(achterGeburtstag.getFullYear() + 8);

  // BEEG § 16 Abs. 1: 7 Wochen vor Beginn (vor 3. Geburtstag), 13 Wochen ab 3. Geburtstag
  const dritterGeburtstag = new Date(g);
  dritterGeburtstag.setFullYear(dritterGeburtstag.getFullYear() + 3);

  // Die 7 bzw. 13 Wochen laufen bis zum Tag vor Beginn; die Anmeldung muss spätestens am Tag davor
  // zugehen (Beginn 13.03. → Frist 23.01.–12.03. → Zugang bis 22.01.).
  const anmeldungP1 = addTage(p1B, -(p1B < dritterGeburtstag ? ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG : ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG) - 1);
  const anmeldungP2 = addTage(p2B, -(p2B < dritterGeburtstag ? ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG : ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG) - 1);

  // BEEG § 18 Abs. 1: Kündigungsschutz ab dem Verlangen, frühestens 8 Wochen (bis 3. Geburtstag)
  // bzw. 14 Wochen (3. bis 8. Geburtstag) vor Beginn, bis zum Ende
  const kSchutzBeginnP1 = addTage(p1B, -(p1B < dritterGeburtstag ? KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN : KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN_NACH_3_GEBURTSTAG));
  const kSchutzBeginnP2 = addTage(p2B, -(p2B < dritterGeburtstag ? KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN : KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN_NACH_3_GEBURTSTAG));
  const kSchutzEndeP1 = p1E;
  const kSchutzEndeP2 = p2E;

  // BEEG § 15 Abs. 2: max. 36 Mon pro Elternteil bis zum 8. Geburtstag
  const verbleibendP1 = Math.max(0, MAX_ELTERNZEIT_MONATE - p1Mon);
  const verbleibendP2 = Math.max(0, MAX_ELTERNZEIT_MONATE - p2Mon);

  // BEEG § 4 Abs. 4: Partnermonate für volle 14 Mo Elterngeld
  const partnermonateOk = p1Mon >= PARTNERMONATE_MINDEST && p2Mon >= PARTNERMONATE_MINDEST;

  // MuSchG § 3 Abs. 2 Überlappung: Elternzeit-Beginn innerhalb des Mutterschutzes
  // (relevant für die Mutter, wird auf Elternzeit angerechnet).
  const ueberlappung = p1B <= mutterschutzEnde || p2B <= mutterschutzEnde;

  // § 4 Abs. 6 BEEG (Geburten ab 01.04.2024): Basiselterngeld höchstens einen Monat gleichzeitig.
  // Monate mit Mutterschaftsleistungen zählen als Basiselterngeld-Monate der Mutter. Grob geprüft:
  // Überschneidung der P2-Zeit mit Mutterschutz und Elternzeit der Mutter innerhalb der ersten zwölf
  // Lebensmonate länger als ein Monat.
  const zeitMutterBis = p1Mon > 0 && p1E > mutterschutzEnde ? p1E : mutterschutzEnde;
  const lm12Ende = endeNachMonaten(g, 12);
  const zeitMutterEnde = zeitMutterBis < lm12Ende ? zeitMutterBis : lm12Ende;
  const ueberlappAnfang = p2B > g ? p2B : g;
  const ueberlappEnde = p2E < zeitMutterEnde ? p2E : zeitMutterEnde;
  const basisParallelHinweis = p2Mon > 0 && ueberlappEnde >= ueberlappAnfang
    && endeNachMonaten(ueberlappAnfang, 1) < ueberlappEnde;

  return {
    geburt: g,
    achterGeburtstag,
    p1B,
    p1E,
    p1Mon,
    p2B,
    p2E,
    p2Mon,
    anmeldungP1,
    anmeldungP2,
    kSchutzBeginnP1,
    kSchutzBeginnP2,
    kSchutzEndeP1,
    kSchutzEndeP2,
    verbleibendP1,
    verbleibendP2,
    partnermonateOk,
    mutterschutzEnde,
    ueberlappung,
    gesamtMonate: p1Mon + p2Mon,
    basisParallelHinweis,
  };
}
