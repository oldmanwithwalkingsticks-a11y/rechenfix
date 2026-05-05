export type Steuerjahr = 2024 | 2025 | 2026;

export type Bundesland =
  | 'Baden-Württemberg' | 'Bayern' | 'Berlin' | 'Brandenburg'
  | 'Bremen' | 'Hamburg' | 'Hessen' | 'Mecklenburg-Vorpommern'
  | 'Niedersachsen' | 'Nordrhein-Westfalen' | 'Rheinland-Pfalz'
  | 'Saarland' | 'Sachsen' | 'Sachsen-Anhalt' | 'Schleswig-Holstein'
  | 'Thüringen';

export const BUNDESLAENDER: Bundesland[] = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
  'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
  'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
  'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
];

const KIRCHENSTEUER_8_LAENDER: Bundesland[] = ['Bayern', 'Baden-Württemberg'];

// Arbeitnehmer-Pauschbetrag (Werbungskostenpauschale) 2026 — § 9a Nr. 1 EStG.
// SSOT: alle Rechner, die zvE oder Netto schätzen, importieren diese Konstante.
export const WK_PAUSCHALE_AN_2026 = 1230;

// Grundfreibetrag § 32a EStG — als Jahres-Konstante für Konsumenten außerhalb
// dieser Lib (z. B. SK-V-Näherungen, einfache Netto-Proxies). Für Tarif-Rechnungen
// immer berechneEStGrund verwenden, nicht manuell abziehen.
export const GRUNDFREIBETRAG_2026 = 12348;

/**
 * § 10c EStG — Sonderausgabenpauschale 2026 (für nicht spezifizierte Sonderausgaben).
 * Verwendung: Lohnsteuer-Berechnung (steuerklassen-vergleich.ts), Schätz-Vereinfachung.
 */
export const SA_PAUSCHALE_2026 = 36;

/**
 * Tarif-Konstanten 2026 für die Einkommensteuer-Zonen nach § 32a Abs. 1 EStG
 * i.d.F. StÄndG 2024.
 *
 * Quellen:
 *   - § 32a EStG: https://www.gesetze-im-internet.de/estg/__32a.html
 *
 * Stand: 01.01.2026.
 *
 * Verwendung: SSOT für analytische Tarif-Berechnungen (z. B.
 * berechneGrenzsteuersatz in steuerprogression.ts) und für berechneESt2026
 * selbst (W6.1, 05.05.2026 — schließt B4-technische-Schuld ab).
 */
export const TARIF_2026 = {
  /** Grundfreibetrag (Zone 1-Ende = Zone 2-Beginn). */
  gfb: 12348,
  /** Zone 2-Ende = Zone 3-Beginn (Marginal-Rate steigt linear 14 → 24 %). */
  z2_ende: 17799,
  /** Zone 3-Ende = Zone 4-Beginn (Marginal-Rate steigt linear 24 → 42 %). */
  z3_ende: 69878,
  /** Zone 4-Ende = Zone 5-Beginn (Marginal-Rate konstant 42 %, dann 45 %). */
  z4_ende: 277825,
  /** Zone 2-Polynom: ESt = (z2_a · y + z2_b) · y, y = (zvE − gfb) / 10.000. */
  z2_a: 914.51,
  z2_b: 1400,
  /** Zone 3-Polynom: ESt = (z3_a · z + z3_b) · z + z3_c, z = (zvE − z2_ende) / 10.000. */
  z3_a: 173.10,
  z3_b: 2397,
  z3_c: 1034.87,
  /** Zone 4-Geraden: ESt = z4_m · zvE − z4_b. */
  z4_m: 0.42,
  z4_b: 11135.63,
  /** Zone 5-Geraden: ESt = z5_m · zvE − z5_b. */
  z5_m: 0.45,
  z5_b: 19470.38,
} as const;

/**
 * § 32a EStG-Tarif 2025 (Werte aus berechneESt2025, via Welle-7-Pre-Phase verifiziert).
 * Strukturkonstanten z4_ende, z2_b, z3_b, z4_m, z5_m identisch zu TARIF_2026 by-design
 * (§ 32a EStG-Strukturparameter — Reichensteuer-Endpunkt + Polynom-b-Koeffizienten +
 * Marginal-Sätze 42 %/45 %).
 */
export const TARIF_2025 = {
  gfb: 12096,
  z2_ende: 17443,
  z3_ende: 68480,
  z4_ende: 277825,
  z2_a: 932.30,
  z2_b: 1400,
  z3_a: 176.64,
  z3_b: 2397,
  z3_c: 1015.13,
  z4_m: 0.42,
  z4_b: 10911.92,
  z5_m: 0.45,
  z5_b: 19246.67,
} as const;

