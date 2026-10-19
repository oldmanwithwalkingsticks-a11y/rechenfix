export type MinijobArt = 'gewerblich' | 'privathaushalt';

export interface MinijobEingabe {
  verdienst: number;         // €/Monat
  art: MinijobArt;
  rentenversicherungspflicht: boolean;
  stundenProWoche?: number;  // optional
}

export type JobStatus = 'minijob' | 'midijob' | 'regulaer';

export interface MinijobErgebnis {
  verdienst: number;
  status: JobStatus;

  // AN-Seite
  rvEigenanteil: number;
  nettoAN: number;
  nettoAN_ohneRv: number;   // Vergleich

  // AG-Seite
  agRentenversicherung: number;
  agKrankenversicherung: number;
  agLohnsteuer: number;
  agUmlagen: number;
  agUnfallversicherung: number; // nur Privathaushalt
  agAbgabenGesamt: number;
  agGesamtkosten: number;
  agAufschlagProzent: number;

  // Stundenlohn
  stundenlohn: number | null;
  unterMindestlohn: boolean;
  maxStundenProWoche: number; // bei Mindestlohn und diesem Verdienst

  // Konstanten
  minijobGrenze: number;
  midijobObergrenze: number;
  mindestlohn: number;

  // Vergleich Rentenpunkte (grobe Schätzung)
  rentenpunkteProJahrMitRv: number;
}

// Mindestlohn und Minijob-Grenze aus zentraler SSOT mit Stichtag-Switch:
// MINDESTLOHN springt am 01.01.2027 auf 14,60 €, MINIJOB_GRENZE_MONAT auf 633 €.
// MINDESTLOHN_2026 bleibt als Re-Export für Konsumenten, die explizit den
// 2026er Wert brauchen (z.B. SEO-Texte mit Jahresbezug).
import { MINDESTLOHN, MINIJOB_GRENZE_MONAT } from './mindestlohn';
import { DURCHSCHNITTSENTGELT_2026 } from './rente';
import { WOCHEN_PRO_MONAT } from './_helpers';
export { MINDESTLOHN_2026 } from './mindestlohn';
export { WOCHEN_PRO_MONAT } from './_helpers';

export const MINIJOB_GRENZE = MINIJOB_GRENZE_MONAT;   // €/Monat (Mindestlohn × 130 / 3 → 603 € in 2026)
export const MIDIJOB_OBERGRENZE = 2000;               // €/Monat
// Durchschnittliches Bruttoentgelt gesetzl. RV 2026: 51.944 €/Jahr (§ 69 SGB VI, Anlage 1)
// → Rentenpunkte-Umrechnung via SSOT-Konstante aus rente.ts.

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

// W167: Umlagen und Unfallversicherung 2026 laut Minijob-Zentrale („Minijob-Beiträge 2026", 16.12.2025):
// U1 0,80 % (gesenkt von 1,1 %), U2 0,22 %, Insolvenzgeldumlage 0,15 % (nur gewerblich),
// Unfallversicherung im Privathaushalt 1,6 %. Gewerblich kommt der Beitrag zur Berufsgenossenschaft
// dazu; er hängt von Branche und Gefahrtarif ab und ist hier nicht enthalten.
const UMLAGE_U1_2026 = 0.008;
const UMLAGE_U2_2026 = 0.0022;
const INSOLVENZGELDUMLAGE_2026 = 0.0015;
const UNFALLVERSICHERUNG_PRIVATHAUSHALT_2026 = 0.016;
// RV im Minijob: voller Beitrag 18,6 % (§ 158 SGB VI), mindestens aus 175 € (§ 163 Abs. 8 SGB VI).
// Der Arbeitgeber trägt 15 % (gewerblich) bzw. 5 % (Privathaushalt) des tatsächlichen Entgelts, den
// Rest der Minijobber (§ 168 Abs. 1 Nr. 1b und 1c SGB VI): ab 175 € also 3,6 % bzw. 13,6 %.
const RV_BEITRAGSSATZ_2026 = 0.186;
const RV_MINDESTBEMESSUNG = 175;

