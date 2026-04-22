import { berechneEStGrund } from './einkommensteuer';
import {
  getAktuelleBafoegParameter,
  getAnrechnungsquote,
  type BafoegParameter,
} from './bafoeg-parameter';

export type AusbildungsArt = 'studium' | 'schule';
export type Wohnsituation = 'eltern' | 'eigene';
export type Familienstand = 'verheiratet' | 'getrennt' | 'geschieden' | 'verwitwet' | 'elternunabhaengig';

/**
 * § 12 BAföG: Zwei Schulform-Gruppen mit jeweils unterschiedlichen Bedarfssätzen.
 * - `berufsfachschuleOhneVorausbildung`: Berufsfachschul-/Fachschulklassen
 *   OHNE vorausgesetzte Berufsausbildung → 276 €/666 €
 * - `fachoberschuleMitVorausbildung`: Abendhauptschulen, Berufsaufbauschulen,
 *   Abendrealschulen, Fachoberschulklassen MIT Berufsausbildung → 498 €/775 €
 */
export type SchulForm = 'berufsfachschuleOhneVorausbildung' | 'fachoberschuleMitVorausbildung';

/**
 * § 11 Abs. 3 BAföG (+ Abs. 2a als fünfter Fall mit gleichem Effekt).
 * Bei einem der Tatbestände bleibt das Elterneinkommen außer Betracht.
 *
 * Hinweis: Für Nr. 3 und Nr. 4 verlangt Satz 2 zusätzlich, dass sich der
 * Auszubildende in den Erwerbsjahren aus dem Ertrag selbst unterhalten
 * konnte. Diese Detail-Prüfung macht der Rechner NICHT — die Auswahl
 * der Tatbestände setzt die Voraussetzung stillschweigend als erfüllt
 * voraus. UI weist darauf hin.
 */
export type ElternunabhaengigTatbestand =
  | 'abendgymnasium_kolleg'                     // Abs. 3 Nr. 1
  | 'ueber_30_bei_beginn'                       // Abs. 3 Nr. 2
  | '5_jahre_erwerbstaetig'                     // Abs. 3 Nr. 3
  | '3_jahre_ausbildung_plus_3_erwerbstaetig'   // Abs. 3 Nr. 4
  | 'eltern_nicht_verfuegbar';                  // Abs. 2a (fünfter Fall)

export interface BafoegEingabe {
  ausbildung: AusbildungsArt;
  /**
   * Nur relevant bei `ausbildung === 'schule'`. Bestimmt den Bedarfssatz
   * nach § 12 BAföG. Default `'berufsfachschuleOhneVorausbildung'` für
   * Rückwärts-Kompatibilität und als häufigster Fall.
   */
  schulform?: SchulForm;
  wohnsituation: Wohnsituation;
  eigenesEinkommen: number;
  eigenesVermoegen: number;
  familienstand: Familienstand;
  einkommenEltern1: number; // brutto/Jahr
  einkommenEltern2: number; // brutto/Jahr (nur bei verheiratet)
  /**
   * Anzahl weiterer Geschwister/Unterhaltsberechtigter der Eltern in
   * BAföG-fähiger Ausbildung OHNE eigenen BAföG-Bezug (z. B. Azubi mit
   * Ausbildungsvergütung). Der Antragsteller zählt hier NICHT mit
   * (§ 25 Abs. 3/6 BAföG). Wirkt in zwei Dimensionen: + `proGeschwister`
   * Freibetrag absolut und −5 %-Punkte Anrechnungsquote relativ.
   *
   * Geschwister MIT eigenem BAföG-/BAB-Bezug gehören NICHT hier rein —
   * dafür existiert das separate Feld `gefoerdeteGeschwisterAnzahl` für
   * § 11 Abs. 4 BAföG (Aufteilung des Anrechnungsbetrags).
   */
  geschwisterInAusbildung: number;
  /**
   * § 11 Abs. 4 BAföG: Anzahl Geschwister MIT eigenem BAföG- oder BAB-Bezug
   * (§ 56 SGB III). Der auf die Eltern entfallende Anrechnungsbetrag nach
   * § 25 wird zu gleichen Teilen auf Antragsteller + diese Geschwister
   * aufgeteilt. Aufteilungs-Divisor = 1 + gefoerdeteGeschwisterAnzahl.
   * Default 0 (keine Aufteilung).
   */
  gefoerdeteGeschwisterAnzahl?: number;
  /**
   * § 11 Abs. 3 BAföG (+ Abs. 2a): elternunabhängige Förderung. Wenn ein
   * Tatbestand ausgewählt ist, bleibt das Elterneinkommen vollständig
   * außer Betracht (unabhängig vom `familienstand`-Feld). Default `null`
   * = regulärer elternabhängiger Pfad.
   */
  elternunabhaengig?: { tatbestand: ElternunabhaengigTatbestand } | null;
  selbstVersichert: boolean;
  hatKinder: boolean;
  anzahlKinder: number;
}