/**
 * § 32a EStG-Tarif 2024 (Werte aus berechneESt2024, via Welle-7-Pre-Phase verifiziert).
 * Strukturkonstanten z4_ende, z2_b, z3_b, z4_m, z5_m identisch zu TARIF_2026/2025 by-design.
 */
export const TARIF_2024 = {
  gfb: 11604,
  z2_ende: 17005,
  z3_ende: 66760,
  z4_ende: 277825,
  z2_a: 922.98,
  z2_b: 1400,
  z3_a: 181.19,
  z3_b: 2397,
  z3_c: 1025.38,
  z4_m: 0.42,
  z4_b: 10602.13,
  z5_m: 0.45,
  z5_b: 18936.88,
} as const;

export function kirchensteuersatzFuer(bundesland: Bundesland): 8 | 9 {
  return KIRCHENSTEUER_8_LAENDER.includes(bundesland) ? 8 : 9;
}

export function berechneKirchensteuerByBundesland(est: number, bundesland: Bundesland): number {
  if (est <= 0) return 0;
  return berechneKiSt(est, true, kirchensteuersatzFuer(bundesland));
}

export interface EinkommensteuerEingabe {
  zvE: number;
  splitting: boolean;
  jahr: Steuerjahr;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
}

export interface EinkommensteuerErgebnis {
  zvE: number;
  splitting: boolean;
  jahr: Steuerjahr;
  einkommensteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  gesamtbelastung: number;
  grenzsteuersatz: number;     // %
  durchschnittssteuersatz: number; // %
  nettoEinkommen: number;
  grundfreibetrag: number;
  kurvenDaten: Array<{ einkommen: number; est: number; durchschnitt: number }>;
  vergleichstabelle: Array<{ einkommen: number; est: number; soli: number; kist: number; gesamt: number; durchschnitt: number }>;
  soliFreigrenze: number;
}

// Grundfreibeträge und Soli-Freigrenzen pro Jahr
const PARAMS: Record<Steuerjahr, { grundfreibetrag: number; soliFreigrenze: number }> = {
  2024: { grundfreibetrag: 11604, soliFreigrenze: 18130 },
  2025: { grundfreibetrag: 12096, soliFreigrenze: 19950 },
  2026: { grundfreibetrag: 12348, soliFreigrenze: 20350 },
};

// Einkommensteuer nach § 32a EStG i. d. F. v. 2024 — Formelberechnung 2026
function berechneESt2026(zvE: number): number {
  const T = TARIF_2026;
  if (zvE <= T.gfb) return 0;
  // Zone 2: 12.349 – 17.799 €
  if (zvE <= T.z2_ende) {
    const y = (zvE - T.gfb) / 10000;
    return Math.floor((T.z2_a * y + T.z2_b) * y);
  }
  // Zone 3: 17.800 – 69.878 €
  if (zvE <= T.z3_ende) {
    const z = (zvE - T.z2_ende) / 10000;
    return Math.floor((T.z3_a * z + T.z3_b) * z + T.z3_c);
  }
  // Zone 4: 69.879 – 277.825 €
  if (zvE <= T.z4_ende) {
    return Math.floor(T.z4_m * zvE - T.z4_b);
  }
  // Zone 5: ab 277.826 €
  return Math.floor(T.z5_m * zvE - T.z5_b);
}

// Einkommensteuer 2025 (Grundfreibetrag 12.096 €) — konsumiert TARIF_2025 (W7.2)
function berechneESt2025(zvE: number): number {
  const T = TARIF_2025;
  if (zvE <= T.gfb) return 0;
  if (zvE <= T.z2_ende) {
    const y = (zvE - T.gfb) / 10000;
    return Math.floor((T.z2_a * y + T.z2_b) * y);
  }
  if (zvE <= T.z3_ende) {
    const z = (zvE - T.z2_ende) / 10000;
    return Math.floor((T.z3_a * z + T.z3_b) * z + T.z3_c);
  }
  if (zvE <= T.z4_ende) {
    return Math.floor(T.z4_m * zvE - T.z4_b);
  }
  return Math.floor(T.z5_m * zvE - T.z5_b);
}

// Einkommensteuer 2024 (Grundfreibetrag 11.604 €) — konsumiert TARIF_2024 (W7.3)
function berechneESt2024(zvE: number): number {
  const T = TARIF_2024;
  if (zvE <= T.gfb) return 0;
  if (zvE <= T.z2_ende) {
    const y = (zvE - T.gfb) / 10000;
    return Math.floor((T.z2_a * y + T.z2_b) * y);
  }
  if (zvE <= T.z3_ende) {
    const z = (zvE - T.z2_ende) / 10000;
    return Math.floor((T.z3_a * z + T.z3_b) * z + T.z3_c);
  }
  if (zvE <= T.z4_ende) {
    return Math.floor(T.z4_m * zvE - T.z4_b);
  }
  return Math.floor(T.z5_m * zvE - T.z5_b);
}

