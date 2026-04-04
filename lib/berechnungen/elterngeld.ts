export type ElterngeldVariante = 'basis' | 'plus';

export interface ElterngeldEingabe {
  nettoVorGeburt: number;
  nettoDanach: number;
  variante: ElterngeldVariante;
  mehrlinge: boolean;
  geschwisterbonus: boolean;
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
}

export interface ElterngeldVergleich {
  basis: ElterngeldErgebnis;
  plus: ElterngeldErgebnis;
}

/**
 * Berechnet die Ersatzrate basierend auf dem Nettoeinkommen.
 * - Netto < 1000€: Rate steigt um 0,1% pro 2€ unter 1000€ (max 100%)
 * - Netto 1000–1200€: 65%
 * - Netto > 1200€: Rate sinkt um 0,1% pro 2€ über 1200€ (min 65% → eigentlich min bei Geringverdienern)
 */
function berechneErsatzrate(netto: number): number {
  if (netto <= 0) return 1.0;

  if (netto < 1000) {
    const differenz = 1000 - netto;
    const zusatz = Math.floor(differenz / 2) * 0.001;
    return Math.min(1.0, 0.67 + zusatz);
  }

  if (netto <= 1200) {
    return 0.67;
  }

  // Über 1200€: Ersatzrate sinkt
  const differenz = netto - 1200;
  const abzug = Math.floor(differenz / 2) * 0.001;
  return Math.max(0.65, 0.67 - abzug);
}

export function berechneElterngeld(eingabe: ElterngeldEingabe): ElterngeldErgebnis | null {
  const { nettoVorGeburt, nettoDanach, variante, mehrlinge, geschwisterbonus } = eingabe;

  if (nettoVorGeburt < 0 || nettoDanach < 0) return null;

  // Relevantes Einkommen = Differenz zwischen vorher und nachher
  const relevantesEinkommen = Math.max(0, nettoVorGeburt - nettoDanach);

  // Ersatzrate berechnen
  const ersatzrate = berechneErsatzrate(relevantesEinkommen);

  // Basis-Elterngeld berechnen
  let basisBetrag = relevantesEinkommen * ersatzrate;

  // Mindest- und Höchstbeträge
  const istPlus = variante === 'plus';
  const minBetrag = istPlus ? 150 : 300;
  const maxBetrag = istPlus ? 900 : 1800;

  // Mindestens Mindestbetrag (auch bei 0 Einkommen)
  basisBetrag = Math.max(minBetrag, basisBetrag);
  basisBetrag = Math.min(maxBetrag, basisBetrag);

  // Bei ElterngeldPlus: halbierter Betrag
  if (istPlus && relevantesEinkommen > 0) {
    // ElterngeldPlus = maximal die Hälfte des Basiselterngeldes
    const basisVoll = Math.min(1800, Math.max(300, relevantesEinkommen * ersatzrate));
    basisBetrag = Math.min(900, basisVoll / 2);
    basisBetrag = Math.max(150, basisBetrag);
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
  };
}

export function berechneVergleich(eingabe: ElterngeldEingabe): ElterngeldVergleich | null {
  const basis = berechneElterngeld({ ...eingabe, variante: 'basis' });
  const plus = berechneElterngeld({ ...eingabe, variante: 'plus' });
  if (!basis || !plus) return null;
  return { basis, plus };
}
