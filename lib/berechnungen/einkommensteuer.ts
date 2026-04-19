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
  const gf = 12348;
  if (zvE <= gf) return 0;
  // Zone 2: 12.349 – 17.799 €
  if (zvE <= 17799) {
    const y = (zvE - gf) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }
  // Zone 3: 17.800 – 69.878 €
  if (zvE <= 69878) {
    const z = (zvE - 17799) / 10000;
    return Math.floor((173.10 * z + 2397) * z + 1034.87);
  }
  // Zone 4: 69.879 – 277.825 €
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 11135.63);
  }
  // Zone 5: ab 277.826 €
  return Math.floor(0.45 * zvE - 19470.38);
}

// Einkommensteuer 2025 (Grundfreibetrag 12.096 € — Werte praktisch identisch zu 2026 bis auf Details)
function berechneESt2025(zvE: number): number {
  const gf = 12096;
  if (zvE <= gf) return 0;
  if (zvE <= 17443) {
    const y = (zvE - gf) / 10000;
    return Math.floor((932.30 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return Math.floor((176.64 * z + 2397) * z + 1015.13);
  }
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 10911.92);
  }
  return Math.floor(0.45 * zvE - 19246.67);
}

// Einkommensteuer 2024 (Grundfreibetrag 11.604 €)
function berechneESt2024(zvE: number): number {
  const gf = 11604;
  if (zvE <= gf) return 0;
  if (zvE <= 17005) {
    const y = (zvE - gf) / 10000;
    return Math.floor((922.98 * y + 1400) * y);
  }
  if (zvE <= 66760) {
    const z = (zvE - 17005) / 10000;
    return Math.floor((181.19 * z + 2397) * z + 1025.38);
  }
  if (zvE <= 277825) {
    return Math.floor(0.42 * zvE - 10602.13);
  }
  return Math.floor(0.45 * zvE - 18936.88);
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
