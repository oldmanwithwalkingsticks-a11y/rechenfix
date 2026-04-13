export type Geschlecht = 'frau' | 'mann';
export type Koerperbau = 'schmal' | 'normal' | 'kraeftig';

export interface IdealgewichtEingabe {
  geschlecht: Geschlecht;
  alter: number;
  groesse: number; // cm
  gewicht: number; // kg
  koerperbau: Koerperbau;
}

export interface BmiSpanne {
  bmiUnten: number;
  bmiOben: number;
  gewichtUnten: number;
  gewichtOben: number;
}

export interface IdealgewichtErgebnis {
  broca: number;
  creff: number;
  bmiSpanne: BmiSpanne;
  aktuellesGewicht: number;
  differenzUnten: number; // negativ = unter Idealbereich
  differenzOben: number;  // positiv = über Idealbereich
  imIdealbereich: boolean;
  statusText: string;
  statusFarbe: 'green' | 'orange';
}

function getAltersBmiSpanne(alter: number): { unten: number; oben: number } {
  if (alter < 19) return { unten: 19, oben: 24 };
  if (alter <= 24) return { unten: 19, oben: 24 };
  if (alter <= 34) return { unten: 20, oben: 25 };
  if (alter <= 44) return { unten: 21, oben: 26 };
  if (alter <= 54) return { unten: 22, oben: 27 };
  if (alter <= 64) return { unten: 23, oben: 28 };
  return { unten: 24, oben: 29 };
}

function getKoerperbauKoeffizient(kb: Koerperbau): number {
  if (kb === 'schmal') return 0.9;
  if (kb === 'kraeftig') return 1.1;
  return 1.0;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function berechneIdealgewicht(eingabe: IdealgewichtEingabe): IdealgewichtErgebnis | null {
  const { geschlecht, alter, groesse, gewicht, koerperbau } = eingabe;
  if (alter <= 0 || groesse <= 0 || gewicht <= 0) return null;

  // 1. Broca
  const normalgewicht = groesse - 100;
  const brocaFaktor = geschlecht === 'mann' ? 0.9 : 0.85;
  const broca = round1(normalgewicht * brocaFaktor);

  // 2. Creff
  const kbKoeff = getKoerperbauKoeffizient(koerperbau);
  const creff = round1(((groesse - 100) + (alter / 10)) * 0.9 * kbKoeff);

  // 3. BMI-basierte Spanne
  const groesseM = groesse / 100;
  const groesseM2 = groesseM * groesseM;
  const { unten: bmiUnten, oben: bmiOben } = getAltersBmiSpanne(alter);
  const gewichtUnten = round1(bmiUnten * groesseM2);
  const gewichtOben = round1(bmiOben * groesseM2);

  const bmiSpanne: BmiSpanne = {
    bmiUnten,
    bmiOben,
    gewichtUnten,
    gewichtOben,
  };

  // Status
  const imIdealbereich = gewicht >= gewichtUnten && gewicht <= gewichtOben;
  let statusText: string;
  let statusFarbe: 'green' | 'orange';
  let differenzUnten = 0;
  let differenzOben = 0;

  if (imIdealbereich) {
    statusText = 'Im Idealbereich';
    statusFarbe = 'green';
  } else if (gewicht > gewichtOben) {
    differenzOben = round1(gewicht - gewichtOben);
    statusText = `${differenzOben} kg über dem Idealbereich`;
    statusFarbe = 'orange';
  } else {
    differenzUnten = round1(gewichtUnten - gewicht);
    statusText = `${differenzUnten} kg unter dem Idealbereich`;
    statusFarbe = 'orange';
  }

  return {
    broca,
    creff,
    bmiSpanne,
    aktuellesGewicht: gewicht,
    differenzUnten,
    differenzOben,
    imIdealbereich,
    statusText,
    statusFarbe,
  };
}
