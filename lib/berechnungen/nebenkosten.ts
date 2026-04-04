export interface NebenkostenEingabe {
  kaltmiete: number;
  wohnflaeche: number;     // m²
  personenAnzahl: number;
  heizkosten: number;      // €/Monat
  warmwasser: number;      // €/Monat
  wasser: number;          // €/Monat
  muell: number;           // €/Monat
  grundsteuer: number;     // €/Monat
  versicherung: number;    // €/Monat
  hauswart: number;        // €/Monat
  sonstige: number;        // €/Monat
}

export interface NebenkostenErgebnis {
  nebenkostenMonat: number;
  nebenkostenJahr: number;
  warmmiete: number;
  nebenkostenProQm: number;
  warmmieteProQm: number;
  anteilAnWarmmiete: number;
  aufschluesselung: { label: string; betrag: number }[];
}

export function berechneNebenkosten(eingabe: NebenkostenEingabe): NebenkostenErgebnis | null {
  const { kaltmiete, wohnflaeche, heizkosten, warmwasser, wasser, muell, grundsteuer, versicherung, hauswart, sonstige } = eingabe;
  if (kaltmiete < 0 || wohnflaeche <= 0) return null;

  const posten = [
    { label: 'Heizkosten', betrag: heizkosten },
    { label: 'Warmwasser', betrag: warmwasser },
    { label: 'Wasser/Abwasser', betrag: wasser },
    { label: 'Müllentsorgung', betrag: muell },
    { label: 'Grundsteuer', betrag: grundsteuer },
    { label: 'Gebäudeversicherung', betrag: versicherung },
    { label: 'Hauswart/Hausmeister', betrag: hauswart },
    { label: 'Sonstige', betrag: sonstige },
  ];

  const aufschluesselung = posten.filter(p => p.betrag > 0);
  const nebenkostenMonat = posten.reduce((sum, p) => sum + Math.max(0, p.betrag), 0);
  const nebenkostenJahr = nebenkostenMonat * 12;
  const warmmiete = kaltmiete + nebenkostenMonat;
  const nebenkostenProQm = nebenkostenMonat / wohnflaeche;
  const warmmieteProQm = warmmiete / wohnflaeche;
  const anteilAnWarmmiete = warmmiete > 0 ? (nebenkostenMonat / warmmiete) * 100 : 0;

  return {
    nebenkostenMonat: Math.round(nebenkostenMonat * 100) / 100,
    nebenkostenJahr: Math.round(nebenkostenJahr * 100) / 100,
    warmmiete: Math.round(warmmiete * 100) / 100,
    nebenkostenProQm: Math.round(nebenkostenProQm * 100) / 100,
    warmmieteProQm: Math.round(warmmieteProQm * 100) / 100,
    anteilAnWarmmiete: Math.round(anteilAnWarmmiete * 10) / 10,
    aufschluesselung,
  };
}
