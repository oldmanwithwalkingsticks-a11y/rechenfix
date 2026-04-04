export type Bundesland = typeof BUNDESLAENDER[number]['key'];

export const BUNDESLAENDER = [
  { key: 'bw', name: 'Baden-Württemberg', satz: 5.0 },
  { key: 'by', name: 'Bayern', satz: 3.5 },
  { key: 'be', name: 'Berlin', satz: 6.0 },
  { key: 'bb', name: 'Brandenburg', satz: 6.5 },
  { key: 'hb', name: 'Bremen', satz: 5.0 },
  { key: 'hh', name: 'Hamburg', satz: 5.5 },
  { key: 'he', name: 'Hessen', satz: 6.0 },
  { key: 'mv', name: 'Mecklenburg-Vorpommern', satz: 6.0 },
  { key: 'ni', name: 'Niedersachsen', satz: 5.0 },
  { key: 'nw', name: 'Nordrhein-Westfalen', satz: 6.5 },
  { key: 'rp', name: 'Rheinland-Pfalz', satz: 5.0 },
  { key: 'sl', name: 'Saarland', satz: 6.5 },
  { key: 'sn', name: 'Sachsen', satz: 5.5 },
  { key: 'st', name: 'Sachsen-Anhalt', satz: 5.0 },
  { key: 'sh', name: 'Schleswig-Holstein', satz: 6.5 },
  { key: 'th', name: 'Thüringen', satz: 5.0 },
] as const;

export interface GrunderwerbsteuerEingabe {
  kaufpreis: number;
  bundesland: string;
  maklerProvision: number;  // % inkl. MwSt
  notarkosten: number;      // % (ca. 1.5-2%)
  grundbuch: number;        // % (ca. 0.5%)
}

export interface GrunderwerbsteuerErgebnis {
  grunderwerbsteuer: number;
  steuersatz: number;
  makler: number;
  notar: number;
  grundbuch: number;
  nebenkostenGesamt: number;
  gesamtkosten: number;
  nebenkostenProzent: number;
  bundeslandName: string;
}

export function berechneGrunderwerbsteuer(eingabe: GrunderwerbsteuerEingabe): GrunderwerbsteuerErgebnis | null {
  const { kaufpreis, bundesland, maklerProvision, notarkosten, grundbuch } = eingabe;
  if (kaufpreis <= 0) return null;

  const bl = BUNDESLAENDER.find(b => b.key === bundesland);
  if (!bl) return null;

  const steuersatz = bl.satz;
  const grunderwerbsteuer = kaufpreis * (steuersatz / 100);
  const makler = kaufpreis * (maklerProvision / 100);
  const notar = kaufpreis * (notarkosten / 100);
  const grundbuchKosten = kaufpreis * (grundbuch / 100);
  const nebenkostenGesamt = grunderwerbsteuer + makler + notar + grundbuchKosten;
  const gesamtkosten = kaufpreis + nebenkostenGesamt;
  const nebenkostenProzent = (nebenkostenGesamt / kaufpreis) * 100;

  return {
    grunderwerbsteuer: Math.round(grunderwerbsteuer * 100) / 100,
    steuersatz,
    makler: Math.round(makler * 100) / 100,
    notar: Math.round(notar * 100) / 100,
    grundbuch: Math.round(grundbuchKosten * 100) / 100,
    nebenkostenGesamt: Math.round(nebenkostenGesamt * 100) / 100,
    gesamtkosten: Math.round(gesamtkosten * 100) / 100,
    nebenkostenProzent: Math.round(nebenkostenProzent * 10) / 10,
    bundeslandName: bl.name,
  };
}
