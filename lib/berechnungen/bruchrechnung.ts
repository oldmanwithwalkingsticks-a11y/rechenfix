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

/**
 * Zwischenwerte der Rechnung, unverändert aus berechneBrueche durchgereicht (W152).
 * Der Rechenweg wird daraus gebildet und nicht neu gerechnet.
 */
export interface BruchZwischenwerte {
  /** Nur + und −: kgV der Nenner, Erweiterungsfaktoren und erweiterte Zähler. */
  hauptnenner: number | null;
  faktor1: number | null;
  faktor2: number | null;
  zaehler1: number | null;
  zaehler2: number | null;
  /** Ergebnis vor dem Kürzen. */
  roh: Bruch;
}

export interface BruchRechenErgebnis {
  ergebnis: Bruch;
  dezimal: number;
  gemischt: GemischteZahl | null;
  schritte: RechenSchritte;
  zwischen: BruchZwischenwerte;
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
  let zw: Omit<BruchZwischenwerte, 'roh'> = {
    hauptnenner: null, faktor1: null, faktor2: null, zaehler1: null, zaehler2: null,
  };

  if (op === '+' || op === '-') {
    const hn = kgv(b1.nenner, b2.nenner);
    const f1 = hn / b1.nenner;
    const f2 = hn / b2.nenner;
    const z1 = b1.zaehler * f1;
    const z2 = b2.zaehler * f2;
    zw = { hauptnenner: hn, faktor1: f1, faktor2: f2, zaehler1: z1, zaehler2: z2 };

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
    zwischen: { ...zw, roh: ungekuerzt },
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
  if (!isFinite(dezimal) || Math.abs(dezimal) >= 1e15) return null;

  // Dezimalstellen zählen. toFixed statt toString (W150): toString liefert unter 1e-6 die
  // Exponentialschreibweise ("1e-7"), deren Nachkommastellen die Zählung übersah — aus
  // 0,0000001 wurde 0. Zwölf Stellen, Nullen am Ende entfallen.
  const str = Number.isInteger(dezimal) ? String(dezimal) : dezimal.toFixed(12).replace(/0+$/, '');
  const dotIndex = str.indexOf('.');
  const nachkommastellen = dotIndex === -1 ? 0 : str.length - dotIndex - 1;

  const faktor = Math.pow(10, nachkommastellen);
  const zaehler = Math.round(dezimal * faktor);
  const nenner = faktor;

  return kuerzen({ zaehler, nenner });
}

/**
 * Dezimalzahl aus einer Texteingabe exakt als Bruch (W150). Rechnet mit den Ziffern, nicht mit
 * der Gleitkommazahl: „0,1“ wird 1/10. `roh` ist der ungekürzte Zehnerbruch für den Rechenweg
 * (0,75 = 75/100), `bruch` der gekürzte (3/4).
 *
 * Zahlformat wie parseDeutscheZahl: Komma = Dezimalzeichen, Punkte davor sind Tausenderpunkte;
 * ohne Komma gelten mehrere Punkte oder ein Punkt vor genau drei Ziffern als Tausenderpunkte.
 * Abweichung: Steht vor dem Punkt nur eine Null (0.125), ist er ein Dezimalpunkt — eine
 * Tausendergruppe beginnt nie mit 0. Höchstens neun Nachkommastellen und 15 Ziffern, sonst null.
 */
export function dezimalTextZuBruch(text: string): { roh: Bruch; bruch: Bruch } | null {
  let t = (text ?? '').replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) {
    t = t.replace(/\./g, '').replace(',', '.');
  } else {
    const punkte = (t.match(/\./g) ?? []).length;
    const tausender = punkte >= 2 || (punkte === 1 && /^[+-]?[1-9]\d{0,2}\.\d{3}$/.test(t));
    if (tausender) t = t.replace(/\./g, '');
  }
  const m = /^([+-]?)(\d*)(?:\.(\d+))?$/.exec(t);
  if (!m || (m[2] === '' && m[3] === undefined)) return null;
  const nachkomma = m[3] ?? '';
  const ziffern = (m[2] === '' ? '0' : m[2]) + nachkomma;
  if (nachkomma.length > 9 || ziffern.replace(/^0+/, '').length > 15) return null;
  const vorzeichen = m[1] === '-' ? -1 : 1;
  const roh: Bruch = { zaehler: vorzeichen * Number(ziffern), nenner: 10 ** nachkomma.length };
  return { roh, bruch: kuerzen(roh) };
}

