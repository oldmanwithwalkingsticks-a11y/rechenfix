export type VerstossArt = 'geschwindigkeit' | 'rotlicht' | 'abstand' | 'handy' | 'parken' | 'alkohol';
export type Ort = 'innerorts' | 'ausserorts';
export type Fahrzeug = 'pkw' | 'lkw';
export type RotlichtPhase = 'unter1' | 'ueber1' | 'gefaehrdung' | 'sachbeschaedigung';
export type AbstandStufe = '5_10' | '4_10' | '3_10' | '2_10' | '1_10';
export type AlkoholStufe = '05_109' | 'ab_11' | 'unter_05_auffaellig' | 'probezeit';
export type HandyStufe = 'normal' | 'gefaehrdung' | 'sachbeschaedigung' | 'radfahrer';
export type ParkStufe = 'unerlaubt' | 'feuerwehr' | 'gehweg' | 'zweite_reihe' | 'behindert';

export interface BussgeldEingabe {
  verstoss: VerstossArt;
  ueberschreitung: number;
  ort: Ort;
  fahrzeug: Fahrzeug;
  rotlichtPhase: RotlichtPhase;
  abstandGeschwindigkeit: number;
  abstandStufe: AbstandStufe;
  alkoholStufe: AlkoholStufe;
  handyStufe: HandyStufe;
  parkStufe: ParkStufe;
}

export interface BussgeldErgebnis {
  bussgeld: number;
  punkte: number;
  fahrverbot: number; // Monate, 0 = kein Fahrverbot
  fahrverbotHinweis: string;
  /** W187: Monate Fahrverbot nur im Wiederholungsfall (§ 4 Abs. 2 S. 2 BKatV), sonst 0/undefined */
  fahrverbotWiederholung?: number;
  straftat: boolean;
  beschreibung: string;
  schwere: 'gering' | 'mittel' | 'schwer' | 'sehr-schwer';
  hinweise: string[];
}

interface Stufe {
  bussgeld: number;
  punkte: number;
  fahrverbot: number;
  fahrverbotWiederholung?: number;
  hinweis?: string;
}

// W187: Hinweistext für Stufen ohne Regelfahrverbot, bei denen § 4 Abs. 2 S. 2 BKatV greifen kann
const HINWEIS_WIEDERHOLUNG = 'Kein Regelfahrverbot für Ersttäter. 1 Monat Fahrverbot droht in der Regel nur, wenn bereits eine Überschreitung um mindestens 26 km/h rechtskräftig geahndet wurde und innerhalb eines Jahres seit Rechtskraft erneut um mindestens 26 km/h überschritten wird (§ 4 Abs. 2 Satz 2 BKatV).';

const GESCHWINDIGKEIT_INNERORTS_PKW: { bis: number; stufe: Stufe }[] = [
  { bis: 10, stufe: { bussgeld: 30, punkte: 0, fahrverbot: 0 } },
  { bis: 15, stufe: { bussgeld: 50, punkte: 0, fahrverbot: 0 } },
  { bis: 20, stufe: { bussgeld: 70, punkte: 0, fahrverbot: 0 } },
  { bis: 25, stufe: { bussgeld: 115, punkte: 1, fahrverbot: 0 } },
  // W187: vorher fahrverbot: 1 — BKatV Anhang Tabelle 1c Nr. 11.3.5 (26–30 km/h innerorts): 180 €, kein Regelfahrverbot
  { bis: 30, stufe: { bussgeld: 180, punkte: 1, fahrverbot: 0, fahrverbotWiederholung: 1, hinweis: HINWEIS_WIEDERHOLUNG } },
  { bis: 40, stufe: { bussgeld: 260, punkte: 2, fahrverbot: 1 } },
  { bis: 50, stufe: { bussgeld: 400, punkte: 2, fahrverbot: 1 } },
  { bis: 60, stufe: { bussgeld: 560, punkte: 2, fahrverbot: 2 } },
  { bis: 70, stufe: { bussgeld: 700, punkte: 2, fahrverbot: 3 } },
  { bis: Infinity, stufe: { bussgeld: 800, punkte: 2, fahrverbot: 3 } },
];

