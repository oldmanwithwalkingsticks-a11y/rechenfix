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

// W187: vorher Label „Übergewichtig“ (die Seite nennt den ACE-Bereich neutral „Oberhalb des Durchschnitts“).
// von/bis sind die ganzzahligen Anzeige-Grenzen der ACE-Tabelle; die Zuordnung erfolgt halboffen
// (Kategorie gilt ab „von“ bis unter „von“ der nächsten Kategorie), siehe kategorieFuer().
export const KATEGORIEN_MANN: KoerperfettKategorie[] = [
  // W188: Farbklassen mit Dark-Variante (vorher -600 ohne, im Dark Mode 2,2–3,3:1). lib/ liegt nicht im
  // Tailwind-content — jede Klasse hier muss auch in components/ vorkommen.
  { label: 'Essentielles Fett', farbe: 'text-red-700 dark:text-red-300', von: 2, bis: 5 },
  { label: 'Athletisch', farbe: 'text-blue-700 dark:text-blue-300', von: 6, bis: 13 },
  { label: 'Fitness', farbe: 'text-green-700 dark:text-green-400', von: 14, bis: 17 },
  { label: 'Durchschnittlich', farbe: 'text-yellow-800 dark:text-yellow-300', von: 18, bis: 24 },
  { label: 'Oberhalb des Durchschnitts', farbe: 'text-red-700 dark:text-red-300', von: 25, bis: 50 },
];

export const KATEGORIEN_FRAU: KoerperfettKategorie[] = [
  { label: 'Essentielles Fett', farbe: 'text-red-700 dark:text-red-300', von: 10, bis: 13 },
  { label: 'Athletisch', farbe: 'text-blue-700 dark:text-blue-300', von: 14, bis: 20 },
  { label: 'Fitness', farbe: 'text-green-700 dark:text-green-400', von: 21, bis: 24 },
  { label: 'Durchschnittlich', farbe: 'text-yellow-800 dark:text-yellow-300', von: 25, bis: 31 },
  { label: 'Oberhalb des Durchschnitts', farbe: 'text-red-700 dark:text-red-300', von: 32, bis: 50 },
];

/**
 * W187: vorher „kfa >= von && kfa <= bis“ mit ganzzahligen Grenzen und Default „Übergewichtig“ —
 * Werte zwischen zwei Bereichen (z. B. 13,2 % beim Mann) und Werte unter der ersten Untergrenze
 * fielen durch alle Bereiche in den Default. Jetzt halboffene Intervalle:
 * Mann < 6 Essentiell, < 14 Athletisch, < 18 Fitness, < 25 Durchschnitt, sonst oberhalb;
 * Frau < 14, < 21, < 25, < 32, sonst oberhalb.
 */
export function kategorieFuer(kfa: number, kategorien: KoerperfettKategorie[]): KoerperfettKategorie {
  for (let i = 0; i < kategorien.length - 1; i++) {
    if (kfa < kategorien[i + 1].von) return kategorien[i];
  }
  return kategorien[kategorien.length - 1];
}

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
  const treffer = kategorieFuer(kfa, kategorien);
  const kategorie = treffer.label;
  const kategorieFarbe = treffer.farbe;

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