// --- Tab 4: Brüche vergleichen ---

export type Vergleich = '>' | '<' | '=';

export interface VergleichErgebnis {
  /**
   * Exakt (W153): Beide Brüche werden mit BigInt auf den Hauptnenner gebracht und die Zähler
   * verglichen. Bis W152 war das ein Dezimalvergleich mit der Toleranz 1e-10, der sehr nahe
   * Brüche (1/10000000000 und 1/10000000001) für gleich hielt.
   */
  zeichen: Vergleich;
  /** Dieselbe Rechnung für den Rechenweg: Nenner positiv, Vorzeichen im Zähler. */
  gleichnamig: {
    nenner1: bigint;
    nenner2: bigint;
    hauptnenner: bigint;
    zaehler1: bigint;
    zaehler2: bigint;
  };
}

// BigInt über Aufrufe statt Literale: tsconfig setzt kein target, und 0n braucht ES2020.
const BIG0 = BigInt(0);
const BIG1 = BigInt(1);
const BIG10 = BigInt(10);

function betragBig(x: bigint): bigint {
  return x < BIG0 ? -x : x;
}

function ggtBig(a: bigint, b: bigint): bigint {
  a = betragBig(a);
  b = betragBig(b);
  while (b !== BIG0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function vergleicheBrueche(b1: Bruch, b2: Bruch): VergleichErgebnis | null {
  if (b1.nenner === 0 || b2.nenner === 0) return null;
  if (![b1.zaehler, b1.nenner, b2.zaehler, b2.nenner].every(Number.isInteger)) return null;

  const n1 = betragBig(BigInt(b1.nenner));
  const n2 = betragBig(BigInt(b2.nenner));
  const hn = (n1 / ggtBig(n1, n2)) * n2;
  const z1 = (b1.nenner < 0 ? -BigInt(b1.zaehler) : BigInt(b1.zaehler)) * (hn / n1);
  const z2 = (b2.nenner < 0 ? -BigInt(b2.zaehler) : BigInt(b2.zaehler)) * (hn / n2);

  return {
    zeichen: z1 === z2 ? '=' : z1 > z2 ? '>' : '<',
    gleichnamig: { nenner1: n1, nenner2: n2, hauptnenner: hn, zaehler1: z1, zaehler2: z2 },
  };
}

// --- Rechenweg Schritt für Schritt (W152) ---
//
// Reine Funktionen ohne UI. Sie bilden den Rechenweg aus den Zwischenwerten der Funktionen
// oben und rechnen das Ergebnis nicht neu. Schreibweise: a/b, ×, ÷, Dezimalkomma,
// Minuszeichen (U+2212) vor dem Bruch.

export interface RechenwegSchritt {
  titel: string;
  rechnung: string;
}

/**
 * Rechenweg eines Reiters (W153). Ist `hinweis` gesetzt, sind die Zahlen zu groß für einen
 * exakten Rechenweg; dann bleibt `schritte` leer und der Hinweis steht an ihrer Stelle.
 */
export interface Rechenweg {
  schritte: RechenwegSchritt[];
  hinweis: string | null;
}

export const HINWEIS_ZU_GROSS = 'Die Zahlen sind zu groß für einen exakten Rechenweg.';

/**
 * Grenze (W153): Ist ein Zwischenwert kein sicherer Integer (|x| > 2^53 − 1), hat die
 * Gleitkommarechnung bereits gerundet, und der Rechenweg würde falsche Zahlen zeigen.
 */
function mitGrenze(werte: number[], bauen: () => RechenwegSchritt[]): Rechenweg {
  if (werte.some((w) => !Number.isSafeInteger(w))) return { schritte: [], hinweis: HINWEIS_ZU_GROSS };
  return { schritte: bauen(), hinweis: null };
}

/** Wie eine Seite der Aufgabe eingegeben wurde — für den Umwandlungsschritt. */
export type OperandQuelle =
  | { art: 'bruch'; bruch: Bruch }
  | { art: 'gemischt'; ganz: number; zaehler: number; nenner: number; bruch: Bruch }
  | { art: 'dezimal'; text: string; roh: Bruch; bruch: Bruch };

const MINUS = '−';

/** Ganze Zahl mit echtem Minuszeichen. */
function zahl(x: number | bigint): string {
  return x < 0 ? `${MINUS}${String(x).replace(/^-/, '')}` : String(x);
}

/** Wie zahl(), negative Werte in Klammern — für die zweite Stelle einer Rechnung. */
function klammer(x: number): string {
  return x < 0 ? `(${zahl(x)})` : String(x);
}

/** Bruch mit dem Minuszeichen vor dem Bruch: −7/12. */
function bruchText(b: Bruch): string {
  const negativ = b.zaehler !== 0 && (b.zaehler < 0) !== (b.nenner < 0);
  return `${negativ ? MINUS : ''}${Math.abs(b.zaehler)}/${Math.abs(b.nenner)}`;
}

/** Bruch aus BigInt-Werten, Nenner positiv: −7/12. */
function bruchTextBig(z: bigint, n: bigint): string {
  return `${zahl(z)}/${n}`;
}

/** Bruch als zweiter Operand: negative Brüche in Klammern. */
function bruchOperand(b: Bruch): string {
  const t = bruchText(b);
  return t.startsWith(MINUS) ? `(${t})` : t;
}

function opZeichen(op: Operation): string {
  return op === '-' ? MINUS : op;
}

/**
 * Dezimalzahl in derselben Stellenzahl und Rundung wie seit jeher im Rechner: sechs Stellen
 * gerundet, mindestens eine Nachkommastelle.
 */
export function formatDezimal(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 6 });
}

