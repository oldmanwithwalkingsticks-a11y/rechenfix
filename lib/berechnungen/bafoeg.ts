export type AusbildungsArt = 'studium' | 'schule';
export type Wohnsituation = 'eltern' | 'eigene';
export type Familienstand = 'verheiratet' | 'getrennt' | 'geschieden' | 'verwitwet' | 'elternunabhaengig';

export interface BafoegEingabe {
  ausbildung: AusbildungsArt;
  wohnsituation: Wohnsituation;
  eigenesEinkommen: number;
  eigenesVermoegen: number;
  familienstand: Familienstand;
  einkommenEltern1: number; // brutto/Jahr
  einkommenEltern2: number; // brutto/Jahr (nur bei verheiratet)
  geschwisterInAusbildung: number;
  selbstVersichert: boolean;
  hatKinder: boolean;
  anzahlKinder: number;
}

export interface BafoegErgebnis {
  bafoegMonat: number;
  hatAnspruch: boolean;
  ablehnungsGrund: string | null;

  // Bedarfsberechnung
  grundbedarf: number;
  wohnpauschale: number;
  kvZuschlag: number;
  pvZuschlag: number;
  kinderZuschlag: number;
  gesamtBedarf: number;

  // Anrechnungen
  anrechnungEinkommen: number;
  anrechnungVermoegen: number;
  anrechnungEltern: number;
  gesamtAnrechnung: number;

  // Rückzahlung (nur Studium)
  istStudium: boolean;
  zuschussAnteil: number;
  darlehensAnteil: number;
  maxRueckzahlung: number;

  // Hilfswerte
  nettoEltern: number;
  freibetragEltern: number;
  elternunabhaengig: boolean;
}

// === BEDARFSSÄTZE 2026 ===

const BEDARF = {
  studium: { eltern: 511, eigene: 934 },
  schule: { eltern: 262, eigene: 632 },
};

// Wohnpauschale ist im Eigene-Wohnung-Bedarf bereits enthalten
const WOHNPAUSCHALE = {
  studium: 380,
  schule: 370,
};

const KV_ZUSCHLAG = 94;
const PV_ZUSCHLAG = 28;
const KINDER_ZUSCHLAG = 160; // pro Kind

// === FREIBETRÄGE ===

const FREIBETRAG_EINKOMMEN = 330; // Minijob-Freibetrag monatlich
const SV_PAUSCHALE_EIGEN = 0.225; // 22,5% Sozialversicherungspauschale

const VERMOEGEN_FREIBETRAG_UNTER_30 = 15000;
// ab 30: 45.000 € — wird im Rechner-Hinweis erwähnt, Standard ist unter 30

// Eltern-Freibeträge (monatlich, vom Netto)
const FREIBETRAG_VERHEIRATET = 2415;
const FREIBETRAG_ALLEINSTEHEND = 1605;
const FREIBETRAG_GESCHWISTER = 730; // pro Geschwister in Ausbildung

// Anrechnungsquote Elterneinkommen
const ANRECHNUNG_ELTERN_QUOTE = 0.45;

// SV-Pauschale für Eltern
const SV_PAUSCHALE_ELTERN = 0.216; // 21,6%

// Max. Rückzahlung Studien-BAföG
const MAX_RUECKZAHLUNG = 10010;

// Bagatellgrenze
const BAGATELLGRENZE = 10;

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Vereinfachte Einkommensteuer-Schätzung (2026, Grundtabelle)
 */
function schaetzeEinkommensteuer(zvE: number): number {
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.round((932.30 * y + 1400) * y);
  }
  if (zvE <= 66760) {
    const z = (zvE - 17443) / 10000;
    return Math.round((176.64 * z + 2397) * z + 1025.38);
  }
  if (zvE <= 277825) {
    return Math.round(0.42 * zvE - 10636.31);
  }
  return Math.round(0.45 * zvE - 18971.06);
}

/**
 * Berechnet das anrechenbare Netto-Einkommen eines Elternteils
 */
function berechneElternNetto(bruttoJahr: number): number {
  if (bruttoJahr <= 0) return 0;
  const svAbzug = bruttoJahr * SV_PAUSCHALE_ELTERN;
  const zvE = bruttoJahr - svAbzug;
  const est = schaetzeEinkommensteuer(Math.max(0, zvE));
  const netto = bruttoJahr - svAbzug - est;
  return Math.max(0, rund2(netto / 12)); // monatlich
}

