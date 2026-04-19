export interface PendlerEingabe {
  entfernungKm: number;
  arbeitstageProJahr: number;
  grenzsteuersatz: number;
  homeofficeTageProWoche: number;
  arbeitstageProWoche: number;
}

export interface PendlerErgebnis {
  pauschaleGesamt: number;
  steuerersparnis: number;
  monatlicheErsparnis: number;
  homeofficePauschale: number;
  homeofficeTageJahr: number;
  homeofficeVorteilhaft: boolean;
  aufschluesselung: { label: string; wert: string }[];
}

// § 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025:
// Einheitlich 0,38 €/km ab dem ersten Kilometer (seit 01.01.2026).
export const PENDLERPAUSCHALE_SATZ_2026 = 0.38;
// Homeoffice-Pauschale § 4 Abs. 5 Nr. 6c EStG — 6 €/Tag, max. 210 Tage.
export const HOMEOFFICE_PAUSCHALE_PRO_TAG = 6;
export const HOMEOFFICE_PAUSCHALE_MAX_TAGE = 210;

export function berechnePendlerpauschale(eingabe: PendlerEingabe): PendlerErgebnis | null {
  const { entfernungKm, arbeitstageProJahr, grenzsteuersatz, homeofficeTageProWoche, arbeitstageProWoche } = eingabe;
  if (entfernungKm <= 0 || arbeitstageProJahr <= 0 || grenzsteuersatz <= 0) return null;

  const km = Math.round(entfernungKm);

  // Einheitlicher Satz 0,38 €/km ab dem ersten Kilometer
  const pauschaleGesamt = km * PENDLERPAUSCHALE_SATZ_2026 * arbeitstageProJahr;

  const steuerersparnis = pauschaleGesamt * grenzsteuersatz / 100;
  const monatlicheErsparnis = steuerersparnis / 12;

  // Homeoffice-Pauschale
  const homeofficeTageJahr = Math.min(
    Math.round(homeofficeTageProWoche * (arbeitstageProJahr / arbeitstageProWoche)),
    HOMEOFFICE_PAUSCHALE_MAX_TAGE,
  );
  const homeofficePauschale = homeofficeTageJahr * HOMEOFFICE_PAUSCHALE_PRO_TAG;

  const aufschluesselung: { label: string; wert: string }[] = [
    {
      label: `Pendlerpauschale: ${km} km × 0,38 € × ${arbeitstageProJahr} Tage`,
      wert: fmtEuro(pauschaleGesamt),
    },
    {
      label: `Steuerersparnis (${grenzsteuersatz}% Grenzsteuersatz)`,
      wert: fmtEuro(steuerersparnis),
    },
  ];

  return {
    pauschaleGesamt,
    steuerersparnis,
    monatlicheErsparnis,
    homeofficePauschale,
    homeofficeTageJahr,
    homeofficeVorteilhaft: homeofficePauschale > pauschaleGesamt,
    aufschluesselung,
  };
}

export function berechneArbeitstage(
  tageProWoche: number,
  urlaubstage: number,
  feiertage: number,
  krankheitstage: number,
  homeofficeTageProWoche: number,
): number {
  const bruttoTage = tageProWoche * 52;
  const praesenzTageProWoche = tageProWoche - homeofficeTageProWoche;
  const anteilPraesenz = tageProWoche > 0 ? praesenzTageProWoche / tageProWoche : 1;
  const nettoTage = bruttoTage - urlaubstage - feiertage - krankheitstage;
  return Math.max(Math.round(nettoTage * anteilPraesenz), 0);
}

function fmtEuro(n: number): string {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
