/**
 * Kreditwerbung nach Anhang Nr. 23e UWG (Welle 157).
 *
 * Bewusst ohne React: Die Komponente (components/AffiliateBox.tsx), die
 * KI-Erklärung (app/api/explain/route.ts) und der Wächter
 * (scripts/verify-kreditwerbung.ts) lesen dieselben Werte.
 */

/** Anhang Nr. 23e Buchst. a UWG (BGBl. 2026 I Nr. 139, Art. 6), anzuwenden ab 20.11.2026. */
export const KREDIT_WARNHINWEIS = 'Achtung! Kreditaufnahme kostet Geld.';

/** Rechner, deren „Fix erklärt" die Zusatzregel bekommt. Muss jede Kreditplatzierung abdecken (verify-kreditwerbung). */
export const KREDIT_RECHNER = ['Kreditrechner', 'Leasing-Rechner', 'Wertverlust-Rechner (Auto)'] as const;

/** Zusatzregel für „Fix erklärt" auf den Rechnern aus KREDIT_RECHNER, gegen Aussagen im Sinne von Nr. 23e Buchst. b bis d. */
export const KREDIT_KI_REGEL =
  'Zusatzregel für diesen Rechner: Stelle eine Kreditaufnahme nie so dar, als verbessere sie die finanzielle Lage, erhöhe die verfügbaren Mittel, ersetze Ersparnisse oder hebe den Lebensstandard. Sage nie, laufende Kredite oder Einträge bei Auskunfteien hätten wenig oder keinen Einfluss auf einen Kreditantrag. Erwähnt ein Tipp einen Kredit, weise darauf hin, dass ein Kredit Geld kostet.';

/** Kreditwerbung ist jede smava-Anzeige und jede Anzeige mit einem Ziel unter /kredit. */
export function istKreditwerbung(programId: string, ziel: string | undefined): boolean {
  if (programId === 'smava') return true;
  return typeof ziel === 'string' && /\/kredit(\/|$|\?)/.test(ziel);
}
