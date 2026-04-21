export type Erwerbsart = 'erbschaft' | 'schenkung';

export type Verwandtschaft =
  | 'ehepartner'
  | 'kind'
  | 'enkel-eltern-leben'
  | 'enkel-eltern-tot'
  | 'eltern-erbschaft'
  | 'eltern-schenkung'
  | 'geschwister'
  | 'nichte-neffe'
  | 'stiefeltern'
  | 'geschieden'
  | 'nicht-verwandt';

export type Steuerklasse = 'I' | 'II' | 'III';

export interface ErbschaftsteuerEingabe {
  erwerbsart: Erwerbsart;
  wert: number;
  verwandtschaft: Verwandtschaft;
  vorschenkungen: number;
  selbstgenutzteImmobilie: boolean;
}

export interface ErbschaftsteuerErgebnis {
  wert: number;
  steuerklasse: Steuerklasse;
  persoenlicherFreibetrag: number;
  versorgungsfreibetrag: number;
  gesamtFreibetrag: number;
  vorschenkungen: number;
  steuerpflichtigerErwerb: number;
  steuersatz: number;        // Prozent
  steuerbetrag: number;
  nettoErbschaft: number;
  verwandtschaftLabel: string;
  steuerfrei: boolean;
  hinweisImmobilie: string | null;
}

export const FREIBETRAEGE: Record<Verwandtschaft, { erb: number; schenk: number }> = {
  'ehepartner':         { erb: 500000, schenk: 500000 },
  'kind':               { erb: 400000, schenk: 400000 },
  'enkel-eltern-tot':   { erb: 400000, schenk: 400000 },
  'enkel-eltern-leben': { erb: 200000, schenk: 200000 },
  'eltern-erbschaft':   { erb: 100000, schenk:  20000 },
  'eltern-schenkung':   { erb: 100000, schenk:  20000 },
  'geschwister':        { erb:  20000, schenk:  20000 },
  'nichte-neffe':       { erb:  20000, schenk:  20000 },
  'stiefeltern':        { erb:  20000, schenk:  20000 },
  'geschieden':         { erb:  20000, schenk:  20000 },
  'nicht-verwandt':     { erb:  20000, schenk:  20000 },
};

export const VERWANDTSCHAFT_LABELS: Record<Verwandtschaft, string> = {
  'ehepartner':         'Ehepartner / eingetr. Lebenspartner',
  'kind':               'Kind (inkl. Stief-/Adoptivkind)',
  'enkel-eltern-leben': 'Enkelkind (Eltern leben)',
  'enkel-eltern-tot':   'Enkelkind (Eltern verstorben)',
  'eltern-erbschaft':   'Eltern / Großeltern (Erbschaft)',
  'eltern-schenkung':   'Eltern / Großeltern (Schenkung)',
  'geschwister':        'Geschwister',
  'nichte-neffe':       'Nichte / Neffe',
  'stiefeltern':        'Stief- / Schwiegereltern',
  'geschieden':         'Geschiedener Ehepartner',
  'nicht-verwandt':     'Nicht verwandt / Freund',
};

function getSteuerklasse(v: Verwandtschaft, art: Erwerbsart): Steuerklasse {
  if (v === 'ehepartner' || v === 'kind' || v === 'enkel-eltern-leben' || v === 'enkel-eltern-tot') return 'I';
  if (v === 'eltern-erbschaft' && art === 'erbschaft') return 'I';
  if (v === 'eltern-schenkung' || (v === 'eltern-erbschaft' && art === 'schenkung')) return 'II';
  if (v === 'geschwister' || v === 'nichte-neffe' || v === 'stiefeltern' || v === 'geschieden') return 'II';
  return 'III';
}

// § 19 ErbStG Steuersätze — SSOT für Erbschaft- und Schenkungsteuer
export interface ErbStTarifStufe {
  readonly bis: number;
  readonly I: number;
  readonly II: number;
  readonly III: number;
}

export const ERBST_TARIF_STUFEN: ReadonlyArray<ErbStTarifStufe> = [
  { bis:    75000, I:  7, II: 15, III: 30 },
  { bis:   300000, I: 11, II: 20, III: 30 },
  { bis:   600000, I: 15, II: 25, III: 30 },
  { bis:  6000000, I: 19, II: 30, III: 30 },
  { bis: 13000000, I: 23, II: 35, III: 50 },
  { bis: 26000000, I: 27, II: 40, III: 50 },
  { bis: Infinity, I: 30, II: 43, III: 50 },
];

