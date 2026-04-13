export type Mietstufe = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII';

export interface WohngeldEingabe {
  haushaltsmitglieder: number;
  bruttoEinkommen: number;
  miete: number;
  mietstufe: Mietstufe;
  heizkostenpauschale: boolean;
  freibetragSchwerbehindert: boolean;
  freibetragAlleinerziehend: boolean;
  freibetragErwerbstaetig: boolean;
}

export interface WohngeldErgebnis {
  wohngeldMonat: number;
  wohngeldJahr: number;
  hatAnspruch: boolean;
  ablehnungsGrund: string | null;
  bereinigtesEinkommen: number;
  hoechstbetragMiete: number;
  beruecksichtigteMiete: number;
  heizkostenZuschlag: number;
  klimaKomponente: number;
  gesamtMiete: number; // berücksichtigte Miete + Heizkosten + Klima
  mietbelastungOhne: number; // % vom Einkommen für Miete ohne Wohngeld
  mietbelastungMit: number;  // % mit Wohngeld
  freibetraege: number;
}

// Höchstbeträge der Miete (monatlich, € — vereinfacht 2026)
// Zeilen: Haushaltsgröße 1-5, Spalten: Mietstufe I-VII
const HOECHSTBETRAEGE: number[][] = [
  [377, 425, 473, 521, 575, 634, 693],   // 1 Person
  [457, 516, 575, 633, 699, 770, 842],   // 2 Personen
  [545, 615, 685, 755, 833, 918, 1004],  // 3 Personen
  [636, 717, 799, 881, 973, 1072, 1172], // 4 Personen
  [725, 818, 911, 1005, 1109, 1222, 1337], // 5 Personen
];

// Zuschlag pro weitere Person je Mietstufe
const ZUSCHLAG_PRO_PERSON = [89, 100, 112, 124, 136, 150, 164];

// Heizkostenpauschale (monatlich, €)
const HEIZKOSTENPAUSCHALE = [23.80, 30.60, 37.40, 44.20, 51.00];
const HEIZKOSTENPAUSCHALE_ZUSCHLAG = 6.80;

// Klimakomponente (monatlich, €)
const KLIMAKOMPONENTE = [19.20, 24.70, 30.20, 35.70, 41.20];
const KLIMAKOMPONENTE_ZUSCHLAG = 5.50;

// Koeffizienten für die Wohngeldformel nach § 19 WoGG (Anlage 1)
// Vereinfachte Werte für Haushaltsgröße 1-8
// Formel: Wohngeld = 1,15 × (M - (a + b×M + c×Y) × Y)
// mit M = berücksichtigte Miete in €, Y = bereinigtes Einkommen in €
interface Koeffizienten {
  a: number;
  b: number;
  c: number;
}

const KOEFFIZIENTEN: Koeffizienten[] = [
  { a: 4.000e-2, b: 2.000e-4, c: 2.040e-4 }, // 1 Person
  { a: 3.000e-2, b: 1.700e-4, c: 1.500e-4 }, // 2 Personen
  { a: 2.000e-2, b: 1.400e-4, c: 1.200e-4 }, // 3 Personen
  { a: 1.500e-2, b: 1.200e-4, c: 1.000e-4 }, // 4 Personen
  { a: 1.200e-2, b: 1.000e-4, c: 8.500e-5 }, // 5 Personen
  { a: 1.000e-2, b: 9.000e-5, c: 7.500e-5 }, // 6 Personen
  { a: 8.500e-3, b: 8.000e-5, c: 6.700e-5 }, // 7 Personen
  { a: 7.500e-3, b: 7.200e-5, c: 6.000e-5 }, // 8+ Personen
];

const MIETSTUFE_INDEX: Record<Mietstufe, number> = {
  I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6,
};

export const MIETSTUFE_OPTIONEN: { value: Mietstufe; label: string }[] = [
  { value: 'I', label: 'I — ländlich günstig' },
  { value: 'II', label: 'II — kleine Städte' },
  { value: 'III', label: 'III — mittlere Städte' },
  { value: 'IV', label: 'IV — größere Städte' },
  { value: 'V', label: 'V — Großstädte' },
  { value: 'VI', label: 'VI — München, Frankfurt…' },
  { value: 'VII', label: 'VII — München-Zentrum…' },
];

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function getHoechstbetrag(personen: number, mietstufe: Mietstufe): number {
  const idx = MIETSTUFE_INDEX[mietstufe];
  if (personen <= 5) {
    return HOECHSTBETRAEGE[personen - 1][idx];
  }
  // Ab 6 Personen: Basis 5 + Zuschlag pro Person
  return HOECHSTBETRAEGE[4][idx] + (personen - 5) * ZUSCHLAG_PRO_PERSON[idx];
}

