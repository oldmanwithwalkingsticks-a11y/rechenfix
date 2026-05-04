import {
  berechneEStGrund,
  berechneSoli as berechneSoliZentral,
  berechneKirchensteuerByBundesland,
  TARIF_2026,
  type Bundesland,
} from './einkommensteuer';

export interface SteuerprogressionsErgebnis {
  zvE: number;
  splitting: boolean;
  einkommensteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  gesamtSteuer: number;
  durchschnittssteuersatz: number;  // ESt / zvE * 100
  grenzsteuersatz: number;          // tax on next euro (as %)
  effektiverSteuersatz: number;     // gesamtSteuer / zvE * 100
  // For splitting comparison
  splittingVergleich?: {
    estOhne: number;
    estMit: number;
    vorteil: number;
  };
  // For the chart: array of data points
  kurvenDaten: Array<{
    einkommen: number;
    durchschnitt: number;
    grenz: number;
  }>;
  // Tabelle: 10k steps
  tabelleDaten: Array<{
    einkommen: number;
    est: number;
    durchschnitt: number;
    grenz: number;
  }>;
}

// Einkommensteuer nach § 32a EStG Grundtabelle 2026 — zentrale SSOT
const berechneESt = (zvE: number) => berechneEStGrund(zvE, 2026);

// Solidaritätszuschlag — zentrale SSOT (Milderungszone + Splittingtarif-Freigrenze)
const berechneSoli = (est: number, splitting: boolean = false) =>
  berechneSoliZentral(est, splitting, 2026);

// Kirchensteuer: bundesland-abhängig 8 % (BY/BW) oder 9 % — zentrale SSOT.
function berechneKiSt(est: number, kirchensteuer: boolean, bundesland: Bundesland): number {
  if (!kirchensteuer) return 0;
  return berechneKirchensteuerByBundesland(est, bundesland);
}

/**
 * Berechnet den Grenzsteuersatz (Marginal-Rate) für ein zu versteuerndes
 * Einkommen gemäß § 32a Abs. 1 EStG 2026 — analytisch aus den Tarif-
 * Polynom-Koeffizienten abgeleitet, nicht über numerische Δ-Approximation.
 *
 * Vor B4 (Welle 5 Track-B, 04.05.2026): nutzte Δ-Trick mit +1-Step, der
 * wegen Math.floor-Rundung in berechneESt2026 immer 0 oder 1 € Differenz
 * lieferte → ×100 = 0 % oder 100 % (M4-Befund Welle 4 — einziger echter
 * Lib-Bug). Analytische Ableitung eliminiert das Math.floor-Artefakt.
 *
 * Splittingtarif: ESt(zvE) = 2 · ESt_Grund(zvE/2) ⇒ dESt/dzvE
 *   = 2 · ESt_Grund'(zvE/2) · (1/2) = ESt_Grund'(zvE/2). Marginal-Rate im
 *   Splittingtarif ist identisch zur Grund-Marginal-Rate bei zvE/2.
 *
 * @param zvE Zu versteuerndes Einkommen (€/Jahr)
 * @param splitting Splittingtarif (Verheiratete, Zusammenveranlagung)
 * @returns Marginal-Rate in Prozent (0–45)
 */
function berechneGrenzsteuersatz(zvE: number, splitting: boolean): number {
  const T = TARIF_2026;
  const x = splitting ? zvE / 2 : zvE;
  if (x <= T.gfb) return 0;
  if (x <= T.z2_ende) {
    // Zone 2: ESt = (z2_a · y + z2_b) · y, y = (x − gfb) / 10000
    // dESt/dx = (2 · z2_a · y + z2_b) / 10000 ⇒ × 100 für Prozent
    const y = (x - T.gfb) / 10000;
    return (2 * T.z2_a * y + T.z2_b) / 100;
  }
  if (x <= T.z3_ende) {
    // Zone 3: ESt = (z3_a · z + z3_b) · z + z3_c, z = (x − z2_ende) / 10000
    const z = (x - T.z2_ende) / 10000;
    return (2 * T.z3_a * z + T.z3_b) / 100;
  }
  if (x <= T.z4_ende) return T.z4_m * 100; // Zone 4: konstant 42 %
  return T.z5_m * 100;                      // Zone 5: konstant 45 %
}

