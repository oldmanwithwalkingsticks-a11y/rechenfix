export interface KalorienEingabe {
  geschlecht: 'frau' | 'mann';
  alter: number;
  groesse: number;
  gewicht: number;
  aktivitaet: number;
  ziel: 'abnehmen' | 'halten' | 'zunehmen';
}

export interface KalorienErgebnis {
  grundumsatz: number;
  gesamtumsatz: number;
  zielKalorien: number;
  differenz: number;
  protein: number;
  kohlenhydrate: number;
  fett: number;
  proteinGramm: number;
  kohlenhydrateGramm: number;
  fettGramm: number;
}

export function berechneKalorien(eingabe: KalorienEingabe): KalorienErgebnis | null {
  const { geschlecht, alter, groesse, gewicht, aktivitaet, ziel } = eingabe;

  if (alter <= 0 || groesse <= 0 || gewicht <= 0) return null;

  // Mifflin-St Jeor-Formel
  const grundumsatz = geschlecht === 'mann'
    ? (10 * gewicht) + (6.25 * groesse) - (5 * alter) + 5
    : (10 * gewicht) + (6.25 * groesse) - (5 * alter) - 161;

  const gesamtumsatz = grundumsatz * aktivitaet;

  let differenz = 0;
  if (ziel === 'abnehmen') differenz = -500;
  if (ziel === 'zunehmen') differenz = 300;

  const zielKalorien = gesamtumsatz + differenz;

  // Makronährstoffverteilung
  const proteinKcal = zielKalorien * 0.30;
  const kohlenhydrateKcal = zielKalorien * 0.45;
  const fettKcal = zielKalorien * 0.25;

  return {
    grundumsatz: Math.round(grundumsatz),
    gesamtumsatz: Math.round(gesamtumsatz),
    zielKalorien: Math.round(zielKalorien),
    differenz,
    protein: 30,
    kohlenhydrate: 45,
    fett: 25,
    proteinGramm: Math.round(proteinKcal / 4),
    kohlenhydrateGramm: Math.round(kohlenhydrateKcal / 4),
    fettGramm: Math.round(fettKcal / 9),
  };
}
