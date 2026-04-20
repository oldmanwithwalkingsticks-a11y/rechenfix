export type ElterngeldVariante = 'basis' | 'plus';

/**
 * § 1 Abs. 8 BEEG — Einkommensgrenze für Anspruchsberechtigung.
 * Gilt für Paare UND Alleinerziehende gleichermaßen.
 * Stand: 01.01.2026 (ab 01.04.2025 für Neugeburten, ab 01.01.2026 alle Fälle).
 */
export const ELTERNGELD_EINKOMMENSGRENZE_2026 = 175_000;

/**
 * § 2 Abs. 3 BEEG — Deckelung des anzusetzenden Vor-Geburt-Nettoeinkommens
 * bei Teilzeit-Zuverdienst während Elternzeit. Das Einkommen vor der Geburt
 * wird höchstens mit 2.770 €/Monat angesetzt, auch wenn es faktisch höher war.
 */
export const ELTERNGELD_VORGEBURT_DECKEL_2026 = 2_770;

export interface ElterngeldEingabe {
  nettoVorGeburt: number;
  nettoDanach: number;
  variante: ElterngeldVariante;
  mehrlinge: boolean;
  geschwisterbonus: boolean;
  /** Zu versteuerndes Jahreseinkommen. Bei Paaren: Summe beider zvE.
   *  Wenn undefined oder null: keine Anspruchsprüfung, Berechnung läuft normal. */
  zvE?: number | null;
}

export interface ElterngeldErgebnis {
  monatlich: number;
  gesamt: number;
  bezugsMonate: number;
  basisBetrag: number;
  geschwisterbonusBetrag: number;
  mehrlingszuschlag: number;
  ersatzrate: number;
  relevantesEinkommen: number;
  /** true, wenn zvE > ELTERNGELD_EINKOMMENSGRENZE_2026 — kein Anspruch (§ 1 Abs. 8 BEEG). */
  anspruchAusgeschlossen: boolean;
}

export interface ElterngeldVergleich {
  basis: ElterngeldErgebnis;
  plus: ElterngeldErgebnis;
}

/**
 * Berechnet die Ersatzrate nach § 2 Abs. 1+2 BEEG — IMMER bezogen auf das
 * Nettoeinkommen VOR der Geburt (nicht auf den Unterschiedsbetrag bei
 * Teilzeit-Zuverdienst).
 *
 * - Netto < 1.000 €: Rate steigt um 0,1 Prozentpunkte pro 2 € unter 1.000 €
 *   bis max. 100 % (Geringverdiener-Bonus § 2 Abs. 2 Satz 1)
 * - Netto 1.000–1.240 €: Plateau bei 67 %
 * - Netto > 1.240 €: Rate sinkt um 0,1 Prozentpunkte pro 2 € über 1.240 €
 *   bis min. 65 % (§ 2 Abs. 2 Satz 2 — zweite Absenkungsstufe)
 */
export function berechneErsatzrate(nettoVorGeburt: number): number {
  if (nettoVorGeburt <= 0) return 1.0;

  if (nettoVorGeburt < 1000) {
    const differenz = 1000 - nettoVorGeburt;
    const zusatz = Math.floor(differenz / 2) * 0.001;
    return Math.min(1.0, 0.67 + zusatz);
  }

  if (nettoVorGeburt <= 1240) {
    return 0.67;
  }

  // Über 1.240 €: Ersatzrate sinkt bis auf 65 %
  const differenz = nettoVorGeburt - 1240;
  const abzug = Math.floor(differenz / 2) * 0.001;
  return Math.max(0.65, 0.67 - abzug);
}

