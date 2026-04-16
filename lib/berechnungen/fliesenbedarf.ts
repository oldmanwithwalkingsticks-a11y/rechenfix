export interface FliesenbedarfEingabe {
  flaecheQm: number;
  flieseLaengeCm: number;
  flieseBreiteCm: number;
  verschnittProzent: number;
  fliesenpreisProQm: number;
}

export interface FliesenbedarfErgebnis {
  fliesenProQm: number;
  anzahlFliesen: number;
  flaecheMitVerschnitt: number;
  kleberKg: number;
  kleberSaecke: number;
  fugenmassKg: number;
  fugenmassGebinde: number;
  kostenFliesen: number;
  kostenKleber: number;
  kostenFugenmasse: number;
  gesamtkosten: number;
}

const KLEBER_KG_PRO_QM = 4;
const KLEBER_SACK_KG = 25;
const KLEBER_PREIS_PRO_SACK = 18;
const FUGENMASS_KG_PRO_QM = 0.75;
const FUGENMASS_GEBINDE_KG = 5;
const FUGENMASS_PREIS_PRO_GEBINDE = 12;

export function berechneFliesenbedarf(e: FliesenbedarfEingabe): FliesenbedarfErgebnis {
  const fliesenProQm = (e.flieseLaengeCm > 0 && e.flieseBreiteCm > 0)
    ? 10000 / (e.flieseLaengeCm * e.flieseBreiteCm)
    : 0;

  const verschnittFaktor = 1 + e.verschnittProzent / 100;
  const flaecheMitVerschnitt = e.flaecheQm * verschnittFaktor;

  const anzahlFliesen = Math.ceil(e.flaecheQm * fliesenProQm * verschnittFaktor);

  const kleberKg = e.flaecheQm * KLEBER_KG_PRO_QM;
  const kleberSaecke = Math.ceil(kleberKg / KLEBER_SACK_KG);

  const fugenmassKg = e.flaecheQm * FUGENMASS_KG_PRO_QM;
  const fugenmassGebinde = Math.ceil(fugenmassKg / FUGENMASS_GEBINDE_KG);

  const kostenFliesen = flaecheMitVerschnitt * e.fliesenpreisProQm;
  const kostenKleber = kleberSaecke * KLEBER_PREIS_PRO_SACK;
  const kostenFugenmasse = fugenmassGebinde * FUGENMASS_PREIS_PRO_GEBINDE;
  const gesamtkosten = kostenFliesen + kostenKleber + kostenFugenmasse;

  return {
    fliesenProQm,
    anzahlFliesen,
    flaecheMitVerschnitt,
    kleberKg,
    kleberSaecke,
    fugenmassKg,
    fugenmassGebinde,
    kostenFliesen,
    kostenKleber,
    kostenFugenmasse,
    gesamtkosten,
  };
}
