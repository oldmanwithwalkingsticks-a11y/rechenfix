import {
  berechneCO2Komponente,
  berechneElektroBefreiungsende,
  SOCKEL_PRO_100CCM,
} from './kfz-steuer-parameter';

export type Antriebsart = 'benzin' | 'diesel' | 'elektro' | 'hybrid';
export type Zulassungszeitraum = 'vor-2009' | 'nach-2009';

export interface KfzSteuerEingabe {
  zulassung: Zulassungszeitraum;
  antrieb: Antriebsart;
  hubraum: number;    // in ccm
  co2: number;        // g/km (WLTP)
  /**
   * Optional: Datum der erstmaligen Zulassung. Nur relevant bei Elektro/
   * Brennstoffzelle für das dynamische Befreiungsende nach § 3d KraftStG.
   * Fehlt es, liefert die Funktion einen konservativen Default-Hinweis.
   */
  erstzulassungsdatum?: Date;
}

export interface KfzSteuerErgebnis {
  jahresSteuer: number;
  monatsSteuer: number;
  sockelbetrag: number;
  co2Betrag: number;
  befreit: boolean;
  /** ISO-Datum (YYYY-MM-DD) des Befreiungsendes, falls berechenbar. */
  befreitBis?: string;
  /**
   * Hinweis, wenn Erstzulassung außerhalb des Förderzeitraums § 3d Abs. 1
   * KraftStG (18.05.2011 – 31.12.2030) liegt → keine Befreiung nach § 3d.
   */
  keineBefreiungGrund?: 'vor-2011' | 'nach-2030';
}

/**
 * Hubraum-Komponente nach § 9 Abs. 1 Nr. 2a/2b KraftStG.
 * „Angefangene 100 ccm" → Math.ceil.
 */
function berechneSockelbetrag(hubraum: number, antrieb: Antriebsart): number {
  const angefangene100 = Math.ceil(hubraum / 100);
  const satzPro100 = antrieb === 'diesel' ? SOCKEL_PRO_100CCM.diesel : SOCKEL_PRO_100CCM.benzin;
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

/**
 * Formatiert Date als deutsches "TT.MM.JJJJ" für die UI-Anzeige.
 */
function fmtDeutsch(d: Date): string {
  const tt = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${tt}.${mm}.${d.getFullYear()}`;
}

export function berechneKfzSteuer(eingabe: KfzSteuerEingabe): KfzSteuerErgebnis | null {
  const { zulassung, antrieb, hubraum, co2, erstzulassungsdatum } = eingabe;

  // Elektrofahrzeuge: Befreiung nach § 3d KraftStG n.F. (8. KraftStÄndG
  // BT 04.12.2025): 10 Jahre ab Erstzulassung, längstens bis 31.12.2035.
  // Förderzeitraum für Erstzulassung: 18.05.2011 – 31.12.2030.
  if (antrieb === 'elektro') {
    if (erstzulassungsdatum) {
      const ende = berechneElektroBefreiungsende(erstzulassungsdatum);
      if (ende) {
        return {
          jahresSteuer: 0,
          monatsSteuer: 0,
          sockelbetrag: 0,
          co2Betrag: 0,
          befreit: true,
          befreitBis: fmtDeutsch(ende),
        };
      }
      // Erstzulassung außerhalb Förderzeitraum → keine Befreiung nach § 3d
      const vorFoerder = erstzulassungsdatum < new Date('2011-05-18');
      return {
        jahresSteuer: 0, // Hubraum 0 bei E-Autos → trotzdem keine Steuer hier
        monatsSteuer: 0,
        sockelbetrag: 0,
        co2Betrag: 0,
        befreit: false,
        keineBefreiungGrund: vorFoerder ? 'vor-2011' : 'nach-2030',
      };
    }
    // Ohne Erstzulassungs-Datum: konservativer Hinweis auf Maximal-Cap
    return {
      jahresSteuer: 0,
      monatsSteuer: 0,
      sockelbetrag: 0,
      co2Betrag: 0,
      befreit: true,
      befreitBis: '31.12.2035',
    };
  }

  if (hubraum <= 0) return null;

  // Hybridantrieb wird wie Benziner behandelt (Sockelbetrag).
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

  // Nach 01.07.2009: Sockelbetrag + CO₂-Komponente nach § 9 Abs. 1 Nr. 2c
  // (CO₂-Staffel aus SSOT `kfz-steuer-parameter.ts`).
  const sockelbetrag = berechneSockelbetrag(hubraum, effektiverAntrieb);
  const co2Betrag = berechneCO2Komponente(co2);
  const jahresSteuer = Math.round((sockelbetrag + co2Betrag) * 100) / 100;

  return {
    jahresSteuer,
    monatsSteuer: Math.round((jahresSteuer / 12) * 100) / 100,
    sockelbetrag,
    co2Betrag,
    befreit: false,
  };
}
