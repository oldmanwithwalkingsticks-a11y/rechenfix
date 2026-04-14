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

// § 19 ErbStG Steuersätze
function getSteuersatz(steuerpflichtigerErwerb: number, klasse: Steuerklasse): number {
  const stufen: { bis: number; I: number; II: number; III: number }[] = [
    { bis:    75000, I:  7, II: 15, III: 30 },
    { bis:   300000, I: 11, II: 20, III: 30 },
    { bis:   600000, I: 15, II: 25, III: 30 },
    { bis:  6000000, I: 19, II: 30, III: 30 },
    { bis: 13000000, I: 23, II: 35, III: 50 },
    { bis: 26000000, I: 27, II: 40, III: 50 },
    { bis: Infinity, I: 30, II: 43, III: 50 },
  ];
  for (const s of stufen) {
    if (steuerpflichtigerErwerb <= s.bis) {
      return s[klasse];
    }
  }
  return stufen[stufen.length - 1][klasse];
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

  const steuersatz = getSteuersatz(steuerpflichtigerErwerb, steuerklasse);
  const steuerbetrag = steuerpflichtigerErwerb > 0 ? Math.round(steuerpflichtigerErwerb * steuersatz / 100) : 0;
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
