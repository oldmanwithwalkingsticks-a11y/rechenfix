export type Energietraeger = 'gas' | 'oel' | 'fernwaerme' | 'waermepumpe' | 'pellets';

export interface HeizkostenEingabe {
  wohnflaeche: number;
  energietraeger: Energietraeger;
  verbrauchProQm: number;  // kWh/m²/Jahr
  preisProKwh: number;     // Cent/kWh
}

export interface HeizkostenErgebnis {
  verbrauchGesamt: number;
  kostenJahr: number;
  kostenMonat: number;
  kostenProQm: number;
}

const DEFAULTS: Record<Energietraeger, { verbrauch: number; preis: number; label: string }> = {
  gas: { verbrauch: 140, preis: 12, label: 'Erdgas' },
  oel: { verbrauch: 150, preis: 13, label: 'Heizöl' },
  fernwaerme: { verbrauch: 120, preis: 14, label: 'Fernwärme' },
  waermepumpe: { verbrauch: 40, preis: 36, label: 'Wärmepumpe (Strom)' },
  pellets: { verbrauch: 130, preis: 8, label: 'Holzpellets' },
};

export function getEnergietraegerDefaults(e: Energietraeger) { return DEFAULTS[e]; }
export function getAlleEnergietraeger() {
  return Object.entries(DEFAULTS).map(([key, val]) => ({ key: key as Energietraeger, ...val }));
}

export function berechneHeizkosten(eingabe: HeizkostenEingabe): HeizkostenErgebnis | null {
  const { wohnflaeche, verbrauchProQm, preisProKwh } = eingabe;
  if (wohnflaeche <= 0 || verbrauchProQm < 0 || preisProKwh < 0) return null;

  const verbrauchGesamt = wohnflaeche * verbrauchProQm;
  const kostenJahr = verbrauchGesamt * (preisProKwh / 100);
  const kostenMonat = kostenJahr / 12;
  const kostenProQm = kostenJahr / wohnflaeche;

  return {
    verbrauchGesamt: Math.round(verbrauchGesamt),
    kostenJahr: Math.round(kostenJahr * 100) / 100,
    kostenMonat: Math.round(kostenMonat * 100) / 100,
    kostenProQm: Math.round(kostenProQm * 100) / 100,
  };
}
