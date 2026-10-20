import { getStrompreis } from './strompreis';

/**
 * Vergleichstarife aus der Strompreis-SSOT (lib/berechnungen/strompreis.ts).
 * W177: vorher fest 32 ct + 10 € (Durchschnitt) und 28 ct + 9 € (günstigster Tarif).
 * W182: Die SSOT-Werte (BDEW-Mittel 37 ct, Festpreis-Neukunden 33 ct) sind Mischpreise je kWh, in denen
 * der Grundpreis bei 3.500 kWh Jahresverbrauch schon anteilig steckt. W177 hatte sie als Arbeitspreis
 * genommen und den Grundpreis noch einmal addiert (2.500 kWh: 1.045 € statt 959,25 €). Jetzt wird der
 * Mischpreis in Arbeitspreis + Grundpreis zerlegt: 37 ct − 120 € ÷ 3.500 kWh = 33,57 ct + 10 €/Monat.
 */
export const GRUNDPREIS_VERGLEICH_MONAT = 10;
/** Bezugsverbrauch der Mischpreise (BDEW-Strompreisanalyse, Vergleichsportale). */
export const MISCHPREIS_BEZUG_KWH = 3500;

/**
 * Arbeitspreis (ct/kWh, auf 2 Stellen) eines Tarifs, der bei MISCHPREIS_BEZUG_KWH mit dem Grundpreis
 * `grundpreisMonat` auf den Mischpreis `mischpreisCt` kommt.
 */
export function arbeitspreisAusMischpreis(mischpreisCt: number, grundpreisMonat = GRUNDPREIS_VERGLEICH_MONAT): number {
  return Math.round((mischpreisCt - grundpreisMonat * 12 / MISCHPREIS_BEZUG_KWH * 100) * 100) / 100;
}
/** BDEW-Mittel als Arbeitspreis bei 10 €/Monat Grundpreis: 33,57 ct. */
export const ARBEITSPREIS_DURCHSCHNITT = arbeitspreisAusMischpreis(getStrompreis('durchschnitt_bdew'));
/** Festpreis-Neukundentarif als Arbeitspreis bei 10 €/Monat Grundpreis: 29,57 ct. */
export const ARBEITSPREIS_NEUKUNDEN = arbeitspreisAusMischpreis(getStrompreis('neukunden_festpreis'));
/** Typische Jahreskosten (Durchschnittstarif) für einen Verbrauch, auf den Cent. */
export function typischeJahreskosten(verbrauchKwh: number): number {
  return Math.round((verbrauchKwh * ARBEITSPREIS_DURCHSCHNITT + GRUNDPREIS_VERGLEICH_MONAT * 12 * 100)) / 100;
}
/** Annahme für Ökostrom-Tarife: Arbeitspreis +2 ct/kWh, Grundpreis +1 €/Monat. */
export const OEKOSTROM_AUFSCHLAG_CT = 2;
export const OEKOSTROM_AUFSCHLAG_GRUNDPREIS = 1;

export interface StromvergleichEingabe {
  verbrauchKwh: number;
  arbeitspreisCtKwh: number;
  grundpreisMonat: number;
  oekostrom: boolean;
}

export interface TarifVergleich {
  label: string;
  arbeitspreisCtKwh: number;
  grundpreisMonat: number;
  jahreskosten: number;
  monatskosten: number;
}

export interface StromvergleichErgebnis {
  aktuell: TarifVergleich;
  durchschnitt: TarifVergleich;
  guenstigster: TarifVergleich;
  sparpotenzialJahr: number;
  sparpotenzialMonat: number;
  istGuenstig: boolean;
  kostenProKwh: number;
}

function jahreskosten(verbrauch: number, arbeitspreisCtKwh: number, grundpreisMonat: number): number {
  return (verbrauch * arbeitspreisCtKwh / 100) + (grundpreisMonat * 12);
}

export function berechneStromvergleich(e: StromvergleichEingabe): StromvergleichErgebnis {
  const aktuellJahr = jahreskosten(e.verbrauchKwh, e.arbeitspreisCtKwh, e.grundpreisMonat);

  const aufAp = e.oekostrom ? OEKOSTROM_AUFSCHLAG_CT : 0;
  const aufGp = e.oekostrom ? OEKOSTROM_AUFSCHLAG_GRUNDPREIS : 0;

  const dsAp = ARBEITSPREIS_DURCHSCHNITT + aufAp;
  const dsGp = GRUNDPREIS_VERGLEICH_MONAT + aufGp;
  const durchschnittJahr = jahreskosten(e.verbrauchKwh, dsAp, dsGp);

  const gAp = ARBEITSPREIS_NEUKUNDEN + aufAp;
  const gGp = GRUNDPREIS_VERGLEICH_MONAT + aufGp;
  const guenstigsterJahr = jahreskosten(e.verbrauchKwh, gAp, gGp);

  const sparpotenzialJahr = Math.max(aktuellJahr - guenstigsterJahr, 0);

  return {
    aktuell: {
      label: 'Ihr aktueller Tarif',
      arbeitspreisCtKwh: e.arbeitspreisCtKwh,
      grundpreisMonat: e.grundpreisMonat,
      jahreskosten: aktuellJahr,
      monatskosten: aktuellJahr / 12,
    },
    durchschnitt: {
      label: e.oekostrom ? 'Durchschnitt Ökostrom' : 'Durchschnitt Normaltarif',
      arbeitspreisCtKwh: dsAp,
      grundpreisMonat: dsGp,
      jahreskosten: durchschnittJahr,
      monatskosten: durchschnittJahr / 12,
    },
    guenstigster: {
      label: e.oekostrom ? 'Günstigster Ökostrom (geschätzt)' : 'Günstigster Normaltarif (geschätzt)',
      arbeitspreisCtKwh: gAp,
      grundpreisMonat: gGp,
      jahreskosten: guenstigsterJahr,
      monatskosten: guenstigsterJahr / 12,
    },
    sparpotenzialJahr,
    sparpotenzialMonat: sparpotenzialJahr / 12,
    istGuenstig: sparpotenzialJahr < 20,
    kostenProKwh: e.verbrauchKwh > 0 ? aktuellJahr / e.verbrauchKwh * 100 : 0,
  };
}

export const HAUSHALTSGROESSEN = [
  { label: '1 Person', verbrauch: 1500 },
  { label: '2 Personen', verbrauch: 2500 },
  { label: '3 Personen', verbrauch: 3500 },
  { label: '4 Personen', verbrauch: 4500 },
  { label: '5+ Personen', verbrauch: 5500 },
];
