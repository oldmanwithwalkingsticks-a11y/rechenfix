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
 *   Beginn (innerhalb der ersten 3 Lebensjahre) bis zum Ende der Elternzeit.
 *   https://www.gesetze-im-internet.de/beeg/__18.html
 * - BEEG § 4 Abs. 4: Partnermonate-Bonus — beide Eltern müssen mindestens
 *   2 Monate nehmen für volle 14 Monate Elterngeld.
 * - MuSchG § 3 Abs. 2: Mutterschutz nach Geburt 8 Wochen — wird auf Elternzeit
 *   der Mutter angerechnet (Überlappungs-Hinweis).
 *
 * Welle-4 M2b — Lib-Extraktion aus ElternzeitRechner.tsx (03.05.2026).
 * Component zuvor KEINE-LIB mit substantieller Inline-Logik.
 */

export const MAX_ELTERNZEIT_MONATE = 36;
export const MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT = 56; // 8 Wochen, MuSchG § 3 Abs. 2 Standard
export const ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG = 49; // 7 Wochen, BEEG § 16 Abs. 1 Satz 1
export const ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG = 91; // 13 Wochen, BEEG § 16 Abs. 1 Satz 2
export const KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN = 56; // 8 Wochen, BEEG § 18 Abs. 1
export const PARTNERMONATE_MINDEST = 2;

export interface ElternzeitInput {
  /** ISO-Date-String. Pflicht. Bei leer/ungültig: null-Return. */
  geburt: string;
  /** ISO-Date-String. Bei leer/undefined: Default = Geburt + 56d (Mutterschutz-Ende). */
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
}

function addMonate(d: Date, m: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + m);
  return r;
}

function addTage(d: Date, t: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + t);
  return r;
}

export function berechneElternzeit(input: ElternzeitInput): ElternzeitErgebnis | null {
  if (!input.geburt) return null;
  const g = new Date(input.geburt);
  if (isNaN(g.getTime())) return null;

  // Defaults: P1 = Geburt + 56d (Mutterschutz-Ende); P2 = Geburt
  const p1B = input.p1Beginn ? new Date(input.p1Beginn) : addTage(g, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT);
  const p2B = input.p2Beginn ? new Date(input.p2Beginn) : new Date(g);
  if (isNaN(p1B.getTime()) || isNaN(p2B.getTime())) return null;

  const p1Mon = Math.max(0, Math.min(MAX_ELTERNZEIT_MONATE, Math.round(input.p1Monate ?? 0)));
  const p2Mon = Math.max(0, Math.min(MAX_ELTERNZEIT_MONATE, Math.round(input.p2Monate ?? 0)));

  const p1E = addMonate(p1B, p1Mon);
  const p2E = addMonate(p2B, p2Mon);

  const achterGeburtstag = new Date(g);
  achterGeburtstag.setFullYear(achterGeburtstag.getFullYear() + 8);

  // BEEG § 16 Abs. 1: 7 Wochen vor Beginn (vor 3. Geburtstag), 13 Wochen ab 3. Geburtstag
  const dritterGeburtstag = new Date(g);
  dritterGeburtstag.setFullYear(dritterGeburtstag.getFullYear() + 3);

  const anmeldungP1 = addTage(p1B, p1B < dritterGeburtstag ? -ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG : -ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG);
  const anmeldungP2 = addTage(p2B, p2B < dritterGeburtstag ? -ANMELDEFRIST_TAGE_VOR_3_GEBURTSTAG : -ANMELDEFRIST_TAGE_NACH_3_GEBURTSTAG);

  // BEEG § 18 Abs. 1: Kündigungsschutz ab 8 Wochen vor Beginn bis Ende
  const kSchutzBeginnP1 = addTage(p1B, -KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN);
  const kSchutzBeginnP2 = addTage(p2B, -KUENDIGUNGSSCHUTZ_TAGE_VOR_BEGINN);
  const kSchutzEndeP1 = p1E;
  const kSchutzEndeP2 = p2E;

  // BEEG § 15 Abs. 2: max. 36 Mon pro Elternteil bis zum 8. Geburtstag
  const verbleibendP1 = Math.max(0, MAX_ELTERNZEIT_MONATE - p1Mon);
  const verbleibendP2 = Math.max(0, MAX_ELTERNZEIT_MONATE - p2Mon);

  // BEEG § 4 Abs. 4: Partnermonate für volle 14 Mo Elterngeld
  const partnermonateOk = p1Mon >= PARTNERMONATE_MINDEST && p2Mon >= PARTNERMONATE_MINDEST;

  // MuSchG § 3 Abs. 2 Überlappung: 8-Wochen-Mutterschutz nach Geburt → wenn
  // Elternzeit-Beginn vor Mutterschutz-Ende liegt, gibt's eine Überlappung
  // (relevant für die Mutter, wird auf Elternzeit angerechnet).
  const mutterschutzEnde = addTage(g, MUTTERSCHUTZ_ENDE_TAGE_NACH_GEBURT);
  const ueberlappung = p1B < mutterschutzEnde || p2B < mutterschutzEnde;

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
  };
}
