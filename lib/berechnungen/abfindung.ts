export type KirchensteuerOption = 'nein' | '9' | '8';

export interface AbfindungEingabe {
  monatsBrutto: number;
  betriebsjahre: number;
  eigeneAbfindung: boolean;
  eigeneAbfindungBetrag: number;
  faktor: number;
  jahresBrutto: number; // ohne Abfindung
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: KirchensteuerOption;
}

export interface AbfindungErgebnis {
  bruttoAbfindung: number;
  // Mit Fünftelregelung
  steuerMitFuenftel: number;
  soliMitFuenftel: number;
  kirchensteuerMitFuenftel: number;
  nettoMitFuenftel: number;
  // Ohne Fünftelregelung
  steuerOhneFuenftel: number;
  soliOhneFuenftel: number;
  kirchensteuerOhneFuenftel: number;
  nettoOhneFuenftel: number;
  // Ersparnis
  steuerErsparnis: number;
  nettoVorteil: number;
  // Anteile für Diagramm
  nettoAnteilProzent: number;
  steuerAnteilProzent: number;
  nebenAnteilProzent: number; // Soli + KiSt
}

// Einkommensteuer nach § 32a EStG (Grundtabelle 2026)
function berechneESt(zvE: number, steuerklasse: number): number {
  const grundfreibetrag = 12348;
  if (zvE <= grundfreibetrag) return 0;

  let steuer = 0;
  if (zvE <= 17799) {
    const y = (zvE - grundfreibetrag) / 10000;
    steuer = (914.51 * y + 1400) * y;
  } else if (zvE <= 69878) {
    const z = (zvE - 17799) / 10000;
    steuer = (173.10 * z + 2397) * z + 1034.87;
  } else if (zvE <= 277825) {
    steuer = 0.42 * zvE - 11135.63;
  } else {
    steuer = 0.45 * zvE - 19470.38;
  }

  // Steuerklassen-Faktor
  const faktoren: Record<number, number> = {
    1: 1.0, 2: 0.85, 3: 0.55, 4: 1.0, 5: 1.55, 6: 1.25,
  };
  return Math.round(steuer * (faktoren[steuerklasse] ?? 1) * 100) / 100;
}

function berechneSoli(lohnsteuer: number): number {
  // Soli: 5,5 % auf Lohnsteuer, Freigrenze 20.350 €/Jahr 2026
  if (lohnsteuer <= 20350) return 0;
  return Math.round(lohnsteuer * 0.055 * 100) / 100;
}

function berechneKiSt(lohnsteuer: number, satz: KirchensteuerOption): number {
  if (satz === 'nein') return 0;
  const prozent = satz === '8' ? 0.08 : 0.09;
  return Math.round(lohnsteuer * prozent * 100) / 100;
}

export function berechneAbfindung(eingabe: AbfindungEingabe): AbfindungErgebnis | null {
  const { monatsBrutto, betriebsjahre, eigeneAbfindung, eigeneAbfindungBetrag, faktor, jahresBrutto, steuerklasse, kirchensteuer } = eingabe;

  if (monatsBrutto <= 0 || betriebsjahre <= 0 || jahresBrutto <= 0) return null;

  // Brutto-Abfindung
  const bruttoAbfindung = eigeneAbfindung
    ? eigeneAbfindungBetrag
    : Math.round(monatsBrutto * betriebsjahre * faktor * 100) / 100;

  if (bruttoAbfindung <= 0) return null;

  // === OHNE Fünftelregelung ===
  const estOhneAbfindung = berechneESt(jahresBrutto, steuerklasse);
  const estMitAbfindung = berechneESt(jahresBrutto + bruttoAbfindung, steuerklasse);
  const steuerOhneFuenftel = Math.round((estMitAbfindung - estOhneAbfindung) * 100) / 100;
  const soliOhneFuenftel = berechneSoli(estMitAbfindung) - berechneSoli(estOhneAbfindung);
  const kirchensteuerOhneFuenftel = berechneKiSt(estMitAbfindung, kirchensteuer) - berechneKiSt(estOhneAbfindung, kirchensteuer);
  const abzuegeOhne = steuerOhneFuenftel + Math.max(0, soliOhneFuenftel) + Math.max(0, kirchensteuerOhneFuenftel);
  const nettoOhneFuenftel = Math.round((bruttoAbfindung - abzuegeOhne) * 100) / 100;

  // === MIT Fünftelregelung (§ 34 EStG) ===
  const estNormal = berechneESt(jahresBrutto, steuerklasse);
  const estPlusFuenftel = berechneESt(jahresBrutto + bruttoAbfindung / 5, steuerklasse);
  const differenz = estPlusFuenftel - estNormal;
  const steuerMitFuenftel = Math.round(differenz * 5 * 100) / 100;

  // Soli und KiSt auf die Steuer der Abfindung (Fünftelregelung)
  const gesamtSteuerMitFuenftel = estNormal + steuerMitFuenftel;
  const soliGesamt = berechneSoli(gesamtSteuerMitFuenftel);
  const soliNormal = berechneSoli(estNormal);
  const soliMitFuenftel = Math.max(0, Math.round((soliGesamt - soliNormal) * 100) / 100);

  const kiStGesamt = berechneKiSt(gesamtSteuerMitFuenftel, kirchensteuer);
  const kiStNormal = berechneKiSt(estNormal, kirchensteuer);
  const kirchensteuerMitFuenftel = Math.max(0, Math.round((kiStGesamt - kiStNormal) * 100) / 100);

  const abzuegeMit = steuerMitFuenftel + soliMitFuenftel + kirchensteuerMitFuenftel;
  const nettoMitFuenftel = Math.round((bruttoAbfindung - abzuegeMit) * 100) / 100;

  // Ersparnis
  const steuerErsparnis = Math.round((steuerOhneFuenftel - steuerMitFuenftel) * 100) / 100;
  const nettoVorteil = Math.round((nettoMitFuenftel - nettoOhneFuenftel) * 100) / 100;

  // Anteile für Diagramm
  const nebenMit = soliMitFuenftel + kirchensteuerMitFuenftel;
  const nettoAnteilProzent = bruttoAbfindung > 0 ? Math.round((nettoMitFuenftel / bruttoAbfindung) * 1000) / 10 : 0;
  const steuerAnteilProzent = bruttoAbfindung > 0 ? Math.round((steuerMitFuenftel / bruttoAbfindung) * 1000) / 10 : 0;
  const nebenAnteilProzent = bruttoAbfindung > 0 ? Math.round((nebenMit / bruttoAbfindung) * 1000) / 10 : 0;

  return {
    bruttoAbfindung,
    steuerMitFuenftel,
    soliMitFuenftel,
    kirchensteuerMitFuenftel,
    nettoMitFuenftel,
    steuerOhneFuenftel,
    soliOhneFuenftel: Math.max(0, soliOhneFuenftel),
    kirchensteuerOhneFuenftel: Math.max(0, kirchensteuerOhneFuenftel),
    nettoOhneFuenftel,
    steuerErsparnis,
    nettoVorteil,
    nettoAnteilProzent,
    steuerAnteilProzent,
    nebenAnteilProzent,
  };
}
