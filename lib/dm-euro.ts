/**
 * Unwiderruflich festgelegte Umrechnungskurse der Eurozone-Altwährungen.
 *
 * Rechtsgrundlage der Kurse: Verordnung (EG) Nr. 2866/98 des Rates
 * v. 31.12.1998 (ABl. L 359 v. 31.12.1998, S. 1–2), in Kraft seit
 * 1. Januar 1999, unwiderruflich; für spätere Beitritte jeweils per
 * Änderungsverordnung des Rates.
 * Rundungs- und Umrechnungsregeln: Verordnung (EG) Nr. 1103/97 des Rates
 * v. 17.06.1997 (ABl. L 162 v. 19.06.1997, S. 1–3), Art. 4 und 5.
 * Stand: 31.07.2026. Quelle: eur-lex.europa.eu; EZB, Übersicht Umtauschfristen.
 *
 * `kurs` ist der numerische Faktor (1 EUR = kurs Einheiten der Landeswährung).
 * `anzeige` ist der amtliche String mit sechs signifikanten Stellen
 * (Art. 4 Abs. 1 VO 1103/97) — die Nullen am Ende sind Absicht, kein Tippfehler.
 */
export interface Altwaehrung {
  code: string;
  name: string;
  kurs: number;
  anzeige: string;
  seit: number;
}

// Reihenfolge: Deutsche Mark zuerst, dann die übrigen 1999er-Gründungskurse
// alphabetisch, danach nach Beitrittsjahr aufsteigend.
export const ALTWAEHRUNGEN: Altwaehrung[] = [
  { code: 'DEM', name: 'Deutsche Mark', kurs: 1.95583, anzeige: '1,95583', seit: 1999 },
  { code: 'ATS', name: 'Österreichischer Schilling', kurs: 13.7603, anzeige: '13,7603', seit: 1999 },
  { code: 'BEF', name: 'Belgischer Franc', kurs: 40.3399, anzeige: '40,3399', seit: 1999 },
  { code: 'ESP', name: 'Spanische Peseta', kurs: 166.386, anzeige: '166,386', seit: 1999 },
  { code: 'FIM', name: 'Finnmark', kurs: 5.94573, anzeige: '5,94573', seit: 1999 },
  { code: 'FRF', name: 'Französischer Franc', kurs: 6.55957, anzeige: '6,55957', seit: 1999 },
  { code: 'IEP', name: 'Irisches Pfund', kurs: 0.787564, anzeige: '0,787564', seit: 1999 },
  { code: 'ITL', name: 'Italienische Lira', kurs: 1936.27, anzeige: '1936,27', seit: 1999 },
  { code: 'LUF', name: 'Luxemburgischer Franc', kurs: 40.3399, anzeige: '40,3399', seit: 1999 },
  { code: 'NLG', name: 'Niederländischer Gulden', kurs: 2.20371, anzeige: '2,20371', seit: 1999 },
  { code: 'PTE', name: 'Portugiesischer Escudo', kurs: 200.482, anzeige: '200,482', seit: 1999 },
  { code: 'GRD', name: 'Griechische Drachme', kurs: 340.750, anzeige: '340,750', seit: 2001 },
  { code: 'SIT', name: 'Slowenischer Tolar', kurs: 239.640, anzeige: '239,640', seit: 2007 },
  { code: 'CYP', name: 'Zypern-Pfund', kurs: 0.585274, anzeige: '0,585274', seit: 2008 },
  { code: 'MTL', name: 'Maltesische Lira', kurs: 0.429300, anzeige: '0,429300', seit: 2008 },
  { code: 'SKK', name: 'Slowakische Krone', kurs: 30.1260, anzeige: '30,1260', seit: 2009 },
  { code: 'EEK', name: 'Estnische Krone', kurs: 15.6466, anzeige: '15,6466', seit: 2011 },
  { code: 'LVL', name: 'Lettischer Lats', kurs: 0.702804, anzeige: '0,702804', seit: 2014 },
  { code: 'LTL', name: 'Litauischer Litas', kurs: 3.45280, anzeige: '3,45280', seit: 2015 },
  { code: 'HRK', name: 'Kroatische Kuna', kurs: 7.53450, anzeige: '7,53450', seit: 2023 },
  { code: 'BGN', name: 'Bulgarischer Lew', kurs: 1.95583, anzeige: '1,95583', seit: 2026 },
];

export interface UmrechnungErgebnis {
  betrag: number;
  kursAnzeige: string;
}

export function getAltwaehrung(code: string): Altwaehrung | undefined {
  return ALTWAEHRUNGEN.find((w) => w.code === code);
}

// Art. 5 VO 1103/97: Der zu zahlende Betrag wird auf den nächstliegenden Cent
// gerundet; liegt das Ergebnis genau in der Mitte, wird aufgerundet. Math.round
// erfüllt beides für positive Beträge.
function rundeCent(wert: number): number {
  return Math.round(wert * 100) / 100;
}

/**
 * Altwährung → Euro. Es wird durch den Kurs geteilt.
 * Art. 4 Abs. 3 VO 1103/97 verbietet ausdrücklich die Verwendung eines aus dem
 * Umrechnungskurs abgeleiteten inversen Kurses; Art. 4 Abs. 2 verbietet, den
 * Kurs selbst zu runden oder zu kürzen.
 */
export function inEuro(betrag: number, code: string): UmrechnungErgebnis | null {
  const e = getAltwaehrung(code);
  if (!e || Number.isNaN(betrag)) return null;
  return { betrag: rundeCent(betrag / e.kurs), kursAnzeige: e.anzeige };
}

/**
 * Euro → Altwährung. Es wird mit dem Kurs multipliziert.
 */
export function vonEuro(betrag: number, code: string): UmrechnungErgebnis | null {
  const e = getAltwaehrung(code);
  if (!e || Number.isNaN(betrag)) return null;
  return { betrag: rundeCent(betrag * e.kurs), kursAnzeige: e.anzeige };
}

/**
 * Altwährung → Altwährung. Art. 4 Abs. 4 VO 1103/97: zuerst in Euro umrechnen,
 * das Zwischenergebnis NICHT runden, dann in die Zielwährung weiterrechnen
 * (Dreiecksweg). Nur das Endergebnis wird auf den Cent gerundet.
 */
export function zwischenAltwaehrungen(
  betrag: number,
  vonCode: string,
  nachCode: string,
): UmrechnungErgebnis | null {
  const v = getAltwaehrung(vonCode);
  const n = getAltwaehrung(nachCode);
  if (!v || !n || Number.isNaN(betrag)) return null;
  const euro = betrag / v.kurs; // Zwischenergebnis bewusst ungerundet
  return { betrag: rundeCent(euro * n.kurs), kursAnzeige: `${v.anzeige} · ${n.anzeige}` };
}
