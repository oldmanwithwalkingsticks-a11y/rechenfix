import { berechneEStGrund, berechneSoli, WK_PAUSCHALE_AN_2026 } from './einkommensteuer';
import {
  KV_BASISSATZ_AN_2026,
  RV_SATZ_AN_2026,
  AV_SATZ_AN_2026,
  BBG_KV_MONAT,
  BBG_RV_MONAT,
} from './brutto-netto';

export type Steuerklasse = 1 | 3 | 4 | 5;

export interface SteuerklassenVergleichEingabe {
  bruttoJahr1: number;
  bruttoJahr2: number;
  kirchensteuer1: boolean;
  kirchensteuer2: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number; // 0, 0.5, 1, 1.5, 2, 2.5, 3
}

export interface KombinationErgebnis {
  name: string;
  sk1: Steuerklasse;
  sk2: Steuerklasse;
  lohnsteuer1Monat: number;
  lohnsteuer2Monat: number;
  lohnsteuerGesamtJahr: number;
  soli1Monat: number;
  soli2Monat: number;
  kist1Monat: number;
  kist2Monat: number;
  netto1Monat: number;
  netto2Monat: number;
  nettoGesamtMonat: number;
  nettoGesamtJahr: number;
  faktor?: number;           // Nur bei IV/IV mit Faktor
  differenzZurSplitting: number; // Jahressumme LSt − tatsächliche Splitting-ESt
}

export interface SteuerklassenVergleichErgebnis {
  kombinationen: KombinationErgebnis[];
  empfehlung: string; // name der höchsten Kombination
  jahressteuerSplitting: number;
  bruttoJahr1: number;
  bruttoJahr2: number;
  bruttoGesamt: number;
}

// Faktoren für Lohnsteuer nach Steuerklasse (vereinfacht, relativ zu SK1)
// Basis: SK1 entspricht § 32a EStG Grundtabelle (Jahresbetrachtung)
function berechneLohnsteuerSK1Jahr(bruttoJahr: number): number {
  if (bruttoJahr <= 0) return 0;
  // Arbeitnehmer-Pauschbetrag (1.230 €) + Sonderausgaben (36 €) + Vorsorgepauschale (vereinfacht 12 %)
  const werbungskosten = WK_PAUSCHALE_AN_2026;
  const sonderausgaben = 36;
  const vorsorgepauschale = Math.min(bruttoJahr * 0.12, 15000);
  const zvE = Math.max(0, bruttoJahr - werbungskosten - sonderausgaben - vorsorgepauschale);
  return berechneEStGrund(zvE, 2026);
}

// SK3: Doppelter Grundfreibetrag, sehr niedrige LSt
function berechneLohnsteuerSK3Jahr(bruttoJahr: number): number {
  if (bruttoJahr <= 0) return 0;
  const werbungskosten = WK_PAUSCHALE_AN_2026;
  const sonderausgaben = 36;
  const vorsorgepauschale = Math.min(bruttoJahr * 0.12, 15000);
  const zvE = Math.max(0, bruttoJahr - werbungskosten - sonderausgaben - vorsorgepauschale);
  // Splitting-Effekt: ESt auf halbes zvE, mal 2
  const halb = Math.floor(zvE / 2);
  return berechneEStGrund(halb, 2026) * 2;
}

// SK5: Kein Grundfreibetrag, stark erhöhte LSt
function berechneLohnsteuerSK5Jahr(bruttoJahr: number): number {
  if (bruttoJahr <= 0) return 0;
  const werbungskosten = WK_PAUSCHALE_AN_2026;
  const sonderausgaben = 36;
  const vorsorgepauschale = Math.min(bruttoJahr * 0.12, 15000);
  const bruttoNachAbzug = Math.max(0, bruttoJahr - werbungskosten - sonderausgaben - vorsorgepauschale);

  // Näherungsformel SK5: Differenz der Splittingsteuer zwischen (bruttoNachAbzug + 40.000) und 40.000,
  // aber kein Grundfreibetrag — vereinfachte Approximation via "SK4 × 1,55"-Faktor
  // Genauer: SK5-Tabelle orientiert sich an der Annahme, dass der Partner viel verdient
  const estOhneGF = berechneEStGrund(bruttoNachAbzug + 12348, 2026) - berechneEStGrund(12348, 2026);
  return Math.max(estOhneGF, bruttoNachAbzug * 0.14);
}

