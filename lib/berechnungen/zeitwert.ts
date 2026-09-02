export interface ZeitwertErgebnis {
  neupreis: number;
  alter: number;
  nutzungsdauer: number;
  zustandsfaktor: number;
  zustandLabel: string;
  jaehrlicherWertverlust: number;
  zeitwertLinear: number;
  zeitwertBereinigt: number;
  restwertProzent: number;
  verlaufskurve: { jahr: number; wert: number }[];
}

/**
 * Nutzungsdauern nach der amtlichen AfA-Tabelle „AV" des BMF
 * (IV D 2-S 1551-188/00, 15.12.2000, BStBl I 2000 S. 1532), Fundstelle in Klammern.
 * Die Werte ohne Fundstelle sind Erfahrungswerte für den privaten Hausrat und als
 * solche im Text ausgewiesen — die AfA-Tabelle kennt sie nicht.
 *
 * Reihenfolge bewusst: Fahrzeuge zuerst, weil sie der häufigste Anlass sind.
 * `'7-av'` trägt denselben Jahreswert wie `'7'`, braucht aber einen eigenen
 * `value`, damit der `key` im option-Loop eindeutig bleibt.
 */
export const NUTZUNGSDAUER_OPTIONEN = [
  { value: '6', label: '6 Jahre — Pkw und Kombi (AfA 4.2.1)' },
  { value: '7', label: '7 Jahre — Motorrad, Roller, Fahrrad (AfA 4.2.2)' },
  { value: '8', label: '8 Jahre — Wohnmobil, Wohnwagen (AfA 4.2.9)' },
  { value: '3', label: '3 Jahre — PC, Notebook, Drucker (AfA 6.14.3.2)' },
  { value: '7-av', label: '7 Jahre — Kamera, Fernseher, Audiogeräte (AfA 6.14.4)' },
  { value: '10', label: '10 Jahre — Kühlschrank, Waschmaschine (AfA 7.7 / 7.2.10)' },
  { value: '13', label: '13 Jahre — Büromöbel (AfA 6.15)' },
  { value: '15', label: '15 Jahre — Einbauküche (Erfahrungswert)' },
  { value: 'eigene', label: 'Eigene Angabe' },
];

export const ZUSTAND_OPTIONEN = [
  { value: '0.9', label: 'Sehr gut (90 %)', faktor: 0.9 },
  { value: '0.75', label: 'Gut (75 %)', faktor: 0.75 },
  { value: '0.6', label: 'Gebraucht (60 %)', faktor: 0.6 },
  { value: '0.4', label: 'Stark gebraucht (40 %)', faktor: 0.4 },
  { value: '0.2', label: 'Mangelhaft (20 %)', faktor: 0.2 },
];

export function berechneZeitwert(
  neupreis: number,
  alter: number,
  nutzungsdauer: number,
  zustandsfaktor: number
): ZeitwertErgebnis | null {
  if (neupreis <= 0 || alter < 0 || nutzungsdauer < 1 || zustandsfaktor <= 0) return null;

  const jaehrlicherWertverlust = neupreis / nutzungsdauer;
  const zeitwertLinear = Math.max(0, neupreis - jaehrlicherWertverlust * alter);
  const zeitwertBereinigt = Math.round(zeitwertLinear * zustandsfaktor * 100) / 100;
  const restwertProzent = neupreis > 0 ? Math.round((zeitwertBereinigt / neupreis) * 1000) / 10 : 0;

  const zustandOpt = ZUSTAND_OPTIONEN.find(z => z.faktor === zustandsfaktor);
  const zustandLabel = zustandOpt ? zustandOpt.label : `${Math.round(zustandsfaktor * 100)} %`;

  // Verlaufskurve (jedes Jahr bis Nutzungsdauer + 2, max 20)
  const maxJahre = Math.min(Math.ceil(nutzungsdauer) + 2, 20);
  const verlaufskurve: { jahr: number; wert: number }[] = [];
  for (let j = 0; j <= maxJahre; j++) {
    const wert = Math.max(0, Math.round((neupreis - jaehrlicherWertverlust * j) * zustandsfaktor * 100) / 100);
    verlaufskurve.push({ jahr: j, wert });
  }

  return {
    neupreis,
    alter,
    nutzungsdauer,
    zustandsfaktor,
    zustandLabel,
    jaehrlicherWertverlust: Math.round(jaehrlicherWertverlust * 100) / 100,
    zeitwertLinear: Math.round(zeitwertLinear * 100) / 100,
    zeitwertBereinigt,
    restwertProzent,
    verlaufskurve,
  };
}