export interface DezimalAnzeige {
  /** „=“, wenn der angezeigte Wert exakt ist, sonst „≈“. */
  zeichen: '=' | '≈';
  /** Angezeigter Wert, Minuszeichen U+2212. */
  wert: string;
  /** Der angezeigte Wert als Zahl, auf sechs Stellen gerundet. */
  gerundet: number;
}

/**
 * Die eine Stelle für jede Dezimalanzeige eines Bruchs (W153): Ergebniszeile, Bruch → Dezimal,
 * Rechenweg-Schritt und Kontrollzeile. Stellenzahl und Rundung wie bisher. Exakt heißt: Mit
 * dem gekürzten Bruch z/n und der angezeigten Stellenzahl s ist (z × 10^s) mod n = 0, mit
 * BigInt gerechnet.
 */
export function dezimalAnzeige(b: Bruch): DezimalAnzeige | null {
  if (b.nenner === 0 || !Number.isInteger(b.zaehler) || !Number.isInteger(b.nenner)) return null;
  const gerundet = Math.round((b.zaehler / b.nenner) * 1000000) / 1000000;
  const text = formatDezimal(gerundet);
  const komma = text.indexOf(',');
  const stellen = komma === -1 ? 0 : text.length - komma - 1;

  let z = BigInt(b.zaehler);
  let n = BigInt(b.nenner);
  const g = ggtBig(z, n);
  z /= g;
  n /= g;
  if (n < BIG0) { z = -z; n = -n; }
  let zehnHochS = BIG1;
  for (let i = 0; i < stellen; i++) zehnHochS *= BIG10;

  return {
    zeichen: (z * zehnHochS) % n === BIG0 ? '=' : '≈',
    wert: text.replace(/^-/, MINUS),
    gerundet,
  };
}

