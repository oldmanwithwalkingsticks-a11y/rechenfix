export interface BruttoNettoEingabe {
  bruttoMonat: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number;
  bundesland: string;
  kvArt: 'gesetzlich' | 'privat';
  kvZusatzbeitrag: number;
  kvPrivatBeitrag: number;
  rvBefreit: boolean;
  abrechnungszeitraum: 'monat' | 'jahr';
}

export interface BruttoNettoErgebnis {
  bruttoMonat: number;
  bruttoJahr: number;
  lohnsteuer: number;
  solidaritaet: number;
  kirchensteuer: number;
  krankenversicherung: number;
  rentenversicherung: number;
  arbeitslosenversicherung: number;
  pflegeversicherung: number;
  gesamtAbzuege: number;
  nettoMonat: number;
  nettoJahr: number;
  steuernGesamt: number;
  sozialabgabenGesamt: number;
  nettoProStunde: number;
  abzuegeProzent: number;
}

export const BUNDESLAENDER = [
  { kuerzel: 'BW', name: 'Baden-Württemberg', kirchensteuersatz: 8 as const },
  { kuerzel: 'BY', name: 'Bayern', kirchensteuersatz: 8 as const },
  { kuerzel: 'BE', name: 'Berlin', kirchensteuersatz: 9 as const },
  { kuerzel: 'BB', name: 'Brandenburg', kirchensteuersatz: 9 as const },
  { kuerzel: 'HB', name: 'Bremen', kirchensteuersatz: 9 as const },
  { kuerzel: 'HH', name: 'Hamburg', kirchensteuersatz: 9 as const },
  { kuerzel: 'HE', name: 'Hessen', kirchensteuersatz: 9 as const },
  { kuerzel: 'MV', name: 'Mecklenburg-Vorpommern', kirchensteuersatz: 9 as const },
  { kuerzel: 'NI', name: 'Niedersachsen', kirchensteuersatz: 9 as const },
  { kuerzel: 'NW', name: 'Nordrhein-Westfalen', kirchensteuersatz: 9 as const },
  { kuerzel: 'RP', name: 'Rheinland-Pfalz', kirchensteuersatz: 9 as const },
  { kuerzel: 'SL', name: 'Saarland', kirchensteuersatz: 9 as const },
  { kuerzel: 'SN', name: 'Sachsen', kirchensteuersatz: 9 as const },
  { kuerzel: 'ST', name: 'Sachsen-Anhalt', kirchensteuersatz: 9 as const },
  { kuerzel: 'SH', name: 'Schleswig-Holstein', kirchensteuersatz: 9 as const },
  { kuerzel: 'TH', name: 'Thüringen', kirchensteuersatz: 9 as const },
];

// Vereinfachte Lohnsteuertabelle 2025/2026 (monatlich, Steuerklasse 1)
function berechneLohnsteuerSK1(brutto: number): number {
  const jahresBrutto = brutto * 12;
  // Grundfreibetrag 2025: 12.096 €
  if (jahresBrutto <= 12096) return 0;
  const zuVersteuern = jahresBrutto - 12096;
  let steuer = 0;
  if (zuVersteuern <= 17442) {
    steuer = zuVersteuern * 0.14;
  } else if (zuVersteuern <= 54057) {
    steuer = 17442 * 0.14 + (zuVersteuern - 17442) * 0.2397;
  } else if (zuVersteuern <= 243714) {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + (zuVersteuern - 54057) * 0.42;
  } else {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + 189657 * 0.42 + (zuVersteuern - 243714) * 0.45;
  }
  return Math.round(steuer / 12 * 100) / 100;
}

function berechneLohnsteuer(brutto: number, steuerklasse: number): number {
  const sk1Steuer = berechneLohnsteuerSK1(brutto);
  const faktoren: Record<number, number> = {
    1: 1.0, 2: 0.85, 3: 0.55, 4: 1.0, 5: 1.55, 6: 1.25,
  };
  return Math.round(sk1Steuer * (faktoren[steuerklasse] ?? 1) * 100) / 100;
}

