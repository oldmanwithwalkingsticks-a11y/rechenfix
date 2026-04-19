import {
  WK_PAUSCHALE_AN_2026,
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  type Bundesland,
} from './einkommensteuer';

export type NebenjobArt = 'minijob' | 'steuerkarte' | 'selbststaendig';

export interface NebenjobErgebnis {
  art: NebenjobArt;
  artLabel: string;
  hauptjobBrutto: number;
  nebenjobBrutto: number;

  // Hauptjob (unchanged)
  hauptjobNettoMonat: number;

  // Nebenjob details
  nebenjobLohnsteuer: number;
  nebenjobSoli: number;
  nebenjobKirchensteuer: number;
  nebenjobSozialversicherung: number;
  nebenjobNettoMonat: number;

  // Totals
  gesamtBruttoMonat: number;
  gesamtNettoMonat: number;
  nettoZuwachsMonat: number; // how much more per month vs no side job
  nettoZuwachsJahr: number;

  // Tax burden on side job
  steuerbelastungNebenjob: number; // percentage: all deductions / brutto * 100

  // Comparison hint
  hinweis: string;
}

// Einkommensteuer (Jahresbetrag) nach § 32a EStG — zentrale SSOT.
const berechneESt = (zvE: number) => berechneEStGrund(zvE, 2026);

// Vereinfachte Hauptjob-Netto-Schätzung (Steuerklasse I, gesetzlich KV)
function berechneHauptjobNetto(
  bruttoMonat: number,
  kirchensteuer: boolean,
  bundesland: Bundesland,
): number {
  // SV-Beitrag AN 2026: ~20,95 % (RV 9,3 %, KV 8,75 % inkl. 1,45 % Zusatz, PV 2,4 % kinderlos, AV 1,3 %)
  // BBG KV: 5.812,50 €/Monat; BBG RV/AV: 8.450 €/Monat (einheitlich 2026)
  const BBG_KV = 5812.5;
  const BBG_RV = 8450;

  const rvBasis = Math.min(bruttoMonat, BBG_RV);
  const kvBasis = Math.min(bruttoMonat, BBG_KV);

  const rv = Math.round(rvBasis * 0.093 * 100) / 100;
  const kv = Math.round(kvBasis * 0.0875 * 100) / 100; // 7,3 % + 1,45 % AN-Zusatz
  const pv = Math.round(kvBasis * 0.024 * 100) / 100;  // 1,8 % Basis + 0,6 % kinderlos
  const av = Math.round(rvBasis * 0.013 * 100) / 100;
  const sv = rv + kv + pv + av;

  // Lohnsteuer: ESt auf Jahres-zvE / 12
  // zvE = Brutto*12 - Werbungskostenpauschbetrag - Sonderausgabenpauschbetrag (36€)
  const jahresBrutto = bruttoMonat * 12;
  const zvE = Math.max(0, jahresBrutto - WK_PAUSCHALE_AN_2026 - 36);
  const jahresESt = berechneESt(zvE);
  const lstMonat = Math.round(jahresESt / 12 * 100) / 100;

  // Soli 2026 mit Milderungszone (§ 4 SolzG) via zentralem Helfer
  const soliJahr = berechneSoli(jahresESt, false, 2026);
  const soli = Math.round(soliJahr / 12 * 100) / 100;

  // Kirchensteuer 8/9 % je Bundesland
  const kistJahr = kirchensteuer ? berechneKirchensteuerByBundesland(jahresESt, bundesland) : 0;
  const kist = Math.round(kistJahr / 12 * 100) / 100;

  const abzuege = sv + lstMonat + soli + kist;
  return Math.round((bruttoMonat - abzuege) * 100) / 100;
}

