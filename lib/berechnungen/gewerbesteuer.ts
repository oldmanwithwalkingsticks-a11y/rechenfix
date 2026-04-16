export type Rechtsform = 'personengesellschaft' | 'kapitalgesellschaft';

export interface GewerbesteuerEingabe {
  gewinn: number;
  rechtsform: Rechtsform;
  hebesatz: number;
  hinzurechnungen: number;
  kuerzungen: number;
}

export interface GewerbesteuerErgebnis {
  gewinn: number;
  hinzurechnungen: number;
  kuerzungen: number;
  freibetrag: number;
  gewerbeertrag: number;
  gewerbeertragAbgerundet: number;
  steuermesszahl: number;
  steuermessbetrag: number;
  hebesatz: number;
  gewerbesteuer: number;
  estAnrechnung: number;
  effektiveBelastung: number;
  effektiverSatz: number;
  hatAnrechnung: boolean;
}

const FREIBETRAG_PERSON = 24500;
const STEUERMESSZAHL = 3.5; // %
const MAX_ANRECHNUNGSFAKTOR = 4.0; // § 35 EStG

export function berechneGewerbesteuer(e: GewerbesteuerEingabe): GewerbesteuerErgebnis {
  const { gewinn, rechtsform, hebesatz, hinzurechnungen, kuerzungen } = e;

  const freibetrag = rechtsform === 'personengesellschaft' ? FREIBETRAG_PERSON : 0;

  // Gewerbeertrag vor Abrundung
  const gewerbeertragRoh = Math.max(0, gewinn + hinzurechnungen - kuerzungen - freibetrag);

  // Abrunden auf volle 100 €
  const gewerbeertragAbgerundet = Math.floor(gewerbeertragRoh / 100) * 100;

  // Steuermessbetrag
  const steuermessbetrag = Math.round(gewerbeertragAbgerundet * STEUERMESSZAHL) / 100;

  // Gewerbesteuer
  const gewerbesteuer = Math.round(steuermessbetrag * hebesatz) / 100;

  // ESt-Anrechnung nur bei Personengesellschaften (§ 35 EStG)
  const hatAnrechnung = rechtsform === 'personengesellschaft';
  let estAnrechnung = 0;
  if (hatAnrechnung) {
    // Anrechnung = Steuermessbetrag × min(Hebesatz, 400) / 100, max. Faktor 4,0
    const anrechnungsFaktor = Math.min(hebesatz / 100, MAX_ANRECHNUNGSFAKTOR);
    estAnrechnung = Math.round(steuermessbetrag * anrechnungsFaktor * 100) / 100;
    // Anrechnung kann nicht höher sein als die Gewerbesteuer selbst
    estAnrechnung = Math.min(estAnrechnung, gewerbesteuer);
  }

  const effektiveBelastung = Math.round((gewerbesteuer - estAnrechnung) * 100) / 100;
  const effektiverSatz = gewinn > 0
    ? Math.round(effektiveBelastung / gewinn * 10000) / 100
    : 0;

  return {
    gewinn,
    hinzurechnungen,
    kuerzungen,
    freibetrag,
    gewerbeertrag: gewerbeertragRoh,
    gewerbeertragAbgerundet,
    steuermesszahl: STEUERMESSZAHL,
    steuermessbetrag,
    hebesatz,
    gewerbesteuer,
    estAnrechnung,
    effektiveBelastung,
    effektiverSatz,
    hatAnrechnung,
  };
}
