export interface EstrichErgebnis {
  material: 'estrich' | 'putz';
  materialTyp: string;
  materialTypLabel: string;
  flaeche: number;
  dickeMm: number;
  dickeM: number;
  dichte: number;
  volumen: number;
  gewichtKg: number;
  sackgewichtKg: number;
  anzahlSaecke: number;
  kostenProSack: number;
  kostenGesamt: number;
}

export const ESTRICH_TYPEN = [
  { id: 'zement', label: 'Zementestrich', dichte: 2000, sack: 40, preis: 8 },
  { id: 'fliess', label: 'Fließestrich', dichte: 1800, sack: 25, preis: 12 },
];

export const PUTZ_TYPEN = [
  { id: 'kalkzement', label: 'Kalkzement-Putz', dichte: 1600, sack: 30, preis: 9 },
  { id: 'gips', label: 'Gipsputz', dichte: 1200, sack: 30, preis: 7 },
];

export function berechneEstrich(
  material: 'estrich' | 'putz',
  materialTypId: string,
  flaeche: number,
  dickeMm: number
): EstrichErgebnis | null {
  if (flaeche <= 0 || dickeMm <= 0) return null;

  const typen = material === 'estrich' ? ESTRICH_TYPEN : PUTZ_TYPEN;
  const typ = typen.find(t => t.id === materialTypId);
  if (!typ) return null;

  const dickeM = dickeMm / 1000;
  const volumen = Math.round(flaeche * dickeM * 1000) / 1000;
  const gewichtKg = Math.round(volumen * typ.dichte);

  // +5% Reserve
  const gewichtMitReserve = Math.round(gewichtKg * 1.05);
  const anzahlSaecke = Math.ceil(gewichtMitReserve / typ.sack);
  const kostenGesamt = Math.round(anzahlSaecke * typ.preis * 100) / 100;

  return {
    material,
    materialTyp: materialTypId,
    materialTypLabel: typ.label,
    flaeche,
    dickeMm,
    dickeM,
    dichte: typ.dichte,
    volumen,
    gewichtKg,
    sackgewichtKg: typ.sack,
    anzahlSaecke,
    kostenProSack: typ.preis,
    kostenGesamt,
  };
}