export function berechneElterngeld(eingabe: ElterngeldEingabe): ElterngeldErgebnis | null {
  const { nettoVorGeburt, nettoDanach, variante, mehrlinge, geschwisterbonus, zvE } = eingabe;

  if (nettoVorGeburt < 0 || nettoDanach < 0) return null;

  // § 1 Abs. 8 BEEG — Anspruchsausschluss bei zvE > 175.000 €.
  // Nur prüfen, wenn zvE angegeben wurde. Bei fehlendem zvE läuft Berechnung
  // normal, UI zeigt ergänzend einen Hinweis an.
  const anspruchAusgeschlossen =
    typeof zvE === 'number' && zvE > ELTERNGELD_EINKOMMENSGRENZE_2026;

  if (anspruchAusgeschlossen) {
    return {
      monatlich: 0,
      gesamt: 0,
      bezugsMonate: variante === 'plus' ? 28 : 14,
      basisBetrag: 0,
      geschwisterbonusBetrag: 0,
      mehrlingszuschlag: 0,
      ersatzrate: 0,
      relevantesEinkommen: Math.max(0, nettoVorGeburt - nettoDanach),
      anspruchAusgeschlossen: true,
    };
  }

  // § 2 Abs. 1+2 BEEG: Ersatzrate richtet sich nach dem Netto VOR der Geburt,
  // nicht nach dem Unterschiedsbetrag.
  const ersatzrate = berechneErsatzrate(nettoVorGeburt);

  // § 2 Abs. 3 BEEG: Bei Teilzeit-Zuverdienst wird der Unterschiedsbetrag zur
  // Bemessungsgrundlage, wobei das Vor-Geburt-Einkommen mit 2.770 €/Monat
  // gedeckelt ist.
  const gedeckeltesVor = Math.min(nettoVorGeburt, ELTERNGELD_VORGEBURT_DECKEL_2026);
  const relevantesEinkommen = Math.max(0, gedeckeltesVor - nettoDanach);

  // Basis-Elterngeld bzw. ElterngeldPlus berechnen.
  // BEEG § 4a: ElterngeldPlus = halbiertes Basiselterngeld, eigene Grenzen 150/900.
  const istPlus = variante === 'plus';
  const roh = relevantesEinkommen * ersatzrate;
  let basisBetrag: number;

  if (istPlus) {
    // Zunächst volles Basiselterngeld ermitteln (Grenzen 300/1800), dann halbieren
    // und auf Plus-Grenzen 150/900 klammern. Bei rel. Einkommen = 0 greift der
    // Mindestbetrag 300 → halbiert 150 = Plus-Minimum.
    const basisVoll = relevantesEinkommen > 0
      ? Math.min(1800, Math.max(300, roh))
      : 300;
    basisBetrag = Math.min(900, Math.max(150, basisVoll / 2));
  } else {
    // Basiselterngeld: direkt auf 300/1800 klammern
    basisBetrag = Math.min(1800, Math.max(300, roh));
  }

  // Geschwisterbonus: +10%, mindestens 75€ (Basis) / 37,50€ (Plus)
  let geschwisterbonusBetrag = 0;
  if (geschwisterbonus) {
    const minBonus = istPlus ? 37.5 : 75;
    geschwisterbonusBetrag = Math.max(minBonus, basisBetrag * 0.1);
  }

  // Mehrlingszuschlag: +300€ pro weiterem Kind (Basis) / +150€ (Plus)
  const mehrlingszuschlag = mehrlinge ? (istPlus ? 150 : 300) : 0;

  // Monatliches Elterngeld
  const monatlich = Math.round((basisBetrag + geschwisterbonusBetrag + mehrlingszuschlag) * 100) / 100;

  // Bezugsdauer
  const bezugsMonate = istPlus ? 28 : 14;

  // Gesamtes Elterngeld
  const gesamt = Math.round(monatlich * bezugsMonate * 100) / 100;

  return {
    monatlich,
    gesamt,
    bezugsMonate,
    basisBetrag: Math.round(basisBetrag * 100) / 100,
    geschwisterbonusBetrag: Math.round(geschwisterbonusBetrag * 100) / 100,
    mehrlingszuschlag,
    ersatzrate: Math.round(ersatzrate * 1000) / 10,
    relevantesEinkommen,
    anspruchAusgeschlossen: false,
  };
}

export function berechneVergleich(eingabe: ElterngeldEingabe): ElterngeldVergleich | null {
  const basis = berechneElterngeld({ ...eingabe, variante: 'basis' });
  const plus = berechneElterngeld({ ...eingabe, variante: 'plus' });
  if (!basis || !plus) return null;
  return { basis, plus };
}
