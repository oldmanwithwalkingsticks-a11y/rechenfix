/**
 * Aufstiegs-BAföG-Berechnung (AFBG, „Meister-BAföG").
 *
 * Zwei Förderkomponenten:
 *  - Maßnahmebeitrag (§ 12 AFBG): Lehrgangs-/Prüfungsgebühren + optional
 *    Meisterstück-Materialkosten. Je 50 % Zuschuss + 50 % KfW-Darlehen.
 *  - Unterhaltsbeitrag (§ 10 AFBG): nur Vollzeit, 100 % Vollzuschuss
 *    seit 29. BAföG-ÄndG (23.07.2024).
 *
 * Rückzahlungs-Szenarien:
 *  - ohne Erlass: volles Lehrgangsdarlehen
 *  - Bestehens-Erlass (§ 13b Abs. 1): − 50 %
 *  - Gründer-Erlass (§ 13b Abs. 2): Rest nach Bestehens-Erlass komplett
 *
 * Einkommensanrechnung analog § 23/§ 25 BAföG (§ 17b AFBG verweist),
 * elternunabhängig.
 */

import {
  getAktuelleAfbgParameter,
  getAfbgAnrechnungsquote,
  type AfbgParameter,
} from './afbg-parameter';

export type FortbildungsArt = 'vollzeit' | 'teilzeit';

export interface AfbgKind {
  /** Alter des Kindes (entscheidet über Kinderbetreuungszuschlag < 14 J.). */
  alter: number;
  /** Kindergeldanspruch → entscheidet über Kinder-Freibetrag + Kinder-Zuschlag. */
  anspruchAufKindergeld: boolean;
}

export interface AfbgEhegatte {
  vorhanden: boolean;
  /** Bruttoeinkommen Ehegatte/Lebenspartner pro Monat (nur bei `vorhanden`). */
  bruttoMonat?: number;
}

export interface AfbgEingabe {
  fortbildungsart: FortbildungsArt;

  // Maßnahmebeitrag
  /** Tatsächliche Lehrgangs-/Prüfungsgebühren pro Maßnahme. */
  lehrgangskosten: number;
  /** Materialkosten für Meisterstück/Prüfungsstück (optional, 0 = keins). */
  meisterstueckKosten?: number;

  // Unterhaltsbeitrag (nur bei Vollzeit berechnet)
  /** Eigenes Bruttoeinkommen pro Monat. */
  antragstellerBruttoMonat?: number;
  /** Eigenes Vermögen gesamt. */
  vermoegen?: number;
  ehegatte?: AfbgEhegatte;
  kinder?: AfbgKind[];

  // Rückzahlungs-Szenarien
  /** § 13b Abs. 1: Default true (Regelfall: bestandene Prüfung). */
  bestehensErlassAngenommen?: boolean;
  /** § 13b Abs. 2: Default false (seltener Gründungsfall). */
  gruenderErlassAngenommen?: boolean;
}

export interface AfbgUnterhaltAufschluesselung {
  grundbedarf: number;
  ehegattenZuschlag: number;
  kinderZuschlag: number;
  kinderbetreuungZuschlag: number;
}

export interface AfbgAnrechnungAufschluesselung {
  eigenBrutto: number;
  ehegattenBrutto: number;
  gesamtBrutto: number;
  eigenFreibetrag: number;
  ehegattenFreibetrag: number;
  kinderFreibetrag: number;
  gesamtFreibetrag: number;
  ueberschreitend: number;
  quote: number;
  einkommensAnrechnung: number;
  vermoegen: number;
  vermoegenFreibetrag: number;
  vermoegenUeberschreitend: number;
  vermoegenMonat: number;
  gesamtAnrechnung: number;
}

export interface AfbgErgebnis {
  massnahme: {
    lehrgangskostenAnsatz: number;       // min(lehrgangskosten, max)
    meisterstueckAnsatz: number;         // min(meisterstueckKosten, max)
    gesamtFoerderung: number;            // lehrgangskostenAnsatz + meisterstueckAnsatz
    zuschussLehrgang: number;
    darlehenLehrgang: number;
    zuschussMeisterstueck: number;
    darlehenMeisterstueck: number;
    zuschussGesamt: number;
    darlehenGesamt: number;
  };

  unterhalt: {
    anwendbar: boolean;
    bedarf: number;
    bedarfAufschluesselung: AfbgUnterhaltAufschluesselung;
    anrechnung: number;
    anrechnungAufschluesselung: AfbgAnrechnungAufschluesselung;
    auszahlung: number;                  // 100 % Vollzuschuss
  };