/**
 * Kürzen: `ggtWert` ist der Teiler, den kuerzen() verwendet hat. Aus den Nennern abgeleitet
 * (|roh.nenner| / gekuerzt.nenner), nicht neu bestimmt.
 */
function schrittKuerzen(roh: Bruch, gekuerzt: Bruch, ggtWert: number, titel = 'Kürzen'): RechenwegSchritt {
  const z = Math.abs(roh.zaehler);
  const n = Math.abs(roh.nenner);
  if (ggtWert === 1) {
    return { titel: 'Kürzen prüfen', rechnung: `GGT(${z}, ${n}) = 1 — der Bruch ist bereits vollständig gekürzt` };
  }
  const vz = bruchText(gekuerzt).startsWith(MINUS) ? MINUS : '';
  return {
    titel,
    rechnung: `GGT(${z}, ${n}) = ${ggtWert} → ${vz}(${z} ÷ ${ggtWert})/(${n} ÷ ${ggtWert}) = ${bruchText(gekuerzt)}`,
  };
}

/** Gemischte Zahl, nur wenn |Zähler| > Nenner. Ganze und Rest kommen aus zuGemischt(). */
function schrittGemischt(b: Bruch): RechenwegSchritt | null {
  if (Math.abs(b.zaehler) <= Math.abs(b.nenner)) return null;
  const g = zuGemischt(b);
  if (!g) return null;
  const vz = bruchText(b).startsWith(MINUS) ? MINUS : '';
  const ganz = Math.abs(g.ganz);
  const ziel = g.zaehler === 0 ? `${vz}${ganz}` : `${vz}${ganz} ${g.zaehler}/${g.nenner}`;
  return {
    titel: 'In eine gemischte Zahl umwandeln',
    rechnung: `${Math.abs(b.zaehler)} ÷ ${Math.abs(b.nenner)} = ${ganz} Rest ${g.zaehler} → ${ziel}`,
  };
}

/** Zähler durch Nenner, mit „=“ oder „≈“ aus dezimalAnzeige(). */
function schrittDezimal(b: Bruch): RechenwegSchritt | null {
  const a = dezimalAnzeige(b);
  if (!a) return null;
  return { titel: 'Zähler durch Nenner teilen', rechnung: `${zahl(b.zaehler)} ÷ ${b.nenner} ${a.zeichen} ${a.wert}` };
}

function schritteUmwandeln(o: OperandQuelle, nr: 1 | 2): RechenwegSchritt[] {
  const welche = nr === 1 ? 'erste' : 'zweite';
  if (o.art === 'gemischt') {
    const vz = o.ganz < 0 ? MINUS : '';
    const g = Math.abs(o.ganz);
    const z = Math.abs(o.zaehler);
    return [{
      titel: `Gemischte Zahl umwandeln (${welche} Zahl)`,
      rechnung: `${vz}${g} ${z}/${klammer(o.nenner)} = ${vz}(${g} × ${klammer(o.nenner)} + ${z})/${klammer(o.nenner)} = ${bruchText(o.bruch)}`,
    }];
  }
  if (o.art === 'dezimal') {
    const text = o.text.replace(/^-/, MINUS);
    const schritte: RechenwegSchritt[] = [
      { titel: `Dezimalzahl als Bruch schreiben (${welche} Zahl)`, rechnung: `${text} = ${bruchText(o.roh)}` },
    ];
    const ggtWert = Math.abs(o.roh.nenner) / o.bruch.nenner;
    if (ggtWert > 1) schritte.push(schrittKuerzen(o.roh, o.bruch, ggtWert, `Bruch kürzen (${welche} Zahl)`));
    return schritte;
  }
  return [];
}