function berechneEStGrund(zvE: number, jahr: Steuerjahr): number {
  if (zvE <= 0) return 0;
  switch (jahr) {
    case 2024: return berechneESt2024(Math.floor(zvE));
    case 2025: return berechneESt2025(Math.floor(zvE));
    case 2026: return berechneESt2026(Math.floor(zvE));
  }
}

function berechneEStMitSplitting(zvE: number, splitting: boolean, jahr: Steuerjahr): number {
  if (splitting) {
    const halb = Math.floor(zvE / 2);
    return berechneEStGrund(halb, jahr) * 2;
  }
  return berechneEStGrund(zvE, jahr);
}

// Soli mit Freigrenze und Milderungszone (§ 4 SolzG)
function berechneSoli(est: number, splitting: boolean, jahr: Steuerjahr): number {
  const freigrenzeEinzel = PARAMS[jahr].soliFreigrenze;
  const freigrenze = splitting ? freigrenzeEinzel * 2 : freigrenzeEinzel;

  if (est <= freigrenze) return 0;

  // Milderungszone: 11,9 % × (ESt − Freigrenze), gedeckelt auf 5,5 % ESt
  const mild = (est - freigrenze) * 0.119;
  const voll = est * 0.055;
  return Math.round(Math.min(mild, voll) * 100) / 100;
}

function berechneKiSt(est: number, kirchensteuer: boolean, satz: 8 | 9): number {
  if (!kirchensteuer) return 0;
  return Math.round(est * (satz / 100) * 100) / 100;
}

// Grenzsteuersatz
function berechneGrenzsteuersatz(zvE: number, splitting: boolean, jahr: Steuerjahr): number {
  const est1 = berechneEStMitSplitting(zvE, splitting, jahr);
  const est2 = berechneEStMitSplitting(zvE + 100, splitting, jahr);
  return Math.round((est2 - est1) / 100 * 10000) / 100;
}

export function berechneEinkommensteuer(e: EinkommensteuerEingabe): EinkommensteuerErgebnis {
  const { zvE, splitting, jahr, kirchensteuer, kirchensteuersatz } = e;

  const einkommensteuer = berechneEStMitSplitting(zvE, splitting, jahr);
  const soli = berechneSoli(einkommensteuer, splitting, jahr);
  const kist = berechneKiSt(einkommensteuer, kirchensteuer, kirchensteuersatz);
  const gesamtbelastung = Math.round((einkommensteuer + soli + kist) * 100) / 100;

  const grenzsteuersatz = berechneGrenzsteuersatz(zvE, splitting, jahr);
  const durchschnittssteuersatz = zvE > 0
    ? Math.round(einkommensteuer / zvE * 10000) / 100
    : 0;

  const nettoEinkommen = Math.round((zvE - gesamtbelastung) * 100) / 100;

  // Kurvendaten: 0 bis 200.000 in 5.000er-Schritten
  const kurvenDaten: EinkommensteuerErgebnis['kurvenDaten'] = [];
  for (let eink = 0; eink <= 200000; eink += 5000) {
    const est = berechneEStMitSplitting(eink, splitting, jahr);
    const dur = eink > 0 ? Math.round(est / eink * 10000) / 100 : 0;
    kurvenDaten.push({ einkommen: eink, est, durchschnitt: dur });
  }

  // Vergleichstabelle: 30k, 50k, 75k, 100k, 150k
  const werte = [30000, 50000, 75000, 100000, 150000];
  const vergleichstabelle = werte.map(w => {
    const est = berechneEStMitSplitting(w, splitting, jahr);
    const s = berechneSoli(est, splitting, jahr);
    const k = berechneKiSt(est, kirchensteuer, kirchensteuersatz);
    return {
      einkommen: w,
      est,
      soli: s,
      kist: k,
      gesamt: Math.round((est + s + k) * 100) / 100,
      durchschnitt: w > 0 ? Math.round(est / w * 10000) / 100 : 0,
    };
  });

  return {
    zvE,
    splitting,
    jahr,
    einkommensteuer,
    solidaritaetszuschlag: soli,
    kirchensteuer: kist,
    gesamtbelastung,
    grenzsteuersatz,
    durchschnittssteuersatz,
    nettoEinkommen,
    grundfreibetrag: PARAMS[jahr].grundfreibetrag,
    kurvenDaten,
    vergleichstabelle,
    soliFreigrenze: splitting ? PARAMS[jahr].soliFreigrenze * 2 : PARAMS[jahr].soliFreigrenze,
  };
}

export { berechneEStGrund, berechneEStMitSplitting, berechneSoli, berechneKiSt };
