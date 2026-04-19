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

import { WK_PAUSCHALE_AN_2026, berechneEStGrund } from './einkommensteuer';
import { PENDLERPAUSCHALE_SATZ_2026 } from './pendlerpauschale';

const PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;
const HOMEOFFICE_MAX = 1260;
const HOMEOFFICE_PRO_TAG = 6;
const HAUSHALTSNAHE_MAX = 4000;

// Grenzsteuersatz: finite Differenz aus zentralem § 32a-Tarif (berechneEStGrund).
// Liefert einen Dezimal-Wert zwischen 0 und 0,45 (0 % bis 45 %).
function grenzsteuersatzFuerZvE(zvE: number): number {
  if (zvE <= 0) return 0;
  const est1 = berechneEStGrund(zvE, 2026);
  const est2 = berechneEStGrund(zvE + 100, 2026);
  return Math.max(0, (est2 - est1) / 100);
}

function berechneGrenzsteuersatz(brutto: number, steuerklasse: number): number {
  switch (steuerklasse) {
    case 2:
      // Alleinerziehend: Entlastungsbetrag 4.260 € senkt zvE
      return grenzsteuersatzFuerZvE(Math.max(brutto - 4260, 0));
    case 3:
      // Ehegattensplitting: Tarif wird auf halbes Einkommen angewendet
      // Da Partnereinkommen unbekannt, moderate Näherung (Einkommen × 0.85)
      return grenzsteuersatzFuerZvE(brutto * 0.85);
    case 5:
      // Partner in Klasse 3 profitiert vom Splitting → eigene Steuerbelastung höher
      return grenzsteuersatzFuerZvE(brutto * 1.12);
    case 6:
      // Zweitjob: Grundfreibetrag bereits beim Hauptjob verbraucht — zvE + Grundfreibetrag schätzen
      return grenzsteuersatzFuerZvE(brutto + 12348);
    default:
      // Klasse 1 und 4: Grundtarif
      return grenzsteuersatzFuerZvE(brutto);
  }
}

// Pendlerpauschale 2026: einheitlich 0,38 €/km ab dem ersten Kilometer
// (§ 9 Abs. 1 Nr. 4 EStG i.d.F. StÄndG 2025). Zentrale Konstante aus pendlerpauschale.ts.
function berechnePendlerpauschale(km: number, arbeitstage: number): number {
  if (km <= 0 || arbeitstage <= 0) return 0;
  return Math.round(km) * PENDLERPAUSCHALE_SATZ_2026 * arbeitstage;
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
