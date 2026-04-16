export interface LaminatEingabe {
  flaecheQm: number;
  paketGroesseQm: number;
  verschnittProzent: number;
  preisProPaket: number;
  raumLaengeM: number;
  raumBreiteM: number;
}

export interface LaminatErgebnis {
  benoetigteFlaecheQm: number;
  pakete: number;
  tatsaechlicheFlaecheQm: number;
  ueberschussQm: number;
  materialkosten: number;
  trittschalldaemmungQm: number;
  sockelleistenM: number;
  preisProQm: number;
}

export function berechneLaminat(e: LaminatEingabe): LaminatErgebnis {
  const verschnittFaktor = 1 + e.verschnittProzent / 100;
  const benoetigteFlaecheQm = e.flaecheQm * verschnittFaktor;

  const pakete = Math.ceil(benoetigteFlaecheQm / e.paketGroesseQm);
  const tatsaechlicheFlaecheQm = pakete * e.paketGroesseQm;
  const ueberschussQm = tatsaechlicheFlaecheQm - e.flaecheQm;

  const materialkosten = pakete * e.preisProPaket;
  const preisProQm = e.flaecheQm > 0 ? materialkosten / e.flaecheQm : 0;

  // Trittschalldämmung: Raumfläche + 5 % Überlappung
  const trittschalldaemmungQm = e.flaecheQm * 1.05;

  // Sockelleisten: Raumumfang + 10 % Reserve
  const umfang = (e.raumLaengeM > 0 && e.raumBreiteM > 0)
    ? 2 * (e.raumLaengeM + e.raumBreiteM)
    : 0;
  const sockelleistenM = umfang * 1.10;

  return {
    benoetigteFlaecheQm,
    pakete,
    tatsaechlicheFlaecheQm,
    ueberschussQm,
    materialkosten,
    trittschalldaemmungQm,
    sockelleistenM,
    preisProQm,
  };
}
