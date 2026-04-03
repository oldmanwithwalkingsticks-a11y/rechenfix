export interface BmiEingabe {
  gewicht: number;
  groesse: number; // in cm
  geschlecht: 'maennlich' | 'weiblich';
  alter?: number;
}

export interface BmiKategorie {
  label: string;
  farbe: string;
  farbeDark: string;
  min: number;
  max: number;
}

export const bmiKategorien: BmiKategorie[] = [
  { label: 'Untergewicht', farbe: '#3B82F6', farbeDark: '#60A5FA', min: 0, max: 18.5 },
  { label: 'Normalgewicht', farbe: '#22C55E', farbeDark: '#4ADE80', min: 18.5, max: 25 },
  { label: 'Übergewicht', farbe: '#F59E0B', farbeDark: '#FBBF24', min: 25, max: 30 },
  { label: 'Adipositas Grad I', farbe: '#F97316', farbeDark: '#FB923C', min: 30, max: 35 },
  { label: 'Adipositas Grad II', farbe: '#EF4444', farbeDark: '#F87171', min: 35, max: 40 },
  { label: 'Adipositas Grad III', farbe: '#DC2626', farbeDark: '#EF4444', min: 40, max: 60 },
];

export interface BmiErgebnis {
  bmi: number;
  kategorie: BmiKategorie;
  optimalerBereich: { min: number; max: number };
  optimalesGewichtMin: number;
  optimalesGewichtMax: number;
}

function getOptimalerBereich(alter?: number): { min: number; max: number } {
  if (!alter || alter < 18) return { min: 18.5, max: 24.9 };
  if (alter <= 24) return { min: 18.5, max: 24.9 };
  if (alter <= 34) return { min: 20.0, max: 25.9 };
  if (alter <= 44) return { min: 21.0, max: 26.9 };
  if (alter <= 54) return { min: 22.0, max: 27.9 };
  if (alter <= 64) return { min: 23.0, max: 28.9 };
  return { min: 24.0, max: 29.9 };
}

export function berechneBmi(eingabe: BmiEingabe): BmiErgebnis | null {
  const { gewicht, groesse, alter } = eingabe;
  if (gewicht <= 0 || groesse <= 0) return null;

  const groesseM = groesse / 100;
  const bmi = Math.round((gewicht / (groesseM * groesseM)) * 100) / 100;

  const kategorie = bmiKategorien.find(k => bmi >= k.min && bmi < k.max)
    ?? bmiKategorien[bmiKategorien.length - 1];

  const optimalerBereich = getOptimalerBereich(alter);
  const optimalesGewichtMin = Math.round(optimalerBereich.min * groesseM * groesseM * 10) / 10;
  const optimalesGewichtMax = Math.round(optimalerBereich.max * groesseM * groesseM * 10) / 10;

  return {
    bmi,
    kategorie,
    optimalerBereich,
    optimalesGewichtMin,
    optimalesGewichtMax,
  };
}
