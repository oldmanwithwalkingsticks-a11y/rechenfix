export type Mietstufe = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII';

export interface WohngeldEingabe {
  haushaltsmitglieder: number;
  bruttoEinkommen: number;
  miete: number;
  mietstufe: Mietstufe;
  heizkostenpauschale: boolean;
  freibetragSchwerbehindert: boolean;
  freibetragAlleinerziehend: boolean;
  /**
   * @deprecated § 17 Nr. 3 WoGG ist ein pauschaler Betrag (110 €/Mo), nicht
   * pro Kind. Das Feld bleibt für Backwards-Compatibility im Interface, wird
   * aber von berechneWohngeld ignoriert. Entfernung in späterem Prompt.
   */
  alleinerziehendKinderAnzahl?: number;
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

// Höchstbeträge der Miete § 12 WoGG Anlage 1 nach Zweiter Verordnung zur
// Fortschreibung des Wohngeldes v. 21.10.2024 (gültig seit 01.01.2025, unverändert 2026).
// Quelle: buzer.de/Anlage_1_WoGG.htm + MBWSV-NRW-PDF 08/2024.
// Zeilen: Haushaltsgröße 1-5, Spalten: Mietstufe I-VII
const HOECHSTBETRAEGE: number[][] = [
  [361, 408, 456, 511, 562, 615, 677],    // 1 Person
  [437, 493, 551, 619, 680, 745, 820],    // 2 Personen
  [521, 587, 657, 737, 809, 887, 975],    // 3 Personen
  [608, 686, 766, 858, 946, 1035, 1139],  // 4 Personen
  [694, 782, 875, 982, 1080, 1183, 1302], // 5 Personen
];

// Zuschlag pro weitere Person je Mietstufe (§ 12 WoGG Anlage 1)
const ZUSCHLAG_PRO_PERSON = [82, 94, 106, 119, 129, 149, 163];

// Heizkostenpauschale (monatlich, €)
const HEIZKOSTENPAUSCHALE = [23.80, 30.60, 37.40, 44.20, 51.00];
const HEIZKOSTENPAUSCHALE_ZUSCHLAG = 6.80;

// Klimakomponente (monatlich, €)
const KLIMAKOMPONENTE = [19.20, 24.70, 30.20, 35.70, 41.20];
const KLIMAKOMPONENTE_ZUSCHLAG = 5.50;

// Koeffizienten für die Wohngeldformel nach § 19 Abs. 1 WoGG (Anlage 2)
// Quelle: Anlage 2 WoGG BGBl. 2024 I Nr. 314 S. 3, unverändert 2026.
// Formel (§ 19 Abs. 1 S. 1): Wohngeld = 1,15 · (M − (a + b·M + c·Y) · Y)
// mit M = berücksichtigte Miete (€), Y = monatliches Gesamteinkommen (€)
// Reihenfolge + Rundung: Anlage 3 WoGG (10 Nachkomma-Festkommazahlen;
// Endergebnis kaufmännisch auf volle Euro).
interface Koeffizienten {
  a: number;
  b: number;
  c: number;
}

const KOEFFIZIENTEN: Koeffizienten[] = [
  { a:  4.000e-2, b: 4.797e-4, c: 4.080e-5 }, // 1 Person
  { a:  3.000e-2, b: 3.571e-4, c: 3.040e-5 }, // 2 Personen
  { a:  2.000e-2, b: 2.917e-4, c: 2.450e-5 }, // 3 Personen
  { a:  1.000e-2, b: 2.163e-4, c: 1.760e-5 }, // 4 Personen
  { a:  0,        b: 1.907e-4, c: 1.720e-5 }, // 5 Personen
  { a: -1.000e-2, b: 1.722e-4, c: 1.660e-5 }, // 6 Personen
  { a: -2.000e-2, b: 1.592e-4, c: 1.650e-5 }, // 7 Personen
  { a: -3.000e-2, b: 1.583e-4, c: 1.650e-5 }, // 8 Personen
  { a: -4.000e-2, b: 1.376e-4, c: 1.660e-5 }, // 9 Personen
  { a: -6.000e-2, b: 1.249e-4, c: 1.660e-5 }, // 10 Personen
  { a: -9.000e-2, b: 1.141e-4, c: 1.960e-5 }, // 11 Personen
  { a: -1.200e-1, b: 1.107e-4, c: 2.210e-5 }, // 12+ Personen
];

// Mindestwerte M und Y nach Anlage 3 Nr. 1 WoGG — werden angehoben, wenn
// die tatsächlichen Werte unter diesen Tabellenwerten liegen.
const M_MIN_PERSONEN: number[] = [54, 67, 79, 92, 103, 103, 115, 128, 140, 152, 187, 298];
const Y_MIN_PERSONEN: number[] = [396, 679, 906, 1132, 1358, 1585, 1811, 2037, 2264, 2490, 2717, 2943];

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
  const idx = Math.min(Math.max(personen, 1), 12) - 1;
  return KOEFFIZIENTEN[idx];
}

