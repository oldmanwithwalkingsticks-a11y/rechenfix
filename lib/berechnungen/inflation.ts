export type InflationsModus = 'kaufkraft' | 'preisanstieg';

export interface InflationsEingabe {
  modus: InflationsModus;
  betrag: number;
  inflationsrate: number;
  zeitraum: number;
}

export interface InflationsJahr {
  jahr: number;
  wert: number;
  verlustKumuliert: number;
  verlustProzent: number;
}

export interface InflationsErgebnis {
  ergebnis: number;
  ausgangswert: number;
  differenz: number;
  differenzProzent: number;
  jaehrlicherVerlust: number;
  jahre: InflationsJahr[];
}

export function berechneInflation(eingabe: InflationsEingabe): InflationsErgebnis | null {
  const { modus, betrag, inflationsrate, zeitraum } = eingabe;

  if (betrag <= 0 || inflationsrate < 0 || zeitraum <= 0 || zeitraum > 100) return null;

  const rate = inflationsrate / 100;
  const jahre: InflationsJahr[] = [];

  if (modus === 'kaufkraft') {
    // Kaufkraftverlust: Realer Wert sinkt
    for (let j = 1; j <= Math.floor(zeitraum); j++) {
      const wert = betrag / Math.pow(1 + rate, j);
      const verlust = betrag - wert;
      jahre.push({
        jahr: j,
        wert: Math.round(wert * 100) / 100,
        verlustKumuliert: Math.round(verlust * 100) / 100,
        verlustProzent: Math.round((verlust / betrag) * 1000) / 10,
      });
    }

    const endwert = betrag / Math.pow(1 + rate, zeitraum);
    const differenz = betrag - endwert;

    return {
      ergebnis: Math.round(endwert * 100) / 100,
      ausgangswert: betrag,
      differenz: Math.round(differenz * 100) / 100,
      differenzProzent: Math.round((differenz / betrag) * 1000) / 10,
      jaehrlicherVerlust: Math.round((differenz / zeitraum) * 100) / 100,
      jahre,
    };
  } else {
    // Preisanstieg: Preis steigt
    for (let j = 1; j <= Math.floor(zeitraum); j++) {
      const wert = betrag * Math.pow(1 + rate, j);
      const anstieg = wert - betrag;
      jahre.push({
        jahr: j,
        wert: Math.round(wert * 100) / 100,
        verlustKumuliert: Math.round(anstieg * 100) / 100,
        verlustProzent: Math.round((anstieg / betrag) * 1000) / 10,
      });
    }

    const endpreis = betrag * Math.pow(1 + rate, zeitraum);
    const differenz = endpreis - betrag;

    return {
      ergebnis: Math.round(endpreis * 100) / 100,
      ausgangswert: betrag,
      differenz: Math.round(differenz * 100) / 100,
      differenzProzent: Math.round((differenz / betrag) * 1000) / 10,
      jaehrlicherVerlust: Math.round((differenz / zeitraum) * 100) / 100,
      jahre,
    };
  }
}
