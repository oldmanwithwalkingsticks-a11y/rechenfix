export interface MwStErgebnis {
  netto: number;
  mwstBetrag: number;
  brutto: number;
  mwstSatz: number;
}

export interface MultiMwStZeile {
  bezeichnung: string;
  netto: number;
  mwstSatz: number;
  mwstBetrag: number;
  brutto: number;
}

export interface MultiMwStErgebnis {
  zeilen: MultiMwStZeile[];
  summeNetto: number;
  summeMwSt: number;
  summeBrutto: number;
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

export function berechneMwStAusBrutto(brutto: number, mwstSatz: number): MwStErgebnis {
  const netto = Math.round((brutto / (1 + mwstSatz / 100)) * 100) / 100;
  const mwstBetrag = Math.round((brutto - netto) * 100) / 100;
  return {
    netto,
    mwstBetrag,
    brutto: Math.round(brutto * 100) / 100,
    mwstSatz,
  };
}

export function berechneMultiMwSt(
  zeilen: { bezeichnung: string; netto: number; mwstSatz: number }[]
): MultiMwStErgebnis {
  const berechneteZeilen = zeilen.map(z => {
    const mwstBetrag = Math.round(z.netto * (z.mwstSatz / 100) * 100) / 100;
    return {
      bezeichnung: z.bezeichnung,
      netto: Math.round(z.netto * 100) / 100,
      mwstSatz: z.mwstSatz,
      mwstBetrag,
      brutto: Math.round((z.netto + mwstBetrag) * 100) / 100,
    };
  });

  return {
    zeilen: berechneteZeilen,
    summeNetto: Math.round(berechneteZeilen.reduce((s, z) => s + z.netto, 0) * 100) / 100,
    summeMwSt: Math.round(berechneteZeilen.reduce((s, z) => s + z.mwstBetrag, 0) * 100) / 100,
    summeBrutto: Math.round(berechneteZeilen.reduce((s, z) => s + z.brutto, 0) * 100) / 100,
  };
}