function getMindestwerte(personen: number): { M: number; Y: number } {
  const idx = Math.min(Math.max(personen, 1), 12) - 1;
  return { M: M_MIN_PERSONEN[idx], Y: Y_MIN_PERSONEN[idx] };
}

export function berechneWohngeld(eingabe: WohngeldEingabe): WohngeldErgebnis | null {
  const {
    haushaltsmitglieder, bruttoEinkommen, miete, mietstufe,
    heizkostenpauschale, freibetragSchwerbehindert,
    freibetragAlleinerziehend, alleinerziehendKinderAnzahl,
    freibetragErwerbstaetig,
  } = eingabe;

  if (haushaltsmitglieder < 1 || bruttoEinkommen < 0 || miete <= 0) return null;

  const personen = Math.min(haushaltsmitglieder, 12);

  // === FREIBETRÄGE nach § 17 WoGG (Gesetzesfassung Stand 22.04.2026) ===
  let freibetraege = 0;
  if (freibetragSchwerbehindert) {
    // § 17 Nr. 1 WoGG: 1.800 €/Jahr = 150 €/Monat für jedes schwerbehinderte
    // Haushaltsmitglied (GdB 100 oder GdB < 100 + Pflegebedürftigkeit).
    freibetraege += 150;
  }
  if (freibetragAlleinerziehend) {
    // § 17 Nr. 3 WoGG: 1.320 €/Jahr = 110 €/Monat pauschal (nicht pro Kind),
    // wenn im Haushalt mit mindestens einem Kind unter 18 für das Kindergeld
    // gewährt wird. Die Kinderzahl wirkt nicht multiplikativ.
    freibetraege += 110;
  }
  // Hinweis: § 17 WoGG enthält KEINEN allgemeinen Erwerbstätigen-Freibetrag.
  // Der freibetragErwerbstaetig-Input hat keine Gesetzeswirkung — vorübergehend
  // bleibt er im Interface als No-Op, wird aber in künftigen Prompts ohne
  // Rückwirkung entfernbar.
  void freibetragErwerbstaetig;

  // === BEREINIGTES EINKOMMEN nach § 16 WoGG ===
  // Drei 10-%-Pauschalen für Steuerpflicht, GKV-Pflicht, RV-Pflicht (Summe 30 %
  // für den typischen AN-Fall). Rentner tragen nur 2 von 3 Pauschalen (20 %),
  // Selbständige ggf. andere Abzüge. Default 30 % entspricht BMWSB-Rechner-Default
  // für erwerbstätige AN — häufigster Wohngeld-Antragsteller-Typ.
  const pauschalAbzug = rund2(bruttoEinkommen * 0.30);
  const bereinigtesEinkommen = Math.max(0, rund2(bruttoEinkommen - pauschalAbzug - freibetraege));

  // === HÖCHSTBETRAG DER MIETE ===
  const hoechstbetragMiete = getHoechstbetrag(personen, mietstufe);
  const beruecksichtigteMiete = Math.min(miete, hoechstbetragMiete);

  // === ZUSCHLÄGE ===
  // § 12 Abs. 6 WoGG: Heizkostenkomponente als monatlicher Zuschlag.
  // § 12 Abs. 7 WoGG: Klimakomponente als Aufschlag zur Heizkostenkomponente —
  // greift nur, wenn Heizkosten überhaupt als Wohnkosten anerkannt werden.
  // In der Lib gekoppelt: Klima nur bei aktivem heizkostenpauschale-Flag.
  const heizkostenZuschlag = heizkostenpauschale ? getHeizkostenpauschale(personen) : 0;
  const klimaKomponente = heizkostenpauschale ? getKlimakomponente(personen) : 0;

  // === GESAMTMIETE ===
  const gesamtMiete = rund2(beruecksichtigteMiete + heizkostenZuschlag + klimaKomponente);

  // === WOHNGELD-BERECHNUNG nach § 19 WoGG + Anlage 3 ===
  const koeff = getKoeffizienten(personen);
  const { M: M_min, Y: Y_min } = getMindestwerte(personen);
  // Anlage 3 Nr. 1: Werte unter den Tabellenmindestwerten werden durch diese ersetzt.
  const M = Math.max(gesamtMiete, M_min);
  const Y = Math.max(bereinigtesEinkommen, Y_min);

  // Anlage 3 Nr. 2: vier Rechenschritte mit Festkommazahlen (10 Nachkommastellen).
  // JavaScript number reicht praktisch aus — Koeffizienten haben ~4 signifikante
  // Stellen, Zwischenergebnisse bleiben unter 1e7 → Präzisionsverlust vernachlässigbar.
  const z1 = koeff.a + koeff.b * M + koeff.c * Y;
  const z2 = z1 * Y;
  const z3 = M - z2;
  const z4 = 1.15 * z3;

  // Anlage 3 Nr. 3: kaufmännische Rundung auf volle Euro.
  let wohngeldMonat = Math.round(z4);

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
