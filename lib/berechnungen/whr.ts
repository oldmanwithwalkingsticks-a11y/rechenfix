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

/**
 * W187: Männer vorher niedrig < 0,90, moderat 0,90–0,99, erhöht ≥ 1,00 (als WHO ausgewiesen, aber nicht von der WHO).
 * WHO Expert Consultation „Waist circumference and waist–hip ratio“ (Genf 2008, veröffentlicht 2011):
 * deutlich erhöhtes Risiko metabolischer Komplikationen ab WHR ≥ 0,90 (Männer) bzw. ≥ 0,85 (Frauen).
 * Die Mittelstufe („moderat“) ist keine WHO-Stufe, sondern eine Vorstufe 0,05 unter der WHO-Schwelle —
 * bei Frauen 0,80–0,84 (wie bisher), bei Männern jetzt analog 0,85–0,89.
 * Messort Taille (WHO): Mitte zwischen unterem Rippenbogen und Beckenkamm; Hüfte: breiteste Stelle des Gesäßes.
 */
export function berechneWhr(e: WhrEingabe): WhrErgebnis {
  const whr = e.hueftumfangCm > 0 ? e.taillenumfangCm / e.hueftumfangCm : 0;

  let risiko: Risiko;
  if (e.geschlecht === 'frau') {
    if (whr < 0.80) risiko = 'niedrig';
    else if (whr < 0.85) risiko = 'moderat';
    else risiko = 'erhoeht';
  } else {
    // W187: vorher < 0,90 niedrig, < 1,00 moderat
    if (whr < 0.85) risiko = 'niedrig';
    else if (whr < 0.90) risiko = 'moderat';
    else risiko = 'erhoeht';
  }

  const grenzwerte = e.geschlecht === 'frau'
    ? { niedrig: '< 0,80', moderat: '0,80–0,84', erhoeht: '≥ 0,85' }
    : { niedrig: '< 0,85', moderat: '0,85–0,89', erhoeht: '≥ 0,90' }; // W187: vorher '< 0,90' / '0,90–0,99' / '≥ 1,00'

  let whtr: number | null = null;
  let whtrRisiko: 'optimal' | 'erhoeht' | null = null;
  if (e.koerpergroesseCm > 0) {
    whtr = e.taillenumfangCm / e.koerpergroesseCm;
    whtrRisiko = whtr < 0.5 ? 'optimal' : 'erhoeht';
  }

  return { whr, risiko, whtr, whtrRisiko, grenzwerte };
}
