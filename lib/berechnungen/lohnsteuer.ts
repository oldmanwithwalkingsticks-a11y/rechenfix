import { berechneEStGrund } from './einkommensteuer';

export type Steuerklasse = 1 | 2 | 3 | 4 | 5 | 6;

export interface LohnsteuerEingabe {
  brutto: number;          // monatlich oder jährlich, abh. von zeitraum
  steuerklasse: Steuerklasse;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number; // 0, 0.5, 1, 1.5, 2, 2.5, 3
  jahresfreibetrag: number;   // eingetragener Freibetrag (z.B. Werbungskosten)
  zeitraum: 'monat' | 'jahr';
}

export interface LohnsteuerErgebnis {
  bruttoMonat: number;
  bruttoJahr: number;
  lohnsteuerMonat: number;
  lohnsteuerJahr: number;
  solidaritaetszuschlagMonat: number;
  solidaritaetszuschlagJahr: number;
  kirchensteuerMonat: number;
  kirchensteuerJahr: number;
  gesamtabzuegeMonat: number;
  gesamtabzuegeJahr: number;
  steuerklasse: Steuerklasse;
  vergleichsTabelle: Array<{
    steuerklasse: Steuerklasse;
    lohnsteuerMonat: number;
    soliMonat: number;
    kistMonat: number;
    gesamtMonat: number;
  }>;
}

const ARBEITNEHMER_PAUSCHBETRAG = 1230;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;
const ENTLASTUNGSBETRAG_ALLEINERZIEHENDE = 4260;
const SOLI_FREIGRENZE_JAHR = 20350;      // 2026 Einzelveranlagung (Steuerklasse I/II/IV/V/VI)
const SOLI_FREIGRENZE_SPLITTING = 40700; // 2026 Splitting (Steuerklasse III)

// Vereinfachte Vorsorgepauschale (Approximation aus § 39b EStG): ca. 12 % des Bruttos, gedeckelt
function vorsorgepauschale(bruttoJahr: number): number {
  return Math.min(bruttoJahr * 0.12, 15000);
}

// Lohnsteuer pro Steuerklasse (vereinfacht nach PAP 2026)
function berechneLohnsteuerJahr(
  bruttoJahr: number,
  sk: Steuerklasse,
  jahresfreibetrag: number,
): number {
  if (bruttoJahr <= 0) return 0;

  const werbungskosten = ARBEITNEHMER_PAUSCHBETRAG;
  const sonderausgaben = SONDERAUSGABEN_PAUSCHBETRAG;
  const vorsorge = vorsorgepauschale(bruttoJahr);

  // Steuerklasse VI: keine Freibeträge
  if (sk === 6) {
    const zvE = Math.max(0, bruttoJahr - vorsorge);
    return berechneEStGrund(zvE, 2026);
  }

  // Für alle anderen: Freibeträge abziehen
  let zvE = Math.max(0, bruttoJahr - werbungskosten - sonderausgaben - vorsorge - jahresfreibetrag);

  // Steuerklasse II: + Entlastungsbetrag Alleinerziehende
  if (sk === 2) {
    zvE = Math.max(0, zvE - ENTLASTUNGSBETRAG_ALLEINERZIEHENDE);
  }

  switch (sk) {
    case 1:
    case 4:
      return berechneEStGrund(zvE, 2026);
    case 2:
      return berechneEStGrund(zvE, 2026);
    case 3: {
      // Splitting: halbes zvE, dann × 2
      const halb = Math.floor(zvE / 2);
      return berechneEStGrund(halb, 2026) * 2;
    }
    case 5: {
      // Stark vereinfachte Approximation nach PAP: hohe LSt, kein Grundfreibetrag
      // Näherung: ESt(zvE + 2×Grundfreibetrag) − ESt(2×Grundfreibetrag), gedeckelt
      const gf = 12096;
      const estMitBasis = berechneEStGrund(zvE + 2 * gf, 2026);
      const estBasis = berechneEStGrund(2 * gf, 2026);
      const naeherung = estMitBasis - estBasis;
      return Math.max(naeherung, zvE * 0.14);
    }
    default:
      return berechneEStGrund(zvE, 2026);
  }
}

function berechneSoliJahr(lstJahr: number, sk: Steuerklasse): number {
  const freigrenze = sk === 3 ? SOLI_FREIGRENZE_SPLITTING : SOLI_FREIGRENZE_JAHR;
  if (lstJahr <= freigrenze) return 0;
  const mild = (lstJahr - freigrenze) * 0.119;
  const voll = lstJahr * 0.055;
  return Math.min(mild, voll);
}

function berechneKiStJahr(lstJahr: number, kirchensteuer: boolean, satz: 8 | 9): number {
  if (!kirchensteuer) return 0;
  return lstJahr * (satz / 100);
}

export function berechneLohnsteuer(e: LohnsteuerEingabe): LohnsteuerErgebnis {
  const bruttoJahr = e.zeitraum === 'monat' ? e.brutto * 12 : e.brutto;
  const bruttoMonat = bruttoJahr / 12;

  const lstJahr = berechneLohnsteuerJahr(bruttoJahr, e.steuerklasse, e.jahresfreibetrag);
  const soliJahr = berechneSoliJahr(lstJahr, e.steuerklasse);
  const kistJahr = berechneKiStJahr(lstJahr, e.kirchensteuer, e.kirchensteuersatz);

  // Vergleich aller Steuerklassen
  const skListe: Steuerklasse[] = [1, 2, 3, 4, 5, 6];
  const vergleichsTabelle = skListe.map(sk => {
    const lst = berechneLohnsteuerJahr(bruttoJahr, sk, e.jahresfreibetrag);
    const soli = berechneSoliJahr(lst, sk);
    const kist = berechneKiStJahr(lst, e.kirchensteuer, e.kirchensteuersatz);
    return {
      steuerklasse: sk,
      lohnsteuerMonat: Math.round(lst / 12 * 100) / 100,
      soliMonat: Math.round(soli / 12 * 100) / 100,
      kistMonat: Math.round(kist / 12 * 100) / 100,
      gesamtMonat: Math.round((lst + soli + kist) / 12 * 100) / 100,
    };
  });

  return {
    bruttoMonat: Math.round(bruttoMonat * 100) / 100,
    bruttoJahr: Math.round(bruttoJahr * 100) / 100,
    lohnsteuerMonat: Math.round(lstJahr / 12 * 100) / 100,
    lohnsteuerJahr: Math.round(lstJahr * 100) / 100,
    solidaritaetszuschlagMonat: Math.round(soliJahr / 12 * 100) / 100,
    solidaritaetszuschlagJahr: Math.round(soliJahr * 100) / 100,
    kirchensteuerMonat: Math.round(kistJahr / 12 * 100) / 100,
    kirchensteuerJahr: Math.round(kistJahr * 100) / 100,
    gesamtabzuegeMonat: Math.round((lstJahr + soliJahr + kistJahr) / 12 * 100) / 100,
    gesamtabzuegeJahr: Math.round((lstJahr + soliJahr + kistJahr) * 100) / 100,
    steuerklasse: e.steuerklasse,
    vergleichsTabelle,
  };
}
