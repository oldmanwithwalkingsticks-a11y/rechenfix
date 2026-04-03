export interface BruttoNettoEingabe {
  bruttoMonat: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  kirchensteuersatz: 8 | 9;
  kinderfreibetraege: number;
  bundesland: string;
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
}

// Vereinfachte Lohnsteuertabelle 2025 (monatlich, Steuerklasse 1)
function berechneLohnsteuerSK1(brutto: number): number {
  const jahresBrutto = brutto * 12;
  // Grundfreibetrag 2025: 12.096 €
  if (jahresBrutto <= 12096) return 0;
  // Vereinfachte progressive Besteuerung
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
  // Vereinfachte Faktoren je Steuerklasse
  const faktoren: Record<number, number> = {
    1: 1.0,
    2: 0.85,
    3: 0.55,
    4: 1.0,
    5: 1.55,
    6: 1.25,
  };
  return Math.round(sk1Steuer * (faktoren[steuerklasse] ?? 1) * 100) / 100;
}

export function berechneBruttoNetto(eingabe: BruttoNettoEingabe): BruttoNettoErgebnis {
  const brutto = eingabe.bruttoMonat;

  // Lohnsteuer
  const lohnsteuer = berechneLohnsteuer(brutto, eingabe.steuerklasse);

  // Solidaritätszuschlag (5,5% der Lohnsteuer, Freigrenze 18.130 € Jahressteuer)
  const jahresLohnsteuer = lohnsteuer * 12;
  const solidaritaet = jahresLohnsteuer > 18130
    ? Math.round(lohnsteuer * 0.055 * 100) / 100
    : 0;

  // Kirchensteuer
  const kirchensteuer = eingabe.kirchensteuer
    ? Math.round(lohnsteuer * (eingabe.kirchensteuersatz / 100) * 100) / 100
    : 0;

  // Sozialabgaben (Arbeitnehmeranteil)
  const krankenversicherung = Math.round(brutto * 0.073 * 100) / 100;   // 7,3% + ~0,8% Zusatzbeitrag
  const kvZusatz = Math.round(brutto * 0.008 * 100) / 100;
  const rentenversicherung = Math.round(brutto * 0.093 * 100) / 100;    // 9,3%
  const arbeitslosenversicherung = Math.round(brutto * 0.013 * 100) / 100; // 1,3%
  const pflegeversicherung = Math.round(brutto * 0.017 * 100) / 100;    // 1,7%
  const pflegeZuschlag = eingabe.kinderfreibetraege === 0
    ? Math.round(brutto * 0.006 * 100) / 100
    : 0;

  const kvGesamt = krankenversicherung + kvZusatz;
  const pvGesamt = pflegeversicherung + pflegeZuschlag;

  const gesamtAbzuege = lohnsteuer + solidaritaet + kirchensteuer +
    kvGesamt + rentenversicherung + arbeitslosenversicherung + pvGesamt;

  const nettoMonat = Math.round((brutto - gesamtAbzuege) * 100) / 100;

  return {
    bruttoMonat: brutto,
    bruttoJahr: brutto * 12,
    lohnsteuer,
    solidaritaet,
    kirchensteuer,
    krankenversicherung: kvGesamt,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung: pvGesamt,
    gesamtAbzuege: Math.round(gesamtAbzuege * 100) / 100,
    nettoMonat,
    nettoJahr: Math.round(nettoMonat * 12 * 100) / 100,
  };
}
