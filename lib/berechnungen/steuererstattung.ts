export interface SteuererstattungEingabe {
  jahresbrutto: number;
  steuerklasse: number;
  entfernungKm: number;
  arbeitstage: number;
  homeofficeTage: number;
  beruflicheAusgaben: number;
  kirchensteuer: boolean;
  haushaltsnaheDL: number;
  spenden: number;
}

export interface ErstattungsPosten {
  label: string;
  betrag: number;
  info?: string;
}

export interface SteuererstattungErgebnis {
  geschaetzteErstattung: number;
  werbungskostenGesamt: number;
  werbungskostenUeberPauschbetrag: number;
  pendlerpauschale: number;
  homeofficePauschale: number;
  grenzsteuersatz: number;
  steuerersparnisWerbungskosten: number;
  steuerersparnisHaushaltsnaheDL: number;
  steuerersparnisSonderausgaben: number;
  posten: ErstattungsPosten[];
}

import { WK_PAUSCHALE_AN_2026 } from './einkommensteuer';

const PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;
const HOMEOFFICE_MAX = 1260;
const HOMEOFFICE_PRO_TAG = 6;
const HAUSHALTSNAHE_MAX = 4000;

function grundtarif(zvE: number): number {
  if (zvE <= 12084) return 0;
  if (zvE <= 17005) return 0.14;
  if (zvE <= 66760) return 0.25 + (zvE - 17005) / (66760 - 17005) * 0.17;
  if (zvE <= 277825) return 0.42;
  return 0.45;
}

function berechneGrenzsteuersatz(brutto: number, steuerklasse: number): number {
  switch (steuerklasse) {
    case 2:
      // Alleinerziehend: Entlastungsbetrag 4.260 € senkt zvE
      return grundtarif(Math.max(brutto - 4260, 0));
    case 3:
      // Ehegattensplitting: Tarif wird auf halbes Einkommen angewendet
      // Da Partnereinkommen unbekannt, moderate Näherung (Einkommen × 0.85)
      return grundtarif(brutto * 0.85);
    case 5:
      // Partner in Klasse 3 profitiert vom Splitting → eigene Steuerbelastung höher
      return grundtarif(brutto * 1.12);
    case 6:
      // Zweitjob: Grundfreibetrag bereits beim Hauptjob verbraucht
      return grundtarif(brutto + 12084);
    default:
      // Klasse 1 und 4: Grundtarif
      return grundtarif(brutto);
  }
}

function berechnePendlerpauschale(km: number, arbeitstage: number): number {
  if (km <= 0 || arbeitstage <= 0) return 0;
  const ersteZwanzig = Math.min(km, 20) * 0.30 * arbeitstage;
  const abKm21 = km > 20 ? (km - 20) * 0.38 * arbeitstage : 0;
  return ersteZwanzig + abKm21;
}

export function berechneSteuererstattung(e: SteuererstattungEingabe): SteuererstattungErgebnis {
  const pendlerpauschale = berechnePendlerpauschale(e.entfernungKm, e.arbeitstage);
  const homeofficePauschale = Math.min(e.homeofficeTage * HOMEOFFICE_PRO_TAG, HOMEOFFICE_MAX);

  const werbungskostenGesamt = pendlerpauschale + homeofficePauschale + e.beruflicheAusgaben;
  const werbungskostenUeberPauschbetrag = Math.max(werbungskostenGesamt - PAUSCHBETRAG, 0);

  const grenzsteuersatz = berechneGrenzsteuersatz(e.jahresbrutto, e.steuerklasse);

  // Steuerersparnis aus Werbungskosten über Pauschbetrag
  const steuerersparnisWerbungskosten = werbungskostenUeberPauschbetrag * grenzsteuersatz;

  // Haushaltsnahe DL: 20% direkt von Steuerschuld, max 4.000 €
  const anrechenbareDL = Math.min(e.haushaltsnaheDL, HAUSHALTSNAHE_MAX / 0.2);
  const steuerersparnisHaushaltsnaheDL = anrechenbareDL * 0.2;

  // Sonderausgaben (Spenden)
  const steuerersparnisSonderausgaben = e.spenden * grenzsteuersatz;

  // Kirchensteuer-Effekt (Kirchensteuer ist als Sonderausgabe absetzbar, ca. 8-9% der Lohnsteuer)
  // Vereinfachte Schätzung: reduziert Erstattung nicht, wird indirekt über den Grenzsteuersatz berücksichtigt

  const geschaetzteErstattung = steuerersparnisWerbungskosten + steuerersparnisHaushaltsnaheDL + steuerersparnisSonderausgaben;

  // Posten-Aufschlüsselung
  const posten: ErstattungsPosten[] = [];

  if (pendlerpauschale > 0) {
    posten.push({
      label: 'Pendlerpauschale',
      betrag: pendlerpauschale > PAUSCHBETRAG && werbungskostenGesamt === pendlerpauschale + homeofficePauschale + e.beruflicheAusgaben
        ? pendlerpauschale * grenzsteuersatz * (werbungskostenUeberPauschbetrag / Math.max(werbungskostenGesamt - PAUSCHBETRAG, werbungskostenGesamt))
        : pendlerpauschale > 0 ? (pendlerpauschale / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten : 0,
      info: `${e.entfernungKm} km × ${e.arbeitstage} Tage`,
    });
  }

  if (homeofficePauschale > 0) {
    posten.push({
      label: 'Homeoffice-Pauschale',
      betrag: (homeofficePauschale / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten,
      info: `${e.homeofficeTage} Tage × ${HOMEOFFICE_PRO_TAG} €`,
    });
  }

  if (e.beruflicheAusgaben > 0) {
    posten.push({
      label: 'Berufsbedingte Ausgaben',
      betrag: (e.beruflicheAusgaben / Math.max(werbungskostenGesamt, 1)) * steuerersparnisWerbungskosten,
      info: `Fachliteratur, Fortbildung etc.`,
    });
  }

  if (steuerersparnisHaushaltsnaheDL > 0) {
    posten.push({
      label: 'Haushaltsnahe Dienstleistungen',
      betrag: steuerersparnisHaushaltsnaheDL,
      info: '20% direkt von der Steuerschuld',
    });
  }

  if (steuerersparnisSonderausgaben > 0) {
    posten.push({
      label: 'Spenden',
      betrag: steuerersparnisSonderausgaben,
      info: `${(grenzsteuersatz * 100).toFixed(0)}% Grenzsteuersatz`,
    });
  }

  return {
    geschaetzteErstattung,
    werbungskostenGesamt,
    werbungskostenUeberPauschbetrag,
    pendlerpauschale,
    homeofficePauschale,
    grenzsteuersatz,
    steuerersparnisWerbungskosten,
    steuerersparnisHaushaltsnaheDL,
    steuerersparnisSonderausgaben,
    posten,
  };
}
