/**
 * Gesetzlicher Mindestlohn nach § 1 Abs. 2 MiLoG — zentrale SSOT.
 *
 * Historie:
 * - 01.01.2024–31.12.2024: 12,41 € (MiLoV 2023)
 * - 01.01.2025–31.12.2025: 12,82 € (MiLoV 2023, Stufe 2)
 * - 01.01.2026–31.12.2026: 13,90 € (Fünfte MiLoV, BGBl. verkündet 07.11.2025)
 * - Ab 01.01.2027:         14,60 € (Fünfte MiLoV, Stufe 2)
 *
 * Konsumenten müssen NIE einen hartkodierten Stundenlohn führen, sondern
 * importieren entweder die konstante `MINDESTLOHN` (tagesaktuell beim
 * Modul-Load) oder rufen `getAktuellerMindestlohn(stichtag)` explizit auf.
 */

import { VOLLZEIT_STUNDEN_MONAT } from './_helpers';
// Für Komponenten und Seiten, die _helpers nicht direkt importieren (CLAUDE.md, „Berechnungs-interne Helfer“)
export { VOLLZEIT_WOCHENSTUNDEN, VOLLZEIT_STUNDEN_MONAT } from './_helpers';

export const MINDESTLOHN_2024 = 12.41;
export const MINDESTLOHN_2025 = 12.82;
export const MINDESTLOHN_2026 = 13.9;
export const MINDESTLOHN_2027 = 14.6;

export function getAktuellerMindestlohn(stichtag: Date = new Date()): number {
  const y = stichtag.getFullYear();
  if (y >= 2027) return MINDESTLOHN_2027;
  if (y >= 2026) return MINDESTLOHN_2026;
  if (y >= 2025) return MINDESTLOHN_2025;
  return MINDESTLOHN_2024;
}

/**
 * Minijob-Monatsgrenze nach § 8 Abs. 1a Satz 2 SGB IV: Mindestlohn × 130 / 3,
 * auf volle Euro AUFGERUNDET (nicht kaufmännisch).
 *   2024: 538 €
 *   2025: 556 €
 *   2026: 603 €
 *   2027: 633 €
 */
export function getMinijobGrenzeMonat(stichtag: Date = new Date()): number {
  // § 8 Abs. 1a SGB IV: Mindestlohn × 130 / 3, auf volle Euro AUFGERUNDET (nicht kaufmännisch).
  return Math.ceil((getAktuellerMindestlohn(stichtag) * 130) / 3);
}

/**
 * Monatsbrutto bei Mindestlohn und 40-Stunden-Woche: Mindestlohn × 40 × 52 ÷ 12, auf Cent (W196).
 * 13,90 € → 2.409,33 €; 14,60 € → 2.530,67 €. Vorher rechneten Hinweis und Seite mit × 160 (2.224 €).
 */
export function mindestlohnMonatVollzeit(mindestlohn: number): number {
  return Math.round(mindestlohn * VOLLZEIT_STUNDEN_MONAT * 100) / 100;
}

/**
 * true, wenn ein Monatsbrutto bei einer 40-Stunden-Woche unter dem Mindestlohn liegt (W196).
 * Verglichen wird der Stundenlohn auf Cent gerundet: 2.409 € ergeben 13,898… → 13,90 € und zählen
 * nicht als darunter, 2.408 € ergeben 13,89 €.
 */
export function unterMindestlohnBeiVollzeit(bruttoMonat: number, mindestlohn: number): boolean {
  return bruttoMonat > 0 && Math.round((bruttoMonat / VOLLZEIT_STUNDEN_MONAT) * 100) / 100 < mindestlohn;
}

export const MINDESTLOHN = getAktuellerMindestlohn();
export const MINIJOB_GRENZE_MONAT = getMinijobGrenzeMonat();
