export type Veranlagung = 'zusammen' | 'einzeln';

export interface KindergeldEingabe {
  anzahlKinder: number;
  jahresbruttoeinkommen: number;
  veranlagung: Veranlagung;
  kirchensteuer: boolean;
}

export interface KindergeldErgebnis {
  // Kindergeld
  kindergeldMonat: number;
  kindergeldJahr: number;

  // Kinderfreibetrag
  kinderFreibetragGesamt: number;

  // Steuerberechnung
  zvEOhneFreibetrag: number;
  zvEMitFreibetrag: number;
  estOhneFreibetrag: number;
  estMitFreibetrag: number;
  soliOhne: number;
  soliMit: number;
  kistOhne: number;
  kistMit: number;

  // Günstigerprüfung
  steuerersparnisFreibetrag: number;
  vorteilKindergeld: number;   // = Kindergeld/Jahr
  vorteilFreibetrag: number;   // = Steuerersparnis
  differenz: number;           // = Vorteil Freibetrag − Vorteil Kindergeld
  gewinner: 'kindergeld' | 'freibetrag';
  breakevenBrutto: number;     // geschätztes Brutto, ab dem Freibetrag lohnt
}

// === KONSTANTEN 2026 ===

export const KINDERGELD_PRO_KIND_MONAT = 259;

// Kinderfreibetrag pro Kind (Einzelveranlagung = halber Freibetrag, Zusammenveranlagung = voller)
const KINDERFREIBETRAG_EINZEL = 4878;
const BEA_FREIBETRAG_EINZEL = 2928;
const FREIBETRAG_PRO_KIND_EINZEL = KINDERFREIBETRAG_EINZEL + BEA_FREIBETRAG_EINZEL; // 7.806 €
const FREIBETRAG_PRO_KIND_ZUSAMMEN = FREIBETRAG_PRO_KIND_EINZEL * 2; // 15.612 €

// Pauschalen
const WERBUNGSKOSTEN_PAUSCHBETRAG = 1230;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;

// Grobe SV-Pauschale für zvE-Schätzung (vereinfacht)
const SV_PAUSCHALE = 0.20;

// Soli-Parameter 2026 (§ 4 SolzG)
// Freigrenze Grundtarif: 20.350 €; Obergrenze Milderungszone: Freigrenze × 1,8595.
// TODO Prompt 88+: aus lib/berechnungen/einkommensteuer.ts (PARAMS[2026]) ableiten.
const SOLI_FREIGRENZE = 20350;
const SOLI_MILDERUNGSGRENZE = 37838;
const SOLI_SATZ = 0.055;

// Kirchensteuer (vereinfacht: 9%)
const KIST_SATZ = 0.09;

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Einkommensteuer Grundtabelle 2026 (§ 32a EStG)
 */
function estGrundtabelle(zvE: number): number {
  if (zvE <= 12348) return 0;
  if (zvE <= 17799) {
    const y = (zvE - 12348) / 10000;
    return Math.round((914.51 * y + 1400) * y);
  }
  if (zvE <= 69878) {
    const z = (zvE - 17799) / 10000;
    return Math.round((173.10 * z + 2397) * z + 1034.87);
  }
  if (zvE <= 277825) {
    return Math.round(0.42 * zvE - 11135.63);
  }
  return Math.round(0.45 * zvE - 19470.38);
}

/**
 * ESt nach Veranlagung — Splittingtarif oder Grundtarif
 */
function estNachVeranlagung(zvE: number, veranlagung: Veranlagung): number {
  if (zvE <= 0) return 0;
  if (veranlagung === 'zusammen') {
    return estGrundtabelle(zvE / 2) * 2;
  }
  return estGrundtabelle(zvE);
}

/**
 * Soli mit Milderungszone
 */
function soliBerechnen(est: number): number {
  if (est <= SOLI_FREIGRENZE) return 0;
  const voll = est * SOLI_SATZ;
  if (est >= SOLI_MILDERUNGSGRENZE) return voll;
  // Milderungszone: 11,9% des Betrags über Freigrenze
  const milderung = (est - SOLI_FREIGRENZE) * 0.119;
  return Math.min(voll, milderung);
}

