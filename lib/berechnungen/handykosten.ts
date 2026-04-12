export interface HandykostenEingabe {
  tarifpreis: number;
  vertragslaufzeit: number; // Monate: 1, 12 oder 24
  geraetepreis: number;
  hatRaten: boolean;
  monatlicheRate: number;
  zusatzoptionen: number;
  datenvolumen: number;
  aktuellerAnbieter: number; // 0 = kein Vergleich
}

export interface HandykostenErgebnis {
  effektiveMonatskosten: number;
  geraetekostenProMonat: number;
  jahreskosten: number;
  gesamtkosten: number;
  kostenProGb: number;
  ersparnisMontlich: number | null;
  ersparnisJaehrlich: number | null;
  istGuenstiger: boolean | null;
  aufschluesselung: { label: string; betrag: number; farbe: string }[];
}

export function berechneHandykosten(e: HandykostenEingabe): HandykostenErgebnis {
  // Gerätekosten pro Monat
  let geraetekostenProMonat = 0;
  if (e.hatRaten) {
    geraetekostenProMonat = e.monatlicheRate;
  } else if (e.geraetepreis > 0 && e.vertragslaufzeit > 0) {
    geraetekostenProMonat = e.geraetepreis / e.vertragslaufzeit;
  }

  const effektiveMonatskosten = e.tarifpreis + e.zusatzoptionen + geraetekostenProMonat;
  const jahreskosten = effektiveMonatskosten * 12;
  const gesamtkosten = effektiveMonatskosten * e.vertragslaufzeit;
  const kostenProGb = e.datenvolumen > 0 ? effektiveMonatskosten / e.datenvolumen : 0;

  // Vergleich mit aktuellem Anbieter
  let ersparnisMontlich: number | null = null;
  let ersparnisJaehrlich: number | null = null;
  let istGuenstiger: boolean | null = null;
  if (e.aktuellerAnbieter > 0) {
    ersparnisMontlich = e.aktuellerAnbieter - effektiveMonatskosten;
    ersparnisJaehrlich = ersparnisMontlich * 12;
    istGuenstiger = ersparnisMontlich > 0;
  }

  // Aufschlüsselung für Balkendiagramm
  const aufschluesselung: { label: string; betrag: number; farbe: string }[] = [];
  if (e.tarifpreis > 0) {
    aufschluesselung.push({ label: 'Tarif', betrag: e.tarifpreis, farbe: 'bg-primary-500' });
  }
  if (geraetekostenProMonat > 0) {
    aufschluesselung.push({ label: 'Gerät', betrag: geraetekostenProMonat, farbe: 'bg-accent-500' });
  }
  if (e.zusatzoptionen > 0) {
    aufschluesselung.push({ label: 'Zusatzoptionen', betrag: e.zusatzoptionen, farbe: 'bg-purple-500' });
  }

  return {
    effektiveMonatskosten,
    geraetekostenProMonat,
    jahreskosten,
    gesamtkosten,
    kostenProGb,
    ersparnisMontlich,
    ersparnisJaehrlich,
    istGuenstiger,
    aufschluesselung,
  };
}
