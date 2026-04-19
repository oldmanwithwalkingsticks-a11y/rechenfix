import {
  berechneEStGrund,
  berechneSoli,
  berechneKirchensteuerByBundesland,
  type Bundesland,
} from './einkommensteuer';

export interface SpendenErgebnis {
  spendenbetrag: number;
  zvE: number;
  maxAbsetzbar: number;          // zvE * 0.20
  tatsaechlichAbsetzbar: number; // min(spende, maxAbsetzbar)
  grenzsteuersatz: number;       // personal marginal tax rate in %
  steuerersparnisESt: number;
  steuerersparnisSoli: number;
  steuerersparnisKiSt: number;
  steuerersparnisGesamt: number;
  effektiveKosten: number;       // spende - gesamtersparnis
  foerderquote: number;          // ersparnis / spende * 100
}

export function berechneSpendenErsparnis(
  spendenbetrag: number,
  zvE: number,
  kirchensteuer: boolean,
  bundesland: Bundesland = 'Nordrhein-Westfalen',
): SpendenErgebnis | null {
  if (spendenbetrag <= 0 || zvE <= 0) return null;

  const maxAbsetzbar = Math.round(zvE * 0.2);
  const tatsaechlichAbsetzbar = Math.min(spendenbetrag, maxAbsetzbar);

  // Grenzsteuersatz: finite Differenz aus zentralem § 32a-Tarif
  const estVoll = berechneEStGrund(zvE, 2026);
  const estVollMinus1 = berechneEStGrund(zvE - 1, 2026);
  const grenzsteuersatz = (estVoll - estVollMinus1) * 100;

  // ESt-Ersparnis: ESt(zvE) − ESt(zvE − absetzbar)
  const estNachSpende = berechneEStGrund(zvE - tatsaechlichAbsetzbar, 2026);
  const steuerersparnisESt = estVoll - estNachSpende;

  // Soli-Ersparnis: Differenz der Soli-Beträge (Milderungszone korrekt, § 4 SolzG).
  // Nicht pauschal 5,5 % der ESt-Ersparnis — bei zvE knapp über Freigrenze ignoriert
  // die Pauschale, dass der Soli vor/nach Spende unter der Freigrenze liegen kann.
  const soliVoll = berechneSoli(estVoll, false, 2026);
  const soliNachSpende = berechneSoli(estNachSpende, false, 2026);
  const steuerersparnisSoli = Math.round((soliVoll - soliNachSpende) * 100) / 100;

  // KiSt-Ersparnis: Differenz über Bundesland-abhängigen Satz (8 % BY/BW, 9 % sonst)
  const kistVoll = kirchensteuer ? berechneKirchensteuerByBundesland(estVoll, bundesland) : 0;
  const kistNachSpende = kirchensteuer ? berechneKirchensteuerByBundesland(estNachSpende, bundesland) : 0;
  const steuerersparnisKiSt = Math.round((kistVoll - kistNachSpende) * 100) / 100;

  const steuerersparnisGesamt = Math.round(
    (steuerersparnisESt + steuerersparnisSoli + steuerersparnisKiSt) * 100,
  ) / 100;

  const effektiveKosten = Math.round((spendenbetrag - steuerersparnisGesamt) * 100) / 100;

  const foerderquote = spendenbetrag > 0
    ? Math.round((steuerersparnisGesamt / spendenbetrag) * 10000) / 100
    : 0;

  return {
    spendenbetrag,
    zvE,
    maxAbsetzbar,
    tatsaechlichAbsetzbar,
    grenzsteuersatz,
    steuerersparnisESt,
    steuerersparnisSoli,
    steuerersparnisKiSt,
    steuerersparnisGesamt,
    effektiveKosten,
    foerderquote,
  };
}