function berechneEStMitSplitting(zvE: number, splitting: boolean): number {
  if (splitting) {
    const halbZvE = Math.floor(zvE / 2);
    return berechneESt(halbZvE) * 2;
  }
  return berechneESt(zvE);
}

function berechneDurchschnittssteuersatz(est: number, zvE: number): number {
  if (zvE <= 0) return 0;
  return Math.round((est / zvE) * 10000) / 100; // 2 Dezimalstellen
}

export function berechneSteuerprogression(
  zvE: number,
  splitting: boolean,
  kirchensteuer: boolean,
  bundesland: Bundesland = 'Nordrhein-Westfalen',
): SteuerprogressionsErgebnis | null {
  if (zvE < 0 || isNaN(zvE)) return null;

  // Einkommensteuer
  const einkommensteuer = berechneEStMitSplitting(zvE, splitting);

  // Soli (Splittingtarif-Freigrenze greift bei splitting=true)
  const solidaritaetszuschlag = berechneSoli(einkommensteuer, splitting);

  // Kirchensteuer
  const kirchensteuerBetrag = berechneKiSt(einkommensteuer, kirchensteuer, bundesland);

  // Gesamt
  const gesamtSteuer = Math.round(
    (einkommensteuer + solidaritaetszuschlag + kirchensteuerBetrag) * 100,
  ) / 100;

  // Steuersätze
  const durchschnittssteuersatz = berechneDurchschnittssteuersatz(einkommensteuer, zvE);
  const grenzsteuersatz = berechneGrenzsteuersatz(zvE, splitting);
  const effektiverSteuersatz = zvE > 0
    ? Math.round((gesamtSteuer / zvE) * 10000) / 100
    : 0;

  // Splitting-Vergleich (nur bei Einzelveranlagung)
  let splittingVergleich: SteuerprogressionsErgebnis['splittingVergleich'];
  if (!splitting) {
    const estOhne = einkommensteuer;
    const estMit = berechneEStMitSplitting(zvE, true);
    splittingVergleich = {
      estOhne,
      estMit,
      vorteil: estOhne - estMit,
    };
  }

  // Kurvendaten: 0 bis 200.000 in 2.000er-Schritten
  const kurvenDaten: SteuerprogressionsErgebnis['kurvenDaten'] = [];
  for (let einkommen = 0; einkommen <= 200000; einkommen += 2000) {
    const est = berechneEStMitSplitting(einkommen, splitting);
    const durchschnitt = berechneDurchschnittssteuersatz(est, einkommen);
    const grenz = berechneGrenzsteuersatz(einkommen, splitting);
    kurvenDaten.push({ einkommen, durchschnitt, grenz });
  }

  // Tabellendaten: 10.000er-Schritte von 10.000 bis 200.000
  const tabelleDaten: SteuerprogressionsErgebnis['tabelleDaten'] = [];
  for (let einkommen = 10000; einkommen <= 200000; einkommen += 10000) {
    const est = berechneEStMitSplitting(einkommen, splitting);
    const durchschnitt = berechneDurchschnittssteuersatz(est, einkommen);
    const grenz = berechneGrenzsteuersatz(einkommen, splitting);
    tabelleDaten.push({ einkommen, est, durchschnitt, grenz });
  }

  return {
    zvE,
    splitting,
    einkommensteuer,
    solidaritaetszuschlag,
    kirchensteuer: kirchensteuerBetrag,
    gesamtSteuer,
    durchschnittssteuersatz,
    grenzsteuersatz,
    effektiverSteuersatz,
    splittingVergleich,
    kurvenDaten,
    tabelleDaten,
  };
}
