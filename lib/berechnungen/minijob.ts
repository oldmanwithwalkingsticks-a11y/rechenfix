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

  // AG-Seite. W207: Pauschalen nur bei status 'minijob'. Im Übergangsbereich und darüber zahlt der
  // Arbeitgeber keine Pauschalen, sondern seinen regulären Anteil (berechneArbeitgeberSvMonat in
  // brutto-netto.ts); dort sind alle AG-Beträge 0, agGesamtkosten = verdienst, und nettoAN enthält
  // keine Abzüge. Der Minijob-Rechner zeigt diese Werte außerhalb des Minijobs nicht an.
  agRentenversicherung: number;
  agKrankenversicherung: number;
  agKvSatzProzent: number;      // W206: Pauschale zur KV in Prozent (gewerblich 13 bzw. ab 2027 17,5; Privathaushalt 5)
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
// der Mindestlohn springt am 01.01.2027 auf 14,60 €, die Minijob-Grenze auf 633 €.
// MINDESTLOHN_2026 bleibt als Re-Export für Konsumenten, die explizit den
// 2026er Wert brauchen (z.B. SEO-Texte mit Jahresbezug).
// W206: berechneMinijob nimmt einen Stichtag (Standard heute) und bestimmt Grenze, Mindestlohn und
// KV-Pauschale zu diesem Tag. Der Nebenjob-Rechner übergibt SV_RECHENSTAND.
import { getAktuellerMindestlohn, getMinijobGrenzeMonat, MINIJOB_GRENZE_MONAT } from './mindestlohn';
import { DURCHSCHNITTSENTGELT_2026 } from './rente';
import { getMinijobKvPauschaleProzent } from './sv-parameter';
import { anteilCent, WOCHEN_PRO_MONAT } from './_helpers';
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

function getStatus(verdienst: number, minijobGrenze: number): JobStatus {
  if (verdienst <= minijobGrenze) return 'minijob';
  if (verdienst <= MIDIJOB_OBERGRENZE) return 'midijob';
  return 'regulaer';
}

export function berechneMinijob(e: MinijobEingabe, stichtag: Date = new Date()): MinijobErgebnis {
  const { art, rentenversicherungspflicht, stundenProWoche } = e;
  // W207: zweite Sicherung neben der Komponente — NaN, Infinity und negative Werte zählen als 0 (Guard G1)
  const verdienst = Number.isFinite(e.verdienst) && e.verdienst > 0 ? e.verdienst : 0;
  const minijobGrenze = getMinijobGrenzeMonat(stichtag);
  const mindestlohn = getAktuellerMindestlohn(stichtag);
  const status = getStatus(verdienst, minijobGrenze);

  // === ARBEITGEBER-ABGABEN ===
  // W206: KV-Pauschale gewerblich zum Stichtag (bis 2026 13 %, ab 01.01.2027 14,6 % plus durchschnittlicher
  // Zusatzbeitrag, 2027 zusammen 17,5 %; § 249b SGB V). Alle Beträge mit anteilCent: kaufmännisch auf
  // Cent, vorher rund2(Entgelt × Satz), das halbe Cent teils abrundete.
  // W207: Pauschalen nur im Minijob. § 249b SGB V, § 172 Abs. 3 und 3a SGB VI und § 40a Abs. 2 EStG
  // gelten für geringfügig Beschäftigte; im Übergangsbereich (§ 20 Abs. 2 SGB IV) und darüber zahlt der
  // Arbeitgeber seinen regulären Anteil. Vorher rechnete die Lib die Pauschalen bei jedem Verdienst
  // (1.500 €: KV und RV 420,00 € statt 332,03 € Arbeitgeberanteil, dazu 2 % Pauschsteuer).
  let agRv = 0, agKv = 0, agLst = 0, agUml = 0, agUnfall = 0;
  const agKvSatzProzent = art === 'gewerblich' ? getMinijobKvPauschaleProzent(stichtag) : 5;

  if (status === 'minijob' && art === 'gewerblich') {
    agRv = anteilCent(verdienst, 0.15);   // 15 % RV
    agKv = anteilCent(verdienst, agKvSatzProzent / 100);
    agLst = anteilCent(verdienst, 0.02);  // 2 % pauschale Lohnsteuer
    agUml = rund2(anteilCent(verdienst, UMLAGE_U1_2026) + anteilCent(verdienst, UMLAGE_U2_2026) + anteilCent(verdienst, INSOLVENZGELDUMLAGE_2026));
  } else if (status === 'minijob') {
    agRv = anteilCent(verdienst, 0.05);           // 5 % RV
    agKv = anteilCent(verdienst, agKvSatzProzent / 100); // 5 % KV
    agLst = anteilCent(verdienst, 0.02);          // 2 % Pauschsteuer
    agUml = rund2(anteilCent(verdienst, UMLAGE_U1_2026) + anteilCent(verdienst, UMLAGE_U2_2026)); // keine Insolvenzgeldumlage
    agUnfall = anteilCent(verdienst, UNFALLVERSICHERUNG_PRIVATHAUSHALT_2026);
  }

  const agAbgabenGesamt = rund2(agRv + agKv + agLst + agUml + agUnfall);
  const agGesamtkosten = rund2(verdienst + agAbgabenGesamt);
  const agAufschlagProzent = verdienst > 0 ? rund2((agAbgabenGesamt / verdienst) * 100) : 0;

  // === ARBEITNEHMER-ABGABEN ===
  // AN-Eigenanteil zur RV: voller Beitrag (mindestens aus 175 €) minus AG-Pauschale (W167)
  const rvEigenanteil = (status === 'minijob' && rentenversicherungspflicht && verdienst > 0)
    ? Math.max(0, rund2(anteilCent(Math.max(verdienst, RV_MINDESTBEMESSUNG), RV_BEITRAGSSATZ_2026) - agRv))
    : 0;

  const nettoAN = rund2(verdienst - rvEigenanteil);
  const nettoAN_ohneRv = rund2(verdienst);

  // === STUNDENLOHN ===
  let stundenlohn: number | null = null;
  let unterMindestlohn = false;
  if (stundenProWoche && stundenProWoche > 0) {
    stundenlohn = rund2(verdienst / (stundenProWoche * WOCHEN_PRO_MONAT));
    unterMindestlohn = stundenlohn < mindestlohn;
  }
  const maxStundenProWoche = rund2(verdienst / mindestlohn / WOCHEN_PRO_MONAT);

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
    agKvSatzProzent,
    agLohnsteuer: agLst,
    agUmlagen: agUml,
    agUnfallversicherung: agUnfall,
    agAbgabenGesamt,
    agGesamtkosten,
    agAufschlagProzent,
    stundenlohn,
    unterMindestlohn,
    maxStundenProWoche,
    minijobGrenze,
    midijobObergrenze: MIDIJOB_OBERGRENZE,
    mindestlohn,
    rentenpunkteProJahrMitRv,
  };
}