const GESCHWINDIGKEIT_AUSSERORTS_PKW: { bis: number; stufe: Stufe }[] = [
  { bis: 10, stufe: { bussgeld: 20, punkte: 0, fahrverbot: 0 } },
  { bis: 15, stufe: { bussgeld: 40, punkte: 0, fahrverbot: 0 } },
  { bis: 20, stufe: { bussgeld: 60, punkte: 0, fahrverbot: 0 } },
  { bis: 25, stufe: { bussgeld: 100, punkte: 1, fahrverbot: 0 } },
  // W187: vorher fahrverbot: 1 — BKatV Anhang Tabelle 1c Nr. 11.3.5/11.3.6 außerorts (26–30: 150 €, 31–40: 200 €): kein Regelfahrverbot
  { bis: 30, stufe: { bussgeld: 150, punkte: 1, fahrverbot: 0, fahrverbotWiederholung: 1, hinweis: HINWEIS_WIEDERHOLUNG } },
  { bis: 40, stufe: { bussgeld: 200, punkte: 1, fahrverbot: 0, fahrverbotWiederholung: 1, hinweis: HINWEIS_WIEDERHOLUNG } },
  { bis: 50, stufe: { bussgeld: 320, punkte: 2, fahrverbot: 1 } },
  { bis: 60, stufe: { bussgeld: 480, punkte: 2, fahrverbot: 1 } },
  { bis: 70, stufe: { bussgeld: 600, punkte: 2, fahrverbot: 2 } },
  { bis: Infinity, stufe: { bussgeld: 700, punkte: 2, fahrverbot: 3 } },
];

// W187: vorher LKW = PKW-Bußgeld × 1,3 und PKW-Fahrverbote („pauschale Näherung“). Jetzt die Regelsätze der
// BKatV, Anhang zu Nr. 11 der Anlage, Tabelle 1 Buchstabe a (Kfz über 3,5 t zulässige Gesamtmasse, Kraftomnibusse;
// Nr. 11.1.1–11.1.10, Stand BKatV i. d. F. vom 12.08.2026), Punkte nach Anlage 13 FeV (Nr. 2.2.3, 3.2.2).
// Kein Regelfahrverbot bis 25 km/h innerorts und bis 30 km/h außerorts; darüber 1–3 Monate.
// https://www.gesetze-im-internet.de/bkatv_2013/anhang.html
const GESCHWINDIGKEIT_INNERORTS_LKW: { bis: number; stufe: Stufe }[] = [
  { bis: 10, stufe: { bussgeld: 40, punkte: 0, fahrverbot: 0 } },
  { bis: 15, stufe: { bussgeld: 60, punkte: 0, fahrverbot: 0 } },
  { bis: 20, stufe: { bussgeld: 160, punkte: 1, fahrverbot: 0 } },
  { bis: 25, stufe: { bussgeld: 175, punkte: 1, fahrverbot: 0 } },
  { bis: 30, stufe: { bussgeld: 235, punkte: 2, fahrverbot: 1 } },
  { bis: 40, stufe: { bussgeld: 340, punkte: 2, fahrverbot: 1 } },
  { bis: 50, stufe: { bussgeld: 560, punkte: 2, fahrverbot: 2 } },
  { bis: 60, stufe: { bussgeld: 700, punkte: 2, fahrverbot: 3 } },
  { bis: Infinity, stufe: { bussgeld: 800, punkte: 2, fahrverbot: 3 } },
];

