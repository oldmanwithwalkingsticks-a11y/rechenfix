export interface KwPsEingabe {
  wert: number;
  richtung: 'kw-zu-ps' | 'ps-zu-kw';
}

export interface KwPsErgebnis {
  eingabeWert: number;
  ergebnisWert: number;
  eingabeEinheit: string;
  ergebnisEinheit: string;
}

// W187: vorher PS_ZU_KW = 0.73550 und KW_ZU_PS = 1.35962 (gerundet; 150 PS → 110,33 statt 110,32 kW).
// Metrische PS: 1 PS = 75 kp·m/s = 75 × 9,80665 W = 735,49875 W (DIN 66036) → exakt 0,73549875 kW.
export const PS_ZU_KW = 0.73549875;
export const KW_ZU_PS = 1 / PS_ZU_KW; // ≈ 1,359621617

export function berechneKwPs(eingabe: KwPsEingabe): KwPsErgebnis | null {
  const { wert, richtung } = eingabe;
  if (wert <= 0) return null;

  if (richtung === 'kw-zu-ps') {
    return {
      eingabeWert: wert,
      ergebnisWert: Math.round(wert * KW_ZU_PS * 100) / 100,
      eingabeEinheit: 'kW',
      ergebnisEinheit: 'PS',
    };
  } else {
    return {
      eingabeWert: wert,
      ergebnisWert: Math.round(wert * PS_ZU_KW * 100) / 100,
      eingabeEinheit: 'PS',
      ergebnisEinheit: 'kW',
    };
  }
}

export const umrechnungstabelle = [50, 75, 100, 110, 125, 150, 175, 200, 250, 300].map(kw => ({
  kw,
  ps: Math.round(kw * KW_ZU_PS * 10) / 10,
}));
