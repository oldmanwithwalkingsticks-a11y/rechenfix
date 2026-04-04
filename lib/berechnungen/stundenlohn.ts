export type StundenlohnModus = 'stundenlohn' | 'monatsgehalt' | 'jahresgehalt';

export const MINDESTLOHN_2026 = 12.82;
export const WOCHEN_PRO_MONAT = 4.33;
export const WOCHEN_PRO_JAHR = 52;

export interface StundenlohnEingabe {
  modus: StundenlohnModus;
  bruttogehalt: number;
  stundenlohn: number;
  wochenstunden: number;
  arbeitstageProWoche: number;
  urlaubstage: number;
  feiertage: number;
}

export interface StundenlohnErgebnis {
  stundenlohn: number;
  monatsgehalt: number;
  jahresgehalt: number;
  effektiverStundenlohn: number;
  differenzMindestlohn: number;
  ueberMindestlohn: boolean;
  arbeitsstundenProMonat: number;
  arbeitsstundenProJahr: number;
  effektiveArbeitstage: number;
}

export function berechneStundenlohn(eingabe: StundenlohnEingabe): StundenlohnErgebnis | null {
  const { modus, bruttogehalt, stundenlohn: inputStundenlohn, wochenstunden, arbeitstageProWoche, urlaubstage, feiertage } = eingabe;

  if (wochenstunden <= 0 || wochenstunden > 80) return null;
  if (arbeitstageProWoche <= 0 || arbeitstageProWoche > 7) return null;

  const stundenProTag = wochenstunden / arbeitstageProWoche;
  const arbeitsstundenProMonat = Math.round(wochenstunden * WOCHEN_PRO_MONAT * 100) / 100;
  const arbeitsstundenProJahr = Math.round(wochenstunden * WOCHEN_PRO_JAHR * 100) / 100;

  let stundenlohn: number;
  let monatsgehalt: number;
  let jahresgehalt: number;

  switch (modus) {
    case 'stundenlohn':
      if (bruttogehalt <= 0) return null;
      stundenlohn = bruttogehalt / arbeitsstundenProMonat;
      monatsgehalt = bruttogehalt;
      jahresgehalt = bruttogehalt * 12;
      break;

    case 'monatsgehalt':
      if (inputStundenlohn <= 0) return null;
      stundenlohn = inputStundenlohn;
      monatsgehalt = inputStundenlohn * arbeitsstundenProMonat;
      jahresgehalt = monatsgehalt * 12;
      break;

    case 'jahresgehalt':
      if (inputStundenlohn <= 0) return null;
      stundenlohn = inputStundenlohn;
      monatsgehalt = inputStundenlohn * arbeitsstundenProMonat;
      jahresgehalt = monatsgehalt * 12;
      break;

    default:
      return null;
  }

  // Effektive Arbeitstage pro Jahr
  const gesamtArbeitstage = WOCHEN_PRO_JAHR * arbeitstageProWoche;
  const effektiveArbeitstage = Math.round(gesamtArbeitstage - urlaubstage - feiertage);
  const effektiveStunden = effektiveArbeitstage * stundenProTag;
  const effektiverStundenlohn = effektiveStunden > 0 ? jahresgehalt / effektiveStunden : 0;

  const differenzMindestlohn = stundenlohn - MINDESTLOHN_2026;

  return {
    stundenlohn: Math.round(stundenlohn * 100) / 100,
    monatsgehalt: Math.round(monatsgehalt * 100) / 100,
    jahresgehalt: Math.round(jahresgehalt * 100) / 100,
    effektiverStundenlohn: Math.round(effektiverStundenlohn * 100) / 100,
    differenzMindestlohn: Math.round(differenzMindestlohn * 100) / 100,
    ueberMindestlohn: differenzMindestlohn >= 0,
    arbeitsstundenProMonat,
    arbeitsstundenProJahr,
    effektiveArbeitstage,
  };
}