export function berechneKindergeld(eingabe: KindergeldEingabe): KindergeldErgebnis | null {
  const { anzahlKinder, jahresbruttoeinkommen, veranlagung, kirchensteuer } = eingabe;

  if (anzahlKinder < 1) return null;

  // === KINDERGELD ===
  const kindergeldMonat = anzahlKinder * KINDERGELD_PRO_KIND_MONAT;
  const kindergeldJahr = kindergeldMonat * 12;

  // === KINDERFREIBETRAG ===
  const proKind = veranlagung === 'zusammen' ? FREIBETRAG_PRO_KIND_ZUSAMMEN : FREIBETRAG_PRO_KIND_EINZEL;
  const kinderFreibetragGesamt = proKind * anzahlKinder;

  // === ZVE (vereinfacht) ===
  // brutto − SV-Pauschale − Werbungskosten − Sonderausgaben
  const svAbzug = jahresbruttoeinkommen * SV_PAUSCHALE;
  const wkPauschale = veranlagung === 'zusammen' ? WERBUNGSKOSTEN_PAUSCHBETRAG * 2 : WERBUNGSKOSTEN_PAUSCHBETRAG;
  const soPauschale = veranlagung === 'zusammen' ? SONDERAUSGABEN_PAUSCHBETRAG * 2 : SONDERAUSGABEN_PAUSCHBETRAG;
  const zvEOhneFreibetrag = Math.max(0, jahresbruttoeinkommen - svAbzug - wkPauschale - soPauschale);
  const zvEMitFreibetrag = Math.max(0, zvEOhneFreibetrag - kinderFreibetragGesamt);

  // === STEUERN ===
  const estOhneFreibetrag = estNachVeranlagung(zvEOhneFreibetrag, veranlagung);
  const estMitFreibetrag = estNachVeranlagung(zvEMitFreibetrag, veranlagung);

  const soliOhne = soliBerechnen(estOhneFreibetrag);
  const soliMit = soliBerechnen(estMitFreibetrag);

  const kistOhne = kirchensteuer ? estOhneFreibetrag * KIST_SATZ : 0;
  const kistMit = kirchensteuer ? estMitFreibetrag * KIST_SATZ : 0;

  // === GÜNSTIGERPRÜFUNG ===
  // Steuerersparnis durch Freibetrag (inkl. Soli + KiSt)
  const steuerersparnisFreibetrag = rund2(
    (estOhneFreibetrag - estMitFreibetrag)
    + (soliOhne - soliMit)
    + (kistOhne - kistMit)
  );

  const vorteilKindergeld = kindergeldJahr;
  const vorteilFreibetrag = steuerersparnisFreibetrag;
  const differenz = rund2(vorteilFreibetrag - vorteilKindergeld);
  const gewinner: 'kindergeld' | 'freibetrag' = differenz > 0 ? 'freibetrag' : 'kindergeld';

  // === BREAKEVEN-SCHÄTZUNG ===
  // Ab welchem Brutto lohnt sich der Freibetrag?
  // Iterative Suche mit Binary Search
  let low = 20000;
  let high = 300000;
  let breakevenBrutto = 0;
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const svM = mid * SV_PAUSCHALE;
    const zvE_o = Math.max(0, mid - svM - wkPauschale - soPauschale);
    const zvE_m = Math.max(0, zvE_o - kinderFreibetragGesamt);
    const est_o = estNachVeranlagung(zvE_o, veranlagung);
    const est_m = estNachVeranlagung(zvE_m, veranlagung);
    const soli_o = soliBerechnen(est_o);
    const soli_m = soliBerechnen(est_m);
    const kist_o = kirchensteuer ? est_o * KIST_SATZ : 0;
    const kist_m = kirchensteuer ? est_m * KIST_SATZ : 0;
    const ersparnis = (est_o - est_m) + (soli_o - soli_m) + (kist_o - kist_m);
    if (ersparnis > kindergeldJahr) {
      high = mid;
      breakevenBrutto = mid;
    } else {
      low = mid;
    }
    if (high - low < 100) break;
  }
  breakevenBrutto = Math.round(breakevenBrutto / 1000) * 1000;

  return {
    kindergeldMonat,
    kindergeldJahr,
    kinderFreibetragGesamt,
    zvEOhneFreibetrag: rund2(zvEOhneFreibetrag),
    zvEMitFreibetrag: rund2(zvEMitFreibetrag),
    estOhneFreibetrag: rund2(estOhneFreibetrag),
    estMitFreibetrag: rund2(estMitFreibetrag),
    soliOhne: rund2(soliOhne),
    soliMit: rund2(soliMit),
    kistOhne: rund2(kistOhne),
    kistMit: rund2(kistMit),
    steuerersparnisFreibetrag,
    vorteilKindergeld,
    vorteilFreibetrag,
    differenz,
    gewinner,
    breakevenBrutto,
  };
}
