export type NotenSystem = 'deutsch' | 'gpa' | 'uk' | 'ects';

export interface NotenErgebnis {
  deutscheNote: number;
  gpa: number;
  ukClassification: string;
  ectsGrade: string;
  bewertung: string;
}

export interface UkClassification {
  value: string;
  label: string;
  deutscheNote: number;
}

export interface EctsGrade {
  value: string;
  label: string;
  deutscheNote: number;
}

export const UK_CLASSIFICATIONS: UkClassification[] = [
  { value: 'first', label: 'First Class (1st)', deutscheNote: 1.3 },
  { value: '2:1', label: 'Upper Second (2:1)', deutscheNote: 2.0 },
  { value: '2:2', label: 'Lower Second (2:2)', deutscheNote: 3.0 },
  { value: 'third', label: 'Third Class (3rd)', deutscheNote: 3.7 },
];

export const ECTS_GRADES: EctsGrade[] = [
  { value: 'A', label: 'A – Excellent', deutscheNote: 1.3 },
  { value: 'B', label: 'B – Very Good', deutscheNote: 1.8 },
  { value: 'C', label: 'C – Good', deutscheNote: 2.5 },
  { value: 'D', label: 'D – Satisfactory', deutscheNote: 3.3 },
  { value: 'E', label: 'E – Sufficient', deutscheNote: 3.8 },
  { value: 'F', label: 'F – Fail', deutscheNote: 5.0 },
];

// --- Konvertierungsfunktionen ---

const NMAX = 4.0;
const NMIN = 1.0;

/** Deutsche Note → GPA (modifizierte Bayerische Formel) */
function deutschZuGpa(nd: number): number {
  if (nd >= 5.0) return 0.0;
  const gpa = 1 + 3 * (NMAX - nd) / (NMAX - NMIN);
  return Math.round(Math.max(0.0, Math.min(4.0, gpa)) * 100) / 100;
}

/** GPA → Deutsche Note (inverse Bayerische Formel) */
function gpaZuDeutsch(gpa: number): number {
  // GPA = 1 + 3 * (4 - nd) / 3  →  nd = 4 - (GPA - 1)
  const nd = NMAX - (gpa - 1);
  return Math.round(Math.max(NMIN, Math.min(5.0, nd)) * 10) / 10;
}

/** Deutsche Note → UK Classification */
function deutschZuUk(nd: number): string {
  if (nd <= 1.5) return 'First Class (1st)';
  if (nd <= 2.5) return 'Upper Second (2:1)';
  if (nd <= 3.5) return 'Lower Second (2:2)';
  if (nd <= 4.0) return 'Third Class (3rd)';
  return 'Fail';
}

/** Deutsche Note → ECTS Grade */
function deutschZuEcts(nd: number): string {
  if (nd <= 1.5) return 'A';
  if (nd <= 2.0) return 'B';
  if (nd <= 3.0) return 'C';
  if (nd <= 3.5) return 'D';
  if (nd <= 4.0) return 'E';
  return 'F';
}

/** Deutsche Note → Bewertungstext */
function deutschZuBewertung(nd: number): string {
  if (nd < 1.5) return 'sehr gut';
  if (nd < 2.5) return 'gut';
  if (nd < 3.5) return 'befriedigend';
  if (nd <= 4.0) return 'ausreichend';
  return 'nicht bestanden';
}

/** Ergebnis aus pivot Deutsche Note berechnen */
function ergebnisAusDeutsch(nd: number): NotenErgebnis {
  return {
    deutscheNote: Math.round(nd * 10) / 10,
    gpa: deutschZuGpa(nd),
    ukClassification: deutschZuUk(nd),
    ectsGrade: deutschZuEcts(nd),
    bewertung: deutschZuBewertung(nd),
  };
}

// --- Hauptfunktion ---

export function rechneNotenUm(system: string, wert: number | string): NotenErgebnis | null {
  if (system === 'deutsch') {
    const nd = typeof wert === 'string' ? parseFloat(wert.replace(',', '.')) : wert;
    if (isNaN(nd) || nd < 1.0 || nd > 5.0) return null;
    return ergebnisAusDeutsch(nd);
  }

  if (system === 'gpa') {
    const gpa = typeof wert === 'string' ? parseFloat(wert.replace(',', '.')) : wert;
    if (isNaN(gpa) || gpa < 0.0 || gpa > 4.0) return null;
    const nd = gpaZuDeutsch(gpa);
    const ergebnis = ergebnisAusDeutsch(nd);
    // GPA-Eingabe direkt verwenden (gerundet auf 2 Stellen)
    return { ...ergebnis, gpa: Math.round(gpa * 100) / 100 };
  }

  if (system === 'uk') {
    const ukEntry = UK_CLASSIFICATIONS.find(u => u.value === wert);
    if (!ukEntry) return null;
    return ergebnisAusDeutsch(ukEntry.deutscheNote);
  }

  if (system === 'ects') {
    const ectsEntry = ECTS_GRADES.find(e => e.value === wert);
    if (!ectsEntry) return null;
    return ergebnisAusDeutsch(ectsEntry.deutscheNote);
  }

  return null;
}

// --- Vorberechnete Umrechnungstabelle ---

export interface UmrechnungsZeile {
  deutscheNote: number;
  deutscheNoteFormatiert: string;
  gpa: number;
  ukClassification: string;
  ectsGrade: string;
  bewertung: string;
}

const TABELLEN_NOTEN = [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0];

export const UMRECHNUNGSTABELLE: UmrechnungsZeile[] = TABELLEN_NOTEN.map(nd => {
  const ergebnis = ergebnisAusDeutsch(nd);
  return {
    deutscheNote: nd,
    deutscheNoteFormatiert: nd.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    gpa: ergebnis.gpa,
    ukClassification: ergebnis.ukClassification,
    ectsGrade: ergebnis.ectsGrade,
    bewertung: ergebnis.bewertung,
  };
});
