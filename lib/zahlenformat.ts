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

/**
 * Guard G3 — Clamping für `<input type="number">` onChange-Handler.
 *
 * Begrenzt einen String-Wert auf das Intervall [min, max]. Leere und
 * angefangene Eingaben ("", "-", ".") werden durchgelassen, damit Benutzer
 * in Ruhe tippen können. Sobald ein vollständiger numerischer Wert das
 * Intervall verlässt, wird auf die Grenze gekappt.
 *
 * Verwendung:
 *   onChange={e => setX(clampInputValue(e.target.value, 0, 100))}
 *
 * Mit `null` kann eine Grenze deaktiviert werden (z. B. min=0, max=null).
 */
export function clampInputValue(
  wert: string,
  min: number | null,
  max: number | null,
): string {
  if (wert === '' || wert === '-' || wert === '.' || wert === ',') return wert;
  const zahl = parseFloat(wert.replace(',', '.'));
  if (isNaN(zahl)) return wert;
  if (max !== null && zahl > max) return String(max);
  if (min !== null && zahl < min) return String(min);
  return wert;
}

/**
 * Guard G3 — Clamping für bereits geparste Zahl-Werte (number state).
 *
 * Verwendung:
 *   onChange={e => setX(clampNumber(parseFloat(e.target.value), 0, 100))}
 */
export function clampNumber(n: number, min: number, max: number): number {
  if (isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}
