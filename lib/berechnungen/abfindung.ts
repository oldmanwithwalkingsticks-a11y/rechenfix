import {
  berechneEStGrund,
  berechneSoli,
  type Bundesland,
  kirchensteuersatzFuer,
  berechneKiSt as berechneKiStZentral,
} from './einkommensteuer';

export type KirchensteuerOption = 'nein' | '9' | '8';

export interface AbfindungEingabe {
  monatsBrutto: number;
  betriebsjahre: number;
  eigeneAbfindung: boolean;
  eigeneAbfindungBetrag: number;
  faktor: number;
  jahresBrutto: number; // tatsächlich: zu versteuerndes Einkommen ohne Abfindung
  /**
   * Veranlagungsart: Ledig = Grundtarif, zusammen = Splittingtarif auf zvE.
   * Die Steuerklasse (§ 39 EStG) spielt bei der Veranlagung nach § 34 EStG keine Rolle.
   */
  verheiratet: boolean;
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

/**
 * Einkommensteuer auf zvE — Grundtarif oder Splittingtarif.
 * Keine Steuerklassen-Faktoren (§ 34 EStG wirkt in der Veranlagung, nicht im Lohnsteuerabzug).
 */
function estVeranlagung(zvE: number, verheiratet: boolean): number {
  if (zvE <= 0) return 0;
  if (verheiratet) {
    return berechneEStGrund(zvE / 2, 2026) * 2;
  }
  return berechneEStGrund(zvE, 2026);
}

function kistBerechnen(est: number, option: KirchensteuerOption): number {
  if (option === 'nein' || est <= 0) return 0;
  const satz: 8 | 9 = option === '8' ? 8 : 9;
  return berechneKiStZentral(est, true, satz);
}

export function berechneAbfindung(eingabe: AbfindungEingabe): AbfindungErgebnis | null {
  const {
    monatsBrutto, betriebsjahre, eigeneAbfindung, eigeneAbfindungBetrag, faktor,
    jahresBrutto, verheiratet, kirchensteuer,
  } = eingabe;

  if (monatsBrutto <= 0 || betriebsjahre <= 0 || jahresBrutto <= 0) return null;

  // Brutto-Abfindung
  const bruttoAbfindung = eigeneAbfindung
    ? eigeneAbfindungBetrag
    : Math.round(monatsBrutto * betriebsjahre * faktor * 100) / 100;

  if (bruttoAbfindung <= 0) return null;

  // === OHNE Fünftelregelung ===
  const estOhneAbfindung = estVeranlagung(jahresBrutto, verheiratet);
  const estMitAbfindung = estVeranlagung(jahresBrutto + bruttoAbfindung, verheiratet);
  const steuerOhneFuenftel = Math.round((estMitAbfindung - estOhneAbfindung) * 100) / 100;

  const soliOhneFuenftelRaw =
    berechneSoli(estMitAbfindung, verheiratet, 2026) - berechneSoli(estOhneAbfindung, verheiratet, 2026);
  const soliOhneFuenftel = Math.max(0, Math.round(soliOhneFuenftelRaw * 100) / 100);

  const kirchensteuerOhneFuenftelRaw =
    kistBerechnen(estMitAbfindung, kirchensteuer) - kistBerechnen(estOhneAbfindung, kirchensteuer);
  const kirchensteuerOhneFuenftel = Math.max(0, Math.round(kirchensteuerOhneFuenftelRaw * 100) / 100);

  const abzuegeOhne = steuerOhneFuenftel + soliOhneFuenftel + kirchensteuerOhneFuenftel;
  const nettoOhneFuenftel = Math.round((bruttoAbfindung - abzuegeOhne) * 100) / 100;

  // === MIT Fünftelregelung (§ 34 EStG) ===
  // ESt_ermäßigt = 5 × [ESt(zvE + aoe/5) − ESt(zvE)]
  const estNormal = estVeranlagung(jahresBrutto, verheiratet);
  const estPlusFuenftel = estVeranlagung(jahresBrutto + bruttoAbfindung / 5, verheiratet);
  const differenz = estPlusFuenftel - estNormal;
  const steuerMitFuenftel = Math.round(differenz * 5 * 100) / 100;

  // Soli und KiSt auf die Steuer der Abfindung (Fünftelregelung)
  const gesamtSteuerMitFuenftel = estNormal + steuerMitFuenftel;
  const soliGesamt = berechneSoli(gesamtSteuerMitFuenftel, verheiratet, 2026);
  const soliNormal = berechneSoli(estNormal, verheiratet, 2026);
  const soliMitFuenftel = Math.max(0, Math.round((soliGesamt - soliNormal) * 100) / 100);

  const kiStGesamt = kistBerechnen(gesamtSteuerMitFuenftel, kirchensteuer);
  const kiStNormal = kistBerechnen(estNormal, kirchensteuer);
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
    soliOhneFuenftel,
    kirchensteuerOhneFuenftel,
    nettoOhneFuenftel,
    steuerErsparnis,
    nettoVorteil,
    nettoAnteilProzent,
    steuerAnteilProzent,
    nebenAnteilProzent,
  };
}

// Hilfs-Re-Export: KiSt-Satz für Bundesland (falls UI das braucht)
export function kistOptionFuerBundesland(bundesland: Bundesland): KirchensteuerOption {
  return kirchensteuersatzFuer(bundesland) === 8 ? '8' : '9';
}