// SK4 = SK1 (beide gleichgestellt in der Tabelle)
function berechneLohnsteuerSK4Jahr(bruttoJahr: number): number {
  return berechneLohnsteuerSK1Jahr(bruttoJahr);
}

function berechneLohnsteuerByKlasse(bruttoJahr: number, sk: Steuerklasse): number {
  switch (sk) {
    case 1: return berechneLohnsteuerSK1Jahr(bruttoJahr);
    case 3: return berechneLohnsteuerSK3Jahr(bruttoJahr);
    case 4: return berechneLohnsteuerSK4Jahr(bruttoJahr);
    case 5: return berechneLohnsteuerSK5Jahr(bruttoJahr);
  }
}

// Sozialversicherungsbeiträge 2026 (AN-Anteil, bis BBG) — Konstanten aus brutto-netto.ts.
// Zusatzbeitrag-Durchschnitt 2,9 % hart verdrahtet (typisch-Szenario); präzise Rechnung
// würde berechneBruttoNetto-Konsumation erfordern.
function berechneSvJahr(bruttoJahr: number): number {
  const bbgKV = BBG_KV_MONAT * 12;
  const bbgRV = BBG_RV_MONAT * 12;
  const kv = Math.min(bruttoJahr, bbgKV) * (KV_BASISSATZ_AN_2026 + 0.0145); // + 1,45 % Ø-Zusatz AN-Anteil
  const pv = Math.min(bruttoJahr, bbgKV) * 0.018;                           // PV Basis (Staffel ignoriert für Vergleich)
  const rv = Math.min(bruttoJahr, bbgRV) * RV_SATZ_AN_2026;
  const av = Math.min(bruttoJahr, bbgRV) * AV_SATZ_AN_2026;
  return kv + pv + rv + av;
}

// Soli auf Lohnsteuer — zentrale berechneSoli handhabt Freigrenze + Milderungszone.
// Bei SK 3 oder 5 gilt Splittingtarif-Freigrenze (das Paar ist zusammenveranlagt).
function berechneSoliJahr(lohnsteuerJahr: number, isSK3or5: boolean): number {
  return berechneSoli(lohnsteuerJahr, isSK3or5, 2026);
}

function berechneKiStJahr(lohnsteuerJahr: number, kirchensteuer: boolean, satz: 8 | 9): number {
  if (!kirchensteuer) return 0;
  return lohnsteuerJahr * (satz / 100);
}

// Splitting-ESt des Paares (für Faktorverfahren und Nachzahlung/Erstattung)
function berechneSplittingEStPaar(brutto1: number, brutto2: number): number {
  const zvE1 = Math.max(0, brutto1 - WK_PAUSCHALE_AN_2026 - 36 - Math.min(brutto1 * 0.12, 15000));
  const zvE2 = Math.max(0, brutto2 - WK_PAUSCHALE_AN_2026 - 36 - Math.min(brutto2 * 0.12, 15000));
  const zvEGesamt = zvE1 + zvE2;
  const halb = Math.floor(zvEGesamt / 2);
  return berechneEStGrund(halb, 2026) * 2;
}