function getHeizkostenpauschale(personen: number): number {
  if (personen <= 5) return HEIZKOSTENPAUSCHALE[personen - 1];
  return HEIZKOSTENPAUSCHALE[4] + (personen - 5) * HEIZKOSTENPAUSCHALE_ZUSCHLAG;
}

function getKlimakomponente(personen: number): number {
  if (personen <= 5) return KLIMAKOMPONENTE[personen - 1];
  return KLIMAKOMPONENTE[4] + (personen - 5) * KLIMAKOMPONENTE_ZUSCHLAG;
}

function getKoeffizienten(personen: number): Koeffizienten {
  const idx = Math.min(personen, 8) - 1;
  return KOEFFIZIENTEN[idx];
}

export function berechneWohngeld(eingabe: WohngeldEingabe): WohngeldErgebnis | null {
  const {
    haushaltsmitglieder, bruttoEinkommen, miete, mietstufe,
    heizkostenpauschale, freibetragSchwerbehindert,
    freibetragAlleinerziehend, freibetragErwerbstaetig,
  } = eingabe;

  if (haushaltsmitglieder < 1 || bruttoEinkommen < 0 || miete <= 0) return null;

  const personen = Math.min(haushaltsmitglieder, 12);

  // === FREIBETRÄGE ===
  let freibetraege = 0;
  if (freibetragErwerbstaetig) {
    // 10% Werbungskosten-Pauschale + 20% vom Rest (Erwerbstätigenfreibetrag)
    freibetraege += rund2(bruttoEinkommen * 0.20);
  }
  if (freibetragSchwerbehindert) {
    freibetraege += 150; // 1.800€/Jahr ÷ 12
  }
  if (freibetragAlleinerziehend) {
    freibetraege += 130; // Alleinerziehenden-Freibetrag monatlich
  }

  // === BEREINIGTES EINKOMMEN ===
  // Grundsätzlich 10% Abzug für Steuern/Sozialversicherung (Pauschal)
  const pauschalAbzug = rund2(bruttoEinkommen * 0.10);
  const bereinigtesEinkommen = Math.max(0, rund2(bruttoEinkommen - pauschalAbzug - freibetraege));

  // === HÖCHSTBETRAG DER MIETE ===
  const hoechstbetragMiete = getHoechstbetrag(personen, mietstufe);
  const beruecksichtigteMiete = Math.min(miete, hoechstbetragMiete);

  // === ZUSCHLÄGE ===
  const heizkostenZuschlag = heizkostenpauschale ? getHeizkostenpauschale(personen) : 0;
  const klimaKomponente = getKlimakomponente(personen);

  // === GESAMTMIETE ===
  const gesamtMiete = rund2(beruecksichtigteMiete + heizkostenZuschlag + klimaKomponente);

  // === WOHNGELD-BERECHNUNG nach § 19 WoGG ===
  const koeff = getKoeffizienten(personen);
  const M = gesamtMiete;
  const Y = Math.max(bereinigtesEinkommen, 10); // Minimum um Division durch 0 zu vermeiden

  // Formel: Wohngeld = 1,15 × (M - (a + b×M + c×Y) × Y)
  const faktor = koeff.a + koeff.b * M + koeff.c * Y;
  const abzug = faktor * Y;
  let wohngeldMonat = rund2(1.15 * (M - abzug));

  // === ANSPRUCHSPRÜFUNG ===
  let ablehnungsGrund: string | null = null;

  if (wohngeldMonat < 10) {
    ablehnungsGrund = 'Der berechnete Wohngeld-Betrag liegt unter der Bagatellgrenze von 10 €/Monat.';
    wohngeldMonat = 0;
  }

  if (wohngeldMonat <= 0) {
    ablehnungsGrund = ablehnungsGrund || 'Das Einkommen ist zu hoch für einen Wohngeld-Anspruch in Ihrer Mietstufe.';
    wohngeldMonat = 0;
  }

  // Plausibilitätsprüfung: Wohngeld kann nicht höher als die Miete sein
  if (wohngeldMonat > gesamtMiete) {
    wohngeldMonat = rund2(gesamtMiete);
  }

  const hatAnspruch = wohngeldMonat >= 10;
  const wohngeldJahr = rund2(wohngeldMonat * 12);

  // === MIETBELASTUNG ===
  const mietbelastungOhne = bruttoEinkommen > 0
    ? rund2((miete / bruttoEinkommen) * 100)
    : 0;
  const mietbelastungMit = bruttoEinkommen > 0
    ? rund2(((miete - wohngeldMonat) / bruttoEinkommen) * 100)
    : 0;

  return {
    wohngeldMonat,
    wohngeldJahr,
    hatAnspruch,
    ablehnungsGrund,
    bereinigtesEinkommen,
    hoechstbetragMiete,
    beruecksichtigteMiete,
    heizkostenZuschlag,
    klimaKomponente,
    gesamtMiete,
    mietbelastungOhne,
    mietbelastungMit,
    freibetraege,
  };
}