function werteDerQuelle(o: OperandQuelle): number[] {
  if (o.art === 'gemischt') return [o.ganz, o.zaehler, o.nenner, o.bruch.zaehler, o.bruch.nenner];
  if (o.art === 'dezimal') return [o.roh.zaehler, o.roh.nenner, o.bruch.zaehler, o.bruch.nenner];
  return [o.bruch.zaehler, o.bruch.nenner];
}

/**
 * Reiter „Brüche rechnen“. `o1`/`o2` beschreiben die Eingabe, `erg` ist das Ergebnis von
 * berechneBrueche() mit genau diesen Brüchen. Ohne Ergebnis (etwa Division durch 0) kein
 * Rechenweg.
 */
export function rechenwegBrueche(
  o1: OperandQuelle,
  op: Operation,
  o2: OperandQuelle,
  erg: BruchRechenErgebnis | null,
): Rechenweg {
  if (!erg) return { schritte: [], hinweis: null };
  const b1 = o1.bruch;
  const b2 = o2.bruch;
  const zw = erg.zwischen;
  const ggtErgebnis = Math.abs(zw.roh.nenner) / erg.ergebnis.nenner;

  const werte = [
    ...werteDerQuelle(o1), ...werteDerQuelle(o2),
    zw.roh.zaehler, zw.roh.nenner, erg.ergebnis.zaehler, erg.ergebnis.nenner, ggtErgebnis,
  ];
  for (const x of [zw.hauptnenner, zw.faktor1, zw.faktor2, zw.zaehler1, zw.zaehler2]) {
    if (x !== null) werte.push(x);
  }
  if (erg.gemischt) werte.push(erg.gemischt.ganz, erg.gemischt.zaehler);

  return mitGrenze(werte, () => {
    const schritte: RechenwegSchritt[] = [...schritteUmwandeln(o1, 1), ...schritteUmwandeln(o2, 2)];

    if (op === '÷') {
      const kehrwert: Bruch = { zaehler: b2.nenner, nenner: b2.zaehler };
      schritte.push({
        titel: 'Kehrwert bilden',
        rechnung: `${bruchText(b1)} ÷ ${bruchOperand(b2)} = ${bruchText(b1)} × ${bruchOperand(kehrwert)} (mit dem Kehrwert von ${bruchText(b2)} multiplizieren)`,
      });
    }

    if ((op === '+' || op === '-') && zw.hauptnenner !== null && zw.faktor1 !== null && zw.faktor2 !== null
        && zw.zaehler1 !== null && zw.zaehler2 !== null) {
      const hn = zw.hauptnenner;
      if (hn === b1.nenner && hn === b2.nenner) {
        schritte.push({
          titel: 'Gleiche Nenner — kein Erweitern nötig',
          rechnung: `${bruchText(b1)} ${opZeichen(op)} ${bruchOperand(b2)}`,
        });
      } else {
        schritte.push({ titel: 'Hauptnenner bestimmen', rechnung: `kgV(${Math.abs(b1.nenner)}, ${Math.abs(b2.nenner)}) = ${hn}` });
        const erweitern: [Bruch, number, number, string][] = [
          [b1, zw.faktor1, zw.zaehler1, 'Ersten'],
          [b2, zw.faktor2, zw.zaehler2, 'Zweiten'],
        ];
        for (const [b, f, z, welcher] of erweitern) {
          if (f === 1) continue;
          schritte.push({
            titel: `${welcher} Bruch mit ${zahl(f)} erweitern`,
            rechnung: `${bruchText(b)} = (${zahl(b.zaehler)} × ${klammer(f)})/(${zahl(b.nenner)} × ${klammer(f)}) = ${bruchText({ zaehler: z, nenner: hn })}`,
          });
        }
      }
      schritte.push({
        titel: op === '+' ? 'Zähler addieren, Nenner beibehalten' : 'Zähler subtrahieren, Nenner beibehalten',
        rechnung: `(${zahl(zw.zaehler1)} ${opZeichen(op)} ${klammer(zw.zaehler2)})/${hn} = ${bruchText(zw.roh)}`,
      });
    } else if (op === '×') {
      schritte.push({
        titel: 'Zähler mal Zähler, Nenner mal Nenner',
        rechnung: `(${zahl(b1.zaehler)} × ${klammer(b2.zaehler)})/(${zahl(b1.nenner)} × ${klammer(b2.nenner)}) = ${bruchText(zw.roh)}`,
      });
    } else if (op === '÷') {
      schritte.push({
        titel: 'Zähler mal Zähler, Nenner mal Nenner',
        rechnung: `(${zahl(b1.zaehler)} × ${klammer(b2.nenner)})/(${zahl(b1.nenner)} × ${klammer(b2.zaehler)}) = ${bruchText(zw.roh)}`,
      });
    }

    schritte.push(schrittKuerzen(zw.roh, erg.ergebnis, ggtErgebnis));
    const gemischt = schrittGemischt(erg.ergebnis);
    if (gemischt) schritte.push(gemischt);
    const dezimal = schrittDezimal(erg.ergebnis);
    if (dezimal) schritte.push(dezimal);
    return schritte;
  });
}

