/**
 * SSOT für deutsche gesetzliche Feiertage. Berechnet bewegliche und feste
 * Feiertage pro Jahr und Bundesland.
 *
 * Modellierungs-Vereinfachungen (im Erklärtext der Konsumenten dokumentieren):
 * - Mariä Himmelfahrt (15.08.): in BY pauschal als BL-Feiertag modelliert,
 *   nicht gemeindebasiert nach kath. Bevölkerungsanteil. Saarland regulär.
 * - Fronleichnam: nur in den 6 üblicherweise BL-weit gelisteten Ländern
 *   (BW/BY/HE/NW/RP/SL); nicht in den kath. Gemeinden SN/TH.
 * - Augsburger Friedensfest (8.8., lokal Augsburg) nicht modelliert.
 *
 * Quelle Osterformel: Jean Meeus, "Astronomical Algorithms", Kap. 8
 * (Spencer-Variante der Gaußschen Osterformel, gültig im gregorianischen
 * Kalender 1583–4099).
 */

export type Bundesland =
  | 'bw' | 'by' | 'be' | 'bb' | 'hb' | 'hh' | 'he' | 'mv'
  | 'ni' | 'nw' | 'rp' | 'sl' | 'sn' | 'st' | 'sh' | 'th';

export interface Feiertag {
  datum: Date;
  name: string;
}

/**
 * Berechnet das Datum des Ostersonntags für das gegebene Jahr.
 * Spencer-Variante der Gaußschen Osterformel.
 */
export function berechneOstersonntag(jahr: number): Date {
  const a = jahr % 19;
  const b = Math.floor(jahr / 100);
  const c = jahr % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31); // 3 = März, 4 = April
  const tag = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(jahr, monat - 1, tag);
}

function addDays(date: Date, days: number): Date {
  const r = new Date(date);
  r.setDate(r.getDate() + days);
  return r;
}

/**
 * Liefert alle gesetzlichen Feiertage des Jahres für das angegebene
 * Bundesland, sortiert nach Datum.
 */
export function getFeiertage(jahr: number, bl: Bundesland): Feiertag[] {
  const ostern = berechneOstersonntag(jahr);

  // Bewegliche Feiertage (alle ostern-relativ, daher bundesweit)
  const liste: Feiertag[] = [
    { datum: new Date(jahr, 0, 1), name: 'Neujahr' },
    { datum: addDays(ostern, -2), name: 'Karfreitag' },
    { datum: addDays(ostern, 1), name: 'Ostermontag' },
    { datum: new Date(jahr, 4, 1), name: 'Tag der Arbeit' },
    { datum: addDays(ostern, 39), name: 'Christi Himmelfahrt' },
    { datum: addDays(ostern, 50), name: 'Pfingstmontag' },
    { datum: new Date(jahr, 9, 3), name: 'Tag der Deutschen Einheit' },
    { datum: new Date(jahr, 11, 25), name: '1. Weihnachtstag' },
    { datum: new Date(jahr, 11, 26), name: '2. Weihnachtstag' },
  ];

  // Heilige Drei Könige: BW, BY, ST
  if (bl === 'bw' || bl === 'by' || bl === 'st') {
    liste.push({ datum: new Date(jahr, 0, 6), name: 'Heilige Drei Könige' });
  }

  // Internationaler Frauentag: BE (seit 2019), MV (seit 2023)
  if (bl === 'be' || bl === 'mv') {
    liste.push({ datum: new Date(jahr, 2, 8), name: 'Internationaler Frauentag' });
  }

  // Fronleichnam (Ostern + 60): BW, BY, HE, NW, RP, SL
  if (['bw', 'by', 'he', 'nw', 'rp', 'sl'].includes(bl)) {
    liste.push({ datum: addDays(ostern, 60), name: 'Fronleichnam' });
  }

  // Mariä Himmelfahrt: BY (pauschal), SL
  if (bl === 'by' || bl === 'sl') {
    liste.push({ datum: new Date(jahr, 7, 15), name: 'Mariä Himmelfahrt' });
  }

  // Weltkindertag: TH (seit 2019)
  if (bl === 'th') {
    liste.push({ datum: new Date(jahr, 8, 20), name: 'Weltkindertag' });
  }

  // Reformationstag: BB, HB, HH, MV, NI, SN, SH, ST, TH
  if (['bb', 'hb', 'hh', 'mv', 'ni', 'sn', 'sh', 'st', 'th'].includes(bl)) {
    liste.push({ datum: new Date(jahr, 9, 31), name: 'Reformationstag' });
  }

  // Allerheiligen: BW, BY, NW, RP, SL
  if (['bw', 'by', 'nw', 'rp', 'sl'].includes(bl)) {
    liste.push({ datum: new Date(jahr, 10, 1), name: 'Allerheiligen' });
  }

  // Buß- und Bettag (SN): Mittwoch vor dem 23. November
  if (bl === 'sn') {
    const ref = new Date(jahr, 10, 23); // 23.11.
    const wt = ref.getDay(); // 0=So..6=Sa, Mittwoch=3
    let diff = wt - 3;
    if (diff <= 0) diff += 7; // Wenn 23.11. selbst Mi ist, dann den Mi davor
    liste.push({ datum: addDays(ref, -diff), name: 'Buß- und Bettag' });
  }

  liste.sort((a, b) => a.datum.getTime() - b.datum.getTime());
  return liste;
}

