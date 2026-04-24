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
  /**
   * True, wenn `zielKalorien` auf den Grundumsatz angehoben wurde, weil das
   * rechnerische Defizit (Ziel „abnehmen") den Wert darunter gedrückt hätte.
   * BZgA/BfR-Richtwert: tägliche Aufnahme sollte nicht unter den Grundumsatz fallen.
   */
  zielGeklammertAufGrundumsatz: boolean;
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

  // Minimum-Klammer: zielKalorien darf nie unter den Grundumsatz fallen.
  // Relevant bei niedrigem Grundumsatz + Defizit (Ziel "abnehmen"), wo 1.427 − 500 = 927 kcal
  // das medizinische Minimum unterschreiten würde. Eating-Disorder-Prävention.
  const zielKalorienRoh = gesamtumsatz + differenz;
  const zielGeklammertAufGrundumsatz = zielKalorienRoh < grundumsatz;
  const zielKalorien = Math.max(zielKalorienRoh, grundumsatz);

  // Makronährstoffverteilung
  const proteinKcal = zielKalorien * 0.30;
  const kohlenhydrateKcal = zielKalorien * 0.45;
  const fettKcal = zielKalorien * 0.25;

  return {
    grundumsatz: Math.round(grundumsatz),
    gesamtumsatz: Math.round(gesamtumsatz),
    zielKalorien: Math.round(zielKalorien),
    differenz,
    zielGeklammertAufGrundumsatz,
    protein: 30,
    kohlenhydrate: 45,
    fett: 25,
    proteinGramm: Math.round(proteinKcal / 4),
    kohlenhydrateGramm: Math.round(kohlenhydrateKcal / 4),
    fettGramm: Math.round(fettKcal / 9),
  };
}
