/**
 * Herzfrequenz-Zonen — Trainings-Pulsbereiche.
 *
 * Quellen:
 * - Tanaka, Monahan, Seals (2001): "Age-predicted maximal heart rate revisited",
 *   J Am Coll Cardiol 37(1):153-6 — HRmax = 208 - 0,7 × Alter (wissenschaftlich validiert).
 * - Fox, Naughton, Haskell (1971): klassische Faustformel HRmax = 220 - Alter
 *   (weniger genau, aber gebräuchlicher Standard).
 * - Karvonen, Kentala, Mustala (1957): "The effects of training on heart rate",
 *   Ann Med Exp Biol Fenn 35(3):307-15 — HRR-Reserveformel
 *   Ziel-HF = Ruhepuls + (HRmax − Ruhepuls) × Intensität.
 *
 * Zonen-Verteilung (5 Stufen, 50–60–70–80–90–100 % Anteilsschwellen):
 * 1 Regeneration / 2 Grundlagenausdauer / 3 Aerobe Zone /
 * 4 Anaerobe Schwelle / 5 Maximum.
 *
 * Welle-4 M1b — Lib-Extraktion aus HerzfrequenzZonenRechner.tsx (03.05.2026).
 */

export type Formel = 'standard' | 'tanaka' | 'karvonen';

export interface ZonenAnteil {
  nr: number;
  name: string;
  min: number;
  max: number;
  beschreibung: string;
}

export const ZONEN_ANTEILE: ZonenAnteil[] = [
  { nr: 1, name: 'Regeneration',        min: 0.50, max: 0.60, beschreibung: 'Sehr locker, Regeneration nach hartem Training' },
  { nr: 2, name: 'Grundlagenausdauer',  min: 0.60, max: 0.70, beschreibung: 'Lockeres Tempo, Fettverbrennung, 80 % des Trainings' },
  { nr: 3, name: 'Aerobe Zone',         min: 0.70, max: 0.80, beschreibung: 'Wettkampftempo für lange Distanzen, noch kontrollierbar' },
  { nr: 4, name: 'Anaerobe Schwelle',   min: 0.80, max: 0.90, beschreibung: 'Hartes Training, Intervalle, Tempodauerläufe' },
  { nr: 5, name: 'Maximum',             min: 0.90, max: 1.00, beschreibung: 'Sprint, Maximalintensität, nur kurze Zeit haltbar' },
];

export interface HerzfrequenzZonenEingabe {
  alter: number;
  ruhepuls: number;
  /** Eigener gemessener HFmax-Wert (z. B. aus Belastungstest); 0 = nicht angegeben → Formel-Berechnung */
  hfmaxEigen: number;
  formel: Formel;
}

export interface ZoneBerechnet extends ZonenAnteil {
  bpmMin: number;
  bpmMax: number;
}

export interface HerzfrequenzZonenErgebnis {
  hfmax: number;
  hfStandard: number;
  hfTanaka: number;
  hfReserve: number;
  ruhepuls: number;
  zonen: ZoneBerechnet[];
  formel: Formel;
}

/** Fox/Naughton/Haskell (1971): HRmax = 220 − Alter. */
export function berechneHfMaxStandard(alter: number): number {
  return 220 - alter;
}

/** Tanaka, Monahan, Seals (2001): HRmax = 208 − 0,7 × Alter. */
export function berechneHfMaxTanaka(alter: number): number {
  return 208 - 0.7 * alter;
}

/**
 * Karvonen-Reserveformel (1957): Ziel-HF = Ruhepuls + (HRmax − Ruhepuls) × Intensität.
 * Setzt voraus, dass Ruhepuls > 0 und Ruhepuls < HRmax.
 */
export function berechneKarvonenZielHf(ruhepuls: number, hfmax: number, intensitaet: number): number {
  return ruhepuls + (hfmax - ruhepuls) * intensitaet;
}

export function berechneHerzfrequenzZonen(e: HerzfrequenzZonenEingabe): HerzfrequenzZonenErgebnis {
  const { alter, ruhepuls, hfmaxEigen, formel } = e;

  let hfmax: number;
  if (hfmaxEigen > 0) {
    hfmax = hfmaxEigen;
  } else {
    switch (formel) {
      case 'standard': hfmax = berechneHfMaxStandard(alter); break;
      case 'tanaka':   hfmax = berechneHfMaxTanaka(alter); break;
      case 'karvonen': hfmax = berechneHfMaxTanaka(alter); break;
    }
  }

  const hfStandard = berechneHfMaxStandard(alter);
  const hfTanaka = berechneHfMaxTanaka(alter);

  const zonen: ZoneBerechnet[] = ZONEN_ANTEILE.map(z => {
    let bpmMin: number;
    let bpmMax: number;
    if (formel === 'karvonen' && ruhepuls > 0) {
      bpmMin = berechneKarvonenZielHf(ruhepuls, hfmax, z.min);
      bpmMax = berechneKarvonenZielHf(ruhepuls, hfmax, z.max);
    } else {
      bpmMin = hfmax * z.min;
      bpmMax = hfmax * z.max;
    }
    return { ...z, bpmMin, bpmMax };
  });

  return {
    hfmax,
    hfStandard,
    hfTanaka,
    hfReserve: hfmax - ruhepuls,
    ruhepuls,
    zonen,
    formel,
  };
}