/**
 * Prüft, ob das gegebene Datum im angegebenen Bundesland ein gesetzlicher
 * Feiertag ist. Liefert den Feiertag oder null.
 */
export function istFeiertag(datum: Date, bl: Bundesland): Feiertag | null {
  const liste = getFeiertage(datum.getFullYear(), bl);
  const y = datum.getFullYear();
  const m = datum.getMonth();
  const d = datum.getDate();
  return liste.find(f =>
    f.datum.getFullYear() === y &&
    f.datum.getMonth() === m &&
    f.datum.getDate() === d
  ) ?? null;
}

/**
 * Anzahl Feiertage im Jahr für das BL, optional gefiltert auf Mo-Fr.
 */
export function anzahlFeiertage(
  jahr: number,
  bl: Bundesland,
  opts: { nurMoBisFr?: boolean } = {}
): number {
  const liste = getFeiertage(jahr, bl);
  if (!opts.nurMoBisFr) return liste.length;
  return liste.filter(f => {
    const wt = f.datum.getDay();
    return wt !== 0 && wt !== 6;
  }).length;
}

/**
 * Anzahl der bundesweiten Feiertage (= 9 Stück) im Jahr, die auf einen
 * Mo-Fr-Tag fallen. Nützlich für BL-agnostische Berechnungen wie den
 * Freelancer-Stundensatz.
 *
 * Bundesweite Feiertage: Neujahr, Karfreitag, Ostermontag, 1. Mai,
 * Christi Himmelfahrt, Pfingstmontag, 3. Oktober, 1./2. Weihnachtstag.
 *
 * Karfreitag/Ostermontag/Christi Himmelfahrt/Pfingstmontag fallen
 * konstruktionsbedingt immer auf Fr/Mo/Do/Mo. Die festen Termine
 * (1.1., 1.5., 3.10., 25.12., 26.12.) variieren.
 */
export function anzahlBundesweiterFeiertageMoBisFr(jahr: number): number {
  const ostern = berechneOstersonntag(jahr);
  const tage: Date[] = [
    new Date(jahr, 0, 1),     // Neujahr
    addDays(ostern, -2),      // Karfreitag
    addDays(ostern, 1),       // Ostermontag
    new Date(jahr, 4, 1),     // 1. Mai
    addDays(ostern, 39),      // Christi Himmelfahrt
    addDays(ostern, 50),      // Pfingstmontag
    new Date(jahr, 9, 3),     // Tag der Deutschen Einheit
    new Date(jahr, 11, 25),   // 1. Weihnachtstag
    new Date(jahr, 11, 26),   // 2. Weihnachtstag
  ];
  return tage.filter(d => {
    const wt = d.getDay();
    return wt !== 0 && wt !== 6;
  }).length;
}
