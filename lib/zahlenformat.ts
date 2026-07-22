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
 * Folgt DIN 5008: Punkt = Tausendertrenner, Komma = Dezimaltrennzeichen.
 *
 * Heuristik (W12, L-41-Folge):
 *   R1: Komma vorhanden → Komma=Dezimal, alle Punkte=Tausender (entfernt)
 *   R2: Mehrere Punkte → alle Tausenderpunkte (entfernt)
 *   R3: Ein Punkt + GENAU 3 Ziffern danach → Tausenderpunkt (entfernt)
 *   R4: Sonst (1 Punkt, ≠3 Ziffern) → Punkt=Dezimal (US-Toleranz)
 *
 * Beispiele:
 *   "150"         → 150
 *   "150.000"     → 150000   (R3)
 *   "1.500,50"    → 1500.5   (R1)
 *   "1.5"         → 1.5      (R4)
 *   "1.000.000"   → 1000000  (R2)
 *
 * Empty/Whitespace-String → 0 (UX-Default für Initial-State, W12-Hotfix);
 * ungültige Eingaben (`'abc'` etc.) → NaN.
 */
export function parseDeutscheZahl(wert: string): number {
  if (!wert || wert.trim() === '') return 0;  // Backwards-Compat (W12-Hotfix)
  const trimmed = wert.trim();

  // R1: Komma vorhanden → Komma=Dezimal, alle Punkte=Tausender
  if (trimmed.includes(',')) {
    const ohneTausender = trimmed.replace(/\./g, '');
    const mitDezimalpunkt = ohneTausender.replace(',', '.');
    const zahl = parseFloat(mitDezimalpunkt);
    return isNaN(zahl) ? NaN : zahl;
  }

  const punkte = trimmed.match(/\./g);
  const anzPunkte = punkte ? punkte.length : 0;

  // R2: ≥2 Punkte → alle Tausenderpunkte
  if (anzPunkte >= 2) {
    const ohnePunkte = trimmed.replace(/\./g, '');
    const zahl = parseFloat(ohnePunkte);
    return isNaN(zahl) ? NaN : zahl;
  }

  // R3: 1 Punkt + GENAU 3 Ziffern danach → Tausenderpunkt
  if (anzPunkte === 1) {
    const teile = trimmed.split('.');
    if (/^\d{3}$/.test(teile[1])) {
      const ohnePunkt = teile[0] + teile[1];
      const zahl = parseFloat(ohnePunkt);
      return isNaN(zahl) ? NaN : zahl;
    }
  }

  // R4 / kein Punkt: direkt parsen (Punkt = Dezimal als US-Toleranz)
  const zahl = parseFloat(trimmed);
  return isNaN(zahl) ? NaN : zahl;
}

/**
 * Prüft, ob die Eingabe ein gültiges deutsches Zahlenformat ist.
 * Erlaubt: Ziffern, beliebige Anzahl Tausenderpunkte, max. 1 Komma als
 * Dezimaltrenner, optionales Minus am Anfang.
 */
export function istGueltigeZahleneingabe(wert: string): boolean {
  return /^-?[\d.]*,?\d*$/.test(wert);
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

/** Deutsches Euro-Format, immer 2 Nachkommastellen (wie die Rechnerseiten). */
export function formatEuro(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}
/** Deutsches Zahlenformat mit fixer Nachkommastellenzahl. */
export function formatZahl(n: number, dezimal = 0): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: dezimal, maximumFractionDigits: dezimal });
}
/** Deutsches Prozentformat. */
export function formatProzent(n: number, dezimal = 1): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: dezimal, maximumFractionDigits: dezimal }) + ' %';
}
