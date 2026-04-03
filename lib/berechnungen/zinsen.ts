export interface ZinsEingabe {
  anfangskapital: number;
  zinssatz: number;       // in Prozent p.a.
  laufzeit: number;       // in Jahren
  zinseszins: boolean;
  sparrate: number;       // monatliche Sparrate in €
}

export interface ZinsJahr {
  jahr: number;
  kapitalAnfang: number;
  einzahlungen: number;
  zinsen: number;
  kapitalEnde: number;
}

export interface ZinsErgebnis {
  endkapital: number;
  gesamtzinsen: number;
  eigenkapital: number;
  jahre: ZinsJahr[];
}

export function berechneZinsen(eingabe: ZinsEingabe): ZinsErgebnis | null {
  const { anfangskapital, zinssatz, laufzeit, zinseszins, sparrate } = eingabe;
  if (laufzeit <= 0 || laufzeit > 100) return null;
  if (anfangskapital < 0 || zinssatz < 0 || sparrate < 0) return null;
  if (anfangskapital === 0 && sparrate === 0) return null;

  const r = zinssatz / 100; // Dezimalzins
  const jahre: ZinsJahr[] = [];
  let kapital = anfangskapital;
  let gesamtzinsen = 0;
  const jahresRate = sparrate * 12;

  for (let j = 1; j <= Math.floor(laufzeit); j++) {
    const kapitalAnfang = kapital;
    let zinsen: number;

    if (zinseszins) {
      // Zinsen auf aktuelles Kapital
      zinsen = kapital * r;
      // Sparrate: monatlich eingezahlt, vereinfacht als Jahresmitte-Ansatz
      // Genauer: Jede monatliche Rate wird anteilig verzinst
      if (sparrate > 0) {
        // Sparraten-Zinsen: Durchschnittlich 6,5 Monate Verzinsung im ersten Jahr
        let sparratenZinsen = 0;
        for (let m = 1; m <= 12; m++) {
          sparratenZinsen += sparrate * r * ((12 - m + 0.5) / 12);
        }
        zinsen += sparratenZinsen;
      }
      kapital += zinsen + jahresRate;
    } else {
      // Einfache Verzinsung: Zinsen immer auf Anfangskapital + bisherige Einzahlungen
      zinsen = (anfangskapital + (j - 1) * jahresRate + jahresRate / 2) * r;
      kapital = kapitalAnfang + jahresRate + zinsen;
    }

    zinsen = Math.round(zinsen * 100) / 100;
    kapital = Math.round(kapital * 100) / 100;
    gesamtzinsen += zinsen;

    jahre.push({
      jahr: j,
      kapitalAnfang: Math.round(kapitalAnfang * 100) / 100,
      einzahlungen: jahresRate,
      zinsen,
      kapitalEnde: kapital,
    });
  }

  const eigenkapital = anfangskapital + jahresRate * Math.floor(laufzeit);
  gesamtzinsen = Math.round(gesamtzinsen * 100) / 100;

  return {
    endkapital: kapital,
    gesamtzinsen,
    eigenkapital: Math.round(eigenkapital * 100) / 100,
    jahre,
  };
}