export interface BafoegErgebnis {
  bafoegMonat: number;
  hatAnspruch: boolean;
  ablehnungsGrund: string | null;

  // Bedarfsberechnung
  grundbedarf: number;
  wohnpauschale: number;
  kvZuschlag: number;
  pvZuschlag: number;
  kinderZuschlag: number;
  gesamtBedarf: number;

  // Anrechnungen
  anrechnungEinkommen: number;
  anrechnungVermoegen: number;
  anrechnungEltern: number;
  gesamtAnrechnung: number;

  /** Angewendete Elternanrechnungsquote (§ 25 Abs. 6 BAföG) — 0,50 bei 0 Geschwistern, je −0,05 pro Geschwister. */
  anrechnungsquoteEltern: number;

  /**
   * § 11 Abs. 4 BAföG: Aufteilungs-Divisor = 1 + `gefoerdeteGeschwisterAnzahl`.
   * Der Anrechnungsbetrag nach § 25 wird durch diesen Wert geteilt. 1 = keine
   * Aufteilung (Default), 2 = 1 gefördertes Geschwister, usw.
   */
  aufteilungDivisor: number;
  /** Anrechnungsbetrag vor der § 11 Abs. 4-Aufteilung (zur UI-Anzeige). */
  anrechnungElternVorAufteilung: number;

  // Rückzahlung (nur Studium)
  istStudium: boolean;
  zuschussAnteil: number;
  darlehensAnteil: number;
  maxRueckzahlung: number;

