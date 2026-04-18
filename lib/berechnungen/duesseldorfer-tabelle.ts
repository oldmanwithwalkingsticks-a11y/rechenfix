/**
 * Düsseldorfer Tabelle 2026 — zentrale Parameter und Berechnungsfunktionen.
 *
 * Gültig ab 01.01.2026. Nächste OLG-Anpassung voraussichtlich 01.01.2027.
 * Bei Jahreswechsel MINDESTBEDARF_*, KINDERGELD_*, EINKOMMENSGRUPPEN_* und
 * SELBSTBEHALT_* prüfen und ggf. anpassen.
 *
 * Rechtsquellen:
 * - DT 2026: OLG Düsseldorf, gültig ab 01.01.2026
 * - Kindergeld: § 66 EStG
 * - Mindestunterhalt: § 1612a BGB + Mindestunterhaltsverordnung
 * - Elternunterhalt-Selbstbehalt: BGH XII ZB 6/24 v. 23.10.2024
 */

/** Mindestbedarfssätze 2026 (Gruppe 1 = 100 %). */
export const MINDESTBEDARF_2026 = {
  '0-5': 486,
  '6-11': 558,
  '12-17': 653,
  // Einheitlich für alle Volljährigen — der Erstausbildungs-Status
  // ändert NUR die Kindergeld-Berechtigung, NICHT den Tabellenwert.
  '18+': 698,
} as const;

export type Altersstufe = keyof typeof MINDESTBEDARF_2026;

/** Kindergeld 2026 (ab 01.01.2026, vorher 255 €). */
export const KINDERGELD_2026 = 259;
/** Hälftige Anrechnung bei minderjährigen Kindern — exakt, nicht runden! */
export const KINDERGELD_HAELFTIG_2026 = 129.5;

/** Einkommensgruppen der DT 2026 (unverändert in Struktur gegenüber 2025). */
export const EINKOMMENSGRUPPEN_2026 = [
  { gruppe: 1, bis: 2100, prozent: 1.0 },
  { gruppe: 2, bis: 2500, prozent: 1.05 },
  { gruppe: 3, bis: 2900, prozent: 1.1 },
  { gruppe: 4, bis: 3300, prozent: 1.15 },
  { gruppe: 5, bis: 3700, prozent: 1.2 },
  { gruppe: 6, bis: 4100, prozent: 1.25 },
  { gruppe: 7, bis: 4500, prozent: 1.3 },
  { gruppe: 8, bis: 4900, prozent: 1.35 },
  { gruppe: 9, bis: 5300, prozent: 1.4 },
  { gruppe: 10, bis: 5700, prozent: 1.45 },
  { gruppe: 11, bis: 6400, prozent: 1.5 },
  { gruppe: 12, bis: 7200, prozent: 1.55 },
  { gruppe: 13, bis: 8200, prozent: 1.6 },
  { gruppe: 14, bis: 9700, prozent: 1.65 },
  { gruppe: 15, bis: 11200, prozent: 1.7 },
] as const;

/** Selbstbehalte 2026 (Kindesunterhalt unverändert, Elternunterhalt neu quantifiziert). */
export const SELBSTBEHALT_2026 = {
  /** Erwerbstätig, gegen minderjährige & privilegiert volljährige Kinder. */
  erwerbstaetig_gegen_minderjaehrig: 1450,
  /** Nicht erwerbstätig, gegen minderjährige & privilegiert volljährige Kinder. */
  nicht_erwerbstaetig_gegen_minderjaehrig: 1200,
  /** Gegen nicht-privilegiert volljährige Kinder. */
  gegen_nicht_privilegiert_volljaehrig: 1750,
  /** NEU 2026 (BGH XII ZB 6/24): Elternunterhalt — pflichtiges Kind. */
  elternunterhalt_pflichtiger: 2650,
  /** NEU 2026: Elternunterhalt — Ehegatte des pflichtigen Kindes. */
  elternunterhalt_ehegatte: 2120,
} as const;

/** Anteil des oberhalb des Selbstbehalts liegenden Einkommens, der anrechnungsfrei bleibt. */
export const ELTERNUNTERHALT_FREISTELLUNG_2026 = 0.7;
/** Komplement zur Freistellung — dieser Anteil ist zumutbar. */
export const ELTERNUNTERHALT_ANRECHNUNG_2026 = 1 - ELTERNUNTERHALT_FREISTELLUNG_2026;

// ─────────────────────────────────────────────────────────────────────
// Berechnungs-Helfer
// ─────────────────────────────────────────────────────────────────────