  rueckzahlung: {
    darlehenOhneErlass: number;
    bestehensErlass: number;
    nachBestehensErlass: number;
    gruenderErlass: number;
    nachGruenderErlass: number;
    mindestrateMonat: number;
    karenzzeitMonate: number;
  };

  quelle: string;
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * § 17b AFBG i.V.m. §§ 23, 25, 29 BAföG: Einkommens- und Vermögensanrechnung
 * auf den Unterhaltsbeitrag.
 *
 * - Eigenes Brutto + Ehegatten-Brutto summiert
 * - Freibeträge: Antragsteller 603 € + Ehegatte 850 € + 770 € je Kind
 *   (Minijob-Grenze-analog für eigenen Anteil; aufgestockt für Angehörige
 *   nach § 25 BAföG)
 * - Relative Anrechnung: 50 % − 5 % je kindergeldberechtigtem Kind
 *   (min 0 %, max 50 %)
 * - Vermögen: Freibetrag 45.000 € + 2.300 € je Ehegatte/Kind, Überschuss
 *   vereinfacht durch 24 Monate Maßnahmedauer geteilt
 */
function berechneAnrechnung(
  eingabe: AfbgEingabe,
  params: AfbgParameter,
): AfbgAnrechnungAufschluesselung {
  const eigenBrutto = Math.max(0, eingabe.antragstellerBruttoMonat ?? 0);
  const ehegattenBrutto = Math.max(0, eingabe.ehegatte?.vorhanden ? (eingabe.ehegatte.bruttoMonat ?? 0) : 0);
  const gesamtBrutto = rund2(eigenBrutto + ehegattenBrutto);

  const kinderKg = (eingabe.kinder ?? []).filter(k => k.anspruchAufKindergeld);
  const kinderKgAnzahl = kinderKg.length;

  const eigenFreibetrag = params.freibetraege.antragstellerBrutto;
  const ehegattenFreibetrag = eingabe.ehegatte?.vorhanden ? params.freibetraege.ehegatte : 0;
  const kinderFreibetrag = kinderKgAnzahl * params.freibetraege.proKind;
  const gesamtFreibetrag = rund2(eigenFreibetrag + ehegattenFreibetrag + kinderFreibetrag);

  const ueberschreitend = Math.max(0, rund2(gesamtBrutto - gesamtFreibetrag));
  const quote = getAfbgAnrechnungsquote(kinderKgAnzahl, params);
  const einkommensAnrechnung = rund2(ueberschreitend * quote);

  // Vermögen: Freibetrag + Ehegatte-/Kind-Zuschläge; Überschuss /verteilungsMonate
  const vermoegen = Math.max(0, eingabe.vermoegen ?? 0);
  const vermoegenEhegatteZuschlag = eingabe.ehegatte?.vorhanden ? params.vermoegen.ehegattenZuschlag : 0;
  const vermoegenFreibetrag = rund2(
    params.vermoegen.grundfreibetrag +
    vermoegenEhegatteZuschlag +
    kinderKgAnzahl * params.vermoegen.proKindZuschlag,
  );
  const vermoegenUeberschreitend = Math.max(0, rund2(vermoegen - vermoegenFreibetrag));
  const vermoegenMonat = rund2(vermoegenUeberschreitend / params.vermoegen.verteilungsMonate);

  const gesamtAnrechnung = rund2(einkommensAnrechnung + vermoegenMonat);

  return {
    eigenBrutto,
    ehegattenBrutto,
    gesamtBrutto,
    eigenFreibetrag,
    ehegattenFreibetrag,
    kinderFreibetrag,
    gesamtFreibetrag,
    ueberschreitend,
    quote,
    einkommensAnrechnung,
    vermoegen,
    vermoegenFreibetrag,
    vermoegenUeberschreitend,
    vermoegenMonat,
    gesamtAnrechnung,
  };
}

export function berechneAfbg(
  eingabe: AfbgEingabe,
  stichtag: Date = new Date(),
): AfbgErgebnis {
  const params = getAktuelleAfbgParameter(stichtag);

  // === 1. Maßnahmebeitrag (§ 12 AFBG) ===
  const lehrgang = Math.max(0, eingabe.lehrgangskosten);
  const lehrgangskostenAnsatz = Math.min(lehrgang, params.massnahme.lehrgangskostenMax);
  const zuschussLehrgang = rund2(lehrgangskostenAnsatz * params.massnahme.zuschussAnteil);
  const darlehenLehrgang = rund2(lehrgangskostenAnsatz - zuschussLehrgang);

  const meisterstueck = Math.max(0, eingabe.meisterstueckKosten ?? 0);
  const meisterstueckAnsatz = Math.min(meisterstueck, params.massnahme.meisterstueckMax);
  const zuschussMeisterstueck = rund2(meisterstueckAnsatz * params.massnahme.meisterstueckZuschussAnteil);
  const darlehenMeisterstueck = rund2(meisterstueckAnsatz - zuschussMeisterstueck);

  const zuschussGesamt = rund2(zuschussLehrgang + zuschussMeisterstueck);
  const darlehenGesamt = rund2(darlehenLehrgang + darlehenMeisterstueck);
  const gesamtFoerderung = rund2(lehrgangskostenAnsatz + meisterstueckAnsatz);

  // === 2. Unterhaltsbeitrag (§ 10 AFBG — nur Vollzeit) ===
  const anwendbar = eingabe.fortbildungsart === 'vollzeit';

  const kinder = eingabe.kinder ?? [];
  const kinderKg = kinder.filter(k => k.anspruchAufKindergeld);
  const kinderUnter14 = kinder.filter(k => k.alter < params.unterhalt.kinderbetreuungAltersgrenze);

  const bedarfAufschluesselung: AfbgUnterhaltAufschluesselung = {
    grundbedarf: anwendbar ? params.unterhalt.alleinstehendVZ : 0,
    ehegattenZuschlag: anwendbar && eingabe.ehegatte?.vorhanden ? params.unterhalt.ehegattenZuschlag : 0,
    kinderZuschlag: anwendbar ? kinderKg.length * params.unterhalt.kinderZuschlag : 0,
    kinderbetreuungZuschlag: anwendbar ? kinderUnter14.length * params.unterhalt.kinderbetreuungZuschlag : 0,
  };

  const bedarf = rund2(
    bedarfAufschluesselung.grundbedarf +
    bedarfAufschluesselung.ehegattenZuschlag +
    bedarfAufschluesselung.kinderZuschlag +
    bedarfAufschluesselung.kinderbetreuungZuschlag,
  );

  const leereAnrechnung: AfbgAnrechnungAufschluesselung = {
    eigenBrutto: 0, ehegattenBrutto: 0, gesamtBrutto: 0,
    eigenFreibetrag: 0, ehegattenFreibetrag: 0, kinderFreibetrag: 0,
    gesamtFreibetrag: 0, ueberschreitend: 0, quote: 0,
    einkommensAnrechnung: 0, vermoegen: 0, vermoegenFreibetrag: 0,
    vermoegenUeberschreitend: 0, vermoegenMonat: 0, gesamtAnrechnung: 0,
  };

  const anrechnungAufschluesselung = anwendbar
    ? berechneAnrechnung(eingabe, params)
    : leereAnrechnung;
  const anrechnung = anrechnungAufschluesselung.gesamtAnrechnung;
  const auszahlung = anwendbar ? Math.max(0, rund2(bedarf - anrechnung)) : 0;

  // === 3. Rückzahlungs-Szenarien (§ 13b AFBG, nur Lehrgangsdarlehen) ===
  const bestehensErlassQuote = eingabe.bestehensErlassAngenommen !== false
    ? params.erlass.bestehensErlassQuote
    : 0;
  const gruenderErlassQuote = eingabe.gruenderErlassAngenommen === true
    ? params.erlass.gruenderErlassQuote
    : 0;

  const bestehensErlass = rund2(darlehenLehrgang * bestehensErlassQuote);
  const nachBestehensErlass = rund2(darlehenLehrgang - bestehensErlass);
  const gruenderErlass = rund2(nachBestehensErlass * gruenderErlassQuote);
  const nachGruenderErlass = rund2(nachBestehensErlass - gruenderErlass);

  return {
    massnahme: {
      lehrgangskostenAnsatz,
      meisterstueckAnsatz,
      gesamtFoerderung,
      zuschussLehrgang,
      darlehenLehrgang,
      zuschussMeisterstueck,
      darlehenMeisterstueck,
      zuschussGesamt,
      darlehenGesamt,
    },
    unterhalt: {
      anwendbar,
      bedarf,
      bedarfAufschluesselung,
      anrechnung,
      anrechnungAufschluesselung,
      auszahlung,
    },
    rueckzahlung: {
      darlehenOhneErlass: darlehenLehrgang,
      bestehensErlass,
      nachBestehensErlass,
      gruenderErlass,
      nachGruenderErlass,
      mindestrateMonat: params.darlehen.mindestrateMonat,
      karenzzeitMonate: params.darlehen.karenzzeitMonate,
    },
    quelle: params.quelle,
  };
}
