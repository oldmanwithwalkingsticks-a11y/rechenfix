export type TrinkgeldModus = 'prozent' | 'betrag';

export interface TrinkgeldEingabe {
  rechnungsbetrag: number;
  modus: TrinkgeldModus;
  trinkgeldProzent: number;
  trinkgeldBetrag: number;
  personen: number;
  aufrunden: boolean;
}

export interface TrinkgeldVergleich {
  prozent: number;
  betrag: number;
  gesamt: number;
  proPerson: number;
}

export interface TrinkgeldErgebnis {
  rechnungsbetrag: number;
  trinkgeldBetrag: number;
  trinkgeldProzent: number;
  gesamtbetrag: number;
  proPerson: number;
  aufgerundet: boolean;
  vergleich: TrinkgeldVergleich[];
}

export function berechneTriinkgeld(eingabe: TrinkgeldEingabe): TrinkgeldErgebnis | null {
  const { rechnungsbetrag, modus, trinkgeldProzent, trinkgeldBetrag, personen, aufrunden } = eingabe;

  if (rechnungsbetrag <= 0 || personen < 1) return null;

  let tgBetrag: number;
  let tgProzent: number;

  if (modus === 'prozent') {
    tgProzent = trinkgeldProzent;
    tgBetrag = rechnungsbetrag * tgProzent / 100;
  } else {
    tgBetrag = trinkgeldBetrag;
    tgProzent = rechnungsbetrag > 0 ? (tgBetrag / rechnungsbetrag) * 100 : 0;
  }

  let gesamtbetrag = rechnungsbetrag + tgBetrag;
  let aufgerundet = false;

  if (aufrunden && gesamtbetrag % 1 !== 0) {
    gesamtbetrag = Math.ceil(gesamtbetrag);
    tgBetrag = gesamtbetrag - rechnungsbetrag;
    tgProzent = rechnungsbetrag > 0 ? (tgBetrag / rechnungsbetrag) * 100 : 0;
    aufgerundet = true;
  }

  const proPerson = gesamtbetrag / personen;

  // Vergleichstabelle
  const vergleichProzente = [5, 10, 15, 20];
  const vergleich: TrinkgeldVergleich[] = vergleichProzente.map(p => {
    const b = rechnungsbetrag * p / 100;
    const g = rechnungsbetrag + b;
    return {
      prozent: p,
      betrag: Math.round(b * 100) / 100,
      gesamt: Math.round(g * 100) / 100,
      proPerson: Math.round((g / personen) * 100) / 100,
    };
  });

  return {
    rechnungsbetrag,
    trinkgeldBetrag: Math.round(tgBetrag * 100) / 100,
    trinkgeldProzent: Math.round(tgProzent * 10) / 10,
    gesamtbetrag: Math.round(gesamtbetrag * 100) / 100,
    proPerson: Math.round(proPerson * 100) / 100,
    aufgerundet,
    vergleich,
  };
}