/** Reiter „Kürzen“. */
export function rechenwegKuerzen(e: KuerzenErgebnis): Rechenweg {
  const z = Math.abs(e.original.zaehler);
  const n = Math.abs(e.original.nenner);
  const werte = [e.original.zaehler, e.original.nenner, e.teilGgt, e.gekuerzt.zaehler, e.gekuerzt.nenner];
  return mitGrenze(werte, () => {
    const schritte: RechenwegSchritt[] = [];
    if (e.teilGgt === 1) {
      schritte.push({ titel: 'Kürzen prüfen', rechnung: `GGT(${z}, ${n}) = 1 — der Bruch ist bereits vollständig gekürzt` });
    } else {
      schritte.push({ titel: 'Größten gemeinsamen Teiler bestimmen', rechnung: `GGT(${z}, ${n}) = ${e.teilGgt}` });
      schritte.push({
        titel: `Zähler und Nenner durch ${e.teilGgt} teilen`,
        rechnung: `${z} ÷ ${e.teilGgt} = ${Math.abs(e.gekuerzt.zaehler)}, ${n} ÷ ${e.teilGgt} = ${e.gekuerzt.nenner} → ${bruchText(e.gekuerzt)}`,
      });
    }
    const gemischt = schrittGemischt(e.gekuerzt);
    if (gemischt) schritte.push(gemischt);
    return schritte;
  });
}

/** Reiter „Dezimal ↔ Bruch“, Richtung Dezimal → Bruch. `r` kommt aus dezimalTextZuBruch(text). */
export function rechenwegDezimalZuBruch(text: string, r: { roh: Bruch; bruch: Bruch }): Rechenweg {
  const ggtWert = r.roh.nenner / r.bruch.nenner;
  const werte = [r.roh.zaehler, r.roh.nenner, r.bruch.zaehler, r.bruch.nenner, ggtWert];
  return mitGrenze(werte, () => {
    const stellen = String(r.roh.nenner).length - 1;
    const schritte: RechenwegSchritt[] = [{
      titel: 'Als Zehnerbruch schreiben',
      rechnung: `${stellen} ${stellen === 1 ? 'Nachkommastelle' : 'Nachkommastellen'} → Nenner ${r.roh.nenner}: ${text.trim().replace(/^-/, MINUS)} = ${bruchText(r.roh)}`,
    }];
    schritte.push(schrittKuerzen(r.roh, r.bruch, ggtWert));
    const gemischt = schrittGemischt(r.bruch);
    if (gemischt) schritte.push(gemischt);
    return schritte;
  });
}

