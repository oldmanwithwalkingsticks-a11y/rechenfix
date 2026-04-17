import { berechneLohnsteuerJahr } from './lohnsteuer';

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
  weihnachtsgeld?: number; // Brutto-Weihnachtsgeld (0 = keins)
}

export interface WeihnachtsgeldErgebnis {
  brutto: number;
  lohnsteuer: number;
  solidaritaet: number;
  kirchensteuer: number;
  krankenversicherung: number;
  rentenversicherung: number;
  arbeitslosenversicherung: number;
  pflegeversicherung: number;
  abzuege: number;
  netto: number;
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
  weihnachtsgeld?: WeihnachtsgeldErgebnis;
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

// Lohnsteuer/Jahressteuer via zentrale PAP-2026-Formel (§ 32a EStG)
// aus lib/berechnungen/lohnsteuer.ts — eine Quelle der Wahrheit, keine lineare
// Approximation mehr. Der BruttoNetto-Rechner kennt kein Jahresfreibetrag-Feld → 0.
function berechneLohnsteuer(brutto: number, steuerklasse: 1 | 2 | 3 | 4 | 5 | 6): number {
  const jahresBrutto = brutto * 12;
  const lstJahr = berechneLohnsteuerJahr(jahresBrutto, steuerklasse, 0);
  return Math.round((lstJahr / 12) * 100) / 100;
}

function berechneJahressteuer(jahresBrutto: number, steuerklasse: 1 | 2 | 3 | 4 | 5 | 6): number {
  return Math.round(berechneLohnsteuerJahr(jahresBrutto, steuerklasse, 0) * 100) / 100;
}

// Beitragsbemessungsgrenzen 2026 (einheitlich, seit 2025 keine West/Ost-Trennung)
const BBG_KV = 5812.50;   // monatlich · 69.750 €/Jahr
const BBG_RV = 8450;      // monatlich · 101.400 €/Jahr (einheitlich 2026)

export function berechneBruttoNetto(eingabe: BruttoNettoEingabe): BruttoNettoErgebnis {
  let brutto = eingabe.bruttoMonat;
  if (eingabe.abrechnungszeitraum === 'jahr') {
    brutto = eingabe.bruttoMonat / 12;
  }

  const bbgRv = BBG_RV;

  // Lohnsteuer
  const lohnsteuer = berechneLohnsteuer(brutto, eingabe.steuerklasse);

  // Solidaritätszuschlag
  const jahresLohnsteuer = lohnsteuer * 12;
  const solidaritaet = jahresLohnsteuer > 20350
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
  const pflegeBasis = Math.round(pvBrutto * 0.018 * 100) / 100;
  const pflegeZuschlag = eingabe.kinderfreibetraege === 0
    ? Math.round(pvBrutto * 0.006 * 100) / 100
    : 0;
  const pflegeversicherung = pflegeBasis + pflegeZuschlag;

  const steuernGesamt = lohnsteuer + solidaritaet + kirchensteuer;
  const sozialabgabenGesamt = krankenversicherung + rentenversicherung + arbeitslosenversicherung + pflegeversicherung;
  const gesamtAbzuege = steuernGesamt + sozialabgabenGesamt;
  const nettoMonat = Math.round((brutto - gesamtAbzuege) * 100) / 100;

  // Weihnachtsgeld-Berechnung
  let weihnachtsgeldErgebnis: WeihnachtsgeldErgebnis | undefined;
  const wgBrutto = eingabe.weihnachtsgeld ?? 0;

  if (wgBrutto > 0) {
    // Steuer: Jahressteuer mit WG minus Jahressteuer ohne WG
    const jahresBruttoOhne = brutto * 12;
    const jahresBruttoMit = jahresBruttoOhne + wgBrutto;
    const jahressteuerOhne = berechneJahressteuer(jahresBruttoOhne, eingabe.steuerklasse);
    const jahressteuerMit = berechneJahressteuer(jahresBruttoMit, eingabe.steuerklasse);
    const wgLohnsteuer = Math.round((jahressteuerMit - jahressteuerOhne) * 100) / 100;

    // Soli auf WG-Lohnsteuer
    const wgJahresLst = jahressteuerMit;
    const wgSolidaritaet = wgJahresLst > 20350
      ? Math.round(wgLohnsteuer * 0.055 * 100) / 100
      : 0;

    // Kirchensteuer auf WG
    const wgKirchensteuer = eingabe.kirchensteuer
      ? Math.round(wgLohnsteuer * (kstSatz / 100) * 100) / 100
      : 0;

    // SV-Beiträge auf Weihnachtsgeld (reguläre Sätze, BBG beachten)
    let wgKV: number;
    if (eingabe.kvArt === 'privat') {
      wgKV = 0; // PKV: kein zusätzlicher Beitrag
    } else {
      const kvBrutto = Math.min(wgBrutto, Math.max(0, BBG_KV * 12 - brutto * 12) > 0 ? wgBrutto : Math.max(0, BBG_KV - brutto));
      const kvBasis = Math.round(kvBrutto * 0.073 * 100) / 100;
      const kvZusatz = Math.round(kvBrutto * (eingabe.kvZusatzbeitrag / 200) * 100) / 100;
      wgKV = kvBasis + kvZusatz;
    }

    const wgRvBrutto = Math.min(wgBrutto, Math.max(0, bbgRv - brutto));
    const wgRV = eingabe.rvBefreit ? 0 : Math.round(wgRvBrutto * 0.093 * 100) / 100;

    const wgAvBrutto = Math.min(wgBrutto, Math.max(0, bbgRv - brutto));
    const wgAV = Math.round(wgAvBrutto * 0.013 * 100) / 100;

    const wgPvBrutto = Math.min(wgBrutto, Math.max(0, BBG_KV - brutto));
    const wgPvBasis = Math.round(wgPvBrutto * 0.018 * 100) / 100;
    const wgPvZuschlag = eingabe.kinderfreibetraege === 0
      ? Math.round(wgPvBrutto * 0.006 * 100) / 100
      : 0;
    const wgPV = wgPvBasis + wgPvZuschlag;

    const wgAbzuege = wgLohnsteuer + wgSolidaritaet + wgKirchensteuer + wgKV + wgRV + wgAV + wgPV;
    const wgNetto = Math.round((wgBrutto - wgAbzuege) * 100) / 100;

    weihnachtsgeldErgebnis = {
      brutto: wgBrutto,
      lohnsteuer: wgLohnsteuer,
      solidaritaet: wgSolidaritaet,
      kirchensteuer: wgKirchensteuer,
      krankenversicherung: Math.round(wgKV * 100) / 100,
      rentenversicherung: wgRV,
      arbeitslosenversicherung: wgAV,
      pflegeversicherung: Math.round(wgPV * 100) / 100,
      abzuege: Math.round(wgAbzuege * 100) / 100,
      netto: wgNetto,
    };
  }

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
    weihnachtsgeld: weihnachtsgeldErgebnis,
  };
}
