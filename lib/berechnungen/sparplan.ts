export type Zinsintervall = 'monatlich' | 'jaehrlich';

export interface SparplanEingabe {
  anfangskapital: number;
  sparrate: number;
  zinssatz: number;
  sparzeit: number;
  dynamik: number;
  zinsintervall: Zinsintervall;
}

export interface SparplanJahr {
  jahr: number;
  sparrate: number;
  einzahlungJahr: number;
  einzahlungGesamt: number;
  zinsenJahr: number;
  zinsenGesamt: number;
  kapital: number;
}

export interface SparplanErgebnis {
  endkapital: number;
  eigenkapital: number;
  gesamtzinsen: number;
  zinsenAnteil: number;
  jahre: SparplanJahr[];
}

export function berechneSparplan(eingabe: SparplanEingabe): SparplanErgebnis | null {
  const { anfangskapital, sparrate, zinssatz, sparzeit, dynamik, zinsintervall } = eingabe;

  if (sparzeit <= 0 || sparzeit > 100) return null;
  if (anfangskapital < 0 || sparrate < 0 || zinssatz < 0 || dynamik < 0) return null;
  if (anfangskapital === 0 && sparrate === 0) return null;

  const jahre: SparplanJahr[] = [];
  let kapital = anfangskapital;
  let einzahlungGesamt = anfangskapital;
  let zinsenGesamt = 0;
  let aktuelleRate = sparrate;

  for (let j = 1; j <= Math.floor(sparzeit); j++) {
    let zinsenJahr = 0;
    const einzahlungJahr = aktuelleRate * 12;

    if (zinsintervall === 'monatlich') {
      const monatsZins = zinssatz / 100 / 12;
      for (let m = 1; m <= 12; m++) {
        kapital += aktuelleRate;
        const zinsen = kapital * monatsZins;
        kapital += zinsen;
        zinsenJahr += zinsen;
      }
    } else {
      // Jährlich: Sparraten monatlich einzahlen, Zinsen am Jahresende
      for (let m = 1; m <= 12; m++) {
        kapital += aktuelleRate;
      }
      const zinsen = kapital * (zinssatz / 100);
      kapital += zinsen;
      zinsenJahr = zinsen;
    }

    einzahlungGesamt += einzahlungJahr;
    zinsenGesamt += zinsenJahr;

    jahre.push({
      jahr: j,
      sparrate: Math.round(aktuelleRate * 100) / 100,
      einzahlungJahr: Math.round(einzahlungJahr * 100) / 100,
      einzahlungGesamt: Math.round(einzahlungGesamt * 100) / 100,
      zinsenJahr: Math.round(zinsenJahr * 100) / 100,
      zinsenGesamt: Math.round(zinsenGesamt * 100) / 100,
      kapital: Math.round(kapital * 100) / 100,
    });

    // Dynamik: Rate jährlich erhöhen
    if (dynamik > 0) {
      aktuelleRate = aktuelleRate * (1 + dynamik / 100);
    }
  }

  const endkapital = Math.round(kapital * 100) / 100;
  const eigenkapital = Math.round(einzahlungGesamt * 100) / 100;
  zinsenGesamt = Math.round(zinsenGesamt * 100) / 100;
  const zinsenAnteil = endkapital > 0 ? Math.round((zinsenGesamt / endkapital) * 1000) / 10 : 0;

  return {
    endkapital,
    eigenkapital,
    gesamtzinsen: zinsenGesamt,
    zinsenAnteil,
    jahre,
  };
}