/**
 * Liefert die Einkommensgruppe (1–15) für das Netto.
 * Netto > 11.200 € → Gruppe 15 (weitere Gruppen laut DT nur auf Antrag).
 *
 * @param netto Bereinigtes Netto €/Monat
 * @param anzahlKinder Anzahl unterhaltspflichtiger Kinder (DT geht Default von 2 aus)
 * @param anpassung Höherstufung bei abweichender Kinderzahl anwenden?
 */
export function findeEinkommensgruppe(
  netto: number,
  anzahlKinder: number,
  anpassung: boolean,
): number {
  const idx = EINKOMMENSGRUPPEN_2026.findIndex(g => netto <= g.bis);
  const basis = idx === -1 ? 15 : idx + 1;
  if (!anpassung || anzahlKinder === 2) return basis;
  if (anzahlKinder === 1) return Math.min(basis + 1, 15);
  if (anzahlKinder >= 3) return Math.max(basis - 1, 1);
  return basis;
}

/**
 * Tabellenwert der DT 2026: Mindestbedarf × Gruppen-Prozentsatz, aufgerundet
 * auf volle Euro (DT-Rundungsregel).
 */
export function berechneTabellenwert(alter: Altersstufe, gruppe: number): number {
  const mindest = MINDESTBEDARF_2026[alter];
  const g = EINKOMMENSGRUPPEN_2026.find(x => x.gruppe === gruppe);
  const prozent = g?.prozent ?? 1.0;
  return Math.ceil(mindest * prozent);
}

export type KindergeldOption = 'hälftig' | 'voll' | 'keine';

/**
 * Zahlbetrag pro Kind: Tabellenwert − Kindergeld-Anrechnung − anrechenbares
 * Eigeneinkommen, nach oben auf volle Euro gerundet (konsistent mit
 * Tabellenwert-Rundung).
 *
 * Wichtig: Kindergeld wird exakt (129,50 € bzw. 259 €) vor der Subtraktion
 * eingesetzt, NICHT vorher kaufmännisch auf ganze Euro gerundet.
 */
export function berechneZahlbetrag(
  tabellenwert: number,
  kindergeldOption: KindergeldOption,
  eigenesEinkommenAnrechenbar: number = 0,
): number {
  const kg =
    kindergeldOption === 'hälftig'
      ? KINDERGELD_HAELFTIG_2026
      : kindergeldOption === 'voll'
        ? KINDERGELD_2026
        : 0;
  const raw = tabellenwert - kg - eigenesEinkommenAnrechenbar;
  return Math.ceil(Math.max(0, raw));
}

// ─────────────────────────────────────────────────────────────────────
// Elternunterhalt (NEU 2026)
// ─────────────────────────────────────────────────────────────────────

export type ElternunterhaltStatus = 'unter_selbstbehalt' | 'oberhalb' | 'auch_ehegatte_traegt';

export interface ElternunterhaltErgebnis {
  zumutbar: number;
  status: ElternunterhaltStatus;
  kindAnteil: number;
  ehegatteAnteil: number;
  erklaerung: string;
}

/**
 * Elternunterhalt nach BGH XII ZB 6/24 (23.10.2024), in DT 2026 aufgenommen.
 * Vom Einkommen oberhalb des Selbstbehalts bleiben 70 % anrechnungsfrei;
 * die zumutbare Quote von 30 % wird zugunsten des Pflichtigen abgerundet.
 */
export function berechneElternunterhalt(
  nettoKind: number,
  mitEhegatte: boolean,
  nettoEhegatte: number = 0,
): ElternunterhaltErgebnis {
  const sbKind = SELBSTBEHALT_2026.elternunterhalt_pflichtiger;
  const sbEhe = SELBSTBEHALT_2026.elternunterhalt_ehegatte;
  const quote = ELTERNUNTERHALT_ANRECHNUNG_2026;

  if (nettoKind <= sbKind) {
    return {
      zumutbar: 0,
      status: 'unter_selbstbehalt',
      kindAnteil: 0,
      ehegatteAnteil: 0,
      erklaerung: `Einkommen des unterhaltspflichtigen Kindes liegt unter dem Selbstbehalt (${sbKind} €). Kein Elternunterhalt zumutbar.`,
    };
  }

  const kindAnteil = Math.floor((nettoKind - sbKind) * quote);

  let ehegatteAnteil = 0;
  let status: ElternunterhaltStatus = 'oberhalb';

  if (mitEhegatte && nettoEhegatte > sbEhe) {
    ehegatteAnteil = Math.floor((nettoEhegatte - sbEhe) * quote);
    status = 'auch_ehegatte_traegt';
  }

  return {
    zumutbar: kindAnteil + ehegatteAnteil,
    status,
    kindAnteil,
    ehegatteAnteil,
    erklaerung:
      'Vom Einkommen oberhalb des Selbstbehalts bleiben 70 % anrechnungsfrei (BGH XII ZB 6/24 v. 23.10.2024, DT 2026).',
  };
}