function getStatus(verdienst: number): JobStatus {
  if (verdienst <= MINIJOB_GRENZE) return 'minijob';
  if (verdienst <= MIDIJOB_OBERGRENZE) return 'midijob';
  return 'regulaer';
}

export function berechneMinijob(e: MinijobEingabe): MinijobErgebnis {
  const { verdienst, art, rentenversicherungspflicht, stundenProWoche } = e;
  const status = getStatus(verdienst);

  // === ARBEITGEBER-ABGABEN ===
  let agRv = 0, agKv = 0, agLst = 0, agUml = 0, agUnfall = 0;

  if (art === 'gewerblich') {
    agRv = rund2(verdienst * 0.15);   // 15% RV
    agKv = rund2(verdienst * 0.13);   // 13% KV
    agLst = rund2(verdienst * 0.02);  // 2% pauschale Lohnsteuer
    agUml = rund2(rund2(verdienst * UMLAGE_U1_2026) + rund2(verdienst * UMLAGE_U2_2026) + rund2(verdienst * INSOLVENZGELDUMLAGE_2026));
  } else {
    agRv = rund2(verdienst * 0.05);           // 5% RV
    agKv = rund2(verdienst * 0.05);           // 5% KV
    agLst = rund2(verdienst * 0.02);          // 2% Pauschsteuer
    agUml = rund2(rund2(verdienst * UMLAGE_U1_2026) + rund2(verdienst * UMLAGE_U2_2026)); // keine Insolvenzgeldumlage
    agUnfall = rund2(verdienst * UNFALLVERSICHERUNG_PRIVATHAUSHALT_2026);
  }

  const agAbgabenGesamt = rund2(agRv + agKv + agLst + agUml + agUnfall);
  const agGesamtkosten = rund2(verdienst + agAbgabenGesamt);
  const agAufschlagProzent = verdienst > 0 ? rund2((agAbgabenGesamt / verdienst) * 100) : 0;

  // === ARBEITNEHMER-ABGABEN ===
  // AN-Eigenanteil zur RV: voller Beitrag (mindestens aus 175 €) minus AG-Pauschale (W167)
  const rvEigenanteil = (status === 'minijob' && rentenversicherungspflicht && verdienst > 0)
    ? Math.max(0, rund2(rund2(Math.max(verdienst, RV_MINDESTBEMESSUNG) * RV_BEITRAGSSATZ_2026) - agRv))
    : 0;

  const nettoAN = rund2(verdienst - rvEigenanteil);
  const nettoAN_ohneRv = rund2(verdienst);

  // === STUNDENLOHN ===
  let stundenlohn: number | null = null;
  let unterMindestlohn = false;
  if (stundenProWoche && stundenProWoche > 0) {
    stundenlohn = rund2(verdienst / (stundenProWoche * WOCHEN_PRO_MONAT));
    unterMindestlohn = stundenlohn < MINDESTLOHN;
  }
  const maxStundenProWoche = rund2(verdienst / MINDESTLOHN / WOCHEN_PRO_MONAT);

  // === RENTENPUNKTE (grob) ===
  // 1 Rentenpunkt = Durchschnittsbrutto 2026: 51.944 €/Jahr (§ 69 SGB VI + Anlage 1).
  const jahresbrutto = verdienst * 12;
  const rentenpunkteProJahrMitRv = rentenversicherungspflicht && status === 'minijob'
    ? Math.round((jahresbrutto / DURCHSCHNITTSENTGELT_2026) * 1000) / 1000
    : 0;

  return {
    verdienst: rund2(verdienst),
    status,
    rvEigenanteil,
    nettoAN,
    nettoAN_ohneRv,
    agRentenversicherung: agRv,
    agKrankenversicherung: agKv,
    agLohnsteuer: agLst,
    agUmlagen: agUml,
    agUnfallversicherung: agUnfall,
    agAbgabenGesamt,
    agGesamtkosten,
    agAufschlagProzent,
    stundenlohn,
    unterMindestlohn,
    maxStundenProWoche,
    minijobGrenze: MINIJOB_GRENZE,
    midijobObergrenze: MIDIJOB_OBERGRENZE,
    mindestlohn: MINDESTLOHN,
    rentenpunkteProJahrMitRv,
  };
}
