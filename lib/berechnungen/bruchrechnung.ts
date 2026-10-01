/**
 * Bruchrechnung für den Bruchrechner — durchgehend exakt mit BigInt (W154).
 *
 * Invariante: Zähler, Nenner, ganze Teile, kgV, GGT, Erweiterungsfaktoren und Zwischenwerte
 * sind BigInt, in allen vier Reitern und im Rechenweg. Eingaben kommen als Text und werden ohne
 * Umweg über eine Gleitkommazahl in BigInt überführt. Bis W153 war das Number: Ab
 * Number.MAX_SAFE_INTEGER (9007199254740991) rundete die Rechnung still, und
 * 999999999/1000000000 − 999999998/999999999 ergab 0 statt 1/999999999000000000.
 *
 * BigInt über Aufrufe statt Literale: tsconfig setzt kein target, und 0n braucht ES2020.
 */

export type Operation = '+' | '-' | '×' | '÷';

export interface Bruch {
  zaehler: bigint;
  nenner: bigint;
}

export interface GemischteZahl {
  ganz: bigint;
  zaehler: bigint;
  nenner: bigint;
}

const B0 = BigInt(0);
const B1 = BigInt(1);
const B2 = BigInt(2);
const B10 = BigInt(10);
const MILLION = BigInt(1000000);

// --- Hilfsfunktionen ---

function betrag(x: bigint): bigint {
  return x < B0 ? -x : x;
}

function zehnHoch(stellen: number): bigint {
  let p = B1;
  for (let i = 0; i < stellen; i++) p *= B10;
  return p;
}