// Beitragsbemessungsgrenzen 2025
const BBG_KV = 5512.50;   // monatlich
const BBG_RV_WEST = 7550;  // monatlich
const BBG_RV_OST = 7450;   // monatlich

const OSTLAENDER = ['BE', 'BB', 'MV', 'SN', 'ST', 'TH'];

export function berechneBruttoNetto(eingabe: BruttoNettoEingabe): BruttoNettoErgebnis {
  let brutto = eingabe.bruttoMonat;
  if (eingabe.abrechnungszeitraum === 'jahr') {
    brutto = eingabe.bruttoMonat / 12;
  }

  const istOst = OSTLAENDER.includes(eingabe.bundesland);
  const bbgRv = istOst ? BBG_RV_OST : BBG_RV_WEST;

  // Lohnsteuer
  const lohnsteuer = berechneLohnsteuer(brutto, eingabe.steuerklasse);

  // Solidaritätszuschlag
  const jahresLohnsteuer = lohnsteuer * 12;
  const solidaritaet = jahresLohnsteuer > 18130
    ? Math.round(lohnsteuer * 0.055 * 100) / 100
    : 0;

  // Kirchensteuer
  const kstSatz = eingabe.kirchensteuersatz;
  const kirchensteuer = eingabe.kirchensteuer
    ? Math.round(lohnsteuer * (kstSatz / 100) * 100) / 100
    : 0;

  // Sozialabgaben
  let krankenversicherung: number;
  if (eingabe.kvArt === 'privat') {
    krankenversicherung = eingabe.kvPrivatBeitrag;
  } else {
    const kvBrutto = Math.min(brutto, BBG_KV);
    const kvBasis = Math.round(kvBrutto * 0.073 * 100) / 100;
    const kvZusatz = Math.round(kvBrutto * (eingabe.kvZusatzbeitrag / 200) * 100) / 100;
    krankenversicherung = kvBasis + kvZusatz;
  }

  const rvBrutto = Math.min(brutto, bbgRv);
  const rentenversicherung = eingabe.rvBefreit ? 0 : Math.round(rvBrutto * 0.093 * 100) / 100;

  const avBrutto = Math.min(brutto, bbgRv);
  const arbeitslosenversicherung = Math.round(avBrutto * 0.013 * 100) / 100;

  const pvBrutto = Math.min(brutto, BBG_KV);
  const pflegeBasis = Math.round(pvBrutto * 0.017 * 100) / 100;
  const pflegeZuschlag = eingabe.kinderfreibetraege === 0
    ? Math.round(pvBrutto * 0.006 * 100) / 100
    : 0;
  const pflegeversicherung = pflegeBasis + pflegeZuschlag;

  const steuernGesamt = lohnsteuer + solidaritaet + kirchensteuer;
  const sozialabgabenGesamt = krankenversicherung + rentenversicherung + arbeitslosenversicherung + pflegeversicherung;
  const gesamtAbzuege = steuernGesamt + sozialabgabenGesamt;
  const nettoMonat = Math.round((brutto - gesamtAbzuege) * 100) / 100;

  return {
    bruttoMonat: Math.round(brutto * 100) / 100,
    bruttoJahr: Math.round(brutto * 12 * 100) / 100,
    lohnsteuer,
    solidaritaet,
    kirchensteuer,
    krankenversicherung: Math.round(krankenversicherung * 100) / 100,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung: Math.round(pflegeversicherung * 100) / 100,
    gesamtAbzuege: Math.round(gesamtAbzuege * 100) / 100,
    nettoMonat,
    nettoJahr: Math.round(nettoMonat * 12 * 100) / 100,
    steuernGesamt: Math.round(steuernGesamt * 100) / 100,
    sozialabgabenGesamt: Math.round(sozialabgabenGesamt * 100) / 100,
    nettoProStunde: Math.round(nettoMonat / 160 * 100) / 100,
    abzuegeProzent: brutto > 0 ? Math.round((gesamtAbzuege / brutto) * 1000) / 10 : 0,
  };
}