/**
 * Reiter „Dezimal ↔ Bruch“, Richtung Bruch → Dezimal. `eingabe` ist der eingegebene Bruch,
 * `gekuerzt` der Bruch der Ergebnisanzeige.
 */
export function rechenwegBruchZuDezimal(eingabe: Bruch, gekuerzt: Bruch): Rechenweg {
  const ggtWert = Math.abs(eingabe.nenner) / gekuerzt.nenner;
  const werte = [eingabe.zaehler, eingabe.nenner, gekuerzt.zaehler, gekuerzt.nenner, ggtWert];
  return mitGrenze(werte, () => {
    const schritte: RechenwegSchritt[] = [];
    if (ggtWert > 1) schritte.push(schrittKuerzen(eingabe, gekuerzt, ggtWert));
    const dezimal = schrittDezimal(gekuerzt);
    if (dezimal) schritte.push(dezimal);
    return schritte;
  });
}

/**
 * Reiter „Vergleichen“: gleichnamig machen, Zähler vergleichen, Dezimalwerte als Kontrolle.
 * Alle Zahlen kommen aus der BigInt-Rechnung von vergleicheBrueche(); eine Grenze braucht es
 * hier deshalb nicht.
 */
export function rechenwegVergleich(b1: Bruch, b2: Bruch, e: VergleichErgebnis): Rechenweg {
  const g = e.gleichnamig;
  const schritte: RechenwegSchritt[] = [];
  if (g.nenner1 === g.nenner2) {
    schritte.push({ titel: 'Gleiche Nenner — kein Erweitern nötig', rechnung: `${bruchText(b1)} und ${bruchText(b2)}` });
  } else {
    schritte.push({ titel: 'Hauptnenner bestimmen', rechnung: `kgV(${g.nenner1}, ${g.nenner2}) = ${g.hauptnenner}` });
    const erweitern: [Bruch, bigint, bigint, string][] = [
      [b1, g.hauptnenner / g.nenner1, g.zaehler1, 'Ersten'],
      [b2, g.hauptnenner / g.nenner2, g.zaehler2, 'Zweiten'],
    ];
    for (const [b, f, z, welcher] of erweitern) {
      if (f === BIG1) continue;
      schritte.push({
        titel: `${welcher} Bruch mit ${f} erweitern`,
        rechnung: `${bruchText(b)} = ${bruchTextBig(z, g.hauptnenner)}`,
      });
    }
  }
  schritte.push({
    titel: 'Zähler vergleichen',
    rechnung: `${zahl(g.zaehler1)} ${e.zeichen} ${zahl(g.zaehler2)} → ${bruchText(b1)} ${e.zeichen} ${bruchText(b2)}`,
  });

  // Kontrolle mit den angezeigten Dezimalwerten. Das Zeichen zwischen ihnen vergleicht die
  // gerundeten Werte selbst; sind sie gleich, obwohl die Brüche verschieden sind, steht das da.
  const a1 = dezimalAnzeige(b1);
  const a2 = dezimalAnzeige(b2);
  if (a1 && a2) {
    const links = `${bruchText(b1)} ${a1.zeichen} ${a1.wert}`;
    const rechts = `${a2.wert} ${a2.zeichen} ${bruchText(b2)}`;
    let rechnung: string;
    if (a1.gerundet !== a2.gerundet) rechnung = `${links} ${a1.gerundet < a2.gerundet ? '<' : '>'} ${rechts}`;
    else if (e.zeichen === '=') rechnung = `${links} = ${rechts}`;
    else rechnung = `${links} und ${bruchText(b2)} ${a2.zeichen} ${a2.wert} — auf sechs Nachkommastellen nicht zu unterscheiden`;
    schritte.push({ titel: 'Kontrolle', rechnung });
  }
  return { schritte, hinweis: null };
}
