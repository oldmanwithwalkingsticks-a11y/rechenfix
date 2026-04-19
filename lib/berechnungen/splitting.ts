import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  BUNDESLAENDER as BUNDESLAENDER_CENTRAL,
  WK_PAUSCHALE_AN_2026,
  type Bundesland,
} from './einkommensteuer';
import { KIFB_GESAMT_ZUSAMMEN_2026 } from './kindergeld';

export interface SplittingEingabe {
  jahresBruttoP1: number;
  jahresBruttoP2: number;
  kirchensteuerP1: boolean;
  kirchensteuerP2: boolean;
  bundesland: string;
  kinderfreibetraege: number;
}

export interface SplittingVergleichsZeile {
  label: string;
  einzel: number;
  splitting: number;
  vorteil: number;
  istGesamt?: boolean;
}

export interface SplittingErgebnis {
  // Einzelveranlagung
  estP1: number;
  estP2: number;
  estEinzelGesamt: number;
  soliEinzel: number;
  kistEinzel: number;
  gesamtEinzel: number;

  // Zusammenveranlagung
  estSplitting: number;
  soliSplitting: number;
  kistSplitting: number;
  gesamtSplitting: number;

  // Vorteil
  vorteilEst: number;
  vorteilSoli: number;
  vorteilKist: number;
  vorteilGesamt: number;

  // zvE-Werte für Visualisierung
  zveP1: number;
  zveP2: number;
  zveGesamt: number;
  zveHalbe: number;

  // Steuerklassen-Empfehlung
  empfehlung: 'III/V' | 'IV/IV' | 'IV/IV mit Faktor';
  empfehlungText: string;

  // Tabelle
  vergleichsTabelle: SplittingVergleichsZeile[];
}

const WERBUNGSKOSTEN_PAUSCHBETRAG = WK_PAUSCHALE_AN_2026;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;

export const BUNDESLAENDER = BUNDESLAENDER_CENTRAL;

function kistWenn(est: number, hatKirche: boolean, bundesland: string): number {
  if (!hatKirche) return 0;
  return berechneKirchensteuerByBundesland(est, bundesland as Bundesland);
}

// zvE-Hilfsfunktion: Brutto eines Partners nach Arbeitnehmer-Pauschbetrag (§ 9a EStG)
// und Sonderausgabenpauschale (§ 10c EStG). Gilt nur, wenn Partner auch Einkommen hat.
function pauschalenAbzug(brutto: number): number {
  if (brutto <= 0) return 0;
  return Math.max(0, brutto - WERBUNGSKOSTEN_PAUSCHBETRAG - SONDERAUSGABEN_PAUSCHBETRAG);
}

function kifbAbzug(zve: number, kinderfreibetraege: number): number {
  // § 32 Abs. 6 EStG 2026: voller Jahresfreibetrag pro Kind bei Zusammenveranlagung,
  // halbierter Anteil pro Elternteil bei Einzelveranlagung.
  // Achtung: Kifb wird nur angesetzt, wenn günstiger als Kindergeld.
  if (kinderfreibetraege <= 0) return zve;
  return Math.max(0, zve - kinderfreibetraege * KIFB_GESAMT_ZUSAMMEN_2026);
}