function berechneKombination(
  e: SteuerklassenVergleichEingabe,
  sk1: Steuerklasse,
  sk2: Steuerklasse,
  name: string,
  mitFaktor = false,
): KombinationErgebnis {
  let lst1 = berechneLohnsteuerByKlasse(e.bruttoJahr1, sk1);
  let lst2 = berechneLohnsteuerByKlasse(e.bruttoJahr2, sk2);

  let faktor: number | undefined;
  const splittingESt = berechneSplittingEStPaar(e.bruttoJahr1, e.bruttoJahr2);

  if (mitFaktor) {
    const summeLst = lst1 + lst2;
    faktor = summeLst > 0 ? Math.min(1, splittingESt / summeLst) : 1;
    lst1 = lst1 * faktor;
    lst2 = lst2 * faktor;
  }

  const isSK3or5_1 = sk1 === 3 || sk1 === 5;
  const isSK3or5_2 = sk2 === 3 || sk2 === 5;

  const soli1 = berechneSoliJahr(lst1, isSK3or5_1);
  const soli2 = berechneSoliJahr(lst2, isSK3or5_2);
  const kist1 = berechneKiStJahr(lst1, e.kirchensteuer1, e.kirchensteuersatz);
  const kist2 = berechneKiStJahr(lst2, e.kirchensteuer2, e.kirchensteuersatz);

  const sv1 = berechneSvJahr(e.bruttoJahr1);
  const sv2 = berechneSvJahr(e.bruttoJahr2);

  const netto1Jahr = e.bruttoJahr1 - lst1 - soli1 - kist1 - sv1;
  const netto2Jahr = e.bruttoJahr2 - lst2 - soli2 - kist2 - sv2;
  const nettoGesamtJahr = netto1Jahr + netto2Jahr;
  const nettoGesamtMonat = nettoGesamtJahr / 12;

  const summeLstTatsaechlich = lst1 + lst2;
  const differenzZurSplitting = summeLstTatsaechlich - splittingESt;

  return {
    name,
    sk1,
    sk2,
    lohnsteuer1Monat: Math.round(lst1 / 12 * 100) / 100,
    lohnsteuer2Monat: Math.round(lst2 / 12 * 100) / 100,
    lohnsteuerGesamtJahr: Math.round(summeLstTatsaechlich * 100) / 100,
    soli1Monat: Math.round(soli1 / 12 * 100) / 100,
    soli2Monat: Math.round(soli2 / 12 * 100) / 100,
    kist1Monat: Math.round(kist1 / 12 * 100) / 100,
    kist2Monat: Math.round(kist2 / 12 * 100) / 100,
    netto1Monat: Math.round(netto1Jahr / 12 * 100) / 100,
    netto2Monat: Math.round(netto2Jahr / 12 * 100) / 100,
    nettoGesamtMonat: Math.round(nettoGesamtMonat * 100) / 100,
    nettoGesamtJahr: Math.round(nettoGesamtJahr * 100) / 100,
    faktor: faktor !== undefined ? Math.round(faktor * 1000) / 1000 : undefined,
    differenzZurSplitting: Math.round(differenzZurSplitting * 100) / 100,
  };
}

export function berechneSteuerklassenVergleich(
  e: SteuerklassenVergleichEingabe,
): SteuerklassenVergleichErgebnis {
  const k1 = berechneKombination(e, 3, 5, 'III/V');
  const k2 = berechneKombination(e, 5, 3, 'V/III');
  const k3 = berechneKombination(e, 4, 4, 'IV/IV mit Faktor', true);

  const kombinationen = [k1, k2, k3];

  // Empfehlung: höchstes monatliches Gesamtnetto
  const beste = kombinationen.reduce((a, b) => b.nettoGesamtMonat > a.nettoGesamtMonat ? b : a);

  return {
    kombinationen,
    empfehlung: beste.name,
    jahressteuerSplitting: Math.round(berechneSplittingEStPaar(e.bruttoJahr1, e.bruttoJahr2) * 100) / 100,
    bruttoJahr1: e.bruttoJahr1,
    bruttoJahr2: e.bruttoJahr2,
    bruttoGesamt: e.bruttoJahr1 + e.bruttoJahr2,
  };
}
