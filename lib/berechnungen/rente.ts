export interface RentenEingabe {
  alter: number;
  renteneintrittsalter: number;
  monatsbrutto: number;
  beitragsjahre: number;
  bekannteRentenpunkte: number | null; // null = schätzen
  gehaltssteigerung: number; // % p.a.
  gewuenschtesNetto: number;
}

export interface RentenErgebnis {
  // Rentenpunkte
  bisherigeRentenpunkte: number;
  zukuenftigeRentenpunkte: number;
  gesamtRentenpunkte: number;
  // Rente
  bruttoRenteOhneAbschlag: number;
  abschlagProzent: number;
  abschlagMonate: number;
  bruttoRente: number;
  nettoRente: number;
  steuerpflichtAnteil: number;
  // Rentenlücke
  gewuenschtesNetto: number;
  rentenluecke: number; // positiv = Lücke, negativ = Überschuss
  sparrateMonatlich: number;
  benoetigtesKapital: number;
  // Info
  jahreBisRente: number;
  rentenwert: number;
  durchschnittsentgelt: number;
}

// Konstanten 2026
const RENTENWERT = 39.32; // € pro Rentenpunkt (ab 01.07.2025, gilt bis 30.06.2026)
const DURCHSCHNITTSENTGELT = 51944; // Vorläufiges Durchschnittsentgelt 2026
const BBG_WEST = 101400; // BBG RV 2026 (einheitlich, 8.450 €/Monat)
const REGELALTERSGRENZE = 67;

export function berechneRente(eingabe: RentenEingabe): RentenErgebnis | null {
  const { alter, renteneintrittsalter, monatsbrutto, beitragsjahre, bekannteRentenpunkte, gehaltssteigerung, gewuenschtesNetto } = eingabe;

  if (alter <= 0 || alter >= renteneintrittsalter || monatsbrutto <= 0) return null;

  const jahresbrutto = monatsbrutto * 12;
  const jahreBisRente = renteneintrittsalter - alter;

  // Bisherige Rentenpunkte
  let bisherigeRentenpunkte: number;
  if (bekannteRentenpunkte !== null && bekannteRentenpunkte >= 0) {
    bisherigeRentenpunkte = bekannteRentenpunkte;
  } else {
    // Schätzung: bisherige Jahre × Punkte bei aktuellem Gehalt
    const punkteProJahr = Math.min(jahresbrutto, BBG_WEST) / DURCHSCHNITTSENTGELT;
    bisherigeRentenpunkte = beitragsjahre * punkteProJahr;
  }

  // Zukünftige Rentenpunkte (mit Gehaltssteigerung)
  let zukuenftigeRentenpunkte = 0;
  const steigerungFaktor = 1 + gehaltssteigerung / 100;

  for (let n = 1; n <= jahreBisRente; n++) {
    const gehaltJahr = jahresbrutto * Math.pow(steigerungFaktor, n);
    const gedeckelt = Math.min(gehaltJahr, BBG_WEST);
    zukuenftigeRentenpunkte += gedeckelt / DURCHSCHNITTSENTGELT;
  }

  const gesamtRentenpunkte = bisherigeRentenpunkte + zukuenftigeRentenpunkte;

  // Brutto-Rente
  const bruttoRenteOhneAbschlag = gesamtRentenpunkte * RENTENWERT;

  // Abschläge bei vorzeitigem Renteneintritt
  let abschlagMonate = 0;
  let abschlagProzent = 0;
  if (renteneintrittsalter < REGELALTERSGRENZE) {
    abschlagMonate = (REGELALTERSGRENZE - renteneintrittsalter) * 12;
    abschlagProzent = Math.min(abschlagMonate * 0.3, 14.4);
  }

  const bruttoRente = bruttoRenteOhneAbschlag * (1 - abschlagProzent / 100);

  // Netto-Rente (vereinfacht)
  // Steuerpflichtiger Anteil: 83% ab 2026, steigt um 0,5% pro Jahr
  const steuerpflichtAnteil = Math.min(100, 83 + jahreBisRente * 0.5);

  // Vereinfachter Grenzsteuersatz für Rentner (ca. 15-20% im unteren Bereich)
  const jahrRenteSteuerpflichtig = bruttoRente * 12 * steuerpflichtAnteil / 100;
  // Grundfreibetrag 2026: 12.348 €
  const zuVersteuern = Math.max(0, jahrRenteSteuerpflichtig - 12348);
  // Vereinfachter Durchschnittssteuersatz
  let steuerSatz = 0;
  if (zuVersteuern > 0) {
    // Progressionszone 1: 14% bis 42% (vereinfacht linear)
    if (zuVersteuern <= 17000) {
      steuerSatz = 14 + (zuVersteuern / 17000) * 10; // 14-24%
    } else if (zuVersteuern <= 65000) {
      steuerSatz = 24 + ((zuVersteuern - 17000) / 48000) * 18; // 24-42%
    } else {
      steuerSatz = 42;
    }
  }
  const steuerMonat = (zuVersteuern * steuerSatz / 100) / 12;

  // KV + PV pauschal ca. 10,85% (8,15% KV + 1,7% PV + 1% Zusatz)
  const sozialAbgaben = bruttoRente * 0.1085;

  const nettoRente = Math.max(0, bruttoRente - steuerMonat - sozialAbgaben);

  // Rentenlücke
  const rentenluecke = gewuenschtesNetto - nettoRente;

  // Sparrate um Lücke zu schließen
  let sparrateMonatlich = 0;
  let benoetigtesKapital = 0;
  if (rentenluecke > 0) {
    // Entnahmephase: 20 Jahre
    benoetigtesKapital = rentenluecke * 12 * 20;
    // Ansparphase: 5% Rendite p.a.
    const renditeMonat = 0.05 / 12;
    const monate = jahreBisRente * 12;
    if (monate > 0 && renditeMonat > 0) {
      // Sparplanformel: FV = PMT × ((1+r)^n - 1) / r
      // PMT = FV × r / ((1+r)^n - 1)
      const faktor = Math.pow(1 + renditeMonat, monate) - 1;
      sparrateMonatlich = benoetigtesKapital * renditeMonat / faktor;
    }
  }

  return {
    bisherigeRentenpunkte: Math.round(bisherigeRentenpunkte * 100) / 100,
    zukuenftigeRentenpunkte: Math.round(zukuenftigeRentenpunkte * 100) / 100,
    gesamtRentenpunkte: Math.round(gesamtRentenpunkte * 100) / 100,
    bruttoRenteOhneAbschlag: Math.round(bruttoRenteOhneAbschlag * 100) / 100,
    abschlagProzent: Math.round(abschlagProzent * 10) / 10,
    abschlagMonate,
    bruttoRente: Math.round(bruttoRente * 100) / 100,
    nettoRente: Math.round(nettoRente * 100) / 100,
    steuerpflichtAnteil: Math.round(steuerpflichtAnteil * 10) / 10,
    gewuenschtesNetto,
    rentenluecke: Math.round(rentenluecke * 100) / 100,
    sparrateMonatlich: Math.round(sparrateMonatlich * 100) / 100,
    benoetigtesKapital: Math.round(benoetigtesKapital),
    jahreBisRente,
    rentenwert: RENTENWERT,
    durchschnittsentgelt: DURCHSCHNITTSENTGELT,
  };
}
