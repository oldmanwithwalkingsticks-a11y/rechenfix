export type Antriebsart = 'benzin' | 'diesel' | 'elektro' | 'hybrid';
export type Zulassungszeitraum = 'vor-2009' | 'nach-2009';

export interface KfzSteuerEingabe {
  zulassung: Zulassungszeitraum;
  antrieb: Antriebsart;
  hubraum: number;    // in ccm
  co2: number;        // g/km (WLTP)
}

export interface KfzSteuerErgebnis {
  jahresSteuer: number;
  monatsSteuer: number;
  sockelbetrag: number;
  co2Betrag: number;
  befreit: boolean;
  befreitBis?: string;
}

/**
 * CO2-Freibetrag in g/km (für Erstzulassung nach 01.07.2009).
 * Seit 2014 gilt ein Freibetrag von 95 g/km für Neuwagen.
 * Für vereinfachte Berechnung verwenden wir 95 g/km generell für nach-2009.
 */
const CO2_FREIBETRAG = 95;

/**
 * CO2-Steuerstufen (progressiv) ab dem Freibetrag.
 * Jede Stufe definiert: bis zu welchem g/km-Wert und Preis pro g/km.
 */
const CO2_STUFEN = [
  { bis: 115, preis: 2.00 },
  { bis: 135, preis: 2.50 },
  { bis: 155, preis: 3.00 },
  { bis: 175, preis: 3.50 },
  { bis: 195, preis: 4.00 },
  { bis: Infinity, preis: 4.00 },
];

function berechneCo2Komponente(co2: number): number {
  if (co2 <= CO2_FREIBETRAG) return 0;

  let restCo2 = co2 - CO2_FREIBETRAG;
  let betrag = 0;
  let untereGrenze = CO2_FREIBETRAG;

  for (const stufe of CO2_STUFEN) {
    const stufenBreite = stufe.bis - untereGrenze;
    const zuVersteuern = Math.min(restCo2, stufenBreite);
    betrag += zuVersteuern * stufe.preis;
    restCo2 -= zuVersteuern;
    untereGrenze = stufe.bis;
    if (restCo2 <= 0) break;
  }

  return Math.round(betrag * 100) / 100;
}

/**
 * Sockelbetrag pro angefangene 100 ccm Hubraum.
 */
function berechneSockelbetrag(hubraum: number, antrieb: Antriebsart): number {
  const angefangene100 = Math.ceil(hubraum / 100);
  const satzPro100 = antrieb === 'diesel' ? 9.50 : 2.00;
  return Math.round(angefangene100 * satzPro100 * 100) / 100;
}

/**
 * Vereinfachte Kfz-Steuer-Berechnung für vor 01.07.2009:
 * Nur hubraumbasiert (ohne CO2-Komponente).
 */
function berechneSockelVor2009(hubraum: number, antrieb: Antriebsart): number {
  const angefangene100 = Math.ceil(hubraum / 100);
  // Vor 2009: höhere Sätze, abhängig von Schadstoffklasse (vereinfacht Euro 4+)
  const satzPro100 = antrieb === 'diesel' ? 15.44 : 6.75;
  return Math.round(angefangene100 * satzPro100 * 100) / 100;
}

export function berechneKfzSteuer(eingabe: KfzSteuerEingabe): KfzSteuerErgebnis | null {
  const { zulassung, antrieb, hubraum, co2 } = eingabe;

  // Elektroautos: steuerbefreit bis 2030
  if (antrieb === 'elektro') {
    return {
      jahresSteuer: 0,
      monatsSteuer: 0,
      sockelbetrag: 0,
      co2Betrag: 0,
      befreit: true,
      befreitBis: '31.12.2030',
    };
  }

  if (hubraum <= 0) return null;

  // Hybridantrieb wird wie Benziner behandelt (Sockelbetrag)
  const effektiverAntrieb = antrieb === 'hybrid' ? 'benzin' : antrieb;

  if (zulassung === 'vor-2009') {
    const sockelbetrag = berechneSockelVor2009(hubraum, effektiverAntrieb);
    return {
      jahresSteuer: sockelbetrag,
      monatsSteuer: Math.round((sockelbetrag / 12) * 100) / 100,
      sockelbetrag,
      co2Betrag: 0,
      befreit: false,
    };
  }

  // Nach 01.07.2009: Sockelbetrag + CO2-Komponente
  const sockelbetrag = berechneSockelbetrag(hubraum, effektiverAntrieb);
  const co2Betrag = berechneCo2Komponente(co2);
  const jahresSteuer = Math.round((sockelbetrag + co2Betrag) * 100) / 100;

  return {
    jahresSteuer,
    monatsSteuer: Math.round((jahresSteuer / 12) * 100) / 100,
    sockelbetrag,
    co2Betrag,
    befreit: false,
  };
}
