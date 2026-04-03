/**
 * Zentrale Hilfsfunktionen für deutsches Zahlenformat.
 * Komma als Dezimaltrennzeichen (z. B. "7,5" → 7.5).
 *
 * Verwendung in allen Rechnern:
 *   import { parseDeutscheZahl } from '@/lib/zahlenformat';
 *   const n = parseDeutscheZahl(eingabe);
 */

/**
 * Wandelt eine Benutzereingabe im deutschen Zahlenformat in eine Zahl um.
 * Akzeptiert sowohl Komma als auch Punkt als Dezimaltrennzeichen.
 * Gibt 0 zurück, wenn die Eingabe ungültig ist.
 */
export function parseDeutscheZahl(wert: string): number {
  if (!wert || wert.trim() === '') return 0;
  // Komma durch Punkt ersetzen, dann parsen
  const bereinigt = wert.replace(',', '.');
  const zahl = parseFloat(bereinigt);
  return isNaN(zahl) ? 0 : zahl;
}

/**
 * Prüft, ob die Eingabe ein gültiges deutsches Zahlenformat ist.
 * Erlaubt: Ziffern, ein Komma oder Punkt, optionales Minus am Anfang.
 */
export function istGueltigeZahleneingabe(wert: string): boolean {
  return /^-?\d*[,.]?\d*$/.test(wert);
}
