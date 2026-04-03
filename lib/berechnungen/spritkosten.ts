export interface SpritkostenEingabe {
  strecke: number;       // in km
  verbrauch: number;     // Liter pro 100 km
  spritpreis: number;    // € pro Liter
  hinUndZurueck: boolean;
}

export interface SpritkostenErgebnis {
  gesamtkosten: number;
  literGesamt: number;
  kostenProKm: number;
  effektiveStrecke: number;
}

export function berechneSpritkosten(eingabe: SpritkostenEingabe): SpritkostenErgebnis | null {
  const { strecke, verbrauch, spritpreis, hinUndZurueck } = eingabe;
  if (strecke <= 0 || verbrauch <= 0 || spritpreis <= 0) return null;

  const effektiveStrecke = hinUndZurueck ? strecke * 2 : strecke;
  const literGesamt = (effektiveStrecke / 100) * verbrauch;
  const gesamtkosten = literGesamt * spritpreis;
  const kostenProKm = gesamtkosten / effektiveStrecke;

  return {
    gesamtkosten: Math.round(gesamtkosten * 100) / 100,
    literGesamt: Math.round(literGesamt * 100) / 100,
    kostenProKm: Math.round(kostenProKm * 100) / 100,
    effektiveStrecke,
  };
}
