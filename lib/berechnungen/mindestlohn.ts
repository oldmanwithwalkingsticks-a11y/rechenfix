/**
 * Gesetzlicher Mindestlohn nach § 1 Abs. 2 MiLoG — zentrale SSOT.
 *
 * Historie:
 * - 01.01.2024–31.12.2024: 12,41 € (MiLoV 2023)
 * - 01.01.2025–31.12.2025: 12,82 € (MiLoV 2023, Stufe 2)
 * - 01.01.2026–31.12.2026: 13,90 € (Vierte MiLoV, Beschluss 27.06.2025)
 * - Ab 01.01.2027:         14,60 € (Vierte MiLoV, Stufe 2)
 *
 * Konsumenten müssen NIE einen hartkodierten Stundenlohn führen, sondern
 * importieren entweder die konstante `MINDESTLOHN` (tagesaktuell beim
 * Modul-Load) oder rufen `getAktuellerMindestlohn(stichtag)` explizit auf.
 */

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
 * Minijob-Monatsgrenze nach § 8 Abs. 1a SGB IV: Mindestlohn × 130 / 3,
 * kaufmännisch auf volle Euro gerundet.
 *   2025: 556 €
 *   2026: 603 €
 *   2027: 633 €
 */
export function getMinijobGrenzeMonat(stichtag: Date = new Date()): number {
  return Math.round((getAktuellerMindestlohn(stichtag) * 130) / 3);
}

export const MINDESTLOHN = getAktuellerMindestlohn();
export const MINIJOB_GRENZE_MONAT = getMinijobGrenzeMonat();