  // Hilfswerte
  nettoEltern: number;
  freibetragEltern: number;
  elternunabhaengig: boolean;
  /**
   * Grund der Elternunabhängigkeit, falls zutreffend:
   * - `'familienstand'` (Legacy: familienstand === 'elternunabhaengig')
   * - `'tatbestand:<name>'` für § 11 Abs. 3 Tatbestände
   * - `null` wenn Elterneinkommen regulär angerechnet wird
   */
  elternunabhaengigGrund: string | null;
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Einkommensteuer-Schätzung nach § 32a EStG 2026 — zentrale SSOT.
 */
const schaetzeEinkommensteuer = (zvE: number) => berechneEStGrund(zvE, 2026);

/**
 * Berechnet das anrechenbare Netto-Einkommen eines Elternteils.
 */
function berechneElternNetto(bruttoJahr: number, params: BafoegParameter): number {
  if (bruttoJahr <= 0) return 0;
  const svAbzug = bruttoJahr * params.svPauschalen.eltern;
  const zvE = bruttoJahr - svAbzug;
  const est = schaetzeEinkommensteuer(Math.max(0, zvE));
  const netto = bruttoJahr - svAbzug - est;
  return Math.max(0, rund2(netto / 12)); // monatlich
}

/**
 * § 11 Abs. 4 BAföG: Aufteilung des Anrechnungsbetrags auf Antragsteller
 * + geförderte Geschwister. Divisor = 1 + gefoerdeteGeschwisterAnzahl.
 *
 * @param anrechnung Elternanrechnung nach § 25 (vor Aufteilung)
 * @param gefoerdeteGeschwisterAnzahl Geschwister mit eigenem BAföG/BAB (§ 56 SGB III)
 */
export function aufteilungNachAbs4(
  anrechnung: number,
  gefoerdeteGeschwisterAnzahl: number,
): number {
  const g = Math.max(0, Math.floor(gefoerdeteGeschwisterAnzahl));
  const divisor = 1 + g;
  return rund2(anrechnung / divisor);
}

/**
 * Ermittelt den Grundbedarf nach § 13 (Studium) bzw. § 12 (Schule) BAföG.
 * Für Schule entscheidet die `schulform`; Default ist `berufsfachschuleOhneVorausbildung`.
 */
function ermittleGrundbedarf(
  ausbildung: AusbildungsArt,
  wohnsituation: Wohnsituation,
  schulform: SchulForm,
  params: BafoegParameter,
): number {
  if (ausbildung === 'studium') {
    return wohnsituation === 'eltern'
      ? params.bedarf.studium.eltern
      : params.bedarf.studium.eigene;
  }
  // Schule: § 12 BAföG, Wert je nach Schulform-Gruppe
  const schulBedarfe = params.bedarf.schule[schulform];
  return wohnsituation === 'eltern'
    ? schulBedarfe.eltern
    : schulBedarfe.auswaerts;
}

export function berechneBafoeg(eingabe: BafoegEingabe): BafoegErgebnis | null {
  const {
    ausbildung, wohnsituation, eigenesEinkommen, eigenesVermoegen,
    familienstand, einkommenEltern1, einkommenEltern2,
    geschwisterInAusbildung, selbstVersichert, hatKinder, anzahlKinder,
  } = eingabe;

  const schulform: SchulForm = eingabe.schulform ?? 'berufsfachschuleOhneVorausbildung';
  const gefoerdeteGeschwisterAnzahl = Math.max(0, Math.floor(eingabe.gefoerdeteGeschwisterAnzahl ?? 0));
  const elternunabhaengigInput = eingabe.elternunabhaengig ?? null;

  const params = getAktuelleBafoegParameter();

  // Elternunabhängig: entweder alter Familienstand-Wert ODER neuer Tatbestand-Wert.
  const familienstandElternunabhaengig = familienstand === 'elternunabhaengig';
  const elternunabhaengig = familienstandElternunabhaengig || elternunabhaengigInput !== null;
  const elternunabhaengigGrund: string | null = elternunabhaengigInput !== null
    ? `tatbestand:${elternunabhaengigInput.tatbestand}`
    : familienstandElternunabhaengig
      ? 'familienstand'
      : null;

  // === BEDARF ===
  const grundbedarf = ermittleGrundbedarf(ausbildung, wohnsituation, schulform, params);
  // Wohnpauschale zur UI-Anzeige: für Schule ist sie bereits in den auswärts-Werten nach § 12 eingepreist;
  // wir berechnen die Differenz auswärts − eltern je Schulform als Display-Wert.
  let wohnpauschale = 0;
  if (wohnsituation === 'eigene') {
    if (ausbildung === 'studium') {
      wohnpauschale = params.wohnpauschale.studium;
    } else {
      const sf = params.bedarf.schule[schulform];
      wohnpauschale = sf.auswaerts - sf.eltern;
    }
  }

  const kvZuschlag = selbstVersichert ? params.zuschlaege.kv : 0;
  const pvZuschlag = selbstVersichert ? params.zuschlaege.pv : 0;
  const kinderZuschlag = hatKinder ? anzahlKinder * params.zuschlaege.kindProKind : 0;

  const gesamtBedarf = grundbedarf + kvZuschlag + pvZuschlag + kinderZuschlag;

  // === ANRECHNUNG EIGENES EINKOMMEN ===
  const ueberFreibetrag = Math.max(0, eigenesEinkommen - params.freibetraege.eigenesEinkommen);
  const anrechnungEinkommen = rund2(ueberFreibetrag * (1 - params.svPauschalen.eigen));

  // === ANRECHNUNG VERMÖGEN ===
  const vermoegenFreibetrag = params.vermoegen.unterDreissig;
  const anrechbaresVermoegen = Math.max(0, eigenesVermoegen - vermoegenFreibetrag);
  const anrechnungVermoegen = rund2(anrechbaresVermoegen / 12);

  // === ANRECHNUNG ELTERNEINKOMMEN ===
  let anrechnungEltern = 0;
  let anrechnungElternVorAufteilung = 0;
  let nettoEltern = 0;
  let freibetragEltern = 0;
  // Anrechnungsquote als Funktion der Geschwister — § 25 Abs. 6 BAföG.
  // Antragsteller zählt NICHT mit (siehe bafoeg-parameter.ts-Doc).
  const anrechnungsquoteEltern = getAnrechnungsquote(geschwisterInAusbildung, params);
  const aufteilungDivisor = elternunabhaengig ? 1 : (1 + gefoerdeteGeschwisterAnzahl);

  if (!elternunabhaengig) {
    if (familienstand === 'verheiratet') {
      // Beide Einkommen zusammen
      const netto1 = berechneElternNetto(einkommenEltern1, params);
      const netto2 = berechneElternNetto(einkommenEltern2, params);
      nettoEltern = rund2(netto1 + netto2);
      freibetragEltern = params.freibetraege.elternVerheiratet + geschwisterInAusbildung * params.freibetraege.proGeschwister;
    } else {
      // Getrennt/Geschieden/Verwitwet: nur Elternteil 1
      nettoEltern = berechneElternNetto(einkommenEltern1, params);
      freibetragEltern = params.freibetraege.elternAlleinstehend + geschwisterInAusbildung * params.freibetraege.proGeschwister;
    }

    const ueberFreibetragEltern = Math.max(0, nettoEltern - freibetragEltern);
    anrechnungElternVorAufteilung = rund2(ueberFreibetragEltern * anrechnungsquoteEltern);

    // § 11 Abs. 4 BAföG: Aufteilung auf Antragsteller + geförderte Geschwister.
    anrechnungEltern = aufteilungNachAbs4(anrechnungElternVorAufteilung, gefoerdeteGeschwisterAnzahl);
  }

  // === GESAMTANRECHNUNG ===
  const gesamtAnrechnung = rund2(anrechnungEinkommen + anrechnungVermoegen + anrechnungEltern);

  // === BAföG ===
  let bafoegMonat = rund2(gesamtBedarf - gesamtAnrechnung);
  let ablehnungsGrund: string | null = null;

  if (bafoegMonat < params.bagatellgrenze && bafoegMonat > 0) {
    ablehnungsGrund = `Der berechnete Betrag (${Math.round(bafoegMonat)} €) liegt unter der Bagatellgrenze von ${params.bagatellgrenze} €.`;
    bafoegMonat = 0;
  }

  if (bafoegMonat <= 0) {
    ablehnungsGrund = ablehnungsGrund || 'Die Anrechnungsbeträge übersteigen den Bedarf. Stellen Sie dennoch einen Antrag — das BAföG-Amt berücksichtigt weitere Faktoren.';
    bafoegMonat = 0;
  }

  const hatAnspruch = bafoegMonat >= params.bagatellgrenze;

  // === RÜCKZAHLUNG (nur Studium) ===
  const istStudium = ausbildung === 'studium';
  const zuschussAnteil = istStudium ? rund2(bafoegMonat * 0.5) : bafoegMonat;
  const darlehensAnteil = istStudium ? rund2(bafoegMonat * 0.5) : 0;

  return {
    bafoegMonat,
    hatAnspruch,
    ablehnungsGrund,
    grundbedarf,
    wohnpauschale,
    kvZuschlag,
    pvZuschlag,
    kinderZuschlag,
    gesamtBedarf,
    anrechnungEinkommen,
    anrechnungVermoegen,
    anrechnungEltern,
    gesamtAnrechnung,
    anrechnungsquoteEltern,
    aufteilungDivisor,
    anrechnungElternVorAufteilung,
    istStudium,
    zuschussAnteil,
    darlehensAnteil,
    maxRueckzahlung: params.maxRueckzahlung,
    nettoEltern,
    freibetragEltern,
    elternunabhaengig,
    elternunabhaengigGrund,
  };
}
