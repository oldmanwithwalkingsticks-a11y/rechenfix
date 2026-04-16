export interface StadtTarif {
  id: string;
  name: string;
  grundTag: number;
  grundNacht: number;
  kmTag1: number; // bis km 7
  kmNacht1: number;
  kmTag2: number; // ab km 8
  kmNacht2: number;
  kmSchwelle: number;
  warteMinute: number;
}

export const TARIFE: StadtTarif[] = [
  { id: 'durchschnitt', name: 'Durchschnitt Deutschland', grundTag: 3.90, grundNacht: 4.50, kmTag1: 2.20, kmNacht1: 2.40, kmTag2: 1.80, kmNacht2: 2.00, kmSchwelle: 7, warteMinute: 0.50 },
  { id: 'berlin', name: 'Berlin', grundTag: 3.90, grundNacht: 3.90, kmTag1: 2.30, kmNacht1: 2.30, kmTag2: 1.65, kmNacht2: 1.65, kmSchwelle: 7, warteMinute: 0.55 },
  { id: 'muenchen', name: 'München', grundTag: 4.70, grundNacht: 4.70, kmTag1: 2.20, kmNacht1: 2.20, kmTag2: 2.00, kmNacht2: 2.00, kmSchwelle: 5, warteMinute: 0.50 },
  { id: 'hamburg', name: 'Hamburg', grundTag: 3.80, grundNacht: 3.80, kmTag1: 2.45, kmNacht1: 2.45, kmTag2: 2.25, kmNacht2: 2.25, kmSchwelle: 4, warteMinute: 0.50 },
  { id: 'koeln', name: 'Köln', grundTag: 4.00, grundNacht: 4.00, kmTag1: 2.10, kmNacht1: 2.30, kmTag2: 1.90, kmNacht2: 2.10, kmSchwelle: 7, warteMinute: 0.50 },
  { id: 'frankfurt', name: 'Frankfurt', grundTag: 3.80, grundNacht: 3.80, kmTag1: 2.30, kmNacht1: 2.30, kmTag2: 2.10, kmNacht2: 2.10, kmSchwelle: 5, warteMinute: 0.55 },
  { id: 'stuttgart', name: 'Stuttgart', grundTag: 3.70, grundNacht: 3.70, kmTag1: 2.50, kmNacht1: 2.50, kmTag2: 2.30, kmNacht2: 2.30, kmSchwelle: 3, warteMinute: 0.50 },
  { id: 'duesseldorf', name: 'Düsseldorf', grundTag: 3.50, grundNacht: 3.50, kmTag1: 2.20, kmNacht1: 2.40, kmTag2: 2.00, kmNacht2: 2.20, kmSchwelle: 7, warteMinute: 0.50 },
];

export interface TaxiErgebnis {
  stadt: StadtTarif;
  strecke: number;
  nacht: boolean;
  wartezeit: number;
  grundgebuehr: number;
  streckenkosten: number;
  wartekosten: number;
  fahrpreis: number;
  trinkgeld: number;
  gesamtMitTrinkgeld: number;
  kmPreisDurchschnitt: number;
}

export function berechneTaxi(
  stadtId: string,
  strecke: number,
  nacht: boolean,
  wartezeit: number
): TaxiErgebnis | null {
  if (strecke <= 0) return null;
  const stadt = TARIFE.find(t => t.id === stadtId);
  if (!stadt) return null;

  const grundgebuehr = nacht ? stadt.grundNacht : stadt.grundTag;
  const kmPreis1 = nacht ? stadt.kmNacht1 : stadt.kmTag1;
  const kmPreis2 = nacht ? stadt.kmNacht2 : stadt.kmTag2;

  let streckenkosten: number;
  if (strecke <= stadt.kmSchwelle) {
    streckenkosten = strecke * kmPreis1;
  } else {
    streckenkosten = stadt.kmSchwelle * kmPreis1 + (strecke - stadt.kmSchwelle) * kmPreis2;
  }
  streckenkosten = Math.round(streckenkosten * 100) / 100;

  const wartekosten = Math.round(wartezeit * stadt.warteMinute * 100) / 100;
  const fahrpreis = Math.round((grundgebuehr + streckenkosten + wartekosten) * 100) / 100;
  const trinkgeld = Math.round(fahrpreis * 0.1 * 100) / 100;
  const gesamtMitTrinkgeld = Math.round((fahrpreis + trinkgeld) * 100) / 100;
  const kmPreisDurchschnitt = strecke > 0 ? Math.round((streckenkosten / strecke) * 100) / 100 : 0;

  return {
    stadt,
    strecke,
    nacht,
    wartezeit,
    grundgebuehr,
    streckenkosten,
    wartekosten,
    fahrpreis,
    trinkgeld,
    gesamtMitTrinkgeld,
    kmPreisDurchschnitt,
  };
}
