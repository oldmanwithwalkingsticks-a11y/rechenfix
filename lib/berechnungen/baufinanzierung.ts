export interface BaufinanzierungEingabe {
  kaufpreis: number;
  eigenkapital: number;
  bundesland: string;
  sollzins: number;        // % p.a.
  tilgung: number;         // % p.a.
  zinsbindungJahre: number;
  sondertilgungMonat: number;
  nebenkostenEinrechnen: boolean;
}

export interface Nebenkosten {
  grunderwerbsteuer: number;
  grunderwerbsteuerSatz: number;
  notar: number;
  makler: number;
  gesamt: number;
}

export interface TilgungsJahr {
  jahr: number;
  rateGesamt: number;
  zinsanteil: number;
  tilgungsanteil: number;
  sondertilgung: number;
  restschuld: number;
}

export interface BaufinanzierungErgebnis {
  kaufpreis: number;
  nebenkosten: Nebenkosten;
  gesamtkosten: number;
  eigenkapital: number;
  eigenkapitalQuote: number;
  darlehen: number;
  beleihungsauslauf: number;
  monatsrate: number;
  jahresrate: number;
  restschuldNachZinsbindung: number;
  gezahlteZinsenZinsbindung: number;
  gezahlteTilgungZinsbindung: number;
  gesamtlaufzeitJahre: number;
  tilgungsplan: TilgungsJahr[];
  // Warnungen
  warnungen: string[];
}

const GRUNDERWERBSTEUER: Record<string, number> = {
  'bayern': 3.5,
  'sachsen': 3.5,
  'hamburg': 5.5,
  'baden-wuerttemberg': 5.0,
  'niedersachsen': 5.0,
  'rheinland-pfalz': 5.0,
  'bremen': 5.0,
  'sachsen-anhalt': 5.0,
  'thueringen': 5.0,
  'hessen': 6.0,
  'mecklenburg-vorpommern': 6.0,
  'berlin': 6.0,
  'nordrhein-westfalen': 6.5,
  'saarland': 6.5,
  'brandenburg': 6.5,
  'schleswig-holstein': 6.5,
};

const NOTAR_SATZ = 2.0;
const MAKLER_SATZ = 3.57;

export const BUNDESLAENDER = [
  { key: 'baden-wuerttemberg', label: 'Baden-Württemberg', satz: 5.0 },
  { key: 'bayern', label: 'Bayern', satz: 3.5 },
  { key: 'berlin', label: 'Berlin', satz: 6.0 },
  { key: 'brandenburg', label: 'Brandenburg', satz: 6.5 },
  { key: 'bremen', label: 'Bremen', satz: 5.0 },
  { key: 'hamburg', label: 'Hamburg', satz: 5.5 },
  { key: 'hessen', label: 'Hessen', satz: 6.0 },
  { key: 'mecklenburg-vorpommern', label: 'Mecklenburg-Vorpommern', satz: 6.0 },
  { key: 'niedersachsen', label: 'Niedersachsen', satz: 5.0 },
  { key: 'nordrhein-westfalen', label: 'Nordrhein-Westfalen', satz: 6.5 },
  { key: 'rheinland-pfalz', label: 'Rheinland-Pfalz', satz: 5.0 },
  { key: 'saarland', label: 'Saarland', satz: 6.5 },
  { key: 'sachsen', label: 'Sachsen', satz: 3.5 },
  { key: 'sachsen-anhalt', label: 'Sachsen-Anhalt', satz: 5.0 },
  { key: 'schleswig-holstein', label: 'Schleswig-Holstein', satz: 6.5 },
  { key: 'thueringen', label: 'Thüringen', satz: 5.0 },
];

