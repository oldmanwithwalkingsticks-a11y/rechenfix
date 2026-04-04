export interface MietpreisEingabe {
  kaltmiete: number;
  nebenkosten: number;
  wohnflaeche: number;
  nettoEinkommen: number;
}

export interface MietpreisErgebnis {
  warmmiete: number;
  kaltmieteProQm: number;
  warmmieteProQm: number;
  mietbelastung: number;     // % des Nettoeinkommens
  empfohlenMax: number;      // 30% des Nettoeinkommens
  mietbelastungOk: boolean;
  jahresmiete: number;
  restNachMiete: number;
}

export function berechneMietpreis(eingabe: MietpreisEingabe): MietpreisErgebnis | null {
  const { kaltmiete, nebenkosten, wohnflaeche, nettoEinkommen } = eingabe;
  if (kaltmiete < 0 || nebenkosten < 0 || wohnflaeche <= 0 || nettoEinkommen < 0) return null;
  if (kaltmiete === 0 && nebenkosten === 0) return null;

  const warmmiete = kaltmiete + nebenkosten;
  const kaltmieteProQm = kaltmiete / wohnflaeche;
  const warmmieteProQm = warmmiete / wohnflaeche;
  const mietbelastung = nettoEinkommen > 0 ? (warmmiete / nettoEinkommen) * 100 : 0;
  const empfohlenMax = nettoEinkommen * 0.3;
  const mietbelastungOk = warmmiete <= empfohlenMax;
  const jahresmiete = warmmiete * 12;
  const restNachMiete = nettoEinkommen - warmmiete;

  return {
    warmmiete: Math.round(warmmiete * 100) / 100,
    kaltmieteProQm: Math.round(kaltmieteProQm * 100) / 100,
    warmmieteProQm: Math.round(warmmieteProQm * 100) / 100,
    mietbelastung: Math.round(mietbelastung * 10) / 10,
    empfohlenMax: Math.round(empfohlenMax * 100) / 100,
    mietbelastungOk,
    jahresmiete: Math.round(jahresmiete * 100) / 100,
    restNachMiete: Math.round(restNachMiete * 100) / 100,
  };
}