// § 19 Abs. 3 ErbStG Härtefall-Regel: Beim knappen Überschreiten einer
// Tarifstufe darf die Mehrsteuer nicht mehr als 50 % (Kl. I, Sätze ≤ 30 %)
// bzw. 75 % (Kl. II/III bei Satz > 30 %) des überschreitenden Betrags
// betragen. Rückgabe: Steuerbetrag auf ganze Euro gerundet + Tarifsatz
// der Stufe (zur Anzeige).
export function berechneErbStMitHaertefall(
  stpflErwerb: number,
  klasse: Steuerklasse,
): { steuerbetrag: number; steuersatz: number } {
  if (stpflErwerb <= 0) return { steuerbetrag: 0, steuersatz: 0 };

  const idx = ERBST_TARIF_STUFEN.findIndex(s => stpflErwerb <= s.bis);
  const stufe = ERBST_TARIF_STUFEN[idx];
  const satzNeu = stufe[klasse];
  const steuerRegulaer = stpflErwerb * satzNeu / 100;

  if (idx === 0) {
    return { steuerbetrag: Math.round(steuerRegulaer), steuersatz: satzNeu };
  }

  const vorstufe = ERBST_TARIF_STUFEN[idx - 1];
  const grenze = vorstufe.bis;
  const satzVorstufe = vorstufe[klasse];
  const steuerGrenze = grenze * satzVorstufe / 100;
  const ueberschreitung = stpflErwerb - grenze;
  const maxZuwachs = satzNeu <= 30 ? ueberschreitung * 0.5 : ueberschreitung * 0.75;
  const steuerHaertefall = steuerGrenze + Math.min(steuerRegulaer - steuerGrenze, maxZuwachs);

  return {
    steuerbetrag: Math.round(Math.min(steuerRegulaer, steuerHaertefall)),
    steuersatz: satzNeu,
  };
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function berechneErbschaftsteuer(e: ErbschaftsteuerEingabe): ErbschaftsteuerErgebnis {
  const { erwerbsart, wert, verwandtschaft, vorschenkungen, selbstgenutzteImmobilie } = e;

  const steuerklasse = getSteuerklasse(verwandtschaft, erwerbsart);
  const fb = FREIBETRAEGE[verwandtschaft];
  const persoenlicherFreibetrag = erwerbsart === 'erbschaft' ? fb.erb : fb.schenk;

  // Versorgungsfreibetrag nur bei Erbschaft für Ehepartner/Kinder (vereinfacht)
  let versorgungsfreibetrag = 0;
  if (erwerbsart === 'erbschaft') {
    if (verwandtschaft === 'ehepartner') versorgungsfreibetrag = 256000;
    else if (verwandtschaft === 'kind') versorgungsfreibetrag = 52000; // annäherung für junges Kind; in Realität altersabhängig
  }

  // Vorschenkungen verringern den Freibetrag
  const freibetragNachVorschenkung = Math.max(0, persoenlicherFreibetrag - vorschenkungen);
  const gesamtFreibetrag = freibetragNachVorschenkung + versorgungsfreibetrag;

  // Steuerpflichtiger Erwerb
  const steuerpflichtigerErwerb = Math.max(0, wert - gesamtFreibetrag);

  // Selbstgenutzte Immobilie: vereinfachte Behandlung — bei Ehepartner/Kind komplett steuerfrei (Bedingungen)
  let hinweisImmobilie: string | null = null;
  if (selbstgenutzteImmobilie) {
    if (verwandtschaft === 'ehepartner') {
      hinweisImmobilie = 'Eine vom Ehepartner selbstgenutzte Immobilie kann komplett steuerfrei vererbt werden, wenn der erbende Partner 10 Jahre darin wohnt.';
    } else if (verwandtschaft === 'kind') {
      hinweisImmobilie = 'Vom Kind selbstgenutzte Immobilien sind bis 200 m² Wohnfläche steuerfrei, wenn das Kind 10 Jahre darin wohnt.';
    } else {
      hinweisImmobilie = 'Das Familienheim-Privileg gilt nur für Ehepartner und Kinder.';
    }
  }

  const { steuerbetrag, steuersatz } = berechneErbStMitHaertefall(steuerpflichtigerErwerb, steuerklasse);
  const nettoErbschaft = rund2(wert - steuerbetrag);

  return {
    wert,
    steuerklasse,
    persoenlicherFreibetrag: freibetragNachVorschenkung,
    versorgungsfreibetrag,
    gesamtFreibetrag,
    vorschenkungen,
    steuerpflichtigerErwerb,
    steuersatz,
    steuerbetrag,
    nettoErbschaft,
    verwandtschaftLabel: VERWANDTSCHAFT_LABELS[verwandtschaft],
    steuerfrei: steuerbetrag === 0,
    hinweisImmobilie,
  };
}
