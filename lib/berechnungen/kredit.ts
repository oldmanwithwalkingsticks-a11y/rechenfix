export interface KreditEingabe {
  kreditsumme: number;
  sollzins: number;       // p.a. in %
  laufzeitMonate: number;
  sondertilgung: number;  // monatlich in €
}

export interface TilgungsZeile {
  monat: number;
  rate: number;
  zinsanteil: number;
  tilgungsanteil: number;
  sondertilgung: number;
  restschuld: number;
}

export interface KreditErgebnis {
  monatsrate: number;
  gesamtkosten: number;
  gesamtzins: number;
  effektivzins: number;
  tatsaechlicheLaufzeit: number; // Monate
  tilgungsplan: TilgungsZeile[];
  // Bei Sondertilgung: Vergleichswerte
  zinsersparnis: number;
  monate_frueher: number;
}

export function berechneKredit(eingabe: KreditEingabe): KreditErgebnis | null {
  const { kreditsumme, sollzins, laufzeitMonate, sondertilgung } = eingabe;

  if (kreditsumme <= 0 || sollzins < 0 || laufzeitMonate <= 0) return null;

  const monatszins = sollzins / 100 / 12;

  // Effektiver Jahreszins
  const effektivzins = monatszins > 0
    ? (Math.pow(1 + monatszins, 12) - 1) * 100
    : 0;

  // Monatsrate (Annuitätenformel)
  let monatsrate: number;
  if (monatszins > 0) {
    const faktor = Math.pow(1 + monatszins, laufzeitMonate);
    monatsrate = kreditsumme * (monatszins * faktor) / (faktor - 1);
  } else {
    monatsrate = kreditsumme / laufzeitMonate;
  }

  // Gesamtkosten ohne Sondertilgung
  const gesamtkostenOhne = monatsrate * laufzeitMonate;
  const gesamtzinsOhne = gesamtkostenOhne - kreditsumme;

  // Monat-für-Monat-Berechnung
  const tilgungsplan: TilgungsZeile[] = [];
  let restschuld = kreditsumme;
  let gesamtzinsBezahlt = 0;
  let gesamtBezahlt = 0;

  for (let monat = 1; monat <= laufzeitMonate && restschuld > 0.01; monat++) {
    const zinsanteil = restschuld * monatszins;
    let tilgungsanteil = monatsrate - zinsanteil;
    let stMomat = sondertilgung;

    // Letzte Rate anpassen wenn Restschuld < normale Zahlung
    if (restschuld < tilgungsanteil + stMomat) {
      tilgungsanteil = Math.min(tilgungsanteil, restschuld);
      stMomat = Math.max(0, restschuld - tilgungsanteil);
    }

    const aktuelleRate = zinsanteil + tilgungsanteil;
    restschuld = Math.max(0, restschuld - tilgungsanteil - stMomat);
    gesamtzinsBezahlt += zinsanteil;
    gesamtBezahlt += aktuelleRate + stMomat;

    tilgungsplan.push({
      monat,
      rate: aktuelleRate,
      zinsanteil,
      tilgungsanteil,
      sondertilgung: stMomat,
      restschuld,
    });
  }

  const tatsaechlicheLaufzeit = tilgungsplan.length;

  // Vergleichswerte bei Sondertilgung
  let zinsersparnis = 0;
  let monate_frueher = 0;
  if (sondertilgung > 0) {
    zinsersparnis = gesamtzinsOhne - gesamtzinsBezahlt;
    monate_frueher = laufzeitMonate - tatsaechlicheLaufzeit;
  }

  return {
    monatsrate,
    gesamtkosten: sondertilgung > 0 ? gesamtBezahlt : gesamtkostenOhne,
    gesamtzins: gesamtzinsBezahlt,
    effektivzins,
    tatsaechlicheLaufzeit,
    tilgungsplan,
    zinsersparnis,
    monate_frueher,
  };
}