export function berechneBafoeg(eingabe: BafoegEingabe): BafoegErgebnis | null {
  const {
    ausbildung, wohnsituation, eigenesEinkommen, eigenesVermoegen,
    familienstand, einkommenEltern1, einkommenEltern2,
    geschwisterInAusbildung, selbstVersichert, hatKinder, anzahlKinder,
  } = eingabe;

  const elternunabhaengig = familienstand === 'elternunabhaengig';

  // === BEDARF ===
  const wohnKey = wohnsituation === 'eltern' ? 'eltern' : 'eigene';
  const grundbedarf = BEDARF[ausbildung][wohnKey];
  const wohnpauschale = wohnsituation === 'eigene' ? WOHNPAUSCHALE[ausbildung] : 0;

  const kvZuschlag = selbstVersichert ? KV_ZUSCHLAG : 0;
  const pvZuschlag = selbstVersichert ? PV_ZUSCHLAG : 0;
  const kinderZuschlag = hatKinder ? anzahlKinder * KINDER_ZUSCHLAG : 0;

  const gesamtBedarf = grundbedarf + kvZuschlag + pvZuschlag + kinderZuschlag;

  // === ANRECHNUNG EIGENES EINKOMMEN ===
  const ueberFreibetrag = Math.max(0, eigenesEinkommen - FREIBETRAG_EINKOMMEN);
  const anrechnungEinkommen = rund2(ueberFreibetrag * (1 - SV_PAUSCHALE_EIGEN));

  // === ANRECHNUNG VERMÖGEN ===
  const vermoegenFreibetrag = VERMOEGEN_FREIBETRAG_UNTER_30;
  const anrechbaresVermoegen = Math.max(0, eigenesVermoegen - vermoegenFreibetrag);
  const anrechnungVermoegen = rund2(anrechbaresVermoegen / 12);

  // === ANRECHNUNG ELTERNEINKOMMEN ===
  let anrechnungEltern = 0;
  let nettoEltern = 0;
  let freibetragEltern = 0;

  if (!elternunabhaengig) {
    if (familienstand === 'verheiratet') {
      // Beide Einkommen zusammen
      const netto1 = berechneElternNetto(einkommenEltern1);
      const netto2 = berechneElternNetto(einkommenEltern2);
      nettoEltern = rund2(netto1 + netto2);
      freibetragEltern = FREIBETRAG_VERHEIRATET + geschwisterInAusbildung * FREIBETRAG_GESCHWISTER;
    } else {
      // Getrennt/Geschieden/Verwitwet: nur Elternteil 1
      nettoEltern = berechneElternNetto(einkommenEltern1);
      freibetragEltern = FREIBETRAG_ALLEINSTEHEND + geschwisterInAusbildung * FREIBETRAG_GESCHWISTER;
    }

    const ueberFreibetragEltern = Math.max(0, nettoEltern - freibetragEltern);
    anrechnungEltern = rund2(ueberFreibetragEltern * ANRECHNUNG_ELTERN_QUOTE);
  }

  // === GESAMTANRECHNUNG ===
  const gesamtAnrechnung = rund2(anrechnungEinkommen + anrechnungVermoegen + anrechnungEltern);

  // === BAföG ===
  let bafoegMonat = rund2(gesamtBedarf - gesamtAnrechnung);
  let ablehnungsGrund: string | null = null;

  if (bafoegMonat < BAGATELLGRENZE && bafoegMonat > 0) {
    ablehnungsGrund = `Der berechnete Betrag (${Math.round(bafoegMonat)} €) liegt unter der Bagatellgrenze von ${BAGATELLGRENZE} €.`;
    bafoegMonat = 0;
  }

  if (bafoegMonat <= 0) {
    ablehnungsGrund = ablehnungsGrund || 'Die Anrechnungsbeträge übersteigen den Bedarf. Stellen Sie dennoch einen Antrag — das BAföG-Amt berücksichtigt weitere Faktoren.';
    bafoegMonat = 0;
  }

  const hatAnspruch = bafoegMonat >= BAGATELLGRENZE;

  // === RÜCKZAHLUNG (nur Studium) ===
  const istStudium = ausbildung === 'studium';
  const zuschussAnteil = istStudium ? rund2(bafoegMonat * 0.5) : bafoegMonat;
  const darlehensAnteil = istStudium ? rund2(bafoegMonat * 0.5) : 0;

  return {
    bafoegMonat,
    hatAnspruch,
    ablehnungsGrund,
    grundbedarf,
    wohnpauschale,
    kvZuschlag,
    pvZuschlag,
    kinderZuschlag,
    gesamtBedarf,
    anrechnungEinkommen,
    anrechnungVermoegen,
    anrechnungEltern,
    gesamtAnrechnung,
    istStudium,
    zuschussAnteil,
    darlehensAnteil,
    maxRueckzahlung: MAX_RUECKZAHLUNG,
    nettoEltern,
    freibetragEltern,
    elternunabhaengig,
  };
}
