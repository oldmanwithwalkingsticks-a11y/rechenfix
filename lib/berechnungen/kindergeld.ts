import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  type Bundesland,
} from './einkommensteuer';

export type Veranlagung = 'zusammen' | 'einzeln';

export interface KindergeldEingabe {
  anzahlKinder: number;
  jahresbruttoeinkommen: number;
  veranlagung: Veranlagung;
  kirchensteuer: boolean;
  bundesland?: Bundesland;
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

// § 32 Abs. 6 EStG 2026 — Kinderfreibetrag + BEA.
// Zusammenveranlagung: voller Jahresfreibetrag pro Kind.
// Einzelveranlagung: halber Anteil pro Elternteil (Eltern teilen sich den Freibetrag).
export const KIFB_SAECHLICH_ZUSAMMEN_2026 = 6828;   // § 32 Abs. 6 Satz 1 EStG 2026
export const BEA_ZUSAMMEN_2026 = 2928;              // unverändert seit 2021
export const KIFB_GESAMT_ZUSAMMEN_2026 = KIFB_SAECHLICH_ZUSAMMEN_2026 + BEA_ZUSAMMEN_2026; // 9.756 €
export const KIFB_GESAMT_EINZEL_2026 = KIFB_GESAMT_ZUSAMMEN_2026 / 2; // 4.878 €

const FREIBETRAG_PRO_KIND_ZUSAMMEN = KIFB_GESAMT_ZUSAMMEN_2026;
const FREIBETRAG_PRO_KIND_EINZEL = KIFB_GESAMT_EINZEL_2026;

// Pauschalen
const WERBUNGSKOSTEN_PAUSCHBETRAG = 1230;
const SONDERAUSGABEN_PAUSCHBETRAG = 36;

// Grobe SV-Pauschale für zvE-Schätzung (vereinfacht, ohne BBG-Kappung).
// TODO: Für präzisere zvE-Schätzung könnte `berechneBruttoNetto` aus brutto-netto.ts
// konsumiert werden. Scope bewusst ausgeklammert — siehe Prompt 94 PR-Body.
const SV_PAUSCHALE = 0.20;

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * ESt nach Veranlagung — Splittingtarif oder Grundtarif, zentrale Lib.
 */
function estNachVeranlagung(zvE: number, veranlagung: Veranlagung): number {
  if (zvE <= 0) return 0;
  if (veranlagung === 'zusammen') {
    return berechneEStGrund(zvE / 2, 2026) * 2;
  }
  return berechneEStGrund(zvE, 2026);
}

function soliNachVeranlagung(est: number, veranlagung: Veranlagung): number {
  return berechneSoli(est, veranlagung === 'zusammen', 2026);
}

function kistBerechnen(est: number, hatKirche: boolean, bundesland?: Bundesland): number {
  if (!hatKirche) return 0;
  return berechneKirchensteuerByBundesland(est, bundesland ?? 'Nordrhein-Westfalen');
}

export function berechneKindergeld(eingabe: KindergeldEingabe): KindergeldErgebnis | null {
  const { anzahlKinder, jahresbruttoeinkommen, veranlagung, kirchensteuer, bundesland } = eingabe;

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

  const soliOhne = soliNachVeranlagung(estOhneFreibetrag, veranlagung);
  const soliMit = soliNachVeranlagung(estMitFreibetrag, veranlagung);

  const kistOhne = kistBerechnen(estOhneFreibetrag, kirchensteuer, bundesland);
  const kistMit = kistBerechnen(estMitFreibetrag, kirchensteuer, bundesland);

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
    const soli_o = soliNachVeranlagung(est_o, veranlagung);
    const soli_m = soliNachVeranlagung(est_m, veranlagung);
    const kist_o = kistBerechnen(est_o, kirchensteuer, bundesland);
    const kist_m = kistBerechnen(est_m, kirchensteuer, bundesland);
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