const GESCHWINDIGKEIT_AUSSERORTS_LKW: { bis: number; stufe: Stufe }[] = [
  { bis: 10, stufe: { bussgeld: 30, punkte: 0, fahrverbot: 0 } },
  { bis: 15, stufe: { bussgeld: 50, punkte: 0, fahrverbot: 0 } },
  { bis: 20, stufe: { bussgeld: 140, punkte: 1, fahrverbot: 0 } },
  { bis: 25, stufe: { bussgeld: 150, punkte: 1, fahrverbot: 0 } },
  { bis: 30, stufe: { bussgeld: 175, punkte: 1, fahrverbot: 0, fahrverbotWiederholung: 1, hinweis: HINWEIS_WIEDERHOLUNG } },
  { bis: 40, stufe: { bussgeld: 255, punkte: 2, fahrverbot: 1 } },
  { bis: 50, stufe: { bussgeld: 480, punkte: 2, fahrverbot: 1 } },
  { bis: 60, stufe: { bussgeld: 600, punkte: 2, fahrverbot: 2 } },
  { bis: Infinity, stufe: { bussgeld: 700, punkte: 2, fahrverbot: 3 } },
];

function berechneGeschwindigkeit(kmh: number, ort: Ort, fahrzeug: Fahrzeug): BussgeldErgebnis {
  const tabelle = fahrzeug === 'lkw'
    ? (ort === 'innerorts' ? GESCHWINDIGKEIT_INNERORTS_LKW : GESCHWINDIGKEIT_AUSSERORTS_LKW)
    : (ort === 'innerorts' ? GESCHWINDIGKEIT_INNERORTS_PKW : GESCHWINDIGKEIT_AUSSERORTS_PKW);
  const eintrag = tabelle.find(e => kmh <= e.bis) || tabelle[tabelle.length - 1];
  const s = eintrag.stufe;

  const bussgeld = s.bussgeld;
  const fahrverbot = s.fahrverbot;
  const fahrverbotWiederholung = s.fahrverbotWiederholung ?? 0;
  const stufenHinweis = s.hinweis;

  const hinweise: string[] = [];
  if (stufenHinweis) hinweise.push(stufenHinweis);
  if (fahrzeug === 'lkw') hinweise.push('LKW über 3,5 t und Busse: eigene Regelsätze nach BKatV Tabelle 1a (Busse mit Fahrgästen und Gefahrgut-Fahrzeuge: Tabelle 1b, höher).');

  return {
    bussgeld,
    punkte: s.punkte,
    fahrverbot,
    fahrverbotHinweis: fahrverbot > 0 ? `${fahrverbot} Monat${fahrverbot > 1 ? 'e' : ''} Fahrverbot` : '',
    fahrverbotWiederholung,
    straftat: false,
    beschreibung: `${kmh} km/h zu schnell ${ort === 'innerorts' ? 'innerorts' : 'außerorts'} (${fahrzeug === 'lkw' ? 'LKW/Bus' : 'PKW'})`,
    schwere: getSchwere(s.punkte, fahrverbot),
    hinweise,
  };
}

function berechneRotlicht(phase: RotlichtPhase): BussgeldErgebnis {
  const daten: Record<RotlichtPhase, { bussgeld: number; punkte: number; fahrverbot: number; text: string }> = {
    unter1: { bussgeld: 90, punkte: 1, fahrverbot: 0, text: 'Rotlichtverstoß (unter 1 Sekunde rot)' },
    ueber1: { bussgeld: 200, punkte: 2, fahrverbot: 1, text: 'Qualifizierter Rotlichtverstoß (über 1 Sekunde rot)' },
    gefaehrdung: { bussgeld: 320, punkte: 2, fahrverbot: 1, text: 'Rotlichtverstoß mit Gefährdung' },
    sachbeschaedigung: { bussgeld: 360, punkte: 2, fahrverbot: 1, text: 'Rotlichtverstoß mit Sachbeschädigung' },
  };
  const d = daten[phase];
  return {
    bussgeld: d.bussgeld,
    punkte: d.punkte,
    fahrverbot: d.fahrverbot,
    fahrverbotHinweis: d.fahrverbot > 0 ? `${d.fahrverbot} Monat Fahrverbot` : '',
    straftat: false,
    beschreibung: d.text,
    schwere: getSchwere(d.punkte, d.fahrverbot),
    hinweise: [],
  };
}

