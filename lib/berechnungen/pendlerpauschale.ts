export interface PendlerEingabe {
  entfernungKm: number;
  arbeitstageProJahr: number;
  grenzsteuersatz: number;
  homeofficeTageProWoche: number;
  arbeitstageProWoche: number;
}

export interface PendlerErgebnis {
  erste20km: number;
  ab21km: number;
  pauschaleGesamt: number;
  steuerersparnis: number;
  monatlicheErsparnis: number;
  homeofficePauschale: number;
  homeofficeTageJahr: number;
  homeofficeVorteilhaft: boolean;
  aufschluesselung: { label: string; wert: string }[];
}

export function berechnePendlerpauschale(eingabe: PendlerEingabe): PendlerErgebnis | null {
  const { entfernungKm, arbeitstageProJahr, grenzsteuersatz, homeofficeTageProWoche, arbeitstageProWoche } = eingabe;
  if (entfernungKm <= 0 || arbeitstageProJahr <= 0 || grenzsteuersatz <= 0) return null;

  const km = Math.round(entfernungKm);

  // Erste 20 km: 0,30 € pro km
  const kmErste20 = Math.min(km, 20);
  const erste20km = kmErste20 * 0.30 * arbeitstageProJahr;

  // Ab km 21: 0,38 € pro km
  const kmAb21 = Math.max(km - 20, 0);
  const ab21km = kmAb21 * 0.38 * arbeitstageProJahr;

  const pauschaleGesamt = erste20km + ab21km;

  const steuerersparnis = pauschaleGesamt * grenzsteuersatz / 100;
  const monatlicheErsparnis = steuerersparnis / 12;

  // Homeoffice-Pauschale
  const homeofficeTageJahr = Math.min(
    Math.round(homeofficeTageProWoche * (arbeitstageProJahr / arbeitstageProWoche)),
    210
  );
  const homeofficePauschale = homeofficeTageJahr * 6;

  const aufschluesselung: { label: string; wert: string }[] = [
    {
      label: `Erste 20 km: ${kmErste20} km × 0,30 € × ${arbeitstageProJahr} Tage`,
      wert: `${fmtEuro(erste20km)}`,
    },
  ];

  if (kmAb21 > 0) {
    aufschluesselung.push({
      label: `Ab km 21: ${kmAb21} km × 0,38 € × ${arbeitstageProJahr} Tage`,
      wert: `${fmtEuro(ab21km)}`,
    });
  }

  aufschluesselung.push({
    label: 'Pendlerpauschale gesamt',
    wert: fmtEuro(pauschaleGesamt),
  });

  aufschluesselung.push({
    label: `Steuerersparnis (${grenzsteuersatz}% Grenzsteuersatz)`,
    wert: fmtEuro(steuerersparnis),
  });

  return {
    erste20km,
    ab21km,
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
