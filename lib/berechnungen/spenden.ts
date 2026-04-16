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

// Einkommensteuer nach § 32a EStG 2025/2026
function berechneESt(zvE: number): number {
  const grundfreibetrag = 12096;
  if (zvE <= grundfreibetrag) return 0;

  const x = zvE - grundfreibetrag;
  let steuer: number;

  if (x <= 17442) {
    steuer = x * 0.14;
  } else if (x <= 54057) {
    steuer = 17442 * 0.14 + (x - 17442) * 0.2397;
  } else if (x <= 243714) {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + (x - 54057) * 0.42;
  } else {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + 189657 * 0.42 + (x - 243714) * 0.45;
  }

  return Math.round(steuer);
}

export function berechneSpendenErsparnis(
  spendenbetrag: number,
  zvE: number,
  kirchensteuer: boolean,
): SpendenErgebnis | null {
  if (spendenbetrag <= 0 || zvE <= 0) return null;

  const maxAbsetzbar = Math.round(zvE * 0.2);
  const tatsaechlichAbsetzbar = Math.min(spendenbetrag, maxAbsetzbar);

  // Grenzsteuersatz: Differenz der ESt bei zvE und zvE-1 (in %)
  const estVoll = berechneESt(zvE);
  const estVollMinus1 = berechneESt(zvE - 1);
  const grenzsteuersatz = (estVoll - estVollMinus1) * 100;

  // Steuerersparnis ESt: ESt(zvE) - ESt(zvE - absetzbar)
  const estNachSpende = berechneESt(zvE - tatsaechlichAbsetzbar);
  const steuerersparnisESt = estVoll - estNachSpende;

  // Soli: vereinfacht 5,5% der ESt-Ersparnis
  const steuerersparnisSoli = Math.round(steuerersparnisESt * 0.055 * 100) / 100;

  // KiSt: 9% der ESt-Ersparnis, nur wenn kirchensteuer=true
  const steuerersparnisKiSt = kirchensteuer
    ? Math.round(steuerersparnisESt * 0.09 * 100) / 100
    : 0;

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