export function berechneSplitting(eingabe: SplittingEingabe): SplittingErgebnis | null {
  const {
    jahresBruttoP1, jahresBruttoP2,
    kirchensteuerP1, kirchensteuerP2,
    bundesland, kinderfreibetraege,
  } = eingabe;

  if (jahresBruttoP1 < 0 || jahresBruttoP2 < 0) return null;
  if (jahresBruttoP1 === 0 && jahresBruttoP2 === 0) return null;

  // === zvE berechnen ===
  // WK- und Sonderausgabenpauschale greifen PRO PARTNER (§ 9a, § 10c EStG), auch bei
  // Zusammenveranlagung — sofern der Partner überhaupt Einkommen hat.
  const zveP1Vor = pauschalenAbzug(jahresBruttoP1);
  const zveP2Vor = pauschalenAbzug(jahresBruttoP2);

  // Bei Einzelveranlagung: Kinderfreibeträge hälftig aufteilen (halber Anteil pro Elternteil)
  const zveP1 = Math.max(0, Math.round(kifbAbzug(zveP1Vor, kinderfreibetraege / 2)));
  const zveP2 = Math.max(0, Math.round(kifbAbzug(zveP2Vor, kinderfreibetraege / 2)));

  // Bei Zusammenveranlagung: voller Kinderfreibetrag auf die Summe nach Pauschalen
  const zveGesamt = Math.max(0, Math.round(kifbAbzug(zveP1Vor + zveP2Vor, kinderfreibetraege)));
  const zveHalbe = Math.round(zveGesamt / 2);

  // === EINZELVERANLAGUNG ===
  const estP1 = berechneEStGrund(zveP1, 2026);
  const estP2 = berechneEStGrund(zveP2, 2026);
  const estEinzelGesamt = estP1 + estP2;

  const soliP1 = berechneSoli(estP1, false, 2026);
  const soliP2 = berechneSoli(estP2, false, 2026);
  const soliEinzel = Math.round((soliP1 + soliP2) * 100) / 100;

  const kistP1 = kistWenn(estP1, kirchensteuerP1, bundesland);
  const kistP2 = kistWenn(estP2, kirchensteuerP2, bundesland);
  const kistEinzel = Math.round((kistP1 + kistP2) * 100) / 100;

  const gesamtEinzel = estEinzelGesamt + soliEinzel + kistEinzel;

  // === ZUSAMMENVERANLAGUNG (SPLITTING) ===
  const estHalbe = berechneEStGrund(zveHalbe, 2026);
  const estSplitting = estHalbe * 2;

  const soliSplitting = berechneSoli(estSplitting, true, 2026);

  // Kirchensteuer: Auf den jeweiligen ESt-Anteil berechnen
  // Vereinfachung: Bei Splitting wird die ESt hälftig verteilt
  const kistSplittingP1 = kistWenn(estHalbe, kirchensteuerP1, bundesland);
  const kistSplittingP2 = kistWenn(estHalbe, kirchensteuerP2, bundesland);
  const kistSplitting = Math.round((kistSplittingP1 + kistSplittingP2) * 100) / 100;

  const gesamtSplitting = estSplitting + soliSplitting + kistSplitting;

  // === VORTEIL ===
  const vorteilEst = estEinzelGesamt - estSplitting;
  const vorteilSoli = Math.round((soliEinzel - soliSplitting) * 100) / 100;
  const vorteilKist = Math.round((kistEinzel - kistSplitting) * 100) / 100;
  const vorteilGesamt = Math.round((gesamtEinzel - gesamtSplitting) * 100) / 100;

  // === STEUERKLASSEN-EMPFEHLUNG ===
  const gesamtBrutto = jahresBruttoP1 + jahresBruttoP2;
  const anteilP1 = gesamtBrutto > 0 ? jahresBruttoP1 / gesamtBrutto : 0.5;
  let empfehlung: 'III/V' | 'IV/IV' | 'IV/IV mit Faktor';
  let empfehlungText: string;

  if (anteilP1 >= 0.4 && anteilP1 <= 0.6) {
    empfehlung = 'IV/IV';
    empfehlungText = 'Beide Partner verdienen ähnlich viel. Die Kombination IV/IV sorgt für eine gleichmäßige Steuerbelastung im laufenden Jahr und vermeidet hohe Nachzahlungen.';
  } else {
    empfehlung = 'III/V';
    const mehrverdiener = jahresBruttoP1 >= jahresBruttoP2 ? 'Partner 1' : 'Partner 2';
    empfehlungText = `${mehrverdiener} verdient deutlich mehr. Mit III für den Mehrverdienenden und V für den Geringverdienenden erhalten Sie monatlich mehr Netto. Achtung: Es kann zu Nachzahlungen bei der Steuererklärung kommen. Das Faktorverfahren (IV/IV mit Faktor) kann eine Alternative sein.`;
  }

  // === VERGLEICHSTABELLE ===
  const vergleichsTabelle: SplittingVergleichsZeile[] = [
    { label: 'Einkommensteuer', einzel: estEinzelGesamt, splitting: estSplitting, vorteil: vorteilEst },
    { label: 'Solidaritätszuschlag', einzel: soliEinzel, splitting: soliSplitting, vorteil: vorteilSoli },
  ];

  if (kistEinzel > 0 || kistSplitting > 0) {
    vergleichsTabelle.push({ label: 'Kirchensteuer', einzel: kistEinzel, splitting: kistSplitting, vorteil: vorteilKist });
  }

  vergleichsTabelle.push({
    label: 'Gesamte Steuerlast',
    einzel: gesamtEinzel,
    splitting: gesamtSplitting,
    vorteil: vorteilGesamt,
    istGesamt: true,
  });

  return {
    estP1, estP2, estEinzelGesamt, soliEinzel, kistEinzel, gesamtEinzel,
    estSplitting, soliSplitting, kistSplitting, gesamtSplitting,
    vorteilEst, vorteilSoli, vorteilKist, vorteilGesamt,
    zveP1, zveP2, zveGesamt, zveHalbe,
    empfehlung, empfehlungText,
    vergleichsTabelle,
  };
}