export function ggt(a: bigint, b: bigint): bigint {
  a = betrag(a);
  b = betrag(b);
  while (b !== B0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function kgv(a: bigint, b: bigint): bigint {
  a = betrag(a);
  b = betrag(b);
  if (a === B0 || b === B0) return B0;
  return (a / ggt(a, b)) * b;
}

export function kuerzen(b: Bruch): Bruch {
  if (b.nenner === B0) return b;
  const g = ggt(b.zaehler, b.nenner);
  let z = b.zaehler / g;
  let n = b.nenner / g;
  // Vorzeichen immer im Zähler
  if (n < B0) { z = -z; n = -n; }
  return { zaehler: z, nenner: n };
}

export function zuGemischt(b: Bruch): GemischteZahl | null {
  if (b.nenner === B0) return null;
  const negativ = (b.zaehler < B0) !== (b.nenner < B0);
  const absZ = betrag(b.zaehler);
  const absN = betrag(b.nenner);
  const ganz = absZ / absN; // BigInt-Division schneidet ab; bei Beträgen ist das Abrunden
  const rest = absZ % absN;
  if (ganz === B0) return null;
  return { ganz: negativ ? -ganz : ganz, zaehler: rest, nenner: absN };
}

export function gemischtZuBruch(g: bigint, z: bigint, n: bigint): Bruch {
  if (n === B0) return { zaehler: B0, nenner: B1 };
  const zaehler = betrag(g) * n + betrag(z);
  return { zaehler: g < B0 ? -zaehler : zaehler, nenner: n };
}

// --- Eingaben: Text direkt in BigInt ---

/**
 * Dezimalzahl aus einer Texteingabe exakt als Bruch (W150, BigInt seit W154). Die Ziffern vor
 * und nach dem Komma werden als Text zum Zähler zusammengesetzt, der Nenner ist 10^Nachkomma-
 * stellen: „0,75“ = 75/100. `roh` ist dieser Zehnerbruch für den Rechenweg, `bruch` der gekürzte.
 *
 * Zahlformat wie parseDeutscheZahl: Komma = Dezimalzeichen, Punkte davor sind Tausenderpunkte;
 * ohne Komma gelten mehrere Punkte oder ein Punkt vor genau drei Ziffern als Tausenderpunkte.
 * Abweichung: Steht vor dem Punkt nur eine Null (0.125), ist er ein Dezimalpunkt — eine
 * Tausendergruppe beginnt nie mit 0. Die frühere Grenze von neun Nachkommastellen und 15 Ziffern
 * entfällt mit BigInt.
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
  const ziffern = BigInt((m[2] === '' ? '0' : m[2]) + nachkomma);
  const roh: Bruch = { zaehler: m[1] === '-' ? -ziffern : ziffern, nenner: zehnHoch(nachkomma.length) };
  return { roh, bruch: kuerzen(roh) };
}

/**
 * Ganze Zahl aus einem Bruchfeld (W154). Gleiches Zahlformat wie dezimalTextZuBruch; ein
 * leeres Feld ist 0 wie bei parseDeutscheZahl. Nachkommastellen ungleich 0 und alles, was keine
 * Zahl ist, ergeben null. Anders als parseFloat nimmt der Leser „12abc“ nicht mehr als 12.
 */
export function ganzzahlText(text: string): bigint | null {
  if ((text ?? '').trim() === '') return B0;
  const r = dezimalTextZuBruch(text);
  if (!r || r.bruch.nenner !== B1) return null;
  return r.bruch.zaehler;
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
  hauptnenner: bigint | null;
  faktor1: bigint | null;
  faktor2: bigint | null;
  zaehler1: bigint | null;
  zaehler2: bigint | null;
  /** Ergebnis vor dem Kürzen. */
  roh: Bruch;
}

export interface BruchRechenErgebnis {
  ergebnis: Bruch;
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
  if (b1.nenner === B0 || b2.nenner === B0) return null;
  if (op === '÷' && b2.zaehler === B0) return null;

  const eingabe = `${fmtBruch(b1)} ${op} ${fmtBruch(b2)}`;

  let rohZaehler: bigint;
  let rohNenner: bigint;
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

  return {
    ergebnis,
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
  teilGgt: bigint;
  istBereitsGekuerzt: boolean;
}

export function kuerzeBruch(b: Bruch): KuerzenErgebnis | null {
  if (b.nenner === B0) return null;
  const g = ggt(b.zaehler, b.nenner);
  return {
    original: b,
    gekuerzt: kuerzen(b),
    teilGgt: g,
    istBereitsGekuerzt: g === B1,
  };
}

// --- Tab 4: Brüche vergleichen ---

export type Vergleich = '>' | '<' | '=';

export interface VergleichErgebnis {
  /**
   * Exakt (seit W153): Beide Brüche auf den Hauptnenner gebracht, Zähler verglichen. Bis W152
   * war das ein Dezimalvergleich mit der Toleranz 1e-10.
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

export function vergleicheBrueche(b1: Bruch, b2: Bruch): VergleichErgebnis | null {
  if (b1.nenner === B0 || b2.nenner === B0) return null;

  const n1 = betrag(b1.nenner);
  const n2 = betrag(b2.nenner);
  const hn = kgv(n1, n2);
  const z1 = (b1.nenner < B0 ? -b1.zaehler : b1.zaehler) * (hn / n1);
  const z2 = (b2.nenner < B0 ? -b2.zaehler : b2.zaehler) * (hn / n2);

  return {
    zeichen: z1 === z2 ? '=' : z1 > z2 ? '>' : '<',
    gleichnamig: { nenner1: n1, nenner2: n2, hauptnenner: hn, zaehler1: z1, zaehler2: z2 },
  };
}

// --- Dezimalanzeige ---

const MINUS = '−';

/** Ganzzahl mit Tausenderpunkten wie toLocaleString('de-DE'): 1234 → „1.234“. */
function gruppiert(x: bigint): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export interface DezimalAnzeige {
  /** „=“, wenn der angezeigte Wert exakt ist, sonst „≈“. */
  zeichen: '=' | '≈';
  /** Angezeigter Wert, Minuszeichen U+2212. */
  wert: string;
  /** Der angezeigte Wert in Millionsteln (auf sechs Stellen gerundet, mit Vorzeichen). */
  millionstel: bigint;
}

/**
 * Die eine Stelle für jede Dezimalanzeige eines Bruchs (W153, exakt seit W154): Ergebniszeile,
 * Bruch → Dezimal, Rechenweg-Schritt und Kontrollzeile.
 *
 * Darstellung wie bisher: sechs Nachkommastellen, Nullen am Ende entfallen, mindestens eine
 * Stelle, Tausenderpunkte. Gerundet wird wie Math.round(x · 10^6): halbe Stellen nach oben, bei
 * negativen Werten also zur Null hin. Anders als bis W153 rechnet auch die Darstellung mit
 * BigInt, damit lange Zähler keine erfundenen Ziffern bekommen.
 *
 * Exakt heißt: Mit dem gekürzten Bruch z/n und der angezeigten Stellenzahl s ist
 * (z × 10^s) mod n = 0.
 */
export function dezimalAnzeige(b: Bruch): DezimalAnzeige | null {
  if (b.nenner === B0) return null;
  const { zaehler: z, nenner: n } = kuerzen(b); // n > 0
  const negativ = z < B0;
  const skaliert = betrag(z) * MILLION;
  let q = skaliert / n;
  const r = skaliert % n;
  if (negativ ? B2 * r > n : B2 * r >= n) q += B1;

  let nachkomma = (q % MILLION).toString().padStart(6, '0').replace(/0+$/, '');
  if (nachkomma === '') nachkomma = '0';
  const wert = `${negativ ? MINUS : ''}${gruppiert(q / MILLION)},${nachkomma}`;

  return {
    zeichen: (z * zehnHoch(nachkomma.length)) % n === B0 ? '=' : '≈',
    wert,
    millionstel: negativ ? -q : q,
  };
}

// --- Rechenweg Schritt für Schritt (W152) ---
//
// Reine Funktionen ohne UI. Sie bilden den Rechenweg aus den Zwischenwerten der Funktionen
// oben und rechnen das Ergebnis nicht neu. Schreibweise: a/b, ×, ÷, Dezimalkomma,
// Minuszeichen (U+2212) vor dem Bruch. Seit W154 gibt es keine Grenze mehr für große Zahlen:
// Alle Werte sind BigInt und damit exakt.

export interface RechenwegSchritt {
  titel: string;
  rechnung: string;
}

/** Wie eine Seite der Aufgabe eingegeben wurde — für den Umwandlungsschritt. */
export type OperandQuelle =
  | { art: 'bruch'; bruch: Bruch }
  | { art: 'gemischt'; ganz: bigint; zaehler: bigint; nenner: bigint; bruch: Bruch }
  | { art: 'dezimal'; text: string; roh: Bruch; bruch: Bruch };

/** Ganze Zahl mit echtem Minuszeichen. */
function zahl(x: bigint): string {
  return x < B0 ? `${MINUS}${-x}` : String(x);
}

/** Wie zahl(), negative Werte in Klammern — für die zweite Stelle einer Rechnung. */
function klammer(x: bigint): string {
  return x < B0 ? `(${zahl(x)})` : String(x);
}

/** Bruch mit dem Minuszeichen vor dem Bruch: −7/12. */
function bruchText(b: Bruch): string {
  const negativ = b.zaehler !== B0 && (b.zaehler < B0) !== (b.nenner < B0);
  return `${negativ ? MINUS : ''}${betrag(b.zaehler)}/${betrag(b.nenner)}`;
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
 * Kürzen: `ggtWert` ist der Teiler, den kuerzen() verwendet hat. Aus den Nennern abgeleitet
 * (|roh.nenner| / gekuerzt.nenner), nicht neu bestimmt.
 */
function schrittKuerzen(roh: Bruch, gekuerzt: Bruch, ggtWert: bigint, titel = 'Kürzen'): RechenwegSchritt {
  const z = betrag(roh.zaehler);
  const n = betrag(roh.nenner);
  if (ggtWert === B1) {
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
  if (betrag(b.zaehler) <= betrag(b.nenner)) return null;
  const g = zuGemischt(b);
  if (!g) return null;
  const vz = bruchText(b).startsWith(MINUS) ? MINUS : '';
  const ganz = betrag(g.ganz);
  const ziel = g.zaehler === B0 ? `${vz}${ganz}` : `${vz}${ganz} ${g.zaehler}/${g.nenner}`;
  return {
    titel: 'In eine gemischte Zahl umwandeln',
    rechnung: `${betrag(b.zaehler)} ÷ ${betrag(b.nenner)} = ${ganz} Rest ${g.zaehler} → ${ziel}`,
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
    const vz = o.ganz < B0 ? MINUS : '';
    const g = betrag(o.ganz);
    const z = betrag(o.zaehler);
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
    const ggtWert = betrag(o.roh.nenner) / o.bruch.nenner;
    if (ggtWert > B1) schritte.push(schrittKuerzen(o.roh, o.bruch, ggtWert, `Bruch kürzen (${welche} Zahl)`));
    return schritte;
  }
  return [];
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
): RechenwegSchritt[] {
  if (!erg) return [];
  const b1 = o1.bruch;
  const b2 = o2.bruch;
  const zw = erg.zwischen;
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
      schritte.push({ titel: 'Hauptnenner bestimmen', rechnung: `kgV(${betrag(b1.nenner)}, ${betrag(b2.nenner)}) = ${hn}` });
      const erweitern: [Bruch, bigint, bigint, string][] = [
        [b1, zw.faktor1, zw.zaehler1, 'Ersten'],
        [b2, zw.faktor2, zw.zaehler2, 'Zweiten'],
      ];
      for (const [b, f, z, welcher] of erweitern) {
        if (f === B1) continue;
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

  schritte.push(schrittKuerzen(zw.roh, erg.ergebnis, betrag(zw.roh.nenner) / erg.ergebnis.nenner));
  const gemischt = schrittGemischt(erg.ergebnis);
  if (gemischt) schritte.push(gemischt);
  const dezimal = schrittDezimal(erg.ergebnis);
  if (dezimal) schritte.push(dezimal);
  return schritte;
}

/** Reiter „Kürzen“. */
export function rechenwegKuerzen(e: KuerzenErgebnis): RechenwegSchritt[] {
  const z = betrag(e.original.zaehler);
  const n = betrag(e.original.nenner);
  const schritte: RechenwegSchritt[] = [];
  if (e.teilGgt === B1) {
    schritte.push({ titel: 'Kürzen prüfen', rechnung: `GGT(${z}, ${n}) = 1 — der Bruch ist bereits vollständig gekürzt` });
  } else {
    schritte.push({ titel: 'Größten gemeinsamen Teiler bestimmen', rechnung: `GGT(${z}, ${n}) = ${e.teilGgt}` });
    schritte.push({
      titel: `Zähler und Nenner durch ${e.teilGgt} teilen`,
      rechnung: `${z} ÷ ${e.teilGgt} = ${betrag(e.gekuerzt.zaehler)}, ${n} ÷ ${e.teilGgt} = ${e.gekuerzt.nenner} → ${bruchText(e.gekuerzt)}`,
    });
  }
  const gemischt = schrittGemischt(e.gekuerzt);
  if (gemischt) schritte.push(gemischt);
  return schritte;
}

/** Reiter „Dezimal ↔ Bruch“, Richtung Dezimal → Bruch. `r` kommt aus dezimalTextZuBruch(text). */
export function rechenwegDezimalZuBruch(text: string, r: { roh: Bruch; bruch: Bruch }): RechenwegSchritt[] {
  const stellen = r.roh.nenner.toString().length - 1;
  const schritte: RechenwegSchritt[] = [{
    titel: 'Als Zehnerbruch schreiben',
    rechnung: `${stellen} ${stellen === 1 ? 'Nachkommastelle' : 'Nachkommastellen'} → Nenner ${r.roh.nenner}: ${text.trim().replace(/^-/, MINUS)} = ${bruchText(r.roh)}`,
  }];
  schritte.push(schrittKuerzen(r.roh, r.bruch, r.roh.nenner / r.bruch.nenner));
  const gemischt = schrittGemischt(r.bruch);
  if (gemischt) schritte.push(gemischt);
  return schritte;
}

/**
 * Reiter „Dezimal ↔ Bruch“, Richtung Bruch → Dezimal. `eingabe` ist der eingegebene Bruch,
 * `gekuerzt` der Bruch der Ergebnisanzeige.
 */
export function rechenwegBruchZuDezimal(eingabe: Bruch, gekuerzt: Bruch): RechenwegSchritt[] {
  const schritte: RechenwegSchritt[] = [];
  const ggtWert = betrag(eingabe.nenner) / gekuerzt.nenner;
  if (ggtWert > B1) schritte.push(schrittKuerzen(eingabe, gekuerzt, ggtWert));
  const dezimal = schrittDezimal(gekuerzt);
  if (dezimal) schritte.push(dezimal);
  return schritte;
}

/** Reiter „Vergleichen“: gleichnamig machen, Zähler vergleichen, Dezimalwerte als Kontrolle. */
export function rechenwegVergleich(b1: Bruch, b2: Bruch, e: VergleichErgebnis): RechenwegSchritt[] {
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
      if (f === B1) continue;
      schritte.push({
        titel: `${welcher} Bruch mit ${f} erweitern`,
        rechnung: `${bruchText(b)} = ${bruchText({ zaehler: z, nenner: g.hauptnenner })}`,
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
    if (a1.millionstel !== a2.millionstel) rechnung = `${links} ${a1.millionstel < a2.millionstel ? '<' : '>'} ${rechts}`;
    else if (e.zeichen === '=') rechnung = `${links} = ${rechts}`;
    else rechnung = `${links} und ${bruchText(b2)} ${a2.zeichen} ${a2.wert} — auf sechs Nachkommastellen nicht zu unterscheiden`;
    schritte.push({ titel: 'Kontrolle', rechnung });
  }
  return schritte;
}
