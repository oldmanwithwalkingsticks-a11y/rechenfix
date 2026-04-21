import { berechneErbStMitHaertefall, type Steuerklasse } from './erbschaftsteuer';

export type { Steuerklasse };

export type SchenkungsVerwandtschaft =
  | 'ehepartner'
  | 'kind'
  | 'enkelkind'
  | 'elternteil'
  | 'geschwister'
  | 'nichte-neffe'
  | 'nicht-verwandt';

export interface SchenkungssteuerEingabe {
  schenkungswert: number;
  verwandtschaft: SchenkungsVerwandtschaft;
  bereitsGenutzt: number;
  hausratFreibetrag: boolean;
}

export interface SchenkungssteuerErgebnis {
  schenkungswert: number;
  freibetrag: number;
  hausratFreibetrag: number;
  bereitsGenutzt: number;
  steuerpflichtigerErwerb: number;
  steuerklasse: Steuerklasse;
  steuersatz: number;
  schenkungssteuer: number;
  effektiverSteuersatz: number;
  nettoSchenkung: number;
  steuerfrei: boolean;
  verwandtschaftLabel: string;
}

export const FREIBETRAEGE: Record<SchenkungsVerwandtschaft, number> = {
  'ehepartner':     500000,
  'kind':           400000,
  'enkelkind':      200000,
  'elternteil':      20000,
  'geschwister':     20000,
  'nichte-neffe':    20000,
  'nicht-verwandt':  20000,
};

export const STEUERKLASSEN: Record<SchenkungsVerwandtschaft, Steuerklasse> = {
  'ehepartner':     'I',
  'kind':           'I',
  'enkelkind':      'I',
  'elternteil':     'II',
  'geschwister':    'II',
  'nichte-neffe':   'II',
  'nicht-verwandt': 'III',
};

export const VERWANDTSCHAFT_LABELS: Record<SchenkungsVerwandtschaft, string> = {
  'ehepartner':     'Ehepartner / eingetr. Lebenspartner',
  'kind':           'Kind (inkl. Stief-/Adoptivkind)',
  'enkelkind':      'Enkelkind',
  'elternteil':     'Elternteil / Großelternteil',
  'geschwister':    'Geschwister',
  'nichte-neffe':   'Nichte / Neffe',
  'nicht-verwandt': 'Nicht verwandt',
};

export function berechneSchenkungssteuer(e: SchenkungssteuerEingabe): SchenkungssteuerErgebnis {
  const { schenkungswert, verwandtschaft, bereitsGenutzt, hausratFreibetrag } = e;

  const steuerklasse = STEUERKLASSEN[verwandtschaft];
  const persoenlichFB = FREIBETRAEGE[verwandtschaft];

  // Hausrat-Freibetrag nur für Steuerklasse I (41.000 €)
  const hausratFB = hausratFreibetrag && steuerklasse === 'I' ? 41000 : 0;

  // Verfügbarer Freibetrag nach Abzug bereits genutzter Beträge
  const verfuegbarerFB = Math.max(0, persoenlichFB - bereitsGenutzt);
  const gesamtFB = verfuegbarerFB + hausratFB;

  // Steuerpflichtiger Erwerb
  const steuerpflichtigerErwerb = Math.max(0, schenkungswert - gesamtFB);

  const { steuerbetrag: schenkungssteuer, steuersatz } =
    berechneErbStMitHaertefall(steuerpflichtigerErwerb, steuerklasse);

  const effektiverSteuersatz = schenkungswert > 0
    ? Math.round(schenkungssteuer / schenkungswert * 10000) / 100
    : 0;

  return {
    schenkungswert,
    freibetrag: verfuegbarerFB,
    hausratFreibetrag: hausratFB,
    bereitsGenutzt,
    steuerpflichtigerErwerb,
    steuerklasse,
    steuersatz,
    schenkungssteuer,
    effektiverSteuersatz,
    nettoSchenkung: schenkungswert - schenkungssteuer,
    steuerfrei: schenkungssteuer === 0,
    verwandtschaftLabel: VERWANDTSCHAFT_LABELS[verwandtschaft],
  };
}
