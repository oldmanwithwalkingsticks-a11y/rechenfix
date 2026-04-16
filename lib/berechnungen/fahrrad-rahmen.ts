export interface RahmengroesseErgebnis {
  koerpergroesse: number;
  schrittlaenge: number;
  schrittlaengeGeschaetzt: boolean;
  fahrradtyp: string;
  fahrradtypLabel: string;
  rahmenhoeheCm: number;
  rahmenhoehZoll: number;
  toleranzMin: number;
  toleranzMax: number;
  buchstabengroesse: string;
}

const FAKTOREN: Record<string, { faktor: number; label: string }> = {
  city: { faktor: 0.66, label: 'City/Trekking' },
  rennrad: { faktor: 0.665, label: 'Rennrad' },
  mtb: { faktor: 0.574, label: 'Mountainbike' },
  ebike: { faktor: 0.66, label: 'E-Bike' },
};

function buchstabengroesse(cm: number, typ: string): string {
  // Größenzuordnung je nach Fahrradtyp
  if (typ === 'mtb') {
    if (cm < 38) return 'XS';
    if (cm < 42) return 'S';
    if (cm < 47) return 'M';
    if (cm < 52) return 'L';
    if (cm < 56) return 'XL';
    return 'XXL';
  }
  // City/Trekking/Rennrad/E-Bike
  if (cm < 47) return 'XS';
  if (cm < 51) return 'S';
  if (cm < 55) return 'M';
  if (cm < 59) return 'L';
  if (cm < 63) return 'XL';
  return 'XXL';
}

export function berechneRahmengroesse(
  koerpergroesse: number,
  schrittlaengeInput: number | null,
  fahrradtyp: string
): RahmengroesseErgebnis | null {
  if (koerpergroesse <= 0) return null;
  const config = FAKTOREN[fahrradtyp];
  if (!config) return null;

  const schrittlaengeGeschaetzt = !schrittlaengeInput || schrittlaengeInput <= 0;
  const schrittlaenge = schrittlaengeGeschaetzt
    ? Math.round(koerpergroesse * 0.47)
    : schrittlaengeInput!;

  const rahmenhoeheCm = Math.round(schrittlaenge * config.faktor * 10) / 10;
  const rahmenhoehZoll = Math.round((rahmenhoeheCm / 2.54) * 10) / 10;

  return {
    koerpergroesse,
    schrittlaenge,
    schrittlaengeGeschaetzt,
    fahrradtyp,
    fahrradtypLabel: config.label,
    rahmenhoeheCm,
    rahmenhoehZoll,
    toleranzMin: Math.round((rahmenhoeheCm - 2) * 10) / 10,
    toleranzMax: Math.round((rahmenhoeheCm + 2) * 10) / 10,
    buchstabengroesse: buchstabengroesse(rahmenhoeheCm, fahrradtyp),
  };
}
