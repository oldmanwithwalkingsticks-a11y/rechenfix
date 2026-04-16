export interface WhrEingabe {
  geschlecht: 'frau' | 'mann';
  taillenumfangCm: number;
  hueftumfangCm: number;
  koerpergroesseCm: number;
}

export type Risiko = 'niedrig' | 'moderat' | 'erhoeht';

export interface WhrErgebnis {
  whr: number;
  risiko: Risiko;
  whtr: number | null;
  whtrRisiko: 'optimal' | 'erhoeht' | null;
  grenzwerte: { niedrig: string; moderat: string; erhoeht: string };
}

export function berechneWhr(e: WhrEingabe): WhrErgebnis {
  const whr = e.hueftumfangCm > 0 ? e.taillenumfangCm / e.hueftumfangCm : 0;

  let risiko: Risiko;
  if (e.geschlecht === 'frau') {
    if (whr < 0.80) risiko = 'niedrig';
    else if (whr < 0.85) risiko = 'moderat';
    else risiko = 'erhoeht';
  } else {
    if (whr < 0.90) risiko = 'niedrig';
    else if (whr < 1.00) risiko = 'moderat';
    else risiko = 'erhoeht';
  }

  const grenzwerte = e.geschlecht === 'frau'
    ? { niedrig: '< 0,80', moderat: '0,80–0,84', erhoeht: '≥ 0,85' }
    : { niedrig: '< 0,90', moderat: '0,90–0,99', erhoeht: '≥ 1,00' };

  let whtr: number | null = null;
  let whtrRisiko: 'optimal' | 'erhoeht' | null = null;
  if (e.koerpergroesseCm > 0) {
    whtr = e.taillenumfangCm / e.koerpergroesseCm;
    whtrRisiko = whtr < 0.5 ? 'optimal' : 'erhoeht';
  }

  return { whr, risiko, whtr, whtrRisiko, grenzwerte };
}