export function berechneNebenjob(
  hauptjobBrutto: number,
  art: NebenjobArt,
  nebenjobBrutto: number,
  kirchensteuer: boolean,
  bundesland: Bundesland = 'Nordrhein-Westfalen',
): NebenjobErgebnis | null {
  if (hauptjobBrutto <= 0 || nebenjobBrutto <= 0) return null;

  const hauptjobNettoMonat = berechneHauptjobNetto(hauptjobBrutto, kirchensteuer, bundesland);

  let artLabel: string;
  let nebenjobLohnsteuer: number;
  let nebenjobSoli: number;
  let nebenjobKirchensteuer: number;
  let nebenjobSozialversicherung: number;
  let hinweis: string;

  if (art === 'minijob') {
    artLabel = 'Minijob (bis 603 €)';
    nebenjobLohnsteuer = 0;
    nebenjobSoli = 0;
    nebenjobKirchensteuer = 0;
    nebenjobSozialversicherung = 0;
    hinweis = 'Minijob ist steuerfrei — Ihr Netto entspricht dem Brutto.';
  } else if (art === 'steuerkarte') {
    artLabel = 'Steuerkarte (Steuerklasse VI)';
    // Steuerklasse VI: kein Grundfreibetrag, pauschal ~25%
    nebenjobLohnsteuer = Math.round(nebenjobBrutto * 0.25 * 100) / 100;
    // Soli auf Monats-LSt × 12 = Jahres-LSt (unter Freigrenze → 0); falls Nebenjob allein
    // in die Milderungszone kommt, greift die zentrale Funktion korrekt.
    const steuerkarteLstJahr = nebenjobLohnsteuer * 12;
    nebenjobSoli = Math.round(berechneSoli(steuerkarteLstJahr, false, 2026) / 12 * 100) / 100;
    nebenjobKirchensteuer = kirchensteuer
      ? Math.round(berechneKirchensteuerByBundesland(steuerkarteLstJahr, bundesland) / 12 * 100) / 100
      : 0;
    // Volle SV AN-Anteile: ~20.4%
    nebenjobSozialversicherung = Math.round(nebenjobBrutto * 0.204 * 100) / 100;
    hinweis =
      'Steuerklasse VI: kein Grundfreibetrag. Pflicht zur Steuererklärung — oft gibt es eine Erstattung.';
  } else {
    // selbststaendig
    artLabel = 'Selbstständig (Freelance)';
    // Keine SV (da hauptberuflich angestellt)
    nebenjobSozialversicherung = 0;

    // Steuer: Grenzsteuersatz-Methode
    const hauptjobJahr = hauptjobBrutto * 12;
    const nebenjobJahr = nebenjobBrutto * 12;

    // Werbungskosten-Pauschale nur auf Hauptjob; Nebenjob als Gewerbe/Freiberuf
    const zvEOhne = Math.max(0, hauptjobJahr - WK_PAUSCHALE_AN_2026 - 36);
    const zvEMit = Math.max(0, hauptjobJahr + nebenjobJahr - WK_PAUSCHALE_AN_2026 - 36);

    // Härteausgleich: bis 410€ Jahres-Nebenjob steuerfrei
    let zusatzsteuerJahr: number;
    let zusatzSoliJahr: number;
    let zusatzKiStJahr: number;
    if (nebenjobJahr <= 410) {
      zusatzsteuerJahr = 0;
      zusatzSoliJahr = 0;
      zusatzKiStJahr = 0;
    } else {
      const estOhne = berechneESt(zvEOhne);
      const estMit = berechneESt(zvEMit);
      zusatzsteuerJahr = Math.max(0, estMit - estOhne);
      // Soli-Ersparnis via Differenz der beiden berechneSoli-Werte (Milderungszone korrekt)
      zusatzSoliJahr = Math.max(0, berechneSoli(estMit, false, 2026) - berechneSoli(estOhne, false, 2026));
      zusatzKiStJahr = kirchensteuer
        ? Math.max(0, berechneKirchensteuerByBundesland(estMit, bundesland) - berechneKirchensteuerByBundesland(estOhne, bundesland))
        : 0;
    }

    nebenjobLohnsteuer = Math.round(zusatzsteuerJahr / 12 * 100) / 100;
    nebenjobSoli = Math.round(zusatzSoliJahr / 12 * 100) / 100;
    nebenjobKirchensteuer = Math.round(zusatzKiStJahr / 12 * 100) / 100;
    hinweis =
      'Selbstständiger Nebenjob: Einkünfte werden zum Hauptjob addiert → höherer Steuersatz. Steuererklärung ist Pflicht.';
  }

  const nebenjobNettoMonat = Math.round(
    (nebenjobBrutto -
      nebenjobLohnsteuer -
      nebenjobSoli -
      nebenjobKirchensteuer -
      nebenjobSozialversicherung) *
      100,
  ) / 100;

  const gesamtBruttoMonat = Math.round((hauptjobBrutto + nebenjobBrutto) * 100) / 100;
  const gesamtNettoMonat = Math.round((hauptjobNettoMonat + nebenjobNettoMonat) * 100) / 100;
  const nettoZuwachsMonat = Math.round((gesamtNettoMonat - hauptjobNettoMonat) * 100) / 100;
  const nettoZuwachsJahr = Math.round(nettoZuwachsMonat * 12 * 100) / 100;

  const gesamtAbzuegeNebenjob =
    nebenjobLohnsteuer + nebenjobSoli + nebenjobKirchensteuer + nebenjobSozialversicherung;
  const steuerbelastungNebenjob =
    nebenjobBrutto > 0
      ? Math.round((gesamtAbzuegeNebenjob / nebenjobBrutto) * 1000) / 10
      : 0;

  return {
    art,
    artLabel,
    hauptjobBrutto,
    nebenjobBrutto,
    hauptjobNettoMonat,
    nebenjobLohnsteuer,
    nebenjobSoli,
    nebenjobKirchensteuer,
    nebenjobSozialversicherung,
    nebenjobNettoMonat,
    gesamtBruttoMonat,
    gesamtNettoMonat,
    nettoZuwachsMonat,
    nettoZuwachsJahr,
    steuerbelastungNebenjob,
    hinweis,
  };
}
