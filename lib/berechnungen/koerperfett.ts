export type Geschlecht = 'mann' | 'frau';

export interface KoerperfettEingabe {
  geschlecht: Geschlecht;
  groesse: number;       // cm
  bauchumfang: number;   // cm
  halsumfang: number;    // cm
  hueftumfang: number;   // cm (nur Frauen)
  alter: number;         // Jahre
  gewicht: number;       // kg, optional (0 = nicht angegeben)
}

export interface KoerperfettKategorie {
  label: string;
  farbe: string;         // Tailwind-Farbklasse
  von: number;
  bis: number;
}

export interface KoerperfettErgebnis {
  kfa: number;           // Körperfettanteil in %
  kategorie: string;
  kategorieFarbe: string;
  fettmasse: number | null;
  magermasse: number | null;
  durchschnittAlter: number | null;
  kategorien: KoerperfettKategorie[];
}

const KATEGORIEN_MANN: KoerperfettKategorie[] = [
  { label: 'Essentielles Fett', farbe: 'text-red-600', von: 2, bis: 5 },
  { label: 'Athletisch', farbe: 'text-blue-600', von: 6, bis: 13 },
  { label: 'Fitness', farbe: 'text-green-600', von: 14, bis: 17 },
  { label: 'Durchschnittlich', farbe: 'text-yellow-600', von: 18, bis: 24 },
  { label: 'Übergewichtig', farbe: 'text-red-600', von: 25, bis: 50 },
];

const KATEGORIEN_FRAU: KoerperfettKategorie[] = [
  { label: 'Essentielles Fett', farbe: 'text-red-600', von: 10, bis: 13 },
  { label: 'Athletisch', farbe: 'text-blue-600', von: 14, bis: 20 },
  { label: 'Fitness', farbe: 'text-green-600', von: 21, bis: 24 },
  { label: 'Durchschnittlich', farbe: 'text-yellow-600', von: 25, bis: 31 },
  { label: 'Übergewichtig', farbe: 'text-red-600', von: 32, bis: 50 },
];

// Durchschnittswerte KFA nach Alter und Geschlecht (Näherungswerte)
const DURCHSCHNITT_MANN: [number, number][] = [
  [20, 15], [25, 17], [30, 19], [35, 20], [40, 21],
  [45, 22], [50, 23], [55, 24], [60, 25], [65, 26], [70, 27],
];

const DURCHSCHNITT_FRAU: [number, number][] = [
  [20, 22], [25, 23], [30, 24], [35, 25], [40, 26],
  [45, 27], [50, 28], [55, 29], [60, 30], [65, 31], [70, 32],
];

function getDurchschnitt(alter: number, geschlecht: Geschlecht): number | null {
  if (alter < 18 || alter > 80) return null;
  const tabelle = geschlecht === 'mann' ? DURCHSCHNITT_MANN : DURCHSCHNITT_FRAU;

  // Lineare Interpolation
  for (let i = 0; i < tabelle.length - 1; i++) {
    const [a1, v1] = tabelle[i];
    const [a2, v2] = tabelle[i + 1];
    if (alter >= a1 && alter <= a2) {
      return v1 + (v2 - v1) * (alter - a1) / (a2 - a1);
    }
  }

  if (alter < tabelle[0][0]) return tabelle[0][1];
  return tabelle[tabelle.length - 1][1];
}

export function berechneKoerperfett(eingabe: KoerperfettEingabe): KoerperfettErgebnis | null {
  const { geschlecht, groesse, bauchumfang, halsumfang, hueftumfang, alter, gewicht } = eingabe;

  if (groesse <= 0 || bauchumfang <= 0 || halsumfang <= 0) return null;
  if (geschlecht === 'frau' && hueftumfang <= 0) return null;

  let kfa: number;

  if (geschlecht === 'mann') {
    const diff = bauchumfang - halsumfang;
    if (diff <= 0) return null;
    kfa = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(groesse)) - 450;
  } else {
    const sum = bauchumfang + hueftumfang - halsumfang;
    if (sum <= 0) return null;
    kfa = 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(groesse)) - 450;
  }

  // Plausibilitätsprüfung
  if (kfa < 1 || kfa > 60) return null;

  kfa = Math.round(kfa * 10) / 10;

  // Kategorie bestimmen
  const kategorien = geschlecht === 'mann' ? KATEGORIEN_MANN : KATEGORIEN_FRAU;
  let kategorie = 'Übergewichtig';
  let kategorieFarbe = 'text-red-600';

  for (const k of kategorien) {
    if (kfa >= k.von && kfa <= k.bis) {
      kategorie = k.label;
      kategorieFarbe = k.farbe;
      break;
    }
  }

  // Fettmasse / Magermasse (nur wenn Gewicht angegeben)
  let fettmasse: number | null = null;
  let magermasse: number | null = null;
  if (gewicht > 0) {
    fettmasse = Math.round(gewicht * kfa / 100 * 10) / 10;
    magermasse = Math.round((gewicht - fettmasse) * 10) / 10;
  }

  // Durchschnittswert nach Alter
  const durchschnittAlter = alter > 0 ? getDurchschnitt(alter, geschlecht) : null;

  return {
    kfa,
    kategorie,
    kategorieFarbe,
    fettmasse,
    magermasse,
    durchschnittAlter: durchschnittAlter !== null ? Math.round(durchschnittAlter * 10) / 10 : null,
    kategorien,
  };
}
