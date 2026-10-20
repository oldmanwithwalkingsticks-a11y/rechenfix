import {
  berechneCO2Komponente,
  berechneCO2KomponenteNr2b,
  co2SchwelleNr2b,
  berechneElektroBefreiungsende,
  SOCKEL_PRO_100CCM,
} from './kfz-steuer-parameter';

export type Antriebsart = 'benzin' | 'diesel' | 'elektro' | 'hybrid';
// W187: vorher 'vor-2009' | 'nach-2009'; „nach-2009“ rechnete auch Erstzulassungen 01.07.2009–31.12.2020
// mit der Staffel ab 2021 (§ 9 Abs. 1 Nr. 2 Buchst. c) statt linear nach Buchst. b.
export type Zulassungszeitraum = 'vor-2009' | '2009-2020' | 'ab-2021';

export interface KfzSteuerEingabe {
  zulassung: Zulassungszeitraum;
  /**
   * W187: Jahr der Erstzulassung, nur für '2009-2020' (CO₂-Schwelle 120/110/95 g/km nach § 9 Abs. 1
   * Nr. 2 Buchst. b KraftStG). Fehlt es, gilt die Schwelle ab 2014 (95 g/km).
   */
  erstzulassungsjahr?: number;
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
  /** W187: CO₂-Grenze, ab der die CO₂-Komponente greift (95 g/km ab 2021; 120/110/95 g/km bei 2009–2020). */
  co2Schwelle?: number;
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
 * Hubraum-Komponente nach § 9 Abs. 1 Nr. 2 Buchst. b/c KraftStG (W187: vorher „Nr. 2a/2b“ zitiert).
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

  // Ab 01.07.2009: Sockelbetrag + CO₂-Komponente (SSOT `kfz-steuer-parameter.ts`).
  // W187: Erstzulassung 01.07.2009–31.12.2020 linear nach § 9 Abs. 1 Nr. 2 Buchst. b (2 € je g über
  // 120/110/95 g/km), ab 01.01.2021 progressive Staffel nach Buchst. c. Vorher immer Buchst. c.
  const sockelbetrag = berechneSockelbetrag(hubraum, effektiverAntrieb);
  const jahr = eingabe.erstzulassungsjahr ?? 2014;
  const co2Betrag = zulassung === '2009-2020'
    ? berechneCO2KomponenteNr2b(co2, jahr)
    : berechneCO2Komponente(co2);
  const co2Schwelle = zulassung === '2009-2020' ? co2SchwelleNr2b(jahr) : 95;
  const jahresSteuer = Math.round((sockelbetrag + co2Betrag) * 100) / 100;

  return {
    jahresSteuer,
    monatsSteuer: Math.round((jahresSteuer / 12) * 100) / 100,
    sockelbetrag,
    co2Betrag,
    co2Schwelle,
    befreit: false,
  };
}
