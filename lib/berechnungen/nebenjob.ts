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

// Einkommensteuer (Jahresbetrag) nach §32a EStG 2026
function berechneESt(zvE: number): number {
  const grundfreibetrag = 12348;
  if (zvE <= grundfreibetrag) return 0;
  const x = zvE - grundfreibetrag;
  let steuer: number;
  if (x <= 5451) { // bis zvE 17.799 €
    const y = x / 10000;
    steuer = (914.51 * y + 1400) * y;
  } else if (x <= 57530) { // bis zvE 69.878 €
    const z = (x - 5451) / 10000;
    steuer = (173.10 * z + 2397) * z + 1034.87;
  } else if (x <= 265477) { // bis zvE 277.825 €
    steuer = 0.42 * zvE - 11135.63;
  } else {
    steuer = 0.45 * zvE - 19470.38;
  }
  return Math.round(steuer);
}

// Vereinfachte Hauptjob-Netto-Schätzung (Steuerklasse I, gesetzlich KV)
function berechneHauptjobNetto(bruttoMonat: number, kirchensteuer: boolean): number {
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
  // zvE = Brutto*12 - Werbungskosten-Pauschbetrag (1230€) - Sonderausgaben-Pauschbetrag (36€)
  const jahresBrutto = bruttoMonat * 12;
  const zvE = Math.max(0, jahresBrutto - 1230 - 36);
  const jahresESt = berechneESt(zvE);
  const lstMonat = Math.round(jahresESt / 12 * 100) / 100;

  // Soli: 5,5 % der LSt, Freigrenze 20.350 € Jahres-LSt 2026
  const soli = jahresESt > 20350 ? Math.round(lstMonat * 0.055 * 100) / 100 : 0;

  // Kirchensteuer: 9% der LSt
  const kist = kirchensteuer ? Math.round(lstMonat * 0.09 * 100) / 100 : 0;

  const abzuege = sv + lstMonat + soli + kist;
  return Math.round((bruttoMonat - abzuege) * 100) / 100;
}

export function berechneNebenjob(
  hauptjobBrutto: number,
  art: NebenjobArt,
  nebenjobBrutto: number,
  kirchensteuer: boolean,
): NebenjobErgebnis | null {
  if (hauptjobBrutto <= 0 || nebenjobBrutto <= 0) return null;

  const hauptjobNettoMonat = berechneHauptjobNetto(hauptjobBrutto, kirchensteuer);

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
    nebenjobSoli = Math.round(nebenjobLohnsteuer * 0.055 * 100) / 100;
    nebenjobKirchensteuer = kirchensteuer
      ? Math.round(nebenjobLohnsteuer * 0.09 * 100) / 100
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
    const zvEOhne = Math.max(0, hauptjobJahr - 1230 - 36);
    const zvEMit = Math.max(0, hauptjobJahr + nebenjobJahr - 1230 - 36);

    // Härteausgleich: bis 410€ Jahres-Nebenjob steuerfrei
    let zusatzsteuerJahr: number;
    if (nebenjobJahr <= 410) {
      zusatzsteuerJahr = 0;
    } else {
      zusatzsteuerJahr = Math.max(0, berechneESt(zvEMit) - berechneESt(zvEOhne));
    }

    nebenjobLohnsteuer = Math.round(zusatzsteuerJahr / 12 * 100) / 100;
    nebenjobSoli = Math.round((zusatzsteuerJahr / 12) * 0.055 * 100) / 100;
    nebenjobKirchensteuer = kirchensteuer
      ? Math.round((zusatzsteuerJahr / 12) * 0.09 * 100) / 100
      : 0;
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