function berechneAbstand(geschwindigkeit: number, stufe: AbstandStufe): BussgeldErgebnis {
  // Abstandsverstöße bei > 80 km/h relevant, unter 80 pauschal
  const istSchnell = geschwindigkeit > 80;
  const labels: Record<AbstandStufe, string> = {
    '5_10': 'weniger als 5/10 des halben Tachos',
    '4_10': 'weniger als 4/10 des halben Tachos',
    '3_10': 'weniger als 3/10 des halben Tachos',
    '2_10': 'weniger als 2/10 des halben Tachos',
    '1_10': 'weniger als 1/10 des halben Tachos',
  };

  const daten: Record<AbstandStufe, { bussgeld: number; punkte: number; fahrverbot: number }> = istSchnell ? {
    '5_10': { bussgeld: 75, punkte: 1, fahrverbot: 0 },
    '4_10': { bussgeld: 100, punkte: 1, fahrverbot: 0 },
    '3_10': { bussgeld: 160, punkte: 2, fahrverbot: 1 },
    '2_10': { bussgeld: 240, punkte: 2, fahrverbot: 2 },
    '1_10': { bussgeld: 320, punkte: 2, fahrverbot: 3 },
  } : {
    '5_10': { bussgeld: 25, punkte: 0, fahrverbot: 0 },
    '4_10': { bussgeld: 30, punkte: 0, fahrverbot: 0 },
    '3_10': { bussgeld: 35, punkte: 1, fahrverbot: 0 },
    '2_10': { bussgeld: 40, punkte: 1, fahrverbot: 0 },
    '1_10': { bussgeld: 50, punkte: 1, fahrverbot: 0 },
  };

  const d = daten[stufe];
  const hinweise = geschwindigkeit > 130 ? ['Bei Geschwindigkeiten über 130 km/h können höhere Strafen verhängt werden.'] : [];

  return {
    bussgeld: d.bussgeld,
    punkte: d.punkte,
    fahrverbot: d.fahrverbot,
    fahrverbotHinweis: d.fahrverbot > 0 ? `${d.fahrverbot} Monat${d.fahrverbot > 1 ? 'e' : ''} Fahrverbot` : '',
    straftat: false,
    beschreibung: `Abstandsverstoß bei ${geschwindigkeit} km/h (${labels[stufe]})`,
    schwere: getSchwere(d.punkte, d.fahrverbot),
    hinweise,
  };
}

function berechneHandy(stufe: HandyStufe): BussgeldErgebnis {
  const daten: Record<HandyStufe, { bussgeld: number; punkte: number; fahrverbot: number; text: string }> = {
    normal: { bussgeld: 100, punkte: 1, fahrverbot: 0, text: 'Handy am Steuer' },
    gefaehrdung: { bussgeld: 150, punkte: 2, fahrverbot: 1, text: 'Handy am Steuer mit Gefährdung' },
    sachbeschaedigung: { bussgeld: 200, punkte: 2, fahrverbot: 1, text: 'Handy am Steuer mit Sachbeschädigung' },
    radfahrer: { bussgeld: 55, punkte: 0, fahrverbot: 0, text: 'Handy beim Radfahren' },
  };
  const d = daten[stufe];
  return {
    bussgeld: d.bussgeld,
    punkte: d.punkte,
    fahrverbot: d.fahrverbot,
    fahrverbotHinweis: d.fahrverbot > 0 ? `${d.fahrverbot} Monat Fahrverbot` : '',
    straftat: false,
    beschreibung: d.text,
    schwere: getSchwere(d.punkte, d.fahrverbot),
    hinweise: [],
  };
}

function berechneParken(stufe: ParkStufe): BussgeldErgebnis {
  const daten: Record<ParkStufe, { bussgeld: number; text: string }> = {
    unerlaubt: { bussgeld: 25, text: 'Parken an unerlaubter Stelle' },
    feuerwehr: { bussgeld: 55, text: 'Parken in Feuerwehrzufahrt' },
    gehweg: { bussgeld: 55, text: 'Parken auf Gehweg' },
    zweite_reihe: { bussgeld: 55, text: 'Parken in zweiter Reihe' },
    behindert: { bussgeld: 55, text: 'Parken auf Behindertenparkplatz' },
  };
  const d = daten[stufe];
  return {
    bussgeld: d.bussgeld,
    punkte: 0,
    fahrverbot: 0,
    fahrverbotHinweis: '',
    straftat: false,
    beschreibung: d.text,
    schwere: 'gering',
    hinweise: ['Bei Behinderung anderer Verkehrsteilnehmer erhöht sich das Bußgeld um 15–25 €. Bei über 1 Stunde Parkdauer kommen zusätzlich 25 € hinzu.'],
  };
}

