/**
 * BEG-Förderung Heizungstausch (KfW 458) — zentrale SSOT.
 *
 * Rechtsgrundlage: BEG EM Richtlinie vom 29.12.2023.
 * Quelle: KfW-Merkblatt 458, Stand 04/2026.
 * Stand: 04/2026 — Update bei BEG-Richtlinien-Anpassung.
 *
 * Die BEG-Förderung für den Heizungstausch besteht aus einer Grundförderung
 * (alle Antragsteller) und kombinierbaren Boni. Die Maximal-Förderquote ist
 * auf 70 % der förderfähigen Kosten gedeckelt — ohne diesen Cap würde die
 * Summe aller Boni rechnerisch 85 % erreichen.
 */

export const BEG_FOERDERUNG_2026 = {
  /** Maximal förderfähige Investitionskosten je 1. Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit1: 30_000,
  /** Maximal förderfähige Investitionskosten je 2.–6. Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit2bis6: 15_000,
  /** Maximal förderfähige Investitionskosten je 7.+ Wohneinheit (€) */
  maxFoerderfaehigeKosten_einheit7plus: 8_000,

  /** Grundförderung (alle Antragsteller) */
  grundfoerderung: 30,
  /**
   * Klimageschwindigkeitsbonus: Tausch alte fossile Heizung,
   * Absenkung ab 2029 vorgesehen. Voraussetzung u. a.: Heizung ≥ 20 Jahre alt
   * oder funktionsuntüchtig (vorzeitiger Austausch nur eingeschränkt).
   */
  klimageschwindigkeitsbonus: 20,
  /** Einkommensbonus: Brutto-Haushaltseinkommen unter Schwelle */
  einkommensbonus: 30,
  /**
   * Effizienzbonus: natürliche Kältemittel (z. B. Propan R290) bei
   * Luft-Wasser-WP, oder Wasser/Erdreich/Abwasser als Wärmequelle.
   */
  effizienzbonus: 5,

  /** Maximale Gesamtförderung (Cap nach Richtlinie) */
  maxGesamtfoerderung: 70,
  /** Einkommensgrenze für Einkommensbonus (€/Jahr Brutto Haushalt) */
  einkommensgrenze: 40_000,
} as const;

export interface BegBoni {
  klimageschwindigkeit: boolean;
  einkommen: boolean;
  effizienz: boolean;
}

/** Gesamt-Förderquote in Prozent (gedeckelt bei 70 %). */
export function berechneBegFoerderquote(boni: BegBoni): number {
  const f = BEG_FOERDERUNG_2026;
  let quote = f.grundfoerderung;
  if (boni.klimageschwindigkeit) quote += f.klimageschwindigkeitsbonus;
  if (boni.einkommen) quote += f.einkommensbonus;
  if (boni.effizienz) quote += f.effizienzbonus;
  return Math.min(quote, f.maxGesamtfoerderung);
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
  const f = BEG_FOERDERUNG_2026;

  // Förderfähige Kosten = gestaffelter Cap je Wohneinheit, nach oben begrenzt
  // durch tatsächliche Investition.
  let maxFoerderfaehig = f.maxFoerderfaehigeKosten_einheit1;
  if (wohneinheiten > 1) {
    maxFoerderfaehig +=
      Math.min(wohneinheiten - 1, 5) * f.maxFoerderfaehigeKosten_einheit2bis6;
  }
  if (wohneinheiten > 6) {
    maxFoerderfaehig += (wohneinheiten - 6) * f.maxFoerderfaehigeKosten_einheit7plus;
  }
  const foerderfaehig = Math.min(investitionEUR, maxFoerderfaehig);
  return Math.round(foerderfaehig * (berechneBegFoerderquote(boni) / 100));
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
