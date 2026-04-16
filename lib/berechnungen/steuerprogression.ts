export interface SteuerprogressionsErgebnis {
  zvE: number;
  splitting: boolean;
  einkommensteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  gesamtSteuer: number;
  durchschnittssteuersatz: number;  // ESt / zvE * 100
  grenzsteuersatz: number;          // tax on next euro (as %)
  effektiverSteuersatz: number;     // gesamtSteuer / zvE * 100
  // For splitting comparison
  splittingVergleich?: {
    estOhne: number;
    estMit: number;
    vorteil: number;
  };
  // For the chart: array of data points
  kurvenDaten: Array<{
    einkommen: number;
    durchschnitt: number;
    grenz: number;
  }>;
  // Tabelle: 10k steps
  tabelleDaten: Array<{
    einkommen: number;
    est: number;
    durchschnitt: number;
    grenz: number;
  }>;
}

// Einkommensteuer nach § 32a EStG Grundtabelle 2025/2026
function berechneESt(zvE: number): number {
  const grundfreibetrag = 12096;
  if (zvE <= grundfreibetrag) return 0;
  const x = zvE - grundfreibetrag;
  let steuer: number;
  if (x <= 17442) {
    steuer = x * 0.14;
  } else if (x <= 54057) {
    steuer = 17442 * 0.14 + (x - 17442) * 0.2397;
  } else if (x <= 243714) {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + (x - 54057) * 0.42;
  } else {
    steuer = 17442 * 0.14 + 36615 * 0.2397 + 189657 * 0.42 + (x - 243714) * 0.45;
  }
  return Math.round(steuer);
}

// Solidaritätszuschlag: 5,5% der ESt mit Freigrenze und Milderungszone
function berechneSoli(est: number): number {
  if (est <= 18130) return 0;
  if (est <= 33761) {
    return Math.round((est - 18130) * 0.119 * 100) / 100;
  }
  return Math.round(est * 0.055 * 100) / 100;
}

// Kirchensteuer: 9% als Standard (8% in Bayern/BW)
function berechneKiSt(est: number, kirchensteuer: boolean): number {
  if (!kirchensteuer) return 0;
  return Math.round(est * 0.09 * 100) / 100;
}

// Grenzsteuersatz: Steuer auf den nächsten Euro
function berechneGrenzsteuersatz(zvE: number, splitting: boolean): number {
  const estJetzt = berechneEStMitSplitting(zvE, splitting);
  const estNaechster = berechneEStMitSplitting(zvE + 1, splitting);
  return (estNaechster - estJetzt) * 100; // als Prozent
}

function berechneEStMitSplitting(zvE: number, splitting: boolean): number {
  if (splitting) {
    const halbZvE = Math.floor(zvE / 2);
    return berechneESt(halbZvE) * 2;
  }
  return berechneESt(zvE);
}

function berechneDurchschnittssteuersatz(est: number, zvE: number): number {
  if (zvE <= 0) return 0;
  return Math.round((est / zvE) * 10000) / 100; // 2 Dezimalstellen
}

export function berechneSteuerprogression(
  zvE: number,
  splitting: boolean,
  kirchensteuer: boolean,
): SteuerprogressionsErgebnis | null {
  if (zvE < 0 || isNaN(zvE)) return null;

  // Einkommensteuer
  const einkommensteuer = berechneEStMitSplitting(zvE, splitting);

  // Soli
  const solidaritaetszuschlag = berechneSoli(einkommensteuer);

  // Kirchensteuer
  const kirchensteuerBetrag = berechneKiSt(einkommensteuer, kirchensteuer);

  // Gesamt
  const gesamtSteuer = Math.round(
    (einkommensteuer + solidaritaetszuschlag + kirchensteuerBetrag) * 100,
  ) / 100;

  // Steuersätze
  const durchschnittssteuersatz = berechneDurchschnittssteuersatz(einkommensteuer, zvE);
  const grenzsteuersatz = berechneGrenzsteuersatz(zvE, splitting);
  const effektiverSteuersatz = zvE > 0
    ? Math.round((gesamtSteuer / zvE) * 10000) / 100
    : 0;

  // Splitting-Vergleich (nur bei Einzelveranlagung)
  let splittingVergleich: SteuerprogressionsErgebnis['splittingVergleich'];
  if (!splitting) {
    const estOhne = einkommensteuer;
    const estMit = berechneEStMitSplitting(zvE, true);
    splittingVergleich = {
      estOhne,
      estMit,
      vorteil: estOhne - estMit,
    };
  }

  // Kurvendaten: 0 bis 200.000 in 2.000er-Schritten
  const kurvenDaten: SteuerprogressionsErgebnis['kurvenDaten'] = [];
  for (let einkommen = 0; einkommen <= 200000; einkommen += 2000) {
    const est = berechneEStMitSplitting(einkommen, splitting);
    const durchschnitt = berechneDurchschnittssteuersatz(est, einkommen);
    const grenz = berechneGrenzsteuersatz(einkommen, splitting);
    kurvenDaten.push({ einkommen, durchschnitt, grenz });
  }

  // Tabellendaten: 10.000er-Schritte von 10.000 bis 200.000
  const tabelleDaten: SteuerprogressionsErgebnis['tabelleDaten'] = [];
  for (let einkommen = 10000; einkommen <= 200000; einkommen += 10000) {
    const est = berechneEStMitSplitting(einkommen, splitting);
    const durchschnitt = berechneDurchschnittssteuersatz(est, einkommen);
    const grenz = berechneGrenzsteuersatz(einkommen, splitting);
    tabelleDaten.push({ einkommen, est, durchschnitt, grenz });
  }

  return {
    zvE,
    splitting,
    einkommensteuer,
    solidaritaetszuschlag,
    kirchensteuer: kirchensteuerBetrag,
    gesamtSteuer,
    durchschnittssteuersatz,
    grenzsteuersatz,
    effektiverSteuersatz,
    splittingVergleich,
    kurvenDaten,
    tabelleDaten,
  };
}
