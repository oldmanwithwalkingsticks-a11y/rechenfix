// Durchschnittliche Bruttogehälter nach Berufsgruppe (monatlich, Vollzeit)
// Quelle: Statistisches Bundesamt, Verdienststrukturerhebung 2022/2023, hochgerechnet 2026
// Median und Verteilungsparameter (Standardabweichung) für Perzentil-Berechnung

export interface Berufsgruppe {
  key: string;
  label: string;
  median: number;      // Median-Bruttogehalt monatlich
  stddev: number;      // Standardabweichung (für Normalverteilungs-Approximation)
}

export const berufsgruppen: Berufsgruppe[] = [
  { key: 'gesamt', label: 'Alle Arbeitnehmer (Durchschnitt)', median: 3600, stddev: 1400 },
  { key: 'it', label: 'IT & Softwareentwicklung', median: 4800, stddev: 1500 },
  { key: 'ingenieur', label: 'Ingenieurwesen', median: 4900, stddev: 1400 },
  { key: 'kaufm', label: 'Kaufmännische Berufe', median: 3400, stddev: 1200 },
  { key: 'gesundheit', label: 'Gesundheit & Pflege', median: 3200, stddev: 1000 },
  { key: 'handwerk', label: 'Handwerk & Produktion', median: 3000, stddev: 900 },
  { key: 'bildung', label: 'Bildung & Erziehung', median: 3500, stddev: 1000 },
  { key: 'oeffentlich', label: 'Öffentlicher Dienst', median: 3600, stddev: 1100 },
  { key: 'marketing', label: 'Marketing & Kommunikation', median: 3700, stddev: 1300 },
  { key: 'finanzen', label: 'Finanzen & Versicherung', median: 4200, stddev: 1600 },
  { key: 'recht', label: 'Recht & Steuern', median: 4500, stddev: 1700 },
  { key: 'vertrieb', label: 'Vertrieb & Verkauf', median: 3300, stddev: 1300 },
  { key: 'logistik', label: 'Logistik & Transport', median: 2900, stddev: 800 },
  { key: 'gastronomie', label: 'Gastronomie & Hotellerie', median: 2400, stddev: 700 },
  { key: 'medien', label: 'Medien & Design', median: 3400, stddev: 1200 },
];

// Regionale Gehaltsfaktoren nach Bundesland (Index: 1.0 = Bundesdurchschnitt)
export const bundeslandFaktoren: Record<string, { label: string; faktor: number }> = {
  BW: { label: 'Baden-Württemberg', faktor: 1.08 },
  BY: { label: 'Bayern', faktor: 1.07 },
  BE: { label: 'Berlin', faktor: 1.00 },
  BB: { label: 'Brandenburg', faktor: 0.85 },
  HB: { label: 'Bremen', faktor: 1.00 },
  HH: { label: 'Hamburg', faktor: 1.10 },
  HE: { label: 'Hessen', faktor: 1.09 },
  MV: { label: 'Mecklenburg-Vorpommern', faktor: 0.82 },
  NI: { label: 'Niedersachsen', faktor: 0.96 },
  NW: { label: 'Nordrhein-Westfalen', faktor: 1.02 },
  RP: { label: 'Rheinland-Pfalz', faktor: 0.97 },
  SL: { label: 'Saarland', faktor: 0.95 },
  SN: { label: 'Sachsen', faktor: 0.83 },
  ST: { label: 'Sachsen-Anhalt', faktor: 0.82 },
  SH: { label: 'Schleswig-Holstein', faktor: 0.94 },
  TH: { label: 'Thüringen', faktor: 0.82 },
};

// Altersgruppen-Faktoren (Berufserfahrung beeinflusst Gehalt)
export const altersFaktoren: Record<string, { label: string; faktor: number }> = {
  '18-24': { label: '18–24 Jahre', faktor: 0.72 },
  '25-34': { label: '25–34 Jahre', faktor: 0.90 },
  '35-44': { label: '35–44 Jahre', faktor: 1.05 },
  '45-54': { label: '45–54 Jahre', faktor: 1.10 },
  '55-64': { label: '55–64 Jahre', faktor: 1.08 },
  '65+':   { label: '65+ Jahre', faktor: 1.02 },
};

export interface GehaltsvergleichErgebnis {
  perzentil: number;             // 0–100
  adjustierterMedian: number;    // Median angepasst nach Bundesland + Alter
  differenz: number;             // Brutto − adjustierterMedian
  differenzProzent: number;      // Differenz in %
  perzentilStufen: { prozent: number; gehalt: number }[];  // Für Grafik
}

// Approximation der kumulativen Normalverteilung (Abramowitz & Stegun)
function normalCdf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX / 2);
  return 0.5 * (1.0 + sign * y);
}

// Inverse Normalverteilung (Approximation)
function normalInv(p: number): number {
  if (p <= 0) return -4;
  if (p >= 1) return 4;
  if (p === 0.5) return 0;
  const a = [
    -3.969683028665376e+01, 2.209460984245205e+02,
    -2.759285104469687e+02, 1.383577518672690e+02,
    -3.066479806614716e+01, 2.506628277459239e+00,
  ];
  const b = [
    -5.447609879822406e+01, 1.615858368580409e+02,
    -1.556989798598866e+02, 6.680131188771972e+01,
    -1.328068155288572e+01,
  ];
  const c = [
    -7.784894002430293e-03, -3.223964580411365e-01,
    -2.400758277161838e+00, -2.549732539343734e+00,
    4.374664141464968e+00, 2.938163982698783e+00,
  ];
  const d = [
    7.784695709041462e-03, 3.224671290700398e-01,
    2.445134137142996e+00, 3.754408661907416e+00,
  ];
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  let q: number, r: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
           (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
            ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

export function berechneGehaltsvergleich(
  brutto: number,
  berufsgruppeKey: string,
  bundeslandKey: string,
  altersgruppe: string,
): GehaltsvergleichErgebnis | null {
  if (brutto <= 0) return null;

  const beruf = berufsgruppen.find(b => b.key === berufsgruppeKey);
  if (!beruf) return null;

  const blFaktor = bundeslandFaktoren[bundeslandKey]?.faktor ?? 1.0;
  const alterFaktor = altersFaktoren[altersgruppe]?.faktor ?? 1.0;

  const adjustierterMedian = Math.round(beruf.median * blFaktor * alterFaktor);
  const adjustierteStddev = beruf.stddev * blFaktor * alterFaktor;

  // Z-Score und Perzentil berechnen
  const z = (brutto - adjustierterMedian) / adjustierteStddev;
  const perzentil = Math.round(Math.max(1, Math.min(99, normalCdf(z) * 100)));

  const differenz = brutto - adjustierterMedian;
  const differenzProzent = adjustierterMedian > 0 ? Math.round((differenz / adjustierterMedian) * 1000) / 10 : 0;

  // Perzentilstufen für Grafik
  const stufen = [10, 25, 50, 75, 90];
  const perzentilStufen = stufen.map(p => ({
    prozent: p,
    gehalt: Math.round(adjustierterMedian + normalInv(p / 100) * adjustierteStddev),
  }));

  return { perzentil, adjustierterMedian, differenz, differenzProzent, perzentilStufen };
}
