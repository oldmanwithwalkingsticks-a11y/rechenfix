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

export const NUTZUNGSDAUER_OPTIONEN = [
  { value: '3', label: '3 Jahre (Elektronik)' },
  { value: '5', label: '5 Jahre (Möbel günstig)' },
  { value: '8', label: '8 Jahre (Möbel hochwertig)' },
  { value: '10', label: '10 Jahre (Haushaltsgroßgeräte)' },
  { value: '15', label: '15 Jahre (Küche)' },
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
