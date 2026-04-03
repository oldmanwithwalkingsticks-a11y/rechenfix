export interface MwStErgebnis {
  netto: number;
  mwstBetrag: number;
  brutto: number;
  mwstSatz: number;
}

export function berechneNettoZuBrutto(netto: number, mwstSatz: number): MwStErgebnis {
  const mwstBetrag = Math.round(netto * (mwstSatz / 100) * 100) / 100;
  return {
    netto: Math.round(netto * 100) / 100,
    mwstBetrag,
    brutto: Math.round((netto + mwstBetrag) * 100) / 100,
    mwstSatz,
  };
}

export function berechneBruttoZuNetto(brutto: number, mwstSatz: number): MwStErgebnis {
  const netto = Math.round((brutto / (1 + mwstSatz / 100)) * 100) / 100;
  const mwstBetrag = Math.round((brutto - netto) * 100) / 100;
  return {
    netto,
    mwstBetrag,
    brutto: Math.round(brutto * 100) / 100,
    mwstSatz,
  };
}
