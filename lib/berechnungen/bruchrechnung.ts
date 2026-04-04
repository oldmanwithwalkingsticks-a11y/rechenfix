export type Operation = '+' | '-' | '×' | '÷';

export interface Bruch {
  zaehler: number;
  nenner: number;
}

export interface GemischteZahl {
  ganz: number;
  zaehler: number;
  nenner: number;
}

// --- Hilfsfunktionen ---

export function ggt(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function kgv(a: number, b: number): number {
  return Math.abs(a * b) / ggt(a, b);
}

export function kuerzen(b: Bruch): Bruch {
  if (b.nenner === 0) return b;
  const g = ggt(Math.abs(b.zaehler), Math.abs(b.nenner));
  let z = b.zaehler / g;
  let n = b.nenner / g;
  // Vorzeichen immer im Zähler
  if (n < 0) { z = -z; n = -n; }
  return { zaehler: z, nenner: n };
}

export function zuGemischt(b: Bruch): GemischteZahl | null {
  if (b.nenner === 0) return null;
  const vorzeichen = (b.zaehler < 0) !== (b.nenner < 0) ? -1 : 1;
  const absZ = Math.abs(b.zaehler);
  const absN = Math.abs(b.nenner);
  const ganz = Math.floor(absZ / absN);
  const rest = absZ % absN;
  if (ganz === 0) return null;
  return { ganz: ganz * vorzeichen, zaehler: rest, nenner: absN };
}

export function gemischtZuBruch(g: number, z: number, n: number): Bruch {
  if (n === 0) return { zaehler: 0, nenner: 1 };
  const vorzeichen = g < 0 ? -1 : 1;
  const zaehler = (Math.abs(g) * n + Math.abs(z)) * vorzeichen;
  return { zaehler, nenner: n };
}

export function bruchZuDezimal(b: Bruch): number | null {
  if (b.nenner === 0) return null;
  return b.zaehler / b.nenner;
}

// --- Tab 1: Brüche rechnen ---

export interface RechenSchritte {
  eingabe: string;
  hauptnenner: string | null;
  erweitert: string | null;
  ungekuerzt: string | null;
  gekuerzt: string;
}

export interface BruchRechenErgebnis {
  ergebnis: Bruch;
  dezimal: number;
  gemischt: GemischteZahl | null;
  schritte: RechenSchritte;
}

function fmtBruch(b: Bruch): string {
  return `${b.zaehler}/${b.nenner}`;
}

export function berechneBrueche(
  b1: Bruch,
  op: Operation,
  b2: Bruch
): BruchRechenErgebnis | null {
  if (b1.nenner === 0 || b2.nenner === 0) return null;
  if (op === '÷' && b2.zaehler === 0) return null;

  const eingabe = `${fmtBruch(b1)} ${op} ${fmtBruch(b2)}`;

  let rohZaehler: number;
  let rohNenner: number;
  let hauptnenner: string | null = null;
  let erweitert: string | null = null;
  let ungekuerztStr: string | null = null;

  if (op === '+' || op === '-') {
    const hn = kgv(b1.nenner, b2.nenner);
    const f1 = hn / b1.nenner;
    const f2 = hn / b2.nenner;
    const z1 = b1.zaehler * f1;
    const z2 = b2.zaehler * f2;

    if (hn !== b1.nenner || hn !== b2.nenner) {
      hauptnenner = `Hauptnenner: ${hn}`;
      erweitert = `${z1}/${hn} ${op} ${z2}/${hn}`;
    }

    rohZaehler = op === '+' ? z1 + z2 : z1 - z2;
    rohNenner = hn;
  } else if (op === '×') {
    rohZaehler = b1.zaehler * b2.zaehler;
    rohNenner = b1.nenner * b2.nenner;
  } else {
    // Division: mit Kehrwert multiplizieren
    rohZaehler = b1.zaehler * b2.nenner;
    rohNenner = b1.nenner * b2.zaehler;
  }

  const ungekuerzt: Bruch = { zaehler: rohZaehler, nenner: rohNenner };
  const ergebnis = kuerzen(ungekuerzt);

  if (ungekuerzt.zaehler !== ergebnis.zaehler || ungekuerzt.nenner !== ergebnis.nenner) {
    ungekuerztStr = fmtBruch(ungekuerzt);
  }

  const dez = bruchZuDezimal(ergebnis);
  if (dez === null) return null;

  return {
    ergebnis,
    dezimal: Math.round(dez * 1000000) / 1000000,
    gemischt: zuGemischt(ergebnis),
    schritte: {
      eingabe,
      hauptnenner,
      erweitert,
      ungekuerzt: ungekuerztStr,
      gekuerzt: fmtBruch(ergebnis),
    },
  };
}

// --- Tab 2: Bruch kürzen ---

export interface KuerzenErgebnis {
  original: Bruch;
  gekuerzt: Bruch;
  teilGgt: number;
  istBereitsGekuerzt: boolean;
}

export function kuerzeBruch(b: Bruch): KuerzenErgebnis | null {
  if (b.nenner === 0) return null;
  const g = ggt(Math.abs(b.zaehler), Math.abs(b.nenner));
  const gekuerzt = kuerzen(b);
  return {
    original: b,
    gekuerzt,
    teilGgt: g,
    istBereitsGekuerzt: g === 1,
  };
}

// --- Tab 3: Dezimal ↔ Bruch ---

export function dezimalZuBruch(dezimal: number): Bruch | null {
  if (!isFinite(dezimal)) return null;

  // Dezimalstellen zählen
  const str = dezimal.toString();
  const dotIndex = str.indexOf('.');
  const nachkommastellen = dotIndex === -1 ? 0 : str.length - dotIndex - 1;

  const faktor = Math.pow(10, nachkommastellen);
  const zaehler = Math.round(dezimal * faktor);
  const nenner = faktor;

  return kuerzen({ zaehler, nenner });
}

// --- Tab 4: Brüche vergleichen ---

export type Vergleich = '>' | '<' | '=';

export interface VergleichErgebnis {
  b1Dezimal: number;
  b2Dezimal: number;
  zeichen: Vergleich;
}

export function vergleicheBrueche(b1: Bruch, b2: Bruch): VergleichErgebnis | null {
  const d1 = bruchZuDezimal(b1);
  const d2 = bruchZuDezimal(b2);
  if (d1 === null || d2 === null) return null;

  let zeichen: Vergleich;
  if (Math.abs(d1 - d2) < 1e-10) zeichen = '=';
  else if (d1 > d2) zeichen = '>';
  else zeichen = '<';

  return {
    b1Dezimal: Math.round(d1 * 1000000) / 1000000,
    b2Dezimal: Math.round(d2 * 1000000) / 1000000,
    zeichen,
  };
}