function berechneAlkohol(stufe: AlkoholStufe): BussgeldErgebnis {
  if (stufe === 'ab_11') {
    return {
      bussgeld: 0,
      punkte: 3,
      fahrverbot: 0,
      fahrverbotHinweis: 'Entzug der Fahrerlaubnis',
      straftat: true,
      beschreibung: 'Trunkenheit im Verkehr ab 1,1 ‰ (Straftat)',
      schwere: 'sehr-schwer',
      hinweise: [
        'Ab 1,1 ‰ handelt es sich um eine Straftat — es drohen Geldstrafe oder Freiheitsstrafe.',
        'Die Fahrerlaubnis wird entzogen (nicht nur Fahrverbot). Eine Neuerteilung ist frühestens nach 6 Monaten möglich und erfordert in der Regel eine MPU.',
      ],
    };
  }

  const daten: Record<string, { bussgeld: number; punkte: number; fahrverbot: number; text: string; hinweise: string[] }> = {
    '05_109': {
      bussgeld: 500, punkte: 2, fahrverbot: 1,
      text: 'Alkohol am Steuer (0,5–1,09 ‰, erstmalig)',
      hinweise: ['Bei wiederholtem Verstoß: 1.000 € (2. Mal) bzw. 1.500 € (3. Mal) und 3 Monate Fahrverbot.'],
    },
    'unter_05_auffaellig': {
      bussgeld: 250, punkte: 2, fahrverbot: 1,
      text: 'Unter 0,5 ‰ mit Ausfallerscheinungen',
      hinweise: ['Auch unter 0,5 ‰ kann ein Bußgeld drohen, wenn Sie auffällig fahren oder in einen Unfall verwickelt sind.'],
    },
    'probezeit': {
      bussgeld: 250, punkte: 1, fahrverbot: 0,
      text: 'Alkohol in der Probezeit / unter 21 Jahren',
      hinweise: ['In der Probezeit und unter 21 Jahren gilt die 0,0-Promille-Grenze.', 'Zusätzlich: verpflichtendes Aufbauseminar und Verlängerung der Probezeit um 2 Jahre.'],
    },
  };

  const d = daten[stufe];
  return {
    bussgeld: d.bussgeld,
    punkte: d.punkte,
    fahrverbot: d.fahrverbot,
    fahrverbotHinweis: d.fahrverbot > 0 ? `${d.fahrverbot} Monat${d.fahrverbot > 1 ? 'e' : ''} Fahrverbot` : '',
    straftat: false,
    beschreibung: d.text,
    schwere: getSchwere(d.punkte, d.fahrverbot),
    hinweise: d.hinweise,
  };
}

function getSchwere(punkte: number, fahrverbot: number): 'gering' | 'mittel' | 'schwer' | 'sehr-schwer' {
  if (fahrverbot >= 2 || punkte >= 3) return 'sehr-schwer';
  if (fahrverbot >= 1) return 'schwer';
  if (punkte >= 1) return 'mittel';
  return 'gering';
}

export function berechneBussgeld(e: BussgeldEingabe): BussgeldErgebnis {
  switch (e.verstoss) {
    case 'geschwindigkeit':
      return berechneGeschwindigkeit(Math.max(e.ueberschreitung, 1), e.ort, e.fahrzeug);
    case 'rotlicht':
      return berechneRotlicht(e.rotlichtPhase);
    case 'abstand':
      return berechneAbstand(e.abstandGeschwindigkeit, e.abstandStufe);
    case 'handy':
      return berechneHandy(e.handyStufe);
    case 'parken':
      return berechneParken(e.parkStufe);
    case 'alkohol':
      return berechneAlkohol(e.alkoholStufe);
  }
}
