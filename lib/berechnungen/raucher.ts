export interface RaucherEingabe {
  zigarettenProTag: number;
  preisProPackung: number;
  zigarettenProPackung: number;
  jahreGeraucht: number;
}

export interface RaucherErgebnis {
  kostenProTag: number;
  kostenProWoche: number;
  kostenProMonat: number;
  kostenProJahr: number;
  kostenGesamt: number;
  kostenNaechste10Jahre: number;
  zigarettenProJahr: number;
  zigarettenGesamt: number;
  anzahlUrlaube: number;
  anzahlIphones: number;
  reichtFuerKleinwagen: boolean;
  investmentWert: number;
}

const URLAUB_PREIS = 2000;
const IPHONE_PREIS = 1200;
const KLEINWAGEN_SCHWELLE = 15000;
const RENDITE = 0.05; // 5% p.a.

export function berechneRaucherKosten(eingabe: RaucherEingabe): RaucherErgebnis {
  const preisProZigarette = eingabe.preisProPackung / eingabe.zigarettenProPackung;
  const kostenProTag = eingabe.zigarettenProTag * preisProZigarette;
  const kostenProWoche = kostenProTag * 7;
  const kostenProMonat = kostenProTag * 30.44; // Durchschnittliche Tage pro Monat
  const kostenProJahr = kostenProTag * 365.25;
  const kostenGesamt = kostenProJahr * eingabe.jahreGeraucht;
  const kostenNaechste10Jahre = kostenProJahr * 10;

  const zigarettenProJahr = Math.round(eingabe.zigarettenProTag * 365.25);
  const zigarettenGesamt = Math.round(eingabe.zigarettenProTag * 365.25 * eingabe.jahreGeraucht);

  const anzahlUrlaube = Math.floor(kostenGesamt / URLAUB_PREIS);
  const anzahlIphones = Math.floor(kostenGesamt / IPHONE_PREIS);
  const reichtFuerKleinwagen = kostenGesamt >= KLEINWAGEN_SCHWELLE;

  // Investment-Berechnung: monatliche Sparrate mit 5% Rendite über die gerauchten Jahre
  // Formel: FV = PMT × ((1+r)^n - 1) / r, wobei r = monatlicher Zins, n = Monate
  const monatlicheRate = kostenProMonat;
  const monatszins = RENDITE / 12;
  const monate = eingabe.jahreGeraucht * 12;
  const investmentWert = monatszins > 0
    ? monatlicheRate * ((Math.pow(1 + monatszins, monate) - 1) / monatszins)
    : monatlicheRate * monate;

  return {
    kostenProTag,
    kostenProWoche,
    kostenProMonat,
    kostenProJahr,
    kostenGesamt,
    kostenNaechste10Jahre,
    zigarettenProJahr,
    zigarettenGesamt,
    anzahlUrlaube,
    anzahlIphones,
    reichtFuerKleinwagen,
    investmentWert,
  };
}
