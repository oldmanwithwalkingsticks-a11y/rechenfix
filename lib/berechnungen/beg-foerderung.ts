/**
 * BEG-Förderung Heizungstausch (KfW 458) — zentrale SSOT.
 *
 * Rechtsgrundlage: Richtlinie BEG EM, Konditionen ab 21.07.2026 (KfW-Pressemitteilung Juli 2026,
 * Verbraucherzentrale NRW Stand 14.08.2026, co2online 09.07.2026; für Anträge ab 21.07.2026, Vertrauens-
 * schutz für vorher erstellte Bestätigungen). Stand: 20.10.2026 — Update bei jeder Richtlinien-Anpassung;
 * ab 01.02.2027 ist eine halbjährliche Degression angekündigt (Kostenobergrenze −750 €, Klimabonus −4 Punkte).
 *
 * W182: vorher Konditionen bis 20.07.2026 — förderfähig 30.000 €, Klimageschwindigkeitsbonus 20 %,
 * Effizienzbonus 5 %, Einkommensbonus einheitlich 30 % (zvE ≤ 40.000 €), Deckel 70 %.
 * Jetzt: förderfähig 28.000 € (1. WE), Klimageschwindigkeitsbonus 16 %, kein Effizienzbonus mehr,
 * Einkommensbonus gestaffelt 40/30/10 % (zvE ≤ 30.000/40.000/50.000 €; mit mindestens einem
 * minderjährigen Kind wird das zvE einmalig um 10.000 € gemindert), Deckel 80 % in der 40-%-Stufe,
 * sonst 70 %. Klima- und Einkommensbonus nur für selbstnutzende Eigentümer.
 */

export const BEG_FOERDERUNG_2026 = {
  /** Konditionen gültig für Anträge ab */
  stand: '2026-07-21',
  /** Maximal förderfähige Investitionskosten je 1. Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit1: 28_000,
  /** Maximal förderfähige Investitionskosten je 2.–6. Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit2bis6: 15_000,
  /** Maximal förderfähige Investitionskosten je 7.+ Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit7plus: 8_000,

  /** Grundförderung (alle Antragsteller) */
  grundfoerderung: 30,
  /**
   * Klimageschwindigkeitsbonus (nur Selbstnutzer): Ersatz einer funktionsfähigen Öl-, Kohle-, Gasetagen-
   * oder Nachtspeicherheizung bzw. einer mindestens 20 Jahre alten Gas- oder Biomasseheizung.
   */
  klimageschwindigkeitsbonus: 16,
  /** Einkommensbonus (nur Selbstnutzer) nach zu versteuerndem Haushaltseinkommen, gestaffelt */
  einkommensbonusStufen: [
    { bisZvE: 30_000, prozent: 40 },
    { bisZvE: 40_000, prozent: 30 },
    { bisZvE: 50_000, prozent: 10 },
  ],
  /** Minderung des zvE bei mindestens einem minderjährigen Kind im Haushalt (einmalig, nicht je Kind) */
  kinderMinderungZvE: 10_000,

  /** Höchstfördersatz allgemein */
  maxGesamtfoerderung: 70,
  /** Höchstfördersatz in der 40-%-Einkommensstufe (zvE ≤ 30.000 €, mit Kind ≤ 40.000 €) */
  maxGesamtfoerderungNiedrigesEinkommen: 80,
} as const;

export type EinkommensbonusProzent = 0 | 10 | 30 | 40;

export interface BegBoni {
  klimageschwindigkeit: boolean;
  /** Einkommensbonus der Stufe, 0 = keiner */
  einkommensbonus: EinkommensbonusProzent;
}

/** Einkommensbonus-Stufe aus zvE des Haushalts (nach Kinder-Minderung). */
export function einkommensbonusFuerZvE(zvE: number, mitMinderjaehrigemKind: boolean): EinkommensbonusProzent {
  const f = BEG_FOERDERUNG_2026;
  const massgeblich = zvE - (mitMinderjaehrigemKind ? f.kinderMinderungZvE : 0);
  for (const s of f.einkommensbonusStufen) if (massgeblich <= s.bisZvE) return s.prozent as EinkommensbonusProzent;
  return 0;
}

/** Höchstfördersatz für die gewählte Einkommensstufe. */
export function begHoechstsatz(einkommensbonus: EinkommensbonusProzent): number {
  const f = BEG_FOERDERUNG_2026;
  return einkommensbonus === 40 ? f.maxGesamtfoerderungNiedrigesEinkommen : f.maxGesamtfoerderung;
}

/** Gesamt-Förderquote in Prozent (gedeckelt bei 70 % bzw. 80 %). */
export function berechneBegFoerderquote(boni: BegBoni): number {
  const f = BEG_FOERDERUNG_2026;
  let quote = f.grundfoerderung;
  if (boni.klimageschwindigkeit) quote += f.klimageschwindigkeitsbonus;
  quote += boni.einkommensbonus;
  return Math.min(quote, begHoechstsatz(boni.einkommensbonus));
}

/** Förderfähige Kosten: gestaffelte Obergrenze je Wohneinheit, höchstens die tatsächliche Investition. */
export function begFoerderfaehigeKosten(investitionEUR: number, wohneinheiten = 1): number {
  const f = BEG_FOERDERUNG_2026;
  let maxFoerderfaehig = f.maxFoerderfaehigeKosten_einheit1;
  if (wohneinheiten > 1) {
    maxFoerderfaehig +=
      Math.min(wohneinheiten - 1, 5) * f.maxFoerderfaehigeKosten_einheit2bis6;
  }
  if (wohneinheiten > 6) {
    maxFoerderfaehig += (wohneinheiten - 6) * f.maxFoerderfaehigeKosten_einheit7plus;
  }
  return Math.min(investitionEUR, maxFoerderfaehig);
}

/**
 * Zuschuss-€ für eine konkrete Investition unter Berücksichtigung
 * der Förder-Obergrenzen pro Wohneinheit.
 */
export function berechneBegZuschuss(
  investitionEUR: number,
  boni: BegBoni,
  wohneinheiten = 1,
): number {
  return Math.round(begFoerderfaehigeKosten(investitionEUR, wohneinheiten) * (berechneBegFoerderquote(boni) / 100));
}

/**
 * Hinweis-Text für UI: Geräuschemissions-Anforderung an Luft-Wasser-WP.
 * Seit 01.01.2026 verschärft (vorher 5 dB unter Grenzwerten).
 */
export const BEG_LAUTSTAERKE_HINWEIS_2026 =
  'Seit 01.01.2026 werden Luft-Wasser-Wärmepumpen nur noch gefördert, wenn die ' +
  'Geräuschemissionen des Außengeräts mindestens 10 dB unter den gesetzlichen ' +
  'Grenzwerten liegen (vorher 5 dB). Die Anforderung gilt nur für Bestandsgebäude, ' +
  'nicht für Neubauten.';