export function berechneBaufinanzierung(eingabe: BaufinanzierungEingabe): BaufinanzierungErgebnis | null {
  const { kaufpreis, eigenkapital, bundesland, sollzins, tilgung, zinsbindungJahre, sondertilgungMonat, nebenkostenEinrechnen } = eingabe;

  if (kaufpreis <= 0 || eigenkapital < 0 || sollzins < 0 || tilgung <= 0) return null;

  // Nebenkosten
  const grStSatz = GRUNDERWERBSTEUER[bundesland] || 5.0;
  const grunderwerbsteuer = kaufpreis * grStSatz / 100;
  const notar = kaufpreis * NOTAR_SATZ / 100;
  const makler = kaufpreis * MAKLER_SATZ / 100;
  const nebenkostenGesamt = grunderwerbsteuer + notar + makler;

  const nebenkosten: Nebenkosten = {
    grunderwerbsteuer,
    grunderwerbsteuerSatz: grStSatz,
    notar,
    makler,
    gesamt: nebenkostenGesamt,
  };

  // Darlehensbedarf
  const gesamtkosten = nebenkostenEinrechnen ? kaufpreis + nebenkostenGesamt : kaufpreis;
  const darlehen = Math.max(0, gesamtkosten - eigenkapital);

  if (darlehen <= 0) return null;

  const eigenkapitalQuote = (eigenkapital / gesamtkosten) * 100;
  const beleihungsauslauf = (darlehen / kaufpreis) * 100;

  // Monatsrate (Annuität)
  const jahresRate = darlehen * (sollzins + tilgung) / 100;
  const monatsrate = jahresRate / 12;

  const monatszins = sollzins / 100 / 12;
  const zinsbindungMonate = zinsbindungJahre * 12;

  // Tilgungsplan Monat für Monat
  let restschuld = darlehen;
  let gezahlteZinsen = 0;
  let gezahlteTilgung = 0;
  const tilgungsplan: TilgungsJahr[] = [];
  let monatsDaten = { rateGesamt: 0, zinsanteil: 0, tilgungsanteil: 0, sondertilgung: 0 };
  let gesamtlaufzeitMonate = 0;

  // Berechne bis Restschuld 0 oder max 600 Monate (50 Jahre)
  const maxMonate = 600;
  for (let m = 1; m <= maxMonate && restschuld > 0.01; m++) {
    const zinsanteil = restschuld * monatszins;
    let tilgungsanteil = monatsrate - zinsanteil;
    let stMonat = sondertilgungMonat;

    // Letzte Rate anpassen
    if (restschuld < tilgungsanteil + stMonat) {
      tilgungsanteil = Math.min(tilgungsanteil, restschuld);
      stMonat = Math.max(0, restschuld - tilgungsanteil);
    }

    restschuld = Math.max(0, restschuld - tilgungsanteil - stMonat);

    if (m <= zinsbindungMonate) {
      gezahlteZinsen += zinsanteil;
      gezahlteTilgung += tilgungsanteil + stMonat;
    }

    monatsDaten.rateGesamt += zinsanteil + tilgungsanteil;
    monatsDaten.zinsanteil += zinsanteil;
    monatsDaten.tilgungsanteil += tilgungsanteil;
    monatsDaten.sondertilgung += stMonat;

    // Am Jahresende oder am Ende der Laufzeit: Jahreszeile speichern
    if (m % 12 === 0 || restschuld <= 0.01) {
      tilgungsplan.push({
        jahr: Math.ceil(m / 12),
        rateGesamt: monatsDaten.rateGesamt,
        zinsanteil: monatsDaten.zinsanteil,
        tilgungsanteil: monatsDaten.tilgungsanteil,
        sondertilgung: monatsDaten.sondertilgung,
        restschuld: Math.max(0, restschuld),
      });
      monatsDaten = { rateGesamt: 0, zinsanteil: 0, tilgungsanteil: 0, sondertilgung: 0 };
    }

    gesamtlaufzeitMonate = m;

    // Restschuld nach Zinsbindung merken
    if (m === zinsbindungMonate) {
      // wird unten gesetzt
    }
  }

  // Restschuld nach Zinsbindung aus dem Plan lesen
  let restschuldNachZinsbindung = 0;
  const zinsbindungJahrIndex = tilgungsplan.findIndex(j => j.jahr === zinsbindungJahre);
  if (zinsbindungJahrIndex >= 0) {
    restschuldNachZinsbindung = tilgungsplan[zinsbindungJahrIndex].restschuld;
  } else if (tilgungsplan.length > 0) {
    restschuldNachZinsbindung = tilgungsplan[tilgungsplan.length - 1].restschuld;
  }

  const gesamtlaufzeitJahre = Math.round(gesamtlaufzeitMonate / 12 * 10) / 10;

  // Warnungen
  const warnungen: string[] = [];
  if (eigenkapitalQuote < 10) {
    warnungen.push('ekNiedrig');
  }
  if (tilgung < 2) {
    warnungen.push('tilgungNiedrig');
  }

  return {
    kaufpreis,
    nebenkosten,
    gesamtkosten,
    eigenkapital,
    eigenkapitalQuote,
    darlehen,
    beleihungsauslauf,
    monatsrate,
    jahresrate: jahresRate,
    restschuldNachZinsbindung,
    gezahlteZinsenZinsbindung: gezahlteZinsen,
    gezahlteTilgungZinsbindung: gezahlteTilgung,
    gesamtlaufzeitJahre,
    tilgungsplan,
    warnungen,
  };
}
