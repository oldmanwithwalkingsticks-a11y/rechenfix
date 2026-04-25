import { getGrEStSatzByLongKey } from './grunderwerbsteuer';

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

const NOTAR_SATZ = 2.0;
const MAKLER_SATZ = 3.57;

/**
 * Bundesländer-Liste mit GrESt-Sätzen aus zentraler SSOT.
 * Lang-Keys (z. B. `'bayern'`, `'sachsen'`) bleiben aus historischen Gründen
 * (BaufinanzierungRechner-State, sitemap-Slugs) — die Sätze kommen aus
 * `lib/berechnungen/grunderwerbsteuer.ts` (Stand: Bremen 5,5 % seit 01.07.2025,
 * Sachsen 5,5 % seit 01.01.2023, Thüringen 5,0 % seit 01.01.2024).
 */
export const BUNDESLAENDER = [
  { key: 'baden-wuerttemberg', label: 'Baden-Württemberg' },
  { key: 'bayern', label: 'Bayern' },
  { key: 'berlin', label: 'Berlin' },
  { key: 'brandenburg', label: 'Brandenburg' },
  { key: 'bremen', label: 'Bremen' },
  { key: 'hamburg', label: 'Hamburg' },
  { key: 'hessen', label: 'Hessen' },
  { key: 'mecklenburg-vorpommern', label: 'Mecklenburg-Vorpommern' },
  { key: 'niedersachsen', label: 'Niedersachsen' },
  { key: 'nordrhein-westfalen', label: 'Nordrhein-Westfalen' },
  { key: 'rheinland-pfalz', label: 'Rheinland-Pfalz' },
  { key: 'saarland', label: 'Saarland' },
  { key: 'sachsen', label: 'Sachsen' },
  { key: 'sachsen-anhalt', label: 'Sachsen-Anhalt' },
  { key: 'schleswig-holstein', label: 'Schleswig-Holstein' },
  { key: 'thueringen', label: 'Thüringen' },
].map(b => ({ ...b, satz: getGrEStSatzByLongKey(b.key) }));

export function berechneBaufinanzierung(eingabe: BaufinanzierungEingabe): BaufinanzierungErgebnis | null {
  const { kaufpreis, eigenkapital, bundesland, sollzins, tilgung, zinsbindungJahre, sondertilgungMonat, nebenkostenEinrechnen } = eingabe;

  if (kaufpreis <= 0 || eigenkapital < 0 || sollzins < 0 || tilgung <= 0) return null;

  // Nebenkosten — GrESt-Satz aus zentraler SSOT (grunderwerbsteuer.ts)
  let grStSatz: number;
  try {
    grStSatz = getGrEStSatzByLongKey(bundesland);
  } catch {
    grStSatz = 5.0; // Fallback bei unbekanntem Bundesland (Bundesdurchschnitt)
  }
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
