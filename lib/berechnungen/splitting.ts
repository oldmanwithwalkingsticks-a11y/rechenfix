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

const WERBUNGSKOSTEN_PAUSCHBETRAG = 1230;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;

const KIRCHENSTEUER_8_LAENDER = ['Bayern', 'Baden-Württemberg'];

export const BUNDESLAENDER = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
  'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
  'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
  'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
];

// Einkommensteuer nach § 32a EStG Grundtabelle 2026
function berechneEStGrundtabelle(zvE: number): number {
  const grundfreibetrag = 12348;
  if (zvE <= grundfreibetrag) return 0;
  if (zvE <= 17799) {
    const y = (zvE - grundfreibetrag) / 10000;
    return Math.round((914.51 * y + 1400) * y);
  }
  if (zvE <= 69878) {
    const z = (zvE - 17799) / 10000;
    return Math.round((173.10 * z + 2397) * z + 1034.87);
  }
  if (zvE <= 277825) {
    return Math.round(0.42 * zvE - 11135.63);
  }
  return Math.round(0.45 * zvE - 19470.38);
}

// Solidaritätszuschlag: 5,5 % der ESt mit Freigrenze 2026 (20.350 €) und Milderungszone
function berechneSoli(est: number): number {
  if (est <= 20350) return 0;
  // Milderungszone: 11,9 % des Differenzbetrags, gedeckelt auf 5,5 % ESt
  const mild = Math.round((est - 20350) * 0.119 * 100) / 100;
  const voll = Math.round(est * 0.055 * 100) / 100;
  return Math.min(mild, voll);
}

// Kirchensteuer
function berechneKiSt(est: number, hatKirche: boolean, bundesland: string): number {
  if (!hatKirche) return 0;
  const satz = KIRCHENSTEUER_8_LAENDER.includes(bundesland) ? 0.08 : 0.09;
  return Math.round(est * satz * 100) / 100;
}

// zvE berechnen (vereinfacht)
function berechneZvE(brutto: number, kinderfreibetraege: number): number {
  let zve = brutto - WERBUNGSKOSTEN_PAUSCHBETRAG - SONDERAUSGABEN_PAUSCHBETRAG;
  // Kinderfreibetrag 2026 inkl. BEA: 9.756 € sächlich + 5.856 € BEA = 15.612 € pro Kind (zusammen).
  // Einzelveranlagung: halber Freibetrag (7.806 €). Wert hier bezieht sich auf vollen Kinderfreibetrag.
  // Achtung: Kinderfreibetrag wird nur angesetzt wenn günstiger als Kindergeld.
  if (kinderfreibetraege > 0) {
    zve -= kinderfreibetraege * 15612;
  }
  return Math.max(0, Math.round(zve));
}

export function berechneSplitting(eingabe: SplittingEingabe): SplittingErgebnis | null {
  const {
    jahresBruttoP1, jahresBruttoP2,
    kirchensteuerP1, kirchensteuerP2,
    bundesland, kinderfreibetraege,
  } = eingabe;

  if (jahresBruttoP1 < 0 || jahresBruttoP2 < 0) return null;
  if (jahresBruttoP1 === 0 && jahresBruttoP2 === 0) return null;

  // zvE berechnen
  // Bei Einzelveranlagung: Kinderfreibeträge hälftig aufteilen
  const kfbEinzel = kinderfreibetraege / 2;
  const zveP1 = berechneZvE(jahresBruttoP1, kfbEinzel);
  const zveP2 = berechneZvE(jahresBruttoP2, kfbEinzel);

  // Bei Zusammenveranlagung: Voller Kinderfreibetrag
  const zveGesamt = berechneZvE(jahresBruttoP1 + jahresBruttoP2, kinderfreibetraege);
  const zveHalbe = Math.round(zveGesamt / 2);

  // === EINZELVERANLAGUNG ===
  const estP1 = berechneEStGrundtabelle(zveP1);
  const estP2 = berechneEStGrundtabelle(zveP2);
  const estEinzelGesamt = estP1 + estP2;

  const soliP1 = berechneSoli(estP1);
  const soliP2 = berechneSoli(estP2);
  const soliEinzel = Math.round((soliP1 + soliP2) * 100) / 100;

  const kistP1 = berechneKiSt(estP1, kirchensteuerP1, bundesland);
  const kistP2 = berechneKiSt(estP2, kirchensteuerP2, bundesland);
  const kistEinzel = Math.round((kistP1 + kistP2) * 100) / 100;

  const gesamtEinzel = estEinzelGesamt + soliEinzel + kistEinzel;

  // === ZUSAMMENVERANLAGUNG (SPLITTING) ===
  const estHalbe = berechneEStGrundtabelle(zveHalbe);
  const estSplitting = estHalbe * 2;

  const soliSplitting = berechneSoli(estSplitting);

  // Kirchensteuer: Auf den jeweiligen ESt-Anteil berechnen
  // Vereinfachung: Bei Splitting wird die ESt hälftig verteilt
  const kistSplittingP1 = berechneKiSt(estHalbe, kirchensteuerP1, bundesland);
  const kistSplittingP2 = berechneKiSt(estHalbe, kirchensteuerP2, bundesland);
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
